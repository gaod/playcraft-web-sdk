import UAParser from 'ua-parser-js';

/* eslint-disable no-param-reassign */
const loadNative = ({
  videoElement
}) => ({
  load: ({
    native: url
  }) => {
    videoElement.src = url;
    videoElement.style.height = '100%';
    videoElement.style.width = '100%';
  },
  play: () => videoElement.play(),
  pause: () => videoElement.pause(),
  seek: time => {
    videoElement.currentTime = time;
  },
  getVideoElement: () => videoElement,
  getVideoQuality: () => ({}),
  destroy: () => {}
});

/* eslint-disable no-plusplus */
new UAParser();
function needNativeHls() {
  // Don't let Android phones play HLS, even if some of them report supported
  // This covers Samsung & OPPO special cases
  const isAndroid = /android/i.test(navigator.userAgent); // canPlayType isn't reliable across all iOS verion / device combinations, so also check user agent

  const isSafari = /^((?!chrome|android).)*(safari|iPad|iPhone)/i.test(navigator.userAgent); // ref: https://stackoverflow.com/a/12905122/4578017
  // none of our supported browsers other than Safari response to this

  const canPlayHls = document.createElement('video').canPlayType('application/vnd.apple.mpegURL');
  return isAndroid || /firefox/i.test(navigator.userAgent) ? '' : isSafari ? 'maybe' : canPlayHls;
}

const loadBitmovin = async ({
  container,
  videoElement,
  autoplay,
  config = {}
}) => {
  // Don't move module paths to array or other variables! they need to be resolved by bundlers
  const {
    Player,
    PlayerEvent
  } = await import('bitmovin-player/modules/bitmovinplayer-core');
  const nativeHls = needNativeHls();
  const bitmovinModules = [].concat(await import('bitmovin-player/modules/bitmovinplayer-engine-bitmovin'), nativeHls && (await import('bitmovin-player/modules/bitmovinplayer-engine-native')), await Promise.all([import('bitmovin-player/modules/bitmovinplayer-drm'), import('bitmovin-player/modules/bitmovinplayer-abr'), import('bitmovin-player/modules/bitmovinplayer-subtitles'), import('bitmovin-player/modules/bitmovinplayer-container-mp4'), import('bitmovin-player/modules/bitmovinplayer-style')]), nativeHls && (await Promise.all([import('bitmovin-player/modules/bitmovinplayer-hls.js'), import('bitmovin-player/modules/bitmovinplayer-subtitles-native.js')])), !nativeHls && (await import('bitmovin-player/modules/bitmovinplayer-subtitles-vtt')), !nativeHls && (await import('bitmovin-player/modules/bitmovinplayer-xml')), !nativeHls && (await Promise.all([import('bitmovin-player/modules/bitmovinplayer-dash'), import('bitmovin-player/modules/bitmovinplayer-mserenderer'), import('bitmovin-player/modules/bitmovinplayer-polyfill')]))).filter(Boolean);
  bitmovinModules.forEach(module => Player.addModule(module.default));
  const configs = {
    tweaks: {
      native_hls_parsing: true
    },
    ui: false,
    ...config,
    playback: { ...config.playback,
      autoplay
    }
  };
  const player = new Player(container, configs);
  player.setVideoElement(videoElement);
  player.on(PlayerEvent.SourceLoaded, () => {
    if (player.isLive()) {
      // eslint-disable-next-line no-param-reassign
      player.setPlaybackSpeed(1); // no video event fires when live stream loaded, fire one so that we can handle like VOD

      videoElement.dispatchEvent(new Event('canplay'));
    }
  });
  player.on(PlayerEvent.Error, data => {
    var _window$Sentry;

    const error = new Error(`Player: ${data.code}/${data.name}`);
    console.error(error);
    (_window$Sentry = window.Sentry) === null || _window$Sentry === void 0 ? void 0 : _window$Sentry.captureException(error);
    videoElement.dispatchEvent(new ErrorEvent('PlayerError', {
      error,
      message: `Player Error: ${data.code}/${data.name}`
    }));
  });
  return player;
};

const loadPlayer = async (videoElement, {
  container,
  autoplay,
  source,
  bitmovin
}) => {
  if (source !== null && source !== void 0 && source.native) {
    const player = await loadNative({
      videoElement
    });
    return player;
  }

  if (bitmovin) {
    const player = await loadBitmovin({
      container,
      videoElement,
      autoplay,
      config: bitmovin
    });
    return player;
  } // TODO load other players: shaka, dash.js, hls.js

};

const on = (target, name, handler) => {
  target.addEventListener(name, handler);
  return () => target.removeEventListener(name, handler);
};

const once = (target, name, handler) => {
  const oneTime = (...args) => {
    handler(...args);
    target.removeEventListener(name, oneTime);
  };

  target.addEventListener(name, oneTime);
  return () => target.removeEventListener(name, oneTime);
};

/* eslint-disable no-param-reassign */

const getMediaElementState = (media, plugins) => {
  const overrides = plugins.map(plugin => {
    var _plugin$getPlaybackSt;

    return (_plugin$getPlaybackSt = plugin.getPlaybackStatus) === null || _plugin$getPlaybackSt === void 0 ? void 0 : _plugin$getPlaybackSt.call(plugin);
  });
  return Object.assign({
    paused: media.paused,
    ended: media.ended,
    currentTime: media.currentTime,
    duration: media.duration
  }, ...overrides);
};

const subscribeMediaState = (media, updateState, plugins = []) => {
  let state = {
    playbackState: 'init',
    waiting: false,
    ...getMediaElementState(media, plugins)
  };

  const syncState = update => {
    const videoElementState = getMediaElementState(media, plugins); // when playing SSAI stream,
    // sometimes duration changes to wrong value when playing an ad

    const overrides = state.duration > 0 ? {
      duration: state.duration
    } : {};
    state = { ...state,
      ...videoElementState,
      ...overrides,
      ...update
    }; // TODO consider shallow equal?

    updateState(state);
  };

  const registered = [on(media, 'error', () => syncState({
    playbackState: 'error',
    waiting: false
  })), on(media, 'waiting', () => syncState({
    waiting: true
  })), on(media, 'stalled', () => {
    // Safari fires stalled events randomly.
    // Maybe we could ignore this event in paused state.
    if (media.paused) {
      return;
    }

    syncState({
      waiting: true
    });
  }), on(media, 'loadstart', () => syncState({
    seekEnabled: false,
    duration: 0,
    playbackState: 'loading',
    waiting: true
  })), on(media, 'canplay', () => syncState({
    playbackState: 'canplay',
    waiting: false
  })), on(media, 'play', syncState, syncState({
    paused: false
  })), on(media, 'paused', () => syncState({
    playbackState: 'paused',
    waiting: false
  })), on(media, 'seeking', () => syncState({
    waiting: true
  })), on(media, 'seeked', () => syncState({
    waiting: false
  })), on(media, 'timeupdate', () => syncState(!media.paused && {
    playbackState: 'playing',
    waiting: false
  })), on(media, 'ended', () => syncState({
    playbackState: 'ended'
  })), on(media, 'durationchange', () => {
    syncState({
      seekEnabled: Number.isFinite(media.duration)
    });
  })];
  syncState();
  return () => registered.forEach(off => off());
}; // TODO maybe adContainer is too specific for core, we should find a better place for it


const load = async (media, {
  player,
  plugins = [],
  adContainer
}, source) => {
  var _player$getSupportedT;

  const streamFormat = (_player$getSupportedT = player.getSupportedTech) === null || _player$getSupportedT === void 0 ? void 0 : _player$getSupportedT.call(player)[0].streaming;
  const merged = await plugins.reduce(async (loadChain, plugin) => {
    var _plugin$load;

    const currentSource = await loadChain;
    const manifestItem = currentSource.manifests[streamFormat];
    const overrides = await ((_plugin$load = plugin.load) === null || _plugin$load === void 0 ? void 0 : _plugin$load.call(plugin, manifestItem, {
      video: media,
      player,
      adContainer,
      source: currentSource
    }));

    if (overrides) {
      const {
        url,
        startTime
      } = overrides;
      return { ...currentSource,
        [streamFormat]: url,
        ...(startTime && {
          options: { ...currentSource,
            startTime
          }
        })
      };
    }

    return currentSource;
  }, source);
  return player.load(merged);
};

const playOrPause = (media, {
  player
}) => {
  if (media.ended) {
    player.seek(0);
  }

  if (media.paused) {
    // can't handle this at all, and safe to ignore
    media.play().catch(error => console.warn(error));
    return player.play().catch(error => console.warn(error));
  }

  return media.pause();
};

const seek = (media, {
  player,
  plugins = []
}, time, issuer) => {
  // TODO skip seeking to too near point, consider SSAI cases
  const seekPlugin = plugins.find(plugin => typeof plugin.handleSeek === 'function');

  const seekInternal = seekTime => {
    // when playing DASH, must call player.seek to make it work
    player.seek(seekTime, issuer); // player.seek sets time after adding segments,
    // set again to reflect instantly

    media.currentTime = seekTime;
    media.dispatchEvent(new Event('seeking'));
    once(media, 'seeked', () => {
      // when seeking to the end it may result in a few seconds earlier
      if (Math.abs(seekTime - media.currentTime) > 0.5) {
        media.currentTime = seekTime;
      }
    });
  };

  if (seekPlugin) {
    seekPlugin.handleSeek(time, seekInternal);
  } else {
    seekInternal(time);
  }
};

export { load, loadPlayer, playOrPause, seek, subscribeMediaState };
