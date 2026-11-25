/* ==========================================================================
   MEROS Project Page: Interactive Visualizations, Real DINOv3 Lab & Benchmarks
   All quantitative figures match MEROS_ARXIV/meros_report_v1/main.tex verbatim.
   ========================================================================== */

(function () {
  "use strict";

  const MUL = '<span class="mul">&times;</span>';
  function fmtX(str) {
    return String(str)
      .replace(/(\d[\d.,]*)×(\d[\d.,]*)/g, `<span class="nowrap">$1${MUL}$2</span>`)
      .replace(/(\d[\d.,]*)×/g, `<span class="nowrap">$1${MUL}</span>`)
      .replace(/×/g, MUL);
  }

  /* -------------------- Toast Utility -------------------- */
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  /* -------------------- KaTeX Auto-Render -------------------- */
  window.addEventListener("DOMContentLoaded", () => {
    const tryRenderMath = () => {
      if (typeof window.renderMathInElement === "function") {
        window.renderMathInElement(document.body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      }
    };
    tryRenderMath();
    window.addEventListener("load", tryRenderMath);
  });

  /* -------------------- Scroll Progress & Active Nav -------------------- */
  const progressEl = document.getElementById("scrollProgress");
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  function onScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    if (progressEl) progressEl.style.width = pct.toFixed(2) + "%";

    const y = window.scrollY + 120;
    let activeId = sections[0] ? sections[0].id : "";
    for (const sec of sections) {
      if (sec.offsetTop <= y) activeId = sec.id;
    }
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + activeId);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -------------------- Placeholder Links (Paper / Code) -------------------- */
  document.querySelectorAll("[data-placeholder]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const href = el.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        showToast(el.getAttribute("data-placeholder"));
      }
    });
  });

  /* -------------------- Fullscreen Lightbox -------------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || "Enlarged publication figure";
    lightboxCaption.textContent = caption || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => {
      openLightbox(el.getAttribute("data-lightbox"), el.getAttribute("data-caption") || "");
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });

  /* -------------------- Helper: Dual-Line Compare Badge -------------------- */
  function setBadge(id, title, subHtml) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<span class="cb-title">${title}</span><span class="cb-sub">${fmtX(subHtml)}</span>`;
  }

  /* -------------------- Reusable Split-Curtain Compare Slider -------------------- */
  function initCompareSlider(el, initialPct = 50) {
    if (!el) return null;
    let pct = initialPct;
    let dragging = false;

    function setPos(next) {
      pct = Math.max(2, Math.min(98, next));
      el.style.setProperty("--pos", pct.toFixed(2) + "%");
    }

    function updateFromClientX(clientX) {
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0) return;
      const ratio = ((clientX - rect.left) / rect.width) * 100;
      setPos(ratio);
      el.classList.add("has-interacted");
    }

    el.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      dragging = true;
      el.classList.add("is-dragging");
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
      updateFromClientX(e.clientX);
    });

    el.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      updateFromClientX(e.clientX);
    });

    const stopDrag = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("is-dragging");
    };
    el.addEventListener("pointerup", stopDrag);
    el.addEventListener("pointercancel", stopDrag);

    el.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPos(pct - 4);
        el.classList.add("has-interacted");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setPos(pct + 4);
        el.classList.add("has-interacted");
      }
    });

    setPos(initialPct);
    return { setPos };
  }

  /* ==================== 0. HERO HALF-COLUMN OPERATOR SPEEDUP CHART ==================== */
  const HERO_OP_DATA = {
    labels: ["1K", "2K", "4K", "6K", "8K"],
    fa2: {
      8: [4.04, 11.0, 21.0, 23.5, 24.8],
      4: [3.42, 7.89, 11.7, 12.5, 12.5],
      2: [2.30, 4.80, 6.08, 6.26, 6.05]
    },
    fa4: {
      8: [3.21, 4.21, 7.07, 7.89, 8.44],
      4: [2.71, 3.02, 3.94, 4.19, 4.25],
      2: [1.83, 1.84, 2.05, 2.10, 2.06]
    },
    // Vanilla Attention explicit QK^T softmax PV (teaser Fig 1c: r=8 is 67x @ 1K, 145x @ 2K, OOM >= 4K)
    vanilla: {
      8: [67, 145, null, null, null],
      4: [57, 104, null, null, null],
      2: [38, 63, null, null, null]
    },
    err: {
      8: [0.180, 0.106, 0.052, 0.036, 0.027],
      4: [0.123, 0.071, 0.035, 0.023, 0.018],
      2: [0.073, 0.041, 0.020, 0.013, 0.010]
    }
  };

  const heroSpeedState = { base: "fa2", r: 8 };

  function renderHeroSpeedChart() {
    const svg = document.getElementById("heroSpeedSvg");
    if (!svg) return;

    const base = heroSpeedState.base;
    const r = heroSpeedState.r;
    const vals = HERO_OP_DATA[base][r];
    const errs = HERO_OP_DATA.err[r];
    const numericVals = vals.filter((v) => v !== null);
    const peak = Math.max(...numericVals);
    const peakStr = peak >= 10 ? (base === "vanilla" ? String(Math.round(peak)) : peak.toFixed(1)) : peak.toFixed(2);

    const titleEl = document.getElementById("heroSpeedTitle");
    if (titleEl) {
      if (base === "vanilla") {
        titleEl.innerHTML = `MEROS Attention is up to <span class="accent-num" style="color:#d8b4fe;">${peakStr}${MUL}</span> Faster than Vanilla Attention`;
      } else if (base === "fa4") {
        titleEl.innerHTML = `MEROS Attention is up to <span class="accent-num" style="color:#5eead4;">${peakStr}${MUL}</span> Faster than Exact FA4`;
      } else {
        titleEl.innerHTML = `MEROS Attention is up to <span class="accent-num">${peakStr}${MUL}</span> Faster than Exact FA2`;
      }
    }

    const W = 540, H = 312;
    const padL = 58, padR = 10;
    const barTop = 26, barBottom = 224;
    const barAreaH = barBottom - barTop;

    const maxY = base === "vanilla"
      ? (r === 8 ? 165 : r === 4 ? 120 : 75)
      : base === "fa2"
        ? (r === 8 ? 27.5 : r === 4 ? 14.5 : 7.5)
        : (r === 8 ? 9.8 : r === 4 ? 5.0 : 2.6);

    const plotW = W - padL - padR;
    const colStep = plotW / 5;
    const barW = 58;
    const yBar = (v) => barBottom - (v / maxY) * barAreaH;
    const xCenter = (i) => padL + colStep * (i + 0.5);

    const ticks = base === "vanilla"
      ? (r === 8 ? [0, 50, 100, 150] : r === 4 ? [0, 30, 60, 90, 120] : [0, 20, 40, 60])
      : base === "fa2"
        ? (r === 8 ? [0, 5, 10, 15, 20, 25] : r === 4 ? [0, 3, 6, 9, 12] : [0, 2, 4, 6])
        : (r === 8 ? [0, 2, 4, 6, 8] : r === 4 ? [0, 1, 2, 3, 4] : [0, 1, 2]);

    let s = `
      <defs>
        <linearGradient id="heroBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f97316"/>
          <stop offset="55%" stop-color="#d94e23"/>
          <stop offset="100%" stop-color="#9a3412"/>
        </linearGradient>
        <linearGradient id="heroBarPeakGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fdba74"/>
          <stop offset="35%" stop-color="#fb7138"/>
          <stop offset="100%" stop-color="#c94a22"/>
        </linearGradient>
        <linearGradient id="heroBarFa4Grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2dd4bf"/>
          <stop offset="55%" stop-color="#0d9488"/>
          <stop offset="100%" stop-color="#0f766e"/>
        </linearGradient>
        <linearGradient id="heroBarVanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#d8b4fe"/>
          <stop offset="40%" stop-color="#a855f7"/>
          <stop offset="100%" stop-color="#6b21a8"/>
        </linearGradient>
        <filter id="peakGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>`;

    // Horizontal gridlines
    ticks.forEach((t) => {
      const y = yBar(t);
      s += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="rgba(148,163,184,0.13)" stroke-width="1"/>`;
      s += `<text x="${padL - 9}" y="${(y + 3.5).toFixed(1)}" text-anchor="end" fill="#94a3b8" font-size="10.5" font-family="JetBrains Mono, monospace">${t}×</text>`;
    });

    // 5 Columns
    vals.forEach((v, i) => {
      const cx = xCenter(i);
      const bx = cx - barW / 2;

      // Subtle track ghost behind column
      s += `<rect x="${bx.toFixed(1)}" y="${barTop}" width="${barW}" height="${barAreaH}" rx="8" fill="rgba(255,255,255,0.024)"/>`;

      if (v === null) {
        // Minimal, crisp Vanilla OOM column
        const oomY = barTop + 14;
        const oomH = barBottom - oomY;
        s += `<rect x="${bx.toFixed(1)}" y="${oomY}" width="${barW}" height="${oomH}" rx="8" fill="rgba(244, 63, 94, 0.10)" stroke="rgba(251, 113, 133, 0.48)" stroke-width="1.25" stroke-dasharray="4 3"/>`;
        s += `<text x="${cx.toFixed(1)}" y="${(oomY + oomH / 2 - 5).toFixed(1)}" text-anchor="middle" fill="#fda4af" font-size="10.5" font-weight="600" font-family="JetBrains Mono, monospace">Vanilla</text>`;
        s += `<text x="${cx.toFixed(1)}" y="${(oomY + oomH / 2 + 12).toFixed(1)}" text-anchor="middle" fill="#fb7185" font-size="12.5" font-weight="800" font-family="JetBrains Mono, monospace">OOM</text>`;
      } else {
        const by = yBar(v);
        const bh = Math.max(4, barBottom - by);
        const isPeak = (base === "vanilla" ? i === 1 : i === 4);
        const fill = base === "vanilla"
          ? "url(#heroBarVanGrad)"
          : base === "fa4"
            ? "url(#heroBarFa4Grad)"
            : (isPeak ? "url(#heroBarPeakGrad)" : "url(#heroBarGrad)");

        if (isPeak) {
          s += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW}" height="${bh.toFixed(1)}" rx="8" fill="${fill}" filter="url(#peakGlow)" opacity="0.48"/>`;
        }
        s += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW}" height="${bh.toFixed(1)}" rx="8" fill="${fill}"/>`;
        s += `<rect x="${(bx + 5).toFixed(1)}" y="${(by + 1.5).toFixed(1)}" width="${barW - 10}" height="2" rx="1" fill="rgba(255,255,255,0.45)"/>`;

        const valTxt = base === "vanilla" ? String(Math.round(v)) : (v >= 10 ? v.toFixed(1) : v.toFixed(2));
        const lblColor = isPeak
          ? (base === "vanilla" ? "#e9d5ff" : base === "fa4" ? "#5eead4" : "#fdba74")
          : "#f8fafc";
        const lblSize = isPeak ? 16.5 : 13.5;
        s += `<text x="${cx.toFixed(1)}" y="${(by - 9).toFixed(1)}" text-anchor="middle" fill="${lblColor}" font-size="${lblSize}" font-weight="700" font-family="JetBrains Mono, monospace">${valTxt}<tspan font-family="Inter, sans-serif" font-size="${(lblSize * 1.08).toFixed(1)}" font-weight="700">×</tspan></text>`;
      }

      // Resolution label below baseline
      const hiLabel = (base === "vanilla" ? i === 1 : i === 4);
      s += `<text x="${cx.toFixed(1)}" y="${barBottom + 18}" text-anchor="middle" fill="${hiLabel ? "#ffffff" : "#cbd5e1"}" font-size="11.5" font-weight="${hiLabel ? "700" : "600"}" font-family="JetBrains Mono, monospace">${HERO_OP_DATA.labels[i]}</text>`;
    });

    // Clean, minimal Relative Error Sub-Track (left axis label, zero clutter inside box)
    const trackY = 258;
    const trackH = 48;
    s += `<text x="${padL - 9}" y="${trackY + 21}" text-anchor="end" fill="#5eead4" font-size="9.5" font-weight="600" font-family="JetBrains Mono, monospace">Relative<tspan x="${padL - 9}" dy="12.5">Error</tspan></text>`;
    s += `<rect x="${padL}" y="${trackY}" width="${plotW}" height="${trackH}" rx="10" fill="rgba(15, 23, 42, 0.58)" stroke="rgba(45, 212, 191, 0.22)" stroke-width="1"/>`;

    const sparkTop = trackY + 24;
    const sparkBot = trackY + 40;
    const eMax = errs[0] * 1.08;
    const ePts = errs.map((e, i) => {
      const ex = xCenter(i);
      const ey = sparkBot - (e / eMax) * (sparkBot - sparkTop);
      return [ex, ey, e];
    });
    const polyStr = ePts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
    s += `<polyline points="${polyStr}" fill="none" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;

    ePts.forEach(([ex, ey, e], i) => {
      const isLast = i === 4;
      s += `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="${isLast ? 4 : 3}" fill="${isLast ? "#5eead4" : "#2dd4bf"}" stroke="#0f172a" stroke-width="1.3"/>`;
      s += `<text x="${ex.toFixed(1)}" y="${(ey - 7.5).toFixed(1)}" text-anchor="middle" fill="${isLast ? "#5eead4" : "#cbd5e1"}" font-size="10.5" font-weight="${isLast ? "700" : "600"}" font-family="JetBrains Mono, monospace">.${Math.round(e * 1000).toString().padStart(3, "0")}</text>`;
    });

    svg.innerHTML = s;
  }

  document.querySelectorAll("#heroSpeedBaseBtns .dark-mini-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#heroSpeedBaseBtns .dark-mini-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      heroSpeedState.base = btn.dataset.hbase;
      renderHeroSpeedChart();
    });
  });

  document.querySelectorAll("#heroSpeedBudgetBtns .dark-mini-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#heroSpeedBudgetBtns .dark-mini-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      heroSpeedState.r = parseInt(btn.dataset.hr, 10);
      renderHeroSpeedChart();
    });
  });

  renderHeroSpeedChart();

  /* ==================== 0B. LIVE WALL-CLOCK SPEED RACE (DINOV3-L, 2K-8K) ==================== */
  const RACE_PRESETS = {
    "8k": {
      label: "8192×8192",
      gpu: "NVIDIA B300",
      tokens: "262k tokens",
      merosS: 0.963,
      fa2S: 18.433,
      vanS: null,
      oomAtS: 0.35,
      oomSub: "Quadratic 262k×262k attention exceeds 180 GB VRAM",
      speedupVsFa2: "19.1×",
      cos: "0.993",
      defaultPace: 1.0
    },
    "69k": {
      label: "6912×4608",
      gpu: "NVIDIA H200",
      tokens: "124k tokens",
      merosS: 0.682,
      fa2S: 5.119,
      vanS: null,
      oomAtS: 0.25,
      oomSub: "Quadratic 124k×124k attention exceeds 141 GB VRAM",
      speedupVsFa2: "7.5×",
      cos: "0.991",
      defaultPace: 1.0,
      useMs: false
    },
    "4k": {
      label: "4096×4096",
      gpu: "NVIDIA B300",
      tokens: "65k tokens",
      merosS: 0.113,
      fa2S: 1.272,
      vanS: null,
      oomAtS: 0.09,
      oomSub: "Quadratic 65k×65k attention exceeds 180 GB VRAM",
      speedupVsFa2: "11.3×",
      cos: "0.993",
      defaultPace: 0.2,
      useMs: true
    },
    "2k": {
      label: "2048×2048",
      gpu: "NVIDIA B300",
      tokens: "16k tokens",
      merosS: 0.021,
      fa2S: 0.111,
      vanS: 1.003,
      oomAtS: null,
      oomSub: "",
      speedupVsFa2: "5.3× vs. FA2 · 48.2× vs. Vanilla",
      cos: "0.993",
      defaultPace: 0.125,
      useMs: true
    }
  };

  (function initSpeedRace() {
    const theater = document.getElementById("raceTheater");
    if (!theater) return;

    const els = {
      clockVal: document.getElementById("raceClockVal"),
      speedBtn: document.getElementById("raceSpeedBtn"),
      pauseBtn: document.getElementById("racePauseBtn"),
      replayBtn: document.getElementById("raceReplayBtn"),
      verdict: document.getElementById("raceVerdict"),
      verdictText: document.getElementById("raceVerdictText"),
      meros: {
        card: document.getElementById("raceCardMeros"),
        meta: document.getElementById("raceMetaMeros"),
        stat: document.getElementById("raceStatMeros"),
        rev: document.getElementById("raceRevMeros"),
        scan: document.getElementById("raceScanMeros"),
        badge: document.getElementById("raceBadgeMeros"),
        bar: document.getElementById("raceBarMeros"),
        time: document.getElementById("raceTimeMeros"),
        note: document.getElementById("raceNoteMeros")
      },
      fa2: {
        card: document.getElementById("raceCardFa2"),
        meta: document.getElementById("raceMetaFa2"),
        stat: document.getElementById("raceStatFa2"),
        rev: document.getElementById("raceRevFa2"),
        scan: document.getElementById("raceScanFa2"),
        badge: document.getElementById("raceBadgeFa2"),
        bar: document.getElementById("raceBarFa2"),
        time: document.getElementById("raceTimeFa2"),
        note: document.getElementById("raceNoteFa2")
      },
      van: {
        card: document.getElementById("raceCardVan"),
        meta: document.getElementById("raceMetaVan"),
        stat: document.getElementById("raceStatVan"),
        rev: document.getElementById("raceRevVan"),
        scan: document.getElementById("raceScanVan"),
        badge: document.getElementById("raceBadgeVan"),
        oomSub: document.getElementById("raceOomSub"),
        bar: document.getElementById("raceBarVan"),
        time: document.getElementById("raceTimeVan"),
        note: document.getElementById("raceNoteVan")
      }
    };

    const st = {
      key: "8k",
      pace: 1.0,
      simSec: 0,
      holdSec: 0,
      paused: false,
      inView: true,
      lastTs: null
    };

    function fmtVal(s, useMs) {
      if (useMs) {
        const ms = Math.round(s * 1000);
        return `${ms.toLocaleString("en-US")} ms`;
      }
      if (s < 0.1 && s > 0) return `${Math.round(s * 1000)} ms`;
      return `${s.toFixed(2)} s`;
    }

    function updatePaceBtn() {
      if (!els.speedBtn) return;
      const defP = RACE_PRESETS[st.key].defaultPace;
      const canToggle = defP !== 1.0;
      els.speedBtn.disabled = !canToggle;
      els.speedBtn.style.opacity = canToggle ? "1" : "0.78";
      els.speedBtn.style.cursor = canToggle ? "pointer" : "default";
      els.speedBtn.title = canToggle
        ? "Toggle uniform slow-motion vs. 1x real-time (same ratio for all methods)"
        : "Playing at true 1x real-time wall-clock speed";
      if (st.pace === 1.0) {
        els.speedBtn.innerHTML = `1${MUL} real-time`;
      } else {
        els.speedBtn.innerHTML = `${st.pace}${MUL} slow-mo`;
      }
    }

    function applyPresetMeta() {
      const p = RACE_PRESETS[st.key];
      els.meros.meta.innerHTML = fmtX(`DINOv3-L · ${p.tokens}`);
      els.fa2.meta.innerHTML = fmtX(`DINOv3-L · ${p.tokens}`);
      els.van.meta.innerHTML = fmtX(`Explicit QKᵀ · ${p.tokens}`);
      els.meros.badge.innerHTML = fmtX(p.vanS ? `5.3× vs. FA2 · 48.2× vs. Vanilla` : `${p.speedupVsFa2} faster · cos ${p.cos}`);
      els.fa2.badge.innerHTML = fmtX(p.vanS ? `Same map · 5.3× slower` : `Same map · ${p.speedupVsFa2} slower`);
      els.van.badge.innerHTML = fmtX(`Same map · 48.2× slower`);
      els.van.oomSub.innerHTML = fmtX(p.oomSub);
      updatePaceBtn();
    }

    function setLaneVisual(lane, pct, activeScan) {
      const clamped = Math.max(0, Math.min(100, pct));
      lane.rev.style.clipPath = `inset(0 ${(100 - clamped).toFixed(2)}% 0 0)`;
      lane.bar.style.width = `${clamped.toFixed(2)}%`;
      if (activeScan && clamped > 0.5 && clamped < 99.8) {
        lane.scan.style.opacity = "1";
        lane.scan.style.left = `${clamped.toFixed(2)}%`;
      } else {
        lane.scan.style.opacity = "0";
      }
    }

    function renderFrame() {
      const p = RACE_PRESETS[st.key];
      const maxS = p.vanS ? Math.max(p.fa2S, p.vanS) : p.fa2S;
      const t = Math.min(st.simSec, maxS);
      const msMode = Boolean(p.useMs);
      els.clockVal.textContent = fmtVal(t, msMode);

      // Lane 1: MEROS r=8
      const mDone = t >= p.merosS;
      const mPct = mDone ? 100 : (t / p.merosS) * 100;
      setLaneVisual(els.meros, mPct, !mDone);
      els.meros.card.classList.toggle("is-done", mDone);
      els.meros.stat.textContent = mDone ? `DONE · ${fmtVal(p.merosS, msMode)}` : `${Math.floor(mPct)}%`;
      els.meros.time.textContent = fmtVal(Math.min(t, p.merosS), msMode);
      if (mDone) {
        const waitLeft = Math.max(0, maxS - t);
        els.meros.note.textContent = waitLeft > 0.004
          ? `Done! Waiting +${fmtVal(t - p.merosS, msMode)}`
          : `Saved ${fmtVal(maxS - p.merosS, msMode)} per image`;
      } else {
        els.meros.note.textContent = `Target: ${fmtVal(p.merosS, msMode)}`;
      }

      // Lane 2: Exact FA2
      const fDone = t >= p.fa2S;
      const fPct = fDone ? 100 : (t / p.fa2S) * 100;
      setLaneVisual(els.fa2, fPct, !fDone);
      els.fa2.card.classList.toggle("is-done", fDone);
      els.fa2.stat.textContent = fDone ? `DONE · ${fmtVal(p.fa2S, msMode)}` : `${Math.floor(fPct)}%`;
      els.fa2.time.textContent = fmtVal(Math.min(t, p.fa2S), msMode);
      els.fa2.note.textContent = fDone
        ? `Identical feature map`
        : `Target: ${fmtVal(p.fa2S, msMode)}`;

      // Lane 3: Vanilla Exact Attention
      let vPct = 0;
      if (p.vanS === null) {
        const oomHit = t >= p.oomAtS;
        vPct = oomHit ? 11 : (t / p.oomAtS) * 11;
        setLaneVisual(els.van, 0, false);
        els.van.bar.style.width = `${vPct.toFixed(1)}%`;
        els.van.card.classList.remove("is-done");
        els.van.card.classList.toggle("is-oom", oomHit);
        els.van.stat.textContent = oomHit ? "CUDA OOM" : "Allocating";
        els.van.time.textContent = oomHit ? "OOM" : fmtVal(t, msMode);
        els.van.note.textContent = oomHit ? "Exceeds GPU VRAM" : "Allocating QKᵀ...";
      } else {
        els.van.card.classList.remove("is-oom");
        const vDone = t >= p.vanS;
        vPct = vDone ? 100 : (t / p.vanS) * 100;
        setLaneVisual(els.van, vPct, !vDone);
        els.van.card.classList.toggle("is-done", vDone);
        els.van.stat.textContent = vDone ? `DONE · ${fmtVal(p.vanS, msMode)}` : `${Math.floor(vPct)}%`;
        els.van.time.textContent = fmtVal(Math.min(t, p.vanS), msMode);
        els.van.note.textContent = vDone ? `48.2× slower than MEROS` : `Target: ${fmtVal(p.vanS, msMode)}`;
      }

      // Bottom verdict strip
      const allDone = t >= maxS;
      els.verdict.classList.toggle("is-complete", allDone);
      if (allDone) {
        if (p.vanS === null) {
          els.verdictText.innerHTML = fmtX(
            `<strong>Same dense DINOv3-L features (patch cosine ${p.cos}):</strong> MEROS r=8 finishes in <strong>${fmtVal(p.merosS, msMode)}</strong> vs. FlashAttention-2 in <strong>${fmtVal(p.fa2S, msMode)}</strong> (${p.speedupVsFa2} faster on ${p.gpu}), while Vanilla Attention runs out of memory.`
          );
        } else {
          els.verdictText.innerHTML = fmtX(
            `<strong>Same dense DINOv3-L features (patch cosine ${p.cos}):</strong> At 2K (${p.gpu}), MEROS r=8 finishes in <strong>21 ms</strong> vs. 111 ms FlashAttention-2 (5.3×) and <strong>1,003 ms</strong> Vanilla Attention (48.2×), before Vanilla hits OOM at 4K+.`
          );
        }
      } else if (mDone && fDone && p.vanS) {
        els.verdictText.innerHTML = fmtX(
          `<strong>MEROS (21 ms) and FlashAttention-2 (111 ms) are done.</strong> Vanilla Attention is still crawling at ${Math.floor(vPct)}% (${fmtVal(t, true)} / 1,003 ms) on ${p.gpu}.`
        );
      } else if (mDone) {
        els.verdictText.innerHTML = fmtX(
          p.vanS
            ? `<strong>MEROS r=8 already finished in 21 ms.</strong> FlashAttention-2 is at ${Math.floor(fPct)}% and Vanilla Attention is at ${Math.floor(vPct)}% (${fmtVal(t, true)}).`
            : `<strong>MEROS r=8 already finished in ${fmtVal(p.merosS, msMode)}.</strong> FlashAttention-2 is at ${Math.floor(fPct)}% (${fmtVal(t, msMode)} / ${fmtVal(p.fa2S, msMode)}) on ${p.gpu}.`
        );
      } else {
        els.verdictText.innerHTML = fmtX(
          `Encoding ${p.label} (${p.tokens}) with frozen DINOv3-L on ${p.gpu} (BF16, Batch 1)...`
        );
      }
    }

    function resetRace(key) {
      if (key) {
        st.key = key;
        st.pace = RACE_PRESETS[key].defaultPace;
      }
      st.simSec = 0;
      st.holdSec = 0;
      st.paused = false;
      st.lastTs = null;
      theater.classList.remove("is-paused");
      if (els.pauseBtn) els.pauseBtn.textContent = "Pause";
      applyPresetMeta();
      renderFrame();
    }

    function tick(ts) {
      requestAnimationFrame(tick);
      if (st.paused || !st.inView) {
        st.lastTs = ts;
        return;
      }
      if (st.lastTs === null) {
        st.lastTs = ts;
        return;
      }
      const dtReal = Math.min(0.1, (ts - st.lastTs) / 1000);
      st.lastTs = ts;

      const p = RACE_PRESETS[st.key];
      const maxS = p.vanS ? Math.max(p.fa2S, p.vanS) : p.fa2S;
      if (st.simSec < maxS) {
        st.simSec = Math.min(maxS, st.simSec + dtReal * st.pace);
      } else {
        st.holdSec += dtReal;
        if (st.holdSec >= 3.0) {
          st.simSec = 0;
          st.holdSec = 0;
        }
      }
      renderFrame();
    }

    document.querySelectorAll("#raceResBtns .race-res-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#raceResBtns .race-res-btn").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        resetRace(btn.dataset.rkey);
      });
    });

    if (els.speedBtn) {
      els.speedBtn.addEventListener("click", () => {
        const defP = RACE_PRESETS[st.key].defaultPace;
        st.pace = st.pace === 1.0 ? defP : 1.0;
        updatePaceBtn();
      });
    }

    if (els.pauseBtn) {
      els.pauseBtn.addEventListener("click", () => {
        st.paused = !st.paused;
        theater.classList.toggle("is-paused", st.paused);
        els.pauseBtn.textContent = st.paused ? "Resume" : "Pause";
      });
    }

    if (els.replayBtn) {
      els.replayBtn.addEventListener("click", () => resetRace());
    }

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const wasIn = st.inView;
          st.inView = entry.isIntersecting;
          if (!wasIn && st.inView) {
            st.lastTs = null;
          }
        });
      }, { threshold: 0.15 });
      io.observe(theater);
    }

    // Helper for deterministic QA screenshots
    window.__setRaceTime = (sec, key) => {
      if (key && RACE_PRESETS[key]) {
        st.key = key;
        st.pace = RACE_PRESETS[key].defaultPace;
        document.querySelectorAll("#raceResBtns .race-res-btn").forEach((b) => {
          const act = b.dataset.rkey === key;
          b.classList.toggle("active", act);
          b.setAttribute("aria-selected", String(act));
        });
        applyPresetMeta();
      }
      st.paused = true;
      theater.classList.add("is-paused");
      st.simSec = sec;
      renderFrame();
    };

    resetRace("8k");
    requestAnimationFrame(tick);
  })();

  /* ==================== 1. EQUAL-TIME-BUDGET MULTI-TASK SHOWCASE (22 CURATED CASES) ==================== */
  const SHOWCASE = window.MEROS_SHOWCASE || { tracks: [], cases: {}, highlights: [] };
  const seattleStageEl = document.getElementById("seattleCompare");
  const seattleSlider = initCompareSlider(seattleStageEl, 50);

  const PCA_PALETTE_MAP = {
    "dinov3_l__scaffold__iso_vanilla_1k": "url(#pca-obsidian)",
    "dinov2_l__scaffold__iso_fa2_2k": "url(#pca-obsidian)",
    "dinov3_l__seattle_night__iso_fa2_4k": "url(#pca-nightsky)",
    "dinov3_l__seattle_night__iso_vanilla_2k": "url(#pca-nightsky)",
    "dinov3_l__div8k_plant__iso_vanilla_1k": "url(#pca-ember)",
    "dinov3_b__seattle_night__iso_vanilla_2k": "url(#pca-ember)"
  };

  const DEFAULT_SPLIT_MAP = {
    "dinov3_l__scaffold__iso_vanilla_1k": 56,
    "dinov2_l__scaffold__iso_fa2_2k": 56,
    "dinov3_l__seattle_night__iso_fa2_4k": 50,
    "dinov3_l__seattle_night__iso_vanilla_2k": 50,
    "dinov3_b__seattle_night__iso_vanilla_2k": 50,
    "sam_vit_h__uhrsd_002111__iso_encoder_2k": 65
  };

  const initialTrackId = SHOWCASE.tracks[0] ? SHOWCASE.tracks[0].id : "features";
  const initialCaseId = SHOWCASE.tracks[0] && SHOWCASE.tracks[0].cases[0] ? SHOWCASE.tracks[0].cases[0] : "";
  const initialCaseObj = SHOWCASE.cases[initialCaseId];

  const showcaseState = {
    trackId: initialTrackId,
    caseId: initialCaseId,
    viewId: (initialCaseObj && (initialCaseObj.defaultView || (initialCaseObj.views[0] && initialCaseObj.views[0].id))) || "sim_overlay",
    vividPca: true,
    loupeOn: false
  };

  function isPcaShowcaseView(trackId, caseId, viewId) {
    return trackId === "features" && Boolean(PCA_PALETTE_MAP[caseId]) && (viewId === "main" || viewId === "zoom1" || viewId === "zoom2");
  }

  function getDefaultViewId(cid) {
    const c = SHOWCASE.cases[cid];
    if (!c) return "main";
    return c.defaultView || (c.views[0] ? c.views[0].id : "main");
  }

  function renderShowcaseTrackTabs() {
    const host = document.getElementById("showcaseTrackTabs");
    if (!host) return;
    host.innerHTML = SHOWCASE.tracks.map((t) => {
      const act = t.id === showcaseState.trackId;
      return `<button class="track-tab-btn${act ? " active" : ""}" data-track="${t.id}" role="tab" aria-selected="${act}">
        <span class="track-tab-title">${t.label}</span>
        <span class="track-tab-sub">${t.sub}</span>
      </button>`;
    }).join("");
    host.querySelectorAll(".track-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextTrack = SHOWCASE.tracks.find((t) => t.id === btn.dataset.track);
        if (!nextTrack) return;
        showcaseState.trackId = nextTrack.id;
        showcaseState.caseId = nextTrack.cases[0];
        showcaseState.viewId = getDefaultViewId(showcaseState.caseId);
        renderShowcaseAll(true);
      });
    });
  }

  function syncShowcaseCaseActive() {
    const host = document.getElementById("showcaseCaseTabs");
    if (!host) return;
    host.querySelectorAll(".case-thumb-card").forEach((btn) => {
      const act = btn.dataset.cid === showcaseState.caseId;
      btn.classList.toggle("active", act);
      btn.setAttribute("aria-selected", String(act));
    });
  }

  function renderShowcaseCaseTabs() {
    const host = document.getElementById("showcaseCaseTabs");
    if (!host) return;
    const track = SHOWCASE.tracks.find((t) => t.id === showcaseState.trackId);
    if (!track) return;
    if (host.dataset.renderedTrack === track.id) {
      syncShowcaseCaseActive();
      return;
    }
    host.dataset.renderedTrack = track.id;
    host.style.setProperty("--thumb-cols", String(track.cases.length));
    host.innerHTML = track.cases.map((cid) => {
      const c = SHOWCASE.cases[cid];
      const act = cid === showcaseState.caseId;
      const title = c.shortTitle || c.pill;
      const meta = c.shortMeta || c.backbone;
      const chip = c.chip || c.resVal;
      return `<button class="case-thumb-card${act ? " active" : ""}" data-cid="${cid}" role="tab" aria-selected="${act}" title="${c.pill}">
        <span class="ctc-media">
          <img src="${c.thumb || c.inputUrl}" alt="${title}" decoding="async" />
          <span class="ctc-chip">${fmtX(chip)}</span>
        </span>
        <span class="ctc-body">
          <span class="ctc-title">${title}</span>
          <span class="ctc-meta">${fmtX(meta)}</span>
        </span>
      </button>`;
    }).join("");
    host.querySelectorAll(".case-thumb-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        showcaseState.caseId = btn.dataset.cid;
        showcaseState.viewId = getDefaultViewId(showcaseState.caseId);
        syncShowcaseCaseActive();
        renderShowcaseViewTabs();
        renderShowcaseStage(true);
        syncHighlightActive();
      });
    });
  }

  function renderShowcaseViewTabs() {
    const host = document.getElementById("showcaseViewTabs");
    if (!host) return;
    const c = SHOWCASE.cases[showcaseState.caseId];
    if (!c) return;
    host.innerHTML = c.views.map((v) => {
      const act = v.id === showcaseState.viewId;
      const isHighlightView = (v.id === "sim2" || v.id === "sim_overlay" || v.id === "umap" || v.id === "kmeans");
      return `<button class="pill-btn${isHighlightView ? " pill-btn--fg" : ""}${act ? " active" : ""}" data-vid="${v.id}" role="tab" aria-selected="${act}">${v.label}</button>`;
    }).join("");
    host.querySelectorAll(".pill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        showcaseState.viewId = btn.dataset.vid;
        renderShowcaseViewTabs();
        renderShowcaseStage(false);
        syncHighlightActive();
      });
    });
  }

  function renderShowcaseHighlights() {
    const host = document.getElementById("showcaseHighlights");
    if (!host || !SHOWCASE.highlights || !SHOWCASE.highlights.length) return;
    host.innerHTML = SHOWCASE.highlights.map((h, idx) => `
      <button class="fg-card" type="button" data-hidx="${idx}">
        <span class="fg-card-preview">
          <img class="fg-img-right" src="${h.right}" alt="${h.title} (MEROS)" loading="lazy" />
          <span class="fg-img-left-wrap">
            <img src="${h.left}" alt="${h.title} (Baseline)" loading="lazy" />
          </span>
          <span class="fg-split-line" aria-hidden="true"></span>
          <span class="fg-mini-pill fg-mini-pill--l">${h.leftLabel}</span>
          <span class="fg-mini-pill fg-mini-pill--r">${h.rightLabel}</span>
        </span>
        <span class="fg-card-body">
          <span class="fg-card-tag">${h.tag}</span>
          <span class="fg-card-title">${h.title}</span>
          <span class="fg-card-sub">${fmtX(h.sub)}</span>
        </span>
      </button>
    `).join("");

    host.querySelectorAll(".fg-card").forEach((card) => {
      card.addEventListener("click", () => {
        const h = SHOWCASE.highlights[parseInt(card.dataset.hidx, 10)];
        if (!h) return;
        showcaseState.trackId = h.trackId;
        showcaseState.caseId = h.caseId;
        showcaseState.viewId = h.viewId;
        renderShowcaseAll(true);
        const stageFrame = document.querySelector(".showcase-stage-frame");
        if (stageFrame) {
          stageFrame.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });
    syncHighlightActive();
  }

  function syncHighlightActive() {
    const host = document.getElementById("showcaseHighlights");
    if (!host || !SHOWCASE.highlights) return;
    host.querySelectorAll(".fg-card").forEach((card) => {
      const h = SHOWCASE.highlights[parseInt(card.dataset.hidx, 10)];
      const match = Boolean(h && h.caseId === showcaseState.caseId && h.viewId === showcaseState.viewId);
      card.classList.toggle("active", match);
    });
  }

  function syncShowcaseVisualTools() {
    const stage = seattleStageEl;
    const palBtn = document.getElementById("showcasePaletteBtn");
    const loupeBtn = document.getElementById("showcaseLoupeBtn");
    const loupeEl = document.getElementById("seattleLoupe");
    const pcaEligible = isPcaShowcaseView(showcaseState.trackId, showcaseState.caseId, showcaseState.viewId);
    const activeFilter = (pcaEligible && showcaseState.vividPca) ? PCA_PALETTE_MAP[showcaseState.caseId] : "none";

    if (stage) {
      stage.style.setProperty("--pca-filter", activeFilter);
    }
    if (palBtn) {
      palBtn.classList.toggle("is-hidden", !pcaEligible);
      palBtn.classList.toggle("active", showcaseState.vividPca);
      palBtn.setAttribute("aria-pressed", String(showcaseState.vividPca));
      const lbl = palBtn.querySelector(".btd-label");
      if (lbl) lbl.textContent = showcaseState.vividPca ? "High-Contrast PCA" : "Original PCA";
    }
    if (loupeBtn) {
      loupeBtn.classList.toggle("active", showcaseState.loupeOn);
      loupeBtn.setAttribute("aria-pressed", String(showcaseState.loupeOn));
    }
    if (loupeEl && !showcaseState.loupeOn) {
      loupeEl.classList.remove("is-visible");
    }
  }

  function renderShowcaseStage(resetSlider) {
    const c = SHOWCASE.cases[showcaseState.caseId];
    if (!c) return;
    const v = c.views.find((item) => item.id === showcaseState.viewId) || c.views[0];
    const stage = seattleStageEl;

    document.getElementById("seattleImgLeft").src = v.left;
    document.getElementById("seattleImgRight").src = v.right;
    setBadge("seattleBadgeLeft", fmtX(v.lTitle || c.lTitle), v.lSub || c.lSub);
    setBadge("seattleBadgeRight", fmtX(v.rTitle || c.rTitle), v.rSub || c.rSub);

    const loupeL = document.getElementById("seattleLoupeLeft");
    const loupeR = document.getElementById("seattleLoupeRight");
    if (loupeL) loupeL.style.backgroundImage = `url("${v.left}")`;
    if (loupeR) loupeR.style.backgroundImage = `url("${v.right}")`;

    const pcaEligible = isPcaShowcaseView(showcaseState.trackId, showcaseState.caseId, showcaseState.viewId);
    const descEl = document.querySelector("#showcaseViewDesc .svc-text");
    if (descEl) {
      let descTxt = v.desc || c.inputCaption || "";
      if (pcaEligible && showcaseState.vividPca) {
        descTxt = v.id === "main"
          ? "Shared 3-component PCA (identical orthogonal ±PC palette on both sides)."
          : "High-magnification crop of shared PCA (identical ±PC palette on both sides).";
      }
      descEl.innerHTML = fmtX(descTxt);
    }

    document.getElementById("telRes").innerHTML = fmtX(c.resVal);
    document.getElementById("telMp").textContent = c.resSub;
    document.getElementById("telTime").textContent = c.timeVal;
    document.getElementById("telTimeSub").innerHTML = fmtX(c.timeSub);
    document.getElementById("telQualLabel").textContent = c.qualLabel;
    document.getElementById("telQual").innerHTML = fmtX(c.qualVal);
    document.getElementById("telQualSub").innerHTML = fmtX(c.qualSub);
    document.getElementById("telRefLabel").textContent = c.refLabel;
    document.getElementById("telRef").innerHTML = fmtX(c.refVal);
    document.getElementById("telRefSub").innerHTML = fmtX(c.refSub);

    const inputBtn = document.getElementById("showcaseInputBtn");
    if (inputBtn) {
      inputBtn.onclick = () => openLightbox(c.inputUrl, c.inputCaption);
    }

    if (stage) {
      const isPort = Boolean(c.isPortrait && !v.isZoom);
      stage.classList.toggle("compare-stage--portrait", isPort);
      stage.classList.toggle("compare-stage--square", !isPort && Boolean(c.isSquare || v.isZoom));
    }
    syncShowcaseVisualTools();
    if (resetSlider && seattleSlider) {
      const defSplit = DEFAULT_SPLIT_MAP[showcaseState.caseId] || 48;
      seattleSlider.setPos(defSplit);
    }
  }

  /* Wire High-Contrast PCA toggle & 2.6x Split Loupe */
  (function initShowcaseInspectTools() {
    const palBtn = document.getElementById("showcasePaletteBtn");
    const loupeBtn = document.getElementById("showcaseLoupeBtn");
    const loupeEl = document.getElementById("seattleLoupe");
    const loupeL = document.getElementById("seattleLoupeLeft");
    const loupeR = document.getElementById("seattleLoupeRight");
    const ZOOM = 2.6;
    const RADIUS = 96;

    if (palBtn) {
      palBtn.addEventListener("click", () => {
        showcaseState.vividPca = !showcaseState.vividPca;
        renderShowcaseStage(false);
      });
    }

    function positionLoupe(clientX, clientY) {
      if (!seattleStageEl || !loupeEl || !showcaseState.loupeOn) return;
      const rect = seattleStageEl.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
      loupeEl.style.transform = `translate(${(x - RADIUS).toFixed(1)}px, ${(y - RADIUS).toFixed(1)}px)`;
      const bgSize = `${(rect.width * ZOOM).toFixed(1)}px ${(rect.height * ZOOM).toFixed(1)}px`;
      const bgPos = `${(RADIUS - x * ZOOM).toFixed(1)}px ${(RADIUS - y * ZOOM).toFixed(1)}px`;
      if (loupeL) {
        loupeL.style.backgroundSize = bgSize;
        loupeL.style.backgroundPosition = bgPos;
      }
      if (loupeR) {
        loupeR.style.backgroundSize = bgSize;
        loupeR.style.backgroundPosition = bgPos;
      }
      loupeEl.classList.add("is-visible");
    }

    if (loupeBtn) {
      loupeBtn.addEventListener("click", () => {
        showcaseState.loupeOn = !showcaseState.loupeOn;
        syncShowcaseVisualTools();
        if (showcaseState.loupeOn && seattleStageEl) {
          const rect = seattleStageEl.getBoundingClientRect();
          const isScaff = showcaseState.caseId.includes("scaffold");
          const px = isScaff ? 0.74 : 0.62;
          const py = isScaff ? 0.22 : 0.56;
          positionLoupe(rect.left + rect.width * px, rect.top + rect.height * py);
        }
      });
    }

    if (seattleStageEl && loupeEl) {
      seattleStageEl.addEventListener("pointermove", (e) => {
        if (!showcaseState.loupeOn) return;
        positionLoupe(e.clientX, e.clientY);
      });
      seattleStageEl.addEventListener("pointerleave", () => {
        loupeEl.classList.remove("is-visible");
      });
    }
  })();

  function renderShowcaseAll(resetSlider) {
    renderShowcaseTrackTabs();
    renderShowcaseCaseTabs();
    renderShowcaseViewTabs();
    renderShowcaseStage(resetSlider);
    syncHighlightActive();
  }

  renderShowcaseHighlights();
  renderShowcaseAll(true);

  /* ==================== 2. INTERACTIVE REAL-FEATURE & WEIGHT LAB ==================== */
  const LAB_METRICS = {
    1024: {
      patches: 4096,
      err: { 1: 0.002, 2: 0.073, 4: 0.123, 8: 0.180 },
      spdFa2: { 1: 1.00, 2: 2.30, 4: 3.42, 8: 4.04 },
      spdFa4: { 1: 1.00, 2: 1.83, 4: 2.71, 8: 3.21 }
    },
    2048: {
      patches: 16384,
      err: { 1: 0.002, 2: 0.041, 4: 0.071, 8: 0.106 },
      spdFa2: { 1: 1.00, 2: 4.80, 4: 7.89, 8: 11.0 },
      spdFa4: { 1: 1.00, 2: 1.84, 4: 3.02, 8: 4.21 }
    },
    4096: {
      patches: 65536,
      err: { 1: 0.002, 2: 0.020, 4: 0.035, 8: 0.052 },
      spdFa2: { 1: 1.00, 2: 6.08, 4: 11.7, 8: 21.0 },
      spdFa4: { 1: 1.00, 2: 2.05, 4: 3.94, 8: 7.07 }
    },
    8192: {
      patches: 262144,
      err: { 1: 0.002, 2: 0.010, 4: 0.018, 8: 0.027 },
      spdFa2: { 1: 1.00, 2: 6.05, 4: 12.5, 8: 24.8 },
      spdFa4: { 1: 1.00, 2: 2.06, 4: 4.25, 8: 8.44 }
    }
  };

  const CURVE_RES = [1024, 2048, 4096, 6144, 8192];
  const CURVE_LABELS = ["1K", "2K", "4K", "6K", "8K"];
  const CURVE_ERR = {
    2: [0.073, 0.041, 0.020, 0.013, 0.010],
    4: [0.123, 0.071, 0.035, 0.023, 0.018],
    8: [0.180, 0.106, 0.052, 0.036, 0.027]
  };

  // Real Cow DINOv3-B Layer 11 Head 2 data store
  const labImages = {};
  ["cow_input", "cow_feat_exact", "cow_feat_meros", "cow_feat_unweighted", "cow_err_meros", "cow_err_unweighted"].forEach((k) => {
    const img = new Image();
    img.onload = () => {
      labImages[k] = img;
      drawLabCanvas();
    };
    img.src = `assets/lab/${k}.jpg`;
  });

  let cowAttnData = null; // decoded Float32Array per query
  const attnHeatmapCanvases = {}; // cached 128x128 offscreen heatmap per query

  // Inferno colormap for real attention heatmaps
  const INFERNO = [
    [0.00, 12, 8, 36],
    [0.25, 84, 18, 112],
    [0.50, 178, 52, 92],
    [0.75, 238, 128, 38],
    [1.00, 252, 245, 160]
  ];
  function sampleInferno(t) {
    const v = Math.max(0, Math.min(1, t));
    for (let i = 0; i < INFERNO.length - 1; i++) {
      const a = INFERNO[i], b = INFERNO[i + 1];
      if (v <= b[0]) {
        const f = (v - a[0]) / (b[0] - a[0] || 1);
        return [
          Math.round(a[1] + f * (b[1] - a[1])),
          Math.round(a[2] + f * (b[2] - a[2])),
          Math.round(a[3] + f * (b[3] - a[3]))
        ];
      }
    }
    return [252, 245, 160];
  }

  function decodeBase64U16(b64, scale) {
    const bin = atob(b64);
    const n = bin.length >> 1;
    const out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const lo = bin.charCodeAt(i * 2);
      const hi = bin.charCodeAt(i * 2 + 1);
      out[i] = ((hi << 8) | lo) * scale;
    }
    return out;
  }

  function buildAttnHeatmap(qObj) {
    const oc = document.createElement("canvas");
    oc.width = 128;
    oc.height = 128;
    const octx = oc.getContext("2d");
    const imgd = octx.createImageData(128, 128);
    const w = qObj.weights;
    let vmax = 1e-6;
    for (let i = 0; i < w.length; i++) if (w[i] > vmax) vmax = w[i];
    const logMax = Math.log(1 + vmax * 6500);
    for (let i = 0; i < w.length; i++) {
      const t = Math.log(1 + w[i] * 6500) / logMax;
      const [r, g, b] = sampleInferno(t);
      const p = i * 4;
      imgd.data[p] = r;
      imgd.data[p + 1] = g;
      imgd.data[p + 2] = b;
      imgd.data[p + 3] = Math.round(55 + t * 185);
    }
    octx.putImageData(imgd, 0, 0);
    return oc;
  }

  fetch("assets/lab/cow_attn_l11.json")
    .then((r) => r.json())
    .then((json) => {
      json.queries.forEach((q) => {
        q.weights = decodeBase64U16(q.b64, q.scale);
        delete q.b64;
        attnHeatmapCanvases[q.id] = buildAttnHeatmap(q);
      });
      cowAttnData = json;
      updateLabReadouts();
    })
    .catch(() => {
      // Graceful fallback if opened via file:// without HTTP server
      updateLabReadouts();
    });

  const labState = {
    mode: "feature", // 'feature' | 'attention' | 'error' | 'schematic'
    r: 8,
    weightOn: true,
    geom: "meros",   // 'meros' | 'random' | 'window'
    res: 4096,
    queryId: 0,      // 0..7 real Cow queries (0 = Cow Ear: near 3.9%, far 95.8%)
    inspCellR: 13,   // 0..31 inspected far 4x4 cell row on Cow
    inspCellC: 11,   // 0..31 inspected far 4x4 cell col on Cow (on cow's face!)
    activeTileR: 1,  // for schematic 3x3 mode
    activeTileC: 1,
    seed: 17
  };

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleDet(arr, seed) {
    const out = arr.slice();
    const rng = mulberry32(seed);
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function getCellSampledPositions(cy, cx, r, geom, seed) {
    if (geom === "window") return [];
    if (r === 1) return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    const cellSeed = ((seed * 73856093) ^ (cy * 19349663) ^ (cx * 83492791)) >>> 0;
    if (geom === "meros") {
      const pairs = shuffleDet([0, 1, 2, 3, 4, 5, 6, 7], cellSeed).slice(0, Math.max(1, 8 / r));
      const res = [];
      pairs.forEach((j) => { res.push(j, 15 - j); });
      return res;
    }
    return shuffleDet([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], cellSeed + 999).slice(0, Math.max(2, 16 / r));
  }

  function roundRect(ctx, x, y, w, h, r) {
    const rad = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
  }

  const labCanvas = document.getElementById("merosLabCanvas");
  const cellCanvas = document.getElementById("cellInspectorCanvas");
  let labGeometryCache = null;

  function drawCellInspector(realQ) {
    if (!cellCanvas) return;
    const ctx = cellCanvas.getContext("2d");
    const S = 192;
    ctx.clearRect(0, 0, S, S);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, S, S);

    const pad = 10;
    const inner = S - pad * 2;
    const step = inner / 4;
    const cy = labState.inspCellR;
    const cx = labState.inspCellC;
    const sampled = getCellSampledPositions(cy, cx, labState.r, labState.geom, labState.seed);
    const sampledSet = new Set(sampled);
    const effW = labState.geom === "window" ? 0 : (labState.r === 1 ? 1 : (labState.weightOn ? labState.r : 1));

    // Extract 16 real weights for this 4x4 cell if loaded
    let cellWeights = new Array(16).fill(0.5);
    let cellMax = 1e-6;
    if (realQ) {
      for (let u = 0; u < 16; u++) {
        const pr = cy * 4 + Math.floor(u / 4);
        const pc = cx * 4 + (u % 4);
        const v = realQ.weights[pr * 128 + pc];
        cellWeights[u] = v;
        if (v > cellMax) cellMax = v;
      }
    }

    // Draw 16 patches colored by real DINOv3 attention weight
    for (let u = 0; u < 16; u++) {
      const ux = u % 4;
      const uy = Math.floor(u / 4);
      const x = pad + ux * step;
      const y = pad + uy * step;
      const norm = realQ ? Math.pow(cellWeights[u] / cellMax, 0.6) : 0.35 + ((u * 7) % 11) * 0.05;
      const [cr, cg, cb] = sampleInferno(0.15 + norm * 0.8);
      ctx.fillStyle = sampledSet.has(u)
        ? `rgb(${cr},${cg},${cb})`
        : `rgba(${cr},${cg},${cb}, 0.28)`;
      roundRect(ctx, x + 2, y + 2, step - 4, step - 4, 5);
      ctx.fill();
    }

    // Center symmetry dot + reflected pair dashed connectors
    if (labState.geom === "meros" && labState.r > 1) {
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.beginPath();
      ctx.arc(S / 2, S / 2, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = labState.weightOn ? "rgba(255,255,255,0.85)" : "rgba(248,113,113,0.85)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      for (let i = 0; i < sampled.length; i += 2) {
        const u1 = sampled[i], u2 = sampled[i + 1];
        const x1 = pad + ((u1 % 4) + 0.5) * step;
        const y1 = pad + (Math.floor(u1 / 4) + 0.5) * step;
        const x2 = pad + ((u2 % 4) + 0.5) * step;
        const y2 = pad + (Math.floor(u2 / 4) + 0.5) * step;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    // Crisp rings + signature weight ×r labels on kept keys!
    sampled.forEach((u) => {
      const ux = u % 4;
      const uy = Math.floor(u / 4);
      const x = pad + ux * step;
      const y = pad + uy * step;
      ctx.strokeStyle = labState.r === 1 ? "rgba(255,255,255,0.45)" : (labState.weightOn ? "#ff6b3d" : "#ef4444");
      ctx.lineWidth = labState.r === 1 ? 1.2 : 2.6;
      roundRect(ctx, x + 2.5, y + 2.5, step - 5, step - 5, 5);
      ctx.stroke();

      if (labState.r > 1) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.82)";
        roundRect(ctx, x + 6, y + 11, step - 12, 20, 4);
        ctx.fill();
        ctx.fillStyle = labState.weightOn ? "#ffd6c7" : "#fca5a5";
        ctx.font = "700 12px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`×${effW}`, x + step / 2, y + 21);
      }
    });
    ctx.textAlign = "left";

    // Update mini caption
    const capEl = document.getElementById("cellMiniCap");
    if (capEl) {
      if (labState.geom === "window") {
        capEl.textContent = `Cell (${cy},${cx}) · dropped`;
      } else if (labState.r === 1) {
        capEl.textContent = `Cell (${cy},${cx}) · all 16 ×1`;
      } else {
        const cntLabel = labState.geom === "meros" ? `${8 / labState.r} pair${8 / labState.r > 1 ? "s" : ""}` : `${16 / labState.r} keys`;
        capEl.textContent = `Cell (${cy},${cx}) · ${cntLabel} ×${effW}`;
      }
    }
  }

  function computeRealMassAndInspector() {
    const realQ = cowAttnData ? cowAttnData.queries[labState.queryId] : null;
    drawCellInspector(realQ);

    const exactLbl = document.getElementById("massNumExact");
    const estLbl = document.getElementById("massNumEst");
    const exactBar = document.getElementById("massBarExact");
    const estBar = document.getElementById("massBarEst");
    const estName = document.getElementById("massEstLabel");
    const qTitle = document.getElementById("massQueryLabel");
    const wPill = document.getElementById("massWeightPill");
    const footEl = document.getElementById("massFootNote");

    if (!realQ) return;

    const w = realQ.weights;
    const tr = realQ.tileR;
    const tc = realQ.tileC;
    const effW = labState.geom === "window" ? 0 : (labState.r === 1 ? 1 : (labState.weightOn ? labState.r : 1));

    let nearSum = 0;
    let exactFarSum = 0;
    let estFarSum = 0;

    // Exact near & far mass + live Horvitz–Thompson sample across all 1,008 real far 4x4 cells!
    for (let cy = 0; cy < 32; cy++) {
      const tileR = cy >> 2;
      for (let cx = 0; cx < 32; cx++) {
        const tileC = cx >> 2;
        const isLocal = tileR === tr && tileC === tc;
        if (isLocal) {
          for (let dy = 0; dy < 4; dy++) {
            const rowOff = (cy * 4 + dy) * 128 + cx * 4;
            nearSum += w[rowOff] + w[rowOff + 1] + w[rowOff + 2] + w[rowOff + 3];
          }
        } else {
          for (let dy = 0; dy < 4; dy++) {
            const rowOff = (cy * 4 + dy) * 128 + cx * 4;
            exactFarSum += w[rowOff] + w[rowOff + 1] + w[rowOff + 2] + w[rowOff + 3];
          }
          if (effW > 0) {
            const kept = getCellSampledPositions(cy, cx, labState.r, labState.geom, labState.seed);
            let cSample = 0;
            for (let k = 0; k < kept.length; k++) {
              const u = kept[k];
              cSample += w[(cy * 4 + (u >> 2)) * 128 + (cx * 4 + (u & 3))];
            }
            estFarSum += effW * cSample;
          }
        }
      }
    }

    const tot = nearSum + realQ.globalMass + exactFarSum;
    const exactFarPct = (exactFarSum / tot) * 100;
    const estFarPct = (estFarSum / tot) * 100;
    const ratio = exactFarSum > 0 ? estFarSum / exactFarSum : 1;

    if (qTitle) qTitle.textContent = `Live DINOv3-B L11 Far-Mass Recovery (${realQ.label})`;
    if (exactLbl) exactLbl.textContent = exactFarPct.toFixed(1) + "%";
    if (exactBar) exactBar.style.width = Math.min(100, exactFarPct).toFixed(1) + "%";
    if (estLbl) estLbl.textContent = estFarPct.toFixed(1) + "%";
    if (estBar) {
      estBar.style.width = Math.min(100, estFarPct).toFixed(1) + "%";
      const isBad = labState.geom === "window" || (labState.r > 1 && !labState.weightOn);
      estBar.className = "mass-bar-fill " + (isBad ? "mass-bar-fill--bad" : "mass-bar-fill--meros");
    }

    if (wPill) {
      const isBad = labState.geom === "window" || (labState.r > 1 && !labState.weightOn);
      wPill.className = "weight-pill" + (isBad ? " weight-pill--bad" : "");
      if (labState.geom === "window") {
        wPill.textContent = "Far Weight: 0 (Dropped)";
      } else if (labState.r === 1) {
        wPill.textContent = "Exact: ×1 (+0.000)";
      } else if (labState.weightOn) {
        wPill.textContent = `Far Weight: ×${labState.r} (+${Math.log(labState.r).toFixed(3)})`;
      } else {
        wPill.textContent = "Weight Dropped: ×1 (Biased!)";
      }
    }

    if (estName) {
      if (labState.geom === "window") estName.textContent = "Local Only";
      else if (labState.r === 1) estName.textContent = "Exact (×1)";
      else if (labState.weightOn) estName.textContent = `MEROS (×${labState.r})`;
      else estName.textContent = "No Weight (×1)";
    }

    if (footEl) {
      if (labState.geom === "window") {
        footEl.innerHTML = `Dropping the far field loses <strong>${exactFarPct.toFixed(1)}%</strong> of DINOv3-B's attention mass for <em>${realQ.label}</em>. Click any white query dot to test other tokens.`;
      } else if (labState.r > 1 && !labState.weightOn) {
        footEl.innerHTML = `<strong>Weight &times;${labState.r} dropped:</strong> Far mass collapses to <strong>${(ratio * 100).toFixed(1)}%</strong> of true mass! On this Cow image, dropping &times;8 raises median feature error <strong>17${MUL}</strong> (0.0058 &rarr; <strong>0.0987</strong>).`;
      } else {
        footEl.innerHTML = `This live draw recovers <strong>${(ratio * 100).toFixed(1)}%</strong> of true far mass across 1,008 real far cells (unbiased mean = 100%). Real Cow median feature error: <strong>1&minus;cos = 0.0058</strong> vs. <strong>0.0987</strong> without &times;8.`;
      }
    }
  }

  function drawLabCanvas() {
    if (!labCanvas) return;
    const rect = labCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const W = Math.max(300, Math.round(rect.width));
    const H = Math.max(320, Math.round(rect.height));
    labCanvas.width = Math.round(W * dpr);
    labCanvas.height = Math.round(H * dpr);
    const ctx = labCanvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, W, H);

    const padX = 14;
    const globalBarH = 34;
    const gapBelowGlobal = 10;
    const gridTop = 12 + globalBarH + gapBelowGlobal;
    const gridSize = Math.min(W - padX * 2, H - gridTop - 12);
    const gridLeft = (W - gridSize) / 2;

    // 1. Global Tokens Bar G (exact, ×1)
    ctx.fillStyle = "#e6f6f2";
    ctx.strokeStyle = "rgba(0, 122, 96, 0.36)";
    ctx.lineWidth = 1.2;
    roundRect(ctx, gridLeft, 12, gridSize, globalBarH, 8);
    ctx.fill();
    ctx.stroke();

    const isNarrow = gridSize < 380;
    const realQ = cowAttnData ? cowAttnData.queries[labState.queryId] : null;
    const gPct = realQ ? ` (${(realQ.globalMass * 100).toFixed(1)}%)` : "";
    ctx.fillStyle = "#007a60";
    ctx.font = isNarrow ? "700 10px Inter, sans-serif" : "700 11px Inter, sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText(isNarrow ? "Globals G (×1):" : `Global Tokens G (×1 exact)${gPct}:`, gridLeft + 10, 12 + globalBarH / 2);

    const gTokens = ["CLS", "R1", "R2", "R3", "R4"];
    const chipW = isNarrow ? 25 : 29;
    const chipGap = isNarrow ? 3.5 : 5;
    const chipH = 20;
    const startChipX = gridLeft + gridSize - (gTokens.length * (chipW + chipGap)) - 5;
    gTokens.forEach((lbl, idx) => {
      const cx = startChipX + idx * (chipW + chipGap);
      const cy = 12 + (globalBarH - chipH) / 2;
      ctx.fillStyle = "#007a60";
      roundRect(ctx, cx, cy, chipW, chipH, 5);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = isNarrow ? "700 8.5px 'JetBrains Mono', monospace" : "700 9.5px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(lbl, cx + chipW / 2, cy + chipH / 2 + 0.5);
    });
    ctx.textAlign = "left";

    // Mode switch: Real Cow 128x128 modes vs Schematic 3x3 Zoom mode
    if (labState.mode === "schematic") {
      drawSchematicMode(ctx, gridLeft, gridTop, gridSize);
    } else {
      drawRealCowMode(ctx, gridLeft, gridTop, gridSize, realQ);
    }
  }

  function drawRealCowMode(ctx, gridLeft, gridTop, gridSize, realQ) {
    const TILES = 8; // 8x8 tiles of 16x16 = 128x128 patches
    const tilePx = gridSize / TILES;
    const pPx = gridSize / 128;
    const cellPx = gridSize / 32;
    labGeometryCache = { mode: "real", gridLeft, gridTop, gridSize, tilePx, cellPx, pPx };

    // Choose real backdrop image
    let bgImg = null;
    if (labState.mode === "feature") {
      if (labState.r === 1) bgImg = labImages.cow_feat_exact;
      else if (labState.geom === "window" || !labState.weightOn) bgImg = labImages.cow_feat_unweighted;
      else bgImg = labImages.cow_feat_meros;
    } else if (labState.mode === "attention") {
      bgImg = labImages.cow_input;
    } else if (labState.mode === "error") {
      bgImg = (labState.r === 1 || (labState.weightOn && labState.geom !== "window"))
        ? labImages.cow_err_meros
        : labImages.cow_err_unweighted;
    }

    ctx.save();
    roundRect(ctx, gridLeft, gridTop, gridSize, gridSize, 8);
    ctx.clip();

    if (bgImg) {
      ctx.drawImage(bgImg, gridLeft, gridTop, gridSize, gridSize);
    } else {
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(gridLeft, gridTop, gridSize, gridSize);
    }

    // Overlay real DINOv3-B Layer 11 attention heatmap in Photo+Attn mode
    if (labState.mode === "attention" && realQ && attnHeatmapCanvases[realQ.id]) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(attnHeatmapCanvases[realQ.id], gridLeft, gridTop, gridSize, gridSize);
      ctx.imageSmoothingEnabled = true;
    }

    const tr = realQ ? realQ.tileR : 3;
    const tc = realQ ? realQ.tileC : 5;

    // Subtle 8x8 tile gridlines
    ctx.strokeStyle = labState.mode === "error" ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.28)";
    ctx.lineWidth = 0.85;
    for (let t = 1; t < TILES; t++) {
      ctx.beginPath();
      ctx.moveTo(gridLeft + t * tilePx, gridTop);
      ctx.lineTo(gridLeft + t * tilePx, gridTop + gridSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(gridLeft, gridTop + t * tilePx);
      ctx.lineTo(gridLeft + gridSize, gridTop + t * tilePx);
      ctx.stroke();
    }

    // Draw far-field sampled keys across all 32x32 cells (except local tile)
    if (labState.geom === "window") {
      // Dim entire far field to show it is completely dropped!
      ctx.fillStyle = "rgba(15, 23, 42, 0.62)";
      ctx.fillRect(gridLeft, gridTop, gridSize, gridSize);
      // Redraw un-dimmed local tile
      if (bgImg) {
        const sx = (tc / 8) * bgImg.naturalWidth;
        const sy = (tr / 8) * bgImg.naturalHeight;
        const sw = bgImg.naturalWidth / 8;
        const sh = bgImg.naturalHeight / 8;
        ctx.drawImage(bgImg, sx, sy, sw, sh, gridLeft + tc * tilePx, gridTop + tr * tilePx, tilePx, tilePx);
      }
    } else if (labState.r > 1) {
      // Draw crisp sampled far patch dots
      const dotColor = labState.weightOn ? "#ff5c2b" : "#f87171";
      ctx.fillStyle = dotColor;
      const dotR = Math.max(1.15, pPx * 0.42);
      for (let cy = 0; cy < 32; cy++) {
        if ((cy >> 2) === tr) {
          // skip only tc
          for (let cx = 0; cx < 32; cx++) {
            if ((cx >> 2) === tc) continue;
            const kept = getCellSampledPositions(cy, cx, labState.r, labState.geom, labState.seed);
            for (let k = 0; k < kept.length; k++) {
              const u = kept[k];
              const px = gridLeft + (cx * 4 + (u & 3) + 0.5) * pPx;
              const py = gridTop + (cy * 4 + (u >> 2) + 0.5) * pPx;
              ctx.fillRect(px - dotR, py - dotR, dotR * 2, dotR * 2);
            }
          }
        } else {
          for (let cx = 0; cx < 32; cx++) {
            const kept = getCellSampledPositions(cy, cx, labState.r, labState.geom, labState.seed);
            for (let k = 0; k < kept.length; k++) {
              const u = kept[k];
              const px = gridLeft + (cx * 4 + (u & 3) + 0.5) * pPx;
              const py = gridTop + (cy * 4 + (u >> 2) + 0.5) * pPx;
              ctx.fillRect(px - dotR, py - dotR, dotR * 2, dotR * 2);
            }
          }
        }
      }
    }

    // Highlight Active Exact Local Tile L_i (16x16 patches)
    const lx = gridLeft + tc * tilePx;
    const ly = gridTop + tr * tilePx;
    ctx.fillStyle = "rgba(46, 109, 164, 0.28)";
    ctx.fillRect(lx, ly, tilePx, tilePx);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.6;
    ctx.strokeRect(lx + 1, ly + 1, tilePx - 2, tilePx - 2);

    // Highlight Inspected Far 4x4 Cell in bright gold!
    const ix = gridLeft + labState.inspCellC * cellPx;
    const iy = gridTop + labState.inspCellR * cellPx;
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(ix - 0.5, iy - 0.5, cellPx + 1, cellPx + 1);

    // Draw all 8 clickable real query pins
    if (cowAttnData) {
      cowAttnData.queries.forEach((q) => {
        const qx = gridLeft + (q.col + 0.5) * pPx;
        const qy = gridTop + (q.row + 0.5) * pPx;
        const isAct = q.id === labState.queryId;
        ctx.beginPath();
        ctx.arc(qx, qy, isAct ? 6.5 : 4.2, 0, Math.PI * 2);
        ctx.fillStyle = isAct ? "#38bdf8" : "rgba(255,255,255,0.82)";
        ctx.fill();
        ctx.lineWidth = isAct ? 2.2 : 1.4;
        ctx.strokeStyle = "#0f172a";
        ctx.stroke();
      });
    }

    // Bottom HUD badges inside canvas (Signature Weight + Mode Label)
    const hudH = 26;
    const hudY = gridTop + gridSize - hudH - 8;

    // Left HUD: Active mode & real Cow metric
    let leftHudText = "";
    if (labState.mode === "feature") {
      leftHudText = (labState.r > 1 && (!labState.weightOn || labState.geom === "window"))
        ? "DINOv3 UMAP (Unweighted · 1−cos = 0.0987)"
        : (labState.r === 1 ? "DINOv3 UMAP (Exact FA2)" : "DINOv3 UMAP (MEROS r=8 · 1−cos = 0.0058)");
    } else if (labState.mode === "attention") {
      leftHudText = `DINOv3-B L11 H2 Attn · ${realQ ? realQ.label : "Cow Ear"}`;
    } else {
      leftHudText = (labState.r > 1 && (!labState.weightOn || labState.geom === "window"))
        ? "Error 1−cos: 0.0987 (17× higher without ×r!)"
        : "Error 1−cos: 0.0058 (near-zero with MEROS ×r)";
    }

    ctx.font = "600 10.5px 'JetBrains Mono', monospace";
    const lw = Math.min(gridSize * 0.63, ctx.measureText(leftHudText).width + 16);
    ctx.fillStyle = "rgba(15, 23, 42, 0.84)";
    roundRect(ctx, gridLeft + 8, hudY, lw, hudH, 7);
    ctx.fill();
    ctx.fillStyle = "#f8fafc";
    ctx.textBaseline = "middle";
    ctx.fillText(leftHudText, gridLeft + 16, hudY + hudH / 2 + 0.5, lw - 14);

    // Right HUD: Signature MEROS Weight Tag!
    let rightHudText = "";
    let rightBg = "rgba(201, 74, 34, 0.94)";
    if (labState.geom === "window") {
      rightHudText = "Far Weight: 0";
      rightBg = "rgba(185, 28, 28, 0.94)";
    } else if (labState.r === 1) {
      rightHudText = "Exact ×1";
      rightBg = "rgba(46, 109, 164, 0.94)";
    } else if (labState.weightOn) {
      rightHudText = `Weight ×${labState.r} (+log ${labState.r})`;
    } else {
      rightHudText = "Weight ×1 (BIASED)";
      rightBg = "rgba(185, 28, 28, 0.94)";
    }
    ctx.font = "700 10.5px 'JetBrains Mono', monospace";
    const rw = ctx.measureText(rightHudText).width + 16;
    ctx.fillStyle = rightBg;
    roundRect(ctx, gridLeft + gridSize - rw - 8, hudY, rw, hudH, 7);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(rightHudText, gridLeft + gridSize - rw / 2 - 8, hudY + hudH / 2 + 0.5);
    ctx.textAlign = "left";

    ctx.restore();
  }

  function drawSchematicMode(ctx, gridLeft, gridTop, gridSize) {
    const TILES = 3;
    const CELLS_PER_TILE = 4;
    const TOTAL_PATCHES = 48;
    const pSize = gridSize / TOTAL_PATCHES;
    const tilePx = gridSize / TILES;
    const cellPx = tilePx / CELLS_PER_TILE;
    labGeometryCache = { mode: "schematic", gridLeft, gridTop, gridSize, tilePx, TILES };

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(gridLeft, gridTop, gridSize, gridSize);

    const actX = gridLeft + labState.activeTileC * tilePx;
    const actY = gridTop + labState.activeTileR * tilePx;
    ctx.fillStyle = "rgba(46, 109, 164, 0.14)";
    ctx.fillRect(actX, actY, tilePx, tilePx);

    for (let py = 0; py < 16; py++) {
      for (let px = 0; px < 16; px++) {
        ctx.fillStyle = (py + px) % 2 === 0 ? "rgba(46, 109, 164, 0.86)" : "rgba(46, 109, 164, 0.72)";
        ctx.fillRect(actX + px * pSize + 0.8, actY + py * pSize + 0.8, Math.max(2, pSize - 1.6), Math.max(2, pSize - 1.6));
      }
    }

    const totalCells = TILES * CELLS_PER_TILE;
    const effW = labState.weightOn ? labState.r : 1;

    for (let cy = 0; cy < totalCells; cy++) {
      for (let cx = 0; cx < totalCells; cx++) {
        const tr = Math.floor(cy / CELLS_PER_TILE);
        const tc = Math.floor(cx / CELLS_PER_TILE);
        const isLocal = tr === labState.activeTileR && tc === labState.activeTileC;
        const cellX = gridLeft + cx * cellPx;
        const cellY = gridTop + cy * cellPx;

        ctx.strokeStyle = isLocal ? "rgba(255,255,255,0.22)" : "rgba(148, 163, 184, 0.34)";
        ctx.lineWidth = 0.75;
        ctx.strokeRect(cellX, cellY, cellPx, cellPx);
        if (isLocal) continue;

        if (labState.geom === "window") {
          ctx.fillStyle = "rgba(148, 163, 184, 0.1)";
          ctx.fillRect(cellX + 0.5, cellY + 0.5, cellPx - 1, cellPx - 1);
          continue;
        }

        const kept = getCellSampledPositions(cy, cx, labState.r, labState.geom, labState.seed);
        if (labState.r === 1) {
          for (let u = 0; u < 16; u++) {
            ctx.fillStyle = "rgba(201, 74, 34, 0.42)";
            ctx.fillRect(cellX + (u % 4) * pSize + 1, cellY + Math.floor(u / 4) * pSize + 1, Math.max(2, pSize - 2), Math.max(2, pSize - 2));
          }
          continue;
        }

        if (labState.geom === "meros") {
          ctx.fillStyle = "rgba(148, 163, 184, 0.5)";
          ctx.beginPath();
          ctx.arc(cellX + cellPx / 2, cellY + cellPx / 2, 1.4, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = labState.weightOn ? "rgba(201, 74, 34, 0.44)" : "rgba(220, 38, 38, 0.44)";
          ctx.lineWidth = 1.05;
          ctx.setLineDash([2, 2]);
          for (let i = 0; i < kept.length; i += 2) {
            const u1 = kept[i], u2 = kept[i + 1];
            ctx.beginPath();
            ctx.moveTo(cellX + ((u1 % 4) + 0.5) * pSize, cellY + (Math.floor(u1 / 4) + 0.5) * pSize);
            ctx.lineTo(cellX + ((u2 % 4) + 0.5) * pSize, cellY + (Math.floor(u2 / 4) + 0.5) * pSize);
            ctx.stroke();
          }
          ctx.setLineDash([]);
        }

        kept.forEach((u) => {
          ctx.fillStyle = !labState.weightOn ? "#dc2626" : (labState.geom === "meros" ? "#c94a22" : "#d97706");
          roundRect(ctx, cellX + (u % 4) * pSize + 0.9, cellY + Math.floor(u / 4) * pSize + 0.9, Math.max(2, pSize - 1.8), Math.max(2, pSize - 1.8), 2);
          ctx.fill();
        });

        // Stamp signature ×r weight badge neatly in the corner of representative far tiles!
        if (cx % 4 === 2 && cy % 4 === 2) {
          const wLbl = `×${effW}`;
          ctx.fillStyle = labState.weightOn ? "rgba(201, 74, 34, 0.92)" : "rgba(185, 28, 28, 0.92)";
          roundRect(ctx, cellX + cellPx * 0.14, cellY + cellPx * 0.25, cellPx * 0.72, cellPx * 0.5, 4);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.font = `700 ${Math.max(8, Math.round(cellPx * 0.3))}px 'JetBrains Mono', monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(wLbl, cellX + cellPx / 2, cellY + cellPx / 2 + 0.5);
          ctx.textAlign = "left";
        }
      }
    }

    for (let t = 0; t <= TILES; t++) {
      ctx.strokeStyle = "rgba(15, 23, 42, 0.34)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(gridLeft + t * tilePx, gridTop);
      ctx.lineTo(gridLeft + t * tilePx, gridTop + gridSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(gridLeft, gridTop + t * tilePx);
      ctx.lineTo(gridLeft + gridSize, gridTop + t * tilePx);
      ctx.stroke();
    }

    ctx.strokeStyle = "#1d4ed8";
    ctx.lineWidth = 2.6;
    ctx.strokeRect(actX + 1, actY + 1, tilePx - 2, tilePx - 2);

    const tagW = 104, tagH = 22;
    ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
    roundRect(ctx, actX + (tilePx - tagW) / 2, actY + (tilePx - tagH) / 2, tagW, tagH, 6);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 10.5px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Exact Tile ×1", actX + tilePx / 2, actY + tilePx / 2 + 0.5);
    ctx.textAlign = "left";
  }

  function drawLabScalingSvg() {
    const svg = document.getElementById("labScalingSvg");
    if (!svg) return;
    const W = 420, H = 144;
    const padL = 40, padR = 18, padT = 14, padB = 24;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const maxY = 0.20;

    const xOf = (idx) => padL + (idx / (CURVE_RES.length - 1)) * plotW;
    const yOf = (val) => padT + plotH - (Math.min(val, maxY) / maxY) * plotH;

    let html = "";
    [0, 0.05, 0.10, 0.15, 0.20].forEach((tick) => {
      const y = yOf(tick);
      html += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`;
      html += `<text x="${padL - 6}" y="${(y + 3.5).toFixed(1)}" text-anchor="end" fill="#64748b" font-size="9.5" font-family="JetBrains Mono, monospace">${tick.toFixed(2)}</text>`;
    });

    CURVE_LABELS.forEach((lbl, idx) => {
      const x = xOf(idx);
      const isAct = CURVE_RES[idx] === labState.res;
      html += `<text x="${x.toFixed(1)}" y="${H - 6}" text-anchor="middle" fill="${isAct ? "#c94a22" : "#64748b"}" font-weight="${isAct ? "700" : "500"}" font-size="10" font-family="JetBrains Mono, monospace">${lbl}</text>`;
    });

    const styles = {
      2: { color: "#2e6da4", label: "r=2" },
      4: { color: "#007a60", label: "r=4" },
      8: { color: "#c94a22", label: "r=8" }
    };
    const isDegraded = labState.geom === "window" || (labState.r > 1 && !labState.weightOn);

    [8, 4, 2].forEach((rVal) => {
      const pts = CURVE_ERR[rVal].map((v, i) => `${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");
      const isSelectedR = labState.r === rVal && !isDegraded;
      const opacity = isDegraded ? 0.24 : isSelectedR ? 1 : 0.42;
      const strokeW = isSelectedR ? 2.6 : 1.5;

      html += `<polyline points="${pts}" fill="none" stroke="${styles[rVal].color}" stroke-width="${strokeW}" stroke-opacity="${opacity}" stroke-linejoin="round" stroke-linecap="round"/>`;

      if (isSelectedR) {
        const resIdx = CURVE_RES.indexOf(labState.res);
        if (resIdx >= 0) {
          const cx = xOf(resIdx);
          const cy = yOf(CURVE_ERR[rVal][resIdx]);
          html += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="6.5" fill="${styles[rVal].color}" fill-opacity="0.22"/>`;
          html += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="3.8" fill="${styles[rVal].color}" stroke="#ffffff" stroke-width="1.5"/>`;
        }
      }
    });

    // Clean non-overlapping horizontal legend in upper-right plot space
    const legItems = [
      { r: 8, color: "#c94a22", lbl: "r=8", x: W - padR - 134 },
      { r: 4, color: "#007a60", lbl: "r=4", x: W - padR - 86 },
      { r: 2, color: "#2e6da4", lbl: "r=2", x: W - padR - 38 }
    ];
    legItems.forEach((it) => {
      const active = labState.r === it.r && !isDegraded;
      const op = isDegraded ? 0.35 : (active ? 1 : 0.6);
      html += `<line x1="${it.x}" y1="${padT + 6}" x2="${it.x + 12}" y2="${padT + 6}" stroke="${it.color}" stroke-width="${active ? 2.6 : 1.8}" stroke-opacity="${op}" stroke-linecap="round"/>`;
      html += `<text x="${it.x + 16}" y="${padT + 9.5}" fill="${it.color}" fill-opacity="${op}" font-size="9.5" font-weight="${active ? "700" : "600"}" font-family="JetBrains Mono, monospace">${it.lbl}</text>`;
    });

    if (labState.geom === "window") {
      html += `<rect x="${padL + 10}" y="${padT + 14}" width="${plotW - 20}" height="34" rx="6" fill="rgba(185,28,28,0.09)" stroke="rgba(185,28,28,0.38)"/>`;
      html += `<text x="${padL + plotW / 2}" y="${padT + 35}" text-anchor="middle" fill="#b91c1c" font-size="10.8" font-weight="700" font-family="Inter, sans-serif">Local-only (NATTEN) error GROWS with resolution: .153 → .685</text>`;
    } else if (labState.r > 1 && !labState.weightOn) {
      html += `<rect x="${padL + 10}" y="${padT + 14}" width="${plotW - 20}" height="34" rx="6" fill="rgba(185,28,28,0.09)" stroke="rgba(185,28,28,0.38)"/>`;
      html += `<text x="${padL + plotW / 2}" y="${padT + 35}" text-anchor="middle" fill="#b91c1c" font-size="10.8" font-weight="700" font-family="Inter, sans-serif">Without weight ×r, error GROWS with resolution: .394 → .874</text>`;
    }

    svg.innerHTML = html;
  }

  function updateLabReadouts() {
    const m = LAB_METRICS[labState.res];
    const N = m.patches;
    const G = 5;
    const L = 256;
    const exactKeys = N + G;

    const legendW = document.getElementById("labLegendWeight");
    if (legendW) {
      legendW.textContent = labState.geom === "window" ? "×0" : (labState.r === 1 ? "×1" : (labState.weightOn ? `×${labState.r}` : "×1!"));
    }

    let keysRead, logitHtml, weightSub, speedHtml, speedSub, errText, errSub, explainer;
    let isBadState = false;

    if (labState.geom === "window") {
      isBadState = true;
      keysRead = L + G;
      logitHtml = "&times;0 (&minus;&infin;)";
      weightSub = "Far field completely dropped";
      const nattenErr = { 1024: ".153", 2048: ".346", 4096: ".484", 8192: ".685" }[labState.res];
      const nattenSpd = { 1024: "0.25×", 2048: "1.91×", 4096: "9.49×", 8192: "23.9×" }[labState.res];
      speedHtml = fmtX(nattenSpd);
      speedSub = "NATTEN local window vs. Exact FA2";
      errText = nattenErr;
      errSub = "Error WORSENS as image grows!";
      explainer = `<strong>Why local-only windows collapse:</strong> Dropping the far field discards 72&ndash;90% of attention mass. On 6K ETH3D depth, NATTEN AbsRel explodes from 3.26% to <strong>23.12%</strong>, and UAVid segmentation loses up to <strong>19.4 mIoU</strong>.`;
      document.getElementById("labKeysReduce").textContent = `Only ${((keysRead / exactKeys) * 100).toFixed(1)}% of keys (far field lost)`;
    } else if (labState.r === 1) {
      keysRead = exactKeys;
      logitHtml = "&times;1 (+0.000)";
      weightSub = "Exact FlashAttention-2 (r = 1)";
      speedHtml = fmtX("1.00×");
      speedSub = "Exact FlashAttention-2 baseline";
      errText = "0.002";
      errSub = "BF16 numerical precision vs. FP32";
      explainer = `<strong>Exact FlashAttention-2 ($r=1$):</strong> Every query reads all ${exactKeys.toLocaleString()} keys with weight &times;1. Setting $r=1$ in MEROS recovers exact softmax attention identically.`;
      document.getElementById("labKeysReduce").textContent = `100% of ${exactKeys.toLocaleString()} keys read`;
    } else if (!labState.weightOn) {
      isBadState = true;
      keysRead = Math.round(L + G + (N - L) / labState.r);
      const reduce = (exactKeys / keysRead).toFixed(2);
      logitHtml = "&times;1 (+0.000)";
      weightSub = `Missing +${Math.log(labState.r).toFixed(3)} Horvitz–Thompson shift!`;
      speedHtml = fmtX(m.spdFa2[labState.r].toFixed(m.spdFa2[labState.r] >= 10 ? 1 : 2) + "×");
      speedSub = fmtX(`Same kernel speed, but ${((1 - 1 / labState.r) * 100).toFixed(0)}% far mass lost`);
      const unwErr = { 1024: ".394", 2048: ".479", 4096: ".874", 8192: ">.90" }[labState.res];
      errText = unwErr;
      errSub = "DINOv3-B unweighted error (Table 8a): grows with resolution!";
      explainer = `<strong>Why MEROS's weight &times;${labState.r} (+log ${labState.r}) is indispensable:</strong> Without scaling sampled far keys by $r=${labState.r}$, the local tile dominates the softmax denominator, dropping Cityscapes mIoU by <strong>&minus;7.61</strong> and inflating Cow feature error <strong>17&times;</strong> (switch to <em>Error 1&minus;cos</em> above!).`;
      document.getElementById("labKeysReduce").innerHTML = fmtX(`${reduce}× fewer than ${exactKeys.toLocaleString()}`);
    } else {
      keysRead = Math.round(L + G + (N - L) / labState.r);
      const reduce = (exactKeys / keysRead).toFixed(2);
      const logVal = "+" + Math.log(labState.r).toFixed(3);
      logitHtml = `&times;${labState.r} (${logVal})`;
      weightSub = `Unbiased Horvitz–Thompson (r=${labState.r})`;
      speedHtml = fmtX(m.spdFa2[labState.r].toFixed(m.spdFa2[labState.r] >= 10 ? 1 : 2) + "×");
      speedSub = fmtX(`DINOv3-B L6 on B300 (${m.spdFa4[labState.r].toFixed(1)}× vs. FA4)`);
      errText = m.err[labState.r].toFixed(3);
      errSub = labState.geom === "random"
        ? "Higher MSE than reflected pairs (Prop. 2)"
        : "Measured DINOv3-B L6 on DIV8K";

      const pairsPerCell = 8 / labState.r;
      if (labState.geom === "meros") {
        explainer = `<strong>Reflected pairs + signature weight &times;${labState.r}:</strong> Each of the ${((N - L) / 16).toLocaleString()} far 4&times;4 cells keeps <strong>${pairsPerCell}</strong> center-reflected pair${pairsPerCell > 1 ? "s" : ""} weighted by $+\\ln(${labState.r}) = ${logVal}$. Linear trends cancel inside every cell while the exact 256-key tile anchors the denominator.`;
      } else {
        explainer = `<strong>Simple random sampling (weight &times;${labState.r}, no reflection):</strong> Keeps ${16 / labState.r} independent keys per cell with weight $r=${labState.r}$. Still unbiased, but fails to cancel linear spatial trends across each cell (Proposition 2).`;
      }
      document.getElementById("labKeysReduce").innerHTML = fmtX(`${reduce}× fewer than ${exactKeys.toLocaleString()}`);
    }

    document.getElementById("labKeysRead").textContent = keysRead.toLocaleString();
    const logitEl = document.getElementById("labLogitBias");
    logitEl.innerHTML = logitHtml;
    logitEl.className = "lab-stat-v " + (isBadState ? "lab-stat-v--bad" : "lab-stat-v--meros");
    document.getElementById("labWeightSub").textContent = weightSub;
    document.getElementById("labSpeedup").innerHTML = speedHtml;
    document.getElementById("labSpeedupSub").innerHTML = speedSub;
    const errEl = document.getElementById("labError");
    errEl.textContent = errText;
    errEl.className = "lab-stat-v " + (isBadState ? "lab-stat-v--bad" : "");
    document.getElementById("labErrorSub").textContent = errSub;

    document.getElementById("labBudgetTag").textContent =
      labState.r === 1
        ? "All 16 keys / cell (100%)"
        : `${8 / labState.r} pair${8 / labState.r > 1 ? "s" : ""} / cell (${(100 / labState.r).toFixed(1)}%)`;
    document.getElementById("labWeightTag").textContent =
      labState.geom === "window"
        ? "Far field dropped"
        : labState.r === 1
          ? "Exact (×1)"
          : labState.weightOn
            ? `Unbiased (+log ${labState.r})`
            : "BIASED (×1)";
    document.getElementById("labGeomTag").textContent =
      labState.geom === "meros"
        ? "Cancels affine trends"
        : labState.geom === "random"
          ? "Unpaired variance"
          : "Far field dropped";
    document.getElementById("labResTag").textContent = `${N.toLocaleString()} patches`;

    const expEl = document.getElementById("labExplainer");
    expEl.className = "lab-explainer" + (isBadState ? " lab-explainer--bad" : "");
    expEl.innerHTML = explainer;
    if (typeof window.renderMathInElement === "function") {
      window.renderMathInElement(expEl, {
        delimiters: [{ left: "$", right: "$", display: false }],
        throwOnError: false
      });
    }

    computeRealMassAndInspector();
    drawLabCanvas();
    drawLabScalingSvg();
  }

  if (labCanvas) {
    labCanvas.addEventListener("click", (e) => {
      if (!labGeometryCache) return;
      const rect = labCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const g = labGeometryCache;
      if (x < g.gridLeft || x > g.gridLeft + g.gridSize || y < g.gridTop || y > g.gridTop + g.gridSize) return;

      if (g.mode === "schematic") {
        labState.activeTileC = Math.min(g.TILES - 1, Math.max(0, Math.floor((x - g.gridLeft) / g.tilePx)));
        labState.activeTileR = Math.min(g.TILES - 1, Math.max(0, Math.floor((y - g.gridTop) / g.tilePx)));
        updateLabReadouts();
      } else {
        // Check if user clicked close to one of the 8 real query pins!
        let hitQuery = -1;
        if (cowAttnData) {
          let bestDist = 18; // px click radius
          cowAttnData.queries.forEach((q) => {
            const qx = g.gridLeft + (q.col + 0.5) * g.pPx;
            const qy = g.gridTop + (q.row + 0.5) * g.pPx;
            const d = Math.hypot(x - qx, y - qy);
            if (d < bestDist) {
              bestDist = d;
              hitQuery = q.id;
            }
          });
        }
        if (hitQuery >= 0) {
          labState.queryId = hitQuery;
          const q = cowAttnData.queries[hitQuery];
          // Ensure inspected far cell is outside active local tile
          if ((labState.inspCellR >> 2) === q.tileR && (labState.inspCellC >> 2) === q.tileC) {
            labState.inspCellC = (labState.inspCellC + 8) % 32;
          }
          showToast(`Active DINOv3-B Query: ${q.label} (row ${q.row}, col ${q.col})`);
        } else {
          // Move inspected far 4x4 cell to clicked cell!
          const cc = Math.min(31, Math.max(0, Math.floor((x - g.gridLeft) / g.cellPx)));
          const cr = Math.min(31, Math.max(0, Math.floor((y - g.gridTop) / g.cellPx)));
          const realQ = cowAttnData ? cowAttnData.queries[labState.queryId] : null;
          if (realQ && (cr >> 2) === realQ.tileR && (cc >> 2) === realQ.tileC) {
            showToast("That cell lies inside the exact 16×16 local tile. Click outside the blue tile to inspect a far 4×4 cell.");
          } else {
            labState.inspCellR = cr;
            labState.inspCellC = cc;
          }
        }
        updateLabReadouts();
      }
    });
    window.addEventListener("resize", drawLabCanvas);
  }

  document.querySelectorAll("#labBackdropBtns .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#labBackdropBtns .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      labState.mode = btn.dataset.mode;
      drawLabCanvas();
    });
  });

  document.querySelectorAll("#labBudgetBtns .lab-opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#labBudgetBtns .lab-opt").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      labState.r = parseInt(btn.dataset.r, 10);
      if (labState.geom === "window" && labState.r !== 1) {
        labState.geom = "meros";
        document.querySelectorAll("#labGeomBtns .lab-opt").forEach((b) => b.classList.toggle("active", b.dataset.geom === "meros"));
      }
      updateLabReadouts();
    });
  });

  document.querySelectorAll("#labWeightBtns .lab-opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#labWeightBtns .lab-opt").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      labState.weightOn = btn.dataset.weight === "on";
      if (labState.r === 1 && !labState.weightOn) {
        labState.r = 8;
        document.querySelectorAll("#labBudgetBtns .lab-opt").forEach((b) => b.classList.toggle("active", b.dataset.r === "8"));
      }
      if (labState.geom === "window") {
        labState.geom = "meros";
        document.querySelectorAll("#labGeomBtns .lab-opt").forEach((b) => b.classList.toggle("active", b.dataset.geom === "meros"));
      }
      updateLabReadouts();
    });
  });

  document.querySelectorAll("#labGeomBtns .lab-opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#labGeomBtns .lab-opt").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      labState.geom = btn.dataset.geom;
      if (labState.geom !== "window" && labState.r === 1) {
        labState.r = 8;
        document.querySelectorAll("#labBudgetBtns .lab-opt").forEach((b) => b.classList.toggle("active", b.dataset.r === "8"));
      }
      updateLabReadouts();
    });
  });

  document.querySelectorAll("#labResBtns .lab-opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#labResBtns .lab-opt").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      labState.res = parseInt(btn.dataset.res, 10);
      updateLabReadouts();
    });
  });

  const reseedBtn = document.getElementById("labReseedBtn");
  if (reseedBtn) {
    reseedBtn.addEventListener("click", () => {
      labState.seed = (labState.seed * 31 + 7) % 9973;
      updateLabReadouts();
      showToast(`Sampled new per-head random draw (seed #${labState.seed})`);
    });
  }

  updateLabReadouts();

  /* ==================== 3. BENCHMARK EXPLORER ==================== */
  document.querySelectorAll("#benchTabs .bench-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#benchTabs .bench-tab").forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const target = tab.dataset.tab;
      document.querySelectorAll("#results .bench-panel").forEach((p) => {
        p.classList.toggle("active", p.id === "panel-" + target);
      });
    });
  });

  // All 14 Frozen ViT Backbones (Table 7 / tab:supp_backbones verbatim from main.tex)
  const BACKBONES = [
    { name: "DINOv2-B",   patch: 14, fa2: { "1K":[1.50,1.60,1.65], "2K":[3.47,4.57,5.37], "4K":[5.07,8.24,12.3], "8K":[5.65,11.0,20.2] }, fa4: { "1K":[1.10,1.17,1.21], "2K":[1.49,1.97,2.31], "4K":[1.88,3.06,4.56], "8K":[1.98,3.86,7.07] } },
    { name: "DINOv2-L",   patch: 14, fa2: { "1K":[1.67,1.82,1.89], "2K":[3.52,4.73,5.62], "4K":[5.11,8.32,12.4], "8K":[5.67,11.2,20.1] }, fa4: { "1K":[1.08,1.18,1.23], "2K":[1.48,1.99,2.36], "4K":[1.88,3.06,4.58], "8K":[2.00,3.94,7.09] } },
    { name: "CLIP-L",     patch: 14, fa2: { "1K":[1.76,1.94,2.03], "2K":[3.48,4.67,5.56], "4K":[5.06,8.25,12.2], "8K":[5.63,11.1,19.8] }, fa4: { "1K":[1.09,1.21,1.26], "2K":[1.48,1.99,2.37], "4K":[1.87,3.05,4.52], "8K":[1.99,3.91,7.00] } },
    { name: "DINOv3-B",   patch: 16, fa2: { "1K":[2.43,2.75,2.93], "2K":[3.79,4.75,5.35], "4K":[5.20,8.28,11.6], "8K":[5.75,11.2,19.4] }, fa4: { "1K":[2.21,2.49,2.65], "2K":[2.14,2.68,3.03], "4K":[2.07,3.30,4.60], "8K":[2.05,3.98,6.92] } },
    { name: "MAE-B",      patch: 16, fa2: { "1K":[1.30,1.38,1.46], "2K":[2.84,3.49,3.87], "4K":[4.93,7.97,11.2], "8K":[5.65,11.0,19.4] }, fa4: { "1K":[1.07,1.13,1.19], "2K":[1.35,1.66,1.84], "4K":[1.78,2.88,4.05], "8K":[1.97,3.84,6.77] } },
    { name: "DeiT III-L", patch: 16, fa2: { "1K":[1.67,1.86,1.97], "2K":[3.04,3.85,4.32], "4K":[4.72,7.58,10.6], "8K":[5.77,11.1,19.2] }, fa4: { "1K":[1.08,1.21,1.27], "2K":[1.42,1.80,2.02], "4K":[1.77,2.85,3.97], "8K":[2.00,3.86,6.64] } },
    { name: "DINOv3-L",   patch: 16, fa2: { "1K":[2.59,2.80,2.98], "2K":[3.77,4.73,5.31], "4K":[5.09,8.13,11.3], "8K":[5.79,11.1,19.1] }, fa4: { "1K":[2.02,2.18,2.32], "2K":[2.17,2.72,3.05], "4K":[2.04,3.25,4.52], "8K":[2.08,4.00,6.86] } },
    { name: "MAE-L",      patch: 16, fa2: { "1K":[1.46,1.56,1.65], "2K":[3.03,3.82,4.25], "4K":[4.88,7.88,11.1], "8K":[5.71,11.0,19.1] }, fa4: { "1K":[1.05,1.12,1.19], "2K":[1.43,1.80,2.00], "4K":[1.79,2.89,4.06], "8K":[1.99,3.85,6.67] } },
    { name: "DeiT III-B", patch: 16, fa2: { "1K":[1.55,1.78,1.91], "2K":[3.04,3.83,4.33], "4K":[4.78,7.62,10.6], "8K":[5.57,10.8,18.7] }, fa4: { "1K":[1.17,1.34,1.44], "2K":[1.39,1.76,1.98], "4K":[1.79,2.85,3.98], "8K":[1.96,3.81,6.61] } },
    { name: "CLIP-B",     patch: 16, fa2: { "1K":[1.30,1.39,1.45], "2K":[2.77,3.38,3.73], "4K":[4.72,7.49,10.4], "8K":[5.54,10.8,18.7] }, fa4: { "1K":[1.07,1.14,1.19], "2K":[1.34,1.64,1.81], "4K":[1.78,2.82,3.93], "8K":[1.97,3.83,6.66] } },
    { name: "SigLIP2-L",  patch: 16, fa2: { "1K":[1.40,1.48,1.53], "2K":[2.78,3.28,3.50], "4K":[4.72,7.19,9.75], "8K":[5.65,10.7,18.1] }, fa4: { "1K":[1.06,1.12,1.16], "2K":[1.32,1.56,1.67], "4K":[1.79,2.72,3.69], "8K":[1.98,3.76,6.36] } },
    { name: "SigLIP2-B",  patch: 16, fa2: { "1K":[1.28,1.35,1.40], "2K":[2.63,3.06,3.34], "4K":[4.68,7.11,9.58], "8K":[5.52,10.5,18.0] }, fa4: { "1K":[1.08,1.13,1.18], "2K":[1.33,1.55,1.69], "4K":[1.78,2.71,3.65], "8K":[1.95,3.71,6.34] } },
    { name: "EVA-02-B",   patch: 14, fa2: { "1K":[1.70,1.83,1.90], "2K":[2.91,3.56,3.98], "4K":[4.51,6.72,9.03], "8K":[5.39,10.0,16.9] }, fa4: { "1K":[1.20,1.29,1.34], "2K":[1.39,1.70,1.89], "4K":[1.76,2.63,3.53], "8K":[1.94,3.60,6.08] } },
    { name: "EVA-02-L",   patch: 14, fa2: { "1K":[1.40,1.47,1.50], "2K":[2.28,2.58,2.74], "4K":[3.89,5.30,6.41], "8K":[5.20,9.14,13.9] }, fa4: { "1K":[1.07,1.12,1.14], "2K":[1.23,1.39,1.48], "4K":[1.61,2.20,2.65], "8K":[1.86,3.27,4.99] } }
  ];

  const bbState = { base: "fa2", res: "8K", rIdx: 2 };
  const bbBarsEl = document.getElementById("backboneBars");

  function renderBackboneBars() {
    if (!bbBarsEl) return;
    const rows = BACKBONES.map((b) => ({
      name: b.name,
      patch: b.patch,
      val: b[bbState.base][bbState.res][bbState.rIdx]
    })).sort((a, b) => b.val - a.val);

    const maxVal = Math.max(...rows.map((r) => r.val), 1.5);
    const minVal = Math.min(...rows.map((r) => r.val));
    const rName = ["r=2", "r=4", "r=8"][bbState.rIdx];
    const baseName = bbState.base === "fa2" ? "Exact FlashAttention-2 (FA2)" : "Exact FlashAttention-4 (FA4)";
    document.getElementById("backboneChartSub").innerHTML = fmtX(
      `Whole-backbone speedup of MEROS ${rName} over ${baseName} at ${bbState.res} resolution (${minVal.toFixed(minVal >= 10 ? 1 : 2)}× – ${maxVal.toFixed(maxVal >= 10 ? 1 : 2)}×). Faster than ${bbState.base.toUpperCase()} on all 14 backbones.`
    );

    bbBarsEl.innerHTML = rows
      .map((row) => {
        const pct = Math.max(8, (row.val / (maxVal * 1.04)) * 100);
        const valStr = row.val >= 10 ? row.val.toFixed(1) + MUL : row.val.toFixed(2) + MUL;
        return `
          <div class="bar-row">
            <div class="bar-name">${row.name}<span>p${row.patch}</span></div>
            <div class="bar-track">
              <div class="bar-fill ${bbState.base === "fa4" ? "bar-fill--fa4" : ""}" style="width:${pct.toFixed(1)}%"></div>
            </div>
            <div class="bar-val">${valStr}</div>
          </div>`;
      })
      .join("");
  }

  document.querySelectorAll("#bbBaseToggle .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#bbBaseToggle .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      bbState.base = btn.dataset.base;
      renderBackboneBars();
    });
  });

  document.querySelectorAll("#bbResToggle .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#bbResToggle .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      bbState.res = btn.dataset.res;
      renderBackboneBars();
    });
  });

  document.querySelectorAll("#bbBudgetToggle .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#bbBudgetToggle .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      bbState.rIdx = btn.dataset.r === "r2" ? 0 : btn.dataset.r === "r4" ? 1 : 2;
      renderBackboneBars();
    });
  });

  renderBackboneBars();

  // Semantic Segmentation 17 settings (Table 4 verbatim from main.tex)
  const SEG_ROWS = [
    ["UAVid", "DINOv3-B", "T 2048", "59.13", "−0.41", "1.30×", "−0.70", "1.62×", "−3.84", "0.73×", "−0.09", "−0.17", "−0.33", "3.79×", "4.75×", "5.35×"],
    ["UAVid", "MAE-B", "T 2048", "35.43", "−0.61", "1.54×", "−12.29", "2.00×", "−0.49", "0.70×", "+0.02", "+0.02", "+0.00", "2.84×", "3.49×", "3.87×"],
    ["UAVid", "MAE-L", "T 2048", "49.11", "−1.10", "1.44×", "−19.41", "2.11×", "−0.59", "0.77×", "−0.01", "−0.04", "−0.13", "3.03×", "3.82×", "4.25×"],
    ["UAVid", "DeiT III-B", "T 2048", "51.86", "−1.43", "1.56×", "−12.18", "1.93×", "−1.00", "0.71×", "+0.01", "+0.00", "+0.05", "3.04×", "3.83×", "4.33×"],
    ["UAVid", "DeiT III-L", "T 2048", "55.95", "−0.44", "1.66×", "−3.86", "1.97×", "−0.26", "0.77×", "+0.00", "−0.01", "−0.05", "3.04×", "3.85×", "4.32×"],
    ["UAVid", "SigLIP2-B", "T 2048", "40.72", "−5.98", "1.55×", "−13.54", "2.40×", "+0.03", "0.76×", "−0.14", "−0.31", "−0.36", "2.63×", "3.06×", "3.34×"],
    ["UAVid", "SigLIP2-L", "T 2048", "47.43", "−4.31", "1.63×", "−15.75", "2.58×", "−0.21", "0.82×", "−0.03", "−0.05", "−0.33", "2.78×", "3.28×", "3.50×"],
    ["Cityscapes", "DINOv3-B", "T 1024", "74.84", "−0.46", "0.79×", "−3.51", "0.44×", "−0.57", "0.32×", "−0.16", "−0.45", "−1.11", "2.43×", "2.75×", "2.93×"],
    ["Cityscapes", "MAE-B", "T 1024", "26.67", "−3.92", "0.45×", "−2.47", "0.53×", "−0.81", "0.31×", "−0.01", "−0.09", "−0.15", "1.30×", "1.38×", "1.46×"],
    ["Cityscapes", "MAE-L", "T 1024", "40.07", "−2.21", "0.38×", "−3.11", "0.56×", "−0.22", "0.28×", "−0.09", "−0.27", "−0.56", "1.46×", "1.56×", "1.65×"],
    ["DeepGlobe", "DINOv3-B", "T 2048", "62.66", "−0.36", "1.30×", "−3.05", "1.62×", "−6.47", "0.73×", "−0.07", "−0.29", "−0.57", "3.79×", "4.75×", "5.35×"],
    ["DeepGlobe", "DINOv3-B", "C 2560", "62.13", "−0.14", "1.51×", "−6.55", "2.28×", "−4.98", "0.97×", "+0.07", "−0.03", "−0.38", "4.23×", "5.79×", "6.95×"],
    ["DeepGlobe", "DINOv3-B", "N 2448", "57.60", "+0.12", "1.51×", "−1.01", "2.28×", "−7.74", "0.97×", "−0.08", "−0.23", "−0.62", "4.23×", "5.79×", "6.95×"],
    ["URUR", "DINOv3-B", "T 2048", "41.08", "+0.17", "1.30×", "+0.17", "1.62×", "−8.47", "0.73×", "−0.21", "−0.53", "−0.95", "3.79×", "4.75×", "5.35×"],
    ["URUR", "DINOv3-B", "T 4096", "24.23", "−0.68", "2.17×", "+0.11", "4.95×", "−2.02", "1.35×", "−0.10", "−0.23", "−0.30", "5.20×", "8.28×", "11.6×"],
    ["URUR", "DINOv3-B", "C 5120", "37.20", "−0.90", "2.29×", "−1.75", "7.43×", "−1.75", "1.49×", "−0.11", "−0.19", "−0.41", "5.53×", "9.33×", "14.0×"],
    ["URUR", "DINOv3-B", "N 5120", "22.68", "−0.46", "2.29×", "+0.14", "7.43×", "−1.32", "1.49×", "−0.02", "−0.09", "−0.17", "5.53×", "9.33×", "14.0×"]
  ];

  function renderSegTable(filterDs) {
    const body = document.getElementById("segTableBody");
    if (!body) return;
    const rows = filterDs === "all" ? SEG_ROWS : SEG_ROWS.filter((r) => r[0] === filterDs);
    const fmtCell = (s) => `<td>${s}</td>`;
    let html = rows
      .map(
        (r) => `<tr>
          <td><strong>${r[0]}</strong></td>
          <td>${r[1]}</td>
          <td class="mono">${r[2]}</td>
          <td>${r[3]}</td>
          ${fmtCell(r[4])}<td>${fmtX(r[5])}</td>
          ${fmtCell(r[6])}<td>${fmtX(r[7])}</td>
          ${fmtCell(r[8])}<td>${fmtX(r[9])}</td>
          <td style="background:#fff7f4;"><strong>${r[10]}</strong></td>
          <td style="background:#fff7f4;">${r[11]}</td>
          <td style="background:#fff7f4;">${r[12]}</td>
          <td style="background:#fff7f4;">${fmtX(r[13])}</td>
          <td style="background:#fff7f4;">${fmtX(r[14])}</td>
          <td style="background:#fff7f4;" class="num-best">${fmtX(r[15])}</td>
        </tr>`
      )
      .join("");

    html += `
      <tr class="row-summary">
        <td colspan="3">Median of 17 settings</td><td>&ndash;</td>
        <td>&minus;0.61</td><td>1.51${MUL}</td>
        <td>&minus;3.11</td><td>2.00${MUL}</td>
        <td>&minus;1.00</td><td>0.76${MUL}</td>
        <td class="num-best">&minus;0.07</td><td>&minus;0.17</td><td>&minus;0.33</td>
        <td>3.04${MUL}</td><td>3.85${MUL}</td><td class="num-best">4.33${MUL}</td>
      </tr>
      <tr class="row-summary">
        <td colspan="3">Worst of 17 settings</td><td>&ndash;</td>
        <td>&minus;5.98</td><td>0.38${MUL}</td>
        <td>&minus;19.41</td><td>0.44${MUL}</td>
        <td>&minus;8.47</td><td>0.28${MUL}</td>
        <td class="num-best">&minus;0.21</td><td>&minus;0.53</td><td>&minus;1.11</td>
        <td>1.30${MUL}</td><td>1.38${MUL}</td><td class="num-best">1.46${MUL}</td>
      </tr>`;
    body.innerHTML = html;
  }

  document.querySelectorAll("#segFilterBtns .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#segFilterBtns .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderSegTable(btn.dataset.ds);
    });
  });
  renderSegTable("all");

  // VLM TTFT Breakdown (Table S13 / tab:supp_vlm_time verbatim from main.tex)
  const VLM_TTFT = [
    { name: "Exact FlashAttention-2", enc: 10.83, pre: 1.76, total: 12.60, speed: "1.00×", hi: false, pruned: false },
    { name: "SparseVLM (post-enc)", enc: 10.83, pre: 0.46, total: 11.30, speed: "1.11×", hi: false, pruned: true },
    { name: "Exact FlashAttention-4", enc: 3.23, pre: 1.77, total: 5.01, speed: "2.51×", hi: false, pruned: false },
    { name: "MEROS r=8", enc: 1.88, pre: 1.77, total: 3.66, speed: "3.45×", hi: true, pruned: false },
    { name: "MEROS r=8 + SparseVLM", enc: 1.89, pre: 0.46, total: 2.35, speed: "5.36×", hi: true, pruned: true }
  ];

  const vlmBarsEl = document.getElementById("vlmTtftBars");
  if (vlmBarsEl) {
    const maxSec = 13.0;
    vlmBarsEl.innerHTML = VLM_TTFT.map((r) => {
      const encW = (r.enc / maxSec) * 100;
      const preW = (r.pre / maxSec) * 100;
      return `
        <div class="ttft-row ${r.hi ? "ttft-row--highlight" : ""}">
          <div class="ttft-name">${r.name}</div>
          <div class="ttft-track">
            <div class="ttft-seg-enc" style="width:${encW.toFixed(1)}%">${r.enc >= 1.5 ? r.enc.toFixed(2) + "s" : ""}</div>
            <div class="ttft-seg-pre ${r.pruned ? "ttft-seg-pre--pruned" : ""}" style="width:${preW.toFixed(1)}%">${r.pre >= 1.0 ? r.pre.toFixed(2) + "s" : ""}</div>
          </div>
          <div class="ttft-total">${r.total.toFixed(2)}s (${fmtX(r.speed)})</div>
        </div>`;
    }).join("");
  }

  /* ==================== 4. MULTI-TASK VISUAL GALLERY ==================== */
  document.querySelectorAll("#galleryTabs .bench-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#galleryTabs .bench-tab").forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const target = tab.dataset.gtab;
      document.querySelectorAll("#gallery .bench-panel").forEach((p) => {
        p.classList.toggle("active", p.id === "gpanel-" + target);
      });
    });
  });

  // 4A. Depth Slider (dual-line badges; primary baseline i-clustered is both slower and less accurate than MEROS)
  const DEPTH_SCENES = {
    eth5_moge: {
      meros: "assets/sliders/depth/eth5_moge_meros.jpg",
      rTitle: "MEROS r=8 · Native 6K",
      rSub: "AbsRel 3.46% · 2.03 s (6.8× vs. FA2)",
      pill: "6.8× vs. Exact FA2 · 2.4× faster than i-clustered",
      meta: "<strong>ETH3D Pipes (6048×4032, 129k tokens, MoGe-3 ViT-G):</strong> i-clustered runs 2.4× slower than MEROS (4.91 s vs. 2.03 s) and washes out ceiling ducts and wall pipes (AbsRel 5.09%). MEROS r=8 matches Exact FA2 (3.44% in 13.71 s) at <strong>3.46% AbsRel</strong>.",
      lefts: {
        iclust: { img: "assets/sliders/depth/eth5_moge_iclust.jpg", title: "i-clustered · Native 6K", sub: "AbsRel 5.09% · 4.91 s (2.8× vs. FA2)" },
        exact:  { img: "assets/sliders/depth/eth5_moge_exact.jpg",  title: "Exact FlashAttention-2 · Native 6K", sub: "AbsRel 3.44% · 13.71 s" },
        rgb:    { img: "assets/sliders/depth/eth5_rgb.jpg",         title: "RGB Input Image", sub: "6048 × 4032 px (native)" }
      }
    },
    eth8_moge: {
      meros: "assets/sliders/depth/eth8_moge_meros.jpg",
      rTitle: "MEROS r=8 · Native 6K",
      rSub: "AbsRel 2.37% · 2.03 s (6.8× vs. FA2)",
      pill: "6.8× vs. Exact FA2 · 2.4× faster than i-clustered",
      meta: "<strong>ETH3D Corridor (6048×4032, 129k tokens, MoGe-3 ViT-G):</strong> i-clustered runs 2.4× slower (4.91 s) and dissolves the overhead pipes and hanging conduit box (AbsRel 4.25%). MEROS r=8 preserves hallway perspective and ceiling geometry at <strong>2.37% AbsRel</strong> (Exact FA2: 2.51% in 13.71 s).",
      lefts: {
        iclust: { img: "assets/sliders/depth/eth8_moge_iclust.jpg", title: "i-clustered · Native 6K", sub: "AbsRel 4.25% · 4.91 s (2.8× vs. FA2)" },
        exact:  { img: "assets/sliders/depth/eth8_moge_exact.jpg",  title: "Exact FlashAttention-2 · Native 6K", sub: "AbsRel 2.51% · 13.71 s" },
        rgb:    { img: "assets/sliders/depth/eth8_rgb.jpg",         title: "RGB Input Image", sub: "6048 × 4032 px (native)" }
      }
    },
    eth5_dav2: {
      meros: "assets/sliders/depth/eth5_dav2_meros.jpg",
      rTitle: "MEROS r=8 · Native 6K",
      rSub: "AbsRel 4.63% · 0.74 s (7.3× vs. FA2)",
      pill: "7.3× vs. Exact FA2 · 2.8× faster than i-clustered",
      meta: "<strong>ETH3D Pipes (6048×4032, 129k tokens, Depth Anything V2-L):</strong> i-clustered runs 2.8× slower than MEROS (2.08 s vs. 0.74 s) and blurs the pipes and valves into fog (AbsRel 8.43%). MEROS r=8 keeps every pipe edge sharp at <strong>4.63% AbsRel</strong> (Exact FA2: 4.32% in 5.43 s).",
      lefts: {
        iclust: { img: "assets/sliders/depth/eth5_dav2_iclust.jpg", title: "i-clustered · Native 6K", sub: "AbsRel 8.43% · 2.08 s (2.6× vs. FA2)" },
        exact:  { img: "assets/sliders/depth/eth5_dav2_exact.jpg",  title: "Exact FlashAttention-2 · Native 6K", sub: "AbsRel 4.32% · 5.43 s" },
        rgb:    { img: "assets/sliders/depth/eth5_rgb.jpg",         title: "RGB Input Image", sub: "6048 × 4032 px (native)" }
      }
    },
    mid13_dav2: {
      meros: "assets/sliders/depth/mid13_dav2_meros.jpg",
      rTitle: "MEROS r=8 · Native 3K",
      rSub: "AbsRel 3.29% · 85 ms (3.7× vs. FA2)",
      pill: "3.7× vs. Exact FA2 · 4.9× faster than i-clustered",
      meta: "<strong>Middlebury Playtable (2724×1848, Depth Anything V2-L):</strong> i-clustered takes 414 ms (slower than Exact FA2 at 315 ms) and blurs the wire mesh basket and tabletop toys (AbsRel 4.81%). MEROS r=8 runs in <strong>85 ms</strong> (4.9× faster than i-clustered) at <strong>3.29% AbsRel</strong>.",
      lefts: {
        iclust: { img: "assets/sliders/depth/mid13_dav2_iclust.jpg", title: "i-clustered · Native 3K", sub: "AbsRel 4.81% · 414 ms (0.8× vs. FA2)" },
        exact:  { img: "assets/sliders/depth/mid13_dav2_exact.jpg",  title: "Exact FlashAttention-2 · Native 3K", sub: "AbsRel 3.63% · 315 ms" },
        rgb:    { img: "assets/sliders/depth/mid13_rgb.jpg",         title: "RGB Input Image", sub: "2724 × 1848 px (native)" }
      }
    }
  };

  let curDepthScene = "eth5_moge";
  let curDepthLeft = "iclust";
  const depthSlider = initCompareSlider(document.getElementById("depthCompare"), 50);

  function renderDepthSlider() {
    const sc = DEPTH_SCENES[curDepthScene];
    if (!sc.lefts[curDepthLeft]) {
      curDepthLeft = "iclust";
      document.querySelectorAll("#depthLeftBtns .pill-btn").forEach((b) => {
        b.classList.toggle("active", b.dataset.dleft === curDepthLeft);
      });
    }
    const leftData = sc.lefts[curDepthLeft];
    document.getElementById("depthImgLeft").src = leftData.img;
    document.getElementById("depthImgRight").src = sc.meros;
    setBadge("depthBadgeLeft", fmtX(leftData.title), fmtX(leftData.sub));
    setBadge("depthBadgeRight", fmtX(sc.rTitle), fmtX(sc.rSub));
    document.getElementById("depthMetaText").innerHTML = fmtX(sc.meta);
    document.getElementById("depthMetaPill").innerHTML = fmtX(sc.pill);
  }

  document.querySelectorAll("#depthSceneBtns .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#depthSceneBtns .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      curDepthScene = btn.dataset.dscene;
      renderDepthSlider();
      if (depthSlider) depthSlider.setPos(50);
    });
  });

  document.querySelectorAll("#depthLeftBtns .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#depthLeftBtns .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      curDepthLeft = btn.dataset.dleft;
      renderDepthSlider();
    });
  });

  // 4B. 1:1 Native-Pixel Image Matting Slider
  const MAT_SCENES = {
    web: {
      meros: "assets/sliders/matting/web_meros_r8.jpg",
      rTitle: "MEROS r=8 · Native 6K",
      rSub: "1.54 s (5.0× vs. chunked) · |SAD|: 4.6",
      pill: "5.0× vs. Chunked Exact · Zero OOM",
      meta: "<strong>Transparent-460 Spiderweb (6000×4000, ViTMatte-B):</strong> Original ViTMatte-B OOMs on 288 GB B300; downscaling to 2048 px blurs silk filaments (|SAD| to Exact = 346.9). MEROS r=8 runs natively in <strong>1.54 s</strong> vs. 7.72 s chunked exact (<strong>5.0× faster</strong>), staying within <strong>4.6 SAD</strong> of Exact.",
      lefts: {
        exact_down2048: { img: "assets/sliders/matting/web_exact_down2048.jpg", title: "Exact @ ↓2048 px", sub: "0.18 s · |SAD| to Exact: 346.9" },
        exact_sdpa:     { img: "assets/sliders/matting/web_exact_sdpa.jpg",     title: "Exact Native (Chunked)", sub: "7.72 s (Original ViTMatte OOM)" },
        mematte_b:      { img: "assets/sliders/matting/web_mematte_b.jpg",      title: "MEMatte-B (Trained)", sub: "1.26 s · trained token router" }
      }
    },
    hair: {
      meros: "assets/sliders/matting/hair_meros_r8.jpg",
      rTitle: "MEROS r=8 · Native 4.8K",
      rSub: "0.88 s (3.9× vs. chunked) · |SAD|: 5.6",
      pill: "3.9× vs. Chunked Exact · Preserves Fine Hair",
      meta: "<strong>PPM-100 Portrait Hair (4843×3229, ViTMatte-B):</strong> Original ViTMatte-B OOMs; downscaling to 2048 px loses wisps (|SAD| to Exact = 40.0) and trained MEMatte-B erodes dark hair regions. Training-free MEROS r=8 matches chunked Exact (3.45 s → <strong>0.88 s</strong>, 3.9× faster) within <strong>5.6 SAD</strong>.",
      lefts: {
        exact_down2048: { img: "assets/sliders/matting/hair_exact_down2048.jpg", title: "Exact @ ↓2048 px", sub: "0.19 s · |SAD| to Exact: 40.0" },
        exact_sdpa:     { img: "assets/sliders/matting/hair_exact_sdpa.jpg",     title: "Exact Native (Chunked)", sub: "3.45 s (Original ViTMatte OOM)" },
        mematte_b:      { img: "assets/sliders/matting/hair_mematte_b.jpg",      title: "MEMatte-B (Trained)", sub: "0.89 s · erodes dark hair" }
      }
    }
  };

  let curMatScene = "web";
  let curMatLeft = "exact_down2048";
  const matSlider = initCompareSlider(document.getElementById("matCompare"), 50);

  function renderMatSlider() {
    const sc = MAT_SCENES[curMatScene];
    const leftData = sc.lefts[curMatLeft];
    document.getElementById("matImgLeft").src = leftData.img;
    document.getElementById("matImgRight").src = sc.meros;
    setBadge("matBadgeLeft", leftData.title, leftData.sub);
    setBadge("matBadgeRight", sc.rTitle, sc.rSub);
    document.getElementById("matMetaText").innerHTML = fmtX(sc.meta);
    document.getElementById("matMetaPill").innerHTML = fmtX(sc.pill);
  }

  document.querySelectorAll("#matSceneBtns .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#matSceneBtns .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      curMatScene = btn.dataset.mscene;
      renderMatSlider();
      if (matSlider) matSlider.setPos(50);
    });
  });

  document.querySelectorAll("#matLeftBtns .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#matLeftBtns .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      curMatLeft = btn.dataset.mleft;
      renderMatSlider();
    });
  });

  // 4C. 3D Point Cloud Slider
  initCompareSlider(document.getElementById("cloudCompare"), 50);
  document.querySelectorAll("#cloudLeftBtns .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#cloudLeftBtns .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.cleft;
      document.getElementById("cloudImgLeft").src =
        mode === "exact" ? "assets/sliders/clouds/pipes_exact.webp" : "assets/sliders/clouds/pipes_local.webp";
      setBadge(
        "cloudBadgeLeft",
        mode === "exact" ? "Exact FlashAttention-2 · Native 6K" : "Local-Only (No Far Field)",
        mode === "exact" ? "13.71 s encoder latency" : "Far-field tokens removed"
      );
    });
  });

  /* ==================== 5. 42-LINE PYTORCH REFERENCE (LISTING 1) ==================== */
  const PYTORCH_RAW = `import hashlib, math, random
import torch
import torch.nn.functional as F
sdpa = F.scaled_dot_product_attention

def sample(rows, cols, r, layer, head, seed=17):
    """First 8/r reflected pairs of every 4x4 cell."""
    tag, idx = f"meros-cell-v1|{seed}|{layer}|{head}", []
    for c in range(rows * cols // 16):
        cy, cx = divmod(c, cols // 4)
        key = f"{tag}|{cy}|{cx}|pair".encode()
        h = hashlib.sha256(key).digest()
        rng = random.Random(int.from_bytes(h, "little"))
        pairs = list(range(8))    # pair j: j and 15-j
        rng.shuffle(pairs)        # uniform order per cell
        for j in pairs[:8 // r]:  # prefixes: budgets nest
            for u in (j, 15 - j): # (y,x) and (3-y,3-x)
                idx.append((4*cy+u//4)*cols + 4*cx+u%4)
    return torch.tensor(idx)

def meros_attention(q, k, v, rows, cols, r, idx, g):
    """q, k, v: [B, H, g+N, d] after position encoding,
    g global tokens first, then N = rows*cols patches in
    raster order. idx: [H, N/r] samples of each head."""
    B, H, _, d = q.shape; idx = idx.to(q.device)
    nt = cols // 16                       # tiles per row
    tile = lambda p: p // cols // 16 * nt + p % cols // 16
    gi = (idx + g)[None, :, :, None].expand(B, H, -1, d)
    ks, vs = k.gather(2, gi), v.gather(2, gi)  # once
    far = torch.full_like(idx, math.log(r), dtype=q.dtype)
    rest = far.new_zeros(H, 256 + g)      # tile, globals
    p = torch.arange(rows * cols, device=q.device)
    out = torch.empty_like(q)
    for t in range(rows * cols // 256):
        own = g + p[tile(p) == t]    # 256 queries of t
        far_t = far.masked_fill(tile(idx) == t, -math.inf)
        bias = torch.cat((far_t, rest), 1)[None, :, None]
        kt = torch.cat((ks, k[:, :, own], k[:, :, :g]), 2)
        vt = torch.cat((vs, v[:, :, own], v[:, :, :g]), 2)
        out[:, :, own] = sdpa(q[:, :, own], kt, vt, bias)
    out[:, :, :g] = sdpa(q[:, :, :g], k, v)  # exact
    return out`;

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function highlightPythonLine(line) {
    const trimmed = line.trim();
    if (trimmed.startsWith('"""') || trimmed.endsWith('"""') || trimmed.startsWith("g global") || trimmed.startsWith("raster order")) {
      return `<span class="tok-str">${escapeHtml(line)}</span>`;
    }
    let codePart = line;
    let cmtPart = "";
    const hashIdx = line.indexOf("#");
    if (hashIdx >= 0) {
      codePart = line.slice(0, hashIdx);
      cmtPart = line.slice(hashIdx);
    }

    let html = escapeHtml(codePart);
    html = html.replace(/(f?&quot;[^&]*?&quot;|f?"[^"]*?")/g, '<span class="tok-str">$1</span>');
    html = html.replace(/\b(import|as|def|for|in|return|lambda|None)\b/g, '<span class="tok-kw">$1</span>');
    html = html.replace(/\b(sample|meros_attention|sdpa)\b/g, '<span class="tok-fn">$1</span>');
    html = html.replace(/\b(\d+)\b/g, '<span class="tok-num">$1</span>');

    if (cmtPart) {
      html += `<span class="tok-cmt">${escapeHtml(cmtPart)}</span>`;
    }
    return html;
  }

  const codeBlockEl = document.getElementById("pytorchCodeBlock");
  if (codeBlockEl) {
    codeBlockEl.innerHTML = PYTORCH_RAW.split("\n")
      .map((line) => `<span class="code-line">${highlightPythonLine(line)}</span>`)
      .join("");
  }

  /* -------------------- Copy Buttons (Code & BibTeX) -------------------- */
  function wireCopy(btnId, textProvider, labelDone) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const orig = btn.textContent;
    btn.addEventListener("click", async () => {
      const txt = textProvider();
      try {
        await navigator.clipboard.writeText(txt);
      } catch (_) {
        const ta = document.createElement("textarea");
        ta.value = txt;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      btn.textContent = labelDone;
      showToast(labelDone);
      setTimeout(() => { btn.textContent = orig; }, 1800);
    });
  }

  wireCopy("copyCodeBtn", () => PYTORCH_RAW, "Copied PyTorch Code!");
  wireCopy("copyBibtexBtn", () => (document.getElementById("bibtexText")?.textContent || "").trim(), "Copied BibTeX!");
})();
