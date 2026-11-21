(function () {
  // Set this once a submission service is chosen; until then the form only validates.
  var FORM_ENDPOINT = null;
  var FALLBACK_EMAIL = "hello@nolanhaines.com"; // TODO: placeholder, see TODO.md

  var MAX_FILE_BYTES = 50 * 1024 * 1024;
  var MAX_FILES = 3;

  var form = document.getElementById("apply");
  if (!form) return;

  var errs = document.getElementById("apply-errors");
  var status = document.getElementById("apply-status");
  var age = document.getElementById("f-age");
  var guard = document.getElementById("guardian");
  var fileInput = document.getElementById("f-file");

  function syncGuard() {
    var minor = age.value === "Under 18";
    guard.hidden = !minor;
    guard.querySelectorAll("input").forEach(function (i) {
      i.required = minor;
    });
  }
  age.addEventListener("change", syncGuard);
  syncGuard();

  function fieldProblems() {
    var problems = [];

    form.querySelectorAll("input,select,textarea").forEach(function (el) {
      if (el.name === "_gotcha") return;
      var box = el.closest(".field") || el.closest(".check");
      if (!el.required) {
        if (box) box.classList.remove("bad");
        return;
      }
      var ok = el.type === "checkbox" ? el.checked : el.value.trim() !== "";
      if (ok && el.type === "email") ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim());
      if (ok && el.type === "url") ok = /^https?:\/\/\S+\.\S+/.test(el.value.trim());
      if (box) box.classList.toggle("bad", !ok);
      if (!ok) problems.push({ el: el, message: el.name + " is required" });
    });

    if (fileInput.files.length > MAX_FILES) {
      problems.push({ el: fileInput, message: "Please attach at most " + MAX_FILES + " files" });
    }
    for (var i = 0; i < fileInput.files.length; i++) {
      if (fileInput.files[i].size > MAX_FILE_BYTES) {
        problems.push({ el: fileInput, message: "“" + fileInput.files[i].name + "” is over 50MB" });
        break;
      }
    }

    return problems;
  }

  function buildText() {
    var lines = [];
    form.querySelectorAll("input,select,textarea").forEach(function (el) {
      if (!el.name || el.name === "_gotcha" || el.closest("[hidden]")) return;
      if (el.type === "file") {
        if (el.files.length) {
          var names = [];
          for (var i = 0; i < el.files.length; i++) names.push(el.files[i].name);
          lines.push(el.name + ": " + names.join(", "));
        }
        return;
      }
      var v = el.type === "checkbox" ? (el.checked ? "Yes" : "") : el.value.trim();
      if (v) lines.push(el.name + ": " + v);
    });
    return lines.join("\n\n");
  }

  function isSpam() {
    return form.elements["_gotcha"].value.trim() !== "";
  }

  function validate() {
    var problems = fieldProblems();
    if (problems.length) {
      errs.textContent = "Please fix: " + problems.map(function (p) { return p.message; }).join("; ") + ".";
      errs.hidden = false;
      problems[0].el.focus();
      return false;
    }
    errs.hidden = true;
    return true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (isSpam()) return;
    if (!validate()) return;

    if (!FORM_ENDPOINT) {
      status.textContent = "This form isn't connected to a submission service yet, so nothing was sent. Use “Copy my answers” and email them to " + FALLBACK_EMAIL + " for now.";
      status.hidden = false;
      return;
    }

    // Real submission wiring goes here once FORM_ENDPOINT is set.
  });

  document.getElementById("apply-copy").addEventListener("click", function () {
    if (isSpam()) return;
    if (!validate()) return;
    var text = buildText();

    function showText() {
      status.textContent = "Copy your answers from the box below and email them to " + FALLBACK_EMAIL + ".";
      var t = document.createElement("textarea");
      t.readOnly = true;
      t.value = text;
      t.setAttribute("aria-label", "Your answers");
      status.appendChild(t);
      status.hidden = false;
      t.select();
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        status.textContent = "Copied. Paste your answers into an email to " + FALLBACK_EMAIL + ".";
        status.hidden = false;
      }, showText);
    } else {
      showText();
    }
  });
})();
