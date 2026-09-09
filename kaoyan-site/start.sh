#!/bin/bash
# ============================================================
#  Ethan英语 · 一键启动（Mac / Linux）
#  用法：终端执行  bash start.sh
# ============================================================
cd "$(dirname "$0")"

# 可选：取消注释并填入你的 AI Key，启用「AI 精批」
# export AI_API_KEY=sk-你的Key
# export AI_BASE_URL=https://api.deepseek.com
# export AI_MODEL=deepseek-chat

if ! command -v node >/dev/null 2>&1; then
  echo "❌ 未检测到 Node.js，请先安装 Node.js 18+：https://nodejs.org/"
  exit 1
fi

echo "正在启动Ethan英语网站（按 Ctrl+C 停止）..."
echo ""
echo "若手机打不开，请检查："
echo "  1. macOS「系统设置 → 网络 → 防火墙」是否拦截了 node"
echo "  2. 手机与电脑是否连接同一 WiFi"
echo ""
node server.js
