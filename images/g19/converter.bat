@echo off
setlocal enabledelayedexpansion
set count=0
set total=0

:: Count all image files to convert
for %%f in (*.png *.jpg) do (
    set /a total+=1
)

echo Found %total% image files to convert.

:: Convert PNG and JPG files to WebP
for %%f in (*.png *.jpg) do (
    set /a count+=1
    echo Converting !count! of %total%: %%f
    cwebp -q 80 "%%f" -o "%%~nf.webp"
)

echo All %total% files converted!
pause