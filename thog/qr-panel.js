(() => {
  // Only mount on Cloud Shell or the QR verification page. After the redirect to the
  // SMS selection / code entry page we stay out of the way completely.
  const isCloudConsole = location.hostname === "console.cloud.google.com";
  const isQrPage = location.hostname === "accounts.google.com" && location.pathname.includes("/challenge/iap/qrcode");
  if (!isCloudConsole && !isQrPage) return;

  const PAGE = isCloudConsole ? "console" : "qr";

  const I18N = {
    en: {
      statuses: {
        idleConsole: "Cloud Console detected — launch Cloud Shell to continue",
        idleQr: "QR page detected — downgrade to SMS is ready",
        workingShell: "Opening Cloud Shell…",
        workingVerify: "Looking for the Verify button…",
        workingQr: "Reading QR and injecting [3,null,4]…",
        okShell: "Cloud Shell opened — wait for the Verify window",
        okVerify: "Verify clicked — the QR page should open",
        okQr: "Injected [3,null,4] — redirecting to SMS…",
        errNoShell: "Cloud Shell button not found — open it manually",
        errNoVerify: "Cloud Shell opened — click Verify manually",
        errNoQr: "QR not found — wait for the QR image to load, then retry",
        errServer: "Google did not return [3,null,4] — retry in a moment",
        errGeneric: "Action failed — reload the page and retry"
      },
      btnConsole: "Auto Cloud Shell",
      btnQr: "Downgrade to SMS",
      btnWorking: "Working…",
      hints: {
        console: "Cloud Shell → Verify → QR page",
        qr: "Keep this tab open while it redirects"
      }
    },
    vi: {
      statuses: {
        idleConsole: "Đã nhận diện Cloud Console — mở Cloud Shell để tiếp tục",
        idleQr: "Đã nhận diện trang QR — có thể hạ cấp sang SMS",
        workingShell: "Đang mở Cloud Shell…",
        workingVerify: "Đang tìm nút Verify…",
        workingQr: "Đang đọc QR và inject [3,null,4]…",
        okShell: "Đã mở Cloud Shell — chờ cửa sổ Verify",
        okVerify: "Đã bấm Verify — trang QR sẽ mở",
        okQr: "Đã inject [3,null,4] — đang chuyển sang SMS…",
        errNoShell: "Không tìm thấy nút Cloud Shell — hãy mở thủ công",
        errNoVerify: "Đã mở Cloud Shell — hãy bấm Verify thủ công",
        errNoQr: "Không thấy mã QR — chờ ảnh tải xong rồi thử lại",
        errServer: "Google chưa trả về [3,null,4] — thử lại sau giây lát",
        errGeneric: "Thao tác thất bại — tải lại trang rồi thử lại"
      },
      btnConsole: "Tự mở Cloud Shell",
      btnQr: "Hạ cấp sang SMS",
      btnWorking: "Đang xử lý…",
      hints: {
        console: "Cloud Shell → Verify → trang QR",
        qr: "Giữ tab này mở trong khi chuyển trang"
      }
    },
    zh: {
      statuses: {
        idleConsole: "已识别 Cloud Console — 启动 Cloud Shell 继续",
        idleQr: "已识别二维码页 — 可以降级为短信",
        workingShell: "正在启动 Cloud Shell…",
        workingVerify: "正在查找 Verify 按钮…",
        workingQr: "正在识别二维码并注入 [3,null,4]…",
        okShell: "Cloud Shell 已启动 — 等待 Verify 窗口",
        okVerify: "已点击 Verify — 二维码页即将打开",
        okQr: "已注入 [3,null,4] — 正在跳转短信验证…",
        errNoShell: "未找到 Cloud Shell 按钮 — 请手动打开",
        errNoVerify: "Cloud Shell 已打开 — 请手动点击 Verify",
        errNoQr: "未识别到二维码 — 等图片加载后重试",
        errServer: "Google 未返回 [3,null,4] — 请稍后重试",
        errGeneric: "操作失败 — 请刷新页面后重试"
      },
      btnConsole: "自动打开 Cloud Shell",
      btnQr: "降级为短信",
      btnWorking: "处理中…",
      hints: {
        console: "Cloud Shell → Verify → 二维码页",
        qr: "跳转过程中请保持此标签页打开"
      }
    }
  };

  function detectLang() {
    try {
      const l = (navigator.language || "en").toLowerCase();
      if (l.startsWith("vi")) return "vi";
      if (l.startsWith("zh")) return "zh";
    } catch (e) {}
    return "en";
  }

  const state = {
    page: PAGE,
    status: PAGE === "console" ? "idleConsole" : "idleQr",
    detail: ""
  };

  let lang = detectLang();
  let theme = "dark";

  /* ── shadow DOM panel ──────────────────────────────────────── */
  const host = document.createElement("div");
  host.id = "thog-qr-extractor";
  host.style.cssText = "all:initial;position:fixed;right:20px;bottom:20px;z-index:2147483647;";
  document.documentElement.appendChild(host);

  const root = host.attachShadow({ mode: "open" });
  root.innerHTML = `
    <style>
      :host { all: initial; }
      .panel {
        width: 274px;
        font-family: 'DM Sans','Segoe UI',system-ui,-apple-system,'Microsoft YaHei',sans-serif;
        background: var(--bg);
        color: var(--text);
        border: 1px solid var(--border);
        border-radius: 14px;
        box-shadow: 0 18px 50px rgba(0,0,0,.55);
        overflow: hidden;
        position: relative;
        animation: up .35s cubic-bezier(.2,.8,.2,1) both;
        transition: background .22s, color .22s, border-color .22s;
      }
      .panel[data-theme="dark"] {
        --bg: #0A0D10; --surface2: #1C2330;
        --border: rgba(255,255,255,.09);
        --text: #E8EFF5; --text2: rgba(232,239,245,.55); --text3: rgba(232,239,245,.30);
        --accent: #1AE8B0; --accent2: #0EA5E9; --danger: #F43F5E;
      }
      .panel[data-theme="light"] {
        --bg: #FFFFFF; --surface2: #EEF1F5;
        --border: rgba(0,0,0,.12);
        --text: #0D1117; --text2: #4B5563; --text3: #6B7280;
        --accent: #059669; --accent2: #0369A1; --danger: #DC2626;
      }
      .panel::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
        background: linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent);
        opacity: .75;
      }
      @keyframes up { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform: translateY(0); } }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.35} }
      .head {
        display: flex; align-items: center; justify-content: space-between;
        padding: 10px 12px; border-bottom: 1px solid var(--border); gap: 8px;
      }
      .brand { display: flex; align-items: center; gap: 6px; min-width: 0; }
      .brand .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--text3); flex-shrink: 0; }
      .brand .dot.live { background: var(--accent); box-shadow: 0 0 8px var(--accent); animation: blink 1.8s infinite; }
      .thog {
        font-family: 'Syne','Segoe UI',system-ui,sans-serif;
        font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: var(--text);
      }
      .sep { color: var(--text3); font-size: 10px; }
      .name {
        font-family: 'DM Mono',Consolas,monospace;
        font-size: 8px; letter-spacing: 1.2px; text-transform: uppercase;
        color: var(--text3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .mini {
        width: 22px; height: 22px; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        background: var(--surface2); border: 1px solid var(--border);
        border-radius: 6px; color: var(--text3); cursor: pointer;
        font-size: 14px; line-height: 1; padding: 0 0 2px;
        transition: all .18s;
      }
      .mini:hover { color: var(--accent); border-color: var(--accent); }
      .body { padding: 11px 12px 12px; display: flex; flex-direction: column; gap: 9px; }
      .statusline {
        display: flex; align-items: flex-start; gap: 7px;
        font-size: 11px; line-height: 1.45; color: var(--text2); min-height: 32px;
      }
      .statusline .sdot {
        width: 6px; height: 6px; border-radius: 50%; margin-top: 5px; flex-shrink: 0;
        background: var(--text3); transition: all .18s;
      }
      .statusline.ok { color: var(--accent); }
      .statusline.ok .sdot { background: var(--accent); box-shadow: 0 0 8px var(--accent); animation: blink 1.8s infinite; }
      .statusline.err { color: var(--danger); }
      .statusline.err .sdot { background: var(--danger); box-shadow: 0 0 8px var(--danger); }
      .primary {
        display: flex; align-items: center; justify-content: center; gap: 7px;
        width: 100%; padding: 9px 12px; border: none; border-radius: 8px;
        background: linear-gradient(135deg, var(--accent) 0%, #0CB88A 100%);
        color: #05120E; font-family: inherit; font-size: 11.5px; font-weight: 700;
        letter-spacing: .3px; cursor: pointer;
        box-shadow: 0 4px 16px rgba(26,232,176,.28);
        transition: all .2s;
      }
      .panel[data-theme="light"] .primary { color: #FFFFFF; }
      .primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(26,232,176,.42); }
      .primary:active:not(:disabled) { transform: translateY(0); }
      .primary:disabled { opacity: .62; cursor: progress; }
      .primary svg { flex-shrink: 0; }
      .hint {
        font-family: 'DM Mono',Consolas,monospace;
        font-size: 8.5px; line-height: 1.4; color: var(--text3); letter-spacing: .2px;
      }
      .foot {
        display: flex; align-items: center; justify-content: space-between;
        padding: 7px 12px; border-top: 1px solid var(--border);
        font-size: 9px; color: var(--text3);
      }
      .foot b { color: var(--accent); font-weight: 600; }
      .foot a { color: var(--text3); text-decoration: none; transition: color .18s; }
      .foot a:hover { color: var(--accent2); }
      .panel.min .body, .panel.min .foot { display: none; }
    </style>
    <div class="panel" data-theme="dark">
      <div class="head">
        <div class="brand">
          <span class="dot live"></span>
          <span class="thog">THOG</span>
          <span class="sep">·</span>
          <span class="name">QR Extractor</span>
        </div>
        <button class="mini" data-min title="Minimize">−</button>
      </div>
      <div class="body">
        <div class="statusline">
          <span class="sdot"></span>
          <span data-status></span>
        </div>
        <button class="primary" data-action>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span data-btn></span>
        </button>
        <div class="hint" data-hint></div>
      </div>
      <div class="foot">
        <span>by <b>Thog</b></span>
        <a href="https://t.me/thogairdrops" target="_blank" rel="noopener">@thogairdrops</a>
      </div>
    </div>`;

  // Prefer a constructed stylesheet — it is not blocked by a strict page style-src CSP.
  const inlineStyle = root.querySelector("style");
  if (inlineStyle && "adoptedStyleSheets" in root && typeof CSSStyleSheet === "function") {
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(inlineStyle.textContent);
      root.adoptedStyleSheets = [sheet];
      inlineStyle.remove();
    } catch (e) {}
  }

  const panel      = root.querySelector(".panel");
  const dotEl      = root.querySelector(".brand .dot");
  const statusEl   = root.querySelector(".statusline");
  const statusText = root.querySelector("[data-status]");
  const actionBtn  = root.querySelector("[data-action]");
  const actionText = root.querySelector("[data-btn]");
  const hintEl     = root.querySelector("[data-hint]");
  const miniBtn    = root.querySelector("[data-min]");

  miniBtn.addEventListener("click", () => {
    const min = panel.classList.toggle("min");
    miniBtn.textContent = min ? "+" : "−";
    miniBtn.title = min ? "Expand" : "Minimize";
  });

  /* ── rendering ─────────────────────────────────────────────── */
  function pack() {
    return I18N[lang] || I18N.en;
  }

  function isBusy(status) {
    return typeof status === "string" && status.indexOf("working") === 0;
  }

  function render() {
    const p = pack();
    const busy = isBusy(state.status);

    panel.setAttribute("data-theme", theme);
    dotEl.classList.toggle("live", !busy && state.status.indexOf("err") !== 0);

    let cls = "statusline";
    if (state.status.indexOf("ok") === 0) cls += " ok";
    else if (state.status.indexOf("err") === 0) cls += " err";
    statusEl.className = cls;
    statusText.textContent = p.statuses[state.status] || state.status;

    let label = PAGE === "console" ? p.btnConsole : p.btnQr;
    if (busy) label = p.btnWorking;
    actionText.textContent = label;
    actionBtn.disabled = busy;

    hintEl.textContent = (p.hints && p.hints[PAGE]) || "";
  }

  function setStatus(status, detail) {
    state.status = status;
    state.detail = detail || "";
    render();
  }

  function applyLang(next) {
    lang = I18N[next] ? next : detectLang();
    render();
  }

  function applyTheme(next) {
    theme = next === "light" ? "light" : "dark";
    render();
  }

  try {
    chrome.storage.local.get(["gqe_lang", "gqe_theme"], (r) => {
      if (r && I18N[r.gqe_lang]) applyLang(r.gqe_lang);
      if (r && r.gqe_theme) applyTheme(r.gqe_theme);
    });
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "local") return;
      if (changes.gqe_lang && I18N[changes.gqe_lang.newValue]) applyLang(changes.gqe_lang.newValue);
      if (changes.gqe_theme && changes.gqe_theme.newValue) applyTheme(changes.gqe_theme.newValue);
    });
  } catch (e) {}

  render();

  /* ── Cloud Shell action ────────────────────────────────────── */
  function runCloudShell() {
    setStatus("workingShell");

    const shellBtn = document.querySelector(
      'button[aria-label*="Cloud Shell"], button[aria-label*="Cloud shell"], button[mattooltip*="Cloud Shell"], [id*="cloudshell"], [id*="cloud-shell"]'
    );
    if (!shellBtn) {
      setStatus("errNoShell");
      return;
    }

    shellBtn.click();
    setStatus("okShell");

    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      const allBtns = Array.from(document.querySelectorAll('button, a, [role="button"]'));
      const verifyBtn = allBtns.find((b) => b.textContent.trim() === "Verify");
      if (verifyBtn) {
        clearInterval(timer);
        verifyBtn.click();
        setStatus("okVerify");
        return;
      }
      if (attempts >= 4) {
        clearInterval(timer);
        setStatus("errNoVerify");
        return;
      }
      setStatus("workingVerify");
    }, 1500);
  }

  /* ── QR downgrade action ───────────────────────────────────── */
  async function extractQrUrlFromPage() {
    if ("BarcodeDetector" in window) {
      const detector = new BarcodeDetector({ formats: ["qr_code"] });
      const mediaEls = Array.from(document.querySelectorAll("img, canvas"));
      for (const el of mediaEls) {
        try {
          if (el.clientWidth > 80 && el.clientHeight > 80) {
            const c = document.createElement("canvas");
            c.width = el.naturalWidth || el.clientWidth || 300;
            c.height = el.naturalHeight || el.clientHeight || 300;
            const ctx = c.getContext("2d");
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.drawImage(el, 0, 0, c.width, c.height);
            const codes = await detector.detect(c);
            if (codes && codes.length > 0 && codes[0].rawValue) {
              return codes[0].rawValue;
            }
          }
        } catch (e) {}
      }
    }

    const bodyText = document.body.innerText || "";
    const shortMatch = bodyText.match(/g\.co\/verify\/[A-Za-z0-9_-]+/);
    if (shortMatch) return "https://" + shortMatch[0];

    const html = document.documentElement.innerHTML;
    const m = html.match(/https:\/\/accounts\.google\.com\/devicephoneverification\/begin\?[^"'\s<>]+/);
    if (m) return m[0].replace(/\\u003d/g, "=").replace(/\\u0026/g, "&").replace(/&amp;/g, "&");

    throw new Error("QR_NOT_FOUND");
  }

  async function runDowngrade() {
    setStatus("workingQr");

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let qrUrl = "";

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        qrUrl = await extractQrUrlFromPage();
        break;
      } catch (e) {
        if (attempt === 2) {
          setStatus("errNoQr");
          return;
        }
        await sleep(900);
      }
    }

    let res;
    try {
      res = await chrome.runtime.sendMessage({ action: "downgradeQr", qrUrl });
    } catch (e) {
      setStatus("errGeneric", String(e && e.message ? e.message : e));
      return;
    }

    if (!res || !res.ok) {
      setStatus("errGeneric", res ? res.error : "background request failed");
      return;
    }

    if (!res.ydResp.includes("[3,null,4]")) {
      setStatus("errServer", String(res.ydResp || "").slice(0, 140));
      return;
    }

    setStatus("okQr");

    const params = new URLSearchParams(location.search);
    let cont = params.get("continue") || "";
    let targetUrl = "";

    if (cont && cont.startsWith("https://accounts.google.com/uplevelingstep/")) {
      cont = cont.replace(/&idv_xdevice=[^&]*/g, "");
      cont = cont.replace(/([?&])authuser(&|$)/, "$1authuser=0$2");
      targetUrl = cont + "&idv_xdevice=1";
    } else {
      targetUrl = location.href.replace("/challenge/iap/qrcode", "/challenge/iap");
      targetUrl = targetUrl.replace(/&idv_xdevice=[^&]*/g, "") + "&idv_xdevice=1";
    }

    location.replace(targetUrl);
  }

  function runAction() {
    if (PAGE === "console") runCloudShell();
    else runDowngrade();
  }

  actionBtn.addEventListener("click", runAction);

  /* ── messaging bridge for the popup ────────────────────────── */
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (!msg || msg.type !== "gqe") return;
    if (msg.action === "getState") {
      sendResponse({ page: state.page, status: state.status, detail: state.detail });
      return;
    }
    if (msg.action === "runAction") {
      runAction();
      sendResponse({ ok: true });
    }
  });
})();
