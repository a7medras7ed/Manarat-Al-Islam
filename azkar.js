/* ======================= azkar.js - أذكار الصباح والمساء + العداد ======================= */

// عناصر الواجهة
const azkarContainer = document.getElementById('azkar-container');

/* ======================= 1) أذكار الصباح ======================= */
const azkarSabah = [
  "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له...",
  "اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور",
  "رضيت بالله ربًا وبالإسلام دينًا وبمحمد ﷺ نبيًا",
  "اللهم إني أصبحت أشهدك وأشهد حملة عرشك وملائكتك..."
];

/* ======================= 2) أذكار المساء ======================= */
const azkarMasa = [
  "أمسينا وأمسى الملك لله، والحمد لله...",
  "اللهم بك أمسينا وبك أصبحنا وبك نحيا وبك نموت وإليك المصير",
  "رضيت بالله ربًا وبالإسلام دينًا وبمحمد ﷺ نبيًا",
  "اللهم أنت ربي، لا إله إلا أنت، خلقتني وأنا عبدك..."
];

/* ======================= 3) تحميل الأذكار حسب النوع ======================= */
function loadAzkar(type) {
  azkarContainer.innerHTML = '';
  const list = type === 'sabah' ? azkarSabah : azkarMasa;

  list.forEach((zekr, index) => {
    const box = document.createElement('div');
    box.className = 'live-box';

    let count = 1; // قابل للتعديل لكل ذكر

    box.innerHTML = `
      <p class="zekr-text">${zekr}</p>
      <button class="count-btn" id="btn-${index}">تكرار (${count})</button>
    `;

    const btn = box.querySelector(`#btn-${index}`);

    btn.onclick = () => {
      if (count > 1) {
        count--;
        btn.innerText = `تكرار (${count})`;
      } else {
        btn.innerText = "✔ تم";
        btn.disabled = true;
        btn.style.background = '#4caf50';
      }
    };

    azkarContainer.appendChild(box);
  });
}

/* ======================= وضع افتراضي (أذكار الصباح) ======================= */
loadAzkar('sabah');