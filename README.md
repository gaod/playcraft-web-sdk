# Playcraft

Enjoy our latest update where we have fixed some bugs and improved our framework to provide you more stable playbacking experience.

Playcraft provides core player, video player and Premium+ player.

Core player has basic functionalities, and enables maximum customizations.

Video player is composed of core player and basic UI such as seekbar, play/pause button and loading icon.

Premium+ player wraps the logic of requesting video and verifying authorization, it also provides a control panel with basic control of playback, such like play, pause, seek ...etc.

Playcraft also provides Google Cast Sender integration and mini controller UI.

Currently, web player is based on [Bitmovin Player](https://bitmovin.com/docs/player).

## Getting Started

Install this package from git repository:

```
yarn add https://github.com/KKStream/playcraft-web-sdk#v1.4.0
```

Import, and compose `<VideoPlayer>` component to your app:

```jsx
import React from 'react'
import {VideoPlayer} from 'playcraft/react'

const MyApp = () => {
  return (
    <MyContainer>
      <VideoPlayer 
        source={{
          dash: 'https://dash.akamaized.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd'
        }}
        autoplay
        bitmovin={{
          key: 'my-license-key'
        }}
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

## API Reference

### `loadPlayer`

Load the player & return reference to player instance.

Currently, this load Bitmovin player with necessary modules based on current browser.

Reference to Bitmovin player object: https://bitmovin.com/docs/player/api-reference/web/web-sdk-api-reference-v8#/player/web/8/docs/interfaces/core.playerapi.html

```js
import {loadPlayer} from 'playcraft/core'

const player = await loadPlayer(
  document.querySelector('video'),
  options
)
```

### Plain JavaScript interface

While we can use the player object directly, this package also provides functions the works with all base players.

```js
import {
  subscribeMediaState,
  load,
  playOrPause,
  seek,
} from 'playcraft/core'
```

### `<VideoPlayer>`

Import with: `import {VideoPlayer} from 'playcraft/react'`.

Basic player component as a React component, a wrapper around Bitmovin player.

This renders video with basic player UI.

Example:

```js
<VideoPlayer 
  source={{
    dash: 'https://dash.akamaized.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd'
  }}
  autoplay
  bitmovin={{
    key: 'my-license-key'
  }}
/>
```

#### Props

**`style`**

Style of top level element of this component.

**`source`**

An object contains URLs to the MPEG-DASH manifest and HLS playlist for the video to play.

The player also support playback with video element built-in support, specify `source.native` to use it.

```js
{
  native: 'some url',
  dash: 'this will be ignored'
}
```

Props for other players (like Bitmovin) will be ignored if `source.native` is specified.

Currently changing base player is not implemented, please re-mount player component when changing from native to DASH / HLS.

**`autoplay`**

Start playback when player component is mounted.

Defaults to `false`.

**`autohide`**

Autohide player UI after no UI interaction after 3 seconds.

Defaults to `false`.

**`seekbar.marks`**

Time points to highlight on the seekbar.

**`seekbar.addons`**

Components to be rendered when seekbar is hovered.

**`bitmovin`**

[Bitmovin config](https://bitmovin.com/docs/player/api-reference/web/web-sdk-api-reference-v8#/player/web/8/docs/interfaces/core_config.playerconfig.html).

Bitmovin player will be loaded if this prop is specified.

**`shaka`**

⚠️ Warning: this prop is experimental.

[Shaka player config](https://shaka-player-demo.appspot.com/docs/api/tutorial-config.html)

Choose Shaka player instead of Bitmovin and give shaka config.

**`videoRef`**

Ref to html video element, use this for custom integrations.

**`playerRef`**

Ref to base player instance, use this for custom integrations.

**`onPlayerLoaded`**

Called when the player is loaded.

**Other Props**

Additional props will be passed to video element.

### `<Player>`

Import with: `import {Player} from 'playcraft'`.

Premium+ player is all-in-one React component with features pre-integrated, feature rich and fast to integrate with enterprise or product projects.

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

**`preload`**

Simillar to [`preload` of `<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload), controls preload behavior of player.

Options:

- `auto` (default): Automatically start playback session & fetch manifests.
- `none`: Playback session will be started when `.load()` is called, or when play button is tapped.

When `preload` is set to `none` without `coverImageUrl`, user can tap play button to start playback,
and in this case autoplay is always enabled, so `load()` calls will start playback even if `autoPlay` is set to `false`.

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

Handler for the back button, if not specified, back button will be hidden.

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
const adParams = { user: 'tim' }
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
