async function onSearch(event) {
  event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ
  const input = document.querySelector('#word-input'); // ค้นหา input field
  const word = input.value.trim(); // รับค่าจาก input และตัดช่องว่าง
  const result = await fetch('/print/' + word); // ส่งคำค้นหาไปยังเซิร์ฟเวอร์
  const text = await result.text(); // รอรับผลลัพธ์จากเซิร์ฟเวอร์

  const results = document.querySelector('#results'); // ค้นหา div ที่จะแสดงผลลัพธ์
  results.textContent = text; // แสดงผลลัพธ์
}

const form = document.querySelector('#search'); // ค้นหาฟอร์ม
form.addEventListener('submit', onSearch); // เพิ่ม event listener สำหรับการส่งฟอร์ม
