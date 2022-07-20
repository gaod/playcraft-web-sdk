# Playcraft

Enjoy our latest update where we have fixed some bugs and improved our framework to provide you more stable playbacking experience.

Playcraft provides core player, premium player and premium+ player.

Playcraft also provides Google Cast Sender integration and mini controller UI.

Playcraft supports multiple base web players, currently Shaka and Bitmovin are supported.

## Getting Started

Install this package from git repository:

```
yarn add https://github.com/KKStream/playcraft-web-sdk#v1.9.0
```

And install Shaka player:

```
yarn add shaka-player
```

Import, and compose `<Video>` component to your app:

```jsx
import React from 'react'
import {Video} from 'playcraft/react'

const MyApp = () => {
  return (
    <MyContainer>
      <Video
        source="https://dash.akamaized.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd"
        autoplay
      />
    </MyContainer>
  )
}
```

### Legacy Browser Support

To deliver better experience, this package provides bundles with modern syntax for smaller bundle, but legacy browser is still compatible.

If your app is required to legacy browsers, make sure `@babel/preset-env` is configured correctly and polyfills are installed.

Currently polyfills may be required for these features :

- [ResizeObserver](https://github.com/juggle/resize-observer)

## Low Latency Live Mode

Low latency live supports Shaka player only, to opt-in low latency mode, ensure base player is Shaka and attach `latencyManager` to the player once loaded:

```js
import {latencyManager} from 'playcraft/modules'

const MyLowLatencyLivePlayer = () => {
  const videoRef = useRef()

  return (
    <PremiumPlayer
      shaka
      videoRef={videoRef}
      onPlayerLoaded={player => {
        latencyManager(player, videoRef.current).configure({enabled: true})
      }}
    />
  )
}
```

## API Reference

**Sub bundles**

There's 4 sub bundles in this package, to provide player funcitons & components to different environments:

- `playcraft`: Original bundle for backward compatibility at this time, will provide core functions in future breaking/major versions
- `playcraft/core`: Core player functions(non-UI)
- `playcraft/react`: All React based components, make sure other sub bundles have no React dependency
- `playcraft/modules`: Utility functions to share across environments, such as Google Cast receivers
- `playcraft/plugins`: Plugins to share across environments

### `loadPlayer`

Load the player & return reference to player instance.

By default this loads Shaka player, you can specify `shaka` for Shaka player options:

```js
import {loadPlayer} from 'playcraft/core'

const player = await loadPlayer(document.querySelector('video'), {
  shaka: shakaOptions,
})
```

Base player to load is determined by options, `loadPlayer(videoElement, {bitmovin: bitmovinOptions})` loads Bitmovin as base player.

For Bitmovin, player with necessary modules based on current browser.

Reference of Bitmovin player: https://bitmovin.com/docs/player/api-reference/web/web-sdk-api-reference-v8#/player/web/8/docs/interfaces/core.playerapi.html

### Plain JavaScript interface

While we can use the player object directly, this package also provides functions the works with all base players.

```js
import {subscribeMediaState, load, playOrPause, seek} from 'playcraft/core'
```

### `<Video>`

Import with: `import {Video} from 'playcraft/react'`.

Basic player component as a React component, a wrapper around base player.

This component renders `<video>` tag only, UI is not included.

Example:

```js
<Video
  source={[
    {
      type: 'dash',
      src: 'https://dash.akamaized.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd'
    }
  ]}
  autoplay
  shaka
  ref={videoRef}

  playbackState="playing"
  currentTime={123}
  volume={0.8}
  audio={audioTrackId}
  subtitles={subTitleTrackId}
  quality={{min: '720', max: '1080'}}

  onPlaybackStateChange={(event, playbackState) => [event.type, playbackState]}
  onTimeUpdate={() => videoRef.current.currentTime}
>
```

#### Source

An object or an array of objects containing `{type, src}`, URL to manifests of video and type of manifests.

```js
;[
  {
    type: 'dash',
    src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths/dash.mpd',
  },
  {
    type: 'hls',
    src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
  },
]
```

In iOS browsers and MacOS Safari, the player chooses first HLS manifest and plays with built-in player provided by Apple.

In other browsers the player looks for first DASH manifest and plays with MediaSource Extensions.

**DRM**

To play content protection endabled videos, you should specify license server URLs and options in `source.rm`:

```js
;[
  {
    type: 'dash',
    src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths/dash.mpd',
    drm: {
      widevine: 'https://drm.ex.com/portal',
      playready: 'https://drm.ex.com/portal',
    },
  },
  {
    type: 'hls',
    src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
    drm: {
      fairplay: {
        licenseUri: 'https://drm.ex.com/portal',
        certificateUri: 'https://drm.ex.com/portal/certificate',
      },
    },
  },
]
```

**`source.drm.widevine.level`**

In most situations, there's no need to set this, for best compatibility.

Actual robustness/security level is determined by the browser, it may use L3 even if L1 works well.

> It is recommended that a robustness level be specified. Not specifying the robustness level could result in unexpected behavior, potentially including failure to play.

This message is [safe to ignore](https://bugs.chromium.org/p/chromium/issues/detail?id=720013), in case Chrome complaining in the console.

In case hardware based content protection(L1) is required, please set `HW_SECURE_DECODE`.

If you have a list of devices that doesn't plays well with L1, please set `SW_SECURE_DECODE` to force L3.

For advanced or experimental usage, the possible value is the one of `SW_SECURE_CRYPTO`, `SW_SECURE_DECODE`, `HW_SECURE_CRYPTO`, `HW_SECURE_DECODE`, `HW_SECURE_ALL`, this is Widevine specific and not supported in other key systems.

#### Props for Player Options

Base player to load is determined by prop, available base players are `shaka` and `bitmovin`.

Example:

```js
<Video shaka /> // load Shaka player with default config
<Video shaka={myShakaConfig} /> // override some Shaka config
<Video bitmovin={{{key: 'my-license-key'}}} /> // Load Bitmovin with config override
```

Currently changing base player is not supported, please un-mount and remount player component.

**`shaka`**

[Shaka player config](https://shaka-player-demo.appspot.com/docs/api/tutorial-config.html)

**`bitmovin`**

[Bitmovin config](https://bitmovin.com/docs/player/api-reference/web/web-sdk-api-reference-v8#/player/web/8/docs/interfaces/core_config.playerconfig.html).

Bitmovin player will be loaded if this prop is specified.

`key` is required if not running in localhost.

**`autoplay`**

Start playback when player component is mounted.

Defaults to `false`.

**`loop`**

Loop the current video. Check [HTMLMediaElement.loop](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-loop)

Defaults to `false`.
**`videoRef`**

Ref to html video element, use this for custom integrations.

**`playerRef`**

Ref to base player instance, use this for custom integrations.

#### Props for Playback

These props describe target state of playback, detailed design explaination can be found [here](hhttps://netflixtechblog.com/integrating-imperative-apis-into-a-react-application-1257e1b45ac6).

**`playbackState`**

Defines target state of the video, possible options are `playing` / `paused`.

Play button update with this prop immediately, for video playback, `paused` also takes effect instantly in most situations, but `playing` can only be applied when the video is ready to play.

Imperative `player.play()` is not recommended, since not all situations are safe to `play()`, requires extra checking or error handling, declarative prop `playbackState` handles these cases.

Example:

```js
const MyApp = () => {
  const [playbackState, setPlaybackState] = useState('paused')
  const play = () => {
    setPlaybackState('playing')
  }
  const pause = () => {
    setPlaybackState('paused')
  }

  return (
    <div>
      <Video playbackState={playbackState} />
      <button onClick={pause}>Pause</button>
      <button onClick={play}>Play</button>
    </div>
  )
}
```

**`onPlaybackStateChange`**

Convenient event wrapper for playback state change.

States are: `loading`, `buffering`, `playing`, `paused`, `error`.

**`currentTime`**

Defines target time of the video, the video seeks to defined time when this prop is changed, no need to update this prop with playback time update, it only seeks when the prop updates.

User can also seek with seekbar when this props is set, whatever updates last takes effect.

**`onTimeUpdate`**

**`quality`**

Defines constraints on what streams/tracks should be selected in ABR, if nothing meets specified constriant, player fallbacks to base player decision.

```js
{
  minHeight: 480,
  maxHeight: 1080,
}
```

**`volume`**

Defines target volume of the video, the video updates to defined volume when this prop is changed.

**`muted`**

Defines muted state of the video.

**`playbackRate`**

Defines target playback rate of the video, the video updates to defined rate when this prop is changed.

**`audioTrack`**

**`onPlayerLoaded`**

Called when the player is loaded.

**`onError`**

Called when an error is occurred.

`event.error.name` is typically source of the error, please refer to the documentation of base player, lookup with `event.error.code`.

**Other Props**

Additional props will be passed to video element.

### `<VideoPlayer>`

Import with: `import {VideoPlayer} from 'playcraft/react'`.

Basic player component as a React component, a wrapper around base player.

This renders video with basic player UI.

Example:

```js
<VideoPlayer
  source="https://dash.akamaized.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd"
  autoplay
  shaka
/>
```

#### Props

All props of `<Video>` are supported

**`style`**

Style of top level element of this component.

**`autohide`**

Autohide player UI after no UI interaction after 3 seconds.

Defaults to `false`.

### `<PremiumPlayer>`

Import with : `import {PremiumPlayer} from 'playcraft/react'`

**Example**

```js
const [source, setSource] = useState([
  {
    type: 'dash',
    src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths/dash.mpd',
  },
  {
    type: 'hls',
    src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
  }
], [])

<PremiumPlayer
  source={source}
  onChangeNext={() => {
    // somthing like: setSource(nextSource)
  }}
  onChangePrevious={() => {}}
/>
```

#### Source

`source` prop format is the same as `<Video>`, with some extensions.

**Thumbnails**

```js
;[
  {
    type: 'dash',
    src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths/dash.mpd',
  },
  {
    type: 'thumbnail',
    src: 'https://ex.com/thumbnails.vtt',
  },
]
```

Specify a source object with url to thumbnails data for thumbnail seeking feature.

**Quality**

The player gets the available qualities/profiles/resolutions/variants from the manifest as default and offer quality settings automatically, list of setting options can be overridden by specifying `source.qualityOptions`:

```js
{
  type: 'dash',
  src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths/dash.mpd',
  qualityOptions: [
    {label: '1080', value: 1080, options: {maxHeight: 1080}},
    {label: '720', value: 720, options: {maxHeight: 720}},
  ],
},
```

#### Props

All props of `<Video>` are supported.

**`autoplay`**

Whether the player starts playing after loading a source or not. Unmuted autoplay is blocked on major browsers, detect with `onAutoplayBlocked`.

Takes no effect when `playbackState` prop is given.

**`quality`**

When playing with Safari native HLS support, player can't set ABR constraints and quality selection is disabled.

To enable quality selection in Safari, specify `quality.rewriteManifest` to let player apply ABR constriants by manifest rewrite.

```js
import {selectHlsQualities} from 'playcraft/modules'
;<PremiumPlayer
  quality={{
    rewriteManifest: selectHlsQualities,
  }}
/>
```

**`controls`**

Defines that player show UI or not.  
Also support advanced option `autohide` object prop.

```js
<PremiumPlayer controls={true | false | autohide} />
```

Use `autohide` with 3 seconds:

```js
<PremiumPlayer controls={{autohide: 3000}} />
```

To show only title use `title-only`:

```js
<PremiumPlayer controls="title-only" />
```

To display a custom overlay, and temporarily disable built-in settings UI, use `no-panel`.

```js
<PremiumPlayer controls="no-panel" />
```

Default value is `true`.

**`intl.locale`**

Language of settings UI & error messages.s

**`intl.messages`**

Custom translations.

**`title`, `channelTitle`**

Video title text to be displayed at top.

**`subtitleTrack`**

**`onBack`**

A function that will be called when back button is clicked, back button is rendered at left of title, only if specified.

**`onChangeNext`, `onChangePrevious`**

Click handler for next / previous episode buttons.
If not specified, buttons will be disabled in mobile UI (or hidden in desktop UI).

**`onError`**

Premium player has built-in error UI, when an error is encountered, it stops playback and displays a overlay error message.

To opt-out error message for some specific error, use `event.preventDefault()`, you can unmount player component then re-mount it to restart silently.

Example:

```js
const MyVideoApp = () => {
  const [playerSwitch, setPlayerSwitch] = useState('open')
  const remount = () => {
    flushSync(() => {
      setPlayerSwitch('closed')
    })
    flushSync(() => {
      setPlayerSwitch('open')
    })
  }

  return playerSwitch === 'open' && (
    <PremiumPlayer
      event => {
        if (/PlayerError/.test(event.error.name) && event.error.code == 1000) {
          event.preventDefault()
          remount()
        }
      }
    >
  )
}
```

**`sendLog(eventName, {currentTime})`**

Optional log function for playback / UI events.

Events are subject to change:

- playing, paused
- rewind, forward
- previousEpisode, nextEpisode
- openSettings, closeSettings

This prop is mainly for behaviors can only be observed inside premium player, for amplitude and log
services integration, see `mapLogEvents`.

Playback properties are provided as an object, you can also add custom properties.

**Example**

```js
sendLog={(eventName, properties) => {
  sendToLogService(eventName, {
    ...properties,
    ...myCustomProperties,
  })
}}
```

**`onOpenSettings`**

Called when settings UI is open, by default, playback is paused when using mobile UI, you can opt-out with `event.preventDefault()`:

```js
<PremiumPlayer onOpenSettings={event => event.preventDefault()}>
```

**`uiElements`**

Use this props to overrides the default UI elements. See more about [uiElements configuration](#followings-are-the-configurable-ui-elements).

Use fullscreenButton for hiding full-screen button.

```js
<PremiumPlayer uiElements={{fullscreenButton: false}}>
```

#### UI Component Composition

**children**

All children will be rendered as children of player UI, use `position: absolute` to stack custom UI on player UI.

**<FunctionBarExtension>**

Import with : `import {FunctionBarExtension} from 'playcraft/react'`

In addition to children, you can also attach buttons or custom UI, at right of built-in buttons, or other specific places.

Internal layout component provides ref to the function bar container, the button is rendered at left of settings button, with React portal.

```js
<PremiumPlayer>
  <FunctionBarExtension>
    <MyCustomButton />
  </FunctionBarExtension>
  <MyOverlayUI />
</PremiumPlayer>
```

**<TitleBarExtension>**

Import with : `import {TitleBarExtension} from 'playcraft/react'`

You can add an empty container with a width of 1 ~ 3rem to shift the title position.

```js
<PremiumPlayer>
  <TitleBarExtension>
    <div style={{width: '2rem'}} />
  </TitleBarExtension>
</PremiumPlayer>
```

### `<PremiumPlusPlayer>`

Import with : `import {PremiumPlusPlayer} from 'playcraft/react'`

Premium+ player is premium player with integrated playback API support, and full set of enterprise features, good for fast OTT platform player integration.

All props of `<PremiumPlayer>` and `<Video>` are also available.

#### Props for enterprise features

**`preload`**

Default is 'auto', player starts playback session automatically.
If `none` is specified, player starts playback session when `load()` is called.

**`quality`**

In addition to `quality` prop supported in premium, `quality.getSettingOptions` is available to define quality setting options with resolution list provided by API.

```js
{
  getSettingOptions: fixedQualityOptions // or abrLimitQualityOptions
}
```

**`uiElements`**

Use this props to overrides the default UI elements.

```jsx
// For hiding rewind/forward button
<PremiumPlusPlayer
  uiElements={{
    controlButtons: {
      rewindButton: false,
      forwardButton: false
    }
  }}
/>
```

#### Followings are the configurable UI elements:

```
{
  controlButtons: {
    playButton
    rewindButton
    forwardButton
    nextEpisodeButton
    previousEpisodeButton
  }
  seekbar
  backButton
  fullscreenButton
  volumeControl
  backItems
  liveButton,
  castButton,
  settingButton
}
```

#### Props for playback API

**`host`**

URL of playback API.

**`accessToken`**

Access token of current user, this is optional if access control is not needed.

This will be added to header `Authorization` of playback API requests, and headers of DRM portal requests.

**`deviceId`**

Unique identifier of current device, needed for concurrent device count limit.

**`headers`**

Additional headers for playback API requests.

**`params`**

Additional query parameters for playback API requests.

**`contentType`, `contentId`**

Content to request from playback API, types are `videos` / `lives`.

**`preloadList`**

A list of content to pre-request the playback info and the content data. The data format should be like:

```ts
type PreloadList = {
  contentId
  contentType
}[]
```

Note that the array reference should keep the same if the content doesn't change. We suggest using `useMemo` to wrap the `preloadList`:

```js
const preloadList = useMemo(
  () => [
    {contentId: '1', contentType: 'videos'},
    {contentId: '2', contentType: 'videos'},
  ],
  []
)

return <PremiumPlusPlayer preloadList={preloadList} />
```

**`onApiError(error, {retry, retryTimes})`**

Handler for API request errors, `error` is error object of axios, you may resend request with `retry`.

Default behavior is:

- For temporarily server or network error, wait 3 seconds and retry 3 times
- For critical API `/start` and `/info`, pass error back
- Ignore errors for other API errors by return a pending promise

Example:

```js
const ignoreMinorError = async (error, {retry, retryTimes} = {}) => {
  if (
    (error.response.message === 'Network Error' ||
      /502|503/.test(error.response.status)) &&
    retryTimes < 3
  ) {
    await waitMs(3000)
    return retry()
  }
  if (/start$|info$/.test(error.config.url)) {
    return Promise.reject(error)
  }
  console.log('Ignore non-critical playback API fail', error)
  return new Promise(() => {})
}
```

### `<Player>` (Deprecated: use PremiumPlusPlayer instead)

Import with: `import {Player} from 'playcraft'`.

Props of `<VideoPlayer>` can also be used.

#### `<Player>` for Enterprise

Need to give suitable configuration to `drm`.  
In this case, please use `getEnterpriseDrmConfig`.

**Example**

```jsx
import {getEnterpriseDrmConfig} from 'playcraft'
...
    <Player
      ...
      drm={getEnterpriseDrmConfig}
      ...
    >
```

#### Props for playback server

**`host`**

URL of playback server.

**`content`**

An object defines content to play, the shape is `{contentType, contentId}`.
Possible content types are: `videos`, `lives`.

This object is extensibe if needed, like **`licenseId`** is added to indetify license.

**`accessToken`**

Access token of current user, this is optional if access control is not needed.

This will be added to header `Authorization` of playback API requests.

**`deviceId`**

Unique identifier of current device, needed for concurrent device count limit.

#### Props for base player

**`licenseKey`**

Bitmovin Player license, the player will start only if the domain name is localhost or in alowed list.

When starting a new project that using Bitmovin, contact core tech TPM or CPT team member to create a key in [Bitmovin Dashboard](https://bitmovin.com/dashboard/player/licenses).

**`config`**

Config for Base Player, use this only when you know what you are doing.

Now we support two base player: Shaka, Bitmovin.

Shaka Reference: https://shaka-player-demo.appspot.com/docs/api/tutorial-config.html

Bitmovin Reference: https://cdn.bitmovin.com/player/web/8/docs/interfaces/core_config.playerconfig.html

Shape:

```js
{
  basePlayer,
  basePlayerConfig,
}
```

basePlayer content is `shaka`, `bitmovin`.

Default is:

```js
{
  basePlayer: 'shaka'
}
```

You could switch to Bitmovin by `config` interface:

```js
  <Player
    ...
    config={{basePlayer: 'bitmovin'}}
    ...
  >
```

#### Props for player features

**`lang`**

This is used to switch the language displayed in the player, ex: tooltips of buttons, error messages.
Defaults to `en`, available values are: `en`, `ja`, `zh-TW`.

**`preload`**

Simillar to [`preload` of `<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload), controls preload behavior of player.

Options:

- `auto` (default): Automatically start playback session & fetch manifests.
- `none`: Playback session will be started when `.load()` is called, or when play button is tapped.

**`startTime`**

Start playback at specified time (seconds, factorial).

⚠️ Caution: Seeking is not frame accurate in major browsers at this time, and start position will be inconsistent across browsers.

**`autoPlayNext`**

When playback time reached `end_start_position` or end first time, show an UI with image of next episode prompt user to play next episode, and countdown for 10 seconds before playing automatically.

This takes effect of if the video have next episode.

Defaults to `false`.

**`quality`**

Prefered quality to play, specify by height of resolution like `720`, `1080`, if specified height doesn't exist, a higher resolution will be used.

Since the player plays with adaptive bitrate, quality is actually defined max resultion can be adoptd.

On Safari or iOS Chrome which needs native HLS, this feature is disabled by default.

If you want to enable it, please use object form with `qualitySelectionHack: true`.

User even could define custom quality text by object form:

```js
<Player
  quality={
    default: 1080,
    getQualityText: ({width, height}) => `${height}p`,
    qualitySelectionHack: true
  }
/>
```

Quality options can be customized with `quality.getQualityOptions`, in this case, you should handle custom option in `onVideoQualityChanged` handler:

```js
<Player
  quality={
    default: 'auto',
    getQualityOptions: qualities => [{
      label: 'AUTO',
      height: 'auto',
      value: 'auto',
    }].concat(qualities)
  }
  onVideoQualityChanged={({qualities, targetQuality}) => {
    if (targetQuality.height === 'auto') {
      // return nothing to use all available adaptation range
      return
    }
    return [findQuality(quality, targetQuality)]
  }}
/>
```

**`thumbnailSeeking`**

Option to enable / disable thumbnail seeking, if enabled but not available, thumbnails won't be shown.

Default is `false`.

**`drm`**

Strategy function to generate DRM configuration.  
Currently, we provide two helper functions: `getBVKDrmConfig` and `getEnterpriseDrmConfig`.  
The main difference between the two is authorization mechanism.

`getEnterpriseDrmConfig` strategy places token to X-Custom-Data header in DRM flow.

`getBVKDrmConfig` strategy sets token to authorization header instead of X-Custom-Data.  
This function is for BlendVision Kaleido.

The appropriate strategy is based on your DRM service.

Default is `getBVKDrmConfig`.

#### Props for player events

**`onError`**

Example:

```js
;({
  from, // The module where the error occurred. May be 'API', 'Player' and 'UI'.
  error: {
    code, // error code
    message, // origin error message
  },
  content, // player content prop
}) => {}
```

**`onSourceLoaded`**

**`onReady`**

**`onPlay`**

**`onPlaying`**

**`onSeek`**

Example:

```js
;(
  seekTarget, // The target position (in seconds)
  currentPosition // The current position (in seconds)
) => {}
```

**`onSeeked`**

Example:

```js
// current position in seconds
currentPosition => {}
```

**`onPaused`**

**`onTimeChanged`**

Example:

```js
// current position in seconds
currentPosition => {}
```

**`onVolumeChanged`**

Example:

```js
;(
  targetVolume, // The new selected volume.
  sourceVolume // The volume before the event has been triggered.
) => {}
```

**`onMuted`**

**`onUnmuted`**

**`onStallStarted`**

**`onStallEnded`**

**`onReplay`**

**`onVideoQualityChanged`**

Triggered when user change quality in settings UI.

There are `targetQuality`, `qualities` in event data, you can return subset of `qualities` to define desired range of quality adaptation.

This example shows how to fix at selected quality :

```js
onVideoQualityChanged={({targetQuality, qualities}) =>
  // assume target quality always exists
  qualities.filter(({height}) => targetQuality.height === height)
}
```

**`onEnded`**

**`onEnterFullscreen`**

**`onExitFullscreen`**

**`onViewModeChange`**

**`onChangeVideo`**

Example:

```js
;({
  videoId, // This is the video id that the player wants to change.
}) => {}
```

**`onChangeToNextVideo`**

Example:

```js
;({
  videoId, // This is the video id that the player wants to change.
}) => {}
```

**`onChangeToPreviousVideo`**

Example:

```js
;({
  videoId, // This is the video id that the player wants to change.
}) => {}
```

### Plugins

Import from `playcraft/plugins`.

While this library provides common features, some of features are not required in all use cases, these features are implemented as plguins, to make app package dependencies clean,
and bundle size won't increace with unused features.

⚠️ When using plugins with React UI, make sure the plugins are stored with a reference and
are not initialized on re-render(see React example below).

Since main bundle is not [side-effect-free](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free) yet, plugins are in sub bundle `playcraft/plugins`.

#### `MediaTailorPlugin`

This plugin loads streams with server-side stitched ad from MediaTailor, and provides ad related functionalies.

Ad UI is not included in this plugin.

**`adParams`**

⚠️ Warning: this prop is experimental.

Set personalized ads for MediaTailor.

This props should be inserted with `MediaTailorPlugin` contructor.

Default is empty JSON.

```jsx
const adParams = {user: 'tim'}
const plugin = MediaTailorPlugin({adParams})
```

**Features**

- Load ad stitched streams from MediaTailor
- Load ad tracking event data & send tracking events(beacons)
- Snapback
- Provide playback time of original content
- Provide ad playback status
- Provide ad events
- Provide skip ad function

**Example for React**

To avoid re-initializing plugins on re-render, please wrap it with useMemo.

```js
import {Player} from 'playcraft'
import {MediaTailorPlugin} from 'playcraft/plugins'

const MyPlayerView = () => {
  const plugins = useMemo(() => [MediaTailorPlugin()], [])

  return (
    <MyContainer>
      <Player plugins={plugins} />
    </MyContainer>
  )
}
```

**Example for Cast receiver**

This plugin can also integrate with Playcraft Cast receiver.

```js
import {MediaTailorPlugin} from 'playcraft/plugins'
import {castService} from 'playcraft-google-cast'

castService.start({
  plugins: [MediaTailorPlugin()],
})
```

#### `ImaDaiPlugin`

This plugin enable the playcraft integration with [ImaDai SDK for HTML5](https://developers.google.com/interactive-media-ads/docs/sdks/html5/dai).
You can use it as follow:

```jsx
import {ImaDaiPlugin} from 'playcraft/plugins'

function ContainerComponent(props) {
  const plugins = useMemo(() => [ImaDaiPlugin()], [])
  return <PremiumPlusPlayer plugins={plugins} />
}
```

**`requestOptionOverrides`**

Accept an object to overrides the default [StreamRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/dai/reference/js/StreamRequest):

```jsx
const plugins = useMemo(
  () => [
    ImaDaiPlugin({
      requestOptionsOverrides: {adTagParameters: {tfcd: 1}},
    }),
  ],
  []
)
return <PremiumPlusPlayer plugins={plugins} />
```

### Modules

Import with: `import {mapLogEvents} from 'playcraft/modules`

This sub bundle contains building blocks unplugged from enterprise player, for crafting a player from the super flexible minimal player or other players.

#### `mapLogEvents`

A observer operator-like funciton, take video element, generates **playback log events** to be sent to amplitude.

Cast receiver also handle playlog with this function.

Premium+ already integrated playlog in it, no need to use this function.

For premium player or other players, simply pass video element and pass additional events with `logTarget.emit`:

```js
const MyApp = () => {
  const videoRef = useRef()
  const logTarget = useRef()
  useEffect(() => {
    logTarget.current = mapLogEvents({
      playerName: 'shaka',
      version: process.env.VERSION,
      video: videoRef.current,
    })
  }, [])

  return (
    <PremiumPlayer
      videoRef={videoRef}
      sendLog={(name, data) => logTarget.current.emit(name, data)}
    />
  )
}
```

## Workarounds

### Pause when Unplugging Headphones in iOS

Mobile web video will be paused by OS when unplugging headphones, but in some iOS versions, video is paused without an event, and cause UI state inconsistent.

A function `handleIOSHeadphonesDisconnection` is provided to workaround this.

**Example**

```js
import React, {useEffect} from 'react'
import {Player} from 'playcraft'
import {handleIOSHeadphonesDisconnection} from 'playcraft/modules'

const MyVideoComponent = () => {
  useEffect(() => {
    handleIOSHeadphonesDisconnection()
  }, [])

  return <Player />
}
```
