@echo off
title RJSC Corporate Automation Suite - CA Articled Students Edition
color 0b

echo ===============================================================================
echo            RJSC CORPORATE AUTOMATION & AUDIT SUITE (FIRM OS)
echo               Designed for CA Articled Students & Interns
echo ===============================================================================
echo.
echo [1/3] Checking environment...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH!
    echo Please install Python 3.10+ from python.org and check 'Add to PATH'.
    pause
    exit /b
)

echo [2/3] Starting Local Backend Engine on Port 8888...
start /min "RJSC Engine" cmd /c "python -m uvicorn app:app --host 127.0.0.1 --port 8888"

echo [3/3] Waiting for engine to initialize...
timeout /t 3 >nul

echo.
echo Opening Application in your default browser...
start http://localhost:8888/

echo ===============================================================================
echo [SUCCESS] RJSC Automation Suite is running!
echo URL: http://localhost:8888/
echo.
echo Keep this window open while working. Close it when you are done.
echo ===============================================================================
pause
