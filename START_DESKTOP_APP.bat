@echo off
title RJSC Corporate Desktop Suite
color 0a

echo ===============================================================================
echo            STARTING 100%% NATIVE LOCAL DESKTOP APP (NO BROWSER)
echo ===============================================================================
echo.
echo [1/2] Checking updates from GitHub...
python updater.py

echo [2/2] Launching Native Desktop Window...
start "" pythonw desktop_app.py
exit
