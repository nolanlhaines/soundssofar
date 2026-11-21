(function () {
  var MAX_FILE_BYTES = 10 * 1024 * 1024; // TODO: confirm against the real Netlify plan, see TODO.md
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
        problems.push({ el: fileInput, message: "“" + fileInput.files[i].name + "” is too large" });
        break;
      }
    }

    return problems;
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
    // Valid and not spam: let the browser submit natively to Netlify Forms,
    // which is required for the file upload field to go through.
  });
})();
