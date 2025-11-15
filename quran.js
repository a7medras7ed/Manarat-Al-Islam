/* ======================= quran.js - متوافق 100% مع GitHub Pages ======================= */

const surahList = document.getElementById("surah-list");
const ayahBox = document.getElementById("ayah-box");
const search = document.getElementById("q-search");

/* ============= 1) جلب قائمة السور من API يعمل دائمًا ============= */
fetch("https://api.quran.gading.dev/surah")
  .then(r => r.json())
  .then(data => {
    surahList.innerHTML = "";
    data.data.forEach(s => {
      let item = document.createElement("div");
      item.className = "surah-item";
      item.innerText = `${s.number} - ${s.name.long}`;
      item.onclick = () => loadSurah(s.number);
      surahList.appendChild(item);
    });
  });

/* ============= 2) جلب آيات السورة بدون مشاكل CORS ============= */
function loadSurah(num) {
  fetch(`https://api.quran.gading.dev/surah/${num}`)
    .then(r => r.json())
    .then(data => {
      ayahBox.innerHTML = "";
      data.data.verses.forEach(a => {
        ayahBox.innerHTML += `
          <p class="ayah-line">
            <span class="ayah-number">${a.number.inSurah}</span>
            ${a.text.ar}
          </p>
        `;
      });
    });
}

/* ============= 3) البحث داخل القرآن بالكامل ============= */
search.oninput = function () {
  let q = this.value.trim();
  if (q.length < 2) return;

  fetch(`https://api.quran.gading.dev/search?q=${q}`)
    .then(r => r.json())
    .then(data => {
      ayahBox.innerHTML = "";

      if (!data.data || data.data.count === 0) {
        ayahBox.innerHTML = "<p>لا توجد نتائج.</p>";
        return;
      }

      data.data.matches.forEach(m => {
        ayahBox.innerHTML += `
          <p class="ayah-line">${m.text}</p>
        `;
      });
    });
};
