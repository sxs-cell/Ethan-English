/* ============ PWA：注册 Service Worker ============ */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

/* ============ 通用脚本 ============ */
document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initFanwen();   // 先渲染动态内容（范文库手风琴）
  initZhentiFanwen(); // 渲染大作文真题范文解析
  initXiaoZuoFanwen(); // 渲染小作文真题范文
  initAccordion(); // 再绑定所有手风琴事件（含动态渲染的）
  initVocab();
  initJuxing();   // 功能句库
  initFlash();    // 背诵闪卡
  initTimer();    // 考场计时器
  initPractice();
  initAiGrade(); // AI 批改
  initZhenti();
});

/* ---- 导航栏汉堡菜单 ---- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
  // 高亮当前页
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });
}

/* ---- 手风琴折叠 ---- */
function initAccordion() {
  document.querySelectorAll(".acc-head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.parentElement;
      const isOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".acc-item").forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
}

/* ---- 词汇库 ---- */
let savedWords = new Set(JSON.parse(localStorage.getItem("savedWords") || "[]"));

function initVocab() {
  const list = document.getElementById("vocab-list");
  if (!list) return;
  const search = document.getElementById("vocab-search");
  const filterWrap = document.getElementById("vocab-filters");
  const count = document.getElementById("vocab-count");
  const ALL_VOCAB = [...VOCAB, ...(typeof VOCAB_EXTRA !== "undefined" ? VOCAB_EXTRA : [])];
  const cats = ["全部", ...Array.from(new Set(ALL_VOCAB.map((v) => v.cat)))];
  let activeCat = "全部";

  // 渲染筛选标签
  cats.forEach((cat) => {
    const chip = document.createElement("button");
    chip.className = "chip" + (cat === "全部" ? " active" : "");
    chip.textContent = cat;
    chip.addEventListener("click", () => {
      filterWrap.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeCat = cat;
      render();
    });
    filterWrap.appendChild(chip);
  });

  if (search) search.addEventListener("input", render);

  function render() {
    const kw = (search.value || "").trim().toLowerCase();
    const items = ALL_VOCAB.filter((v) => {
      const matchCat = activeCat === "全部" || v.cat === activeCat;
      const matchKw = !kw || v.en.toLowerCase().includes(kw) || v.zh.includes(kw);
      return matchCat && matchKw;
    });
    list.innerHTML = "";
    items.forEach((v) => {
      const row = document.createElement("div");
      row.className = "vocab-item";
      const saved = savedWords.has(v.en);
      row.innerHTML = `
        <div class="word">
          <div class="en">${v.en}</div>
          <div class="zh">${v.zh} <span class="badge badge-blue" style="margin-left:6px">${v.cat}</span></div>
        </div>
        <button class="save ${saved ? "saved" : ""}" title="收藏到生词本" data-en="${v.en}">${saved ? "★" : "☆"}</button>`;
      row.querySelector(".save").addEventListener("click", (e) => {
        const en = e.currentTarget.dataset.en;
        if (savedWords.has(en)) savedWords.delete(en);
        else savedWords.add(en);
        localStorage.setItem("savedWords", JSON.stringify([...savedWords]));
        render();
      });
      list.appendChild(row);
    });
    if (count) count.textContent = items.length;
  }
  render();
}

/* ---- 作文批改练习 ---- */
function initPractice() {
  const textarea = document.getElementById("essay-input");
  if (!textarea) return;

  const wc = document.getElementById("word-count");
  const btn = document.getElementById("grade-btn");
  const resultBox = document.getElementById("grade-result");
  const sampleBtns = document.querySelectorAll("[data-sample]");

  textarea.addEventListener("input", () => {
    const words = countWords(textarea.value);
    wc.textContent = `已输入 ${words} 词（英一大作文建议 160-200 词 / 英二约 150 词 / 小作文约 100 词）`;
  });

  sampleBtns.forEach((b) => {
    b.addEventListener("click", () => {
      textarea.value = b.dataset.sample;
      textarea.dispatchEvent(new Event("input"));
      textarea.scrollIntoView({ behavior: "smooth" });
    });
  });

  btn.addEventListener("click", () => {
    const text = textarea.value.trim();
    if (!text) {
      resultBox.innerHTML = '<div class="notice">请先输入或粘贴你的作文，再点击批改。</div>';
      return;
    }
    const report = gradeEssay(text);
    resultBox.innerHTML = report;
    resultBox.scrollIntoView({ behavior: "smooth" });
    renderHistory();
    renderBadges();
    renderStats();
  });
  renderHistory();
  renderBadges();
  renderStats();
}

function countWords(text) {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).filter(Boolean).length;
}

function gradeEssay(text) {
  const words = countWords(text);
  const issues = [];
  const highlights = [];

  // 1. 字数检查
  if (words < 100) issues.push({ level: "warn", title: "字数偏少", msg: `当前 ${words} 词，未达到小作文 100 词 / 大作文 150 词的最低要求。` });
  else if (words > 260) issues.push({ level: "warn", title: "字数偏多", msg: `当前 ${words} 词，大作文上限约 200 词，建议精简。` });
  else issues.push({ level: "good", title: "字数达标", msg: `当前 ${words} 词，符合要求区间。` });

  // 2. 俗套句检测
  const cliche = [
    "as is shown above", "as we all know", "there are many reasons",
    "it is very important", "every coin has two sides", "with the development of society",
    "more and more", "in a word", "last but not least"
  ];
  const foundCliche = cliche.filter((c) => text.toLowerCase().includes(c));
  if (foundCliche.length) {
    issues.push({ level: "bad", title: "存在俗套句（易扣分）", msg: `检测到：${foundCliche.join("、")}。建议替换为更高级的表达（如 as is symbolically depicted / there exist plenty of causes）。` });
  }

  // 3. 连接词检测（结构连贯）
  const linkers = ["however", "moreover", "furthermore", "therefore", "for instance", "for example", "consequently", "meanwhile", "in addition", "first", "second", "finally"];
  const foundLinkers = linkers.filter((l) => text.toLowerCase().includes(l));
  if (foundLinkers.length >= 3) highlights.push({ level: "good", title: "衔接连贯", msg: `使用了 ${foundLinkers.length} 处连接词（${foundLinkers.slice(0, 4).join("、")}…），逻辑层次清晰。` });
  else if (foundLinkers.length >= 1) issues.push({ level: "warn", title: "连接词偏少", msg: `仅使用 ${foundLinkers.length} 处连接词，建议增加 however / moreover / for instance 等，增强段落衔接。` });
  else issues.push({ level: "bad", title: "缺少连接词", msg: "未检测到连接词，建议使用 however、moreover、therefore 等串联逻辑。" });

  // 4. 高级句型检测
  const advanced = [
    { re: /\bnot only[\s\S]{0,60}\bbut also\b/i, name: "not only...but also" },
    { re: /\bso (important|indispensable|significant)\b/i, name: "so...that 强调结构" },
    { re: /\b(it is|there is|there are|only through|never can|under no circumstance)\b/i, name: "倒装/强调句式" },
    { re: /\b(which|who|that|whose)\b.*\b(will|can|should|enables|provides)\b/i, name: "定语从句" },
  ];
  const foundAdv = advanced.filter((a) => a.re.test(text));
  if (foundAdv.length >= 2) highlights.push({ level: "good", title: "句型丰富", msg: `检测到 ${foundAdv.length} 类高级句型（${foundAdv.map((a) => a.name).join("、")}），符合高分语言要求。` });
  else if (foundAdv.length === 1) issues.push({ level: "warn", title: "句型较单一", msg: "仅使用 1 类高级句型，建议加入倒装、定语从句、虚拟语气等亮点句式。" });
  else issues.push({ level: "warn", title: "缺少高级句型", msg: "建议使用 not only...but also、定语从句、倒装句等提升语言档次。" });

  // 5. 段落结构
  const paragraphs = text.split(/\n\s*\n|\n/).filter((p) => p.trim().length > 0);
  if (paragraphs.length >= 3) highlights.push({ level: "good", title: "段落结构清晰", msg: `检测到 ${paragraphs.length} 个段落，符合"三段式"结构。` });
  else issues.push({ level: "warn", title: "段落结构", msg: `当前 ${paragraphs.length} 段，大作文建议按"描述→分析→总结"三段展开。` });

  // 综合评分（模拟）
  let score = 100;
  score -= foundCliche.length * 6;
  score -= (linkers.length === 0 ? 8 : linkers.length === 1 ? 5 : 0);
  score -= (foundAdv.length === 0 ? 6 : foundAdv.length === 1 ? 3 : 0);
  if (words < 100) score -= 12;
  else if (words > 260) score -= 8;
  if (paragraphs.length < 3) score -= 6;
  score = Math.max(40, Math.min(98, score));

  // 保存批改历史 + 打卡
  saveEssayHistory(words, score, text);
  checkIn();

  const goodItems = highlights.map((h) => `
    <div class="result-item good"><b>✅ ${h.title}</b><span>${h.msg}</span></div>`).join("");
  const badItems = issues.filter((i) => i.level !== "good").map((i) => `
    <div class="result-item ${i.level === "bad" ? "bad" : "warn"}"><b>${i.level === "bad" ? "⚠️" : "💡"} ${i.title}</b><span>${i.msg}</span></div>`).join("");

  return `
    <div class="score-box">
      <div class="num">${score}</div>
      <div class="label">模拟评分（满分 100，仅供参考，最终以阅卷标准为准）</div>
    </div>
    ${goodItems}
    ${badItems}
    <div class="tip">这是本地规则引擎的<b>演示批改</b>，仅做字数、句型、衔接等浅层检查。接入大语言模型（LLM）后可实现真正的语义批改、句子润色与逐句点评。</div>`;
}

/* ---- 真题库渲染 ---- */
function initZhenti() {
  const t1 = document.getElementById("zhenti-ying1");
  const t2 = document.getElementById("zhenti-ying2");
  if (t1) t1.innerHTML = renderZhentiRows(ZHENTI_YING1);
  if (t2) t2.innerHTML = renderZhentiRows(ZHENTI_YING2);
}

function renderZhentiRows(data) {
  return data.map((z) => `
    <tr>
      <td><b>${z.year}</b></td>
      <td><span class="badge badge-gray">${z.type}</span></td>
      <td>${z.topic}</td>
    </tr>`).join("");
}

/* ---- 范文库渲染 ---- */
function initFanwen() {
  const list = document.getElementById("fanwen-list");
  if (!list) return;
  list.innerHTML = FANWEN.map((f) => `
    <div class="acc-item">
      <button class="acc-head">
        <span>${f.title} <span class="badge badge-amber" style="margin-left:6px">${f.tag}</span></span>
        <span class="arrow">▾</span>
      </button>
      <div class="acc-body">
        <p style="margin-bottom:8px"><span class="badge badge-blue">${f.type}</span></p>
        <p style="margin-bottom:14px"><b>结构：</b>${f.structure}</p>
        <pre style="white-space:pre-wrap;background:#f8fafc;padding:16px;border-radius:10px;font-size:14px;font-family:inherit;line-height:1.8">${f.sample}</pre>
      </div>
    </div>`).join("");
}

/* ---- 大作文真题范文解析渲染 ---- */
function initZhentiFanwen() {
  const list = document.getElementById("zhenti-fanwen-list");
  if (!list) return;
  const extra1 = typeof FANWEN_YING1_EXTRA !== "undefined" ? FANWEN_YING1_EXTRA : [];
  const extra2 = typeof FANWEN_YING2_EXTRA !== "undefined" ? FANWEN_YING2_EXTRA : [];
  const extra26 = typeof FANWEN_2026 !== "undefined" ? FANWEN_2026 : [];
  const all = [...ZHENTI_FANWEN, ...extra1, ...extra2, ...extra26];
  // 英语一在前、英语二在后，组内按年份倒序
  all.sort((a, b) => (a.exam === b.exam ? b.year - a.year : a.exam === "英语一" ? -1 : 1));
  list.innerHTML = all.map((f) => `
    <div class="acc-item">
      <button class="acc-head">
        <span>${f.year} ${f.exam} · ${f.topic} <span class="badge badge-blue" style="margin-left:6px">${f.type}</span></span>
        <span class="arrow">▾</span>
      </button>
      <div class="acc-body">
        <p style="margin-bottom:12px"><b>🎯 审题立意：</b>${f.yi}</p>
        <div style="margin-bottom:12px">${f.keywords.map((k) => `<span class="badge badge-green" style="margin-right:6px">${k}</span>`).join("")}</div>
        <p style="margin-bottom:6px;font-weight:700">📄 范文（可套用模板）</p>
        <pre style="white-space:pre-wrap;background:#f8fafc;padding:16px;border-radius:10px;font-size:14px;font-family:inherit;line-height:1.9">${f.fanwen}</pre>
        <p style="margin:16px 0 6px;font-weight:700">🔍 结构拆解</p>
        <p style="color:var(--text-secondary)">${f.jiexi}</p>
        <p style="margin:16px 0 6px;font-weight:700">✨ 亮点句型</p>
        <ul style="padding-left:20px;color:var(--text-secondary)">
          ${f.liangdian.map((l) => `<li>${l}</li>`).join("")}
        </ul>
      </div>
    </div>`).join("");
}

/* ---- 小作文真题范文渲染 ---- */
function initXiaoZuoFanwen() {
  const list = document.getElementById("xiaozuowen-fanwen-list");
  if (!list) return;
  const base = typeof XIAOZUOWEN_FANWEN !== "undefined" ? XIAOZUOWEN_FANWEN : [];
  const y26 = typeof XIAOZUOWEN_2026 !== "undefined" ? XIAOZUOWEN_2026 : [];
  const data = [...base, ...y26];
  data.sort((a, b) => (a.exam === b.exam ? b.year - a.year : a.exam === "英语一" ? -1 : 1));
  list.innerHTML = data.map((f) => `
    <div class="acc-item">
      <button class="acc-head">
        <span>${f.year} ${f.exam} · ${f.topic} <span class="badge badge-amber" style="margin-left:6px">${f.type}</span></span>
        <span class="arrow">▾</span>
      </button>
      <div class="acc-body">
        <p style="margin-bottom:12px"><b>📋 题目要求：</b>${f.yaoqiu}</p>
        <div style="margin-bottom:12px">${f.keywords.map((k) => `<span class="badge badge-green" style="margin-right:6px">${k}</span>`).join("")}</div>
        <p style="margin-bottom:6px;font-weight:700">📄 范文</p>
        <pre style="white-space:pre-wrap;background:#f8fafc;padding:16px;border-radius:10px;font-size:14px;font-family:inherit;line-height:1.9">${f.fanwen}</pre>
        <p style="margin:16px 0 6px;font-weight:700">🔍 结构拆解</p>
        <p style="color:var(--text-secondary)">${f.jiexi}</p>
        <p style="margin:16px 0 6px;font-weight:700">✨ 亮点句型</p>
        <ul style="padding-left:20px;color:var(--text-secondary)">
          ${f.liangdian.map((l) => `<li>${l}</li>`).join("")}
        </ul>
      </div>
    </div>`).join("");
}

/* ---- 功能句库渲染 ---- */
function initJuxing() {
  const list = document.getElementById("juxing-list");
  if (!list) return;
  const search = document.getElementById("juxing-search");
  const filterWrap = document.getElementById("juxing-filters");
  const count = document.getElementById("juxing-count");
  let activeCat = "全部";

  JUXING_CATS.forEach((cat) => {
    const chip = document.createElement("button");
    chip.className = "chip" + (cat === "全部" ? " active" : "");
    chip.textContent = cat;
    chip.addEventListener("click", () => {
      filterWrap.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeCat = cat;
      render();
    });
    filterWrap.appendChild(chip);
  });

  if (search) search.addEventListener("input", render);

  function render() {
    const kw = (search.value || "").trim().toLowerCase();
    let total = 0;
    let html = "";
    JUXING.forEach((group) => {
      if (activeCat !== "全部" && group.cat !== activeCat) return;
      const items = group.items.filter((it) => !kw || it.en.toLowerCase().includes(kw) || it.zh.includes(kw));
      if (!items.length) return;
      total += items.length;
      html += `<h3 class="juxing-cat">${group.cat}</h3><p class="juxing-desc">${group.desc}</p>`;
      items.forEach((it) => {
        html += `<div class="juxing-item">
          <div class="j-en">${it.en}</div>
          <div class="j-zh">${it.zh}</div>
          <button class="j-copy" data-en="${it.en.replace(/"/g, "&quot;")}">复制</button>
        </div>`;
      });
    });
    list.innerHTML = html || '<p style="color:var(--text-muted);font-size:14px">没有匹配的句式。</p>';
    if (count) count.textContent = total;
    list.querySelectorAll(".j-copy").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.en;
        if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
        const orig = btn.textContent;
        btn.textContent = "已复制";
        setTimeout(() => (btn.textContent = orig), 1200);
      });
    });
  }
  render();
}

/* ============ 批改历史 ============ */
function getEssayHistory() {
  return JSON.parse(localStorage.getItem("essayHistory") || "[]");
}

function saveEssayHistory(words, score, text) {
  const history = getEssayHistory();
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const preview = text.replace(/\s+/g, " ").slice(0, 40) + (text.length > 40 ? "…" : "");
  history.unshift({ date: dateStr, words, score, preview });
  if (history.length > 50) history.length = 50;
  localStorage.setItem("essayHistory", JSON.stringify(history));
}

function renderHistory() {
  const box = document.getElementById("history-list");
  if (!box) return;
  const history = getEssayHistory();
  if (!history.length) {
    box.innerHTML = '<p style="color:var(--text-muted);font-size:14px">暂无批改记录，快去写一篇吧。</p>';
    return;
  }
  box.innerHTML = history.map((h) => `
    <div class="history-item">
      <div class="h-score">${h.score}</div>
      <div class="h-info">
        <div class="h-meta">${h.date} · ${h.words} 词</div>
        <div class="h-preview">${h.preview}</div>
      </div>
    </div>`).join("");
}

/* ============ 打卡 & 勋章 ============ */
function getStreak() {
  return JSON.parse(localStorage.getItem("streak") || '{"count":0,"lastDate":null}');
}

function checkIn() {
  const streak = getStreak();
  const today = new Date().toDateString();
  if (streak.lastDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  streak.count = streak.lastDate === yesterday ? streak.count + 1 : 1;
  streak.lastDate = today;
  localStorage.setItem("streak", JSON.stringify(streak));
}

function renderStats() {
  const box = document.getElementById("stats-box");
  if (!box) return;
  const history = getEssayHistory();
  const streak = getStreak();
  const avg = history.length ? Math.round(history.reduce((s, h) => s + h.score, 0) / history.length) : 0;
  box.innerHTML = `
    <div class="stat-card"><b>🔥 ${streak.count}</b><span>连续打卡(天)</span></div>
    <div class="stat-card"><b>📝 ${history.length}</b><span>累计批改(篇)</span></div>
    <div class="stat-card"><b>📈 ${avg}</b><span>平均分</span></div>`;
}

function renderBadges() {
  const box = document.getElementById("badges-box");
  if (!box) return;
  const history = getEssayHistory();
  const streak = getStreak();
  const badges = [
    { name: "初试锋芒", desc: "完成首篇批改", got: history.length >= 1, icon: "🌱" },
    { name: "笔耕不辍", desc: "累计批改 10 篇", got: history.length >= 10, icon: "✍️" },
    { name: "妙笔生花", desc: "累计批改 30 篇", got: history.length >= 30, icon: "🌸" },
    { name: "三日之约", desc: "连续打卡 3 天", got: streak.count >= 3, icon: "🔥" },
    { name: "七日之约", desc: "连续打卡 7 天", got: streak.count >= 7, icon: "⚡" },
    { name: "三十日不辍", desc: "连续打卡 30 天", got: streak.count >= 30, icon: "👑" },
  ];
  box.innerHTML = badges.map((b) => `
    <div class="badge-card ${b.got ? "got" : ""}" title="${b.desc}">
      <div class="b-icon">${b.icon}</div>
      <div class="b-name">${b.name}</div>
      <div class="b-desc">${b.got ? b.desc : "未解锁"}</div>
    </div>`).join("");
}

/* ============ AI 批改（可配置，OpenAI 兼容接口） ============ */
const AI_PROVIDERS = {
  deepseek: { baseUrl: "https://api.deepseek.com", model: "deepseek-chat", name: "DeepSeek" },
  openai: { baseUrl: "https://api.openai.com/v1", model: "gpt-4o-mini", name: "OpenAI" },
  custom: { baseUrl: "", model: "", name: "自定义" },
};

function getAiConfig() {
  return JSON.parse(localStorage.getItem("aiConfig") || '{"provider":"deepseek","apiKey":"","model":"","baseUrl":""}');
}

function initAiGrade() {
  const btn = document.getElementById("ai-grade-btn");
  if (!btn) return;
  const textarea = document.getElementById("essay-input");
  const resultBox = document.getElementById("grade-result");
  const providerSel = document.getElementById("ai-provider");
  const keyInput = document.getElementById("ai-key");
  const modelInput = document.getElementById("ai-model");
  const baseInput = document.getElementById("ai-base");
  const saveBtn = document.getElementById("ai-save-btn");
  const toggleBtn = document.getElementById("ai-config-toggle");

  function loadConfig() {
    const cfg = getAiConfig();
    const p = AI_PROVIDERS[cfg.provider] || AI_PROVIDERS.custom;
    providerSel.value = cfg.provider;
    keyInput.value = cfg.apiKey;
    modelInput.value = cfg.model || p.model;
    baseInput.value = cfg.baseUrl || p.baseUrl;
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const panel = document.getElementById("ai-config-panel");
      panel.style.display = panel.style.display === "none" ? "block" : "none";
    });
  }

  if (providerSel) {
    providerSel.addEventListener("change", () => {
      const p = AI_PROVIDERS[providerSel.value];
      if (providerSel.value !== "custom") {
        modelInput.value = p.model;
        baseInput.value = p.baseUrl;
      }
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const cfg = {
        provider: providerSel.value,
        apiKey: keyInput.value.trim(),
        model: modelInput.value.trim(),
        baseUrl: baseInput.value.trim().replace(/\/+$/, ""),
      };
      localStorage.setItem("aiConfig", JSON.stringify(cfg));
      const orig = saveBtn.textContent;
      saveBtn.textContent = "已保存 ✓";
      setTimeout(() => (saveBtn.textContent = orig), 1500);
    });
  }

  btn.addEventListener("click", async () => {
    const text = textarea.value.trim();
    if (!text) {
      resultBox.innerHTML = '<div class="notice">请先输入或粘贴你的作文。</div>';
      return;
    }
    const cfg = getAiConfig();
    if (!cfg.apiKey) {
      resultBox.innerHTML = '<div class="notice">请先点击"AI 配置"，填入 API Key 并保存后再使用 AI 精批。</div>';
      return;
    }
    const base = cfg.baseUrl || AI_PROVIDERS[cfg.provider]?.baseUrl || "https://api.deepseek.com";
    const model = cfg.model || AI_PROVIDERS[cfg.provider]?.model || "deepseek-chat";

    resultBox.innerHTML = '<div class="tip">🤖 AI 批改中，请稍候（约 10–30 秒）……</div>';
    btn.disabled = true;
    btn.textContent = "批改中…";

    const systemPrompt = "你是考研英语作文阅卷专家，批改专业、具体、可操作，语气鼓励但专业。";
    const userPrompt = `请批改以下考研英语作文，严格按下列结构用中文输出：

【总体评价】一句话总评。
【预估分数】按大作文20分制（若明显是小作文则按10分制）给出分数区间并说明依据。
【内容与结构】点评是否切题、结构是否清晰（分点）。
【语言表达】指出语法/用词/拼写问题，并引用原文例句。
【亮点句子】摘录1-2句写得好的句子并说明好在哪里。
【改进建议】给出3条具体可操作的改进建议。
【润色示例】给出2-3句润色后的写法（中英对照）。

作文如下：
${text}`;

    try {
      const res = await fetch(`${base}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cfg.apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.6,
          stream: false,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`请求失败 (${res.status})：${errText.slice(0, 200)}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "未获取到批改结果";
      resultBox.innerHTML = `<div class="ai-head">🤖 AI 精批结果</div><div class="ai-result">${formatAiResult(reply)}</div>`;
    } catch (err) {
      resultBox.innerHTML = `<div class="notice">❌ AI 批改失败：${err.message}<br><br>可能原因：① API Key 无效或余额不足；② 服务商地址/模型名有误；③ 浏览器跨域（CORS）被拦截。如遇跨域问题，请使用附带的 <b>server.js</b> 后端代理（将 baseUrl 填为 http://localhost:3000）。</div>`;
    } finally {
      btn.disabled = false;
      btn.textContent = "🤖 AI 精批";
    }
  });

  loadConfig();
}

function formatAiResult(text) {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const withBreaks = escaped.replace(/\n/g, "<br>");
  return withBreaks.replace(/【([^】]+)】/g, '<strong style="color:var(--primary)">【$1】</strong>');
}

/* ============ 背诵闪卡（功能句 / 范文随机抽背） ============ */
function initFlash() {
  const card = document.getElementById("flash-card");
  if (!card) return;
  const modeSel = document.getElementById("flash-mode");
  const counter = document.getElementById("flash-counter");
  const tagEl = document.getElementById("flash-tag");
  const frontEl = document.getElementById("flash-front");
  const backEl = document.getElementById("flash-back");

  function buildDeck() {
    const deck = [];
    if (modeSel && modeSel.value === "juxing") {
      (typeof JUXING !== "undefined" ? JUXING : []).forEach((g) =>
        g.items.forEach((it) => deck.push({ tag: g.cat, front: it.zh, back: it.en }))
      );
    } else if (modeSel && modeSel.value === "word") {
      const all = [...(typeof VOCAB !== "undefined" ? VOCAB : []), ...(typeof VOCAB_EXTRA !== "undefined" ? VOCAB_EXTRA : [])];
      all.forEach((v) => deck.push({ tag: v.cat, front: v.zh, back: v.en }));
    } else {
      const big = [
        ...(typeof ZHENTI_FANWEN !== "undefined" ? ZHENTI_FANWEN : []),
        ...(typeof FANWEN_YING1_EXTRA !== "undefined" ? FANWEN_YING1_EXTRA : []),
        ...(typeof FANWEN_YING2_EXTRA !== "undefined" ? FANWEN_YING2_EXTRA : []),
        ...(typeof FANWEN_2026 !== "undefined" ? FANWEN_2026 : []),
      ];
      const small = [
        ...(typeof XIAOZUOWEN_FANWEN !== "undefined" ? XIAOZUOWEN_FANWEN : []),
        ...(typeof XIAOZUOWEN_2026 !== "undefined" ? XIAOZUOWEN_2026 : []),
      ];
      [...big, ...small].forEach((f) =>
        deck.push({ tag: f.year + " " + f.exam + " · " + f.type, front: f.year + " " + f.exam + "｜" + f.topic, back: f.fanwen })
      );
    }
    return deck;
  }

  let deck = buildDeck();
  let idx = 0;
  let flipped = false;

  function show() {
    if (!deck.length) { frontEl.textContent = "暂无卡片"; return; }
    const c = deck[idx];
    tagEl.textContent = c.tag;
    frontEl.textContent = c.front;
    backEl.textContent = c.back;
    frontEl.style.display = flipped ? "none" : "block";
    backEl.style.display = flipped ? "block" : "none";
    counter.textContent = idx + 1 + " / " + deck.length;
  }
  function go(delta) { idx = (idx + delta + deck.length) % deck.length; flipped = false; show(); }
  function randomCard() { idx = Math.floor(Math.random() * deck.length); flipped = false; show(); }

  const bRandom = document.getElementById("flash-random");
  const bPrev = document.getElementById("flash-prev");
  const bNext = document.getElementById("flash-next");
  if (bRandom) bRandom.addEventListener("click", randomCard);
  if (bPrev) bPrev.addEventListener("click", () => go(-1));
  if (bNext) bNext.addEventListener("click", () => go(1));
  card.addEventListener("click", () => { flipped = !flipped; show(); });
  if (modeSel) modeSel.addEventListener("change", () => { deck = buildDeck(); idx = 0; flipped = false; show(); });
  show();
}

/* ============ 考场计时器 ============ */
function initTimer() {
  const disp = document.getElementById("timer-display");
  if (!disp) return;
  const startBtn = document.getElementById("timer-start");
  const resetBtn = document.getElementById("timer-reset");
  const presets = document.querySelectorAll("[data-min]");
  let total = 25 * 60;
  let remain = total;
  let timer = null;
  let running = false;

  function fmt(s) {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return String(m).padStart(2, "0") + ":" + String(ss).padStart(2, "0");
  }
  function render() {
    disp.textContent = fmt(remain);
    if (remain <= 60) disp.classList.add("low"); else disp.classList.remove("low");
  }
  function stop() { clearInterval(timer); running = false; if (startBtn) startBtn.textContent = "▶ 开始"; }
  function tick() {
    remain--;
    if (remain <= 0) { remain = 0; render(); stop(); alert("⏰ 时间到！"); return; }
    render();
  }
  if (startBtn) startBtn.addEventListener("click", () => {
    if (running) { stop(); return; }
    running = true; startBtn.textContent = "⏸ 暂停";
    timer = setInterval(tick, 1000);
  });
  if (resetBtn) resetBtn.addEventListener("click", () => { stop(); remain = total; render(); });
  presets.forEach((p) => p.addEventListener("click", () => {
    stop();
    total = parseInt(p.dataset.min, 10) * 60;
    remain = total;
    render();
    presets.forEach((x) => x.classList.remove("active"));
    p.classList.add("active");
  }));
  render();
}
