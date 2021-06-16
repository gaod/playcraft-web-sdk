# Playcraft

Enjoy our latest update where we have fixed some bugs and improved our framework to provide you more stable playbacking experience.

Playcraft wraps the logic of requesting video and verifying authorization, it also provides a control panel with basic control of playback, such like play, pause, seek ...etc.

Playcraft also provides Google Cast Sender integration and mini controller UI.

Currently, web player is based on [Bitmovin Player](https://bitmovin.com/docs/player).

## Getting Started

Install this package from gitlab repository:

```
yarn add git+ssh://git@gitlab.kkinternal.com:playback/web-playcraft#v1.1.1
```

Import, and compose `<Player>` component to your app:

```jsx
import React from 'react'
import {Player} from 'playcraft'

const MyApp = () => {
  return (
    <MyContainer>
      <Player
        host={playbackServerUrl}
        content={{
          contentType: 'live',
          contentId: '1',
        }}
        licenseKey={bitmovinLicenseKey}
        accessToken={accessToken}
        deviceId={deviceId}
      />
    </MyContainer>
  )
}
```

Minimal options are:

- `host`: URL of playback server.
- `content.contentType`: Type of content (`videos` or `lives`)
- `content.contentId`
- `licenseKey`: Bitmovin license key, this is bound to project site domain, this is not used in development (localhost).

`accessToken`, `deviceId` are also required in most cases.

To use this package with Gitlab pipelines, deploy keys should be added to allow the Gitlab runner accessing this package, please contact us to add `ci-deploy-key` of the runner to repository deploy keys.

In addition to React integration, this package also provides bundle for project not using React, please refer to [docs/kks-player-library.md](https://gitlab.kkinternal.com/playback/web-playcraft/blob/develop/docs/kks-player-library.md).

### Legacy Browser Support

To deliver better experience, this package provides bundles with modern syntax for smaller bundle, but legacy browser is still compatible.

If your app is required to legacy browsers, make sure `@babel/preset-env` is configured correctly and polyfills are installed.

Currently polyfills may be required for these features :

- [ResizeObserver](https://github.com/juggle/resize-observer)

## Documentation

Playcraft web player documentation can be found on [Confluence](https://kkvideo.atlassian.net/wiki/spaces/OP/pages/466813340/Web).

### `<Player>`

Import with: `import {Player} from 'playcraft'`.

The player React component to integrate with React based enterprise projects, highly customized, less flexible but easy & fast to use.

For non-React integration, please refer to [docs/kks-player-library.md](https://gitlab.kkinternal.com/playback/web-playcraft/blob/develop/docs/kks-player-library.md).

## API Reference

### `<Player>`

Player component to integrate with react apps.

Import with `import {Player} from 'playcraft'`.

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

**`customHeader`**

⚠️ Warning: this prop is only for enterprise projects.

Add headers to playback API and DRM server requests.

For example, device type and additional authorization can be added:

```js
{
  'X-Device-Type': 'tfcweb',
  'kks-access-id': 'NTRRMBYRVIZRUMLYHENZXWXZPZTIXHGD',
  'kks-access-key': '4fe8f3460f5ee75f5c0d11f02a4e9b82ff2fd8fe6fe94eb783014ad5804ff4755fab532287403ac580f7592ffd048c30982305d37b4fb0b903d5307dc3'
}
```
  
**`customQuery`**

Add query parameters to playback API requests.

Example:

```js
{
  'type': 'Trailer'
}
```

**`deviceId`**

Unique identifier of current device, needed for concurrent device count limit.

#### Props for Bitmovin Player

**`licenseKey`**

Bitmovin Player license, the player will start only if the domain name is localhost or in alowed list.

When starting a new project, contact core tech TPM or CPT team member to create a key in [Bitmovin Dashboard](https://bitmovin.com/dashboard/player/licenses).


**`config`**

Config for Bitmovin Player, use this only when you know what you are doing.

Reference: https://cdn.bitmovin.com/player/web/8/docs/interfaces/core_config.playerconfig.html

Default is:

```js
{
  logs: {
    bitmovin: false,
    level: 'error'
  },
  style: {
    width: '100%',
    height: '100%'
  },
  ui: false
}
```

#### Props for player features

**`lang`**
    
This is used to switch the language displayed in the player, ex: tooltips of buttons, error messages.
Defaults to `en`, available values are: `en`, `ja`, `zh-TW`.

**`langCustomCode`**

Override current translation for player UI, see [src/config/lang/en.json](https://gitlab.kkinternal.com/playback/web-playcraft/blob/develop/src/config/lang/en.json) for possible translation keys.
This not affected by `lang`.

```js
{
  'KKS.PLAYER.PLAY': 'Play button tooltip',
  'KKS.ERROR.PLAYCRAFT.1003': 'Error message with error code 1003'
  'KKS.ERROR.PLAYCRAFT.1000': 'Each error message has a variable: {CODE}'
}
```

**`preload`**

Simillar to [`preload` of `<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload), controls preload behavior of player.

Options:

- `auto` (default): Automatically start playback session & fetch manifests.
- `none`: Playback session will be started when `.load()` is called, or when play button is tapped.

When `preload` is set to `none` without `coverImageUrl`, user can tap play button to start playback,
and in this case autoplay is always enabled, so `load()` calls will start playback even if `autoPlay` is set to `false`.

**`autoPlay`**

Start playback when player component is mounted.

Defaults to `false`.

**`autoPlayNext`**

When playback time reached `end_start_position` or end first time, show an UI with image of next episode prompt user to play next episode, and countdown for 10 seconds before playing automatically.

This takes effect of if the video have next episode.

Defaults to `false`.

**`startTime`**

Start playback at specified time (seconds, factorial).

⚠️ Caution: Seeking is not frame accurate in major browsers at this time, and start position will be inconsistent across browsers.

**`quality`**

Prefered quality to play, specify by height of resolution like `720`, `1080`, if specified height doesn't exist, a higher resolution will be used.

Since the player plays with adaptive bitrate, quality is actually defined max resultion can be adoptd.

For custom quality text, use object form:

```js
<Player
  quality={
    default: 1080,
    getQualityText: ({width, height}) => `${height}p`
  }
/>
```

**`mediaSource`**
    
The media source name(ex: `SUBTITLE`, `DUBBED`, ...) you prefer to use.

**`thumbnailSeeking`**

Option to enable / disable thumbnail seeking, if enabled but not available, thumbnails won't be shown.

Default is `false`.

**`limitOnePlaybackAtSameTime`**

Option to block a user from opening player in multiple tabs or browsrer windows.
This won't take effect if browser user switching is used or open in different browser, it should be blocked by device limit instead.

Default is `false`.

**`supportEnvironmentList`**

This defined a list of allowed browser + OS combinations, display error if current browser + OS is not in the list, do nothing if the list is empty.

Default is empty array `[]`.


**`toolPanels`**

Add UI panels upon player UI, and add a open button to player UI. The panel is hidden initially and will open with slide up animaiton.
Accepts an array of object contains `button` and `content`, and other options.

Options are:

- `open`: The panel will show if this prop is `true`, can be used to show / hide the panel.
- `style`: CSS styles of panel container, can be used to customize panel position and size.
- `pinned`(default `false`): Whether the panel should automatically hide with player UI.
- `hasBackdrop`(default `true`): Make the panel act like a modal, cover player UI with "backdrop" (a translucent layer), and tapping on it will close the panel.

Example:

```js
const SampleToolPanel = ({close}) => (
  <div>
    My Panel
    <button onClick={close}>Close</button>
  </div>
)

const MyApp = () => {
  const [panelOpen, setPanelOpen] = useState()

  return (
    <Player toolPanels={[
      {
        open: panelOpen,
        pinned: true,
        hasBackdrop: false,
        style: {
          bottom: '5rem',
        }
        button: <SampleToolButton />,
        content: <SampleToolPanel />,
      }
    ]}>
  )
}
```

**`recommendation`**

Object for recommendation panel, shape is `{title, content}`, see example below.

Example:

```js
{
  title: 'Popular Videos'
  content: (
    <>
      <VideoItem id={1} />
      <VideoItem id={2} />
      <VideoItem id={3} />
    </>
  ) 
}
```

**`coverImageUrl`**

Dsiplay an image on player before playback session start.

**Example**

```jsx
const MyApp = () => {
  const playerRef = useRef()
  const [coverImageUrl, setCoverImageUrl] = useState()

  useEffect(() => {
    requestCoverImageUpdateCallback(imageUrl => {
      // This will pass changed cover image to player
      setCoverImageUrl(imageUrl)
    })
    requestLiveStartCallback(() => {
      // This will start playback API flow, once complete, user can click play button to start
      playerRef.current.load()
    })
  }, [])

  return (
    <Player ref={playerRef} coverImageUrl={coverImageUrl} preload="none" autoPlay={false} />
  )
}
```

**`widevine`**

⚠️ Warning: this prop is experimental.

Controls what widevine level will be used.

Options:

- `device`(default): Request Widevine Level 1 if browser API `requestMediaKeySystemAccess` reports supported & the device is not in the blocked list provided by playback backend. There some devices can't play level 1 but still report supported, and some devices play with video glitch.
- `auto`: Let browser choose a proper level to use(Don't specify `robustness`). It dependes on device to choose a level, some devices play level 3 even if level 1 is supported.
- `force-l1`: Request Widevine Level 1 without checking browser / OS / hardware support, this will only work with devices with hardware support and  is for experimental purpose only.
- `force-l3`: Request Widevine Level 3

**`drm`**

Strategy function to generate DRM configuration.  
Currently, we apply two helper functions: `getEnterpriseDrmConfig` and ``getEnterpriseDrmConfig``.  
`getEnterpriseDrmConfig` strategy places token to X-Custom-Data header in DRM flow.  
`getDefaultDrmConfig` strategy sets token to authorization header instead of X-Custom-Data.  
The appropriate strategy is based on your DRM service.  
This prop defaults to `getDefaultDrmConfig` for product player, `getEnterpriseDrmConfig` for enterprise player.

**Example**

Choose enterprise strategy function
```jsx
import { getEnterpriseDrmConfig } from 'playcraft'
...
    <Player
      ...
      drm={getEnterpriseDrmConfig}
      ...
    >
```

#### Props for player events

**`onError`**

Example:

```js
({
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
(
  seekTarget, // The target position (in seconds)
  currentPosition // The current position (in seconds)
) => {}
```

**`onSeeked`**

Example:

```js
// current position in seconds
(currentPosition) => {}
```

**`onPaused`**
    
**`onTimeChanged`**

Example:

```js
// current position in seconds
(currentPosition) => {}
```

**`onVolumeChanged`**

Example:

```js
(
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

Example:

```js
(
  targetQuality, // The target quality name
  sourceQuality, // the previous quality name
) => {}
```

**`onMediaSourceChanged`**

**`onEnded`**

**`onEnterFullscreen`**

**`onExitFullscreen`**

**`onViewModeChange`**

**`onChangeVideo`**

Example:

```js
  ({
    videoId // This is the video id that the player wants to change.
  }) => {}
```

**`onChangeToNextVideo`**

Example:

```js
  ({
    videoId // This is the video id that the player wants to change.
  }) => {}
```

**`onChangeToPreviousVideo`**

Example:

```js
  ({
    videoId // This is the video id that the player wants to change.
  }) => {}
```

**`onBack`**

**`onLogging`**

It is an event handler to play log event. The types of logs are as follows:

```
  video_playback_began
  video_playback_started
  video_playback_stopped
  video_playback_ended
  video_seeking_ended
  video_playback_error_occurred
```

Example:
```js
  (
    type, // log type
    property // log property
  ) => {}
```

### Player instance (Experimental)

Player instance can be accessed with `ref`, contains feature that props are not suitable for.

This feature is experimental and subject to change in future versions.

```jsx
const MyApp = () => {
  const playerRef = useRef()

  return (
    <Player ref={playerRef}>
  )  
}
```

#### `player.load()`

Start playback session, this should only be used when `preload` is set to `none`.

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
import {MediaTailorPlugin} 'playcraft/plugins'
import {castService} from 'playcraft-google-cast'

castService.start({
  plugins: [MediaTailorPlugin()]
})
```

### Modules

Import with: `import {mapLogEvents} from 'playcraft/modules`

This sub bundle contains building blocks unplugged from enterprise player, for crafting a player from the super flexible minimal player or other players.

#### `mapLogEvents`

A observer operator-like funciton, take video and playback session object, generates [playback log events](https://docs.google.com/spreadsheets/d/13NkVrqvr8usNAJUQ-DBDVBQVy5_F546ZEhTO8evDc9I) to be sent to amplitude.

Log logic is extracted to shared with Cast receiver.

## Getting Started for Development

Install npm packages:

```
yarn
```

Start development server for sample app:

```
yarn develop
```

and open sample app at http://localhost:5566

Sample app needs parameters of sample playback server to start, you can get these parameters from a sample web player link and append to `http://localhost:5566`.

Sample player links can be found at [Playcraft release page](https://kkvideo.atlassian.net/wiki/spaces/OP/pages/551157832/Release)

Default branch of this repository is `develop`, please create feature branch from `develop`, and sumbmit Gitlab merge requests.

Version number and changelog of this package is generated automatically, please follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

### File Structure

#### Library Source Code: `/src`

**`/src/playerCore`**

Player logic not related to UI, includes:

- player configutation
- playback session
- playlog
- DRM
- adaptive streaming
- vod playback
- live playback

**`/src/playerUi`**

UI code & React integrations.

**`/src/plugins`**

Optional player features like SSAI support.

**`/src/cast`**

Cast sender module, includes sender UI.

**`/src/player`**

PlayBoy v4 and Playcraft early v1 code, some of files are still here and will be moved to `playerCore` or `playerUi` in future.

#### Test: `/test`

#### Player Sample App: `/app`

This directory contains sample app source code and will be created in future, content in `/demo`, `/components` and `/pages` will be moved here.

### Coding Style

ESLint & prettier are setup to help keeping our coding style consistent & catch potential bug.

As of v1.2.0, we are still refactoring and moving code from PlayBoy v4 path, PlayBoy v4 code has its own lint config, others follows global config.

### Build

Development of this package follows [CPT git flow](https://kkvideo.atlassian.net/wiki/spaces/OP/pages/862683137/CPT+Git+Flow), and the package itself is hosted on github repository.

To publish a new version, follow git flow, create `release` branch and merge to `master`, a new version will be built and commit to master branch automatically.

New version and changelog will be built automatically with [standard-version](https://github.com/conventional-changelog/standard-version).

To build manually:

```
yarn build
```

This package is built by rollup, ES module, CJS bundle and UMD will be generated in `build/`:

- ES module: `index.module.js`
- CJS: `bundle.js`
- UMD: `kks_player.min.js`

Only syntax that doens't understood by Webpack/Rollup/modern browsers are transpiled, library users should have transpiler configured to support legacy browsers.

UMD bundle is for non-React usages and have different interface.

## Workarounds

### Pause when Unplugging Headphones in iOS

Mobile web video will be paused by OS when unplugging headphones, but in some iOS versions, video is paused without an event, and cause UI state inconsistent.

A function `handleIOSHeadphonesDisconnection` is provided to workaround this.

**Example**

```js
import React, {useEffect} from 'react'
import {Player, handleIOSHeadphonesDisconnection} from 'playcraft'

const MyVideoComponent = () => {
  useEffect(handleIOSHeadphonesDisconnection)

  return (
    <Player />
  )
}
```
