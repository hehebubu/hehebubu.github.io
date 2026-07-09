interface BgmState {
  audio: HTMLAudioElement
  order: number[]
  pos: number
}

declare global {
  interface Window {
    __bgm?: BgmState
  }
}

const tracks = [
  { src: "/static/music/01-chopin-nocturne-op9-2.mp3", title: "쇼팽 — 녹턴 Op.9 No.2" },
  { src: "/static/music/02-satie-gymnopedie-1.mp3", title: "사티 — 짐노페디 1번" },
  { src: "/static/music/03-debussy-clair-de-lune.mp3", title: "드뷔시 — 달빛" },
  { src: "/static/music/04-bach-air-on-g-string.mp3", title: "바흐 — G선상의 아리아" },
  { src: "/static/music/05-pachelbel-canon-in-d.mp3", title: "파헬벨 — 캐논" },
  { src: "/static/music/06-schumann-traumerei.mp3", title: "슈만 — 트로이메라이" },
  { src: "/static/music/07-liszt-consolation-3.mp3", title: "리스트 — 위안 3번" },
  { src: "/static/music/08-beethoven-moonlight-2nd.mp3", title: "베토벤 — 월광 소나타 2악장" },
  { src: "/static/music/09-bach-wtc-prelude-3.mp3", title: "바흐 — 평균율 프렐류드 BWV 848" },
  { src: "/static/music/10-bach-goldberg-aria.mp3", title: "바흐 — 골드베르크 변주곡 아리아" },
  {
    src: "/static/music/11-liszt-la-campanella.mp3",
    title: "파가니니·리스트 — 라 캄파넬라",
  },
]

function shuffledOrder(): number[] {
  const order = tracks.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

function getBgm(): BgmState {
  if (!window.__bgm) {
    const audio = new Audio()
    audio.preload = "none"
    audio.volume = 0.4
    window.__bgm = { audio, order: shuffledOrder(), pos: -1 }
    audio.addEventListener("ended", () => playNext())
    audio.addEventListener("play", updateUI)
    audio.addEventListener("pause", updateUI)
  }
  return window.__bgm
}

function currentTitle(bgm: BgmState): string {
  if (bgm.pos < 0) return ""
  return tracks[bgm.order[bgm.pos]].title
}

function updateUI() {
  const bgm = getBgm()
  const player = document.getElementById("bgm-player")
  const title = document.getElementById("bgm-title")
  if (!player || !title) return
  const playing = !bgm.audio.paused && bgm.pos >= 0
  player.classList.toggle("playing", playing)
  title.textContent = currentTitle(bgm)
}

function playNext() {
  const bgm = getBgm()
  bgm.pos++
  if (bgm.pos >= bgm.order.length) {
    bgm.order = shuffledOrder()
    bgm.pos = 0
  }
  bgm.audio.src = tracks[bgm.order[bgm.pos]].src
  void bgm.audio.play().catch(() => {})
  updateUI()
}

function togglePlay() {
  const bgm = getBgm()
  if (bgm.pos < 0) {
    playNext()
  } else if (bgm.audio.paused) {
    void bgm.audio.play().catch(() => {})
  } else {
    bgm.audio.pause()
  }
  updateUI()
}

function setup() {
  const toggle = document.getElementById("bgm-toggle")
  const next = document.getElementById("bgm-next")
  if (toggle) toggle.onclick = togglePlay
  if (next) next.onclick = playNext
  updateUI()
}

document.addEventListener("nav", setup)
setup()
