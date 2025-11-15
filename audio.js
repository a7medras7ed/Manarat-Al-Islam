/* ======================= audio.js - مكتبة تلاوات تعمل على GitHub Pages ======================= */

const readersList = document.getElementById('readers-list');
const audioPlayer = document.getElementById('audio-player');
const searchReader = document.getElementById('reader-search');

/* ========== روابط HTTPS متوافقة مع GitHub Pages 100% ========== */
const readers = [
  { name: "عبد الباسط عبد الصمد", surah1: "https://cdn.islamic.network/quran/audio/128/1/abdulbasitmurattal.mp3" },
  { name: "المنشاوي", surah1: "https://cdn.islamic.network/quran/audio/128/1/minshawi.mp3" },
  { name: "الحصري", surah1: "https://cdn.islamic.network/quran/audio/128/1/husary.mp3" },
  { name: "ماهر المعيقلي", surah1: "https://cdn.islamic.network/quran/audio/128/1/maher.mp3" },
  { name: "فارس عباد", surah1: "https://cdn.islamic.network/quran/audio/128/1/fares.mp3" }
];

let playlist = [];
let index = 0;

/* ======================= عرض القرّاء ======================= */
function displayReaders(list) {
  readersList.innerHTML = '';
  list.forEach(reader => {
    const div = document.createElement('div');
    div.className = 'reader-item';
    div.innerText = reader.name;
    div.onclick = () => loadReader(reader);
    readersList.appendChild(div);
  });
}

displayReaders(readers);

/* ======================= تحميل تلاوة القارئ ======================= */
function loadReader(reader) {
  playlist = [reader.surah1];
  index = 0;
  playTrack();
}

/* ======================= تشغيل التلاوات ======================= */
function playTrack() {
  audioPlayer.src = playlist[index];
  audioPlayer.play();
}

function nextTrack() {
  index = (index + 1) % playlist.length;
  playTrack();
}

function prevTrack() {
  index = (index - 1 + playlist.length) % playlist.length;
  playTrack();
}

/* ======================= البحث عن قارئ ======================= */
searchReader.oninput = function () {
  const q = this.value.trim();
  const filtered = readers.filter(r => r.name.includes(q));
  displayReaders(filtered);
};
