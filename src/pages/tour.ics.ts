import type { APIRoute } from "astro";
import routes from "../data/routes.json";

interface Stop {
  when: string;
  place: string;
  description: string;
  type: "festival" | "scouting";
  tbd: boolean;
  start: string;
  end: string;
}

function toIcsDate(iso: string): string {
  return iso.replace(/-/g, "");
}

function addOneDay(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function escapeText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function foldLine(line: string): string {
  // iCalendar lines should be folded at 75 octets; keep it simple for our short lines.
  if (line.length <= 75) return line;
  const chunks = [];
  let rest = line;
  while (rest.length > 75) {
    chunks.push(rest.slice(0, 75));
    rest = " " + rest.slice(75);
  }
  chunks.push(rest);
  return chunks.join("\r\n");
}

export const GET: APIRoute = () => {
  const stops = routes as Stop[];
  const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";

  const events = stops
    .map((stop, i) => {
      const summary = stop.tbd ? `${stop.place} (dates to be announced)` : stop.place;
      return [
        "BEGIN:VEVENT",
        `UID:soundssofar-2028-${i}@soundssofar.netlify.app`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${toIcsDate(stop.start)}`,
        `DTEND;VALUE=DATE:${toIcsDate(addOneDay(stop.end))}`,
        foldLine(`SUMMARY:${escapeText(summary)}`),
        foldLine(`DESCRIPTION:${escapeText(stop.description)}`),
        "END:VEVENT",
      ].join("\r\n");
    })
    .join("\r\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sounds So Far//Tour Dates//EN",
    "CALSCALE:GREGORIAN",
    events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "attachment; filename=\"sounds-so-far-tour.ics\"",
    },
  });
};
