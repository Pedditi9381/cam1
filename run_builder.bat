@echo off
title Blender AI Scene Builder Server
echo Starting Blender AI Scene Builder backend...
echo Using Blender 5.1 Embedded Python: "C:\Program Files\Blender Foundation\Blender 5.1\5.1\python\bin\python.exe"
echo.

"C:\Program Files\Blender Foundation\Blender 5.1\5.1\python\bin\python.exe" "blender_scene_builder\app.py"

if %errorlevel% neq 0 (
    echo.
    echo Server crashed or failed to start.
    echo Press any key to exit...
    pause > nul
)
