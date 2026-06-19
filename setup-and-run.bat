@echo off
title Good Boy Supply - Setup
echo ============================================
echo  Good Boy Supply Co. - Project Setup
echo ============================================
echo.

cd /d "D:\Coding\Good Boy Supply\Website"

echo [1/3] Fixing PowerShell execution policy...
powershell -NoProfile -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"
echo Done.
echo.

echo [2/3] Installing dependencies (this may take a minute)...
call npm install
echo.

echo [3/3] Starting dev server...
echo  Site will be at: http://localhost:3000
echo  Press Ctrl+C to stop the server.
echo.
call npm run dev
