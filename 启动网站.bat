@echo off
chcp 936 >nul
cd /d "%~dp0"

REM 写日志方便排查
set "LOG=%~dp0launcher.log"
echo [%date% %time%] launcher started > "%LOG%"

title Lvsi个人网站 - 开发服务器

echo ==========================================
echo   Lvsi - 个人网站启动器
echo ==========================================
echo.

REM 优先使用系统 PATH 中的 node，否则回退到 WorkBuddy 管理的 node
where node >nul 2>nul
if %errorlevel%==0 (
    set "NPM=npm"
    echo [%date% %time%] using system node >> "%LOG%"
) else (
    set "NPM=C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2\npm.cmd"
    echo [%date% %time%] using workbuddy node >> "%LOG%"
)

REM 检查依赖是否已安装
if not exist "node_modules\" (
    echo [1/3] 首次运行，正在安装依赖...
    echo [%date% %time%] installing deps >> "%LOG%"
    call %NPM% install
    if errorlevel 1 (
        echo.
        echo 依赖安装失败，请检查网络后重试。
        echo [%date% %time%] npm install FAILED >> "%LOG%"
        pause
        exit /b 1
    )
) else (
    echo [1/3] 依赖已就绪
    echo [%date% %time%] node_modules exists >> "%LOG%"
)

echo [2/3] 正在启动开发服务器...
echo.
echo     网站地址: http://localhost:3001
echo     按 Ctrl+C 可随时停止服务
echo.

REM 3 秒后自动打开浏览器（不阻塞服务器启动）
start "" /min cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3001"

echo [3/3] 服务运行中，请勿关闭本窗口
echo ==========================================
echo.
echo [%date% %time%] starting vite >> "%LOG%"

call %NPM% run dev -- --port 3001

echo [%date% %time%] vite exited with %errorlevel% >> "%LOG%"
pause
