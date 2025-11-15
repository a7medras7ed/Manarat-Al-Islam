/* ======================= main.js - نظام مواقيت الصلاة ووضع الليل ======================= */

// جلب مواقيت الصلاة باستخدام API
fetch("https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5")
  .then(res => res.json())
  .then(data => {
    const t = data.data.timings;
    const box = document.getElementById("prayer-times");

    box.innerHTML = `
      <div class='prayer-item'>الفجر: ${t.Fajr}</div>
      <div class='prayer-item'>الظهر: ${t.Dhuhr}</div>
      <div class='prayer-item'>العصر: ${t.Asr}</div>
      <div class='prayer-item'>المغرب: ${t.Maghrib}</div>
      <div class='prayer-item'>العشاء: ${t.Isha}</div>
    `;
  });

/* ======================= وضع الليل ======================= */
const toggleBtn = document.createElement('button');
toggleBtn.innerText = '🌙 وضع الليل';
toggleBtn.style.position = 'fixed';
toggleBtn.style.bottom = '20px';
toggleBtn.style.left = '20px';
toggleBtn.style.zIndex = '999';
toggleBtn.style.padding = '10px 20px';
toggleBtn.style.border = 'none';
toggleBtn.style.background = '#0f5f4a';
toggleBtn.style.color = 'white';
toggleBtn.style.borderRadius = '8px';
toggleBtn.style.cursor = 'pointer';
document.body.appendChild(toggleBtn);

let dark = false;

// تبديل وضع الليل
function applyDarkMode(state) {
  if (state) {
    document.body.classList.add('dark-mode');
    toggleBtn.innerText = '☀ وضع النهار';
  } else {
    document.body.classList.remove('dark-mode');
    toggleBtn.innerText = '🌙 وضع الليل';
  }
}

toggleBtn.onclick = () => {
  dark = !dark;
  localStorage.setItem('darkMode', dark);
  applyDarkMode(dark);
};

// استعادة آخر وضع
if (localStorage.getItem('darkMode') === 'true') {
  dark = true;
  applyDarkMode(true);
}