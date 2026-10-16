@echo off
title Installing Dependencies for RJSC Suite...
color 0e
echo ===============================================================================
echo            INSTALLING REQUIRED LIBRARIES FOR RJSC SUITE
echo ===============================================================================
echo.
echo Installing Python packages from requirements.txt...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Installation failed! Please check your internet connection or Python setup.
    pause
    exit /b
)

echo.
echo ===============================================================================
echo [SUCCESS] All libraries installed successfully!
echo You can now run 'RJSC_SUITE_LAUNCHER.bat' to start the application.
echo ===============================================================================
pause
