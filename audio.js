/* ======================= audio.js - مكتبة التلاوات ======================= */

// عناصر الواجهة
const readersList = document.getElementById('readers-list');
const audioPlayer = document.getElementById('audio-player');
const searchReader = document.getElementById('reader-search');

/* ======================= قائمة القراء (HTTPS تعمل 100%) ======================= */
const readers = [
  { name: "عبد الباسط عبد الصمد", surah1: "https://server6.mp3quran.net/basit_mjwd/001.mp3" },
  { name: "المنشاوي", surah1: "https://server8.mp3quran.net/minsh/001.mp3" },
  { name: "الحصري", surah1: "https://server10.mp3quran.net/husary/001.mp3" },
  { name: "ماهر المعيقلي", surah1: "https://server12.mp3quran.net/maher/001.mp3" },
  { name: "فارس عباد", surah1: "https://server11.mp3quran.net/abdelabadr/001.mp3" }
];

let playlist = [];
let index = 0;

/* ======================= عرض القراء ======================= */
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

/* ======================= تحميل تلاوات القارئ ======================= */
function loadReader(reader) {
  playlist = [reader.surah1];
  index = 0;
  playTrack();
}

/* ======================= مشغل الصوت ======================= */
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
