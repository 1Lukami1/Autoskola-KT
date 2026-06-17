/* Autoškola KT — interakce webu */
(function () {
  "use strict";

  /* ---- Mobilní menu ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("open");
    });
  }

  /* ---- Zvýraznění aktivní položky v menu ---- */
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });

  /* ---- Odhalovací animace při scrollu ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.07 + "s";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Galerie: filtrování podle kategorie ---- */
  var tabs = document.querySelectorAll(".gallery-tabs button");
  if (tabs.length) {
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.dataset.filter;
        tabs.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        document.querySelectorAll(".gallery figure").forEach(function (fig) {
          var show = filter === "all" || fig.dataset.cat === filter;
          fig.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---- Lightbox pro fotky v galerii ---- */
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    document.querySelectorAll(".gallery img").forEach(function (img) {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function () {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add("open");
      });
    });
    function closeLb() { lb.classList.remove("open"); }
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.classList.contains("lb-close")) closeLb();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLb();
    });
  }

  /* ---- Odeslání přihlášky ---- */
  var form = document.getElementById("prihlaska-form");
  if (form) {
    var status = document.getElementById("form-status");
    function showStatus(type, msg) {
      if (!status) return;
      status.className = "form-status " + type;
      status.textContent = msg;
      status.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var endpoint = form.getAttribute("data-formspree") || "";
      var configured = endpoint.indexOf("formspree.io/f/") !== -1 && endpoint.indexOf("VAS_KOD") === -1;

      // Není nastaven Formspree → otevřeme e-mailového klienta s předvyplněnou zprávou.
      if (!configured) {
        var lines = [];
        new FormData(form).forEach(function (val, key) {
          if (key === "_gotcha" || !String(val).trim()) return;
          lines.push(key + ": " + val);
        });
        var subject = "Přihláška do autoškoly — " + (form.elements["jmeno"] ? form.elements["jmeno"].value : "");
        var mail = "mailto:autoskolakt@volny.cz?subject=" + encodeURIComponent(subject) +
                   "&body=" + encodeURIComponent(lines.join("\n"));
        window.location.href = mail;
        showStatus("ok", "Otevřeli jsme váš e-mailový program s vyplněnou přihláškou — stačí ji odeslat. Nefunguje to? Napište na autoskolakt@volny.cz nebo zavolejte 604 830 176.");
        return;
      }

      // Odeslání přes Formspree
      var data = new FormData(form);
      var btn = form.querySelector("button[type=submit]");
      var orig = btn.textContent;
      btn.disabled = true; btn.textContent = "Odesílám…";
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            showStatus("ok", "Děkujeme! Přihláška byla odeslána. Brzy se vám ozveme.");
          } else {
            showStatus("err", "Něco se nepovedlo. Zavolejte nám prosím na 604 830 176.");
          }
        })
        .catch(function () {
          showStatus("err", "Odeslání selhalo. Zkuste to prosím znovu nebo zavolejte na 604 830 176.");
        })
        .finally(function () { btn.disabled = false; btn.textContent = orig; });
    });
  }

  /* ---- Rok v patičce ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
