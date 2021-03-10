# Playcraft

Enjoy our latest update where we have fixed some bugs and improved our framework to provide you more stable playbacking experience.

Playcraft wraps the logic of requesting video and verifying authorization, it also provides a control panel with basic control of playback, such like play, pause, seek ...etc.

Playcraft also provides Google Cast Sender integration and mini controller UI.

Currently, web player is based on [Bitmovin Player](https://bitmovin.com/docs/player).

## Getting Started

Install this package from git repository:

```
yarn add git+ssh://git@github.com:KKStream/playcraft-web-sdk#v1.2.0
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

### Legacy Browser Support

To deliver better experience, this package provides bundles with modern syntax for smaller bundle, but legacy browser is still compatible.

If your app is required to legacy browsers, make sure `@babel/preset-env` is configured correctly and polyfills are installed.

Currently polyfills may be required for these features :

- [ResizeObserver](https://github.com/juggle/resize-observer)

## API Reference

### `<Player>`

Import with: `import {Player} from 'playcraft'`.

The player React component to integrate with React based enterprise projects, highly customized, less flexible but easy & fast to use.

#### Props for Source and playback Server

**`host`**
  
URL of playback server.

**`content`**

An object defines content to play, the shape is `{contentType, contentId}`.
Possible content types are: `videos`, `lives`.

This object is extensibe if needed, like **`licenseId`** is added to indetify license.

**`accessToken`**

Access token of current user, this is optional if access control is not needed.

This will be added to header `Authorization` of playback API requests.

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

**`autoPlay`**

Start playback when player component is mounted.

Defaults to `false`.

**`quality`**

Prefered quality to play, specify by height of resolution like `720`, `1080`, if specified height doesn't exist, a higher resolution will be used.

Since the player plays with adaptive bitrate, quality is actually defined max resultion can be adoptd.

#### Props for Advanced Features

**`deviceId`**

Unique identifier of current device, needed for concurrent device count limit.

**`autoPlayNext`**

When playback time reached `end_start_position` or end first time, show an UI with image of next episode prompt user to play next episode, and countdown for 10 seconds before playing automatically.

This takes effect of if the video have next episode.

Defaults to `false`.

**`thumbnailSeeking`**

Option to enable / disable thumbnail seeking, if enabled but not available, thumbnails won't be shown.

Default is `false`.

#### Props for player events

**`onError`**

**`onSourceLoaded`**

**`onPlay`**

**`onPlaying`**

**`onSeek`**

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

**`onEnded`**

**`onViewModeChange`**

**`onChangeVideo`**

Example:

```js
  ({
    videoId // This is the video id that the player wants to change.
  }) => {}
```

**`onBack`**

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
