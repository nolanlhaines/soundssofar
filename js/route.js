(function () {
  var list = document.getElementById("stops");
  if (!list) return;

  fetch("data/routes.json")
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (stops) {
      stops.forEach(function (stop) {
        var li = document.createElement("li");
        li.className = "stop" + (stop.type === "festival" ? " f" : "");

        var tag = "";
        if (stop.tbd) {
          tag = ' <span class="tag">Dates to be announced</span>';
        }

        var when = document.createElement("div");
        when.className = "when";
        when.textContent = stop.when;

        var h3 = document.createElement("h3");
        h3.textContent = stop.place;
        if (tag) h3.insertAdjacentHTML("beforeend", tag);

        var p = document.createElement("p");
        p.textContent = stop.description;

        li.appendChild(when);
        li.appendChild(h3);
        li.appendChild(p);
        list.appendChild(li);
      });
    })
    .catch(function (err) {
      console.error("Could not load route data:", err);
      var p = document.createElement("p");
      p.className = "route-error";
      p.textContent = "The route couldn't be loaded right now. Try refreshing the page.";
      list.parentNode.insertBefore(p, list);
    });
})();
