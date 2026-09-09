// ============================================================
//  Ethan英语 · AI 批改后端代理（Node.js）
//  作用：隐藏 API Key、规避浏览器跨域（CORS）限制
//
//  使用方法：
//    1. 设置环境变量（二选一）：
//       export AI_API_KEY=sk-xxx                 # DeepSeek/OpenAI 的 Key
//       export AI_BASE_URL=https://api.deepseek.com   # 可选，默认 DeepSeek
//       export AI_MODEL=deepseek-chat                 # 可选，默认 deepseek-chat
//    2. 启动：  node server.js
//    3. 浏览器打开 http://localhost:3000
//    4. 在网站「AI 配置」中：Base URL 填 http://localhost:3000，API Key 留空
//       （Key 由服务端注入，前端不再保存、不再暴露）
//
//  要求：Node.js 18+（内置全局 fetch）
// ============================================================

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = process.env.PORT || 3000;
const AI_API_KEY = process.env.AI_API_KEY || "";
const AI_BASE_URL = (process.env.AI_BASE_URL || "https://api.deepseek.com").replace(/\/+$/, "");
const AI_MODEL = process.env.AI_MODEL || "deepseek-chat";
const ROOT = __dirname; // 网站根目录（server.js 所在目录）

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".md": "text/plain; charset=utf-8",
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 获取本机真实局域网 IPv4 地址（过滤虚拟网卡与链路本地地址）
function getLanIPs() {
  const results = [];
  const nets = os.networkInterfaces();
  // 虚拟网卡/非物理网卡关键字（这些网卡的 IP 手机连不上）
  const virtualRe = /vmware|virtual|vbox|docker|vethernet|loopback|tap|tun|vpn|wsl|hyper-v|bluetooth|bridge|pseudo|本地连接\*|蓝牙/i;
  for (const name of Object.keys(nets)) {
    if (virtualRe.test(name)) continue;
    for (const net of nets[name] || []) {
      if (net.family !== "IPv4" || net.internal) continue;
      // 排除链路本地地址（169.254.x.x，APIPA 自动分配，无法用于局域网通信）
      if (net.address.startsWith("169.254.")) continue;
      results.push({ name, address: net.address });
    }
  }
  return results;
}

// 判断是否为常见局域网私有网段（优先推荐给手机访问）
function isPreferredIP(ip) {
  return /^192\.168\./.test(ip) || /^10\./.test(ip) || /^172\.(1[6-9]|2\d|3[01])\./.test(ip);
}

function json(res, status, obj) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", ...CORS });
  res.end(JSON.stringify(obj));
}

// 静态文件服务
function serveStatic(pathname, res) {
  let rel = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  let filePath = path.join(ROOT, rel);
  // 防止目录穿越
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("404 Not Found");
    }
    const ext = path.extname(filePath).toLowerCase();
    const headers = { "Content-Type": MIME[ext] || "application/octet-stream" };
    // Service Worker 与 manifest 不缓存，确保更新及时生效
    if (rel === "sw.js" || rel === "manifest.json") {
      headers["Cache-Control"] = "no-cache";
    }
    res.writeHead(200, headers);
    res.end(data);
  });
}

// AI 批改代理：转发到真实 LLM，注入服务端 Key
function handleGradeProxy(req, res) {
  if (!AI_API_KEY) {
    return json(res, 500, { error: "服务端未配置 AI_API_KEY 环境变量" });
  }
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const payload = JSON.parse(body);
      const finalPayload = { ...payload, model: AI_MODEL || payload.model };
      const upstream = await fetch(`${AI_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify(finalPayload),
      });
      const data = await upstream.text();
      res.writeHead(upstream.status, { "Content-Type": "application/json; charset=utf-8", ...CORS });
      res.end(data);
    } catch (err) {
      json(res, 500, { error: "请求上游 AI 失败：" + err.message });
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS);
    return res.end();
  }
  const pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);

  if (pathname === "/chat/completions" && req.method === "POST") {
    return handleGradeProxy(req, res);
  }
  return serveStatic(pathname, res);
});

if (typeof fetch !== "function") {
  console.error("❌ 当前 Node.js 版本过低，缺少全局 fetch，请升级到 Node.js 18+ 后重试。");
  process.exit(1);
}

// 端口冲突等启动错误提示（替代难懂的堆栈信息）
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error("❌ 端口 " + PORT + " 已被占用！");
    console.error("   可能已有另一个Ethan英语服务在运行，或端口被其他程序占用。");
    console.error("   解决：① 关闭之前启动的窗口后重试；");
    console.error("         ② 换端口启动：PORT=3001 node server.js");
  } else {
    console.error("❌ 服务器启动失败：" + err.message);
  }
  process.exit(1);
});

server.listen(PORT, "0.0.0.0", () => {
  const lanIPs = getLanIPs();
  const preferred = lanIPs.filter((i) => isPreferredIP(i.address));
  const others = lanIPs.filter((i) => !isPreferredIP(i.address));
  const allIPs = [...preferred, ...others];

  console.log("==============================================");
  console.log("  Ethan英语 · 已启动（监听 0.0.0.0:" + PORT + "）");
  console.log("");
  console.log("  📱 手机访问地址（手机需与电脑连同一 WiFi）：");
  if (allIPs.length) {
    allIPs.forEach((ip, idx) => {
      const mark = isPreferredIP(ip.address) ? "  ★推荐" : "";
      console.log("     [" + (idx + 1) + "] http://" + ip.address + ":" + PORT + "   (" + ip.name + ")" + mark);
    });
    console.log("      ↑ 逐个尝试，★推荐的一般可直接用");
  } else {
    console.log("     ❌ 未检测到可用局域网 IP，可能原因：");
    console.log("        · 电脑未连接 WiFi / 网卡未正确获取 IP");
    console.log("        · 仅检测到虚拟网卡或链路本地地址(169.254.x.x)");
  }
  console.log("");
  console.log("  💻 电脑本机访问：http://localhost:" + PORT);
  console.log("");
  console.log("  AI 接口  : " + AI_BASE_URL);
  console.log("  模型     : " + AI_MODEL);
  console.log("  API Key  : " + (AI_API_KEY ? "已配置 ✓" : "未配置 ✗（AI 精批需先设置）"));
  console.log("----------------------------------------------");
  console.log("  🔍 手机打不开？按顺序排查：");
  console.log("   1. 手机和电脑是否连了【同一个】WiFi（手机别用流量）");
  console.log("   2. Windows 防火墙是否拦截 → 双击 start.bat 会自动放行，");
  console.log("      或管理员手动执行：");
  console.log("      netsh advfirewall firewall add rule name=\"Ethan英语\" dir=in action=allow protocol=TCP localport=" + PORT);
  console.log("   3. 路由器是否开了「AP隔离/客户端隔离」→ 登录路由器关闭");
  console.log("   4. 手机是否开了代理/VPN → 关闭后重试");
  console.log("==============================================");
});
