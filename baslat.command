#!/bin/bash
cd "$(dirname "$0")"
echo "========================================="
echo "IELTS Kelime Rehberi Başlatılıyor..."
echo "========================================="
echo "Kütüphaneler kontrol ediliyor..."
npm install
echo "Tarayıcı açılıyor..."
sleep 3 && open "http://localhost:5173" &
echo "Sunucu çalıştırılıyor... (Kapatmak için bu pencereyi kapatabilirsiniz)"
npm run dev
