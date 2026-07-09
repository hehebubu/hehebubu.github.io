// @ts-ignore
import script from "./scripts/musicplayer.inline"
import styles from "./styles/musicplayer.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const MusicPlayer: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <div id="bgm-player">
      <button id="bgm-toggle" type="button" aria-label="배경음악 재생/일시정지" title="배경음악">
        <span class="bgm-icon-play">♪</span>
        <span class="bgm-icon-pause">❚❚</span>
      </button>
      <span id="bgm-title"></span>
      <button id="bgm-next" type="button" aria-label="다음 곡" title="다음 곡">
        ≫
      </button>
    </div>
  )
}

MusicPlayer.afterDOMLoaded = script
MusicPlayer.css = styles

export default (() => MusicPlayer) satisfies QuartzComponentConstructor
