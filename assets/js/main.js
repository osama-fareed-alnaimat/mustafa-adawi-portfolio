/* =========================================================
   Mustafa Adawi — Engineering Portfolio
   main.js: mobile menu, active nav, project filter,
            gallery lightbox, scroll animations, contact form
   ========================================================= */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  /* ---------- 1. Mobile menu ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");

  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    menu.classList.remove("is-open");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.classList.toggle("is-open", !open);
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) closeMenu();
    });
  }

  /* ---------- 2. Active navigation link ---------- */
  // Each <body> has data-page="home|projects|experience|certificates|about"
  var page = document.body.getAttribute("data-page");
  if (page) {
    document.querySelectorAll(".nav__link[data-nav]").forEach(function (link) {
      if (link.getAttribute("data-nav") === page) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- 3. Project filter ---------- */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll("[data-category]");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");

      filterButtons.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");

      projectCards.forEach(function (card) {
        var cats = card.getAttribute("data-category").split(" ");
        var show = filter === "all" || cats.indexOf(filter) !== -1;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- 4. Lightbox (galleries and slideshows) ---------- */
  var lightbox = null;
  var lbItems = [];
  var lbIndex = 0;
  var lbLastFocus = null;
  var lbOnClose = null;

  var lbShow = function (i) {
    lbIndex = (i + lbItems.length) % lbItems.length;
    var item = lbItems[lbIndex];
    var img = lightbox.querySelector(".lightbox__img");
    img.src = item.src;
    img.alt = item.alt || "";
    lightbox.querySelector(".lightbox__caption").textContent =
      (item.caption || item.alt || "") + (lbItems.length > 1 ? "  ·  " + (lbIndex + 1) + " / " + lbItems.length : "");
  };

  var closeLightbox = function () {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lbLastFocus) lbLastFocus.focus();
    if (lbOnClose) { var cb = lbOnClose; lbOnClose = null; cb(); }
  };

  var buildLightbox = function () {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Image viewer");
    lb.innerHTML =
      '<button class="lightbox__btn lightbox__close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous image">&#8249;</button>' +
      '<figure class="lightbox__figure"><img class="lightbox__img" src="" alt=""><figcaption class="lightbox__caption"></figcaption></figure>' +
      '<button class="lightbox__btn lightbox__next" type="button" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(lb);
    lb.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
    lb.querySelector(".lightbox__prev").addEventListener("click", function () { lbShow(lbIndex - 1); });
    lb.querySelector(".lightbox__next").addEventListener("click", function () { lbShow(lbIndex + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
      if (e.key === "ArrowRight") lbShow(lbIndex + 1);
      if (e.key === "Tab") {
        var focusables = Array.prototype.slice.call(lb.querySelectorAll(".lightbox__btn")).filter(function (b) { return !b.hidden; });
        var k = focusables.indexOf(document.activeElement);
        e.preventDefault();
        var next = e.shiftKey ? k - 1 : k + 1;
        focusables[(next + focusables.length) % focusables.length].focus();
      }
    });
    return lb;
  };

  // items: [{ src, alt, caption }], start: index, onClose: optional callback
  var openLightbox = function (items, start, onClose) {
    if (!lightbox) lightbox = buildLightbox();
    lbItems = items;
    lbOnClose = onClose || null;
    lbLastFocus = document.activeElement;
    var multi = items.length > 1;
    lightbox.querySelector(".lightbox__prev").hidden = !multi;
    lightbox.querySelector(".lightbox__next").hidden = !multi;
    lbShow(start || 0);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox__close").focus();
  };

  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery__item[data-full]"));
  if (galleryItems.length) {
    var galleryList = galleryItems.map(function (el) {
      var img = el.querySelector("img");
      return { src: el.getAttribute("data-full"), alt: img ? img.alt : "", caption: el.getAttribute("data-caption") };
    });
    galleryItems.forEach(function (el, i) {
      el.addEventListener("click", function () { openLightbox(galleryList, i); });
    });
  }

  /* ---------- 5. Scroll (fade-up) animations ---------- */
  var reveals = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Stagger items that sit side by side in a grid
  document.querySelectorAll(".grid, .stats, .metrics, .gallery, .steps, .two-col").forEach(function (group) {
    var i = 0;
    Array.prototype.forEach.call(group.children, function (child) {
      if (child.classList.contains("reveal")) {
        child.style.transitionDelay = (i % 4) * 0.09 + "s";
        i++;
      }
    });
  });

  // Stop the rotating gears for visitors who prefer reduced motion
  if (reduceMotion) {
    document.querySelectorAll(".hero__gears").forEach(function (svg) {
      if (svg.pauseAnimations) svg.pauseAnimations();
    });
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var t = entry.target;
            t.classList.add("is-visible");
            io.unobserve(t);
            // clear the stagger delay so hover effects stay instant
            window.setTimeout(function () { t.style.transitionDelay = ""; }, 1100);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 6. Contact form (Formspree, AJAX) ---------- */
  var form = document.querySelector(".js-contact-form");
  if (form) {
    var status = form.querySelector(".form__status");
    form.addEventListener("submit", function (e) {
      if (form.action.indexOf("[FORM_ID]") !== -1) {
        e.preventDefault();
        status.className = "form__status is-error";
        status.textContent =
          "The contact form is not connected yet. Please email me directly — the address is listed on this page.";
        return;
      }
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      status.className = "form__status";
      status.textContent = "Sending…";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            status.className = "form__status is-success";
            status.textContent = "Thank you — your message has been sent. I will reply soon.";
          } else {
            throw new Error("Request failed");
          }
        })
        .catch(function () {
          status.className = "form__status is-error";
          status.textContent = "Sorry, the message could not be sent. Please email me directly.";
        })
        .then(function () { btn.disabled = false; });
    });
  }

  /* ---------- 7. Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  /* ---------- 8. Count-up numbers (stats + spec sheets) ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    var runCounter = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";
      var start = null;
      var duration = 1200;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
        if (p < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { counterIO.observe(el); });
  }

  /* ---------- 9. Crosshair on project images (mouse only) ---------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".card__media").forEach(function (media) {
      if (media.classList.contains("card__media--placeholder") || media.classList.contains("card__media--deck")) return;
      var h = document.createElement("span");
      var v = document.createElement("span");
      var label = document.createElement("span");
      h.className = "xhair xhair--h";
      v.className = "xhair xhair--v";
      label.className = "xhair xhair--label";
      [h, v, label].forEach(function (el) {
        el.setAttribute("aria-hidden", "true");
        media.appendChild(el);
      });
      media.addEventListener("mousemove", function (e) {
        var r = media.getBoundingClientRect();
        var x = Math.round(e.clientX - r.left);
        var y = Math.round(e.clientY - r.top);
        h.style.transform = "translateY(" + y + "px)";
        v.style.transform = "translateX(" + x + "px)";
        label.textContent = "X " + x + "  Y " + y;
        var lx = x + 10 + label.offsetWidth > r.width ? x - label.offsetWidth - 10 : x + 10;
        var ly = y + 10 + label.offsetHeight > r.height ? y - label.offsetHeight - 10 : y + 10;
        label.style.transform = "translate(" + lx + "px," + ly + "px)";
      });
    });
  }

  /* ---------- 10. Home hero photo slideshow ---------- */
  var slideshow = document.querySelector(".hero__slides");
  if (slideshow) {
    var slides = slideshow.querySelectorAll(".hero__slide");
    var dots = slideshow.querySelectorAll(".hero__dot");
    var currentSlide = 0;
    var timer = null;
    var showSlide = function (i) {
      currentSlide = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle("is-active", n === currentSlide); });
      dots.forEach(function (d, n) {
        d.classList.toggle("is-active", n === currentSlide);
        if (n === currentSlide) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
    };
    var start = function () {
      if (reduceMotion || timer) return;
      timer = window.setInterval(function () { showSlide(currentSlide + 1); }, 4500);
    };
    var stop = function () { window.clearInterval(timer); timer = null; };
    dots.forEach(function (d, n) {
      d.addEventListener("click", function () { stop(); showSlide(n); start(); });
    });
    // pause while the visitor is looking closely or using the dots
    slideshow.addEventListener("mouseenter", stop);
    slideshow.addEventListener("mouseleave", start);
    slideshow.addEventListener("focusin", stop);
    slideshow.addEventListener("focusout", start);
    start();
  }

  /* ---------- 11. CV preview window ---------- */
  var cvLinks = document.querySelectorAll("[data-cv-preview]");
  // The preview shows an image of the CV, so it works in every browser and on phones.
  if (cvLinks.length) {
    var cvModal = null;
    var cvLastFocus = null;

    var buildModal = function (url, preview) {
      var m = document.createElement("div");
      m.className = "cv-modal";
      m.hidden = true;
      m.setAttribute("role", "dialog");
      m.setAttribute("aria-modal", "true");
      m.setAttribute("aria-labelledby", "cv-modal-title");
      m.innerHTML =
        '<div class="cv-modal__panel">' +
          '<div class="cv-modal__bar">' +
            '<h2 class="cv-modal__title" id="cv-modal-title"><small>Resume</small>Mustafa Adawi</h2>' +
            '<div class="cv-modal__actions">' +
              '<a class="btn btn--primary" href="' + url + '" download>Download PDF</a>' +
              '<a class="btn btn--light btn--outline-light" href="' + url + '" target="_blank" rel="noopener">Open in new tab</a>' +
              '<button class="cv-modal__close" type="button" aria-label="Close resume preview">&times;</button>' +
            "</div>" +
          "</div>" +
          '<div class="cv-modal__body"><img class="cv-modal__sheet" src="' + preview + '" alt="Resume of Mustafa Adawi, Mechanical Engineer: contact, profile, education, work experience at GPIC, skills, academic projects, IOSH certificate and languages" width="1300" height="1838"></div>' +
        "</div>";
      document.body.appendChild(m);
      m.addEventListener("click", function (e) { if (e.target === m) closeCv(); });
      m.querySelector(".cv-modal__close").addEventListener("click", closeCv);
      m.setAttribute("data-url", url);
      return m;
    };

    var openCv = function (url, preview) {
      if (!cvModal) cvModal = buildModal(url, preview);
      cvModal.querySelector(".cv-modal__body").scrollTop = 0;
      cvLastFocus = document.activeElement;
      cvModal.hidden = false;
      document.body.classList.add("has-modal");
      window.requestAnimationFrame(function () { cvModal.classList.add("is-open"); });
      cvModal.querySelector(".cv-modal__close").focus();
    };

    var closeCv = function () {
      if (!cvModal || cvModal.hidden) return;
      cvModal.classList.remove("is-open");
      document.body.classList.remove("has-modal");
      window.setTimeout(function () { cvModal.hidden = true; }, reduceMotion ? 0 : 300);
      if (cvLastFocus) cvLastFocus.focus();
    };

    cvLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        openCv(link.getAttribute("href"), link.getAttribute("data-cv-preview") || "assets/img/resume-preview.jpg");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (!cvModal || cvModal.hidden) return;
      if (e.key === "Escape") closeCv();
      if (e.key === "Tab") {
        var f = Array.prototype.slice.call(cvModal.querySelectorAll("a, button"));
        var i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  /* ---------- 12. Slide deck viewer (project presentations) ---------- */
  var deckTriggers = document.querySelectorAll("[data-deck]");
  if (deckTriggers.length) {
    var deck = null;
    var deckState = { base: "", count: 0, index: 1, last: null };

    var pad = function (n) { return n < 10 ? "0" + n : String(n); };
    var slideUrl = function (i) { return deckState.base + pad(i) + ".jpg"; };

    var buildDeck = function () {
      var m = document.createElement("div");
      m.className = "deck-modal";
      m.hidden = true;
      m.setAttribute("role", "dialog");
      m.setAttribute("aria-modal", "true");
      m.setAttribute("aria-labelledby", "deck-modal-title");
      m.innerHTML =
        '<div class="deck-modal__top">' +
          '<h2 class="deck-modal__title" id="deck-modal-title"><small>Presentation</small><span></span></h2>' +
          '<button class="cv-modal__close" type="button" aria-label="Close presentation">&times;</button>' +
        "</div>" +
        '<div class="deck-modal__stage">' +
          '<img class="deck-modal__img" src="" alt="">' +
          '<button class="deck-modal__nav deck-modal__prev" type="button" aria-label="Previous slide">&#8249;</button>' +
          '<button class="deck-modal__nav deck-modal__next" type="button" aria-label="Next slide">&#8250;</button>' +
        "</div>" +
        '<div class="deck-modal__bottom"><span class="deck-modal__count" aria-live="polite"></span><div class="deck-modal__progress"><span></span></div></div>';
      document.body.appendChild(m);
      m.querySelector(".cv-modal__close").addEventListener("click", closeDeck);
      m.querySelector(".deck-modal__prev").addEventListener("click", function () { goSlide(deckState.index - 1); });
      m.querySelector(".deck-modal__next").addEventListener("click", function () { goSlide(deckState.index + 1); });
      m.addEventListener("click", function (e) { if (e.target === m) closeDeck(); });
      // swipe on touch screens
      var startX = null;
      m.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
      m.addEventListener("touchend", function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) goSlide(deckState.index + (dx < 0 ? 1 : -1));
        startX = null;
      });
      var img = m.querySelector(".deck-modal__img");
      img.addEventListener("load", function () { img.classList.remove("is-loading"); });
      return m;
    };

    var goSlide = function (i) {
      if (i < 1 || i > deckState.count) return;
      deckState.index = i;
      var img = deck.querySelector(".deck-modal__img");
      img.classList.add("is-loading");
      img.src = slideUrl(i);
      img.alt = deckState.title + " — slide " + i + " of " + deckState.count;
      deck.querySelector(".deck-modal__count").textContent = i + " / " + deckState.count;
      deck.querySelector(".deck-modal__progress span").style.width = (i / deckState.count * 100) + "%";
      deck.querySelector(".deck-modal__prev").disabled = i === 1;
      deck.querySelector(".deck-modal__next").disabled = i === deckState.count;
      // preload the next slide so paging feels instant
      if (i < deckState.count) { var pre = new Image(); pre.src = slideUrl(i + 1); }
    };

    var openDeck = function (trigger) {
      if (!deck) deck = buildDeck();
      deckState.base = trigger.getAttribute("data-deck");
      deckState.count = parseInt(trigger.getAttribute("data-deck-count"), 10) || 1;
      deckState.title = trigger.getAttribute("data-deck-title") || "Presentation";
      deckState.last = document.activeElement;
      deck.querySelector(".deck-modal__title span").textContent = deckState.title;
      goSlide(1);
      deck.hidden = false;
      document.body.classList.add("has-modal");
      window.requestAnimationFrame(function () { deck.classList.add("is-open"); });
      deck.querySelector(".deck-modal__next").focus();
    };

    var closeDeck = function () {
      if (!deck || deck.hidden) return;
      deck.classList.remove("is-open");
      document.body.classList.remove("has-modal");
      window.setTimeout(function () { deck.hidden = true; }, reduceMotion ? 0 : 300);
      if (deckState.last) deckState.last.focus();
    };

    deckTriggers.forEach(function (t) {
      t.addEventListener("click", function (e) { e.preventDefault(); openDeck(t); });
    });

    document.addEventListener("keydown", function (e) {
      if (!deck || deck.hidden) return;
      if (e.key === "Escape") closeDeck();
      if (e.key === "ArrowRight") goSlide(deckState.index + 1);
      if (e.key === "ArrowLeft") goSlide(deckState.index - 1);
      if (e.key === "Tab") {
        var f = Array.prototype.slice.call(deck.querySelectorAll("button:not([disabled])"));
        var k = f.indexOf(document.activeElement);
        if (e.shiftKey && k <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && k === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  /* ---------- 13. Case study image slideshow ---------- */
  document.querySelectorAll(".case-slider").forEach(function (slider) {
    var items = slider.querySelectorAll(".case-slide");
    var dotsWrap = slider.querySelector(".case-slider__dots");
    var current = 0;
    var timer = null;
    if (items.length < 2) return;

    var dotEls = [];
    items.forEach(function (_, n) {
      var d = document.createElement("button");
      d.type = "button";
      d.className = "case-slider__dot" + (n === 0 ? " is-active" : "");
      d.setAttribute("aria-label", "Image " + (n + 1) + " of " + items.length);
      d.addEventListener("click", function () { restart(n); });
      dotsWrap.appendChild(d);
      dotEls.push(d);
    });

    var show = function (n) {
      current = (n + items.length) % items.length;
      items.forEach(function (s, k) {
        s.classList.toggle("is-active", k === current);
        s.setAttribute("aria-hidden", k === current ? "false" : "true");
      });
      dotEls.forEach(function (d, k) {
        d.classList.toggle("is-active", k === current);
        if (k === current) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
      });
    };
    var start = function () {
      if (reduceMotion || timer) return;
      timer = window.setInterval(function () { show(current + 1); }, 4500);
    };
    var stop = function () { window.clearInterval(timer); timer = null; };
    var restart = function (n) { stop(); show(n); start(); };

    // click (or the Enlarge button) opens the current image full size, with all slides to browse
    var slideList = Array.prototype.map.call(items, function (s) {
      var im = s.querySelector(".case-slide__img");
      var cap = s.querySelector(".case-slide__caption");
      return { src: im.getAttribute("src"), alt: im.alt, caption: cap ? cap.textContent : "" };
    });
    var enlarge = document.createElement("button");
    enlarge.type = "button";
    enlarge.className = "case-slider__enlarge";
    enlarge.setAttribute("aria-label", "Enlarge image");
    enlarge.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg><span>Enlarge</span>';
    slider.appendChild(enlarge);
    var openCurrent = function () { stop(); openLightbox(slideList, current, start); };
    enlarge.addEventListener("click", openCurrent);
    slider.addEventListener("click", function (e) {
      if (e.target.closest(".case-slider__nav, .case-slider__dots, .case-slider__enlarge")) return;
      if (e.target.closest(".case-slide")) openCurrent();
    });

    slider.querySelector(".case-slider__prev").addEventListener("click", function () { restart(current - 1); });
    slider.querySelector(".case-slider__next").addEventListener("click", function () { restart(current + 1); });
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);

    var sx = null;
    slider.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) restart(current + (dx < 0 ? 1 : -1));
      sx = null;
    });

    start();
  });

  /* ---------- 14. Certificate preview (opens in the lightbox) ---------- */
  document.querySelectorAll("[data-cert]").forEach(function (el) {
    el.addEventListener("click", function () {
      openLightbox([{ src: el.getAttribute("data-cert"), alt: el.getAttribute("data-cert-title"), caption: el.getAttribute("data-cert-title") }], 0);
    });
  });

  /* ---------- 15. Scroll-driven meshing gears (Home) ---------- */
  var scrollGear = document.querySelector(".scroll-gear");
  if (scrollGear) {
    // build spur-gear outlines: teeth, outer radius, root radius
    var gearPath = function (teeth, ro, rr) {
      var d = "";
      var step = (Math.PI * 2) / teeth;
      for (var t = 0; t < teeth; t++) {
        var a = t * step;
        [[rr, -0.3], [ro, -0.16], [ro, 0.16], [rr, 0.3]].forEach(function (p, k) {
          var ang = a + p[1] * step;
          d += (t === 0 && k === 0 ? "M" : "L") + (p[0] * Math.cos(ang)).toFixed(2) + " " + (p[0] * Math.sin(ang)).toFixed(2);
        });
      }
      return d + "Z";
    };
    var BIG = 12, SMALL = 8;                       // tooth counts -> ratio 1.5
    var bigG = scrollGear.querySelector(".scroll-gear__big");
    var smallG = scrollGear.querySelector(".scroll-gear__small");
    bigG.querySelector("path").setAttribute("d", gearPath(BIG, 12, 9.6));
    smallG.querySelector("path").setAttribute("d", gearPath(SMALL, 8.4, 6.2));

    var ring = scrollGear.querySelector(".scroll-gear__ring");
    var circ = 2 * Math.PI * 29;
    ring.style.strokeDasharray = circ;
    ring.style.strokeDashoffset = circ;

    // offset the small gear by half a tooth so the teeth interlock
    var smallPhase = 180 / SMALL;
    var gearTick = false;
    var updateGears = function () {
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(y / max, 1) : 0;
      var angle = y * 0.25;                          // big gear turns with scroll
      bigG.setAttribute("transform", "translate(27 35) rotate(" + angle + ")");
      smallG.setAttribute("transform", "translate(41.6 22.4) rotate(" + (-angle * BIG / SMALL + smallPhase) + ")");
      ring.style.strokeDashoffset = circ * (1 - p);
      scrollGear.classList.toggle("is-shown", y > 300);
      gearTick = false;
    };
    window.addEventListener("scroll", function () {
      if (!gearTick) { window.requestAnimationFrame(updateGears); gearTick = true; }
    }, { passive: true });
    window.addEventListener("resize", updateGears);
    updateGears();

    scrollGear.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- 16. About page: tag stagger + timeline progress ---------- */
  document.querySelectorAll(".tags--pop").forEach(function (list) {
    Array.prototype.forEach.call(list.children, function (tag, i) {
      tag.style.transitionDelay = (0.15 + i * 0.05) + "s";
    });
  });

  var timeline = document.querySelector(".timeline--progress");
  if (timeline) {
    var tlItems = timeline.querySelectorAll(".timeline__item");
    var tlTick = false;
    var updateTimeline = function () {
      var rect = timeline.getBoundingClientRect();
      var mark = window.innerHeight * 0.6;              // the "reading line" at 60% of the screen
      var p = (mark - rect.top) / rect.height;
      p = Math.max(0, Math.min(1, p));
      timeline.style.setProperty("--tl", p.toFixed(3));
      tlItems.forEach(function (item) {
        item.classList.toggle("is-reached", item.getBoundingClientRect().top + 30 < mark);
      });
      tlTick = false;
    };
    window.addEventListener("scroll", function () {
      if (!tlTick) { window.requestAnimationFrame(updateTimeline); tlTick = true; }
    }, { passive: true });
    window.addEventListener("resize", updateTimeline);
    updateTimeline();
  }

  /* ---------- 17. Footer year ---------- */
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
