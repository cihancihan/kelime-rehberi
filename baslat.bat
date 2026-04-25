@echo off
echo =========================================
echo IELTS Kelime Rehberi Baslatiliyor...
echo =========================================
echo Kutuphaneler kontrol ediliyor...
call npm install
echo Tarayici aciliyor...
start http://localhost:5173
echo Sunucu calistiriliyor... (Kapatmak icin bu pencereyi kapatabilirsiniz)
call npm run dev
pause
