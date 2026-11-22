(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var errs = document.getElementById("contact-errors");
  var status = document.getElementById("contact-status");

  function isSpam() {
    return form.elements["_gotcha"].value.trim() !== "";
  }

  function fieldProblems() {
    var problems = [];
    form.querySelectorAll("input,select,textarea").forEach(function (el) {
      if (el.name === "_gotcha" || !el.required) return;
      var ok = el.value.trim() !== "";
      if (ok && el.type === "email") ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim());
      var box = el.closest(".field");
      if (box) box.classList.toggle("bad", !ok);
      if (!ok) problems.push({ el: el, message: el.name + " is required" });
    });
    return problems;
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
    if (isSpam()) {
      e.preventDefault();
      return;
    }
    if (!validate()) {
      e.preventDefault();
      return;
    }
    status.textContent = "Sending…";
    status.hidden = false;
  });
})();
