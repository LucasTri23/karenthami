/* ===========================================================
   Lucas ♥ Karen — script principal
   =========================================================== */

(function () {
  "use strict";

  const MS_SECOND = 1000;
  const MS_MINUTE = 60 * MS_SECOND;
  const MS_HOUR = 60 * MS_MINUTE;
  const MS_DAY = 24 * MS_HOUR;

  const MONTHS_PT = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  const DOW_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  /* ---------- helpers ---------- */

  function getByPath(obj, path) {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  }

  function formatNumber(value) {
    if (typeof value !== "number") return value;
    return value.toLocaleString("pt-BR", {
      maximumFractionDigits: value % 1 === 0 ? 0 : 1
    });
  }

  // "2024-04-07" -> "07 de abril de 2024"
  function formatDateLong(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return `${String(d).padStart(2, "0")} de ${MONTHS_PT[m - 1]} de ${y}`;
  }

  function todayIso() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function getCssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  /* ---------- tema (claro/escuro) ---------- */

  function initThemeToggle() {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");

    toggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      if (next === "dark") {
        root.setAttribute("data-theme", "dark");
      } else {
        root.removeAttribute("data-theme");
      }
      localStorage.setItem("theme", next);
      applyChartTheme();
    });
  }

  /* ---------- efeito 3D (tilt) ---------- */

  function initTilt() {
    document.querySelectorAll(".tilt").forEach((el) => {
      if (el.dataset.tiltBound) return;
      el.dataset.tiltBound = "true";

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = (-y * 12).toFixed(2);
        const rotateY = (x * 12).toFixed(2);
        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- parallax do hero ---------- */

  function initParallax() {
    const heroBg = document.querySelector(".hero-bg");
    const hero = document.getElementById("hero");
    if (!heroBg || !hero) return;

    function onScroll() {
      const max = hero.offsetHeight;
      const y = Math.min(window.scrollY, max);
      heroBg.style.transform = `translateY(${y * 0.35}px) scale(1.1)`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- lightbox (compartilhado) ---------- */

  let lightboxEl, lightboxImgEl, lightboxCaptionEl;

  function initLightbox() {
    lightboxEl = document.getElementById("lightbox");
    lightboxImgEl = document.getElementById("lightboxImg");
    lightboxCaptionEl = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("lightboxClose");

    closeBtn.addEventListener("click", closeLightbox);
    lightboxEl.addEventListener("click", (e) => {
      if (e.target === lightboxEl) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  function openLightbox(src, caption) {
    lightboxImgEl.src = src;
    lightboxCaptionEl.textContent = caption || "";
    lightboxEl.classList.add("open");
  }

  function closeLightbox() {
    lightboxEl.classList.remove("open");
  }

  /* ---------- navbar ---------- */

  function initNavbar() {
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");

    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    });

    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => links.classList.remove("open"));
    });
  }

  /* ---------- background floating hearts ---------- */

  function initBackgroundHearts() {
    const container = document.getElementById("heartsBg");
    const total = 18;
    for (let i = 0; i < total; i++) {
      const span = document.createElement("span");
      span.className = "bg-heart";
      span.textContent = "♥";
      span.style.left = `${Math.random() * 100}%`;
      span.style.fontSize = `${12 + Math.random() * 28}px`;
      span.style.animationDuration = `${18 + Math.random() * 22}s`;
      span.style.animationDelay = `${Math.random() * -40}s`;
      container.appendChild(span);
    }
  }

  /* ---------- live counter (hero + cards + footer) ---------- */

  function initLiveCounter(startDate) {
    const start = new Date(startDate).getTime();

    const cYears = document.getElementById("cYears");
    const cDays = document.getElementById("cDays");
    const cHours = document.getElementById("cHours");
    const cMinutes = document.getElementById("cMinutes");
    const cSeconds = document.getElementById("cSeconds");
    const daysTogetherEls = document.querySelectorAll('[data-live="daysTogether"]');
    const footerCounter = document.getElementById("footerCounter");

    function tick() {
      const diff = Date.now() - start;
      if (diff < 0) return;

      const totalDays = Math.floor(diff / MS_DAY);
      const years = Math.floor(totalDays / 365.25);
      const remDaysAfterYears = Math.floor(totalDays - years * 365.25);
      const hours = Math.floor((diff % MS_DAY) / MS_HOUR);
      const minutes = Math.floor((diff % MS_HOUR) / MS_MINUTE);
      const seconds = Math.floor((diff % MS_MINUTE) / MS_SECOND);

      cYears.textContent = years;
      cDays.textContent = remDaysAfterYears;
      cHours.textContent = String(hours).padStart(2, "0");
      cMinutes.textContent = String(minutes).padStart(2, "0");
      cSeconds.textContent = String(seconds).padStart(2, "0");

      daysTogetherEls.forEach((el) => {
        el.textContent = formatNumber(totalDays);
      });

      if (footerCounter) {
        footerCounter.textContent = `Juntos há ${formatNumber(totalDays)} dias ❤`;
      }
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ---------- count-up animation for stats ---------- */

  function animateCount(el, target) {
    const isFloat = target % 1 !== 0;
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = formatNumber(isFloat ? Math.round(value * 10) / 10 : Math.floor(value));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(target);
      }
    }
    requestAnimationFrame(step);
  }

  function initStatCards(stats) {
    const elements = document.querySelectorAll("[data-stat]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const value = getByPath(stats, el.dataset.stat);
          if (typeof value === "number") {
            animateCount(el, value);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    elements.forEach((el) => observer.observe(el));
  }

  /* ---------- amor em palavras ---------- */

  function initLoveBoard(stats) {
    const lucas = stats.people.lucas.teAmo;
    const karen = stats.people.karen.teAmo;
    const total = lucas + karen;

    document.getElementById("loveNameA").textContent = CONTENT.names.a;
    document.getElementById("loveNameB").textContent = CONTENT.names.b;

    const pct = total > 0 ? (lucas / total) * 100 : 50;
    requestAnimationFrame(() => {
      document.getElementById("loveBarFill").style.width = `${pct}%`;
    });

    const resultEl = document.getElementById("loveResult");
    const diff = Math.abs(lucas - karen);
    if (diff === 0) {
      resultEl.textContent = `Empate perfeito! Os dois disseram "te amo" exatamente ${formatNumber(lucas)} vezes. 💞`;
    } else {
      const winner = lucas > karen ? CONTENT.names.a : CONTENT.names.b;
      resultEl.textContent = `${winner} está na frente por ${formatNumber(diff)} "te amo"${diff > 1 ? "s" : ""} de diferença... mas no fim, amor não é competição (ou é? 😏)`;
    }

    // floating hearts inside the section
    const floatContainer = document.getElementById("floatingHearts");
    const hearts = ["💗", "💖", "💕", "❤️", "💓"];
    for (let i = 0; i < 16; i++) {
      const span = document.createElement("span");
      span.className = "floating-heart";
      span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      span.style.left = `${Math.random() * 100}%`;
      span.style.animationDuration = `${5 + Math.random() * 6}s`;
      span.style.animationDelay = `${Math.random() * -10}s`;
      span.style.fontSize = `${14 + Math.random() * 18}px`;
      floatContainer.appendChild(span);
    }
  }

  /* ---------- charts ---------- */

  let hourChart, dowChart;

  function applyChartTheme() {
    const tickColor = getCssVar("--text-light");
    [hourChart, dowChart].forEach((chart) => {
      if (!chart) return;
      chart.options.scales.x.ticks.color = tickColor;
      chart.update();
    });
  }

  function initCharts(stats) {
    const hourLabels = Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, "0")}h`);
    const tickColor = getCssVar("--text-light");

    hourChart = new Chart(document.getElementById("hourChart"), {
      type: "bar",
      data: {
        labels: hourLabels,
        datasets: [{
          label: "Mensagens",
          data: stats.hourDistribution,
          backgroundColor: "rgba(232, 83, 107, 0.65)",
          borderRadius: 4,
          maxBarThickness: 18
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: tickColor, font: { size: 9 } } },
          y: { display: false }
        }
      }
    });

    dowChart = new Chart(document.getElementById("dowChart"), {
      type: "bar",
      data: {
        labels: DOW_LABELS,
        datasets: [{
          label: "Mensagens",
          data: stats.dowDistribution,
          backgroundColor: [
            "rgba(91, 127, 232, 0.65)",
            "rgba(91, 127, 232, 0.65)",
            "rgba(91, 127, 232, 0.65)",
            "rgba(91, 127, 232, 0.65)",
            "rgba(91, 127, 232, 0.65)",
            "rgba(232, 83, 107, 0.65)",
            "rgba(232, 83, 107, 0.65)"
          ],
          borderRadius: 6,
          maxBarThickness: 48
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: tickColor } },
          y: { display: false }
        }
      }
    });

    // insight text
    const maxHour = stats.hourDistribution.indexOf(Math.max(...stats.hourDistribution));
    const maxDow = stats.dowDistribution.indexOf(Math.max(...stats.dowDistribution));
    const minDow = stats.dowDistribution.indexOf(Math.min(...stats.dowDistribution));
    const dowFull = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"];

    document.getElementById("routineInsight").innerHTML =
      `O horário em que mais trocamos mensagem é por volta das <strong>${String(maxHour).padStart(2, "0")}h</strong>, ` +
      `e <strong>${dowFull[maxDow]}</strong> é o dia da semana mais "tagarela" — ` +
      `enquanto <strong>${dowFull[minDow]}</strong> costuma ser o nosso dia mais tranquilo.`;
  }

  /* ---------- timeline ---------- */

  function initTimeline() {
    const container = document.getElementById("timeline");
    CONTENT.milestones.forEach((item) => {
      let dateLabel;
      if (item.dateLabel) {
        dateLabel = item.dateLabel;
      } else if (item.date === "today") {
        dateLabel = formatDateLong(todayIso());
      } else if (!item.date) {
        dateLabel = "✏️ adicione a data";
      } else {
        dateLabel = formatDateLong(item.date);
      }

      const photosHtml = item.images && item.images.length
        ? `<div class="timeline-photos">${item.images.map((file) =>
            `<img src="assets/img/${file}" alt="${item.title}" loading="lazy" class="timeline-photo tilt">`
          ).join("")}</div>`
        : "";

      const el = document.createElement("div");
      el.className = "timeline-item reveal";
      el.innerHTML = `
        <div class="timeline-icon">${item.icon}</div>
        <div class="timeline-card tilt">
          <p class="timeline-date">${dateLabel}</p>
          <p class="timeline-title">${item.title}</p>
          <p class="timeline-text">${item.text}</p>
          ${photosHtml}
        </div>
      `;
      container.appendChild(el);

      el.querySelectorAll(".timeline-photo").forEach((img) => {
        img.addEventListener("click", () => openLightbox(img.src, item.title));
      });
    });
  }

  /* ---------- dia histórico ---------- */

  function initHistoricDay() {
    const data = CONTENT.historicDay;
    document.getElementById("historicTitle").textContent = data.title;
    document.getElementById("historicDate").textContent = data.dateLabel;
    document.getElementById("historicStory").textContent = data.text;
    document.getElementById("historicPhoto").src = `assets/img/${data.photo}`;

    const messagesEl = document.getElementById("historicMessages");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(messagesEl, data.messages);
          observer.unobserve(messagesEl);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(messagesEl);
  }

  /* ---------- gallery ---------- */

  function initGallery(photos, storyPhotos) {
    const grid = document.getElementById("galleryGrid");

    const all = [
      ...storyPhotos.map((p) => ({ file: p.file, caption: p.caption })),
      ...photos.map((p) => ({ file: p.file, caption: formatDateLong(p.date) }))
    ];

    all.forEach((photo) => {
      const item = document.createElement("div");
      item.className = "gallery-item tilt reveal";
      const img = document.createElement("img");
      img.src = `assets/img/${photo.file}`;
      img.alt = photo.caption;
      img.loading = "lazy";
      item.appendChild(img);

      const cap = document.createElement("span");
      cap.className = "gallery-caption";
      cap.textContent = photo.caption;
      item.appendChild(cap);

      item.addEventListener("click", () => openLightbox(img.src, photo.caption));

      grid.appendChild(item);
    });
  }

  /* ---------- carta ---------- */

  function initLetter() {
    const data = CONTENT.letter;
    document.getElementById("letterTitle").textContent = data.title;

    const paper = document.getElementById("letterPaper");
    paper.innerHTML = data.paragraphs.map((p) => `<p>${p}</p>`).join("") +
      `<p class="letter-signature">— ${data.signature}</p>`;

    const envelope = document.getElementById("envelope");
    const front = document.getElementById("envelopeFront");
    front.addEventListener("click", () => {
      envelope.classList.add("open");
    });
  }

  /* ---------- reveal on scroll ---------- */

  function initRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  /* ---------- init ---------- */

  async function init() {
    initThemeToggle();
    initNavbar();
    initBackgroundHearts();
    initLiveCounter(CONTENT.startDate);
    initLightbox();
    initParallax();
    initTimeline();
    initHistoricDay();
    initLetter();

    const [stats, photos, storyPhotos] = await Promise.all([
      fetch("data/stats.json").then((r) => r.json()),
      fetch("data/photos.json").then((r) => r.json()),
      fetch("data/story-photos.json").then((r) => r.json())
    ]);

    initStatCards(stats);
    initLoveBoard(stats);
    initCharts(stats);
    initGallery(photos, storyPhotos);

    // run reveal/tilt observers after dynamic content is in the DOM
    initRevealObserver();
    initTilt();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
