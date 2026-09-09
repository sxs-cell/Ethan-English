@echo off
chcp 65001 >nul
title Ethan英语 · 手机访问服务器
cd /d "%~dp0"

rem 可选：取消注释并填入你的 AI Key，启用「AI 精批」
rem set AI_API_KEY=sk-你的Key
rem set AI_BASE_URL=https://api.deepseek.com
rem set AI_MODEL=deepseek-chat

where node >nul 2>nul
if %errorlevel% neq 0 (
  echo [错误] 未检测到 Node.js，请先到 https://nodejs.org/ 安装 Node.js 18+
  pause
  exit /b 1
)

echo.
echo [1/2] 正在放行 Windows 防火墙端口 3000（如失败请以管理员身份重试）...
netsh advfirewall firewall delete rule name="Ethan英语" >nul 2>nul
netsh advfirewall firewall add rule name="Ethan英语" dir=in action=allow protocol=TCP localport=3000 >nul 2>nul
if %errorlevel% equ 0 (
    echo       防火墙已放行 ✓
) else (
    echo       防火墙放行失败（可能缺少管理员权限）。稍后可右键"以管理员身份运行"本脚本重试。
)

echo.
echo [2/2] 正在启动网站（关闭本窗口即停止服务）...
echo 启动后，请用手机浏览器打开窗口中「手机访问地址」里 ★推荐 的那一条。
echo.
node server.js
pause
