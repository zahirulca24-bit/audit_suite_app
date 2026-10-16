@echo off
title RJSC Corporate Desktop - Electron Edition
color 0b

echo ===============================================================================
echo            STARTING NATIVE ELECTRON WINDOWS DESKTOP APP
echo ===============================================================================
echo.
echo [1/2] Checking updates from GitHub...
python updater.py

echo [2/2] Launching Electron Desktop Window...
npm start
