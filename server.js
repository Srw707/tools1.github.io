const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json({ limit: '10mb' })); // لاستقبال البيانات الكبيرة

// استلام الصورة من الطلب
app.post('/upload', (req, res) => {
    const imgData = req.body.image.replace(/^data:image\/png;base64,/, ""); // إزالة الجزء الأول من Base64
    const fileName = `image-${Date.now()}.png`; // اسم فريد للصورة
    fs.writeFile(`uploads/${fileName}`, imgData, 'base64', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "فشل في تحميل الصورة" });
        }
        res.json({ message: "تم تحميل الصورة بنجاح", fileName });
    });
});

// بدء الخادم
app.listen(3000, () => {
    console.log("الخادم يعمل على http://localhost:3000/uploads");
});
