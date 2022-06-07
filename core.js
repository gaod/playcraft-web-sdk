import UAParser from 'ua-parser-js';
import 'axios';

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

/*! @license
 * Shaka Player
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let shaka;
const shakaLog = {
  v1: () => {}
};

const asMap = object => {
  const map = new Map();

  for (const key of Object.keys(object)) {
    map.set(key, object[key]);
  }

  return map;
};

const makeResponse = (headers, data, status, uri, responseURL, requestType) => {
  if (status >= 200 && status <= 299 && status != 202) {
    // Most 2xx HTTP codes are success cases.

    /** @type {shaka.extern.Response} */
    const response = {
      uri: responseURL || uri,
      originalUri: uri,
      data,
      status,
      headers,
      fromCache: !!headers['x-shaka-from-cache']
    };
    return response;
  }

  let responseText = null;

  try {
    responseText = shaka.util.StringUtils.fromBytesAutoDetect(data); // eslint-disable-next-line no-empty
  } catch (exception) {}

  const severity = status == 401 || status == 403 ? shaka.util.Error.Severity.CRITICAL : shaka.util.Error.Severity.RECOVERABLE;
  throw new shaka.util.Error(severity, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.BAD_HTTP_STATUS, uri, status, responseText, headers, requestType);
};

const goog = {
  asserts: {
    assert: () => {}
  }
};
/**
 * @summary A networking plugin to handle http and https URIs via the Fetch API.
 * @export
 */

class HttpFetchPlugin {
  /**
   * @param {string} uri
   * @param {shaka.extern.Request} request
   * @param {shaka.net.NetworkingEngine.RequestType} requestType
   * @param {shaka.extern.ProgressUpdated} progressUpdated Called when a
   *   progress event happened.
   * @param {shaka.extern.HeadersReceived} headersReceived Called when the
   *   headers for the download are received, but before the body is.
   * @return {!shaka.extern.IAbortableOperation.<shaka.extern.Response>}
   * @export
   */
  static parse(uri, request, requestType, progressUpdated, headersReceived) {
    const headers = new HttpFetchPlugin.Headers_();
    asMap(request.headers).forEach((value, key) => {
      headers.append(key, value);
    });
    const controller = new HttpFetchPlugin.AbortController_();
    /** @type {!RequestInit} */

    const init = {
      // Edge does not treat null as undefined for body; https://bit.ly/2luyE6x
      body: request.body || undefined,
      headers,
      method: request.method,
      signal: controller.signal,
      credentials: request.allowCrossSiteCredentials ? 'include' : undefined
    };
    /** @type {shaka.net.HttpFetchPlugin.AbortStatus} */

    const abortStatus = {
      canceled: false,
      timedOut: false
    };
    const pendingRequest = HttpFetchPlugin.request_(uri, requestType, init, abortStatus, progressUpdated, headersReceived, request.streamDataCallback);
    /** @type {!shaka.util.AbortableOperation} */

    const op = new shaka.util.AbortableOperation(pendingRequest, () => {
      abortStatus.canceled = true;
      controller.abort();
      return Promise.resolve();
    }); // The fetch API does not timeout natively, so do a timeout manually using
    // the AbortController.

    const timeoutMs = request.retryParameters.timeout;

    if (timeoutMs) {
      const timer = new shaka.util.Timer(() => {
        abortStatus.timedOut = true;
        controller.abort();
      });
      timer.tickAfter(timeoutMs / 1000); // To avoid calling |abort| on the network request after it finished, we
      // will stop the timer when the requests resolves/rejects.

      op.finally(() => {
        timer.stop();
      });
    }

    return op;
  }
  /**
   * @param {string} uri
   * @param {shaka.net.NetworkingEngine.RequestType} requestType
   * @param {!RequestInit} init
   * @param {shaka.net.HttpFetchPlugin.AbortStatus} abortStatus
   * @param {shaka.extern.ProgressUpdated} progressUpdated
   * @param {shaka.extern.HeadersReceived} headersReceived
   * @param {?function(BufferSource):!Promise} streamDataCallback
   * @return {!Promise<!shaka.extern.Response>}
   * @private
   */


  static async request_(uri, requestType, init, abortStatus, progressUpdated, headersReceived, streamDataCallback) {
    const fetch = HttpFetchPlugin.fetch_;
    const ReadableStream = HttpFetchPlugin.ReadableStream_;
    let response;
    let arrayBuffer;
    let loaded = 0;
    let lastLoaded = 0; // Last time stamp when we got a progress event.

    let lastTime = Date.now();

    try {
      // The promise returned by fetch resolves as soon as the HTTP response
      // headers are available. The download itself isn't done until the promise
      // for retrieving the data (arrayBuffer, blob, etc) has resolved.
      response = await fetch(uri, init); // At this point in the process, we have the headers of the response, but
      // not the body yet.

      headersReceived(HttpFetchPlugin.headersToGenericObject_(response.headers)); // Getting the reader in this way allows us to observe the process of
      // downloading the body, instead of just waiting for an opaque promise to
      // resolve.
      // We first clone the response because calling getReader locks the body
      // stream; if we didn't clone it here, we would be unable to get the
      // response's arrayBuffer later.

      const reader = response.clone().body.getReader();
      const contentLengthRaw = response.headers.get('Content-Length');
      const contentLength = contentLengthRaw ? parseInt(contentLengthRaw, 10) : 0;

      const start = controller => {
        const push = async () => {
          let readObj;

          try {
            readObj = await reader.read();
          } catch (e) {
            // If we abort the request, we'll get an error here.  Just ignore it
            // since real errors will be reported when we read the buffer below.
            shakaLog.v1('error reading from stream', e.message);
            return;
          }

          if (!readObj.done) {
            loaded += readObj.value.byteLength; // streamDataCallback adds stream data to buffer for low latency mode
            // 4xx response means a segment is not ready and can retry soon
            // only successful response data should be added, or playback freezes

            if (response.status === 200 && streamDataCallback) {
              await streamDataCallback(readObj.value);
            }
          }

          const currentTime = Date.now(); // If the time between last time and this time we got progress event
          // is long enough, or if a whole segment is downloaded, call
          // progressUpdated().

          if (currentTime - lastTime > 100 || readObj.done) {
            progressUpdated(currentTime - lastTime, loaded - lastLoaded, contentLength - loaded);
            lastLoaded = loaded;
            lastTime = currentTime;
          }

          if (readObj.done) {
            goog.asserts.assert(!readObj.value, 'readObj should be unset when "done" is true.');
            controller.close();
          } else {
            controller.enqueue(readObj.value);
            push();
          }
        };

        push();
      }; // Create a ReadableStream to use the reader. We don't need to use the
      // actual stream for anything, though, as we are using the response's
      // arrayBuffer method to get the body, so we don't store the
      // ReadableStream.


      new ReadableStream({
        start
      }); // eslint-disable-line no-new

      arrayBuffer = await response.arrayBuffer();
    } catch (error) {
      if (abortStatus.canceled) {
        throw new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.OPERATION_ABORTED, uri, requestType);
      } else if (abortStatus.timedOut) {
        throw new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.TIMEOUT, uri, requestType);
      } else {
        throw new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.HTTP_ERROR, uri, error, requestType);
      }
    }

    const headers = HttpFetchPlugin.headersToGenericObject_(response.headers);
    return makeResponse(headers, arrayBuffer, response.status, uri, response.url, requestType);
  }
  /**
   * @param {!Headers} headers
   * @return {!Object.<string, string>}
   * @private
   */


  static headersToGenericObject_(headers) {
    const headersObj = {};
    headers.forEach((value, key) => {
      // Since Edge incorrectly return the header with a leading new line
      // character ('\n'), we trim the header here.
      headersObj[key.trim()] = value;
    });
    return headersObj;
  }

}

HttpFetchPlugin.register = shakaNamespace => {
  shaka = shakaNamespace;
  /**
   * Overridden in unit tests, but compiled out in production.
   *
   * @const {function(string, !RequestInit)}
   * @private
   */

  HttpFetchPlugin.fetch_ = window.fetch;
  /**
   * Overridden in unit tests, but compiled out in production.
   *
   * @const {function(new: AbortController)}
   * @private
   */

  HttpFetchPlugin.AbortController_ = window.AbortController;
  /**
   * Overridden in unit tests, but compiled out in production.
   *
   * @const {function(new: ReadableStream, !Object)}
   * @private
   */

  HttpFetchPlugin.ReadableStream_ = window.ReadableStream;
  /**
   * Overridden in unit tests, but compiled out in production.
   *
   * @const {function(new: Headers)}
   * @private
   */

  HttpFetchPlugin.Headers_ = window.Headers;
  shaka.net.NetworkingEngine.registerScheme('http', HttpFetchPlugin.parse);
  shaka.net.NetworkingEngine.registerScheme('https', HttpFetchPlugin.parse);
  shaka.net.NetworkingEngine.registerScheme('blob', HttpFetchPlugin.parse);
};

/* eslint-disable indent */
const FairplayKeySystem = {
  prepareContentId: contentUri => {
    const uriParts = contentUri.split('://');
    const contentId = uriParts[1] || '';
    return uriParts[0].slice(-3).toLowerCase() === 'skd' ? contentId : '';
  },
  prepareCertificate: cert => new Uint8Array(cert),
  prepareMessage: (keyMessageEvent, keySession) => {
    const spc = encodeURIComponent(keyMessageEvent.messageBase64Encoded);
    const assetId = encodeURIComponent(keySession.contentId);
    return `spc=${spc}&asset_id=${assetId}`;
  },
  prepareLicense: license => {
    if (license.substr(0, 5) === '<ckc>' && license.substr(-6) === '</ckc>') {
      return license.slice(5, -6);
    }

    return license;
  }
};

const defaultCertificateUrl = url => `${url === null || url === void 0 ? void 0 : url.replace(/\/$/, '')}/fairplay_cert`;

/* eslint-disable no-param-reassign */

const convertShakaDrm = ({
  url
}) => ({
  servers: {
    'com.widevine.alpha': url,
    'com.microsoft.playready': url,
    'com.apple.fps.1_0': url
  },
  advanced: {
    'com.apple.fps.1_0': {
      serverCertificateUri: defaultCertificateUrl(url)
    }
  }
});

const getQualityItem = track => ({
  id: track.originalVideoId,
  bitrate: track.videoBandwidth,
  width: track.width,
  height: track.height,
  codec: track.videoCodec,
  frameRate: track.frameRate
});

const loadShaka = async ({
  videoElement,
  config = {},
  extraConfig = {}
}) => {
  const shaka = await import('shaka-player');
  shaka.polyfill.installAll();
  const player = new shaka.Player(videoElement);

  const getAvailableVideoQualities = () => player.getVariantTracks().reduce((trackList, currentTrack) => {
    const keepOrignalTrack = trackList.find(track => track.height === currentTrack.height);

    if (!keepOrignalTrack) {
      trackList.push(getQualityItem(currentTrack));
    }

    return trackList;
  }, []);

  const getVideoQuality = () => {
    const activeTrack = player.getVariantTracks().find(track => track.active);
    if (!activeTrack) return {};
    return getQualityItem(activeTrack);
  };

  HttpFetchPlugin.register(shaka);
  return {
    shaka,
    player,
    load: async ({
      dash,
      hls,
      drm
    }) => {
      player.configure({ ...config,
        drm: convertShakaDrm(drm),
        streaming: {
          useNativeHlsOnSafari: true
        }
      });
      player.getNetworkingEngine().registerRequestFilter((type, request) => {
        if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
          request.headers = { ...request.headers,
            ...drm.headers
          };
        }
      });
      /*
        In iOS Safari, native `canplay` would not be fired and keep loading forever.
        We need to fire `canplay` manually by shaka event, loaded.
      */

      player.addEventListener('loaded', () => {
        videoElement.dispatchEvent(new Event('canplay'));
      });
      videoElement.autoplay = extraConfig.autoplay;

      if (!videoElement.autoplay) {
        videoElement.muted = false;
      }

      const [assetUri, mimeType] = hls && (!dash || needNativeHls()) ? [hls, 'application/x-mpegURL'] : [dash];
      return player.load(assetUri, null, mimeType);
    },
    configure: config => player.configure(config),
    play: () => videoElement.play(),
    pause: () => videoElement.pause(),
    seek: time => {
      videoElement.currentTime = time;
    },
    seekRange: () => player.seekRange(),
    isLive: () => player === null || player === void 0 ? void 0 : player.isLive(),
    destroy: () => player === null || player === void 0 ? void 0 : player.destroy(),
    getCurrentTime: () => videoElement.currentTime,
    getDuration: () => videoElement.duration,
    getViewMode: () => 'fullscreen',
    getStreamType: () => 'dash',
    getVideoBufferLength: () => player.getBufferedInfo().video,
    getAudioBufferLength: () => player.getBufferedInfo().audio,
    setVolume: volume => {
      videoElement.volume = volume / 100;
    },
    unmute: () => {
      videoElement.muted = false;
    },
    mute: () => {
      videoElement.muted = true;
    },
    setPlaybackSpeed: rate => {
      videoElement.playbackRate = rate;
    },
    hasEnded: () => videoElement.ended,
    // TODO
    getSource: () => null,
    // TODO: implement this function
    getSupportedTech: () => [{
      player: 'html5',
      streaming: 'dash'
    }],
    getPlaybackSpeed: () => videoElement.playbackRate,
    getVideoElement: () => videoElement,
    setQuality: restrictions => {
      if (!restrictions) return; // FIXME: Setting restrictions to {} cannot enable abr.

      player.configure('abr.restrictions', restrictions);
    },
    getVideoQuality,
    getAvailableVideoQualities,
    getSubtitles: () => player.getTextTracks().map(track => ({
      label: track.label,
      value: track.language,
      enabled: track.active
    })),
    setSubtitleTrack: lang => {
      if (lang === 'off') {
        player === null || player === void 0 ? void 0 : player.setTextTrackVisibility(false);
        return;
      }

      player === null || player === void 0 ? void 0 : player.selectTextLanguage(lang);
      player === null || player === void 0 ? void 0 : player.setTextTrackVisibility(true);
    },
    getAudio: () => {
      const active = player === null || player === void 0 ? void 0 : player.getVariantTracks().find(track => track.active);
      return {
        lang: active === null || active === void 0 ? void 0 : active.language,
        label: active === null || active === void 0 ? void 0 : active.label
      };
    },
    getAudioList: () => player.getVariantTracks().map(track => ({
      lang: track.language,
      label: track.label
    })),
    setAudioTrack: lang => {
      if (!lang) return;
      player === null || player === void 0 ? void 0 : player.selectAudioLanguage(lang);
    },
    unload: () => player.unload(),
    getPresentationStartTimeAsDate: () => player.getPresentationStartTimeAsDate()
  };
};

const getDrmConfig = ({
  url,
  headers,
  widevine = {
    level: undefined
  },
  fairplay = {
    certificateURL: defaultCertificateUrl(url)
  }
}) => {
  if (!url) {
    return {};
  }

  return {
    widevine: {
      LA_URL: url,
      withCredentials: false,
      headers,
      ...((widevine === null || widevine === void 0 ? void 0 : widevine.level) && {
        videoRobustness: widevine === null || widevine === void 0 ? void 0 : widevine.level
      })
    },
    fairplay: {
      LA_URL: url,
      withCredentials: false,
      headers,
      certificateURL: fairplay.certificateURL,
      ...FairplayKeySystem
    },
    playready: {
      LA_URL: url,
      withCredentials: false,
      headers
    }
  };
};

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
  const bitmovinModules = [].concat(await import('bitmovin-player/modules/bitmovinplayer-engine-bitmovin'), nativeHls && (await import('bitmovin-player/modules/bitmovinplayer-engine-native')), await Promise.all([import('bitmovin-player/modules/bitmovinplayer-drm'), import('bitmovin-player/modules/bitmovinplayer-abr'), import('bitmovin-player/modules/bitmovinplayer-subtitles'), import('bitmovin-player/modules/bitmovinplayer-container-mp4')]), nativeHls && (await Promise.all([import('bitmovin-player/modules/bitmovinplayer-hls'), import('bitmovin-player/modules/bitmovinplayer-subtitles-native')])), !nativeHls && (await import('bitmovin-player/modules/bitmovinplayer-subtitles-vtt')), !nativeHls && (await import('bitmovin-player/modules/bitmovinplayer-xml')), !nativeHls && (await Promise.all([import('bitmovin-player/modules/bitmovinplayer-dash'), import('bitmovin-player/modules/bitmovinplayer-mserenderer'), import('bitmovin-player/modules/bitmovinplayer-polyfill')]))).filter(Boolean);
  bitmovinModules.forEach(module => Player.addModule(module.default));
  let adaptationHandler;
  const player = new Player(container, {
    ui: false,
    ...config,
    playback: { ...config.playback,
      autoplay
    },
    adaptation: { ...config.adaptation,
      onVideoAdaptation: data => {
        var _adaptationHandler;

        const availableQualities = player.getAvailableVideoQualities();
        return ((_adaptationHandler = adaptationHandler) === null || _adaptationHandler === void 0 ? void 0 : _adaptationHandler({
          availableQualities,
          suggested: availableQualities.find(item => item.id === data.suggested) || {
            id: data.suggested
          }
        })) || data.suggested;
      }
    }
  });

  player.setAdaptationHandler = handler => {
    adaptationHandler = handler;
  };

  player.getDrmConfig = getDrmConfig; // Mock Shaka player interface from shaka.js

  player.getSubtitles = () => {
    var _player$subtitles;

    return ((_player$subtitles = player.subtitles) === null || _player$subtitles === void 0 ? void 0 : _player$subtitles.list().map(track => ({
      label: track.label,
      value: track.lang,
      enabled: track.enabled
    }))) || [];
  };

  player.setSubtitleTrack = language => {
    var _subtitles$list;

    const {
      subtitles
    } = player;
    subtitles === null || subtitles === void 0 ? void 0 : (_subtitles$list = subtitles.list) === null || _subtitles$list === void 0 ? void 0 : _subtitles$list.call(subtitles).forEach(track => {
      // TODO consider multiple subtitles
      subtitles[language === track.lang ? 'enable' : 'disable'](track.id); // Safari need to fire cueExit manually.

      if (language === 'off') subtitles.cueExit();
    });
  };

  player.getAudioList = () => player.getAvailableAudio();

  player.setAudioTrack = language => {
    const track = player.getAvailableAudio().find(audio => audio.lang === language);

    if (track) {
      player.setAudio(track.id);
    }
  };

  player.setVideoElement(videoElement); // For a paused live stream, Bitmovin constantly download latest segments and update,
  // and may unexpectedly resume playing when playing vod-to-live, so set speed 0 to prevent.
  // #CPT-1783

  player.on(PlayerEvent.Play, () => {
    if (player.isLive()) {
      player.setPlaybackSpeed(1);
    }
  });
  player.on(PlayerEvent.Paused, () => {
    if (player.isLive()) {
      player.setPlaybackSpeed(0);
    }
  });
  player.on(PlayerEvent.SourceLoaded, () => {
    if (player.isLive()) {
      // eslint-disable-next-line no-param-reassign
      player.setPlaybackSpeed(1); // no video event fires when live stream loaded, fire one so that we can handle like VOD

      videoElement.dispatchEvent(new Event('canplay'));
    }
  });
  player.on(PlayerEvent.Error, info => {
    var _window$Sentry;

    const error = new Error(`Player: ${info.code}/${info.name}`);
    console.warn(info);

    if (/The video element has thrown a media error|Video element triggered an Error/.test(info.message)) {
      return;
    }

    (_window$Sentry = window.Sentry) === null || _window$Sentry === void 0 ? void 0 : _window$Sentry.captureException(error);
    videoElement.dispatchEvent(Object.assign(new CustomEvent('error'), {
      error: info,
      message: `Player Error: ${info.code}/${info.name}`
    }));
  });
  player.on(PlayerEvent.StallStarted, () => videoElement.dispatchEvent(new Event('waiting')));
  return player;
};

const loadPlayer = async (videoElement, {
  container,
  autoplay,
  source,
  shaka,
  bitmovin
}) => {
  if (source !== null && source !== void 0 && source.native) {
    const player = await loadNative({
      videoElement
    });
    return player;
  } // default to Shaka


  if (shaka || !bitmovin) {
    const player = await loadShaka({
      videoElement,
      config: shaka,
      extraConfig: {
        autoplay
      }
    });
    videoElement.dispatchEvent(new CustomEvent('playerStarted'));
    return player;
  }

  if (bitmovin) {
    const player = await loadBitmovin({
      container,
      videoElement,
      autoplay,
      config: bitmovin
    });
    videoElement.dispatchEvent(new CustomEvent('playerStarted'));
    return player;
  } // TODO load other players: dash.js, hls.js

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


const SHAKA_LIVE_DURATION = 4294967296;

const isFinite = duration => duration < SHAKA_LIVE_DURATION;

const getMediaTime = (media, plugins = []) => {
  const {
    duration,
    ...data
  } = Object.assign({
    currentTime: media.currentTime,
    bufferTime: Math.max(...Array.from({
      length: media.buffered.length
    }, (_, index) => media.buffered.end(index))),
    duration: media.initialDuration // monkey patched, duration may change for DASH playback

  }, ...plugins.map(plugin => {
    var _plugin$getPlaybackSt2;

    return (_plugin$getPlaybackSt2 = plugin.getPlaybackStatus) === null || _plugin$getPlaybackSt2 === void 0 ? void 0 : _plugin$getPlaybackSt2.call(plugin);
  }));
  return { ...data,
    ...((!isFinite(media.initialDuration) || Math.abs(media.duration - media.initialDuration) < 0.1) && {
      duration
    })
  };
};

const load = async (media, {
  player,
  drm,
  startTime,
  plugins = []
}, source) => {
  var _player$getSupportedT;

  const streamFormat = (_player$getSupportedT = player.getSupportedTech) === null || _player$getSupportedT === void 0 ? void 0 : _player$getSupportedT.call(player)[0].streaming;
  const merged = await plugins.reduce(async (loadChain, plugin) => {
    var _plugin$load;

    const currentSource = await loadChain;
    const manifestItem = currentSource.info[streamFormat];
    const overrides = await ((_plugin$load = plugin.load) === null || _plugin$load === void 0 ? void 0 : _plugin$load.call(plugin, manifestItem, {
      video: media,
      player,
      source: currentSource,
      streamFormat,
      startTime
    }));
    return overrides ? { ...currentSource,
      [streamFormat]: overrides.url,
      ...(typeof overrides.startTime === 'number' && {
        startTime: overrides.startTime
      })
    } : currentSource;
  }, { ...source,
    startTime
  });
  media.addEventListener('durationchange', () => {
    // media duration may change when playing VOD to live or SSAI streams, save it here for convenience
    media.initialDuration = media.duration;
  }, {
    once: true
  });
  const {
    startTime: loadStartTime,
    ...config
  } = merged;
  return player.unload().then(() => {
    var _player$getDrmConfig;

    return (// TODO drm is Bitmovin form, but should be agnostic
      player.load({ ...config,
        drm: ((_player$getDrmConfig = player.getDrmConfig) === null || _player$getDrmConfig === void 0 ? void 0 : _player$getDrmConfig.call(player, drm)) || drm,
        options: {
          startTime: loadStartTime
        }
      })
    );
  }).catch(error => {
    media.dispatchEvent(Object.assign(new CustomEvent('error'), {
      error
    }));
  });
};

const seek = (media, {
  player,
  plugins = []
}, time, issuer) => {
  // TODO skip seeking to too near point, consider SSAI cases
  const seekPlugin = plugins.find(plugin => typeof plugin.handleSeek === 'function' && plugin.isActive());

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

export { getMediaTime, load, loadPlayer, seek };
