/* ======================= quran.js - عرض السور + عرض الآيات ======================= */

const surahList = document.getElementById("surah-list");
const ayahBox = document.getElementById("ayah-box");
const search = document.getElementById("q-search");

/* ======================= 1) جلب قائمة السور ======================= */
fetch("https://api.alquran.cloud/v1/surah")
  .then(r => r.json())
  .then(data => {
    surahList.innerHTML = "";
    data.data.forEach(s => {
      let item = document.createElement("div");
      item.className = "surah-item";
      item.innerText = `${s.number} - ${s.name}`;
      item.onclick = () => loadSurah(s.number);
      surahList.appendChild(item);
    });
  });

/* ======================= 2) جلب آيات سورة ======================= */
function loadSurah(num) {
  fetch(`https://api.alquran.cloud/v1/surah/${num}`)
    .then(r => r.json())
    .then(data => {
      ayahBox.innerHTML = "";
      data.data.ayahs.forEach(a => {
        ayahBox.innerHTML += `
          <p class="ayah-line">
            <span class="ayah-number">${a.numberInSurah}</span>
            ${a.text}
          </p>
        `;
      });
      localStorage.setItem("lastSurah", num);
    });
}

/* ======================= 3) البحث داخل القرآن ======================= */
search.oninput = function () {
  let q = this.value.trim();
  if (q.length < 2) return;

  fetch(`https://api.alquran.cloud/v1/search/${q}/all/ar`)
    .then(r => r.json())
    .then(data => {
      ayahBox.innerHTML = "";

      if (!data.data || data.data.count === 0) {
        ayahBox.innerHTML = "<p>لا توجد نتائج.</p>";
        return;
      }

      data.data.matches.forEach(m => {
        ayahBox.innerHTML += `<p class="ayah-line">${m.text}</p>`;
      });
    });
};
