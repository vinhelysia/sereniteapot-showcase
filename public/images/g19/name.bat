@echo off
setlocal enabledelayedexpansion

echo Starting file renaming process...
echo.

set /a counter=1

for %%f in (*.jpg *.png) do (
    set "extension=%%~xf"
    ren "%%f" "!counter!!extension!"
    echo Renamed "%%f" to "!counter!!extension!"
    set /a counter+=1
)

echo.
echo Renaming complete! Processed %counter% files.
pause