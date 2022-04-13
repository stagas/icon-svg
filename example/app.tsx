/** @jsxImportSource html-vdom */

import { render } from 'html-vdom'
import { IconSvg } from '../src'

document.body.className = 'dark'

const cssStyle = /*css*/ `
body {
  background: #eee;
  color: #222;
}

body.dark {
  background: #272727;
  color: #eee;
}

@media (prefers-color-scheme: dark) {
  body:not(.light) {
    background: #272727;
    color: #eee;
  }
}

${IconSvg} {
  width: 32px;
  height: 32px;
  margin: 2px;
  stroke-width: 2.5px;
}

.medium ${IconSvg} {
  width: 24px;
  height: 24px;
  stroke-width: 1.9px;
}

.small ${IconSvg} {
  width: 16px;
  height: 16px;
  stroke-width: 1.1px;
}
`
const style = document.createElement('style')
style.textContent = cssStyle
document.head.appendChild(style)

const AllSets = () => (
  <>
    <IconSvg set="bytesize" icon="camera" />
    <IconSvg set="bootstrap" icon="calendar3" />
    <IconSvg set="bootstrap" icon="rss" />
    <IconSvg set="bootstrap" icon="peace" />

    <IconSvg set="boxicons" type="logos" icon="javascript" />
    <IconSvg set="boxicons" type="logos" icon="internet-explorer" />
    <IconSvg set="boxicons" type="regular" icon="alarm" />
    <IconSvg set="boxicons" type="regular" icon="pencil" />
    <IconSvg set="boxicons" type="solid" icon="alarm" />
    <IconSvg set="boxicons" type="solid" icon="pencil" />

    <IconSvg set="bytesize" icon="book" />
    <IconSvg set="bytesize" icon="video" />
    <IconSvg set="bytesize" icon="moon" />

    <IconSvg set="cssgg" icon="calendar-dates" />
    <IconSvg set="cssgg" icon="log-out" />
    <IconSvg set="cssgg" icon="magnet" />

    <IconSvg set="emojicc" icon="oncomingTaxi" />
    <IconSvg set="emojicc" icon="paperclip" />
    <IconSvg set="emojicc" icon="handSplayedTone5" />

    <IconSvg set="eos" type="solid" icon="car_rental" />
    <IconSvg set="eos" type="solid" icon="chat_bubble" />
    <IconSvg set="eos" type="solid" icon="biotech" />
    <IconSvg set="eos" type="outlined" icon="car_rental" />
    <IconSvg set="eos" type="outlined" icon="chat_bubble" />
    <IconSvg set="eos" type="outlined" icon="biotech" />
    {/* <IconSvg set="eos" type="animated" icon="compass" /> */}

    <IconSvg set="feather" icon="compass" />
    <IconSvg set="feather" icon="mail" />
    <IconSvg set="feather" icon="gift" />

    <IconSvg set="flags" icon="ua" kind="4x3" />
    <IconSvg set="flags" icon="ru" kind="4x3" />

    <IconSvg set="fontawesome" type="brands" icon="java" />
    <IconSvg set="fontawesome" type="regular" icon="compass" />
    <IconSvg set="fontawesome" type="solid" icon="compass" />

    <IconSvg set="iconoir" icon="cart" />
    <IconSvg set="iconoir" icon="github" />
    <IconSvg set="iconoir" icon="fingerprint" />

    <IconSvg set="iconpark" type="Abstract" icon="cube" />
    <IconSvg set="iconpark" type="Arrows" icon="download" />
    <IconSvg set="iconpark" type="Base" icon="dislike" />
    <IconSvg set="iconpark" type="Books" icon="book" />
    <IconSvg set="iconpark" type="Brand" icon="mitsubishi" />
    <IconSvg set="iconpark" type="Build" icon="arc-de-triomphe" />
    <IconSvg set="iconpark" type="Character" icon="bitcoin" />
    <IconSvg set="iconpark" type="Charts" icon="chart-graph" />
    <IconSvg set="iconpark" type="Child" icon="heart-ballon" />
    <IconSvg set="iconpark" type="Clothes" icon="bow" />
    <IconSvg set="iconpark" type="Communicate" icon="message-unread" />
    <IconSvg set="iconpark" type="Connect" icon="branch-one" />
    <IconSvg set="iconpark" type="Datas" icon="database-code" />
    <IconSvg set="iconpark" type="Edit" icon="calendar" />
    <IconSvg set="iconpark" type="Emoji" icon="dizzy-face" />
    <IconSvg set="iconpark" type="Foods" icon="banana" />
    <IconSvg set="iconpark" type="Graphics" icon="hexagon-one" />
    <IconSvg set="iconpark" type="Hands" icon="spider-man" />
    <IconSvg set="iconpark" type="Hardware" icon="chip" />
    <IconSvg set="iconpark" type="Health" icon="mask" />
    <IconSvg set="iconpark" type="Industry" icon="oscillator" />
    <IconSvg set="iconpark" type="Life" icon="beach-umbrella" />
    <IconSvg set="iconpark" type="Makeups" icon="scissors" />
    <IconSvg set="iconpark" type="Money" icon="blockchain" />
    <IconSvg set="iconpark" type="Music" icon="fm" />
    <IconSvg set="iconpark" type="Office" icon="file-code" />
    <IconSvg set="iconpark" type="Operate" icon="radio-two" />
    <IconSvg set="iconpark" type="Others" icon="checklist" />
    <IconSvg set="iconpark" type="Peoples" icon="user" />
    <IconSvg set="iconpark" type="Sports" icon="black-eight" />
    <IconSvg set="iconpark" type="Time" icon="alarm-clock" />
    <IconSvg set="iconpark" type="Travel" icon="aviation" />
    <IconSvg set="iconpark" type="Weather" icon="snow" />

    <IconSvg set="phosphor" type="regular" icon="bezier-curve" />
    <IconSvg set="phosphor" type="regular" icon="alarm" />
    <IconSvg set="phosphor" type="regular" icon="airplane-takeoff" />
  </>
)

render(
  <>
    <button onclick={() => (document.body.className = 'light')}>light</button>
    <button onclick={() => (document.body.className = 'dark')}>dark</button>
    <div id="demo" style="width:435px">
      <div class="large">
        <AllSets />
      </div>
      <div class="medium">
        <AllSets />
      </div>
      <div class="small">
        <AllSets />
      </div>
    </div>
  </>,
  document.body
)
