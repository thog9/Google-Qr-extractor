const I18N = {
  en: {
    logoSub: "Google QR SMS Extractor",
    pages: {
      console: "Cloud Console",
      qr: "QR verify page",
      other: "Unsupported page"
    },
    btnConsole: "Auto Cloud Shell",
    btnQr: "Downgrade to SMS",
    btnOpen: "Open Console",
    btnWorking: "Working…",
    howTitle: "How to use",
    statuses: {
      idle: "Ready — choose an action",
      idleConsole: "Cloud Console detected — launch Cloud Shell to continue",
      idleQr: "QR page detected — downgrade to SMS is ready",
      idleOther: "Open Google Cloud Console to start",
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
    steps: [
      { t: "Open Google Cloud Console and sign in",
        d: "Go to <b>console.cloud.google.com</b> with the account you want to verify." },
      { t: "Launch Cloud Shell",
        d: "Click the terminal icon <b>[>_]</b> at the top-right, or press <b>Auto Cloud Shell</b> in this popup." },
      { t: "Open the Verify window",
        d: "In the Cloud Shell panel, click <b>Verify</b> to open Google's QR verification page. Always start here — QR pages opened by third-party apps can bounce back to the QR screen." },
      { t: "Downgrade to SMS",
        d: "On the QR page press <b>Downgrade to SMS</b>. The extension reads the QR, injects <b>[3,null,4]</b>, switches the tab to an iPad Mini profile and redirects to the SMS selection page." },
      { t: "Verify with your phone",
        d: "Choose <b>Text message</b>, enter your phone number, then submit the 6-digit <b>G-xxxxxx</b> code. Voice call works too." }
    ]
  },
  vi: {
    logoSub: "Công cụ tách QR Google",
    pages: {
      console: "Cloud Console",
      qr: "Trang xác minh QR",
      other: "Trang không hỗ trợ"
    },
    btnConsole: "Tự mở Cloud Shell",
    btnQr: "Hạ cấp sang SMS",
    btnOpen: "Mở Console",
    btnWorking: "Đang xử lý…",
    howTitle: "Hướng dẫn sử dụng",
    statuses: {
      idle: "Sẵn sàng — chọn thao tác",
      idleConsole: "Đã nhận diện Cloud Console — mở Cloud Shell để tiếp tục",
      idleQr: "Đã nhận diện trang QR — có thể hạ cấp sang SMS",
      idleOther: "Mở Google Cloud Console để bắt đầu",
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
    steps: [
      { t: "Mở Google Cloud Console và đăng nhập",
        d: "Truy cập <b>console.cloud.google.com</b> bằng tài khoản bạn muốn xác minh." },
      { t: "Khởi động Cloud Shell",
        d: "Bấm biểu tượng terminal <b>[>_]</b> ở góc trên bên phải, hoặc bấm <b>Tự mở Cloud Shell</b> trong popup này." },
      { t: "Mở cửa sổ Verify",
        d: "Trong bảng Cloud Shell, bấm <b>Verify</b> để mở trang xác minh QR của Google. Luôn bắt đầu từ đây — QR từ ứng dụng bên thứ ba có thể bị đẩy ngược về trang QR." },
      { t: "Hạ cấp sang SMS",
        d: "Trên trang QR bấm <b>Hạ cấp sang SMS</b>. Tiện ích đọc mã QR, inject <b>[3,null,4]</b>, chuyển tab sang hồ sơ iPad Mini và chuyển tới trang chọn SMS." },
      { t: "Xác minh bằng điện thoại",
        d: "Chọn <b>Text message</b>, nhập số điện thoại rồi gửi mã 6 số <b>G-xxxxxx</b>. Có thể chọn cuộc gọi thoại nếu muốn." }
    ]
  },
  zh: {
    logoSub: "Google 二维码提取器",
    pages: {
      console: "Cloud Console",
      qr: "二维码验证页",
      other: "不支持的页面"
    },
    btnConsole: "自动打开 Cloud Shell",
    btnQr: "降级为短信",
    btnOpen: "打开 Console",
    btnWorking: "处理中…",
    howTitle: "使用方法",
    statuses: {
      idle: "就绪 — 请选择操作",
      idleConsole: "已识别 Cloud Console — 启动 Cloud Shell 继续",
      idleQr: "已识别二维码页 — 可以降级为短信",
      idleOther: "请打开 Google Cloud Console 开始",
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
    steps: [
      { t: "打开 Google Cloud Console 并登录",
        d: "使用要验证的账号访问 <b>console.cloud.google.com</b>。" },
      { t: "启动 Cloud Shell",
        d: "点击右上角终端图标 <b>[>_]</b>，或点击本弹窗中的 <b>自动打开 Cloud Shell</b>。" },
      { t: "打开 Verify 窗口",
        d: "在 Cloud Shell 面板中点击 <b>Verify</b> 打开 Google 二维码验证页。请始终从这里进入 — 第三方应用弹出的二维码可能会跳回二维码页。" },
      { t: "降级为短信验证",
        d: "在二维码页点击 <b>降级为短信</b>。扩展会识别二维码、注入 <b>[3,null,4]</b>，把标签页切换为 iPad Mini 环境并跳转到短信选择页。" },
      { t: "用手机完成验证",
        d: "选择 <b>Text message</b>，输入手机号并提交 6 位 <b>G-xxxxxx</b> 验证码。也可以选择语音通话。" }
    ]
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

const hasChrome = typeof chrome !== "undefined" && !!(chrome.storage && chrome.tabs);
const html = document.documentElement;

let currentLang = "en";
let lastState = { page: "other", status: "idleOther", detail: "" };
let tabId = null;
let pollTimer = null;

/* ── theme ───────────────────────────────────────────────────── */
function applyTheme(theme) {
  html.setAttribute("data-theme", theme === "light" ? "light" : "dark");
}

const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    if (hasChrome) chrome.storage.local.set({ gqe_theme: next });
    else localStorage.setItem("gqe_theme", next);
  } catch (e) {}
});

/* ── i18n ────────────────────────────────────────────────────── */
function T(key) {
  const pack = I18N[currentLang] || I18N.en;
  return (pack[key] !== undefined) ? pack[key] : I18N.en[key];
}

function applyLang(lang) {
  currentLang = I18N[lang] ? lang : detectLang();
  html.setAttribute("lang", currentLang);
  document.title = "Thog · Google QR Extractor";

  document.getElementById("logoSub").textContent = T("logoSub");
  document.getElementById("howTitle").textContent = T("howTitle");

  const steps = document.getElementById("steps");
  steps.innerHTML = T("steps").map((s, i) => `
    <div class="step">
      <div class="step-head" data-step="${i}">
        <span class="step-num"></span>
        <span class="step-title">${s.t}</span>
        <span class="chev"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></span>
      </div>
      <div class="step-body"><span class="step-txt">${s.d}</span></div>
    </div>`).join("");

  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-lang") === currentLang);
  });

  render(lastState);
}

/* ── accordion ───────────────────────────────────────────────── */
const howToggle = document.getElementById("howToggle");
howToggle.addEventListener("click", () => {
  const open = !howToggle.classList.contains("open");
  howToggle.classList.toggle("open", open);
  howToggle.setAttribute("aria-expanded", String(open));
  document.getElementById("steps").hidden = !open;
});

document.getElementById("steps").addEventListener("click", (e) => {
  const head = e.target.closest(".step-head");
  if (head) head.parentElement.classList.toggle("open");
});

/* ── language switch ─────────────────────────────────────────── */
document.getElementById("langSwitch").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-lang]");
  if (!btn) return;
  const lang = btn.getAttribute("data-lang");
  applyLang(lang);
  try {
    if (hasChrome) chrome.storage.local.set({ gqe_lang: lang });
    else localStorage.setItem("gqe_lang", lang);
  } catch (err) {}
});

/* ── state rendering ─────────────────────────────────────────── */
const pageNameEl  = document.getElementById("pageName");
const pageDotEl   = document.getElementById("pageDot");
const btnMain     = document.getElementById("btnMain");
const btnMainText = document.getElementById("btnMainText");
const btnOpen     = document.getElementById("btnOpenConsole");
const btnOpenText = document.getElementById("btnOpenText");
const statusBar   = document.getElementById("statusBar");
const sText       = document.getElementById("sText");
const sDetail     = document.getElementById("sDetail");

function isBusy(status) {
  return typeof status === "string" && status.indexOf("working") === 0;
}

function render(state) {
  if (state) lastState = state;
  const page = lastState.page || "other";
  const status = lastState.status || "idle";
  const detail = lastState.detail || "";
  const busy = isBusy(status);

  const pages = T("pages");
  pageNameEl.textContent = pages[page] || pages.other;
  pageDotEl.classList.toggle("live", page !== "other");

  btnOpen.classList.toggle("hidden", page === "other");
  btnOpenText.textContent = T("btnOpen");

  let label = T("btnOpen");
  if (page === "console") label = T("btnConsole");
  if (page === "qr") label = T("btnQr");
  if (busy) label = T("btnWorking");
  btnMainText.textContent = label;
  btnMain.disabled = busy;

  let cls = "status-row";
  if (status.indexOf("ok") === 0) cls += " ok";
  else if (status.indexOf("err") === 0) cls += " err";
  else if (status.indexOf("idle") === 0) cls += " idle";
  statusBar.className = cls;

  const statuses = T("statuses");
  sText.textContent = statuses[status] || statuses.idle || status;
  sDetail.textContent = detail;
  sDetail.classList.toggle("show", !!detail);
}

/* ── chrome state polling ────────────────────────────────────── */
function queryState() {
  if (!hasChrome || tabId == null) return;
  chrome.tabs.sendMessage(tabId, { type: "gqe", action: "getState" }, (resp) => {
    if (chrome.runtime.lastError || !resp) {
      render({ page: "other", status: "idleOther", detail: "" });
      return;
    }
    render(resp);
  });
}

function openConsole() {
  if (hasChrome) chrome.tabs.create({ url: "https://console.cloud.google.com/" });
}

btnMain.addEventListener("click", () => {
  if (!hasChrome || tabId == null) return;
  const page = lastState.page || "other";

  if (page === "other") {
    openConsole();
    return;
  }

  const working = page === "console" ? "workingShell" : "workingQr";
  render({ ...lastState, status: working, detail: "" });

  chrome.tabs.sendMessage(tabId, { type: "gqe", action: "runAction" }, () => {
    void chrome.runtime.lastError;
    setTimeout(queryState, 600);
  });
});

btnOpen.addEventListener("click", openConsole);

/* ── boot ────────────────────────────────────────────────────── */
function init() {
  let lang = detectLang();
  let theme = "dark";

  try {
    const lsLang = localStorage.getItem("gqe_lang");
    const lsTheme = localStorage.getItem("gqe_theme");
    if (lsLang && I18N[lsLang]) lang = lsLang;
    if (lsTheme) theme = lsTheme;
  } catch (e) {}

  applyTheme(theme);
  applyLang(lang);
  render(lastState);

  if (!hasChrome) return;

  chrome.storage.local.get(["gqe_lang", "gqe_theme"], (r) => {
    if (r && I18N[r.gqe_lang]) applyLang(r.gqe_lang);
    if (r && r.gqe_theme) applyTheme(r.gqe_theme);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const t = tabs && tabs[0];
      if (!t) return;
      tabId = t.id;
      queryState();
      pollTimer = setInterval(queryState, 900);
    });
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes.gqe_lang && I18N[changes.gqe_lang.newValue]) {
      applyLang(changes.gqe_lang.newValue);
    }
    if (changes.gqe_theme && changes.gqe_theme.newValue) {
      applyTheme(changes.gqe_theme.newValue);
    }
  });
}

window.addEventListener("unload", () => {
  if (pollTimer) clearInterval(pollTimer);
});

init();
