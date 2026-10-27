/* ====================================================================
   SINAU — Promo Video Timeline Engine
   Mengatur urutan scene, subtitle voice-over, partikel, dan progres.
   Total durasi ~75 detik (dalam rentang 60–90 dtk).
   ==================================================================== */

// ---- Timeline scene: [sceneNumber, startSec, endSec] ----
const TIMELINE = [
  { scene: 1, start: 0,   end: 11 },
  { scene: 2, start: 11,  end: 17 },
  { scene: 3, start: 17,  end: 27 },
  { scene: 4, start: 27,  end: 39 },
  { scene: 5, start: 39,  end: 53 },
  { scene: 6, start: 53,  end: 63 },
  { scene: 7, start: 63,  end: 75 },
];
const TOTAL = 75; // detik

// ---- Subtitle voice-over (Bahasa Indonesia) ----
// [start, end, teks]
const SUBS = [
  [1,   5,  "Tugas menumpuk. Materi berserakan. Waktu terus berlari…"],
  [5,   10, "Belajar seharusnya memberdayakan — bukan membuat lelah."],
  [11,  16, "Bagaimana jika belajar bisa jauh lebih mudah?"],
  [18,  26, "Perkenalkan SINAU — platform belajar digital yang siap menambah ilmumu."],
  [28,  38, "Satu platform modern untuk semua kebutuhan belajarmu, langsung dari browser."],
  [40,  44, "Materi kuliah tersusun rapi dalam satu tempat."],
  [44,  48, "Belajar interaktif dengan kuis yang membuatmu cepat paham."],
  [48,  52, "Pantau progres dan belajar bareng komunitas."],
  [54,  62, "Belajar lebih cerdas, kapan saja, di mana saja — gratis untuk mulai."],
  [64,  70, "SINAU — Siap Nambah Ilmu."],
  [70,  75, "Kunjungi sinauproject.vercel.app dan mulai perjalanan belajarmu hari ini."],
];

const scenes   = [...document.querySelectorAll(".scene")];
const subtitle = document.getElementById("subtitle");
const progress = document.getElementById("progress");
const timeEl   = document.getElementById("time");
const replay   = document.getElementById("replay");

let startTs = null;
let raf = null;
const countedNums = new WeakSet();

/* ---------- Floating gold particles ---------- */
(function particles(){
  const host = document.getElementById("particles");
  const N = 28;
  for(let i=0;i<N;i++){
    const p = document.createElement("span");
    p.className = "p";
    const size = 2 + Math.random()*4;
    p.style.width = p.style.height = size+"px";
    p.style.left = (Math.random()*100)+"%";
    p.style.top  = (60+Math.random()*40)+"%";
    p.style.animationDuration = (5+Math.random()*7)+"s";
    p.style.animationDelay = (-Math.random()*8)+"s";
    host.appendChild(p);
  }
})();

/* ---------- Twinkling stars for scene 1 ---------- */
(function stars(){
  const host = document.getElementById("s1stars");
  for(let i=0;i<50;i++){
    const s = document.createElement("i");
    s.style.left = Math.random()*100+"%";
    s.style.top  = Math.random()*100+"%";
    s.style.animationDelay = (-Math.random()*3)+"s";
    host.appendChild(s);
  }
})();

/* ---------- Count-up numbers (scene 6) ---------- */
function animateCount(el){
  if(countedNums.has(el)) return;
  countedNums.add(el);
  const to = +el.dataset.to;
  const dur = 1400;
  const t0 = performance.now();
  (function step(now){
    const k = Math.min((now-t0)/dur, 1);
    const eased = 1-Math.pow(1-k,3);
    el.textContent = Math.round(to*eased);
    if(k<1) requestAnimationFrame(step);
    else el.textContent = to;
  })(t0);
}

/* ---------- Main loop ---------- */
function frame(now){
  if(startTs === null) startTs = now;
  let t = (now - startTs)/1000;

  if(t >= TOTAL){ t = TOTAL; render(t); cancelAnimationFrame(raf); return; }
  render(t);
  raf = requestAnimationFrame(frame);
}

function render(t){
  // scenes
  const active = TIMELINE.find(s => t >= s.start && t < s.end) || TIMELINE[TIMELINE.length-1];
  scenes.forEach(sec=>{
    const n = +sec.dataset.scene;
    const on = n === active.scene;
    if(on && !sec.classList.contains("is-active")){
      sec.classList.add("is-active");
      if(n===6) sec.querySelectorAll(".num").forEach(animateCount);
    } else if(!on && sec.classList.contains("is-active")){
      sec.classList.remove("is-active");
    }
  });

  // subtitles
  const sub = SUBS.find(s => t >= s[0] && t < s[1]);
  if(sub){ subtitle.textContent = sub[2]; subtitle.classList.add("show"); }
  else subtitle.classList.remove("show");

  // progress + time
  progress.style.width = (t/TOTAL*100)+"%";
  const sec = Math.floor(t);
  timeEl.textContent = `00:${String(sec).padStart(2,"0")}`;
}

function play(){
  // reset
  cancelAnimationFrame(raf);
  startTs = null;
  scenes.forEach(s=>s.classList.remove("is-active"));
  document.querySelectorAll(".num").forEach(n=>{ n.textContent="0"; });
  // force reflow so animations restart cleanly
  void document.body.offsetWidth;
  raf = requestAnimationFrame(frame);
}

/* ---------- Controls ---------- */
replay.addEventListener("click", ()=>location.reload());

document.addEventListener("keydown", e=>{
  if(e.key.toLowerCase()==="f"){
    const stage = document.getElementById("stage");
    if(!document.fullscreenElement) stage.requestFullscreen?.();
    else document.exitFullscreen?.();
  }
  if(e.key===" "){ e.preventDefault(); location.reload(); }
});

// autostart
window.addEventListener("load", ()=> setTimeout(play, 400));
