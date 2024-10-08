const express = require('express');
const path = require('path'); // เพิ่มการ import path
const app = express();

// ใช้ express.static เพื่อให้บริการไฟล์สาธารณะ
app.use(express.static('public'));

// เปลี่ยนเส้นทางให้เรียกหน้า Page_Home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Page_Home.html'));
});

// ส่วนที่เหลือของโค้ดยังคงเหมือนเดิม
const englishDictionary = require('./dictionary.json');

function onPrintWord(req, res) {
  const routeParams = req.params;
  const word = routeParams.word;

  const key = word.toLowerCase();
  const definition = englishDictionary[key];

  res.send(`The definition of ${word} is ${definition}`);
}
app.get('/print/:word', onPrintWord);

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
