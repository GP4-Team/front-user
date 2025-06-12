@echo off
echo تنظيف cache وإعادة تشغيل المشروع...

echo مسح node_modules cache...
if exist "node_modules\.cache" (
    rmdir /s /q "node_modules\.cache"
    echo تم مسح cache بنجاح
) else (
    echo لا يوجد cache للمسح
)

echo إعادة تشغيل الخادم...
npm start

pause