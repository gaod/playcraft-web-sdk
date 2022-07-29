import axios from 'axios';
import mitt from 'mitt';
import UAParser from 'ua-parser-js';
import 'core-js/proposals/relative-indexing-method';

/* eslint-disable no-param-reassign */

const waitMs = time => new Promise(resolve => {
  setTimeout(resolve, time);
});

const handleRequestError = (result, {
  onError,
  retryTimes = 0
}) => result.catch(error => onError(error, {
  retry: () => handleRequestError(axios(error.config), {
    onError,
    retryTimes: retryTimes + 1
  }),
  retryTimes
}));

const ignoreMinorError = async (event, {
  retry,
  retryTimes
} = {}) => {
  var _event$response, _event$response2, _event$config;

  console.warn(event);

  if ((((_event$response = event.response) === null || _event$response === void 0 ? void 0 : _event$response.message) === 'Network Error' || /502|503/.test((_event$response2 = event.response) === null || _event$response2 === void 0 ? void 0 : _event$response2.status)) && retryTimes < 3) {
    await waitMs(3000);
    return retry();
  }

  if (/start$|info$|heartbeat$/.test((_event$config = event.config) === null || _event$config === void 0 ? void 0 : _event$config.url)) {
    return Promise.reject(event);
  }

  console.log('Ignore non-critical playback API fail', event);
  return new Promise(() => {});
};

const createApi = ({
  host,
  accessToken,
  deviceId,
  headers,
  params
}, {
  onError = ignoreMinorError
} = {}) => {
  const getHeaders = () => ({ ...(accessToken && {
      Authorization: accessToken
    }),
    ...(deviceId && {
      'X-Device-ID': deviceId
    }),
    'Content-type': 'application/json',
    ...headers
  });

  const request = (url, {
    method
  } = {}) => handleRequestError(axios(url, {
    method,
    headers: getHeaders(),
    params
  }), {
    onError
  }).then(response => response.data);

  const sessionRequest = (path, {
    method = 'POST',
    type,
    id,
    token
  }) => handleRequestError(axios(`${host}/sessions/${type}/${id}/playback/${deviceId}/${path}`, {
    method,
    headers: getHeaders(),
    params: { ...params,
      playback_token: token
    }
  }), {
    onError
  }).then(response => response.data);

  return {
    getContent: ({
      type,
      id
    }) => request(`${host}/${type}/${id}`, {}),
    startPlayback: ({
      type,
      id
    }) => request(`${host}/sessions/${type}/${id}/playback/${deviceId}/start`, {
      method: 'POST'
    }),
    getPlaybackInfo: ({
      type,
      id,
      token
    }) => sessionRequest('info', {
      method: 'GET',
      type,
      id,
      token
    }),
    heartbeat: ({
      type,
      id,
      token
    }) => sessionRequest('heartbeat', {
      type,
      id,
      token
    }),
    updateLastPlayed: ({
      type,
      id,
      token,
      time
    }) => sessionRequest(`position/${Math.floor(time)}`, {
      type,
      id,
      token
    }),
    endPlayback: ({
      type,
      id,
      token
    }) => sessionRequest('end', {
      type,
      id,
      token
    })
  };
};

const getStreamInfo = (sources = [], {
  type = '',
  licenseUri,
  certificateUri = `${licenseUri}/fairplay_cert`,
  licenseHeaders: headers,
  thumbnailEnabled
} = {}) => {
  const activeSource = sources.find(source => (source.subdub || source.type) === type) || sources[0];
  return ((activeSource === null || activeSource === void 0 ? void 0 : activeSource.manifests) || []).map(manifest => ({ ...manifest,
    type: manifest.protocol,
    src: manifest.url,
    drm: {
      fairplay: {
        licenseUri,
        certificateUri,
        headers
      },
      widevine: {
        licenseUri,
        headers
      },
      playready: {
        licenseUri,
        headers
      }
    },
    qualityOptions: manifest.resolutions.map(({
      height
    }) => ({
      label: height,
      value: height,
      options: {
        maxHeight: height
      }
    }))
  })).concat(thumbnailEnabled && activeSource !== null && activeSource !== void 0 && activeSource.thumbnail_seeking_url ? {
    type: 'thumbnail',
    src: activeSource.thumbnail_seeking_url
  } : []);
};

const getContentInfo = data => {
  var _data$time, _data$time2;

  return {
    title: data.title,
    channelTitle: data.subtitle,
    channelIcon: data.image_url,
    end: data.end,
    section: {
      id: data.section_id,
      start: data.start_time,
      end: data.end_time
    },
    previous: data.prev_video,
    next: data.next_video,
    startTime: (_data$time = data.time) === null || _data$time === void 0 ? void 0 : _data$time.last_position,
    chapters: [((_data$time2 = data.time) === null || _data$time2 === void 0 ? void 0 : _data$time2.end_start_position) && {
      type: 'ending',
      start: data.time.end_start_position
    }].filter(Boolean)
  };
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

const EnvironmentErrorName = {
  NOT_SUPPORT_DEVICE: 'KKS.ERROR.DEVICE_IS_NOT_SUPPORTED',
  NOT_SUPPORT_OS: 'KKS.ERROR.OS_IS_NOT_SUPPORTED',
  NOT_SUPPORT_OS_VERSION: 'KKS.ERROR.PLEASE_UPGRADE_OS',
  NOT_SUPPORT_BROWSER: 'KKS.ERROR.BROWSER_IS_NOT_SUPPORTED',
  NOT_SUPPORT_BROWSER_VERSION: 'KKS.ERROR.PLEASE_UPGRADE_BROWSER'
};

/* eslint-disable no-plusplus */
const parser = new UAParser();
function getOS() {
  return parser.getOS();
}
function getDevice() {
  const device = parser.getDevice();
  const osName = getOS().name;
  if (device.type === undefined && osName === 'Android') device.type = 'tablet';
  return device;
}
function getBrowser() {
  return parser.getBrowser();
}
function needNativeHls() {
  // Don't let Android phones play HLS, even if some of them report supported
  // This covers Samsung & OPPO special cases
  const isAndroid = /android/i.test(navigator.userAgent); // canPlayType isn't reliable across all iOS verion / device combinations, so also check user agent

  const isSafari = /^((?!chrome|android).)*(safari|iPad|iPhone)/i.test(navigator.userAgent); // ref: https://stackoverflow.com/a/12905122/4578017
  // none of our supported browsers other than Safari response to this

  const canPlayHls = document.createElement('video').canPlayType('application/vnd.apple.mpegURL');
  return isAndroid || /firefox/i.test(navigator.userAgent) ? '' : isSafari ? 'maybe' : canPlayHls;
}

function compareVersion(v1, v2) {
  if (!/\d+(\.\d+)*/.test(v1)) throw Error(`the version format ${v1} is wrong`);
  if (!/\d+(\.\d+)*/.test(v2)) throw Error(`the version format ${v2} is wrong`);
  const v1parts = v1.split('.').map(p => Number(p));
  const v2parts = v2.split('.').map(p => Number(p));

  for (let i = 0, I = Math.max(v1parts.length, v2parts.length); i < I; i++) {
    if (v1parts[i] !== v2parts[i]) {
      return (v1parts[i] || 0) - (v2parts[i] || 0);
    }
  }

  return 0;
}

const validateEnvironment = (supportEnvironmentList = []) => {
  if (supportEnvironmentList.length === 0) {
    return;
  }

  const device = getDevice();
  const os = getOS();
  const browser = getBrowser();

  const toUnique = list => Array.from(new Set(list));

  const validators = [{
    filter: ({
      device: {
        name,
        type
      }
    }) => name === '*' || type === 'desktop' && device.type === undefined || type === device.type,
    errorName: EnvironmentErrorName.NOT_SUPPORT_DEVICE,
    getErrorProps: list => ({
      allowDevices: toUnique(list.map(env => env.device.type))
    })
  }, {
    filter: ({
      os: {
        name
      }
    }) => name === '*' || name === os.name,
    errorName: EnvironmentErrorName.NOT_SUPPORT_OS,
    getErrorProps: list => ({
      allowOSs: toUnique(list.map(env => env.os.name))
    })
  }, {
    filter: ({
      os: {
        version
      }
    }) => version === '*' || compareVersion(os.version, version) >= 0,
    errorName: EnvironmentErrorName.NOT_SUPPORT_OS_VERSION,
    getErrorProps: list => ({
      minVersion: list[0].os.version
    })
  }, {
    filter: ({
      browser: {
        name
      }
    }) => name === browser.name,
    errorName: EnvironmentErrorName.NOT_SUPPORT_BROWSER,
    getErrorProps: list => ({
      allowBrowsers: toUnique(list.map(env => env.browser.name))
    })
  }, {
    filter: ({
      browser: {
        version
      }
    }) => compareVersion(browser.version, version) >= 0,
    errorName: EnvironmentErrorName.NOT_SUPPORT_BROWSER_VERSION,
    getErrorProps: list => ({
      minVersion: list[0].browser.version
    })
  }];
  let scopes = supportEnvironmentList;

  for (let i = 0; i < validators.length; i++) {
    const validator = validators[i];
    const newScopes = scopes.filter(validator.filter);

    if (newScopes.length === 0) {
      return {
        name: validator.errorName,
        ...validator.getErrorProps(scopes)
      };
    }

    scopes = newScopes;
  }
}; // Some touch devices with a mouse can't be distinguished, assume no mouse

/* eslint-disable no-param-reassign */
const VideoSourceTypeMap = {
  'application/dash+xml': {
    sourceKeyName: 'dash',
    extension: 'mpd'
  },
  'application/x-mpegurl': {
    sourceKeyName: 'hls',
    extension: 'm3u8'
  }
};
const mimeTypes = {
  hls: 'application/x-mpegurl',
  dash: 'application/dash+xml'
};

const getExtensionByType = srcType => {
  var _VideoSourceTypeMap$s;

  return (_VideoSourceTypeMap$s = VideoSourceTypeMap[srcType]) === null || _VideoSourceTypeMap$s === void 0 ? void 0 : _VideoSourceTypeMap$s.extension;
};

const isStringSourceWithProperExtension = (url, srcType) => {
  if (typeof url === 'string') {
    const extension = url.split('.').at(-1); // eslint-disable-next-line eqeqeq

    if (extension == getExtensionByType(srcType)) return true;
  }

  return false;
};

const matchType = (source, manifestType) => {
  var _source$type, _source$type2;

  return ((_source$type = source.type) === null || _source$type === void 0 ? void 0 : _source$type.includes(manifestType)) || ((_source$type2 = source.type) === null || _source$type2 === void 0 ? void 0 : _source$type2.toLowerCase()) === mimeTypes[manifestType] || isStringSourceWithProperExtension(source.src || source, manifestType);
};

const getDrmOptions = fallbackDrm => {
  if (!(fallbackDrm !== null && fallbackDrm !== void 0 && fallbackDrm.url)) {
    return;
  }

  const drmOptions = {
    licenseUri: fallbackDrm.url,
    headers: fallbackDrm.headers
  };
  return {
    widevine: drmOptions,
    fairplay: { ...drmOptions,
      certificateUri: `${fallbackDrm.url}/fairplay_cert`
    },
    playready: drmOptions
  };
};
/**
 * @typedef {{src: string, type: string}} SourceObject
 * @typedef {{hls: string, dash: string}} SourceObjectAlt backward compatiable form
 *
 * @param {SourceObject[]|SourceObject|SourceObjectAlt|string} sourceOptions
 * @param {{preferManifestType?: ('dash'|'hls')}} options
 * @return {{src: string, type: string, drm: Object}}
 */


const getSource = (sourceOptions, {
  preferManifestType,
  fallbackDrm
} = {}) => {
  if (sourceOptions.dash || sourceOptions.hls) {
    const {
      dash,
      hls
    } = sourceOptions;
    return getSource([hls && {
      src: hls,
      type: mimeTypes.hls
    }, dash && {
      src: dash,
      type: mimeTypes.dash
    }].filter(Boolean), {
      preferManifestType,
      fallbackDrm
    });
  }

  if (!Array.isArray(sourceOptions)) {
    return getSource([sourceOptions], {
      preferManifestType,
      fallbackDrm
    });
  }

  if (fallbackDrm) {
    return getSource(sourceOptions.map(option => ({ ...(option.src ? option : {
        src: option
      }),
      drm: getDrmOptions(fallbackDrm)
    })), {
      preferManifestType
    });
  }

  const matched = sourceOptions.find(source => !preferManifestType || matchType(source, preferManifestType));
  const selected = matched || sourceOptions[0];

  if (!selected) {
    return;
  }

  const type = matched && preferManifestType === 'hls' && mimeTypes.hls;
  return { ...(selected.src ? selected : {
      src: selected
    }),
    type
  };
};

const matchAll = (input, pattern) => {
  const flags = [pattern.global && 'g', pattern.ignoreCase && 'i', pattern.multiline && 'm'].filter(Boolean).join('');
  const clone = new RegExp(pattern, flags);
  return Array.from(function* () {
    let matched = true;

    while (1) {
      matched = clone.exec(input);

      if (!matched) {
        return;
      }

      yield matched;
    }
  }());
};

const rewriteUrls = (manifest, sourceUrl) => manifest.replace(/((#EXT-X-MEDIA:.*URI=")([^"]*))|((#EXT-X-STREAM-INF.*\n)(.*)(?=\n))/g, (...matches) => [matches[2], matches[5], new URL(matches[3] || matches[6], sourceUrl)].filter(Boolean).join(''));

const filterHlsManifestQualities = (manifest, filter) => {
  if (!filter) {
    return;
  }

  const profiles = matchAll(manifest, /RESOLUTION=(\d+)x(\d+)/g).map(([, width, height]) => ({
    width: +width,
    height: +height
  }));
  const allowed = filter(profiles) || profiles;
  const newManifest = manifest.replace(/#EXT-X-STREAM-INF.*RESOLUTION=(\d+)x(\d+).*\n.*\n/g, (item, width, height) => allowed.some(p => p.width === +width && p.height === +height) ? item : '');
  return newManifest !== manifest && newManifest;
};

const meetRestriction = (quality, {
  minHeight,
  maxHeight
} = {}) => !(quality.height < minHeight || quality.height > maxHeight);

const selectHlsQualities = async (source, restrictions = {}) => {
  if (!needNativeHls() || !(restrictions.minHeight || restrictions.maxHeight)) {
    return source;
  }

  const selected = getSource(source, {
    preferManifestType: 'hls'
  });

  if (!((selected === null || selected === void 0 ? void 0 : selected.type.toLowerCase()) === mimeTypes.hls)) {
    return source;
  }

  const filtered = filterHlsManifestQualities((await axios.get(selected.src)).data, items => items.filter(item => meetRestriction(item, restrictions)));

  if (filtered) {
    return { ...selected,

      /*
        Native Safari couldn't support blob .m3u8. and will throw MediaError: 4
        We find the hacky method: dataURI.
        By the way, bitmovin also use this form even user gives the blob URI.
      */
      src: `data:application/x-mpegURL,${encodeURI(rewriteUrls(filtered, selected.src))}`
    };
  }

  return source;
};
 // for unit test

/* eslint-disable no-param-reassign */

const SHAKA_LIVE_DURATION = 4294967296;

const isLiveDuration = duration => duration < SHAKA_LIVE_DURATION;

const deepEqual = (current, updated) => JSON.stringify(current) === JSON.stringify(updated);

const HEARTBEAT_INTERVAL_MS = 10000;
const UPDATE_INTERVAL_MS = 10000;

const isContentExpired = content => typeof (content === null || content === void 0 ? void 0 : content.end_time) === 'number' && content.end_time * 1000 <= Date.now();

const startPlaybackSession = async (playbackApi, options = {}) => {
  const emitter = mitt();
  const {
    type,
    id,
    getCurrentTime,
    cache,
    media
  } = options;
  const {
    onChangeContent,
    onSourceChange,
    onInvalidToken,
    onSessionStart,
    requestNewSession,
    heartbeatTime = HEARTBEAT_INTERVAL_MS,
    updateTime = UPDATE_INTERVAL_MS
  } = options;
  const state = {}; // get last playback time to start playback fast
  // getContent is not critical, so don't block playback if it hangs or fails(ignored in API logic)

  const loadContent = () => {
    var _options$cache, _options$cache$get;

    return Promise.race([// eslint-disable-next-line no-use-before-define
    updateContent((_options$cache = options.cache) === null || _options$cache === void 0 ? void 0 : (_options$cache$get = _options$cache.get(`${type}/${id}`)) === null || _options$cache$get === void 0 ? void 0 : _options$cache$get.content), new Promise(resolve => {
      setTimeout(resolve, UPDATE_INTERVAL_MS);
    })]);
  };

  const getPlaybackInfo = async () => {
    var _cache$get;

    state.sources = ((cache === null || cache === void 0 ? void 0 : (_cache$get = cache.get(`${type}/${id}`)) === null || _cache$get === void 0 ? void 0 : _cache$get.playbackInfo) || (await playbackApi.getPlaybackInfo({
      type,
      id,
      token: state.token
    }))).sources;
    onSourceChange === null || onSourceChange === void 0 ? void 0 : onSourceChange(state.sources);
  };

  async function updateContent(contentInCache) {
    var _state$content;

    const content = !contentInCache || isContentExpired(contentInCache) ? await playbackApi.getContent({
      type,
      id
    }) : contentInCache;

    if (!deepEqual(content, state.content)) {
      state.content = content;
      onChangeContent === null || onChangeContent === void 0 ? void 0 : onChangeContent({
        type,
        ...content,
        sources: state.sources
      });
    }

    if (content.end_time && content.end_time === ((_state$content = state.content) === null || _state$content === void 0 ? void 0 : _state$content.end_time)) {
      clearTimeout(state.endTimeoutId);
      state.endTimeoutId = setTimeout(() => {
        if (isLiveDuration(media.duration)) {
          // Request new session for self linear.
          requestNewSession();
        } else {
          // Request new content for ip linear.
          updateContent();
        }
      }, content.end_time * 1000 - Date.now());
    }
  }

  const waitForContent = loadContent();
  const sessionInfo = await playbackApi.startPlayback({
    type,
    id
  });
  onSessionStart === null || onSessionStart === void 0 ? void 0 : onSessionStart(sessionInfo);
  const requestParams = {
    type,
    id,
    token: sessionInfo.token
  };
  state.token = sessionInfo.token;
  await getPlaybackInfo();
  let updateIntervalId;

  if (type === 'lives') {
    updateIntervalId = setInterval(updateContent, updateTime);
  }

  let lastPlayedTime;

  const updateLastPlayed = () => {
    const currentTime = getCurrentTime === null || getCurrentTime === void 0 ? void 0 : getCurrentTime();

    if (currentTime >= 0 && lastPlayedTime !== currentTime) {
      lastPlayedTime = currentTime;
      playbackApi.updateLastPlayed({ ...requestParams,
        time: currentTime
      });
    }
  };

  if (type === 'videos') {
    updateIntervalId = setInterval(updateLastPlayed, updateTime);
  }

  const heartbeatIntervalId = setInterval(() => playbackApi.heartbeat(requestParams).catch(error => {
    var _error$response;

    if (/4\d\d/.test((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status)) {
      clearInterval(heartbeatIntervalId);
      onInvalidToken === null || onInvalidToken === void 0 ? void 0 : onInvalidToken(error);
    }
  }), heartbeatTime);

  const end = () => {
    updateLastPlayed();
    clearInterval(updateIntervalId);
    clearInterval(heartbeatIntervalId);
    clearTimeout(state.endTimeoutId);
    emitter.emit('playbackEnded');
    return playbackApi.endPlayback(requestParams);
  };

  await waitForContent;
  return { ...state,
    token: sessionInfo.token,
    drmPortalUrl: sessionInfo.drm_portal_url,
    updateLastPlayed,
    end
  };
};

/* eslint-disable no-bitwise */
const uuidv4 = () => {
  const crypto = window.crypto || window.msCrypto;
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
};

const modes = {
  videos: 'video',
  lives: 'live'
};
const logEventNames$1 = {
  playbackBegan: 'video_playback_began',
  playbackStarted: 'video_playback_started',
  playbackStopped: 'video_playback_stopped',
  playbackEnded: 'video_playback_ended',
  bufferingStarted: 'video_buffering_started',
  bufferingEnded: 'video_buffering_ended',
  playbackSpeedChange: 'playback_speed_change',
  seeked: 'video_seeking_ended',
  playbackError: 'video_playback_error_occurred',
  playing: 'play',
  paused: 'pause',
  rewind: 'rewind',
  forward: 'forward',
  speedSettingChange: 'speed_setting_change',
  previousEpisode: 'previous_episode',
  nextEpisode: 'next_episode',
  openSettings: 'setting_page_entered',
  closeSettings: 'setting_page_exited',
  adPlaybackStarted: 'ad_playback_started',
  adPlaybackStopped: 'ad_playback_stopped'
};

const mapLogEvents$1 = ({
  video,
  session = video,
  version,
  playerName,
  getPlaybackStatus = () => video
}) => {
  var _session$getContent;

  const emitter = mitt();
  const state = {
    status: 'init',
    seeking: false,
    playerStartTime: Date.now(),
    moduleStartTime: Date.now(),
    content: ((_session$getContent = session.getContent) === null || _session$getContent === void 0 ? void 0 : _session$getContent.call(session)) || {}
  };

  const commonProperties = () => {
    var _state$content$sectio;

    return {
      player_name: playerName,
      playback_module_version: version,
      playback_mode: modes[state.content.type],
      playback_session_id: state.sessionId,
      id: state.content.id,
      name: state.content.title,
      ...(state.content.type === 'videos' && {
        current_position: state.currentTime,
        video_total_duration: state.duration
      }),
      ...(state.content.type === 'lives' && {
        section_id: (_state$content$sectio = state.content.section) === null || _state$content$sectio === void 0 ? void 0 : _state$content$sectio.id,
        name_2: state.content.channelName
      }),
      SSAI: state.ssaiProvider || 'None'
    };
  };

  const dispatchStart = () => {
    if (state.status === 'started') {
      return;
    }

    state.status = 'started';
    state.lastStartTime = Date.now();
    const eventName = state.isPlayingAd ? 'adPlaybackStarted' : 'playbackStarted';
    emitter.emit(eventName, commonProperties());
  };

  const dispatchStop = () => {
    if (state.status !== 'started') {
      return;
    }

    state.status = 'stopped';
    const played = (Date.now() - state.lastStartTime) / 1000;

    if (state.isPlayingAd) {
      state.adPlayedDuration += played;
    } else {
      state.playedDuration += played;
    }

    const eventName = state.isPlayingAd ? 'adPlaybackStopped' : 'playbackStopped';
    emitter.emit(eventName, { ...commonProperties(),
      ...(state.isPlayingAd && {
        ad_played_duration: played
      })
    });
  };

  const registered = [on(video, 'error', event => {
    var _event$error, _event$error2, _event$error2$data;

    emitter.emit('playbackError', {
      module_error_code: ((_event$error = event.error) === null || _event$error === void 0 ? void 0 : _event$error.code) || ((_event$error2 = event.error) === null || _event$error2 === void 0 ? void 0 : (_event$error2$data = _event$error2.data) === null || _event$error2$data === void 0 ? void 0 : _event$error2$data.code),
      ...commonProperties()
    });
  }), once(video, 'playerStarted', () => {
    state.playerStartTime = Date.now();
  }), on(video, 'durationchange', () => {
    // duration may change when playing an ad stitched stream, take only initial value
    if (!state.duration) {
      state.duration = getPlaybackStatus().duration;
    }
  }), once(video, 'canplay', () => {
    state.status = 'began';
    state.sessionId = uuidv4();
    state.playedDuration = 0;
    emitter.emit('playbackBegan', {
      player_startup_time: (state.playerStartTime - state.moduleStartTime) / 1000,
      video_startup_time: (Date.now() - state.moduleStartTime) / 1000,
      ...commonProperties()
    });
  }), on(video, 'playing', dispatchStart), on(video, 'waiting', () => {
    if (!state.bufferingStartTime) {
      emitter.emit('bufferingStarted', commonProperties());
      state.bufferingStartTime = Date.now();
    }
  }), on(video, 'timeupdate', () => {
    state.currentTime = getPlaybackStatus().currentTime;

    if (state.bufferingStartTime) {
      emitter.emit('bufferingEnded', {
        buffering_second: (Date.now() - state.bufferingStartTime) / 1000,
        ...commonProperties()
      });
      state.bufferingStartTime = undefined;
    }
  }), on(video, 'pause', dispatchStop), on(video, 'seeking', () => {
    state.seekingFrom = state.currentTime;
  }), on(session, 'userSeeking', () => {
    state.seeking = true;
  }), on(video, 'seeked', () => {
    if (state.seeking) {
      emitter.emit('seeked', {
        seeking_from: state.seekingFrom,
        seeking_to: video.currentTime,
        ...commonProperties()
      });
    }

    state.seeking = false;
  }), on(video, 'ratechange', () => {
    emitter.emit('playbackSpeedChange', {
      playbackSpeed: video.playbackRate,
      ...commonProperties()
    });
  }), on(session, 'sectionChange', () => {
    dispatchStop();
    state.content = session.getContent();
    dispatchStart();
  }), once(video, 'emptied', () => {
    if (state.status === 'started') {
      dispatchStop();
    }

    state.status = 'init';
    emitter.emit('playbackEnded', {
      video_playback_ended_at_percentage: state.currentTime / state.duration,
      video_total_played_duration: state.playedDuration,
      ...(state.ssaiProvider && {
        ad_total_played_duration: state.adPlayedDuration
      }),
      ...commonProperties()
    });
  }), once(video, 'loadedAdMetadata', event => {
    state.ssaiProvider = event.data.provider;
    state.adPlayedDuration = 0;
  }), on(session, 'adBreakStarted', () => {
    dispatchStop();
    state.isPlayingAd = true;

    if (!state.seeking) {
      dispatchStart();
    }
  }), on(session, 'adBreakEnded', () => {
    dispatchStop();
    state.isPlayingAd = false;

    if (!state.seeking) {
      dispatchStart();
    }
  })];
  return {
    addEventListener: (name, handler) => emitter.on(name, handler),
    all: handler => emitter.on('*', handler),
    emit: (name, {
      currentTime
    }, properties) => {
      if (name in logEventNames$1) {
        emitter.emit(name, {
          current_position: currentTime,
          ...properties,
          ...commonProperties()
        });
      }
    },
    updateContent: content => {
      state.content = content;
    },
    reset: () => registered.forEach(off => off())
  };
};

const logEventNames = {
  playbackBeganLoading: 'playback_began_player_loading',
  playbackBeganPlayerStartupTime: 'playback_began_player_startup_time',
  playbackBeganVideoStartupTime: 'playback_began_video_startup_time',
  playbackVideoStarted: 'playback_video_started',
  playbackVideoPaused: 'playback_video_paused',
  playbackVideoBufferingBegan: 'playback_video_buffering_began',
  playbackVideoBufferingEnded: 'playback_video_buffering_ended',
  playbackVideoEnded: 'playback_video_ended',
  playbackSeekingBegan: 'playback_seeking_began',
  playbackSeekingEnded: 'playback_seeking_ended',
  playbackError: 'playback_error_occurred',
  playbackSpeedChange: 'playback_speed_change',
  playbackAudioVolumeChange: 'playback_audio_volume_change',
  playbackAudioMuteChange: 'playback_audio_mute_change',
  playbackStreamingQualityChangeDownload: 'playback_streaming_quality_change_download',
  playbackStreamingQualityChangeRender: 'playback_streaming_quality_change_render',
  playing: 'play',
  paused: 'pause',
  seek: 'seek',
  rewind: 'rewind',
  forward: 'forward',
  openSettings: 'setting_page_entered',
  closeSettings: 'setting_page_exited',
  speedSettingChange: 'speed_setting_change',
  qualitySettingChange: 'quality_setting_change',
  audioVolumeSettingChange: 'audio_volume_setting_change',
  audioMuteSettingChange: 'audio_mute_setting_change'
};
const userIdKey = 'userIdKey';

const getUserId = () => {
  var _window$localStorage;

  const userId = (_window$localStorage = window.localStorage) === null || _window$localStorage === void 0 ? void 0 : _window$localStorage.getItem(userIdKey);

  if (!userId) {
    var _window$localStorage2;

    const uuid = uuidv4();
    (_window$localStorage2 = window.localStorage) === null || _window$localStorage2 === void 0 ? void 0 : _window$localStorage2.setItem(userIdKey, uuid);
    return uuid;
  }

  return userId;
};

const mapLogEvents = ({
  video,
  version,
  playerName,
  userId = getUserId(),
  getPlaybackStatus = () => video
}) => {
  const emitter = mitt();
  const state = {
    status: 'init',
    seeking: false,
    volume: undefined,
    muted: undefined
  };

  const commonProperties = () => ({
    player_name: playerName,
    playback_module_version: version,
    system_time: Date.now() / 1000,
    user_id: userId,
    // TODO: split properties by videos/lives
    current_position: state.currentTime,
    video_total_duration: state.duration // TODO: get name from props, it's a part of P+

  });

  const dispatchStart = () => {
    if (state.status === 'started') {
      return;
    }

    state.status = 'started';
    emitter.emit('playbackVideoStarted', commonProperties());
  };

  const dispatchStop = () => {
    if (state.status !== 'started') {
      return;
    }

    state.status = 'stopped';
    emitter.emit('playbackVideoPaused', commonProperties());
  };

  const registered = [on(video, 'error', event => {
    var _event$error, _event$error2, _event$error2$data;

    emitter.emit('playbackError', {
      module_error_code: ((_event$error = event.error) === null || _event$error === void 0 ? void 0 : _event$error.code) || ((_event$error2 = event.error) === null || _event$error2 === void 0 ? void 0 : (_event$error2$data = _event$error2.data) === null || _event$error2$data === void 0 ? void 0 : _event$error2$data.code),
      ...commonProperties()
    });
  }), on(video, 'durationchange', () => {
    // duration may change when playing an ad stitched stream, take only initial value
    if (!state.duration) {
      state.duration = getPlaybackStatus().duration;
    }
  }), once(video, 'playerStarted', () => {
    /* eslint-disable camelcase */
    const {
      player_name,
      playback_module_version,
      system_time,
      user_id
    } = commonProperties();
    emitter.emit('playbackBeganLoading', {
      player_name,
      playback_module_version,
      system_time,
      user_id
    });
    /* eslint-enable camelcase */
  }), once(video, 'loadstart', () => {
    /* eslint-disable camelcase */
    const {
      player_name,
      playback_module_version,
      system_time,
      user_id
    } = commonProperties();
    emitter.emit('playbackBeganPlayerStartupTime', {
      player_name,
      playback_module_version,
      system_time,
      user_id
    });
    /* eslint-enable camelcase */
  }), once(video, 'canplay', () => {
    state.status = 'began';
    /* eslint-disable camelcase */

    const {
      player_name,
      playback_module_version,
      system_time,
      user_id
    } = commonProperties();
    emitter.emit('playbackBeganVideoStartupTime', {
      player_name,
      playback_module_version,
      system_time,
      user_id
    });
    /* eslint-enable camelcase */
    // sync state from video

    state.volume = video.volume;
    state.muted = video.muted;
  }), on(video, 'playing', dispatchStart), on(video, 'waiting', () => {
    if (!state.buffering) {
      emitter.emit('playbackVideoBufferingBegan', commonProperties());
      state.buffering = true;
    }
  }), on(video, 'timeupdate', () => {
    state.currentTime = getPlaybackStatus().currentTime;

    if (state.buffering) {
      emitter.emit('playbackVideoBufferingEnded', { ...commonProperties()
      });
      state.buffering = false;
    }
  }), on(video, 'pause', dispatchStop), on(video, 'seeking', () => {
    state.seeking = true;
    emitter.emit('playbackSeekingBegan', commonProperties());
  }), on(video, 'seeked', () => {
    if (state.seeking) {
      emitter.emit('playbackSeekingEnded', commonProperties());
    }

    state.seeking = false;
  }), on(video, 'ratechange', () => {
    emitter.emit('playbackSpeedChange', {
      playbackSpeed: video.playbackRate,
      ...commonProperties()
    });
  }), once(video, 'emptied', () => {
    if (state.status === 'started') {
      dispatchStop();
    }

    state.status = 'init';
    emitter.emit('playbackVideoEnded', commonProperties());
  }), on(video, 'volumechange', () => {
    if (video.volume !== state.volume && state.volume !== undefined) {
      emitter.emit('playbackAudioVolumeChange', {
        volume: video.volume,
        ...commonProperties()
      });
      state.volume = video.volume;
    }

    if (video.muted !== state.muted && state.muted !== undefined) {
      emitter.emit('playbackAudioMuteChange', {
        muted: video.muted,
        ...commonProperties()
      });
      state.muted = video.muted;
    }
  }), on(video, 'downloadQualityChange', event => {
    emitter.emit('playbackStreamingQualityChangeDownload', { ...event.detail,
      ...commonProperties()
    });
  }), on(video, 'resize', () => {
    emitter.emit('playbackStreamingQualityChangeRender', {
      height: video.videoHeight,
      width: video.videoWidth,
      ...commonProperties()
    });
  })];
  return {
    addEventListener: (name, handler) => emitter.on(name, handler),
    all: handler => emitter.on('*', handler),
    emit: (name, {
      currentTime
    }, properties) => {
      if (name in logEventNames) {
        emitter.emit(name, {
          current_position: currentTime,
          ...properties,
          ...commonProperties()
        });
      }
    },
    updateContent: content => {
      state.content = content;
    },
    reset: () => registered.forEach(off => off())
  };
};

var playlogv2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  mapLogEvents: mapLogEvents,
  logEventNames: logEventNames
});

/* eslint-disable no-empty */
const storageKey = 'playcraft-tab-lock';
const lockRenewTime = 3000;

const ensureTabLock = () => {
  let saved = {};

  try {
    saved = JSON.parse(localStorage[storageKey]);
  } catch (e) {
    console.log('Can read saved data for tab lock.', e);
  }

  const {
    expireTime
  } = saved;

  if (Date.now() <= expireTime) {
    return;
  }

  const id = uuidv4();

  const renewLock = () => {
    localStorage[storageKey] = JSON.stringify({
      id,
      expireTime: Date.now() + lockRenewTime * 3
    });
  };

  const renewInterval = setInterval(renewLock, lockRenewTime);

  const releaseLock = () => {
    clearInterval(renewInterval);
    window.removeEventListener('beforeunload', releaseLock);
    window.removeEventListener('unload', releaseLock);
    localStorage[storageKey] = {
      expireTime: Date.now() - 1
    };
  };

  window.addEventListener('beforeunload', releaseLock);
  window.addEventListener('unload', releaseLock);
  return releaseLock;
};

let lastError = '';
const defaultOptions = {
  ignoreErrors: ['AbortError: The play() request was interrupted', 'i.context.logger'],
  beforeSend: event => {
    if (lastError.message === event.exception.values[0].value && Date.now() - lastError.date < 10000) {
      lastError.date = Date.now();
      return null;
    }

    lastError = {
      date: Date.now(),
      message: event.exception.values[0].value
    };
    return event;
  }
};

const addSentry = ({
  key,
  ...options
}) => {
  const script = document.createElement('script');
  script.crossorigin = 'anonymous';
  script.src = `https://js.sentry-cdn.com/${key}.min.js`;
  script.addEventListener('load', () => {
    window.Sentry.onLoad(() => {
      window.Sentry.init({ ...defaultOptions,
        ...options
      });
    });
  }, {
    once: true
  });
  document.body.append(script);
};

/**
 * @description Unplugging / disconnecting headphones will pause video in iOS,
 * and in some iOS versions, video is paused without firing a pause event.
 * Pause the video if paused by iOS in this case.
 * @param {HTMLMediaElement} video
 */

const handleIOSHeadphonesDisconnection = ({
  maxStuckSeconds = 1
} = {}) => {
  const video = document.querySelector('video');

  if (video && getOS().name === 'iOS') {
    let playState = {
      playing: false
    };

    const saveState = ({
      playing = playState.playing
    } = {}) => {
      playState = {
        playing,
        ...(playing && {
          lastTimeUpdate: Date.now()
        })
      };
    };

    video.addEventListener('pause', () => {
      playState = {
        playing: false
      };
    });
    video.addEventListener('seeking', () => {
      playState = {
        playing: false
      };
    });
    video.addEventListener('waiting', () => {
      playState = {
        playing: false
      };
    });
    video.addEventListener('webkitpresentationmodechanged', () => {
      playState = {
        playing: false,
        pauseDetection: Date.now() + 5000
      };
    });
    video.addEventListener('timeupdate', () => {
      if (!video.paused) {
        const delta = Date.now() - playState.lastTimeUpdate;
        playState.lastTimeUpdate = Date.now();

        if (delta > 0 && delta < 1000) {
          playState.playing = true;
        }
      }

      saveState({
        playing: !video.paused
      });
    });
    video.addEventListener('ratechange', saveState);
    setInterval(() => {
      if (video.paused || !playState.playing || playState.pauseDetection >= Date.now()) {
        return;
      }

      const secondsStuck = (Date.now() - playState.lastTimeUpdate) / 1000;

      if (secondsStuck >= maxStuckSeconds) {
        console.log('Video is not playing, pause to workaround iOS unpluging headphones');
        video.pause();
      }
    }, 200);
  }
};

const ewma = halfLife => {
  let alpha = Math.exp(Math.log(0.5) / halfLife);
  let estimate = 0;
  let totalWeight = 0;
  return {
    updateAlpha: newHalfLife => {
      alpha = Math.exp(Math.log(0.5) / newHalfLife);
    },
    sample: (weight, value) => {
      const adjAlpha = alpha ** weight;
      const newEstimate = value * (1 - adjAlpha) + adjAlpha * estimate;

      if (!Number.isNaN(newEstimate)) {
        estimate = newEstimate;
        totalWeight += weight;
      }
    },
    getEstimate: () => {
      const zeroFactor = 1 - alpha ** totalWeight;
      return estimate / zeroFactor;
    }
  };
};

/*! @license
 * Shaka Player
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let shaka;
let MetaSegmentIndex;
const shakaLog = {
  debug: (...messages) => console.warn(...messages),
  error: (...messages) => console.warn(...messages),
  info: (...messages) => console.warn(...messages),
  warning: (...messages) => console.warn(...messages),
  alwaysWarn: (...messages) => console.warn(...messages)
};
const goog = {
  asserts: {
    assert: (result, message) => {
      result || console.warn(message);
    }
  }
};

class SegmentIndex {
  /**
   * @param {!Array.<!shaka.media.SegmentReference>} references The list of
   *   SegmentReferences, which must be sorted first by their start times
   *   (ascending) and second by their end times (ascending).
   */
  constructor(references) {
    /** @protected {!Array.<!shaka.media.SegmentReference>} */


    this.references = references;
    /** @private {shaka.util.Timer} */

    this.timer_ = null;
    /**
     * The number of references that have been removed from the front of the
     * array.  Used to create stable positions in the find/get APIs.
     *
     * @protected {number}
     */

    this.numEvicted = 0;
    /** @private {boolean} */

    this.immutable_ = false;
  }
  /**
   * @override
   * @export
   */


  release() {
    if (this.immutable_) {
      return;
    }

    this.references = [];

    if (this.timer_) {
      this.timer_.stop();
    }

    this.timer_ = null;
  }
  /**
   * Finds the position of the segment for the given time, in seconds, relative
   * to the start of the presentation.  Returns the position of the segment
   * with the largest end time if more than one segment is known for the given
   * time.
   *
   * @param {number} time
   * @return {?number} The position of the segment, or null if the position of
   *   the segment could not be determined.
   * @export
   */


  find(time) {
    // For live streams, searching from the end is faster.  For VOD, it balances
    // out either way.  In both cases, references.length is small enough that
    // the difference isn't huge.
    const lastReferenceIndex = this.references.length - 1;

    for (let i = lastReferenceIndex; i >= 0; --i) {
      const r = this.references[i];
      const start = r.startTime; // A rounding error can cause /time/ to equal e.endTime or fall in between
      // the references by a fraction of a second. To account for this, we use
      // the start of the next segment as /end/, unless this is the last
      // reference, in which case we use its end time as /end/.

      const end = i < lastReferenceIndex ? this.references[i + 1].startTime : r.endTime; // Note that a segment ends immediately before the end time.

      if (time >= start && time < end) {
        return i + this.numEvicted;
      }
    }

    if (this.references.length && time < this.references[0].startTime) {
      return this.numEvicted;
    }

    return null;
  }
  /**
   * Gets the SegmentReference for the segment at the given position.
   *
   * @param {number} position The position of the segment as returned by find().
   * @return {shaka.media.SegmentReference} The SegmentReference, or null if
   *   no such SegmentReference exists.
   * @export
   */


  get(position) {
    if (this.references.length == 0) {
      return null;
    }

    const index = position - this.numEvicted;

    if (index < 0 || index >= this.references.length) {
      return null;
    }

    return this.references[index];
  }
  /**
   * Offset all segment references by a fixed amount.
   *
   * @param {number} offset The amount to add to each segment's start and end
   *   times.
   * @export
   */


  offset(offset) {
    if (!this.immutable_) {
      for (const ref of this.references) {
        ref.startTime += offset;
        ref.endTime += offset;
        ref.timestampOffset += offset;
      }
    }
  }
  /**
   * Merges the given SegmentReferences.  Supports extending the original
   * references only.  Will replace old references with equivalent new ones, and
   * keep any unique old ones.
   *
   * Used, for example, by the DASH and HLS parser, where manifests may not list
   * all available references, so we must keep available references in memory to
   * fill the availability window.
   *
   * @param {!Array.<!shaka.media.SegmentReference>} references The list of
   *   SegmentReferences, which must be sorted first by their start times
   *   (ascending) and second by their end times (ascending).
   */


  merge(references) {

    if (this.immutable_) {
      return;
    }

    if (!references.length) {
      return;
    } // Partial segments are used for live edge, and should be removed when they
    // get older. Remove the old SegmentReferences after the first new
    // reference's start time.


    this.references = this.references.filter(r => r.startTime < references[0].startTime);
    this.references.push(...references);
  }
  /**
   * Merges the given SegmentReferences and evicts the ones that end before the
   * given time.  Supports extending the original references only.
   * Will not replace old references or interleave new ones.
   * Used, for example, by the DASH and HLS parser, where manifests may not list
   * all available references, so we must keep available references in memory to
   * fill the availability window.
   *
   * @param {!Array.<!shaka.media.SegmentReference>} references The list of
   *   SegmentReferences, which must be sorted first by their start times
   *   (ascending) and second by their end times (ascending).
   * @param {number} windowStart The start of the availability window to filter
   *   out the references that are no longer available.
   * @export
   */


  mergeAndEvict(references, windowStart) {
    // Filter out the references that are no longer available to avoid
    // repeatedly evicting them and messing up eviction count.
    references = references.filter(r => r.endTime > windowStart && (this.references.length == 0 || r.endTime > this.references[0].startTime));
    const oldFirstRef = this.references[0];
    this.merge(references);
    const newFirstRef = this.references[0];

    if (oldFirstRef) {
      // We don't compare the actual ref, since the object could legitimately be
      // replaced with an equivalent.  Even the URIs could change due to
      // load-balancing actions taken by the server.  However, if the time
      // changes, its not an equivalent reference.
      goog.asserts.assert(oldFirstRef.startTime == newFirstRef.startTime, 'SegmentIndex.merge should not change the first reference time!');
    }

    this.evict(windowStart);
  }
  /**
   * Removes all SegmentReferences that end before the given time.
   *
   * @param {number} time The time in seconds.
   * @export
   */


  evict(time) {
    if (this.immutable_) {
      return;
    }

    const oldSize = this.references.length;
    this.references = this.references.filter(ref => ref.endTime > time);
    const newSize = this.references.length;
    const diff = oldSize - newSize; // Tracking the number of evicted refs will keep their "positions" stable
    // for the caller.

    this.numEvicted += diff;
  }
  /**
   * Drops references that start after windowEnd, or end before windowStart,
   * and contracts the last reference so that it ends at windowEnd.
   *
   * Do not call on the last period of a live presentation (unknown duration).
   * It is okay to call on the other periods of a live presentation, where the
   * duration is known and another period has been added.
   *
   * @param {number} windowStart
   * @param {?number} windowEnd
   * @param {boolean=} isNew Whether this is a new SegmentIndex and we shouldn't
   *   update the number of evicted elements.
   * @export
   */


  fit(windowStart, windowEnd, isNew = false) {
    goog.asserts.assert(windowEnd != null, 'Content duration must be known for static content!');
    goog.asserts.assert(windowEnd != Infinity, 'Content duration must be finite for static content!');

    if (this.immutable_) {
      return;
    } // Trim out references we will never use.


    while (this.references.length) {
      const lastReference = this.references[this.references.length - 1];

      if (lastReference.startTime >= windowEnd) {
        this.references.pop();
      } else {
        break;
      }
    }

    while (this.references.length) {
      const firstReference = this.references[0];

      if (firstReference.endTime <= windowStart) {
        this.references.shift();

        if (!isNew) {
          this.numEvicted++;
        }
      } else {
        break;
      }
    }

    if (this.references.length == 0) {
      return;
    } // Adjust the last SegmentReference.


    const lastReference = this.references[this.references.length - 1];
    this.references[this.references.length - 1] = new shaka.media.SegmentReference(lastReference.startTime,
    /* endTime= */
    windowEnd, lastReference.getUrisInner, lastReference.startByte, lastReference.endByte, lastReference.initSegmentReference, lastReference.timestampOffset, lastReference.appendWindowStart, lastReference.appendWindowEnd, lastReference.partialReferences, lastReference.tilesLayout, lastReference.tileDuration, lastReference.syncTime);
  }
  /**
   * Updates the references every so often.  Stops when the references list
   * returned by the callback is null.
   *
   * @param {number} interval The interval in seconds.
   * @param {function():Array.<shaka.media.SegmentReference>} updateCallback
   * @export
   */


  updateEvery(interval, updateCallback) {
    goog.asserts.assert(!this.timer_, 'SegmentIndex timer already started!');

    if (this.immutable_) {
      return;
    }

    if (this.timer_) {
      this.timer_.stop();
    }

    this.timer_ = new shaka.util.Timer(() => {
      const references = updateCallback();

      if (references) {
        this.references.push(...references);
      } else {
        this.timer_.stop();
        this.timer_ = null;
      }
    });
    this.timer_.tickEvery(interval);
  }
  /** @return {!shaka.media.SegmentIterator} */


  [Symbol.iterator]() {
    const iter = this.getIteratorForTime(0);
    goog.asserts.assert(iter != null, 'Iterator for 0 should never be null!');
    return iter;
  }
  /**
   * @return {boolean}
   */


  isEmpty() {
    return this.references.length == 0;
  }
  /**
   * Create a SegmentIndex for a single segment of the given start time and
   * duration at the given URIs.
   *
   * @param {number} startTime
   * @param {number} duration
   * @param {!Array.<string>} uris
   * @return {!shaka.media.SegmentIndex}
   * @export
   */


  static forSingleSegment(startTime, duration, uris) {
    const reference = new shaka.media.SegmentReference(
    /* startTime= */
    startTime,
    /* endTime= */
    startTime + duration,
    /* getUris= */
    () => uris,
    /* startByte= */
    0,
    /* endByte= */
    null,
    /* initSegmentReference= */
    null,
    /* presentationTimeOffset= */
    startTime,
    /* appendWindowStart= */
    startTime,
    /* appendWindowEnd= */
    startTime + duration);
    return new SegmentIndex([reference]);
  }

}

const hasSameElements = (a, b) => {
  if (a.length != b.length) {
    return false;
  }

  const copy = b.slice();

  for (const item of a) {
    const idx = copy.findIndex(other => item === other);

    if (idx == -1) {
      return false;
    } // Since order doesn't matter, just swap the last element with
    // this one and then drop the last element.


    copy[idx] = copy[copy.length - 1];
    copy.pop();
  }

  return copy.length == 0;
};

const mapHasSameElements = (map1, map2) => {
  if (!map1 && !map2) {
    return true;
  }

  if (map1 && !map2) {
    return false;
  }

  if (map2 && !map1) {
    return false;
  }

  if (map1.size != map2.size) {
    return false;
  }

  for (const [key, val] of map1) {
    if (!map2.has(key)) {
      return false;
    }

    const val2 = map2.get(key);

    if (val2 != val || val2 == undefined) {
      return false;
    }
  }

  return true;
};

const DrmEngine = {
  getCommonDrmInfos: (drms1, drms2) => {
    if (!drms1.length) {
      return drms2;
    }

    if (!drms2.length) {
      return drms1;
    }

    const commonDrms = [];

    for (const drm1 of drms1) {
      for (const drm2 of drms2) {
        // This method is only called to compare drmInfos of a video and an
        // audio adaptations, so we shouldn't have to worry about checking
        // robustness.
        if (drm1.keySystem == drm2.keySystem) {
          /** @type {Array<shaka.extern.InitDataOverride>} */
          let initData = [];
          initData = initData.concat(drm1.initData || []);
          initData = initData.concat(drm2.initData || []);
          initData = initData.filter((d, i) => d.keyId === undefined || i === initData.findIndex(d2 => d2.keyId === d.keyId));
          const keyIds = drm1.keyIds && drm2.keyIds ? new Set([...drm1.keyIds, ...drm2.keyIds]) : drm1.keyIds || drm2.keyIds;
          const mergedDrm = {
            keySystem: drm1.keySystem,
            licenseServerUri: drm1.licenseServerUri || drm2.licenseServerUri,
            distinctiveIdentifierRequired: drm1.distinctiveIdentifierRequired || drm2.distinctiveIdentifierRequired,
            persistentStateRequired: drm1.persistentStateRequired || drm2.persistentStateRequired,
            videoRobustness: drm1.videoRobustness || drm2.videoRobustness,
            audioRobustness: drm1.audioRobustness || drm2.audioRobustness,
            serverCertificate: drm1.serverCertificate || drm2.serverCertificate,
            serverCertificateUri: drm1.serverCertificateUri || drm2.serverCertificateUri,
            initData,
            keyIds
          };
          commonDrms.push(mergedDrm);
          break;
        }
      }
    }

    return commonDrms;
  },
  areDrmCompatible: (drms1, drms2) => {
    if (!drms1.length || !drms2.length) {
      return true;
    }

    return DrmEngine.getCommonDrmInfos(drms1, drms2).length > 0;
  }
};
const Functional = {
  isNotNull: it => it != null
};

class MimeUtils {
  /**
   * Takes a MIME type and optional codecs string and produces the full MIME
   * type.
   *
   * @param {string} mimeType
   * @param {string=} codecs
   * @return {string}
   * @export
   */
  static getFullType(mimeType, codecs) {
    let fullMimeType = mimeType;

    if (codecs) {
      fullMimeType += `; codecs="${codecs}"`;
    }

    return fullMimeType;
  }
  /**
   * Takes a MIME type and a codecs string and produces the full MIME
   * type. If it's a transport stream, convert its codecs to MP4 codecs.
   *
   * @param {string} mimeType
   * @param {string} codecs
   * @param {string} contentType
   * @return {string}
   */


  static getFullOrConvertedType(mimeType, codecs, contentType) {
    const fullMimeType = MimeUtils.getFullType(mimeType, codecs);

    if (!shaka.dependencies.muxjs() || !shaka.media.Transmuxer.isTsContainer(fullMimeType)) {
      return fullMimeType;
    }

    return shaka.media.Transmuxer.convertTsCodecs(contentType, fullMimeType);
  }
  /**
   * Takes a Stream object and produces an extended MIME type with information
   * beyond the container and codec type, when available.
   *
   * @param {shaka.extern.Stream} stream
   * @return {string}
   */


  static getExtendedType(stream) {
    const components = [stream.mimeType];
    const extendedMimeParams = MimeUtils.EXTENDED_MIME_PARAMETERS_;
    extendedMimeParams.forEach((mimeKey, streamKey) => {
      const value = stream[streamKey];

      if (value) {
        components.push(`${mimeKey}="${value}"`);
      }
    });

    if (stream.hdr == 'PQ') {
      components.push('eotf="smpte2084"');
    }

    return components.join(';');
  }
  /**
   * Takes a full MIME type (with codecs) or basic MIME type (without codecs)
   * and returns a container type string ("mp2t", "mp4", "webm", etc.)
   *
   * @param {string} mimeType
   * @return {string}
   */


  static getContainerType(mimeType) {
    return mimeType.split(';')[0].split('/')[1];
  }
  /**
   * Split a list of codecs encoded in a string into a list of codecs.
   * @param {string} codecs
   * @return {!Array.<string>}
   */


  static splitCodecs(codecs) {
    return codecs.split(',');
  }
  /**
   * Get the base codec from a codec string.
   *
   * @param {string} codecString
   * @return {string}
   */


  static getCodecBase(codecString) {
    const parts = MimeUtils.getCodecParts_(codecString);
    return parts[0];
  }
  /**
   * Takes a full MIME type (with codecs) or basic MIME type (without codecs)
   * and returns a basic MIME type (without codecs or other parameters).
   *
   * @param {string} mimeType
   * @return {string}
   */


  static getBasicType(mimeType) {
    return mimeType.split(';')[0];
  }
  /**
   * Takes a MIME type and returns the codecs parameter, or an empty string if
   * there is no codecs parameter.
   *
   * @param {string} mimeType
   * @return {string}
   */


  static getCodecs(mimeType) {
    // Parse the basic MIME type from its parameters.
    const pieces = mimeType.split(/ *; */);
    pieces.shift(); // Remove basic MIME type from pieces.

    const codecs = pieces.find(piece => piece.startsWith('codecs='));

    if (!codecs) {
      return '';
    } // The value may be quoted, so remove quotes at the beginning or end.


    const value = codecs.split('=')[1].replace(/^"|"$/g, '');
    return value;
  }
  /**
   * Get the base and profile of a codec string. Where [0] will be the codec
   * base and [1] will be the profile.
   * @param {string} codecString
   * @return {!Array.<string>}
   * @private
   */


  static getCodecParts_(codecString) {
    const parts = codecString.split('.');
    const base = parts[0];
    parts.pop();
    const profile = parts.join('.'); // Make sure that we always return a "base" and "profile".

    return [base, profile];
  }

}
/**
 * A map from Stream object keys to MIME type parameters.  These should be
 * ignored by platforms that do not recognize them.
 *
 * This initial set of parameters are all recognized by Chromecast.
 *
 * @const {!Map.<string, string>}
 * @private
 */


MimeUtils.EXTENDED_MIME_PARAMETERS_ = new Map().set('codecs', 'codecs').set('frameRate', 'framerate') // Ours is camelCase, theirs is lowercase.
.set('bandwidth', 'bitrate') // They are in the same units: bits/sec.
.set('width', 'width').set('height', 'height').set('channelsCount', 'channels');
/**
 * A mimetype created for CEA-608 closed captions.
 * @const {string}
 */

MimeUtils.CEA608_CLOSED_CAPTION_MIMETYPE = 'application/cea-608';
/**
 * A mimetype created for CEA-708 closed captions.
 * @const {string}
 */

MimeUtils.CEA708_CLOSED_CAPTION_MIMETYPE = 'application/cea-708';

class ManifestParserUtils {
  /**
   * Resolves an array of relative URIs to the given base URIs. This will result
   * in M*N number of URIs.
   *
   * @param {!Array.<string>} baseUris
   * @param {!Array.<string>} relativeUris
   * @return {!Array.<string>}
   */
  static resolveUris(baseUris, relativeUris) {
    if (relativeUris.length == 0) {
      return baseUris;
    }

    const relativeAsGoog = relativeUris.map(uri => uri); // Resolve each URI relative to each base URI, creating an Array of Arrays.
    // Then flatten the Arrays into a single Array.

    return baseUris.map(base => relativeAsGoog.map(i => new URL(i, base))).reduce((a, b) => a.concat(b), []).map(uri => uri.toString());
  }
  /**
   * Creates a DrmInfo object from the given info.
   *
   * @param {string} keySystem
   * @param {Array.<shaka.extern.InitDataOverride>} initData
   * @return {shaka.extern.DrmInfo}
   */


  static createDrmInfo(keySystem, initData) {
    return {
      keySystem,
      licenseServerUri: '',
      distinctiveIdentifierRequired: false,
      persistentStateRequired: false,
      audioRobustness: '',
      videoRobustness: '',
      serverCertificate: null,
      serverCertificateUri: '',
      sessionType: '',
      initData: initData || [],
      keyIds: new Set()
    };
  }
  /**
   * Attempts to guess which codecs from the codecs list belong to a given
   * content type.
   * Assumes that at least one codec is correct, and throws if none are.
   *
   * @param {string} contentType
   * @param {!Array.<string>} codecs
   * @return {string}
   */


  static guessCodecs(contentType, codecs) {
    if (codecs.length == 1) {
      return codecs[0];
    }

    const match = ManifestParserUtils.guessCodecsSafe(contentType, codecs); // A failure is specifically denoted by null; an empty string represents a
    // valid match of no codec.

    if (match != null) {
      return match;
    } // Unable to guess codecs.


    throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.HLS_COULD_NOT_GUESS_CODECS, codecs);
  }
  /**
   * Attempts to guess which codecs from the codecs list belong to a given
   * content type. Does not assume a single codec is anything special, and does
   * not throw if it fails to match.
   *
   * @param {string} contentType
   * @param {!Array.<string>} codecs
   * @return {?string} or null if no match is found
   */


  static guessCodecsSafe(contentType, codecs) {
    const formats = ManifestParserUtils.CODEC_REGEXPS_BY_CONTENT_TYPE_[contentType];

    for (const format of formats) {
      for (const codec of codecs) {
        if (format.test(codec.trim())) {
          return codec.trim();
        }
      }
    } // Text does not require a codec string.


    if (contentType == ManifestParserUtils.ContentType.TEXT) {
      return '';
    }

    return null;
  }

}
/**
 * @enum {string}
 */


ManifestParserUtils.ContentType = {
  VIDEO: 'video',
  AUDIO: 'audio',
  TEXT: 'text',
  IMAGE: 'image',
  APPLICATION: 'application'
};
/**
 * @enum {string}
 */

ManifestParserUtils.TextStreamKind = {
  SUBTITLE: 'subtitle',
  CLOSED_CAPTION: 'caption'
};
/**
 * Specifies how tolerant the player is of inaccurate segment start times and
 * end times within a manifest. For example, gaps or overlaps between segments
 * in a SegmentTimeline which are greater than or equal to this value will
 * result in a warning message.
 *
 * @const {number}
 */

ManifestParserUtils.GAP_OVERLAP_TOLERANCE_SECONDS = 1 / 15;
/**
 * A list of regexps to detect well-known video codecs.
 *
 * @const {!Array.<!RegExp>}
 * @private
 */

ManifestParserUtils.VIDEO_CODEC_REGEXPS_ = [/^avc/, /^hev/, /^hvc/, /^vp0?[89]/, /^av1$/];
/**
 * A list of regexps to detect well-known audio codecs.
 *
 * @const {!Array.<!RegExp>}
 * @private
 */

ManifestParserUtils.AUDIO_CODEC_REGEXPS_ = [/^vorbis$/, /^opus$/, /^flac$/, /^mp4a/, /^[ae]c-3$/];
/**
 * A list of regexps to detect well-known text codecs.
 *
 * @const {!Array.<!RegExp>}
 * @private
 */

ManifestParserUtils.TEXT_CODEC_REGEXPS_ = [/^vtt$/, /^wvtt/, /^stpp/];
/**
 * @const {!Object.<string, !Array.<!RegExp>>}
 */

ManifestParserUtils.CODEC_REGEXPS_BY_CONTENT_TYPE_ = {
  audio: ManifestParserUtils.AUDIO_CODEC_REGEXPS_,
  video: ManifestParserUtils.VIDEO_CODEC_REGEXPS_,
  text: ManifestParserUtils.TEXT_CODEC_REGEXPS_
};

class XmlUtils {
  /**
   * Finds a child XML element.
   * @param {!Node} elem The parent XML element.
   * @param {string} name The child XML element's tag name.
   * @return {Element} The child XML element, or null if a child XML element
   *   does not exist with the given tag name OR if there exists more than one
   *   child XML element with the given tag name.
   */
  static findChild(elem, name) {
    const children = XmlUtils.findChildren(elem, name);

    if (children.length != 1) {
      return null;
    }

    return children[0];
  }
  /**
   * Finds a namespace-qualified child XML element.
   * @param {!Node} elem The parent XML element.
   * @param {string} ns The child XML element's namespace URI.
   * @param {string} name The child XML element's local name.
   * @return {Element} The child XML element, or null if a child XML element
   *   does not exist with the given tag name OR if there exists more than one
   *   child XML element with the given tag name.
   */


  static findChildNS(elem, ns, name) {
    const children = XmlUtils.findChildrenNS(elem, ns, name);

    if (children.length != 1) {
      return null;
    }

    return children[0];
  }
  /**
   * Finds child XML elements.
   * @param {!Node} elem The parent XML element.
   * @param {string} name The child XML element's tag name.
   * @return {!Array.<!Element>} The child XML elements.
   */


  static findChildren(elem, name) {
    const found = [];

    for (const child of elem.childNodes) {
      if (child instanceof Element && child.tagName == name) {
        found.push(child);
      }
    }

    return found;
  }
  /**
   * @param {!Node} elem the parent XML element.
   * @return {!Array.<!Element>} The child XML elements.
   */


  static getChildren(elem) {
    return Array.from(elem.childNodes).filter(child => child instanceof Element);
  }
  /**
   * Finds namespace-qualified child XML elements.
   * @param {!Node} elem The parent XML element.
   * @param {string} ns The child XML element's namespace URI.
   * @param {string} name The child XML element's local name.
   * @return {!Array.<!Element>} The child XML elements.
   */


  static findChildrenNS(elem, ns, name) {
    const found = [];

    for (const child of elem.childNodes) {
      if (child instanceof Element && child.localName == name && child.namespaceURI == ns) {
        found.push(child);
      }
    }

    return found;
  }
  /**
   * Gets a namespace-qualified attribute.
   * @param {!Element} elem The element to get from.
   * @param {string} ns The namespace URI.
   * @param {string} name The local name of the attribute.
   * @return {?string} The attribute's value, or null if not present.
   */


  static getAttributeNS(elem, ns, name) {
    // Some browsers return the empty string when the attribute is missing,
    // so check if it exists first.  See: https://mzl.la/2L7F0UK
    return elem.hasAttributeNS(ns, name) ? elem.getAttributeNS(ns, name) : null;
  }
  /**
   * Gets a namespace-qualified attribute.
   * @param {!Element} elem The element to get from.
   * @param {!Array.<string>} nsList The lis of namespace URIs.
   * @param {string} name The local name of the attribute.
   * @return {?string} The attribute's value, or null if not present.
   */


  static getAttributeNSList(elem, nsList, name) {
    // Some browsers return the empty string when the attribute is missing,
    // so check if it exists first.  See: https://mzl.la/2L7F0UK
    for (const ns of nsList) {
      if (elem.hasAttributeNS(ns, name)) {
        return elem.getAttributeNS(ns, name);
      }
    }

    return null;
  }
  /**
   * Gets the text contents of a node.
   * @param {!Node} elem The XML element.
   * @return {?string} The text contents, or null if there are none.
   */


  static getContents(elem) {
    if (!Array.from(elem.childNodes).every(XmlUtils.isText)) {
      return null;
    } // Read merged text content from all text nodes.


    return elem.textContent.trim();
  }
  /**
   * Checks if a node is of type text.
   * @param {!Node} elem The XML element.
   * @return {boolean} True if it is a text node.
   */


  static isText(elem) {
    return elem.nodeType == Node.TEXT_NODE || elem.nodeType == Node.CDATA_SECTION_NODE;
  }
  /**
   * Parses an attribute by its name.
   * @param {!Element} elem The XML element.
   * @param {string} name The attribute name.
   * @param {function(string): (T|null)} parseFunction A function that parses
   *   the attribute.
   * @param {(T|null)=} defaultValue The attribute's default value, if not
   *   specified, the attibute's default value is null.
   * @return {(T|null)} The parsed attribute on success, or the attribute's
   *   default value if the attribute does not exist or could not be parsed.
   * @template T
   */


  static parseAttr(elem, name, parseFunction, defaultValue = null) {
    let parsedValue = null;
    const value = elem.getAttribute(name);

    if (value != null) {
      parsedValue = parseFunction(value);
    }

    return parsedValue == null ? defaultValue : parsedValue;
  }
  /**
   * Parses an XML date string.
   * @param {string} dateString
   * @return {?number} The parsed date in seconds on success; otherwise, return
   *   null.
   */


  static parseDate(dateString) {
    if (!dateString) {
      return null;
    } // Times in the manifest should be in UTC. If they don't specify a timezone,
    // Date.parse() will use the local timezone instead of UTC.  So manually add
    // the timezone if missing ('Z' indicates the UTC timezone).
    // Format: YYYY-MM-DDThh:mm:ss.ssssss


    if (/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(dateString)) {
      dateString += 'Z';
    }

    const result = Date.parse(dateString);
    return Number.isNaN(result) ? null : result / 1000.0;
  }
  /**
   * Parses an XML duration string.
   * Negative values are not supported. Years and months are treated as exactly
   * 365 and 30 days respectively.
   * @param {string} durationString The duration string, e.g., "PT1H3M43.2S",
   *   which means 1 hour, 3 minutes, and 43.2 seconds.
   * @return {?number} The parsed duration in seconds on success; otherwise,
   *   return null.
   * @see {@link http://www.datypic.com/sc/xsd/t-xsd_duration.html}
   */


  static parseDuration(durationString) {
    if (!durationString) {
      return null;
    }

    const re = '^P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?' + '(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9.]*)S)?)?$';
    const matches = new RegExp(re).exec(durationString);

    if (!matches) {
      shakaLog.warning('Invalid duration string:', durationString);
      return null;
    } // Note: Number(null) == 0 but Number(undefined) == NaN.


    const years = Number(matches[1] || null);
    const months = Number(matches[2] || null);
    const days = Number(matches[3] || null);
    const hours = Number(matches[4] || null);
    const minutes = Number(matches[5] || null);
    const seconds = Number(matches[6] || null); // Assume a year always has 365 days and a month always has 30 days.

    const d = 60 * 60 * 24 * 365 * years + 60 * 60 * 24 * 30 * months + 60 * 60 * 24 * days + 60 * 60 * hours + 60 * minutes + seconds;
    return Number.isFinite(d) ? d : null;
  }
  /**
   * Parses a range string.
   * @param {string} rangeString The range string, e.g., "101-9213".
   * @return {?{start: number, end: number}} The parsed range on success;
   *   otherwise, return null.
   */


  static parseRange(rangeString) {
    const matches = /([0-9]+)-([0-9]+)/.exec(rangeString);

    if (!matches) {
      return null;
    }

    const start = Number(matches[1]);

    if (!Number.isFinite(start)) {
      return null;
    }

    const end = Number(matches[2]);

    if (!Number.isFinite(end)) {
      return null;
    }

    return {
      start,
      end
    };
  }
  /**
   * Parses an integer.
   * @param {string} intString The integer string.
   * @return {?number} The parsed integer on success; otherwise, return null.
   */


  static parseInt(intString) {
    const n = Number(intString);
    return n % 1 === 0 ? n : null;
  }
  /**
   * Parses a positive integer.
   * @param {string} intString The integer string.
   * @return {?number} The parsed positive integer on success; otherwise,
   *   return null.
   */


  static parsePositiveInt(intString) {
    const n = Number(intString);
    return n % 1 === 0 && n > 0 ? n : null;
  }
  /**
   * Parses a non-negative integer.
   * @param {string} intString The integer string.
   * @return {?number} The parsed non-negative integer on success; otherwise,
   *   return null.
   */


  static parseNonNegativeInt(intString) {
    const n = Number(intString);
    return n % 1 === 0 && n >= 0 ? n : null;
  }
  /**
   * Parses a floating point number.
   * @param {string} floatString The floating point number string.
   * @return {?number} The parsed floating point number on success; otherwise,
   *   return null. May return -Infinity or Infinity.
   */


  static parseFloat(floatString) {
    const n = Number(floatString);
    return !Number.isNaN(n) ? n : null;
  }
  /**
   * Evaluate a division expressed as a string.
   * @param {string} exprString
   *   The expression to evaluate, e.g. "200/2". Can also be a single number.
   * @return {?number} The evaluated expression as floating point number on
   *   success; otherwise return null.
   */


  static evalDivision(exprString) {
    let res;
    let n; // eslint-disable-next-line no-cond-assign

    if (res = exprString.match(/^(\d+)\/(\d+)$/)) {
      n = Number(res[1]) / Number(res[2]);
    } else {
      n = Number(exprString);
    }

    return !Number.isNaN(n) ? n : null;
  }
  /**
   * Parse a string and return the resulting root element if it was valid XML.
   *
   * @param {string} xmlString
   * @param {string} expectedRootElemName
   * @return {Element}
   */


  static parseXmlString(xmlString, expectedRootElemName) {
    const parser = new DOMParser();
    let xml = null;

    try {
      xml = parser.parseFromString(xmlString, 'text/xml');
    } catch (exception) {
      shakaLog.error('XML parsing exception:', exception);
      return null;
    } // According to MDN, parseFromString never returns null.


    goog.asserts.assert(xml, 'Parsed XML document cannot be null!'); // Check for empty documents.

    const rootElem = xml.documentElement;

    if (!rootElem) {
      shakaLog.error('XML document was empty!');
      return null;
    } // Check for parser errors.


    const parserErrorElements = rootElem.getElementsByTagName('parsererror');

    if (parserErrorElements.length) {
      console.log('XML', xmlString);
      shakaLog.error('XML parser error found:', parserErrorElements[0]);
      return null;
    } // The top-level element in the loaded XML should have the name we expect.


    if (xml.documentElement.tagName != expectedRootElemName) {
      shakaLog.error(`XML tag name does not match expected "${expectedRootElemName}":`, xml.documentElement.tagName);
      return null;
    }

    return rootElem;
  }
  /**
   * Parse some UTF8 data and return the resulting root element if
   * it was valid XML.
   * @param {BufferSource} data
   * @param {string} expectedRootElemName
   * @return {Element}
   */


  static parseXml(data, expectedRootElemName) {
    try {
      const string = shaka.util.StringUtils.fromUTF8(data);
      return XmlUtils.parseXmlString(string, expectedRootElemName);
    } catch (exception) {
      shakaLog.error('parseXmlString threw!', exception);
      return null;
    }
  }

}

class OperationManager {
  /** */
  constructor() {
    /** @private {!Array.<!shaka.extern.IAbortableOperation>} */
    this.operations_ = [];
  }
  /**
   * Manage an operation.  This means aborting it on destroy() and removing it
   * from the management set when it complete.
   *
   * @param {!shaka.extern.IAbortableOperation} operation
   */


  manage(operation) {
    this.operations_.push(operation.finally(() => {
      this.operations_ = this.operations_.filter(it => it !== operation);
    }));
  }
  /** @override */


  destroy() {
    const cleanup = [];

    for (const op of this.operations_) {
      // Catch and ignore any failures.  This silences error logs in the
      // JavaScript console about uncaught Promise failures.
      op.promise.catch(() => {}); // Now abort the operation.

      cleanup.push(op.abort());
    }

    this.operations_ = [];
    return Promise.all(cleanup);
  }

}

class PeriodCombiner {
  /** */
  constructor() {
    /** @private {!Array.<shaka.extern.Variant>} */
    this.variants_ = [];
    /** @private {!Array.<shaka.extern.Stream>} */

    this.audioStreams_ = [];
    /** @private {!Array.<shaka.extern.Stream>} */

    this.videoStreams_ = [];
    /** @private {!Array.<shaka.extern.Stream>} */

    this.textStreams_ = [];
    /** @private {!Array.<shaka.extern.Stream>} */

    this.imageStreams_ = [];
    /**
     * The IDs of the periods we have already used to generate streams.
     * This helps us identify the periods which have been added when a live
     * stream is updated.
     *
     * @private {!Set.<string>}
     */

    this.usedPeriodIds_ = new Set();
  }
  /** @override */


  release() {
    const allStreams = this.audioStreams_.concat(this.videoStreams_, this.textStreams_, this.imageStreams_);

    for (const stream of allStreams) {
      if (stream.segmentIndex) {
        stream.segmentIndex.release();
      }
    }

    this.audioStreams_ = [];
    this.videoStreams_ = [];
    this.textStreams_ = [];
    this.imageStreams_ = [];
    this.variants_ = [];
  }
  /** @return {!Array.<shaka.extern.Variant>} */


  getVariants() {
    return this.variants_;
  }
  /** @return {!Array.<shaka.extern.Stream>} */


  getTextStreams() {
    // Return a copy of the array because makeTextStreamsForClosedCaptions
    // may make changes to the contents of the array. Those changes should not
    // propagate back to the PeriodCombiner.
    return this.textStreams_.slice();
  }
  /** @return {!Array.<shaka.extern.Stream>} */


  getImageStreams() {
    return this.imageStreams_;
  }
  /**
   * @param {!Array.<PeriodCombiner.Period>} periods
   * @param {boolean} isDynamic
   * @return {!Promise}
   */


  async combinePeriods(periods, isDynamic) {
    const {
      ContentType
    } = ManifestParserUtils;
    PeriodCombiner.filterOutAudioStreamDuplicates_(periods);
    PeriodCombiner.filterOutVideoStreamDuplicates_(periods);
    PeriodCombiner.filterOutTextStreamDuplicates_(periods);
    PeriodCombiner.filterOutImageStreamDuplicates_(periods); // Optimization: for single-period VOD, do nothing.  This makes sure
    // single-period DASH content will be 100% accurately represented in the
    // output.

    if (!isDynamic && periods.length == 1) {
      const firstPeriod = periods[0];
      this.audioStreams_ = firstPeriod.audioStreams;
      this.videoStreams_ = firstPeriod.videoStreams;
      this.textStreams_ = firstPeriod.textStreams;
      this.imageStreams_ = firstPeriod.imageStreams;
    } else {
      // Find the first period we haven't seen before.  Tag all the periods we
      // see now as "used".
      let firstNewPeriodIndex = -1;

      for (let i = 0; i < periods.length; i++) {
        const period = periods[i];

        if (this.usedPeriodIds_.has(period.id)) ; else {
          // This one _is_ new.
          this.usedPeriodIds_.add(period.id);

          if (firstNewPeriodIndex == -1) {
            // And it's the _first_ new one.
            firstNewPeriodIndex = i;
          }
        }
      }

      if (firstNewPeriodIndex == -1) {
        // Nothing new? Nothing to do.
        return;
      }

      const audioStreamsPerPeriod = periods.map(period => period.audioStreams);
      const videoStreamsPerPeriod = periods.map(period => period.videoStreams);
      const textStreamsPerPeriod = periods.map(period => period.textStreams);
      const imageStreamsPerPeriod = periods.map(period => period.imageStreams); // It's okay to have a period with no text or images, but our algorithm
      // fails on any period without matching streams.  So we add dummy streams
      // to each period.  Since we combine text streams by language and image
      // streams by resolution, we might need a dummy even in periods with these
      // streams already.

      for (const textStreams of textStreamsPerPeriod) {
        textStreams.push(PeriodCombiner.dummyStream_(ContentType.TEXT));
      }

      for (const imageStreams of imageStreamsPerPeriod) {
        imageStreams.push(PeriodCombiner.dummyStream_(ContentType.IMAGE));
      }

      await PeriodCombiner.combine_(this.audioStreams_, audioStreamsPerPeriod, firstNewPeriodIndex, PeriodCombiner.cloneStream_, PeriodCombiner.concatenateStreams_);
      await PeriodCombiner.combine_(this.videoStreams_, videoStreamsPerPeriod, firstNewPeriodIndex, PeriodCombiner.cloneStream_, PeriodCombiner.concatenateStreams_);
      await PeriodCombiner.combine_(this.textStreams_, textStreamsPerPeriod, firstNewPeriodIndex, PeriodCombiner.cloneStream_, PeriodCombiner.concatenateStreams_);
      await PeriodCombiner.combine_(this.imageStreams_, imageStreamsPerPeriod, firstNewPeriodIndex, PeriodCombiner.cloneStream_, PeriodCombiner.concatenateStreams_);
    } // Create variants for all audio/video combinations.


    let nextVariantId = 0;
    const variants = [];

    if (!this.videoStreams_.length || !this.audioStreams_.length) {
      // For audio-only or video-only content, just give each stream its own
      // variant.
      const streams = this.videoStreams_.concat(this.audioStreams_);

      for (const stream of streams) {
        const id = nextVariantId++;
        variants.push({
          id,
          language: stream.language,
          primary: stream.primary,
          audio: stream.type == ContentType.AUDIO ? stream : null,
          video: stream.type == ContentType.VIDEO ? stream : null,
          bandwidth: stream.bandwidth || 0,
          drmInfos: stream.drmInfos,
          allowedByApplication: true,
          allowedByKeySystem: true,
          decodingInfos: []
        });
      }
    } else {
      for (const audio of this.audioStreams_) {
        for (const video of this.videoStreams_) {
          const commonDrmInfos = DrmEngine.getCommonDrmInfos(audio.drmInfos, video.drmInfos);

          if (audio.drmInfos.length && video.drmInfos.length && !commonDrmInfos.length) {
            shakaLog.warning('Incompatible DRM in audio & video, skipping variant creation.', audio, video);
            continue;
          }

          const id = nextVariantId++;
          variants.push({
            id,
            language: audio.language,
            primary: audio.primary,
            audio,
            video,
            bandwidth: (audio.bandwidth || 0) + (video.bandwidth || 0),
            drmInfos: commonDrmInfos,
            allowedByApplication: true,
            allowedByKeySystem: true,
            decodingInfos: []
          });
        }
      }
    }

    this.variants_ = variants;
  }
  /**
   * @param {!Array.<PeriodCombiner.Period>} periods
   * @private
   */


  static filterOutAudioStreamDuplicates_(periods) {
    // Two audio streams are considered to be duplicates of
    // one another if their ids are different, but all the other
    // information is the same.
    for (const period of periods) {
      const filteredAudios = [];

      for (const a1 of period.audioStreams) {
        let duplicate = false;

        for (const a2 of filteredAudios) {
          if (a1.id != a2.id && a1.channelsCount == a2.channelsCount && a1.language == a2.language && a1.bandwidth == a2.bandwidth && a1.label == a2.label && a1.codecs == a2.codecs && a1.mimeType == a2.mimeType && hasSameElements(a1.roles, a2.roles) && a1.audioSamplingRate == a2.audioSamplingRate && a1.primary == a2.primary) {
            duplicate = true;
          }
        }

        if (!duplicate) {
          filteredAudios.push(a1);
        }
      }

      period.audioStreams = filteredAudios;
    }
  }
  /**
   * @param {!Array.<PeriodCombiner.Period>} periods
   * @private
   */


  static filterOutTextStreamDuplicates_(periods) {
    // Two text streams are considered to be duplicates of
    // one another if their ids are different, but all the other
    // information is the same.
    for (const period of periods) {
      const filteredTexts = [];

      for (const t1 of period.textStreams) {
        let duplicate = false;

        for (const t2 of filteredTexts) {
          if (t1.id != t2.id && t1.language == t2.language && t1.label == t2.label && t1.codecs == t2.codecs && t1.mimeType == t2.mimeType && t1.bandwidth == t2.bandwidth && hasSameElements(t1.roles, t2.roles)) {
            duplicate = true;
          }
        }

        if (!duplicate) {
          filteredTexts.push(t1);
        }
      }

      period.textStreams = filteredTexts;
    }
  }
  /**
   * @param {!Array.<PeriodCombiner.Period>} periods
   * @private
   */


  static filterOutVideoStreamDuplicates_(periods) {
    // Two video streams are considered to be duplicates of
    // one another if their ids are different, but all the other
    // information is the same.
    for (const period of periods) {
      const filteredVideos = [];

      for (const v1 of period.videoStreams) {
        let duplicate = false;

        for (const v2 of filteredVideos) {
          if (v1.id != v2.id && v1.width == v2.width && v1.frameRate == v2.frameRate && v1.codecs == v2.codecs && v1.mimeType == v2.mimeType && v1.label == v2.label && hasSameElements(v1.roles, v2.roles) && mapHasSameElements(v1.closedCaptions, v2.closedCaptions) && v1.bandwidth == v2.bandwidth) {
            duplicate = true;
          }
        }

        if (!duplicate) {
          filteredVideos.push(v1);
        }
      }

      period.videoStreams = filteredVideos;
    }
  }
  /**
   * @param {!Array.<PeriodCombiner.Period>} periods
   * @private
   */


  static filterOutImageStreamDuplicates_(periods) {
    // Two image streams are considered to be duplicates of
    // one another if their ids are different, but all the other
    // information is the same.
    for (const period of periods) {
      const filteredImages = [];

      for (const i1 of period.imageStreams) {
        let duplicate = false;

        for (const i2 of filteredImages) {
          if (i1.id != i2.id && i1.width == i2.width && i1.codecs == i2.codecs && i1.mimeType == i2.mimeType) {
            duplicate = true;
          }
        }

        if (!duplicate) {
          filteredImages.push(i1);
        }
      }

      period.imageStreams = filteredImages;
    }
  }
  /**
   * Stitch together DB streams across periods, taking a mix of stream types.
   * The offline database does not separate these by type.
   *
   * Unlike the DASH case, this does not need to maintain any state for manifest
   * updates.
   *
   * @param {!Array.<!Array.<shaka.extern.StreamDB>>} streamDbsPerPeriod
   * @return {!Promise.<!Array.<shaka.extern.StreamDB>>}
   */


  static async combineDbStreams(streamDbsPerPeriod) {
    const {
      ContentType
    } = ManifestParserUtils; // Optimization: for single-period content, do nothing.  This makes sure
    // single-period DASH or any HLS content stored offline will be 100%
    // accurately represented in the output.

    if (streamDbsPerPeriod.length == 1) {
      return streamDbsPerPeriod[0];
    }

    const audioStreamDbsPerPeriod = streamDbsPerPeriod.map(streams => streams.filter(s => s.type == ContentType.AUDIO));
    const videoStreamDbsPerPeriod = streamDbsPerPeriod.map(streams => streams.filter(s => s.type == ContentType.VIDEO));
    const textStreamDbsPerPeriod = streamDbsPerPeriod.map(streams => streams.filter(s => s.type == ContentType.TEXT));
    const imageStreamDbsPerPeriod = streamDbsPerPeriod.map(streams => streams.filter(s => s.type == ContentType.IMAGE)); // It's okay to have a period with no text or images, but our algorithm
    // fails on any period without matching streams.  So we add dummy streams to
    // each period.  Since we combine text streams by language and image streams
    // by resolution, we might need a dummy even in periods with these streams
    // already.

    for (const textStreams of textStreamDbsPerPeriod) {
      textStreams.push(PeriodCombiner.dummyStreamDB_(ContentType.TEXT));
    }

    for (const imageStreams of imageStreamDbsPerPeriod) {
      imageStreams.push(PeriodCombiner.dummyStreamDB_(ContentType.IMAGE));
    }

    const combinedAudioStreamDbs = await PeriodCombiner.combine_(
    /* outputStreams= */
    [], audioStreamDbsPerPeriod,
    /* firstNewPeriodIndex= */
    0, PeriodCombiner.cloneStreamDB_, PeriodCombiner.concatenateStreamDBs_);
    const combinedVideoStreamDbs = await PeriodCombiner.combine_(
    /* outputStreams= */
    [], videoStreamDbsPerPeriod,
    /* firstNewPeriodIndex= */
    0, PeriodCombiner.cloneStreamDB_, PeriodCombiner.concatenateStreamDBs_);
    const combinedTextStreamDbs = await PeriodCombiner.combine_(
    /* outputStreams= */
    [], textStreamDbsPerPeriod,
    /* firstNewPeriodIndex= */
    0, PeriodCombiner.cloneStreamDB_, PeriodCombiner.concatenateStreamDBs_);
    const combinedImageStreamDbs = await PeriodCombiner.combine_(
    /* outputStreams= */
    [], imageStreamDbsPerPeriod,
    /* firstNewPeriodIndex= */
    0, PeriodCombiner.cloneStreamDB_, PeriodCombiner.concatenateStreamDBs_); // Recreate variantIds from scratch in the output.
    // HLS content is always single-period, so the early return at the top of
    // this method would catch all HLS content.  DASH content stored with v3.0
    // will already be flattened before storage.  Therefore the only content
    // that reaches this point is multi-period DASH content stored before v3.0.
    // Such content always had variants generated from all combinations of audio
    // and video, so we can simply do that now without loss of correctness.

    let nextVariantId = 0;

    if (!combinedVideoStreamDbs.length || !combinedAudioStreamDbs.length) {
      // For audio-only or video-only content, just give each stream its own
      // variant ID.
      const combinedStreamDbs = combinedVideoStreamDbs.concat(combinedAudioStreamDbs);

      for (const stream of combinedStreamDbs) {
        stream.variantIds = [nextVariantId++];
      }
    } else {
      for (const audio of combinedAudioStreamDbs) {
        for (const video of combinedVideoStreamDbs) {
          const id = nextVariantId++;
          video.variantIds.push(id);
          audio.variantIds.push(id);
        }
      }
    }

    return combinedVideoStreamDbs.concat(combinedAudioStreamDbs).concat(combinedTextStreamDbs).concat(combinedImageStreamDbs);
  }
  /**
   * Combine input Streams per period into flat output Streams.
   * Templatized to handle both DASH Streams and offline StreamDBs.
   *
   * @param {!Array.<T>} outputStreams A list of existing output streams, to
   *   facilitate updates for live DASH content.  Will be modified and returned.
   * @param {!Array.<!Array.<T>>} streamsPerPeriod A list of lists of Streams
   *   from each period.
   * @param {number} firstNewPeriodIndex An index into streamsPerPeriod which
   *   represents the first new period that hasn't been processed yet.
   * @param {function(T):T} clone Make a clone of an input stream.
   * @param {function(T, T)} concat Concatenate the second stream onto the end
   *   of the first.
   *
   * @return {!Promise.<!Array.<T>>} The same array passed to outputStreams,
   *   modified to include any newly-created streams.
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */


  static async combine_(outputStreams, streamsPerPeriod, firstNewPeriodIndex, clone, concat) {
    const {
      ContentType
    } = ManifestParserUtils;
    const unusedStreamsPerPeriod = [];

    for (let i = 0; i < streamsPerPeriod.length; i++) {
      if (i >= firstNewPeriodIndex) {
        // This periods streams are all new.
        unusedStreamsPerPeriod.push(new Set(streamsPerPeriod[i]));
      } else {
        // This period's streams have all been used already.
        unusedStreamsPerPeriod.push(new Set());
      }
    } // First, extend all existing output Streams into the new periods.


    for (const outputStream of outputStreams) {
      // eslint-disable-next-line no-await-in-loop
      const ok = await PeriodCombiner.extendExistingOutputStream_(outputStream, streamsPerPeriod, firstNewPeriodIndex, concat, unusedStreamsPerPeriod);

      if (!ok) {
        // This output Stream was not properly extended to include streams from
        // the new period.  This is likely a bug in our algorithm, so throw an
        // error.
        throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.PERIOD_FLATTENING_FAILED);
      } // This output stream is now complete with content from all known
      // periods.

    } // for (const outputStream of outputStreams)


    for (const unusedStreams of unusedStreamsPerPeriod) {
      for (const stream of unusedStreams) {
        // Create a new output stream which includes this input stream.
        const outputStream = PeriodCombiner.createNewOutputStream_(stream, streamsPerPeriod, clone, concat, unusedStreamsPerPeriod);

        if (outputStream) {
          outputStreams.push(outputStream);
        }
      } // for (const stream of unusedStreams)

    } // for (const unusedStreams of unusedStreamsPerPeriod)


    for (const unusedStreams of unusedStreamsPerPeriod) {
      for (const stream of unusedStreams) {
        const isDummyText = stream.type == ContentType.TEXT && !stream.language;
        const isDummyImage = stream.type == ContentType.IMAGE && !stream.tilesLayout;

        if (isDummyText || isDummyImage) {
          // This is one of our dummy streams, so ignore it.  We may not use
          // them all, and that's fine.
          continue;
        } // If this stream has a different codec/MIME than any other stream,
        // then we can't play it.
        // TODO(#1528): Consider changing this when we support codec switching.


        const hasCodec = outputStreams.some(s => s.mimeType == stream.mimeType && MimeUtils.getCodecBase(s.codecs) == MimeUtils.getCodecBase(stream.codecs));

        if (!hasCodec) {
          continue;
        } // Any other unused stream is likely a bug in our algorithm, so throw
        // an error.


        shakaLog.error('Unused stream in period-flattening!', stream, outputStreams);
        throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.PERIOD_FLATTENING_FAILED);
      }
    }

    return outputStreams;
  }
  /**
   * @param {T} outputStream An existing output stream which needs to be
   *   extended into new periods.
   * @param {!Array.<!Array.<T>>} streamsPerPeriod A list of lists of Streams
   *   from each period.
   * @param {number} firstNewPeriodIndex An index into streamsPerPeriod which
   *   represents the first new period that hasn't been processed yet.
   * @param {function(T, T)} concat Concatenate the second stream onto the end
   *   of the first.
   * @param {!Array.<!Set.<T>>} unusedStreamsPerPeriod An array of sets of
   *   unused streams from each period.
   *
   * @return {!Promise.<boolean>}
   *
   * @template T
   * Should only be called with a Stream type in practice, but has call sites
   * from other templated functions that also accept a StreamDB.
   *
   * @private
   */


  static async extendExistingOutputStream_(outputStream, streamsPerPeriod, firstNewPeriodIndex, concat, unusedStreamsPerPeriod) {
    PeriodCombiner.findMatchesInAllPeriods_(streamsPerPeriod, outputStream); // This only exists where T == Stream, and this should only ever be called
    // on Stream types.  StreamDB should not have pre-existing output streams.

    goog.asserts.assert(outputStream.createSegmentIndex, 'outputStream should be a Stream type!');

    if (!outputStream.matchedStreams) {
      // We were unable to extend this output stream.
      shakaLog.error('No matches extending output stream!', outputStream, streamsPerPeriod);
      return false;
    } // We need to create all the per-period segment indexes and append them to
    // the output's MetaSegmentIndex.


    if (outputStream.segmentIndex) {
      await PeriodCombiner.extendOutputSegmentIndex_(outputStream, firstNewPeriodIndex);
    }

    PeriodCombiner.extendOutputStream_(outputStream, firstNewPeriodIndex, concat, unusedStreamsPerPeriod);
    return true;
  }
  /**
   * Creates the segment indexes for an array of input streams, and append them
   * to the output stream's segment index.
   *
   * @param {shaka.extern.Stream} outputStream
   * @param {number} firstNewPeriodIndex An index into streamsPerPeriod which
   *   represents the first new period that hasn't been processed yet.
   * @private
   */


  static async extendOutputSegmentIndex_(outputStream, firstNewPeriodIndex) {
    const operations = [];
    const streams = outputStream.matchedStreams;
    goog.asserts.assert(streams, 'matched streams should be valid');

    for (const stream of streams) {
      operations.push(stream.createSegmentIndex());

      if (stream.trickModeVideo && !stream.trickModeVideo.segmentIndex) {
        operations.push(stream.trickModeVideo.createSegmentIndex());
      }
    }

    await Promise.all(operations); // Concatenate the new matches onto the stream, starting at the first new
    // period.
    // Satisfy the compiler about the type.
    // Also checks if the segmentIndex is still valid after the async
    // operations, to make sure we stop if the active stream has changed.

    if (outputStream.segmentIndex instanceof MetaSegmentIndex) {
      for (let i = 0; i < streams.length; i++) {
        const match = streams[i];

        if (match.segmentIndex && i >= firstNewPeriodIndex) {
          goog.asserts.assert(match.segmentIndex, 'stream should have a segmentIndex.');
          outputStream.segmentIndex.appendSegmentIndex(match.segmentIndex);
        }
      }
    }
  }
  /**
   * Create a new output Stream based on a particular input Stream.  Locates
   * matching Streams in all other periods and combines them into an output
   * Stream.
   * Templatized to handle both DASH Streams and offline StreamDBs.
   *
   * @param {T} stream An input stream on which to base the output stream.
   * @param {!Array.<!Array.<T>>} streamsPerPeriod A list of lists of Streams
   *   from each period.
   * @param {function(T):T} clone Make a clone of an input stream.
   * @param {function(T, T)} concat Concatenate the second stream onto the end
   *   of the first.
   * @param {!Array.<!Set.<T>>} unusedStreamsPerPeriod An array of sets of
   *   unused streams from each period.
   *
   * @return {?T} A newly-created output Stream, or null if matches
   *   could not be found.`
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */


  static createNewOutputStream_(stream, streamsPerPeriod, clone, concat, unusedStreamsPerPeriod) {
    // Start by cloning the stream without segments, key IDs, etc.
    const outputStream = clone(stream); // Find best-matching streams in all periods.

    PeriodCombiner.findMatchesInAllPeriods_(streamsPerPeriod, outputStream); // This only exists where T == Stream.

    if (outputStream.createSegmentIndex) {
      // Override the createSegmentIndex function of the outputStream.
      outputStream.createSegmentIndex = async () => {
        if (!outputStream.segmentIndex) {
          outputStream.segmentIndex = new MetaSegmentIndex();
          await PeriodCombiner.extendOutputSegmentIndex_(outputStream,
          /* firstNewPeriodIndex= */
          0);
        }
      }; // For T == Stream, we need to create all the per-period segment indexes
      // in advance.  concat() will add them to the output's MetaSegmentIndex.

    }

    if (!outputStream.matchedStreams) {
      // This is not a stream we can build output from, but it may become part
      // of another output based on another period's stream.
      return null;
    }

    PeriodCombiner.extendOutputStream_(outputStream,
    /* firstNewPeriodIndex= */
    0, concat, unusedStreamsPerPeriod);
    return outputStream;
  }
  /**
   * @param {T} outputStream An existing output stream which needs to be
   *   extended into new periods.
   * @param {number} firstNewPeriodIndex An index into streamsPerPeriod which
   *   represents the first new period that hasn't been processed yet.
   * @param {function(T, T)} concat Concatenate the second stream onto the end
   *   of the first.
   * @param {!Array.<!Set.<T>>} unusedStreamsPerPeriod An array of sets of
   *   unused streams from each period.
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */


  static extendOutputStream_(outputStream, firstNewPeriodIndex, concat, unusedStreamsPerPeriod) {
    const {
      ContentType
    } = ManifestParserUtils;
    const {
      LanguageUtils
    } = shaka.util;
    const matches = outputStream.matchedStreams; // Assure the compiler that matches didn't become null during the async
    // operation before.

    goog.asserts.assert(outputStream.matchedStreams, 'matchedStreams should be non-null'); // Concatenate the new matches onto the stream, starting at the first new
    // period.

    for (let i = 0; i < matches.length; i++) {
      if (i >= firstNewPeriodIndex) {
        const match = matches[i];
        concat(outputStream, match); // We only consider an audio stream "used" if its language is related to
        // the output language.  There are scenarios where we want to generate
        // separate tracks for each language, even when we are forced to connect
        // unrelated languages across periods.

        let used = true;

        if (outputStream.type == ContentType.AUDIO) {
          const relatedness = LanguageUtils.relatedness(outputStream.language, match.language);

          if (relatedness == 0) {
            used = false;
          }
        }

        if (used) {
          unusedStreamsPerPeriod[i].delete(match);
        }
      }
    }
  }
  /**
   * Clone a Stream to make an output Stream for combining others across
   * periods.
   *
   * @param {shaka.extern.Stream} stream
   * @return {shaka.extern.Stream}
   * @private
   */


  static cloneStream_(stream) {
    const clone =
    /** @type {shaka.extern.Stream} */
    { ...stream
    }; // These are wiped out now and rebuilt later from the various per-period
    // streams that match this output.

    clone.originalId = null;

    clone.createSegmentIndex = () => Promise.resolve();

    clone.closeSegmentIndex = () => {
      if (clone.segmentIndex) {
        clone.segmentIndex.release();
        clone.segmentIndex = null;
      } // Close the segment index of the matched streams.


      if (clone.matchedStreams) {
        for (const match of clone.matchedStreams) {
          if (match.segmentIndex) {
            match.segmentIndex.release();
            match.segmentIndex = null;
          }
        }
      }
    };

    clone.segmentIndex = null;
    clone.emsgSchemeIdUris = [];
    clone.keyIds = new Set();
    clone.closedCaptions = null;
    clone.trickModeVideo = null;
    return clone;
  }
  /**
   * Clone a StreamDB to make an output stream for combining others across
   * periods.
   *
   * @param {shaka.extern.StreamDB} streamDb
   * @return {shaka.extern.StreamDB}
   * @private
   */


  static cloneStreamDB_(streamDb) {
    const clone =
    /** @type {shaka.extern.StreamDB} */
    { ...streamDb
    }; // These are wiped out now and rebuilt later from the various per-period
    // streams that match this output.

    clone.keyIds = new Set();
    clone.segments = [];
    clone.variantIds = [];
    clone.closedCaptions = null;
    return clone;
  }
  /**
   * Combine the various fields of the input Stream into the output.
   *
   * @param {shaka.extern.Stream} output
   * @param {shaka.extern.Stream} input
   * @private
   */


  static concatenateStreams_(output, input) {
    // We keep the original stream's bandwidth, resolution, frame rate,
    // sample rate, and channel count to ensure that it's properly
    // matched with similar content in other periods further down
    // the line.
    // Combine arrays, keeping only the unique elements
    const combineArrays = (a, b) => Array.from(new Set(a.concat(b)));

    output.roles = combineArrays(output.roles, input.roles);

    if (input.emsgSchemeIdUris) {
      output.emsgSchemeIdUris = combineArrays(output.emsgSchemeIdUris, input.emsgSchemeIdUris);
    }

    const combineSets = (a, b) => new Set([...a, ...b]);

    output.keyIds = combineSets(output.keyIds, input.keyIds);

    if (output.originalId == null) {
      output.originalId = input.originalId;
    } else {
      output.originalId += `,${input.originalId || ''}`;
    }

    const commonDrmInfos = DrmEngine.getCommonDrmInfos(output.drmInfos, input.drmInfos);

    if (input.drmInfos.length && output.drmInfos.length && !commonDrmInfos.length) {
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.INCONSISTENT_DRM_ACROSS_PERIODS);
    }

    output.drmInfos = commonDrmInfos; // The output is encrypted if any input was encrypted.

    output.encrypted = output.encrypted || input.encrypted; // Combine the closed captions maps.

    if (input.closedCaptions) {
      if (!output.closedCaptions) {
        output.closedCaptions = new Map();
      }

      for (const [key, value] of input.closedCaptions) {
        output.closedCaptions.set(key, value);
      }
    } // Combine trick-play video streams, if present.


    if (input.trickModeVideo) {
      if (!output.trickModeVideo) {
        // Create a fresh output stream for trick-mode playback.
        output.trickModeVideo = PeriodCombiner.cloneStream_(input.trickModeVideo); // TODO: fix the createSegmentIndex function for trickModeVideo.
        // The trick-mode tracks in multi-period content should have trick-mode
        // segment indexes whenever available, rather than only regular-mode
        // segment indexes.

        output.trickModeVideo.createSegmentIndex = () => {
          // Satisfy the compiler about the type.
          goog.asserts.assert(output.segmentIndex instanceof MetaSegmentIndex, 'The stream should have a MetaSegmentIndex.');
          output.trickModeVideo.segmentIndex = output.segmentIndex.clone();
          return Promise.resolve();
        };
      } // Concatenate the trick mode input onto the trick mode output.


      PeriodCombiner.concatenateStreams_(output.trickModeVideo, input.trickModeVideo);
    } else if (output.trickModeVideo) {
      // We have a trick mode output, but no input from this Period.  Fill it in
      // from the standard input Stream.
      PeriodCombiner.concatenateStreams_(output.trickModeVideo, input);
    }
  }
  /**
   * Combine the various fields of the input StreamDB into the output.
   *
   * @param {shaka.extern.StreamDB} output
   * @param {shaka.extern.StreamDB} input
   * @private
   */


  static concatenateStreamDBs_(output, input) {
    // Combine arrays, keeping only the unique elements
    const combineArrays = (a, b) => Array.from(new Set(a.concat(b)));

    output.roles = combineArrays(output.roles, input.roles);

    const combineSets = (a, b) => new Set([...a, ...b]);

    output.keyIds = combineSets(output.keyIds, input.keyIds); // The output is encrypted if any input was encrypted.

    output.encrypted = output.encrypted && input.encrypted; // Concatenate segments without de-duping.

    output.segments.push(...input.segments); // Combine the closed captions maps.

    if (input.closedCaptions) {
      if (!output.closedCaptions) {
        output.closedCaptions = new Map();
      }

      for (const [key, value] of input.closedCaptions) {
        output.closedCaptions.set(key, value);
      }
    }
  }
  /**
   * Finds streams in all periods which match the output stream.
   *
   * @param {!Array.<!Array.<T>>} streamsPerPeriod
   * @param {T} outputStream
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */


  static findMatchesInAllPeriods_(streamsPerPeriod, outputStream) {
    const matches = [];

    for (const streams of streamsPerPeriod) {
      const match = PeriodCombiner.findBestMatchInPeriod_(streams, outputStream);

      if (!match) {
        return;
      }

      matches.push(match);
    }

    outputStream.matchedStreams = matches;
  }
  /**
   * Find the best match for the output stream.
   *
   * @param {!Array.<T>} streams
   * @param {T} outputStream
   * @return {?T}  Returns null if no match can be found.
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */


  static findBestMatchInPeriod_(streams, outputStream) {
    const areCompatible = {
      audio: PeriodCombiner.areAVStreamsCompatible_,
      video: PeriodCombiner.areAVStreamsCompatible_,
      text: PeriodCombiner.areTextStreamsCompatible_,
      image: PeriodCombiner.areImageStreamsCompatible_
    }[outputStream.type];
    const isBetterMatch = {
      audio: PeriodCombiner.isAudioStreamBetterMatch_,
      video: PeriodCombiner.isVideoStreamBetterMatch_,
      text: PeriodCombiner.isTextStreamBetterMatch_,
      image: PeriodCombiner.isImageStreamBetterMatch_
    }[outputStream.type];
    let best = null;

    for (const stream of streams) {
      if (!areCompatible(outputStream, stream)) {
        continue;
      }

      if (!best || isBetterMatch(outputStream, best, stream)) {
        best = stream;
      }
    }

    return best;
  }
  /**
   * @param {T} outputStream An audio or video output stream
   * @param {T} candidate A candidate stream to be combined with the output
   * @return {boolean} True if the candidate could be combined with the
   *   output stream
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */


  static areAVStreamsCompatible_(outputStream, candidate) {
    const getCodecBase = codecs => MimeUtils.getCodecBase(codecs); // Check MIME type and codecs, which should always be the same.


    if (candidate.mimeType != outputStream.mimeType || getCodecBase(candidate.codecs) != getCodecBase(outputStream.codecs)) {
      return false;
    } // This field is only available on Stream, not StreamDB.


    if (outputStream.drmInfos) {
      // Check for compatible DRM systems.  Note that clear streams are
      // implicitly compatible with any DRM and with each other.
      if (!DrmEngine.areDrmCompatible(outputStream.drmInfos, candidate.drmInfos)) {
        return false;
      }
    }

    return true;
  }
  /**
   * @param {T} outputStream A text output stream
   * @param {T} candidate A candidate stream to be combined with the output
   * @return {boolean} True if the candidate could be combined with the
   *   output
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */


  static areTextStreamsCompatible_(outputStream, candidate) {
    const {
      LanguageUtils
    } = shaka.util; // For text, we don't care about MIME type or codec.  We can always switch
    // between text types.
    // The output stream should not be a dummy stream inserted to fill a period
    // gap.  So reject any candidate if the output has no language.  This would
    // cause findMatchesInAllPeriods_ to return null and this output stream to
    // be skipped (meaning no output streams based on it).

    if (!outputStream.language) {
      return false;
    } // If the candidate is a dummy, then it is compatible, and we could use it
    // if nothing else matches.


    if (!candidate.language) {
      return true;
    }

    const languageRelatedness = LanguageUtils.relatedness(outputStream.language, candidate.language); // We will strictly avoid combining text across languages or "kinds"
    // (caption vs subtitle).

    if (languageRelatedness == 0 || candidate.kind != outputStream.kind) {
      return false;
    }

    return true;
  }
  /**
   * @param {T} outputStream A image output stream
   * @param {T} candidate A candidate stream to be combined with the output
   * @return {boolean} True if the candidate could be combined with the
   *   output
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */
  // eslint-disable-next-line no-unused-vars


  static areImageStreamsCompatible_(outputStream, candidate) {
    // For image, we don't care about MIME type.  We can always switch
    // between image types.
    // The output stream should not be a dummy stream inserted to fill a period
    // gap.  So reject any candidate if the output has no tilesLayout.  This
    // would cause findMatchesInAllPeriods_ to return null and this output
    // stream to be skipped (meaning no output streams based on it).
    if (!outputStream.tilesLayout) {
      return false;
    }

    return true;
  }
  /**
   * @param {T} outputStream An audio output stream
   * @param {T} best The best match so far for this period
   * @param {T} candidate A candidate stream which might be better
   * @return {boolean} True if the candidate is a better match
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */


  static isAudioStreamBetterMatch_(outputStream, best, candidate) {
    const {
      LanguageUtils
    } = shaka.util;
    const {
      BETTER,
      WORSE
    } = PeriodCombiner.BetterOrWorse; // If the output stream was based on the candidate stream, the candidate
    // stream should be considered a better match. We can check this by
    // comparing their ids.

    if (outputStream.id == candidate.id) {
      return true;
    } // Otherwise, compare the streams' characteristics to determine the best
    // match.
    // The most important thing is language.  In some cases, we will accept a
    // different language across periods when we must.


    const bestRelatedness = LanguageUtils.relatedness(outputStream.language, best.language);
    const candidateRelatedness = LanguageUtils.relatedness(outputStream.language, candidate.language);

    if (candidateRelatedness > bestRelatedness) {
      return true;
    }

    if (candidateRelatedness < bestRelatedness) {
      return false;
    } // If the language doesn't match, but the candidate is the "primary"
    // language, then that should be preferred as a fallback.


    if (!best.primary && candidate.primary) {
      return true;
    }

    if (best.primary && !candidate.primary) {
      return false;
    } // If language-based differences haven't decided this, look at roles.  If
    // the candidate has more roles in common with the output, upgrade to the
    // candidate.


    if (outputStream.roles.length) {
      const bestRoleMatches = best.roles.filter(role => outputStream.roles.includes(role));
      const candidateRoleMatches = candidate.roles.filter(role => outputStream.roles.includes(role));

      if (candidateRoleMatches.length > bestRoleMatches.length) {
        return true;
      }

      if (candidateRoleMatches.length < bestRoleMatches.length) {
        return false;
      } // Both streams have the same role overlap with the outputStream
      // If this is the case, choose the stream with the fewer roles overall.
      // Streams that match best together tend to be streams with the same
      // roles, e g stream1 with roles [r1, r2] is likely a better match
      // for stream2 with roles [r1, r2] vs stream3 with roles
      // [r1, r2, r3, r4].
      // If we match stream1 with stream3 due to the same role overlap,
      // stream2 is likely to be left unmatched and error out later.
      // See https://github.com/shaka-project/shaka-player/issues/2542 for
      // more details.


      return candidate.roles.length < best.roles.length;
    }

    if (!candidate.roles.length && best.roles.length) {
      // If outputStream has no roles, and only one of the streams has no roles,
      // choose the one with no roles.
      return true;
    }

    if (candidate.roles.length && !best.roles.length) {
      return false;
    } // If language-based and role-based features are equivalent, take the audio
    // with the closes channel count to the output.


    const channelsBetterOrWorse = PeriodCombiner.compareClosestPreferLower(outputStream.channelsCount, best.channelsCount, candidate.channelsCount);

    if (channelsBetterOrWorse == BETTER) {
      return true;
    }

    if (channelsBetterOrWorse == WORSE) {
      return false;
    } // If channels are equal, take the closest sample rate to the output.


    const sampleRateBetterOrWorse = PeriodCombiner.compareClosestPreferLower(outputStream.audioSamplingRate, best.audioSamplingRate, candidate.audioSamplingRate);

    if (sampleRateBetterOrWorse == BETTER) {
      return true;
    }

    if (sampleRateBetterOrWorse == WORSE) {
      return false;
    }

    if (outputStream.bandwidth) {
      // Take the audio with the closest bandwidth to the output.
      const bandwidthBetterOrWorse = PeriodCombiner.compareClosestPreferMinimalAbsDiff_(outputStream.bandwidth, best.bandwidth, candidate.bandwidth);

      if (bandwidthBetterOrWorse == BETTER) {
        return true;
      }

      if (bandwidthBetterOrWorse == WORSE) {
        return false;
      }
    } // If the result of each comparison was inconclusive, default to false.


    return false;
  }
  /**
   * @param {T} outputStream A video output stream
   * @param {T} best The best match so far for this period
   * @param {T} candidate A candidate stream which might be better
   * @return {boolean} True if the candidate is a better match
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */


  static isVideoStreamBetterMatch_(outputStream, best, candidate) {
    const {
      BETTER,
      WORSE
    } = PeriodCombiner.BetterOrWorse; // If the output stream was based on the candidate stream, the candidate
    // stream should be considered a better match. We can check this by
    // comparing their ids.

    if (outputStream.id == candidate.id) {
      return true;
    } // Otherwise, compare the streams' characteristics to determine the best
    // match.
    // Take the video with the closest resolution to the output.


    const resolutionBetterOrWorse = PeriodCombiner.compareClosestPreferLower(outputStream.width * outputStream.height, best.width * best.height, candidate.width * candidate.height);

    if (resolutionBetterOrWorse == BETTER) {
      return true;
    }

    if (resolutionBetterOrWorse == WORSE) {
      return false;
    } // We may not know the frame rate for the content, in which case this gets
    // skipped.


    if (outputStream.frameRate) {
      // Take the video with the closest frame rate to the output.
      const frameRateBetterOrWorse = PeriodCombiner.compareClosestPreferLower(outputStream.frameRate, best.frameRate, candidate.frameRate);

      if (frameRateBetterOrWorse == BETTER) {
        return true;
      }

      if (frameRateBetterOrWorse == WORSE) {
        return false;
      }
    }

    if (outputStream.bandwidth) {
      // Take the video with the closest bandwidth to the output.
      const bandwidthBetterOrWorse = PeriodCombiner.compareClosestPreferMinimalAbsDiff_(outputStream.bandwidth, best.bandwidth, candidate.bandwidth);

      if (bandwidthBetterOrWorse == BETTER) {
        return true;
      }

      if (bandwidthBetterOrWorse == WORSE) {
        return false;
      }
    } // If the result of each comparison was inconclusive, default to false.


    return false;
  }
  /**
   * @param {T} outputStream A text output stream
   * @param {T} best The best match so far for this period
   * @param {T} candidate A candidate stream which might be better
   * @return {boolean} True if the candidate is a better match
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */


  static isTextStreamBetterMatch_(outputStream, best, candidate) {
    const {
      LanguageUtils
    } = shaka.util; // If the output stream was based on the candidate stream, the candidate
    // stream should be considered a better match. We can check this by
    // comparing their ids.

    if (outputStream.id == candidate.id) {
      return true;
    } // Otherwise, compare the streams' characteristics to determine the best
    // match.
    // The most important thing is language.  In some cases, we will accept a
    // different language across periods when we must.


    const bestRelatedness = LanguageUtils.relatedness(outputStream.language, best.language);
    const candidateRelatedness = LanguageUtils.relatedness(outputStream.language, candidate.language);

    if (candidateRelatedness > bestRelatedness) {
      return true;
    }

    if (candidateRelatedness < bestRelatedness) {
      return false;
    } // If the language doesn't match, but the candidate is the "primary"
    // language, then that should be preferred as a fallback.


    if (!best.primary && candidate.primary) {
      return true;
    }

    if (best.primary && !candidate.primary) {
      return false;
    } // If the candidate has more roles in common with the output, upgrade to the
    // candidate.


    if (outputStream.roles.length) {
      const bestRoleMatches = best.roles.filter(role => outputStream.roles.includes(role));
      const candidateRoleMatches = candidate.roles.filter(role => outputStream.roles.includes(role));

      if (candidateRoleMatches.length > bestRoleMatches.length) {
        return true;
      }

      if (candidateRoleMatches.length < bestRoleMatches.length) {
        return false;
      }
    } else if (!candidate.roles.length && best.roles.length) {
      // If outputStream has no roles, and only one of the streams has no roles,
      // choose the one with no roles.
      return true;
    } else if (candidate.roles.length && !best.roles.length) {
      return false;
    } // If the candidate has the same MIME type and codec, upgrade to the
    // candidate.  It's not required that text streams use the same format
    // across periods, but it's a helpful signal.  Some content in our demo app
    // contains the same languages repeated with two different text formats in
    // each period.  This condition ensures that all text streams are used.
    // Otherwise, we wind up with some one stream of each language left unused,
    // triggering a failure.


    if (candidate.mimeType == outputStream.mimeType && candidate.codecs == outputStream.codecs && (best.mimeType != outputStream.mimeType || best.codecs != outputStream.codecs)) {
      return true;
    } // If the result of each comparison was inconclusive, default to false.


    return false;
  }
  /**
   * @param {T} outputStream A image output stream
   * @param {T} best The best match so far for this period
   * @param {T} candidate A candidate stream which might be better
   * @return {boolean} True if the candidate is a better match
   *
   * @template T
   * Accepts either a StreamDB or Stream type.
   *
   * @private
   */


  static isImageStreamBetterMatch_(outputStream, best, candidate) {
    const {
      BETTER,
      WORSE
    } = PeriodCombiner.BetterOrWorse; // If the output stream was based on the candidate stream, the candidate
    // stream should be considered a better match. We can check this by
    // comparing their ids.

    if (outputStream.id == candidate.id) {
      return true;
    } // Take the image with the closest resolution to the output.


    const resolutionBetterOrWorse = PeriodCombiner.compareClosestPreferLower(outputStream.width * outputStream.height, best.width * best.height, candidate.width * candidate.height);

    if (resolutionBetterOrWorse == BETTER) {
      return true;
    }

    if (resolutionBetterOrWorse == WORSE) {
      return false;
    } // If the result of each comparison was inconclusive, default to false.


    return false;
  }
  /**
   * Create a dummy StreamDB to fill in periods that are missing a certain type,
   * to avoid failing the general flattening algorithm.  This won't be used for
   * audio or video, since those are strictly required in all periods if they
   * exist in any period.
   *
   * @param {ManifestParserUtils.ContentType} type
   * @return {shaka.extern.StreamDB}
   * @private
   */


  static dummyStreamDB_(type) {
    return {
      id: 0,
      originalId: '',
      primary: false,
      type,
      mimeType: '',
      codecs: '',
      language: '',
      label: null,
      width: null,
      height: null,
      encrypted: false,
      keyIds: new Set(),
      segments: [],
      variantIds: [],
      roles: [],
      forced: false,
      channelsCount: null,
      audioSamplingRate: null,
      spatialAudio: false,
      closedCaptions: null
    };
  }
  /**
   * Create a dummy Stream to fill in periods that are missing a certain type,
   * to avoid failing the general flattening algorithm.  This won't be used for
   * audio or video, since those are strictly required in all periods if they
   * exist in any period.
   *
   * @param {ManifestParserUtils.ContentType} type
   * @return {shaka.extern.Stream}
   * @private
   */


  static dummyStream_(type) {
    return {
      id: 0,
      originalId: '',
      createSegmentIndex: () => Promise.resolve(),
      segmentIndex: new SegmentIndex([]),
      mimeType: '',
      codecs: '',
      encrypted: false,
      drmInfos: [],
      keyIds: new Set(),
      language: '',
      label: null,
      type,
      primary: false,
      trickModeVideo: null,
      emsgSchemeIdUris: null,
      roles: [],
      forced: false,
      channelsCount: null,
      audioSamplingRate: null,
      spatialAudio: false,
      closedCaptions: null
    };
  }
  /**
   * Compare the best value so far with the candidate value and the output
   * value.  Decide if the candidate is better, equal, or worse than the best
   * so far.  Any value less than or equal to the output is preferred over a
   * larger value, and closer to the output is better than farther.
   *
   * This provides us a generic way to choose things that should match as
   * closely as possible, like resolution, frame rate, audio channels, or
   * sample rate.  If we have to go higher to make a match, we will.  But if
   * the user selects 480p, for example, we don't want to surprise them with
   * 720p and waste bandwidth if there's another choice available to us.
   *
   * @param {number} outputValue
   * @param {number} bestValue
   * @param {number} candidateValue
   * @return {PeriodCombiner.BetterOrWorse}
   */


  static compareClosestPreferLower(outputValue, bestValue, candidateValue) {
    const {
      BETTER,
      EQUAL,
      WORSE
    } = PeriodCombiner.BetterOrWorse; // If one is the exact match for the output value, and the other isn't,
    // prefer the one that is the exact match.

    if (bestValue == outputValue && outputValue != candidateValue) {
      return WORSE;
    }

    if (candidateValue == outputValue && outputValue != bestValue) {
      return BETTER;
    }

    if (bestValue > outputValue) {
      if (candidateValue <= outputValue) {
        // Any smaller-or-equal-to-output value is preferable to a
        // bigger-than-output value.
        return BETTER;
      } // Both "best" and "candidate" are greater than the output.  Take
      // whichever is closer.


      if (candidateValue - outputValue < bestValue - outputValue) {
        return BETTER;
      }

      if (candidateValue - outputValue > bestValue - outputValue) {
        return WORSE;
      }
    } else {
      // The "best" so far is less than or equal to the output.  If the
      // candidate is bigger than the output, we don't want it.
      if (candidateValue > outputValue) {
        return WORSE;
      } // Both "best" and "candidate" are less than or equal to the output.
      // Take whichever is closer.


      if (outputValue - candidateValue < outputValue - bestValue) {
        return BETTER;
      }

      if (outputValue - candidateValue > outputValue - bestValue) {
        return WORSE;
      }
    }

    return EQUAL;
  }
  /**
   * @param {number} outputValue
   * @param {number} bestValue
   * @param {number} candidateValue
   * @return {PeriodCombiner.BetterOrWorse}
   * @private
   */


  static compareClosestPreferMinimalAbsDiff_(outputValue, bestValue, candidateValue) {
    const {
      BETTER,
      EQUAL,
      WORSE
    } = PeriodCombiner.BetterOrWorse;
    const absDiffBest = Math.abs(outputValue - bestValue);
    const absDiffCandidate = Math.abs(outputValue - candidateValue);

    if (absDiffCandidate < absDiffBest) {
      return BETTER;
    }

    if (absDiffBest < absDiffCandidate) {
      return WORSE;
    }

    return EQUAL;
  }

}
/**
 * @enum {number}
 */

PeriodCombiner.BetterOrWorse = {
  BETTER: 1,
  EQUAL: 0,
  WORSE: -1
};

class MpdUtils {
  /**
   * Fills a SegmentTemplate URI template.  This function does not validate the
   * resulting URI.
   *
   * @param {string} uriTemplate
   * @param {?string} representationId
   * @param {?number} number
   * @param {?number} bandwidth
   * @param {?number} time
   * @return {string} A URI string.
   * @see ISO/IEC 23009-1:2014 section 5.3.9.4.4
   */
  static fillUriTemplate(uriTemplate, representationId, number, bandwidth, time) {
    /** @type {!Object.<string, ?number|?string>} */
    const valueTable = {
      RepresentationID: representationId,
      Number: number,
      Bandwidth: bandwidth,
      Time: time
    };
    const re = /\$(RepresentationID|Number|Bandwidth|Time)?(?:%0([0-9]+)([diouxX]))?\$/g; // eslint-disable-line max-len

    const uri = uriTemplate.replace(re, (match, name, widthStr, format) => {
      if (match == '$$') {
        return '$';
      }

      let value = valueTable[name];
      goog.asserts.assert(value !== undefined, 'Unrecognized identifier'); // Note that |value| may be 0 or ''.

      if (value == null) {
        shakaLog.warning('URL template does not have an available substitution for ', `identifier "${name}":`, uriTemplate);
        return match;
      }

      if (name == 'RepresentationID' && widthStr) {
        shakaLog.warning('URL template should not contain a width specifier for identifier', '"RepresentationID":', uriTemplate);
        widthStr = undefined;
      }

      if (name == 'Time') {
        goog.asserts.assert(typeof value === 'number', 'Time value should be a number!');
        goog.asserts.assert(Math.abs(value - Math.round(value)) < 0.2, 'Calculated $Time$ values must be close to integers');
        value = Math.round(value);
      }
      /** @type {string} */


      let valueString;

      switch (format) {
        case undefined: // Happens if there is no format specifier.

        case 'd':
        case 'i':
        case 'u':
          valueString = value.toString();
          break;

        case 'o':
          valueString = value.toString(8);
          break;

        case 'x':
          valueString = value.toString(16);
          break;

        case 'X':
          valueString = value.toString(16).toUpperCase();
          break;

        default:
          goog.asserts.assert(false, 'Unhandled format specifier');
          valueString = value.toString();
          break;
      } // Create a padding string.


      const width = window.parseInt(widthStr, 10) || 1;
      const paddingSize = Math.max(0, width - valueString.length);
      const padding = new Array(paddingSize + 1).join('0');
      return padding + valueString;
    });
    return uri;
  }
  /**
   * Expands a SegmentTimeline into an array-based timeline.  The results are in
   * seconds.
   *
   * @param {!Element} segmentTimeline
   * @param {number} timescale
   * @param {number} unscaledPresentationTimeOffset
   * @param {number} periodDuration The Period's duration in seconds.
   *   Infinity indicates that the Period continues indefinitely.
   * @return {!Array.<MpdUtils.TimeRange>}
   */


  static createTimeline(segmentTimeline, timescale, unscaledPresentationTimeOffset, periodDuration) {
    goog.asserts.assert(timescale > 0 && timescale < Infinity, 'timescale must be a positive, finite integer');
    goog.asserts.assert(periodDuration > 0, 'period duration must be a positive integer'); // Alias.
    const timePoints = XmlUtils.findChildren(segmentTimeline, 'S');
    /** @type {!Array.<MpdUtils.TimeRange>} */

    const timeline = [];
    let lastEndTime = -unscaledPresentationTimeOffset;

    for (let i = 0; i < timePoints.length; ++i) {
      const timePoint = timePoints[i];
      const next = timePoints[i + 1];
      let t = XmlUtils.parseAttr(timePoint, 't', XmlUtils.parseNonNegativeInt);
      const d = XmlUtils.parseAttr(timePoint, 'd', XmlUtils.parseNonNegativeInt);
      const r = XmlUtils.parseAttr(timePoint, 'r', XmlUtils.parseInt); // Adjust the start time to account for the presentation time offset.

      if (t != null) {
        t -= unscaledPresentationTimeOffset;
      }

      if (!d) {
        shakaLog.warning('"S" element must have a duration:', 'ignoring the remaining "S" elements.', timePoint);
        return timeline;
      }

      let startTime = t != null ? t : lastEndTime;
      let repeat = r || 0;

      if (repeat < 0) {
        if (next) {
          const nextStartTime = XmlUtils.parseAttr(next, 't', XmlUtils.parseNonNegativeInt);

          if (nextStartTime == null) {
            shakaLog.warning('An "S" element cannot have a negative repeat', 'if the next "S" element does not have a valid start time:', 'ignoring the remaining "S" elements.', timePoint);
            return timeline;
          }

          if (startTime >= nextStartTime) {
            shakaLog.warning('An "S" element cannot have a negative repeatif its start ', 'time exceeds the next "S" element\'s start time:', 'ignoring the remaining "S" elements.', timePoint);
            return timeline;
          }

          repeat = Math.ceil((nextStartTime - startTime) / d) - 1;
        } else {
          if (periodDuration == Infinity) {
            // The DASH spec. actually allows the last "S" element to have a
            // negative repeat value even when the Period has an infinite
            // duration.  No one uses this feature and no one ever should,
            // ever.
            shakaLog.warning('The last "S" element cannot have a negative repeat', 'if the Period has an infinite duration:', 'ignoring the last "S" element.', timePoint);
            return timeline;
          }

          if (startTime / timescale >= periodDuration) {
            shakaLog.warning('The last "S" element cannot have a negative repeat', "if its start time exceeds the Period's duration:", 'igoring the last "S" element.', timePoint);
            return timeline;
          }

          repeat = Math.ceil((periodDuration * timescale - startTime) / d) - 1;
        }
      } // The end of the last segment may be before the start of the current
      // segment (a gap) or after the start of the current segment (an
      // overlap). If there is a gap/overlap then stretch/compress the end of
      // the last segment to the start of the current segment.
      //
      // Note: it is possible to move the start of the current segment to the
      // end of the last segment, but this would complicate the computation of
      // the $Time$ placeholder later on.


      if (timeline.length > 0 && startTime != lastEndTime) {
        const delta = startTime - lastEndTime;

        if (Math.abs(delta / timescale) >= ManifestParserUtils.GAP_OVERLAP_TOLERANCE_SECONDS) {
          shakaLog.warning('SegmentTimeline contains a large gap/overlap:', 'the content may have errors in it.', timePoint);
        }

        timeline[timeline.length - 1].end = startTime / timescale;
      }

      for (let j = 0; j <= repeat; ++j) {
        const endTime = startTime + d;
        const item = {
          start: startTime / timescale,
          end: endTime / timescale,
          unscaledStart: startTime
        };
        timeline.push(item);
        startTime = endTime;
        lastEndTime = endTime;
      }
    }

    return timeline;
  }
  /**
   * Parses common segment info for SegmentList and SegmentTemplate.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {function(?shaka.dash.DashParser.InheritanceFrame):Element} callback
   *   Gets the element that contains the segment info.
   * @return {MpdUtils.SegmentInfo}
   */


  static parseSegmentInfo(context, callback) {
    goog.asserts.assert(callback(context.representation), 'There must be at least one element of the given type.');
    const timescaleStr = MpdUtils.inheritAttribute(context, callback, 'timescale');
    let timescale = 1;

    if (timescaleStr) {
      timescale = XmlUtils.parsePositiveInt(timescaleStr) || 1;
    }

    const durationStr = MpdUtils.inheritAttribute(context, callback, 'duration');
    let segmentDuration = XmlUtils.parsePositiveInt(durationStr || '');
    const {
      ContentType
    } = ManifestParserUtils; // TODO: The specification is not clear, check this once it is resolved:
    // https://github.com/Dash-Industry-Forum/DASH-IF-IOP/issues/404

    if (context.representation.contentType == ContentType.IMAGE) {
      segmentDuration = XmlUtils.parseFloat(durationStr || '');
    }

    if (segmentDuration) {
      segmentDuration /= timescale;
    }

    const startNumberStr = MpdUtils.inheritAttribute(context, callback, 'startNumber');
    const unscaledPresentationTimeOffset = Number(MpdUtils.inheritAttribute(context, callback, 'presentationTimeOffset')) || 0;
    let startNumber = XmlUtils.parseNonNegativeInt(startNumberStr || '');

    if (startNumberStr == null || startNumber == null) {
      startNumber = 1;
    }

    const timelineNode = MpdUtils.inheritChild(context, callback, 'SegmentTimeline');
    /** @type {Array.<MpdUtils.TimeRange>} */

    let timeline = null;

    if (timelineNode) {
      timeline = MpdUtils.createTimeline(timelineNode, timescale, unscaledPresentationTimeOffset, context.periodInfo.duration || Infinity);
    }

    const scaledPresentationTimeOffset = unscaledPresentationTimeOffset / timescale || 0;
    return {
      timescale,
      segmentDuration,
      startNumber,
      scaledPresentationTimeOffset,
      unscaledPresentationTimeOffset,
      timeline
    };
  }
  /**
   * Searches the inheritance for a Segment* with the given attribute.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {function(?shaka.dash.DashParser.InheritanceFrame):Element} callback
   *   Gets the Element that contains the attribute to inherit.
   * @param {string} attribute
   * @return {?string}
   */


  static inheritAttribute(context, callback, attribute) {
    goog.asserts.assert(callback(context.representation), 'There must be at least one element of the given type');
    /** @type {!Array.<!Element>} */

    const nodes = [callback(context.representation), callback(context.adaptationSet), callback(context.period)].filter(Functional.isNotNull);
    return nodes.map(s => s.getAttribute(attribute)).reduce((all, part) => all || part);
  }
  /**
   * Searches the inheritance for a Segment* with the given child.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {function(?shaka.dash.DashParser.InheritanceFrame):Element} callback
   *   Gets the Element that contains the child to inherit.
   * @param {string} child
   * @return {Element}
   */


  static inheritChild(context, callback, child) {
    goog.asserts.assert(callback(context.representation), 'There must be at least one element of the given type');
    /** @type {!Array.<!Element>} */

    const nodes = [callback(context.representation), callback(context.adaptationSet), callback(context.period)].filter(Functional.isNotNull);
    return nodes.map(s => XmlUtils.findChild(s, child)).reduce((all, part) => all || part);
  }
  /**
   * Follow the xlink link contained in the given element.
   * It also strips the xlink properties off of the element,
   * even if the process fails.
   *
   * @param {!Element} element
   * @param {!shaka.extern.RetryParameters} retryParameters
   * @param {boolean} failGracefully
   * @param {string} baseUri
   * @param {!shaka.net.NetworkingEngine} networkingEngine
   * @param {number} linkDepth
   * @return {!shaka.util.AbortableOperation.<!Element>}
   * @private
   */


  static handleXlinkInElement_(element, retryParameters, failGracefully, baseUri, networkingEngine, linkDepth) {
    const {
      XmlUtils,
      Error
    } = shaka.util;
    const NS = MpdUtils.XlinkNamespaceUri_;
    const xlinkHref = XmlUtils.getAttributeNS(element, NS, 'href');
    const xlinkActuate = XmlUtils.getAttributeNS(element, NS, 'actuate') || 'onRequest'; // Remove the xlink properties, so it won't download again
    // when re-processed.

    for (const attribute of Array.from(element.attributes)) {
      if (attribute.namespaceURI == NS) {
        element.removeAttributeNS(attribute.namespaceURI, attribute.localName);
      }
    }

    if (linkDepth >= 5) {
      return shaka.util.AbortableOperation.failed(new Error(Error.Severity.CRITICAL, Error.Category.MANIFEST, Error.Code.DASH_XLINK_DEPTH_LIMIT));
    }

    if (xlinkActuate != 'onLoad') {
      // Only xlink:actuate="onLoad" is supported.
      // When no value is specified, the assumed value is "onRequest".
      return shaka.util.AbortableOperation.failed(new Error(Error.Severity.CRITICAL, Error.Category.MANIFEST, Error.Code.DASH_UNSUPPORTED_XLINK_ACTUATE));
    } // Resolve the xlink href, in case it's a relative URL.


    const uris = ManifestParserUtils.resolveUris([baseUri], [xlinkHref]); // Load in the linked elements.

    const requestType = shaka.net.NetworkingEngine.RequestType.MANIFEST;
    const request = shaka.net.NetworkingEngine.makeRequest(uris, retryParameters);
    const requestOperation = networkingEngine.request(requestType, request); // The interface is abstract, but we know it was implemented with the
    // more capable internal class.

    goog.asserts.assert(requestOperation instanceof shaka.util.AbortableOperation, 'Unexpected implementation of IAbortableOperation!'); // Satisfy the compiler with a cast.

    const networkOperation =
    /** @type {!shaka.util.AbortableOperation.<shaka.extern.Response>} */
    requestOperation; // Chain onto that operation.

    return networkOperation.chain(response => {
      // This only supports the case where the loaded xml has a single
      // top-level element.  If there are multiple roots, it will be
      // rejected.
      console.log('Parse XML', response.data);
      const rootElem = XmlUtils.parseXml(response.data, element.tagName);

      if (!rootElem) {
        // It was not valid XML.
        return shaka.util.AbortableOperation.failed(new Error(Error.Severity.CRITICAL, Error.Category.MANIFEST, Error.Code.DASH_INVALID_XML, xlinkHref));
      } // Now that there is no other possibility of the process erroring,
      // the element can be changed further.
      // Remove the current contents of the node.


      while (element.childNodes.length) {
        element.removeChild(element.childNodes[0]);
      } // Move the children of the loaded xml into the current element.


      while (rootElem.childNodes.length) {
        const child = rootElem.childNodes[0];
        rootElem.removeChild(child);
        element.appendChild(child);
      } // Move the attributes of the loaded xml into the current element.


      for (const attribute of Array.from(rootElem.attributes)) {
        element.setAttributeNode(attribute.cloneNode(
        /* deep= */
        false));
      }

      return MpdUtils.processXlinks(element, retryParameters, failGracefully, uris[0], networkingEngine, linkDepth + 1);
    });
  }
  /**
   * Filter the contents of a node recursively, replacing xlink links
   * with their associated online data.
   *
   * @param {!Element} element
   * @param {!shaka.extern.RetryParameters} retryParameters
   * @param {boolean} failGracefully
   * @param {string} baseUri
   * @param {!shaka.net.NetworkingEngine} networkingEngine
   * @param {number=} linkDepth, default set to 0
   * @return {!shaka.util.AbortableOperation.<!Element>}
   */


  static processXlinks(element, retryParameters, failGracefully, baseUri, networkingEngine, linkDepth = 0) {
    const NS = MpdUtils.XlinkNamespaceUri_;

    if (XmlUtils.getAttributeNS(element, NS, 'href')) {
      let handled = MpdUtils.handleXlinkInElement_(element, retryParameters, failGracefully, baseUri, networkingEngine, linkDepth);

      if (failGracefully) {
        // Catch any error and go on.
        // eslint-disable-next-line no-unused-vars
        handled = handled.chain(undefined, error => // handleXlinkInElement_ strips the xlink properties off of the
        // element even if it fails, so calling processXlinks again will
        // handle whatever contents the element natively has.
        MpdUtils.processXlinks(element, retryParameters, failGracefully, baseUri, networkingEngine, linkDepth));
      }

      return handled;
    }

    const childOperations = [];

    for (const child of Array.from(element.childNodes)) {
      if (child instanceof Element) {
        const resolveToZeroString = 'urn:mpeg:dash:resolve-to-zero:2013';

        if (XmlUtils.getAttributeNS(child, NS, 'href') == resolveToZeroString) {
          // This is a 'resolve to zero' code; it means the element should
          // be removed, as specified by the mpeg-dash rules for xlink.
          element.removeChild(child);
        } else if (child.tagName != 'SegmentTimeline') {
          // Don't recurse into a SegmentTimeline since xlink attributes
          // aren't valid in there and looking at each segment can take a long
          // time with larger manifests.
          // Replace the child with its processed form.
          childOperations.push(MpdUtils.processXlinks(
          /** @type {!Element} */
          child, retryParameters, failGracefully, baseUri, networkingEngine, linkDepth));
        }
      }
    }

    return shaka.util.AbortableOperation.all(childOperations).chain(() => element);
  }

}
/**
 * @const {string}
 * @private
 */

MpdUtils.XlinkNamespaceUri_ = 'http://www.w3.org/1999/xlink';

class SegmentBase {
  /**
   * Creates an init segment reference from a Context object.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {function(?shaka.dash.DashParser.InheritanceFrame):Element} callback
   * @return {shaka.media.InitSegmentReference}
   */
  static createInitSegment(context, callback) {
    const initialization = MpdUtils.inheritChild(context, callback, 'Initialization');

    if (!initialization) {
      return null;
    }

    let resolvedUris = context.representation.baseUris;
    const uri = initialization.getAttribute('sourceURL');

    if (uri) {
      resolvedUris = ManifestParserUtils.resolveUris(context.representation.baseUris, [uri]);
    }

    let startByte = 0;
    let endByte = null;
    const range = XmlUtils.parseAttr(initialization, 'range', XmlUtils.parseRange);

    if (range) {
      startByte = range.start;
      endByte = range.end;
    }

    const getUris = () => resolvedUris;

    const qualityInfo = SegmentBase.createQualityInfo(context);
    return new shaka.media.InitSegmentReference(getUris, startByte, endByte, qualityInfo);
  }
  /**
   * Creates a new StreamInfo object.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {shaka.dash.DashParser.RequestInitSegmentCallback}
   *     requestInitSegment
   * @return {shaka.dash.DashParser.StreamInfo}
   */


  static createStreamInfo(context, requestInitSegment) {
    goog.asserts.assert(context.representation.segmentBase, 'Should only be called with SegmentBase'); // Since SegmentBase does not need updates, simply treat any call as
    // the initial parse.

    const unscaledPresentationTimeOffset = Number(MpdUtils.inheritAttribute(context, SegmentBase.fromInheritance_, 'presentationTimeOffset')) || 0;
    const timescaleStr = MpdUtils.inheritAttribute(context, SegmentBase.fromInheritance_, 'timescale');
    let timescale = 1;

    if (timescaleStr) {
      timescale = XmlUtils.parsePositiveInt(timescaleStr) || 1;
    }

    const scaledPresentationTimeOffset = unscaledPresentationTimeOffset / timescale || 0;
    const initSegmentReference = SegmentBase.createInitSegment(context, SegmentBase.fromInheritance_); // Throws an immediate error if the format is unsupported.

    SegmentBase.checkSegmentIndexRangeSupport_(context, initSegmentReference); // Direct fields of context will be reassigned by the parser before
    // generateSegmentIndex is called.  So we must make a shallow copy first,
    // and use that in the generateSegmentIndex callbacks.

    const shallowCopyOfContext = { ...context
    };
    return {
      generateSegmentIndex: () => SegmentBase.generateSegmentIndex_(shallowCopyOfContext, requestInitSegment, initSegmentReference, scaledPresentationTimeOffset)
    };
  }
  /**
   * Creates a SegmentIndex for the given URIs and context.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {shaka.dash.DashParser.RequestInitSegmentCallback}
   *     requestInitSegment
   * @param {shaka.media.InitSegmentReference} initSegmentReference
   * @param {!Array.<string>} uris
   * @param {number} startByte
   * @param {?number} endByte
   * @param {number} scaledPresentationTimeOffset
   * @return {!Promise.<shaka.media.SegmentIndex>}
   */


  static async generateSegmentIndexFromUris(context, requestInitSegment, initSegmentReference, uris, startByte, endByte, scaledPresentationTimeOffset) {
    // Unpack context right away, before we start an async process.
    // This immunizes us against changes to the context object later.

    /** @type {shaka.media.PresentationTimeline} */
    const {
      presentationTimeline
    } = context;
    const fitLast = !context.dynamic || !context.periodInfo.isLastPeriod;
    const periodStart = context.periodInfo.start;
    const periodDuration = context.periodInfo.duration;
    const containerType = context.representation.mimeType.split('/')[1]; // Create a local variable to bind to so we can set to null to help the GC.

    let localRequest = requestInitSegment;
    let segmentIndex = null;
    const responses = [localRequest(uris, startByte, endByte), containerType == 'webm' ? localRequest(initSegmentReference.getUris(), initSegmentReference.startByte, initSegmentReference.endByte) : null];
    localRequest = null;
    const results = await Promise.all(responses);
    const indexData = results[0];
    const initData = results[1] || null;
    /** @type {Array.<!shaka.media.SegmentReference>} */

    let references = null;
    const timestampOffset = periodStart - scaledPresentationTimeOffset;
    const appendWindowStart = periodStart;
    const appendWindowEnd = periodDuration ? periodStart + periodDuration : Infinity;

    if (containerType == 'mp4') {
      references = shaka.media.Mp4SegmentIndexParser.parse(indexData, startByte, uris, initSegmentReference, timestampOffset, appendWindowStart, appendWindowEnd);
    } else {
      goog.asserts.assert(initData, 'WebM requires init data');
      references = shaka.media.WebmSegmentIndexParser.parse(indexData, initData, uris, initSegmentReference, timestampOffset, appendWindowStart, appendWindowEnd);
    }

    presentationTimeline.notifySegments(references); // Since containers are never updated, we don't need to store the
    // segmentIndex in the map.

    goog.asserts.assert(!segmentIndex, 'Should not call generateSegmentIndex twice');
    segmentIndex = new SegmentIndex(references);

    if (fitLast) {
      segmentIndex.fit(appendWindowStart, appendWindowEnd,
      /* isNew= */
      true);
    }

    return segmentIndex;
  }
  /**
   * @param {?shaka.dash.DashParser.InheritanceFrame} frame
   * @return {Element}
   * @private
   */


  static fromInheritance_(frame) {
    return frame.segmentBase;
  }
  /**
   * Compute the byte range of the segment index from the container.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @return {?{start: number, end: number}}
   * @private
   */


  static computeIndexRange_(context) {
    const representationIndex = MpdUtils.inheritChild(context, SegmentBase.fromInheritance_, 'RepresentationIndex');
    const indexRangeElem = MpdUtils.inheritAttribute(context, SegmentBase.fromInheritance_, 'indexRange');
    let indexRange = XmlUtils.parseRange(indexRangeElem || '');

    if (representationIndex) {
      indexRange = XmlUtils.parseAttr(representationIndex, 'range', XmlUtils.parseRange, indexRange);
    }

    return indexRange;
  }
  /**
   * Compute the URIs of the segment index from the container.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @return {!Array.<string>}
   * @private
   */


  static computeIndexUris_(context) {
    const representationIndex = MpdUtils.inheritChild(context, SegmentBase.fromInheritance_, 'RepresentationIndex');
    let indexUris = context.representation.baseUris;

    if (representationIndex) {
      const representationUri = representationIndex.getAttribute('sourceURL');

      if (representationUri) {
        indexUris = ManifestParserUtils.resolveUris(context.representation.baseUris, [representationUri]);
      }
    }

    return indexUris;
  }
  /**
   * Check if this type of segment index is supported.  This allows for
   * immediate errors during parsing, as opposed to an async error from
   * createSegmentIndex().
   *
   * Also checks for a valid byte range, which is not required for callers from
   * SegmentTemplate.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {shaka.media.InitSegmentReference} initSegmentReference
   * @private
   */


  static checkSegmentIndexRangeSupport_(context, initSegmentReference) {
    SegmentBase.checkSegmentIndexSupport(context, initSegmentReference);
    const indexRange = SegmentBase.computeIndexRange_(context);

    if (!indexRange) {
      shakaLog.error('SegmentBase does not contain sufficient segment information:', 'the SegmentBase does not contain @indexRange', 'or a RepresentationIndex element.', context.representation);
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
    }
  }
  /**
   * Check if this type of segment index is supported.  This allows for
   * immediate errors during parsing, as opposed to an async error from
   * createSegmentIndex().
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {shaka.media.InitSegmentReference} initSegmentReference
   */


  static checkSegmentIndexSupport(context, initSegmentReference) {
    const {
      ContentType
    } = ManifestParserUtils;
    const {
      contentType
    } = context.representation;
    const containerType = context.representation.mimeType.split('/')[1];

    if (contentType != ContentType.TEXT && containerType != 'mp4' && containerType != 'webm') {
      shakaLog.error('SegmentBase specifies an unsupported container type.', context.representation);
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_UNSUPPORTED_CONTAINER);
    }

    if (containerType == 'webm' && !initSegmentReference) {
      shakaLog.error('SegmentBase does not contain sufficient segment information:', 'the SegmentBase uses a WebM container,', 'but does not contain an Initialization element.', context.representation);
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_WEBM_MISSING_INIT);
    }
  }
  /**
   * Generate a SegmentIndex from a Context object.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {shaka.dash.DashParser.RequestInitSegmentCallback}
   *     requestInitSegment
   * @param {shaka.media.InitSegmentReference} initSegmentReference
   * @param {number} scaledPresentationTimeOffset
   * @return {!Promise.<shaka.media.SegmentIndex>}
   * @private
   */


  static generateSegmentIndex_(context, requestInitSegment, initSegmentReference, scaledPresentationTimeOffset) {
    const indexUris = SegmentBase.computeIndexUris_(context);
    const indexRange = SegmentBase.computeIndexRange_(context);
    goog.asserts.assert(indexRange, 'Index range should not be null!');
    return SegmentBase.generateSegmentIndexFromUris(context, requestInitSegment, initSegmentReference, indexUris, indexRange.start, indexRange.end, scaledPresentationTimeOffset);
  }
  /**
   * Create a MediaQualityInfo object from a Context object.
   *
   * @param {!shaka.dash.DashParser.Context} context
   * @return {!shaka.extern.MediaQualityInfo}
   */


  static createQualityInfo(context) {
    const {
      representation
    } = context;
    return {
      bandwidth: context.bandwidth,
      audioSamplingRate: representation.audioSamplingRate,
      codecs: representation.codecs,
      contentType: representation.contentType,
      frameRate: representation.frameRate || null,
      height: representation.height || null,
      mimeType: representation.mimeType,
      channelsCount: representation.numChannels,
      pixelAspectRatio: representation.pixelAspectRatio || null,
      width: representation.width || null
    };
  }

}

class SegmentTemplate {
  /**
   * Creates a new StreamInfo object.
   * Updates the existing SegmentIndex, if any.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {shaka.dash.DashParser.RequestInitSegmentCallback}
   *   requestInitSegment
   * @param {!Object.<string, !shaka.extern.Stream>} streamMap
   * @param {boolean} isUpdate True if the manifest is being updated.
   * @param {number} segmentLimit The maximum number of segments to generate for
   *   a SegmentTemplate with fixed duration.
   * @param {!Object.<string, number>} periodDurationMap
   * @return {shaka.dash.DashParser.StreamInfo}
   */
  static createStreamInfo(context, requestInitSegment, streamMap, isUpdate, segmentLimit, periodDurationMap) {
    goog.asserts.assert(context.representation.segmentTemplate, 'Should only be called with SegmentTemplate');
    const initSegmentReference = SegmentTemplate.createInitSegment_(context);
    const info = SegmentTemplate.parseSegmentTemplateInfo_(context);
    SegmentTemplate.checkSegmentTemplateInfo_(context, info); // Direct fields of context will be reassigned by the parser before
    // generateSegmentIndex is called.  So we must make a shallow copy first,
    // and use that in the generateSegmentIndex callbacks.

    const shallowCopyOfContext = { ...context
    };

    if (info.indexTemplate) {
      SegmentBase.checkSegmentIndexSupport(context, initSegmentReference);
      return {
        generateSegmentIndex: () => SegmentTemplate.generateSegmentIndexFromIndexTemplate_(shallowCopyOfContext, requestInitSegment, initSegmentReference, info)
      };
    }

    if (info.segmentDuration) {
      if (!isUpdate) {
        context.presentationTimeline.notifyMaxSegmentDuration(info.segmentDuration);
        context.presentationTimeline.notifyMinSegmentStartTime(context.periodInfo.start);
      }

      return {
        generateSegmentIndex: () => SegmentTemplate.generateSegmentIndexFromDuration_(shallowCopyOfContext, info, segmentLimit, initSegmentReference, periodDurationMap)
      };
    }
    /** @type {shaka.media.SegmentIndex} */


    let segmentIndex = null;
    let id = null;
    let stream = null;

    if (context.period.id && context.representation.id) {
      // Only check/store the index if period and representation IDs are set.
      id = `${context.period.id},${context.representation.id}`;
      stream = streamMap[id];

      if (stream) {
        segmentIndex = stream.segmentIndex;
      }
    }

    const references = SegmentTemplate.createFromTimeline_(shallowCopyOfContext, info, initSegmentReference);
    const periodStart = context.periodInfo.start;
    const periodEnd = context.periodInfo.duration ? context.periodInfo.start + context.periodInfo.duration : Infinity; // Don't fit live content, since it might receive more segments.
    // Unless that live content is multi-period; it's safe to fit every period
    // but the last one, since only the last period might receive new
    // segments.

    const shouldFit = periodEnd != Infinity;

    if (segmentIndex) {
      if (shouldFit) {
        // Fit the new references before merging them, so that the merge
        // algorithm has a more accurate view of their start and end times.
        const wrapper = new SegmentIndex(references);
        wrapper.fit(periodStart, periodEnd,
        /* isNew= */
        true);
      }

      segmentIndex.mergeAndEvict(references, context.presentationTimeline.getSegmentAvailabilityStart());
    } else {
      segmentIndex = new SegmentIndex(references);
    }

    context.presentationTimeline.notifySegments(references);

    if (shouldFit) {
      segmentIndex.fit(periodStart, periodEnd);
    }

    if (stream && context.dynamic) {
      stream.segmentIndex = segmentIndex;
    }

    return {
      generateSegmentIndex: () => {
        // If segmentIndex is deleted, or segmentIndex's references are
        // released by closeSegmentIndex(), we should set the value of
        // segmentIndex again.
        if (!segmentIndex || segmentIndex.isEmpty()) {
          segmentIndex.merge(references);
        }

        return Promise.resolve(segmentIndex);
      }
    };
  }
  /**
   * @param {?shaka.dash.DashParser.InheritanceFrame} frame
   * @return {Element}
   * @private
   */


  static fromInheritance_(frame) {
    return frame.segmentTemplate;
  }
  /**
   * Parses a SegmentTemplate element into an info object.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @return {SegmentTemplate.SegmentTemplateInfo}
   * @private
   */


  static parseSegmentTemplateInfo_(context) {
    const segmentInfo = MpdUtils.parseSegmentInfo(context, SegmentTemplate.fromInheritance_);
    const media = MpdUtils.inheritAttribute(context, SegmentTemplate.fromInheritance_, 'media');
    const index = MpdUtils.inheritAttribute(context, SegmentTemplate.fromInheritance_, 'index');
    return {
      segmentDuration: segmentInfo.segmentDuration,
      timescale: segmentInfo.timescale,
      startNumber: segmentInfo.startNumber,
      scaledPresentationTimeOffset: segmentInfo.scaledPresentationTimeOffset,
      unscaledPresentationTimeOffset: segmentInfo.unscaledPresentationTimeOffset,
      timeline: segmentInfo.timeline,
      mediaTemplate: media,
      indexTemplate: index
    };
  }
  /**
   * Verifies a SegmentTemplate info object.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {SegmentTemplate.SegmentTemplateInfo} info
   * @private
   */


  static checkSegmentTemplateInfo_(context, info) {
    let n = 0;
    n += info.indexTemplate ? 1 : 0;
    n += info.timeline ? 1 : 0;
    n += info.segmentDuration ? 1 : 0;

    if (n == 0) {
      shakaLog.error('SegmentTemplate does not contain any segment information:', 'the SegmentTemplate must contain either an index URL template', 'a SegmentTimeline, or a segment duration.', context.representation);
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
    } else if (n != 1) {
      shakaLog.warning('SegmentTemplate containes multiple segment information sources:', 'the SegmentTemplate should only contain an index URL template,', 'a SegmentTimeline or a segment duration.', context.representation);

      if (info.indexTemplate) {
        shakaLog.info('Using the index URL template by default.');
        info.timeline = null;
        info.segmentDuration = null;
      } else {
        goog.asserts.assert(info.timeline, 'There should be a timeline');
        shakaLog.info('Using the SegmentTimeline by default.');
        info.segmentDuration = null;
      }
    }

    if (!info.indexTemplate && !info.mediaTemplate) {
      shakaLog.error('SegmentTemplate does not contain sufficient segment information:', "the SegmentTemplate's media URL template is missing.", context.representation);
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
    }
  }
  /**
   * Generates a SegmentIndex from an index URL template.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {shaka.dash.DashParser.RequestInitSegmentCallback}
   *     requestInitSegment
   * @param {shaka.media.InitSegmentReference} init
   * @param {SegmentTemplate.SegmentTemplateInfo} info
   * @return {!Promise.<shaka.media.SegmentIndex>}
   * @private
   */


  static generateSegmentIndexFromIndexTemplate_(context, requestInitSegment, init, info) {
    goog.asserts.assert(info.indexTemplate, 'must be using index template');
    const filledTemplate = MpdUtils.fillUriTemplate(info.indexTemplate, context.representation.id, null, context.bandwidth || null, null);
    const resolvedUris = ManifestParserUtils.resolveUris(context.representation.baseUris, [filledTemplate]);
    return SegmentBase.generateSegmentIndexFromUris(context, requestInitSegment, init, resolvedUris, 0, null, info.scaledPresentationTimeOffset);
  }
  /**
   * Generates a SegmentIndex from fixed-duration segments.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {SegmentTemplate.SegmentTemplateInfo} info
   * @param {number} segmentLimit The maximum number of segments to generate.
   * @param {shaka.media.InitSegmentReference} initSegmentReference
   * @param {!Object.<string, number>} periodDurationMap
   * @return {!Promise.<shaka.media.SegmentIndex>}
   * @private
   */


  static generateSegmentIndexFromDuration_(context, info, segmentLimit, initSegmentReference, periodDurationMap) {
    goog.asserts.assert(info.mediaTemplate, 'There should be a media template with duration');
    const {
      presentationTimeline
    } = context; // Capture values that could change as the parsing context moves on to
    // other parts of the manifest.

    const periodStart = context.periodInfo.start;
    const periodId = context.period.id;
    const initialPeriodDuration = context.periodInfo.duration; // For multi-period live streams the period duration may not be known until
    // the following period appears in an updated manifest. periodDurationMap
    // provides the updated period duration.

    const getPeriodEnd = () => {
      const periodDuration = periodId != null && periodDurationMap[periodId] || initialPeriodDuration;
      const periodEnd = periodDuration ? periodStart + periodDuration : Infinity;
      return periodEnd;
    };

    const {
      segmentDuration
    } = info;
    goog.asserts.assert(segmentDuration != null, 'Segment duration must not be null!');
    const {
      startNumber
    } = info;
    const {
      timescale
    } = info;
    const template = info.mediaTemplate;
    const bandwidth = context.bandwidth || null;
    const {
      id
    } = context.representation;
    const {
      baseUris
    } = context.representation;
    const timestampOffset = periodStart - info.scaledPresentationTimeOffset; // Computes the range of presentation timestamps both within the period and
    // available.  This is an intersection of the period range and the
    // availability window.

    const computeAvailablePeriodRange = () => [Math.max(presentationTimeline.getSegmentAvailabilityStart(), periodStart), Math.min(presentationTimeline.getSegmentAvailabilityEnd(), getPeriodEnd())]; // Computes the range of absolute positions both within the period and
    // available.  The range is inclusive.  These are the positions for which we
    // will generate segment references.


    const computeAvailablePositionRange = () => {
      // In presentation timestamps.
      const availablePresentationTimes = computeAvailablePeriodRange();
      goog.asserts.assert(availablePresentationTimes.every(Number.isFinite), 'Available presentation times must be finite!');
      goog.asserts.assert(availablePresentationTimes.every(x => x >= 0), 'Available presentation times must be positive!');
      goog.asserts.assert(segmentDuration != null, 'Segment duration must not be null!'); // In period-relative timestamps.

      const availablePeriodTimes = availablePresentationTimes.map(x => x - periodStart); // These may sometimes be reversed ([1] <= [0]) if the period is
      // completely unavailable.  The logic will still work if this happens,
      // because we will simply generate no references.
      // In period-relative positions (0-based).

      const availablePeriodPositions = [Math.ceil(availablePeriodTimes[0] / segmentDuration), Math.ceil(availablePeriodTimes[1] / segmentDuration) - 1]; // In absolute positions.

      const availablePresentationPositions = availablePeriodPositions.map(x => x + startNumber);
      return availablePresentationPositions;
    }; // For Live, we must limit the initial SegmentIndex in size, to avoid
    // consuming too much CPU or memory for content with gigantic
    // timeShiftBufferDepth (which can have values up to and including
    // Infinity).


    const range = computeAvailablePositionRange();
    const minPosition = context.dynamic ? Math.max(range[0], range[1] - segmentLimit + 1) : range[0];
    const maxPosition = range[1];
    const references = [];

    const createReference = position => {
      // These inner variables are all scoped to the inner loop, and can be used
      // safely in the callback below.
      goog.asserts.assert(segmentDuration != null, 'Segment duration must not be null!'); // Relative to the period start.

      const positionWithinPeriod = position - startNumber;
      const segmentPeriodTime = positionWithinPeriod * segmentDuration; // What will appear in the actual segment files.  The media timestamp is
      // what is expected in the $Time$ template.

      const segmentMediaTime = segmentPeriodTime + info.scaledPresentationTimeOffset;

      const getUris = () => {
        const mediaUri = MpdUtils.fillUriTemplate(template, id, position, bandwidth, segmentMediaTime * timescale);
        return ManifestParserUtils.resolveUris(baseUris, [mediaUri]);
      }; // Relative to the presentation.


      const segmentStart = segmentPeriodTime + periodStart;
      const trueSegmentEnd = segmentStart + segmentDuration; // Cap the segment end at the period end so that references from the
      // next period will fit neatly after it.

      const segmentEnd = Math.min(trueSegmentEnd, getPeriodEnd()); // This condition will be true unless the segmentStart was >= periodEnd.
      // If we've done the position calculations correctly, this won't happen.

      goog.asserts.assert(segmentStart < segmentEnd, 'Generated a segment outside of the period!');
      const ref = new shaka.media.SegmentReference(segmentStart, segmentEnd, getUris,
      /* startByte= */
      0,
      /* endByte= */
      null, initSegmentReference, timestampOffset,
      /* appendWindowStart= */
      periodStart,
      /* appendWindowEnd= */
      getPeriodEnd()); // This is necessary information for thumbnail streams:

      ref.trueEndTime = trueSegmentEnd;
      return ref;
    };

    for (let position = minPosition; position <= maxPosition; ++position) {
      const reference = createReference(position);
      references.push(reference);
    }
    /** @type {shaka.media.SegmentIndex} */


    const segmentIndex = new SegmentIndex(references); // If the availability timeline currently ends before the period, we will
    // need to add references over time.

    const willNeedToAddReferences = presentationTimeline.getSegmentAvailabilityEnd() < getPeriodEnd(); // When we start a live stream with a period that ends within the
    // availability window we will not need to add more references, but we will
    // need to evict old references.

    const willNeedToEvictReferences = presentationTimeline.isLive();

    if (willNeedToAddReferences || willNeedToEvictReferences) {
      // The period continues to get longer over time, so check for new
      // references once every |segmentDuration| seconds.
      // We clamp to |minPosition| in case the initial range was reversed and no
      // references were generated.  Otherwise, the update would start creating
      // negative positions for segments in periods which begin in the future.
      let nextPosition = Math.max(minPosition, maxPosition + 1); // streamingEngine fetches a new segment only after segmentIndex update,
      // in low latency mode, late update will delay new segment and increase
      // latency, so update it more frequetly

      console.info('update segmentIndex every', segmentDuration / 8);
      segmentIndex.updateEvery(segmentDuration / 8, () => {
        // Evict any references outside the window.
        const availabilityStartTime = presentationTimeline.getSegmentAvailabilityStart();
        segmentIndex.evict(availabilityStartTime); // Compute any new references that need to be added.

        const [, maxPosition] = computeAvailablePositionRange();
        const references = [];

        while (nextPosition <= maxPosition) {
          const reference = createReference(nextPosition);
          references.push(reference);
          nextPosition++;
        } // The timer must continue firing until the entire period is
        // unavailable, so that all references will be evicted.


        if (availabilityStartTime > getPeriodEnd() && !references.length) {
          // Signal stop.
          return null;
        }

        return references;
      });
    }

    return Promise.resolve(segmentIndex);
  }
  /**
   * Creates segment references from a timeline.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {SegmentTemplate.SegmentTemplateInfo} info
   * @param {shaka.media.InitSegmentReference} initSegmentReference
   * @return {!Array.<!shaka.media.SegmentReference>}
   * @private
   */


  static createFromTimeline_(context, info, initSegmentReference) {
    const periodStart = context.periodInfo.start;
    const periodDuration = context.periodInfo.duration;
    const timestampOffset = periodStart - info.scaledPresentationTimeOffset;
    const appendWindowStart = periodStart;
    const appendWindowEnd = periodDuration ? periodStart + periodDuration : Infinity;
    /** @type {!Array.<!shaka.media.SegmentReference>} */

    const references = [];

    for (let i = 0; i < info.timeline.length; i++) {
      const {
        start,
        unscaledStart,
        end
      } = info.timeline[i]; // Note: i = k - 1, where k indicates the k'th segment listed in the MPD.
      // (See section 5.3.9.5.3 of the DASH spec.)

      const segmentReplacement = i + info.startNumber; // Consider the presentation time offset in segment uri computation

      const timeReplacement = unscaledStart + info.unscaledPresentationTimeOffset;
      const repId = context.representation.id;
      const bandwidth = context.bandwidth || null;
      const {
        mediaTemplate
      } = info;
      const {
        baseUris
      } = context.representation; // This callback must not capture any non-local
      // variables, such as info, context, etc.  Make
      // sure any values you reference here have
      // been assigned to local variables within the
      // loop, or else we will end up with a leak.

      const createUris = () => {
        goog.asserts.assert(mediaTemplate, 'There should be a media template with a timeline');
        const mediaUri = MpdUtils.fillUriTemplate(mediaTemplate, repId, segmentReplacement, bandwidth || null, timeReplacement);
        return ManifestParserUtils.resolveUris(baseUris, [mediaUri]).map(g => g.toString());
      };

      references.push(new shaka.media.SegmentReference(periodStart + start, periodStart + end, createUris,
      /* startByte= */
      0,
      /* endByte= */
      null, initSegmentReference, timestampOffset, appendWindowStart, appendWindowEnd));
    }

    return references;
  }
  /**
   * Creates an init segment reference from a context object.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @return {shaka.media.InitSegmentReference}
   * @private
   */


  static createInitSegment_(context) {
    const initialization = MpdUtils.inheritAttribute(context, SegmentTemplate.fromInheritance_, 'initialization');

    if (!initialization) {
      return null;
    }

    const repId = context.representation.id;
    const bandwidth = context.bandwidth || null;
    const {
      baseUris
    } = context.representation;

    const getUris = () => {
      goog.asserts.assert(initialization, 'Should have returned earler');
      const filledTemplate = MpdUtils.fillUriTemplate(initialization, repId, null, bandwidth, null);
      const resolvedUris = ManifestParserUtils.resolveUris(baseUris, [filledTemplate]);
      return resolvedUris;
    };

    const qualityInfo = SegmentBase.createQualityInfo(context);
    return new shaka.media.InitSegmentReference(getUris, 0, null, qualityInfo);
  }

}

class SegmentList {
  /**
   * Creates a new StreamInfo object.
   * Updates the existing SegmentIndex, if any.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {!Object.<string, !shaka.extern.Stream>} streamMap
   * @return {shaka.dash.DashParser.StreamInfo}
   */
  static createStreamInfo(context, streamMap) {
    goog.asserts.assert(context.representation.segmentList, 'Should only be called with SegmentList');
    const initSegmentReference = SegmentBase.createInitSegment(context, SegmentList.fromInheritance_);
    const info = SegmentList.parseSegmentListInfo_(context);
    SegmentList.checkSegmentListInfo_(context, info);
    /** @type {shaka.media.SegmentIndex} */

    let segmentIndex = null;
    let stream = null;

    if (context.period.id && context.representation.id) {
      // Only check/store the index if period and representation IDs are set.
      const id = `${context.period.id},${context.representation.id}`;
      stream = streamMap[id];

      if (stream) {
        segmentIndex = stream.segmentIndex;
      }
    }

    const references = SegmentList.createSegmentReferences_(context.periodInfo.start, context.periodInfo.duration, info.startNumber, context.representation.baseUris, info, initSegmentReference);
    const isNew = !segmentIndex;

    if (segmentIndex) {
      const start = context.presentationTimeline.getSegmentAvailabilityStart();
      segmentIndex.mergeAndEvict(references, start);
    } else {
      segmentIndex = new SegmentIndex(references);
    }

    context.presentationTimeline.notifySegments(references);

    if (!context.dynamic || !context.periodInfo.isLastPeriod) {
      const periodStart = context.periodInfo.start;
      const periodEnd = context.periodInfo.duration ? context.periodInfo.start + context.periodInfo.duration : Infinity;
      segmentIndex.fit(periodStart, periodEnd, isNew);
    }

    if (stream) {
      stream.segmentIndex = segmentIndex;
    }

    return {
      generateSegmentIndex: () => {
        if (!segmentIndex || segmentIndex.isEmpty()) {
          segmentIndex.merge(references);
        }

        return Promise.resolve(segmentIndex);
      }
    };
  }
  /**
   * @param {?shaka.dash.DashParser.InheritanceFrame} frame
   * @return {Element}
   * @private
   */


  static fromInheritance_(frame) {
    return frame.segmentList;
  }
  /**
   * Parses the SegmentList items to create an info object.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @return {SegmentList.SegmentListInfo}
   * @private
   */


  static parseSegmentListInfo_(context) {
    const mediaSegments = SegmentList.parseMediaSegments_(context);
    const segmentInfo = MpdUtils.parseSegmentInfo(context, SegmentList.fromInheritance_);
    let {
      startNumber
    } = segmentInfo;

    if (startNumber == 0) {
      shakaLog.warning('SegmentList@startNumber must be > 0');
      startNumber = 1;
    }

    let startTime = 0;

    if (segmentInfo.segmentDuration) {
      // See DASH sec. 5.3.9.5.3
      // Don't use presentationTimeOffset for @duration.
      startTime = segmentInfo.segmentDuration * (startNumber - 1);
    } else if (segmentInfo.timeline && segmentInfo.timeline.length > 0) {
      // The presentationTimeOffset was considered in timeline creation.
      startTime = segmentInfo.timeline[0].start;
    }

    return {
      segmentDuration: segmentInfo.segmentDuration,
      startTime,
      startNumber,
      scaledPresentationTimeOffset: segmentInfo.scaledPresentationTimeOffset,
      timeline: segmentInfo.timeline,
      mediaSegments
    };
  }
  /**
   * Checks whether a SegmentListInfo object is valid.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {SegmentList.SegmentListInfo} info
   * @private
   */


  static checkSegmentListInfo_(context, info) {
    if (!info.segmentDuration && !info.timeline && info.mediaSegments.length > 1) {
      shakaLog.warning('SegmentList does not contain sufficient segment information:', 'the SegmentList specifies multiple segments,', 'but does not specify a segment duration or timeline.', context.representation);
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
    }

    if (!info.segmentDuration && !context.periodInfo.duration && !info.timeline && info.mediaSegments.length == 1) {
      shakaLog.warning('SegmentList does not contain sufficient segment information:', 'the SegmentList specifies one segment,', 'but does not specify a segment duration, period duration,', 'or timeline.', context.representation);
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
    }

    if (info.timeline && info.timeline.length == 0) {
      shakaLog.warning('SegmentList does not contain sufficient segment information:', 'the SegmentList has an empty timeline.', context.representation);
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_SEGMENT_INFO);
    }
  }
  /**
   * Creates an array of segment references for the given data.
   *
   * @param {number} periodStart in seconds.
   * @param {?number} periodDuration in seconds.
   * @param {number} startNumber
   * @param {!Array.<string>} baseUris
   * @param {SegmentList.SegmentListInfo} info
   * @param {shaka.media.InitSegmentReference} initSegmentReference
   * @return {!Array.<!shaka.media.SegmentReference>}
   * @private
   */


  static createSegmentReferences_(periodStart, periodDuration, startNumber, baseUris, info, initSegmentReference) {
    let max = info.mediaSegments.length;

    if (info.timeline && info.timeline.length != info.mediaSegments.length) {
      max = Math.min(info.timeline.length, info.mediaSegments.length);
      shakaLog.warning('The number of items in the segment timeline and the number of ', 'segment URLs do not match, truncating', info.mediaSegments.length, 'to', max);
    }

    const timestampOffset = periodStart - info.scaledPresentationTimeOffset;
    const appendWindowStart = periodStart;
    const appendWindowEnd = periodDuration ? periodStart + periodDuration : Infinity;
    /** @type {!Array.<!shaka.media.SegmentReference>} */

    const references = [];
    let prevEndTime = info.startTime;

    for (let i = 0; i < max; i++) {
      const segment = info.mediaSegments[i];
      const mediaUri = ManifestParserUtils.resolveUris(baseUris, [segment.mediaUri]);
      const startTime = prevEndTime;
      let endTime;

      if (info.segmentDuration != null) {
        endTime = startTime + info.segmentDuration;
      } else if (info.timeline) {
        // Ignore the timepoint start since they are continuous.
        endTime = info.timeline[i].end;
      } else {
        // If segmentDuration and timeline are null then there must
        // be exactly one segment.
        goog.asserts.assert(info.mediaSegments.length == 1 && periodDuration, 'There should be exactly one segment with a Period duration.');
        endTime = startTime + periodDuration;
      }

      const getUris = () => mediaUri;

      references.push(new shaka.media.SegmentReference(periodStart + startTime, periodStart + endTime, getUris, segment.start, segment.end, initSegmentReference, timestampOffset, appendWindowStart, appendWindowEnd));
      prevEndTime = endTime;
    }

    return references;
  }
  /**
   * Parses the media URIs from the context.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @return {!Array.<SegmentList.MediaSegment>}
   * @private
   */


  static parseMediaSegments_(context) {
    /** @type {!Array.<!Element>} */
    const segmentLists = [context.representation.segmentList, context.adaptationSet.segmentList, context.period.segmentList].filter(Functional.isNotNull); // Search each SegmentList for one with at least one SegmentURL element,
    // select the first one, and convert each SegmentURL element to a tuple.

    return segmentLists.map(node => XmlUtils.findChildren(node, 'SegmentURL')).reduce((all, part) => all.length > 0 ? all : part).map(urlNode => {
      if (urlNode.getAttribute('indexRange') && !context.indexRangeWarningGiven) {
        context.indexRangeWarningGiven = true;
        shakaLog.warning('We do not support the SegmentURL@indexRange attribute on ' + 'SegmentList.  We only use the SegmentList@duration ' + 'attribute or SegmentTimeline, which must be accurate.');
      }

      const uri = urlNode.getAttribute('media');
      const range = XmlUtils.parseAttr(urlNode, 'mediaRange', XmlUtils.parseRange, {
        start: 0,
        end: null
      });
      return {
        mediaUri: uri,
        start: range.start,
        end: range.end
      };
    });
  }

}

class ContentProtection {
  /**
   * Parses info from the ContentProtection elements at the AdaptationSet level.
   *
   * @param {!Array.<!Element>} elems
   * @param {boolean} ignoreDrmInfo
   * @param {!Object.<string, string>} keySystemsByURI
   * @return {ContentProtection.Context}
   */
  static parseFromAdaptationSet(elems, ignoreDrmInfo, keySystemsByURI) {
    const parsed = ContentProtection.parseElements_(elems);
    /** @type {Array.<shaka.extern.InitDataOverride>} */

    let defaultInit = null;
    /** @type {!Array.<shaka.extern.DrmInfo>} */

    let drmInfos = [];
    let parsedNonCenc = []; // Get the default key ID; if there are multiple, they must all match.

    const keyIds = new Set(parsed.map(element => element.keyId)); // Remove any possible null value (elements may have no key ids).

    keyIds.delete(null);

    if (keyIds.size > 1) {
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_CONFLICTING_KEY_IDS);
    }

    if (!ignoreDrmInfo) {
      // Find the default key ID and init data.  Create a new array of all the
      // non-CENC elements.
      parsedNonCenc = parsed.filter(elem => {
        if (elem.schemeUri == ContentProtection.MP4Protection_) {
          goog.asserts.assert(!elem.init || elem.init.length, 'Init data must be null or non-empty.');
          defaultInit = elem.init || defaultInit;
          return false;
        }

        return true;
      });

      if (parsedNonCenc.length) {
        drmInfos = ContentProtection.convertElements_(defaultInit, parsedNonCenc, keySystemsByURI, keyIds); // If there are no drmInfos after parsing, then add a dummy entry.
        // This may be removed in parseKeyIds.

        if (drmInfos.length == 0) {
          drmInfos = [ManifestParserUtils.createDrmInfo('', defaultInit)];
        }
      }
    } // If there are only CENC element(s) or ignoreDrmInfo flag is set, assume
    // all key-systems are supported.


    if (parsed.length && (ignoreDrmInfo || !parsedNonCenc.length)) {
      drmInfos = [];

      for (const keySystem of Object.values(keySystemsByURI)) {
        // If the manifest doesn't specify any key systems, we shouldn't
        // put clearkey in this list.  Otherwise, it may be triggered when
        // a real key system should be used instead.
        if (keySystem != 'org.w3.clearkey') {
          const info = ManifestParserUtils.createDrmInfo(keySystem, defaultInit);
          drmInfos.push(info);
        }
      }
    } // If we have a default key id, apply it to every initData.


    const defaultKeyId = Array.from(keyIds)[0] || null;

    if (defaultKeyId) {
      for (const info of drmInfos) {
        for (const initData of info.initData) {
          initData.keyId = defaultKeyId;
        }
      }
    }

    return {
      defaultKeyId,
      defaultInit,
      drmInfos,
      firstRepresentation: true
    };
  }
  /**
   * Parses the given ContentProtection elements found at the Representation
   * level.  This may update the |context|.
   *
   * @param {!Array.<!Element>} elems
   * @param {ContentProtection.Context} context
   * @param {boolean} ignoreDrmInfo
   * @param {!Object.<string, string>} keySystemsByURI
   * @return {?string} The parsed key ID
   */


  static parseFromRepresentation(elems, context, ignoreDrmInfo, keySystemsByURI) {
    const repContext = ContentProtection.parseFromAdaptationSet(elems, ignoreDrmInfo, keySystemsByURI);

    if (context.firstRepresentation) {
      const asUnknown = context.drmInfos.length == 1 && !context.drmInfos[0].keySystem;
      const asUnencrypted = context.drmInfos.length == 0;
      const repUnencrypted = repContext.drmInfos.length == 0; // There are two cases where we need to replace the |drmInfos| in the
      // context with those in the Representation:
      //   1. The AdaptationSet does not list any ContentProtection.
      //   2. The AdaptationSet only lists unknown key-systems.

      if (asUnencrypted || asUnknown && !repUnencrypted) {
        context.drmInfos = repContext.drmInfos;
      }

      context.firstRepresentation = false;
    } else if (repContext.drmInfos.length > 0) {
      // If this is not the first Representation, then we need to remove entries
      // from the context that do not appear in this Representation.
      context.drmInfos = context.drmInfos.filter(asInfo => repContext.drmInfos.some(repInfo => repInfo.keySystem == asInfo.keySystem)); // If we have filtered out all key-systems, throw an error.

      if (context.drmInfos.length == 0) {
        throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_NO_COMMON_KEY_SYSTEM);
      }
    }

    return repContext.defaultKeyId || context.defaultKeyId;
  }
  /**
   * Gets a Widevine license URL from a content protection element
   * containing a custom `ms:laurl` element
   *
   * @param {ContentProtection.Element} element
   * @return {string}
   */


  static getWidevineLicenseUrl(element) {
    const mslaurlNode = XmlUtils.findChildNS(element.node, 'urn:microsoft', 'laurl');

    if (mslaurlNode) {
      return mslaurlNode.getAttribute('licenseUrl') || '';
    }

    return '';
  }
  /**
   * Gets a ClearKey license URL from a content protection element
   * containing a custom `clearkey::Laurl` element
   *
   * @param {ContentProtection.Element} element
   * @return {string}
   */


  static getClearKeyLicenseUrl(element) {
    const clearKeyLaurlNode = XmlUtils.findChildNS(element.node, ContentProtection.ClearKeyNamespaceUri_, 'Laurl');

    if (clearKeyLaurlNode && clearKeyLaurlNode.getAttribute('Lic_type') === 'EME-1.0') {
      if (clearKeyLaurlNode.textContent) {
        return clearKeyLaurlNode.textContent;
      }
    }

    return '';
  }
  /**
   * Parses an Array buffer starting at byteOffset for PlayReady Object Records.
   * Each PRO Record is preceded by its PlayReady Record type and length in
   * bytes.
   *
   * PlayReady Object Record format: https://goo.gl/FTcu46
   *
   * @param {!DataView} view
   * @param {number} byteOffset
   * @return {!Array.<ContentProtection.PlayReadyRecord>}
   * @private
   */


  static parseMsProRecords_(view, byteOffset) {
    const records = [];

    while (byteOffset < view.byteLength - 1) {
      const type = view.getUint16(byteOffset, true);
      byteOffset += 2;
      const byteLength = view.getUint16(byteOffset, true);
      byteOffset += 2;

      if ((byteLength & 1) != 0 || byteLength + byteOffset > view.byteLength) {
        shakaLog.warning('Malformed MS PRO object');
        return [];
      }

      const recordValue = shaka.util.BufferUtils.toUint8(view, byteOffset, byteLength);
      records.push({
        type,
        value: recordValue
      });
      byteOffset += byteLength;
    }

    return records;
  }
  /**
   * Parses a buffer for PlayReady Objects.  The data
   * should contain a 32-bit integer indicating the length of
   * the PRO in bytes.  Following that, a 16-bit integer for
   * the number of PlayReady Object Records in the PRO.  Lastly,
   * a byte array of the PRO Records themselves.
   *
   * PlayReady Object format: https://goo.gl/W8yAN4
   *
   * @param {BufferSource} data
   * @return {!Array.<ContentProtection.PlayReadyRecord>}
   * @private
   */


  static parseMsPro_(data) {
    let byteOffset = 0;
    const view = shaka.util.BufferUtils.toDataView(data); // First 4 bytes is the PRO length (DWORD)

    const byteLength = view.getUint32(byteOffset,
    /* littleEndian= */
    true);
    byteOffset += 4;

    if (byteLength != data.byteLength) {
      // Malformed PRO
      shakaLog.warning('PlayReady Object with invalid length encountered.');
      return [];
    } // Skip PRO Record count (WORD)


    byteOffset += 2; // Rest of the data contains the PRO Records

    return ContentProtection.parseMsProRecords_(view, byteOffset);
  }
  /**
   * PlayReady Header format: https://goo.gl/dBzxNA
   *
   * @param {!Element} xml
   * @return {string}
   * @private
   */


  static getLaurl_(xml) {
    // LA_URL element is optional and no more than one is
    // allowed inside the DATA element. Only absolute URLs are allowed.
    // If the LA_URL element exists, it must not be empty.
    for (const elem of xml.getElementsByTagName('DATA')) {
      for (const child of elem.childNodes) {
        if (child instanceof Element && child.tagName == 'LA_URL') {
          return child.textContent;
        }
      }
    } // Not found


    return '';
  }
  /**
   * Gets a PlayReady license URL from a content protection element
   * containing a PlayReady Header Object
   *
   * @param {ContentProtection.Element} element
   * @return {string}
   */


  static getPlayReadyLicenseUrl(element) {
    const proNode = XmlUtils.findChildNS(element.node, 'urn:microsoft:playready', 'pro');

    if (!proNode) {
      return '';
    }

    const {
      PLAYREADY_RECORD_TYPES
    } = ContentProtection;
    const bytes = shaka.util.Uint8ArrayUtils.fromBase64(proNode.textContent);
    const records = ContentProtection.parseMsPro_(bytes);
    const record = records.filter(record => record.type === PLAYREADY_RECORD_TYPES.RIGHTS_MANAGEMENT)[0];

    if (!record) {
      return '';
    }

    const xml = shaka.util.StringUtils.fromUTF16(record.value, true);
    const rootElement = XmlUtils.parseXmlString(xml, 'WRMHEADER');

    if (!rootElement) {
      return '';
    }

    return ContentProtection.getLaurl_(rootElement);
  }
  /**
   * Gets a PlayReady initData from a content protection element
   * containing a PlayReady Pro Object
   *
   * @param {ContentProtection.Element} element
   * @return {?Array.<shaka.extern.InitDataOverride>}
   * @private
   */


  static getInitDataFromPro_(element) {
    const proNode = XmlUtils.findChildNS(element.node, 'urn:microsoft:playready', 'pro');

    if (!proNode) {
      return null;
    }

    const {
      Uint8ArrayUtils
    } = shaka.util;
    const data = Uint8ArrayUtils.fromBase64(proNode.textContent);
    const systemId = new Uint8Array([0x9a, 0x04, 0xf0, 0x79, 0x98, 0x40, 0x42, 0x86, 0xab, 0x92, 0xe6, 0x5b, 0xe0, 0x88, 0x5f, 0x95]);
    const keyIds = new Set();
    const psshVersion = 0;
    const pssh = shaka.util.Pssh.createPssh(data, systemId, keyIds, psshVersion);
    return [{
      initData: pssh,
      initDataType: 'cenc',
      keyId: element.keyId
    }];
  }
  /**
   * Creates ClearKey initData from Default_KID value retrieved from previously
   * parsed ContentProtection tag.
   * @param {ContentProtection.Element} element
   * @param {!Set.<string>} keyIds
   * @return {?Array.<shaka.extern.InitDataOverride>}
   * @private
   */


  static getInitDataClearKey_(element, keyIds) {
    if (keyIds.size == 0) {
      return null;
    }

    const systemId = new Uint8Array([0x10, 0x77, 0xef, 0xec, 0xc0, 0xb2, 0x4d, 0x02, 0xac, 0xe3, 0x3c, 0x1e, 0x52, 0xe2, 0xfb, 0x4b]);
    const data = new Uint8Array([]);
    const psshVersion = 1;
    const pssh = shaka.util.Pssh.createPssh(data, systemId, keyIds, psshVersion);
    return [{
      initData: pssh,
      initDataType: 'cenc',
      keyId: element.keyId
    }];
  }
  /**
   * Creates DrmInfo objects from the given element.
   *
   * @param {Array.<shaka.extern.InitDataOverride>} defaultInit
   * @param {!Array.<ContentProtection.Element>} elements
   * @param {!Object.<string, string>} keySystemsByURI
   * @param {!Set.<string>} keyIds
   * @return {!Array.<shaka.extern.DrmInfo>}
   * @private
   */


  static convertElements_(defaultInit, elements, keySystemsByURI) {
    const licenseUrlParsers = ContentProtection.licenseUrlParsers_;
    /** @type {!Array.<shaka.extern.DrmInfo>} */

    const out = [];

    for (const element of elements) {
      const keySystem = keySystemsByURI[element.schemeUri];

      if (keySystem) {
        goog.asserts.assert(!element.init || element.init.length, 'Init data must be null or non-empty.'); // TODO check Playready, clearkey

        const initData = element.init || defaultInit;
        const info = ManifestParserUtils.createDrmInfo(keySystem, initData);
        const licenseParser = licenseUrlParsers.get(keySystem);

        if (licenseParser) {
          info.licenseServerUri = licenseParser(element);
        }

        out.push(info);
      }
    }

    return out;
  }
  /**
   * Parses the given ContentProtection elements.  If there is an error, it
   * removes those elements.
   *
   * @param {!Array.<!Element>} elems
   * @return {!Array.<ContentProtection.Element>}
   * @private
   */


  static parseElements_(elems) {
    /** @type {!Array.<ContentProtection.Element>} */
    const out = [];

    for (const elem of elems) {
      const parsed = ContentProtection.parseElement_(elem);

      if (parsed) {
        out.push(parsed);
      }
    }

    return out;
  }
  /**
   * Parses the given ContentProtection element.
   *
   * @param {!Element} elem
   * @return {?ContentProtection.Element}
   * @private
   */


  static parseElement_(elem) {
    const NS = ContentProtection.CencNamespaceUri_;
    /** @type {?string} */

    let schemeUri = elem.getAttribute('schemeIdUri');
    /** @type {?string} */

    let keyId = XmlUtils.getAttributeNS(elem, NS, 'default_KID');
    /** @type {!Array.<string>} */

    const psshs = XmlUtils.findChildrenNS(elem, NS, 'pssh').map(XmlUtils.getContents);

    if (!schemeUri) {
      shakaLog.error('Missing required schemeIdUri attribute on', 'ContentProtection element', elem);
      return null;
    }

    schemeUri = schemeUri.toLowerCase();

    if (keyId) {
      keyId = keyId.replace(/-/g, '').toLowerCase();

      if (keyId.includes(' ')) {
        throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_MULTIPLE_KEY_IDS_NOT_SUPPORTED);
      }
    }
    /** @type {!Array.<shaka.extern.InitDataOverride>} */


    let init = [];

    try {
      // Try parsing PSSH data.
      init = psshs.map(pssh => ({
        initDataType: 'cenc',
        initData: shaka.util.Uint8ArrayUtils.fromBase64(pssh),
        keyId: null
      }));
    } catch (e) {
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_PSSH_BAD_ENCODING);
    }

    return {
      node: elem,
      schemeUri,
      keyId,
      init: init.length > 0 ? init : null
    };
  }

}
/**
 * Enum for PlayReady record types.
 * @enum {number}
 */

ContentProtection.PLAYREADY_RECORD_TYPES = {
  RIGHTS_MANAGEMENT: 0x001,
  RESERVED: 0x002,
  EMBEDDED_LICENSE: 0x003
};
/**
 * A map of key system name to license server url parser.
 *
 * @const {!Map.<string, function(ContentProtection.Element)>}
 * @private
 */

ContentProtection.licenseUrlParsers_ = new Map().set('com.widevine.alpha', ContentProtection.getWidevineLicenseUrl).set('com.microsoft.playready', ContentProtection.getPlayReadyLicenseUrl).set('com.microsoft.playready.recommendation', ContentProtection.getPlayReadyLicenseUrl).set('com.microsoft.playready.software', ContentProtection.getPlayReadyLicenseUrl).set('com.microsoft.playready.hardware', ContentProtection.getPlayReadyLicenseUrl).set('org.w3.clearkey', ContentProtection.getClearKeyLicenseUrl);
/**
 * @const {string}
 * @private
 */

ContentProtection.MP4Protection_ = 'urn:mpeg:dash:mp4protection:2011';
/**
 * @const {string}
 * @private
 */

ContentProtection.CencNamespaceUri_ = 'urn:mpeg:cenc:2013';
/**
 * @const {string}
 * @private
 */

ContentProtection.ClearKeyNamespaceUri_ = 'http://dashif.org/guidelines/clearKey';
/**
 * @const {string}
 * @private
 */

ContentProtection.ClearKeySchemeUri_ = 'urn:uuid:e2719d58-a985-b3c9-781a-b030af78d30e';

class Ewma {
  /**
   * @param {number} halfLife The quantity of prior samples (by weight) used
   *   when creating a new estimate.  Those prior samples make up half of the
   *   new estimate.
   */
  constructor(halfLife) {
    goog.asserts.assert(halfLife > 0, 'expected halfLife to be positive');
    /**
     * Larger values of alpha expire historical data more slowly.
     * @private {number}
     */

    this.alpha_ = Math.exp(Math.log(0.5) / halfLife);
    /** @private {number} */

    this.estimate_ = 0;
    /** @private {number} */

    this.totalWeight_ = 0;
  }
  /**
   * Update the alpha with a new halfLife value.
   *
   * @param {number} halfLife The quantity of prior samples (by weight) used
   *   when creating a new estimate.  Those prior samples make up half of the
   *   new estimate.
   */


  updateAlpha(halfLife) {
    goog.asserts.assert(halfLife > 0, 'expected halfLife to be positive');
    this.alpha_ = Math.exp(Math.log(0.5) / halfLife);
  }
  /**
   * Takes a sample.
   *
   * @param {number} weight
   * @param {number} value
   */


  sample(weight, value) {
    const adjAlpha = this.alpha_ ** weight;
    const newEstimate = value * (1 - adjAlpha) + adjAlpha * this.estimate_;

    if (!Number.isNaN(newEstimate)) {
      this.estimate_ = newEstimate;
      this.totalWeight_ += weight;
    }
  }
  /**
   * @return {number}
   */


  getEstimate() {
    const zeroFactor = 1 - this.alpha_ ** this.totalWeight_;
    return this.estimate_ / zeroFactor;
  }

}
/**
 * Creates a new DASH parser.
 *
 * @implements {shaka.extern.ManifestParser}
 * @export
 */


class DashParser {
  /** Creates a new DASH parser. */
  constructor() {
    /** @private {?shaka.extern.ManifestConfiguration} */
    this.config_ = null;
    /** @private {?shaka.extern.ManifestParser.PlayerInterface} */

    this.playerInterface_ = null;
    /** @private {!Array.<string>} */

    this.manifestUris_ = [];
    /** @private {?shaka.extern.Manifest} */

    this.manifest_ = null;
    /** @private {number} */

    this.globalId_ = 1;
    /**
     * A map of IDs to Stream objects.
     * ID: Period@id,AdaptationSet@id,@Representation@id
     * e.g.: '1,5,23'
     * @private {!Object.<string, !shaka.extern.Stream>}
     */

    this.streamMap_ = {};
    /**
     * A map of period ids to their durations
     * @private {!Object.<string, number>}
     */

    this.periodDurations_ = {};
    /** @private {PeriodCombiner} */

    this.periodCombiner_ = new PeriodCombiner();
    /**
     * The update period in seconds, or 0 for no updates.
     * @private {number}
     */

    this.updatePeriod_ = 0;
    /**
     * An ewma that tracks how long updates take.
     * This is to mitigate issues caused by slow parsing on embedded devices.
     * @private {!shaka.abr.Ewma}
     */

    this.averageUpdateDuration_ = new Ewma(5);
    /** @private {shaka.util.Timer} */

    this.updateTimer_ = new shaka.util.Timer(() => {
      this.onUpdate_();
    });
    /** @private {!shaka.util.OperationManager} */

    this.operationManager_ = new OperationManager();
    /**
     * Largest period start time seen.
     * @private {?number}
     */

    this.largestPeriodStartTime_ = null;
    /**
     * Period IDs seen in previous manifest.
     * @private {!Array.<string>}
     */

    this.lastManifestUpdatePeriodIds_ = [];
    /**
     * The minimum of the availabilityTimeOffset values among the adaptation
     * sets.
     * @private {number}
     */

    this.minTotalAvailabilityTimeOffset_ = Infinity;
    /** @private {boolean} */

    this.lowLatencyMode_ = false;
  }
  /**
   * @override
   * @exportInterface
   */


  configure(config) {
    goog.asserts.assert(config.dash != null, 'DashManifestConfiguration should not be null!');
    this.config_ = config;
  }
  /**
   * @override
   * @exportInterface
   */


  async start(uri, playerInterface) {
    goog.asserts.assert(this.config_, 'Must call configure() before start()!');
    this.lowLatencyMode_ = playerInterface.isLowLatencyMode();
    this.manifestUris_ = [uri];
    this.playerInterface_ = playerInterface;
    console.info('Load with custom DASH parser:', uri);
    const updateDelay = await this.requestManifest_();

    if (this.playerInterface_) {
      this.setUpdateTimer_(updateDelay);
    } // Make sure that the parser has not been destroyed.


    if (!this.playerInterface_) {
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.PLAYER, shaka.util.Error.Code.OPERATION_ABORTED);
    }

    goog.asserts.assert(this.manifest_, 'Manifest should be non-null!');
    return this.manifest_;
  }
  /**
   * @override
   * @exportInterface
   */


  stop() {
    // When the parser stops, release all segment indexes, which stops their
    // timers, as well.
    for (const stream of Object.values(this.streamMap_)) {
      if (stream.segmentIndex) {
        stream.segmentIndex.release();
      }
    }

    if (this.periodCombiner_) {
      this.periodCombiner_.release();
    }

    this.playerInterface_ = null;
    this.config_ = null;
    this.manifestUris_ = [];
    this.manifest_ = null;
    this.streamMap_ = {};
    this.periodCombiner_ = null;

    if (this.updateTimer_ != null) {
      this.updateTimer_.stop();
      this.updateTimer_ = null;
    }

    return this.operationManager_.destroy();
  }
  /**
   * @override
   * @exportInterface
   */


  async update() {
    try {
      await this.requestManifest_();
    } catch (error) {
      if (!this.playerInterface_ || !error) {
        return;
      }

      goog.asserts.assert(error instanceof shaka.util.Error, 'Bad error type');
      this.playerInterface_.onError(error);
    }
  }
  /**
   * @override
   * @exportInterface
   */


  onExpirationUpdated() {// No-op
  }
  /**
   * Makes a network request for the manifest and parses the resulting data.
   *
   * @return {!Promise.<number>} Resolves with the time it took, in seconds, to
   *   fulfill the request and parse the data.
   * @private
   */


  async requestManifest_() {
    const requestType = shaka.net.NetworkingEngine.RequestType.MANIFEST;
    const request = shaka.net.NetworkingEngine.makeRequest(this.manifestUris_, this.config_.retryParameters);
    const {
      networkingEngine
    } = this.playerInterface_;
    const format = shaka.util.CmcdManager.StreamingFormat.DASH;
    this.playerInterface_.modifyManifestRequest(request, {
      format
    });
    const startTime = Date.now();
    const operation = networkingEngine.request(requestType, request);
    this.operationManager_.manage(operation);
    const response = await operation.promise; // Detect calls to stop().

    if (!this.playerInterface_) {
      return 0;
    } // For redirections add the response uri to the first entry in the
    // Manifest Uris array.


    if (response.uri && !this.manifestUris_.includes(response.uri)) {
      this.manifestUris_.unshift(response.uri);
    } // This may throw, but it will result in a failed promise.


    await this.parseManifest_(new TextDecoder().decode(response.data), response.uri); // Keep track of how long the longest manifest update took.

    const endTime = Date.now();
    const updateDuration = (endTime - startTime) / 1000.0;
    this.averageUpdateDuration_.sample(1, updateDuration); // Let the caller know how long this update took.

    return updateDuration;
  }
  /**
   * Parses the manifest XML.  This also handles updates and will update the
   * stored manifest.
   *
   * @param {BufferSource} data
   * @param {string} finalManifestUri The final manifest URI, which may
   *   differ from this.manifestUri_ if there has been a redirect.
   * @return {!Promise}
   * @private
   */


  async parseManifest_(data, finalManifestUri) {
    const {
      Error
    } = shaka.util;
    const mpd = XmlUtils.parseXmlString(data, 'MPD');

    if (!mpd) {
      throw new Error(Error.Severity.CRITICAL, Error.Category.MANIFEST, Error.Code.DASH_INVALID_XML, finalManifestUri);
    }

    const {
      disableXlinkProcessing
    } = this.config_.dash;

    if (disableXlinkProcessing) {
      return this.processManifest_(mpd, finalManifestUri);
    } // Process the mpd to account for xlink connections.


    const failGracefully = this.config_.dash.xlinkFailGracefully;
    const xlinkOperation = MpdUtils.processXlinks(mpd, this.config_.retryParameters, failGracefully, finalManifestUri, this.playerInterface_.networkingEngine);
    this.operationManager_.manage(xlinkOperation);
    const finalMpd = await xlinkOperation.promise;
    return this.processManifest_(finalMpd, finalManifestUri);
  }
  /**
   * Takes a formatted MPD and converts it into a manifest.
   *
   * @param {!Element} mpd
   * @param {string} finalManifestUri The final manifest URI, which may
   *   differ from this.manifestUri_ if there has been a redirect.
   * @return {!Promise}
   * @private
   */


  async processManifest_(mpd, finalManifestUri) {
    const {
      manifestPreprocessor
    } = this.config_.dash;

    if (manifestPreprocessor) {
      manifestPreprocessor(mpd);
    } // Get any Location elements.  This will update the manifest location and
    // the base URI.

    /** @type {!Array.<string>} */


    let manifestBaseUris = [finalManifestUri];
    /** @type {!Array.<string>} */

    const locations = XmlUtils.findChildren(mpd, 'Location').map(XmlUtils.getContents).filter(it => it != null);

    if (locations.length > 0) {
      const absoluteLocations = ManifestParserUtils.resolveUris(manifestBaseUris, locations);
      this.manifestUris_ = absoluteLocations;
      manifestBaseUris = absoluteLocations;
    }

    const uriObjs = XmlUtils.findChildren(mpd, 'BaseURL');
    const uris = uriObjs.map(XmlUtils.getContents);
    const baseUris = ManifestParserUtils.resolveUris(manifestBaseUris, uris);
    let availabilityTimeOffset = 0;

    if (uriObjs && uriObjs.length) {
      availabilityTimeOffset = XmlUtils.parseAttr(uriObjs[0], 'availabilityTimeOffset', XmlUtils.parseFloat) || 0;
    }

    const {
      ignoreMinBufferTime
    } = this.config_.dash;
    let minBufferTime = 0;

    if (!ignoreMinBufferTime) {
      minBufferTime = XmlUtils.parseAttr(mpd, 'minBufferTime', XmlUtils.parseDuration) || 0;
    }

    this.updatePeriod_ =
    /** @type {number} */
    Math.max(1, XmlUtils.parseAttr(mpd, 'minimumUpdatePeriod', XmlUtils.parseDuration, -1));
    const presentationStartTime = XmlUtils.parseAttr(mpd, 'availabilityStartTime', XmlUtils.parseDate) - (window.segmentTimestampOffset || 0); // Shaka may keep buffering inifnitely for lower timeShiftBufferDepth

    let segmentAvailabilityDuration = Math.max(60, XmlUtils.parseAttr(mpd, 'timeShiftBufferDepth', XmlUtils.parseDuration));
    const {
      ignoreSuggestedPresentationDelay
    } = this.config_.dash;
    let suggestedPresentationDelay = null;

    if (!ignoreSuggestedPresentationDelay) {
      suggestedPresentationDelay = XmlUtils.parseAttr(mpd, 'suggestedPresentationDelay', XmlUtils.parseDuration);
    }

    const {
      ignoreMaxSegmentDuration
    } = this.config_.dash;
    let maxSegmentDuration = null;

    if (!ignoreMaxSegmentDuration) {
      maxSegmentDuration = XmlUtils.parseAttr(mpd, 'maxSegmentDuration', XmlUtils.parseDuration);
    }

    const mpdType = mpd.getAttribute('type') || 'static';
    /** @type {!shaka.media.PresentationTimeline} */

    let presentationTimeline;

    if (this.manifest_) {
      presentationTimeline = this.manifest_.presentationTimeline; // Before processing an update, evict from all segment indexes.  Some of
      // them may not get updated otherwise if their corresponding Period
      // element has been dropped from the manifest since the last update.
      // Without this, playback will still work, but this is necessary to
      // maintain conditions that we assert on for multi-Period content.
      // This gives us confidence that our state is maintained correctly, and
      // that the complex logic of multi-Period eviction and period-flattening
      // is correct.  See also:
      // https://github.com/shaka-project/shaka-player/issues/3169#issuecomment-823580634

      for (const stream of Object.values(this.streamMap_)) {
        if (stream.segmentIndex) {
          stream.segmentIndex.evict(presentationTimeline.getSegmentAvailabilityStart());
        }
      }
    } else {
      // DASH IOP v3.0 suggests using a default delay between minBufferTime
      // and timeShiftBufferDepth.  This is literally the range of all
      // feasible choices for the value.  Nothing older than
      // timeShiftBufferDepth is still available, and anything less than
      // minBufferTime will cause buffering issues.
      //
      // We have decided that our default will be the configured value, or
      // 1.5 * minBufferTime if not configured. This is fairly conservative.
      // Content providers should provide a suggestedPresentationDelay whenever
      // possible to optimize the live streaming experience.
      const defaultPresentationDelay = this.config_.defaultPresentationDelay || minBufferTime * 1.5;
      const presentationDelay = suggestedPresentationDelay != null ? suggestedPresentationDelay : defaultPresentationDelay;
      presentationTimeline = new shaka.media.PresentationTimeline(presentationStartTime, presentationDelay, this.config_.dash.autoCorrectDrift);
    }

    presentationTimeline.setStatic(mpdType == 'static');
    const isLive = presentationTimeline.isLive(); // If it's live, we check for an override.

    if (isLive && !Number.isNaN(this.config_.availabilityWindowOverride)) {
      segmentAvailabilityDuration = this.config_.availabilityWindowOverride;
    } // If it's null, that means segments are always available.  This is always
    // the case for VOD, and sometimes the case for live.


    if (segmentAvailabilityDuration == null) {
      segmentAvailabilityDuration = Infinity;
    }

    presentationTimeline.setSegmentAvailabilityDuration(segmentAvailabilityDuration);
    const profiles = mpd.getAttribute('profiles') || '';
    /** @type {shaka.dash.DashParser.Context} */

    const context = {
      // Don't base on updatePeriod_ since emsg boxes can cause manifest
      // updates.
      dynamic: mpdType != 'static',
      presentationTimeline,
      period: null,
      periodInfo: null,
      adaptationSet: null,
      representation: null,
      bandwidth: 0,
      indexRangeWarningGiven: false,
      availabilityTimeOffset,
      profiles: profiles.split(',')
    };
    const periodsAndDuration = this.parsePeriods_(context, baseUris, mpd);
    const {
      duration
    } = periodsAndDuration;
    const {
      periods
    } = periodsAndDuration;

    if (mpdType == 'static' || !periodsAndDuration.durationDerivedFromPeriods) {
      // Ignore duration calculated from Period lengths if this is dynamic.
      presentationTimeline.setDuration(duration || Infinity);
    } // The segments are available earlier than the availability start time.
    // If the stream is low latency and the user has not configured the
    // lowLatencyMode, but if it has been configured to activate the
    // lowLatencyMode if a stream of this type is detected, we automatically
    // activate the lowLatencyMode.


    if (this.minTotalAvailabilityTimeOffset_ && !this.lowLatencyMode_) {
      const autoLowLatencyMode = this.playerInterface_.isAutoLowLatencyMode();

      if (autoLowLatencyMode) {
        this.playerInterface_.enableLowLatencyMode();
        this.lowLatencyMode_ = this.playerInterface_.isLowLatencyMode();
      }
    }

    if (this.lowLatencyMode_) {
      presentationTimeline.setAvailabilityTimeOffset(this.minTotalAvailabilityTimeOffset_);
    } else if (this.minTotalAvailabilityTimeOffset_) {
      // If the playlist contains AvailabilityTimeOffset value, the
      // streaming.lowLatencyMode value should be set to true to stream with low
      // latency mode.
      shakaLog.alwaysWarn('Low-latency DASH live stream detected, but ' + 'low-latency streaming mode is not enabled in Shaka Player. ' + 'Set streaming.lowLatencyMode configuration to true, and see ' + 'https://bit.ly/3clctcj for details.');
    } // Use @maxSegmentDuration to override smaller, derived values.


    presentationTimeline.notifyMaxSegmentDuration(maxSegmentDuration || 1);

    await this.periodCombiner_.combinePeriods(periods, context.dynamic); // These steps are not done on manifest update.

    if (!this.manifest_) {
      this.manifest_ = {
        presentationTimeline,
        variants: this.periodCombiner_.getVariants(),
        textStreams: this.periodCombiner_.getTextStreams(),
        imageStreams: this.periodCombiner_.getImageStreams(),
        offlineSessionIds: [],
        minBufferTime: minBufferTime || 0,
        sequenceMode: false
      }; // We only need to do clock sync when we're using presentation start
      // time. This condition also excludes VOD streams.

      if (presentationTimeline.usingPresentationStartTime()) {
        const timingElements = XmlUtils.findChildren(mpd, 'UTCTiming');
        const offset = await this.parseUtcTiming_(baseUris, timingElements); // Detect calls to stop().

        if (!this.playerInterface_) {
          return;
        }

        presentationTimeline.setClockOffset(offset);
      }
    } else {
      // Just update the variants and text streams, which may change as periods
      // are added or removed.
      this.manifest_.variants = this.periodCombiner_.getVariants();
      this.manifest_.textStreams = this.periodCombiner_.getTextStreams();
      this.manifest_.imageStreams = this.periodCombiner_.getImageStreams(); // Re-filter the manifest.  This will check any configured restrictions on
      // new variants, and will pass any new init data to DrmEngine to ensure
      // that key rotation works correctly.

      this.playerInterface_.filter(this.manifest_);
    } // Add text streams to correspond to closed captions.  This happens right
    // after period combining, while we still have a direct reference, so that
    // any new streams will appear in the period combiner.


    this.playerInterface_.makeTextStreamsForClosedCaptions(this.manifest_);
  }
  /**
   * Reads and parses the periods from the manifest.  This first does some
   * partial parsing so the start and duration is available when parsing
   * children.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {!Array.<string>} baseUris
   * @param {!Element} mpd
   * @return {{
   *   periods: !Array.<PeriodCombiner.Period>,
   *   duration: ?number,
   *   durationDerivedFromPeriods: boolean
   * }}
   * @private
   */


  parsePeriods_(context, baseUris, mpd) {
    const presentationDuration = XmlUtils.parseAttr(mpd, 'mediaPresentationDuration', XmlUtils.parseDuration);
    const periods = [];
    let prevEnd = 0;
    const periodNodes = XmlUtils.findChildren(mpd, 'Period');

    for (let i = 0; i < periodNodes.length; i++) {
      const elem = periodNodes[i];
      const next = periodNodes[i + 1];
      const start =
      /** @type {number} */
      XmlUtils.parseAttr(elem, 'start', XmlUtils.parseDuration, prevEnd);
      const periodId = elem.id;
      const givenDuration = XmlUtils.parseAttr(elem, 'duration', XmlUtils.parseDuration);
      let periodDuration = null;

      if (next) {
        // "The difference between the start time of a Period and the start time
        // of the following Period is the duration of the media content
        // represented by this Period."
        const nextStart = XmlUtils.parseAttr(next, 'start', XmlUtils.parseDuration);

        if (nextStart != null) {
          periodDuration = nextStart - start;
        }
      } else if (presentationDuration != null) {
        // "The Period extends until the Period.start of the next Period, or
        // until the end of the Media Presentation in the case of the last
        // Period."
        periodDuration = presentationDuration - start;
      }

      const threshold = ManifestParserUtils.GAP_OVERLAP_TOLERANCE_SECONDS;

      if (periodDuration && givenDuration && Math.abs(periodDuration - givenDuration) > threshold) {
        shakaLog.warning('There is a gap/overlap between Periods', elem);
      } // Only use the @duration in the MPD if we can't calculate it.  We should
      // favor the @start of the following Period.  This ensures that there
      // aren't gaps between Periods.


      if (periodDuration == null) {
        periodDuration = givenDuration;
      }
      /**
       * This is to improve robustness when the player observes manifest with
       * past periods that are inconsistent to previous ones.
       *
       * This may happen when a CDN or proxy server switches its upstream from
       * one encoder to another redundant encoder.
       *
       * Skip periods that match all of the following criteria:
       * - Start time is earlier than latest period start time ever seen
       * - Period ID is never seen in the previous manifest
       * - Not the last period in the manifest
       *
       * Periods that meet the aforementioned criteria are considered invalid
       * and should be safe to discard.
       */


      if (this.largestPeriodStartTime_ !== null && periodId !== null && start !== null && start < this.largestPeriodStartTime_ && !this.lastManifestUpdatePeriodIds_.includes(periodId) && i + 1 != periodNodes.length) {
        shakaLog.debug(`Skipping Period with ID ${periodId} as its start time is smaller` + ' than the largest period start time that has been seen, and ID ' + 'is unseen before');
        continue;
      } // Save maximum period start time if it is the last period


      if (start !== null && (this.largestPeriodStartTime_ === null || start > this.largestPeriodStartTime_)) {
        this.largestPeriodStartTime_ = start;
      } // Parse child nodes.


      const info = {
        start,
        duration: periodDuration,
        node: elem,
        isLastPeriod: periodDuration == null || !next
      };
      const period = this.parsePeriod_(context, baseUris, info);
      periods.push(period);

      if (context.period.id && periodDuration) {
        this.periodDurations_[context.period.id] = periodDuration;
      }

      if (periodDuration == null) {
        if (next) {
          // If the duration is still null and we aren't at the end, then we
          // will skip any remaining periods.
          shakaLog.warning('Skipping Period', i + 1, 'and any subsequent Periods:', 'Period', i + 1, 'does not have a valid start time.', next);
        } // The duration is unknown, so the end is unknown.


        prevEnd = null;
        break;
      }

      prevEnd = start + periodDuration;
    } // end of period parsing loop
    // Replace previous seen periods with the current one.


    this.lastManifestUpdatePeriodIds_ = periods.map(el => el.id);

    if (presentationDuration != null) {
      if (prevEnd != presentationDuration) {
        shakaLog.warning('@mediaPresentationDuration does not match the total duration of ', 'all Periods.'); // Assume @mediaPresentationDuration is correct.
      }

      return {
        periods,
        duration: presentationDuration,
        durationDerivedFromPeriods: false
      };
    }

    return {
      periods,
      duration: prevEnd,
      durationDerivedFromPeriods: true
    };
  }
  /**
   * Parses a Period XML element.  Unlike the other parse methods, this is not
   * given the Node; it is given a PeriodInfo structure.  Also, partial parsing
   * was done before this was called so start and duration are valid.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {!Array.<string>} baseUris
   * @param {shaka.dash.DashParser.PeriodInfo} periodInfo
   * @return {PeriodCombiner.Period}
   * @private
   */


  parsePeriod_(context, baseUris, periodInfo) {
    const {
      ContentType
    } = ManifestParserUtils;
    context.period = this.createFrame_(periodInfo.node, null, baseUris);
    context.periodInfo = periodInfo;
    context.period.availabilityTimeOffset = context.availabilityTimeOffset; // If the period doesn't have an ID, give it one based on its start time.

    if (!context.period.id) {
      shakaLog.info(`No Period ID given for Period with start time ${periodInfo.start},  Assigning a default`);
      context.period.id = `__shaka_period_${periodInfo.start}`;
    }

    const eventStreamNodes = XmlUtils.findChildren(periodInfo.node, 'EventStream');
    const availabilityStart = context.presentationTimeline.getSegmentAvailabilityStart();

    for (const node of eventStreamNodes) {
      this.parseEventStream_(periodInfo.start, periodInfo.duration, node, availabilityStart);
    }

    const adaptationSetNodes = XmlUtils.findChildren(periodInfo.node, 'AdaptationSet');
    const adaptationSets = adaptationSetNodes.map(node => this.parseAdaptationSet_(context, node)).filter(Functional.isNotNull); // For dynamic manifests, we use rep IDs internally, and they must be
    // unique.

    if (context.dynamic) {
      const ids = [];

      for (const set of adaptationSets) {
        for (const id of set.representationIds) {
          ids.push(id);
        }
      }

      const uniqueIds = new Set(ids);

      if (ids.length != uniqueIds.size) {
        throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_DUPLICATE_REPRESENTATION_ID);
      }
    }

    const normalAdaptationSets = adaptationSets.filter(as => !as.trickModeFor);
    const trickModeAdaptationSets = adaptationSets.filter(as => as.trickModeFor); // Attach trick mode tracks to normal tracks.

    for (const trickModeSet of trickModeAdaptationSets) {
      const targetIds = trickModeSet.trickModeFor.split(' ');

      for (const normalSet of normalAdaptationSets) {
        if (targetIds.includes(normalSet.id)) {
          for (const stream of normalSet.streams) {
            // There may be multiple trick mode streams, but we do not
            // currently support that.  Just choose one.
            // TODO: https://github.com/shaka-project/shaka-player/issues/1528
            stream.trickModeVideo = trickModeSet.streams.find(trickStream => MimeUtils.getCodecBase(stream.codecs) == MimeUtils.getCodecBase(trickStream.codecs));
          }
        }
      }
    }

    const audioSets = this.config_.disableAudio ? [] : this.getSetsOfType_(normalAdaptationSets, ContentType.AUDIO);
    const videoSets = this.config_.disableVideo ? [] : this.getSetsOfType_(normalAdaptationSets, ContentType.VIDEO);
    const textSets = this.config_.disableText ? [] : this.getSetsOfType_(normalAdaptationSets, ContentType.TEXT);
    const imageSets = this.config_.disableThumbnails ? [] : this.getSetsOfType_(normalAdaptationSets, ContentType.IMAGE);

    if (!videoSets.length && !audioSets.length) {
      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_EMPTY_PERIOD);
    }

    const audioStreams = [];

    for (const audioSet of audioSets) {
      audioStreams.push(...audioSet.streams);
    }

    const videoStreams = [];

    for (const videoSet of videoSets) {
      videoStreams.push(...videoSet.streams);
    }

    const textStreams = [];

    for (const textSet of textSets) {
      textStreams.push(...textSet.streams);
    }

    const imageStreams = [];

    for (const imageSet of imageSets) {
      imageStreams.push(...imageSet.streams);
    }

    return {
      id: context.period.id,
      audioStreams,
      videoStreams,
      textStreams,
      imageStreams
    };
  }
  /**
   * @param {!Array.<!shaka.dash.DashParser.AdaptationInfo>} adaptationSets
   * @param {string} type
   * @return {!Array.<!shaka.dash.DashParser.AdaptationInfo>}
   * @private
   */


  getSetsOfType_(adaptationSets, type) {
    return adaptationSets.filter(as => as.contentType == type);
  }
  /**
   * Parses an AdaptationSet XML element.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {!Element} elem The AdaptationSet element.
   * @return {?shaka.dash.DashParser.AdaptationInfo}
   * @private
   */


  parseAdaptationSet_(context, elem) {
    const {
      ContentType
    } = ManifestParserUtils;
    context.adaptationSet = this.createFrame_(elem, context.period, null);
    let main = false;
    const roleElements = XmlUtils.findChildren(elem, 'Role');
    const roleValues = roleElements.map(role => role.getAttribute('value')).filter(Functional.isNotNull); // Default kind for text streams is 'subtitle' if unspecified in the
    // manifest.

    let kind;
    const isText = context.adaptationSet.contentType == ContentType.TEXT;

    if (isText) {
      kind = ManifestParserUtils.TextStreamKind.SUBTITLE;
    }

    for (const roleElement of roleElements) {
      const scheme = roleElement.getAttribute('schemeIdUri');

      if (scheme == null || scheme == 'urn:mpeg:dash:role:2011') {
        // These only apply for the given scheme, but allow them to be specified
        // if there is no scheme specified.
        // See: DASH section 5.8.5.5
        const value = roleElement.getAttribute('value');

        switch (value) {
          case 'main':
            main = true;
            break;

          case 'caption':
          case 'subtitle':
            kind = value;
            break;
        }
      }
    } // Parallel for HLS VIDEO-RANGE as defined in DASH-IF IOP v4.3 6.2.5.1.


    let videoRange;
    const videoRangeScheme = 'urn:mpeg:mpegB:cicp:TransferCharacteristics';

    const getVideoRangeFromTransferCharacteristicCICP = cicp => {
      switch (cicp) {
        case 1:
        case 6:
        case 13:
        case 14:
        case 15:
          return 'SDR';

        case 16:
          return 'PQ';

        case 18:
          return 'HLG';
      }

      return undefined;
    };

    const essentialProperties = XmlUtils.findChildren(elem, 'EssentialProperty'); // ID of real AdaptationSet if this is a trick mode set:

    let trickModeFor = null;
    let unrecognizedEssentialProperty = false;

    for (const prop of essentialProperties) {
      const schemeId = prop.getAttribute('schemeIdUri');

      if (schemeId == 'http://dashif.org/guidelines/trickmode') {
        trickModeFor = prop.getAttribute('value');
      } else if (schemeId == videoRangeScheme) {
        videoRange = getVideoRangeFromTransferCharacteristicCICP(parseInt(prop.getAttribute('value'), 10));
      } else {
        unrecognizedEssentialProperty = true;
      }
    }

    const supplementalProperties = XmlUtils.findChildren(elem, 'SupplementalProperty');

    for (const prop of supplementalProperties) {
      const schemeId = prop.getAttribute('schemeIdUri');

      if (schemeId == videoRangeScheme) {
        videoRange = getVideoRangeFromTransferCharacteristicCICP(parseInt(prop.getAttribute('value'), 10));
      }
    }

    const accessibilities = XmlUtils.findChildren(elem, 'Accessibility');
    const {
      LanguageUtils
    } = shaka.util;
    const closedCaptions = new Map();

    for (const prop of accessibilities) {
      const schemeId = prop.getAttribute('schemeIdUri');
      const value = prop.getAttribute('value');

      if (schemeId == 'urn:scte:dash:cc:cea-608:2015') {
        let channelId = 1;

        if (value != null) {
          const channelAssignments = value.split(';');

          for (const captionStr of channelAssignments) {
            let channel;
            let language; // Some closed caption descriptions have channel number and
            // language ("CC1=eng") others may only have language ("eng,spa").

            if (!captionStr.includes('=')) {
              // When the channel assignemnts are not explicitly provided and
              // there are only 2 values provided, it is highly likely that the
              // assignments are CC1 and CC3 (most commonly used CC streams).
              // Otherwise, cycle through all channels arbitrarily (CC1 - CC4)
              // in order of provided langs.
              channel = `CC${channelId}`;

              if (channelAssignments.length == 2) {
                channelId += 2;
              } else {
                channelId++;
              }

              language = captionStr;
            } else {
              const channelAndLanguage = captionStr.split('='); // The channel info can be '1' or 'CC1'.
              // If the channel info only has channel number(like '1'), add 'CC'
              // as prefix so that it can be a full channel id (like 'CC1').

              channel = channelAndLanguage[0].startsWith('CC') ? channelAndLanguage[0] : `CC${channelAndLanguage[0]}`; // 3 letters (ISO 639-2).  In b/187442669, we saw a blank string
              // (CC2=;CC3=), so default to "und" (the code for "undetermined").

              language = channelAndLanguage[1] || 'und';
            }

            closedCaptions.set(channel, LanguageUtils.normalize(language));
          }
        } else {
          // If channel and language information has not been provided, assign
          // 'CC1' as channel id and 'und' as language info.
          closedCaptions.set('CC1', 'und');
        }
      } else if (schemeId == 'urn:scte:dash:cc:cea-708:2015') {
        let serviceNumber = 1;

        if (value != null) {
          for (const captionStr of value.split(';')) {
            let service;
            let language; // Similar to CEA-608, it is possible that service # assignments
            // are not explicitly provided e.g. "eng;deu;swe" In this case,
            // we just cycle through the services for each language one by one.

            if (!captionStr.includes('=')) {
              service = `svc${serviceNumber}`;
              serviceNumber++;
              language = captionStr;
            } else {
              // Otherwise, CEA-708 caption values take the form "
              // 1=lang:eng;2=lang:deu" i.e. serviceNumber=lang:threelettercode.
              const serviceAndLanguage = captionStr.split('=');
              service = `svc${serviceAndLanguage[0]}`; // The language info can be different formats, lang:eng',
              // or 'lang:eng,war:1,er:1'. Extract the language info.

              language = serviceAndLanguage[1].split(',')[0].split(':').pop();
            }

            closedCaptions.set(service, LanguageUtils.normalize(language));
          }
        } else {
          // If service and language information has not been provided, assign
          // 'svc1' as service number and 'und' as language info.
          closedCaptions.set('svc1', 'und');
        }
      } else if (schemeId == 'urn:mpeg:dash:role:2011') {
        // See DASH IOP 3.9.2 Table 4.
        if (value != null) {
          roleValues.push(value);

          if (value == 'captions') {
            kind = ManifestParserUtils.TextStreamKind.CLOSED_CAPTION;
          }
        }
      }
    } // According to DASH spec (2014) section 5.8.4.8, "the successful processing
    // of the descriptor is essential to properly use the information in the
    // parent element".  According to DASH IOP v3.3, section 3.3.4, "if the
    // scheme or the value" for EssentialProperty is not recognized, "the DASH
    // client shall ignore the parent element."


    if (unrecognizedEssentialProperty) {
      // Stop parsing this AdaptationSet and let the caller filter out the
      // nulls.
      return null;
    }

    const contentProtectionElems = XmlUtils.findChildren(elem, 'ContentProtection');
    const contentProtection = ContentProtection.parseFromAdaptationSet(contentProtectionElems, this.config_.dash.ignoreDrmInfo, this.config_.dash.keySystemsByURI);
    const language = shaka.util.LanguageUtils.normalize(elem.getAttribute('lang') || 'und'); // This attribute is currently non-standard, but it is supported by Kaltura.

    let label = elem.getAttribute('label'); // See DASH IOP 4.3 here https://dashif.org/docs/DASH-IF-IOP-v4.3.pdf (page 35)

    const labelElements = XmlUtils.findChildren(elem, 'Label');

    if (labelElements && labelElements.length) {
      // NOTE: Right now only one label field is supported.
      const firstLabelElement = labelElements[0];

      if (firstLabelElement.textContent) {
        label = firstLabelElement.textContent;
      }
    } // Parse Representations into Streams.


    const representations = XmlUtils.findChildren(elem, 'Representation');
    const streams = representations.map(representation => {
      const parsedRepresentation = this.parseRepresentation_(context, contentProtection, kind, language, label, main, roleValues, closedCaptions, representation);

      if (parsedRepresentation) {
        parsedRepresentation.hdr = parsedRepresentation.hdr || videoRange;
      }

      return parsedRepresentation;
    }).filter(s => !!s);

    if (streams.length == 0) {
      const isImage = context.adaptationSet.contentType == ContentType.IMAGE; // Ignore empty AdaptationSets if ignoreEmptyAdaptationSet is true
      // or they are for text/image content.

      if (this.config_.dash.ignoreEmptyAdaptationSet || isText || isImage) {
        return null;
      }

      throw new shaka.util.Error(shaka.util.Error.Severity.CRITICAL, shaka.util.Error.Category.MANIFEST, shaka.util.Error.Code.DASH_EMPTY_ADAPTATION_SET);
    } // If AdaptationSet's type is unknown or is ambiguously "application",
    // guess based on the information in the first stream.  If the attributes
    // mimeType and codecs are split across levels, they will both be inherited
    // down to the stream level by this point, so the stream will have all the
    // necessary information.


    if (!context.adaptationSet.contentType || context.adaptationSet.contentType == ContentType.APPLICATION) {
      const {
        mimeType
      } = streams[0];
      const {
        codecs
      } = streams[0];
      context.adaptationSet.contentType = DashParser.guessContentType_(mimeType, codecs);

      for (const stream of streams) {
        stream.type = context.adaptationSet.contentType;
      }
    }

    for (const stream of streams) {
      // Some DRM license providers require that we have a default
      // key ID from the manifest in the wrapped license request.
      // Thus, it should be put in drmInfo to be accessible to request filters.
      for (const drmInfo of contentProtection.drmInfos) {
        drmInfo.keyIds = drmInfo.keyIds && stream.keyIds ? new Set([...drmInfo.keyIds, ...stream.keyIds]) : drmInfo.keyIds || stream.keyIds;
      }
    }

    const repIds = representations.map(node => node.getAttribute('id')).filter(Functional.isNotNull);
    return {
      id: context.adaptationSet.id || `__fake__${this.globalId_++}`,
      contentType: context.adaptationSet.contentType,
      language,
      main,
      streams,
      drmInfos: contentProtection.drmInfos,
      trickModeFor,
      representationIds: repIds
    };
  }
  /**
   * Parses a Representation XML element.
   *
   * @param {shaka.dash.DashParser.Context} context
   * @param {ContentProtection.Context} contentProtection
   * @param {(string|undefined)} kind
   * @param {string} language
   * @param {string} label
   * @param {boolean} isPrimary
   * @param {!Array.<string>} roles
   * @param {Map.<string, string>} closedCaptions
   * @param {!Element} node
   * @return {?shaka.extern.Stream} The Stream, or null when there is a
   *   non-critical parsing error.
   * @private
   */


  parseRepresentation_(context, contentProtection, kind, language, label, isPrimary, roles, closedCaptions, node) {
    const {
      ContentType
    } = ManifestParserUtils;
    context.representation = this.createFrame_(node, context.adaptationSet, null);
    this.minTotalAvailabilityTimeOffset_ = Math.min(this.minTotalAvailabilityTimeOffset_, context.representation.availabilityTimeOffset);

    if (!this.verifyRepresentation_(context.representation)) {
      shakaLog.warning('Skipping Representation', context.representation);
      return null;
    }

    const periodStart = context.periodInfo.start; // NOTE: bandwidth is a mandatory attribute according to the spec, and zero
    // does not make sense in the DASH spec's bandwidth formulas.
    // In some content, however, the attribute is missing or zero.
    // To avoid NaN at the variant level on broken content, fall back to zero.
    // https://github.com/shaka-project/shaka-player/issues/938#issuecomment-317278180

    context.bandwidth = XmlUtils.parseAttr(node, 'bandwidth', XmlUtils.parsePositiveInt) || 0;
    /** @type {?shaka.dash.DashParser.StreamInfo} */

    let streamInfo;
    const {
      contentType
    } = context.representation;
    const isText = contentType == ContentType.TEXT || contentType == ContentType.APPLICATION;
    const isImage = contentType == ContentType.IMAGE;

    try {
      const requestInitSegment = (uris, startByte, endByte) => this.requestInitSegment_(uris, startByte, endByte);

      if (context.representation.segmentBase) {
        streamInfo = SegmentBase.createStreamInfo(context, requestInitSegment);
      } else if (context.representation.segmentList) {
        streamInfo = SegmentList.createStreamInfo(context, this.streamMap_);
      } else if (context.representation.segmentTemplate) {
        const hasManifest = !!this.manifest_;
        streamInfo = SegmentTemplate.createStreamInfo(context, requestInitSegment, this.streamMap_, hasManifest, this.config_.dash.initialSegmentLimit, this.periodDurations_);
      } else {
        goog.asserts.assert(isText, 'Must have Segment* with non-text streams.');
        const {
          baseUris
        } = context.representation;
        const duration = context.periodInfo.duration || 0;
        streamInfo = {
          generateSegmentIndex: () => Promise.resolve(SegmentIndex.forSingleSegment(periodStart, duration, baseUris))
        };
      }
    } catch (error) {
      if ((isText || isImage) && error.code == shaka.util.Error.Code.DASH_NO_SEGMENT_INFO) {
        // We will ignore any DASH_NO_SEGMENT_INFO errors for text/image
        // streams.
        return null;
      } // For anything else, re-throw.


      throw error;
    }

    const contentProtectionElems = XmlUtils.findChildren(node, 'ContentProtection');
    const keyId = ContentProtection.parseFromRepresentation(contentProtectionElems, contentProtection, this.config_.dash.ignoreDrmInfo, this.config_.dash.keySystemsByURI);
    const keyIds = new Set(keyId ? [keyId] : []); // Detect the presence of E-AC3 JOC audio content, using DD+JOC signaling.
    // See: ETSI TS 103 420 V1.2.1 (2018-10)

    const supplementalPropertyElems = XmlUtils.findChildren(node, 'SupplementalProperty');
    const hasJoc = supplementalPropertyElems.some(element => {
      const expectedUri = 'tag:dolby.com,2018:dash:EC3_ExtensionType:2018';
      const expectedValue = 'JOC';
      return element.getAttribute('schemeIdUri') == expectedUri && element.getAttribute('value') == expectedValue;
    });
    let spatialAudio = false;

    if (hasJoc) {
      context.representation.mimeType = 'audio/eac3-joc';
      spatialAudio = true;
    }

    let forced = false;

    if (isText) {
      // See: https://github.com/shaka-project/shaka-player/issues/2122 and
      // https://github.com/Dash-Industry-Forum/DASH-IF-IOP/issues/165
      forced = roles.includes('forced_subtitle') || roles.includes('forced-subtitle');
    }

    let tilesLayout;

    if (isImage) {
      const essentialPropertyElems = XmlUtils.findChildren(node, 'EssentialProperty');
      const thumbnailTileElem = essentialPropertyElems.find(element => {
        const expectedUris = ['http://dashif.org/thumbnail_tile', 'http://dashif.org/guidelines/thumbnail_tile'];
        return expectedUris.includes(element.getAttribute('schemeIdUri'));
      });

      if (thumbnailTileElem) {
        tilesLayout = thumbnailTileElem.getAttribute('value');
      } // Filter image adaptation sets that has no tilesLayout.


      if (!tilesLayout) {
        return null;
      }
    }

    let hdr;
    const {
      profiles
    } = context;
    const {
      codecs
    } = context.representation;
    const hevcHDR = 'http://dashif.org/guidelines/dash-if-uhd#hevc-hdr-pq10';

    if (profiles.includes(hevcHDR) && (codecs.includes('hvc1.2.4.L153.B0') || codecs.includes('hev1.2.4.L153.B0'))) {
      hdr = 'PQ';
    }

    const contextId = context.representation.id ? `${context.period.id},${context.representation.id}` : '';
    /** @type {shaka.extern.Stream} */

    const stream = {
      id: this.globalId_++,
      originalId: context.representation.id,
      createSegmentIndex: async () => {
        // If we have a stream with the same context id stored in the map
        // that has no segmentIndex, we should set the segmentIndex for it.
        const storedInMap = contextId && context.dynamic && this.streamMap_[contextId];
        const currentStream = storedInMap ? this.streamMap_[contextId] : stream;

        if (!currentStream.segmentIndex) {
          currentStream.segmentIndex = await streamInfo.generateSegmentIndex();
        }
      },
      closeSegmentIndex: () => {
        if (stream.segmentIndex) {
          stream.segmentIndex.release();
          stream.segmentIndex = null;
        }
      },
      segmentIndex: null,
      mimeType: context.representation.mimeType,
      codecs: context.representation.codecs,
      frameRate: context.representation.frameRate,
      pixelAspectRatio: context.representation.pixelAspectRatio,
      bandwidth: context.bandwidth,
      width: context.representation.width,
      height: context.representation.height,
      kind,
      encrypted: contentProtection.drmInfos.length > 0,
      drmInfos: contentProtection.drmInfos,
      keyIds,
      language,
      label,
      type: context.adaptationSet.contentType,
      primary: isPrimary,
      trickModeVideo: null,
      emsgSchemeIdUris: context.representation.emsgSchemeIdUris,
      roles,
      forced,
      channelsCount: context.representation.numChannels,
      audioSamplingRate: context.representation.audioSamplingRate,
      spatialAudio,
      closedCaptions,
      hdr,
      tilesLayout,
      matchedStreams: []
    };

    if (contextId && context.dynamic && !this.streamMap_[contextId]) {
      this.streamMap_[contextId] = stream;
    }

    return stream;
  }
  /**
   * Called when the update timer ticks.
   *
   * @return {!Promise}
   * @private
   */


  async onUpdate_() {
    goog.asserts.assert(this.updatePeriod_ >= 0, 'There should be an update period');
    shakaLog.info('Updating manifest...'); // Default the update delay to 0 seconds so that if there is an error we can
    // try again right away.

    let updateDelay = 0;

    try {
      updateDelay = await this.requestManifest_();
    } catch (error) {
      goog.asserts.assert(error instanceof shaka.util.Error, 'Should only receive a Shaka error'); // Try updating again, but ensure we haven't been destroyed.

      if (this.playerInterface_) {
        // We will retry updating, so override the severity of the error.
        error.severity = shaka.util.Error.Severity.RECOVERABLE;
        this.playerInterface_.onError(error);
      }
    } // Detect a call to stop()


    if (!this.playerInterface_) {
      return;
    }

    this.setUpdateTimer_(updateDelay);
  }
  /**
   * Sets the update timer.  Does nothing if the manifest does not specify an
   * update period.
   *
   * @param {number} offset An offset, in seconds, to apply to the manifest's
   *   update period.
   * @private
   */


  setUpdateTimer_(offset) {
    // NOTE: An updatePeriod_ of -1 means the attribute was missing.
    // An attribute which is present and set to 0 should still result in
    // periodic updates.  For more, see:
    // https://github.com/shaka-project/shaka-player/issues/331
    if (this.updatePeriod_ < 0) {
      return;
    }

    const finalDelay = Math.max(DashParser.MIN_UPDATE_PERIOD_, this.updatePeriod_ - offset, this.averageUpdateDuration_.getEstimate()); // We do not run the timer as repeating because part of update is async and
    // we need schedule the update after it finished.

    this.updateTimer_.tickAfter(
    /* seconds= */
    finalDelay);
  }
  /**
   * Creates a new inheritance frame for the given element.
   *
   * @param {!Element} elem
   * @param {?shaka.dash.DashParser.InheritanceFrame} parent
   * @param {Array.<string>} baseUris
   * @return {shaka.dash.DashParser.InheritanceFrame}
   * @private
   */


  createFrame_(elem, parent, baseUris) {
    goog.asserts.assert(parent || baseUris, 'Must provide either parent or baseUris');
    parent = parent ||
    /** @type {shaka.dash.DashParser.InheritanceFrame} */
    {
      contentType: '',
      mimeType: '',
      codecs: '',
      emsgSchemeIdUris: [],
      frameRate: undefined,
      pixelAspectRatio: undefined,
      numChannels: null,
      audioSamplingRate: null,
      availabilityTimeOffset: 0
    };
    baseUris = baseUris || parent.baseUris;
    const parseNumber = XmlUtils.parseNonNegativeInt;
    const {
      evalDivision
    } = XmlUtils;
    const uriObjs = XmlUtils.findChildren(elem, 'BaseURL');
    const uris = uriObjs.map(XmlUtils.getContents);
    let contentType = elem.getAttribute('contentType') || parent.contentType;
    const mimeType = elem.getAttribute('mimeType') || parent.mimeType;
    const codecs = elem.getAttribute('codecs') || parent.codecs;
    const frameRate = XmlUtils.parseAttr(elem, 'frameRate', evalDivision) || parent.frameRate;
    const pixelAspectRatio = elem.getAttribute('sar') || parent.pixelAspectRatio;
    const emsgSchemeIdUris = this.emsgSchemeIdUris_(XmlUtils.findChildren(elem, 'InbandEventStream'), parent.emsgSchemeIdUris);
    const audioChannelConfigs = XmlUtils.findChildren(elem, 'AudioChannelConfiguration');
    const numChannels = this.parseAudioChannels_(audioChannelConfigs) || parent.numChannels;
    const audioSamplingRate = XmlUtils.parseAttr(elem, 'audioSamplingRate', parseNumber) || parent.audioSamplingRate;

    if (!contentType) {
      contentType = DashParser.guessContentType_(mimeType, codecs);
    }

    const segmentBase = XmlUtils.findChild(elem, 'SegmentBase');
    const segmentTemplate = XmlUtils.findChild(elem, 'SegmentTemplate'); // The availabilityTimeOffset is the sum of all @availabilityTimeOffset
    // values that apply to the adaptation set, via BaseURL, SegmentBase,
    // or SegmentTemplate elements.

    const segmentBaseAto = segmentBase ? XmlUtils.parseAttr(segmentBase, 'availabilityTimeOffset', XmlUtils.parseFloat) || 0 : 0;
    const segmentTemplateAto = segmentTemplate ? XmlUtils.parseAttr(segmentTemplate, 'availabilityTimeOffset', XmlUtils.parseFloat) || 0 : 0;
    const baseUriAto = uriObjs && uriObjs.length ? XmlUtils.parseAttr(uriObjs[0], 'availabilityTimeOffset', XmlUtils.parseFloat) || 0 : 0;
    const availabilityTimeOffset = parent.availabilityTimeOffset + baseUriAto + segmentBaseAto + segmentTemplateAto;
    return {
      baseUris: ManifestParserUtils.resolveUris(baseUris, uris),
      segmentBase: segmentBase || parent.segmentBase,
      segmentList: XmlUtils.findChild(elem, 'SegmentList') || parent.segmentList,
      segmentTemplate: segmentTemplate || parent.segmentTemplate,
      width: XmlUtils.parseAttr(elem, 'width', parseNumber) || parent.width,
      height: XmlUtils.parseAttr(elem, 'height', parseNumber) || parent.height,
      contentType,
      mimeType,
      codecs,
      frameRate,
      pixelAspectRatio,
      emsgSchemeIdUris,
      id: elem.getAttribute('id'),
      numChannels,
      audioSamplingRate,
      availabilityTimeOffset
    };
  }
  /**
   * Returns a new array of InbandEventStream schemeIdUri containing the union
   * of the ones parsed from inBandEventStreams and the ones provided in
   * emsgSchemeIdUris.
   *
   * @param {!Array.<!Element>} inBandEventStreams Array of InbandEventStream
   *     elements to parse and add to the returned array.
   * @param {!Array.<string>} emsgSchemeIdUris Array of parsed
   *     InbandEventStream schemeIdUri attributes to add to the returned array.
   * @return {!Array.<string>} schemeIdUris Array of parsed
   *     InbandEventStream schemeIdUri attributes.
   * @private
   */


  emsgSchemeIdUris_(inBandEventStreams, emsgSchemeIdUris) {
    const schemeIdUris = emsgSchemeIdUris.slice();

    for (const event of inBandEventStreams) {
      const schemeIdUri = event.getAttribute('schemeIdUri');

      if (!schemeIdUris.includes(schemeIdUri)) {
        schemeIdUris.push(schemeIdUri);
      }
    }

    return schemeIdUris;
  }
  /**
   * @param {!Array.<!Element>} audioChannelConfigs An array of
   *   AudioChannelConfiguration elements.
   * @return {?number} The number of audio channels, or null if unknown.
   * @private
   */


  parseAudioChannels_(audioChannelConfigs) {
    for (const elem of audioChannelConfigs) {
      const scheme = elem.getAttribute('schemeIdUri');

      if (!scheme) {
        continue;
      }

      const value = elem.getAttribute('value');

      if (!value) {
        continue;
      }

      switch (scheme) {
        case 'urn:mpeg:dash:outputChannelPositionList:2012':
          // A space-separated list of speaker positions, so the number of
          // channels is the length of this list.
          return value.trim().split(/ +/).length;

        case 'urn:mpeg:dash:23003:3:audio_channel_configuration:2011':
        case 'urn:dts:dash:audio_channel_configuration:2012':
          {
            // As far as we can tell, this is a number of channels.
            const intValue = parseInt(value, 10);

            if (!intValue) {
              // 0 or NaN
              shakaLog.warning('Channel parsing failure! Ignoring scheme and value', scheme, value);
              continue;
            }

            return intValue;
          }

        case 'tag:dolby.com,2014:dash:audio_channel_configuration:2011':
        case 'urn:dolby:dash:audio_channel_configuration:2011':
          {
            // A hex-encoded 16-bit integer, in which each bit represents a
            // channel.
            let hexValue = parseInt(value, 16);

            if (!hexValue) {
              // 0 or NaN
              shakaLog.warning('Channel parsing failure! Ignoring scheme and value', scheme, value);
              continue;
            } // Count the 1-bits in hexValue.


            let numBits = 0;

            while (hexValue) {
              if (hexValue & 1) {
                ++numBits;
              }

              hexValue >>= 1;
            }

            return numBits;
          }
        // Defined by https://dashif.org/identifiers/audio_source_metadata/ and clause 8.2, in ISO/IEC 23001-8.

        case 'urn:mpeg:mpegB:cicp:ChannelConfiguration':
          {
            const noValue = 0;
            const channelCountMapping = [noValue, 1, 2, 3, 4, 5, 6, 8, 2, 3
            /* 0--9 */
            , 4, 7, 8, 24, 8, 12, 10, 12, 14, 12
            /* 10--19 */
            , 14
            /* 20 */
            ];
            const intValue = parseInt(value, 10);

            if (!intValue) {
              // 0 or NaN
              shakaLog.warning('Channel parsing failure! Ignoring scheme and value', scheme, value);
              continue;
            }

            if (intValue > noValue && intValue < channelCountMapping.length) {
              return channelCountMapping[intValue];
            }

            continue;
          }

        default:
          shakaLog.warning('Unrecognized audio channel scheme:', scheme, value);
          continue;
      }
    }

    return null;
  }
  /**
   * Verifies that a Representation has exactly one Segment* element.  Prints
   * warnings if there is a problem.
   *
   * @param {shaka.dash.DashParser.InheritanceFrame} frame
   * @return {boolean} True if the Representation is usable; otherwise return
   *   false.
   * @private
   */


  verifyRepresentation_(frame) {
    const {
      ContentType
    } = ManifestParserUtils;
    let n = 0;
    n += frame.segmentBase ? 1 : 0;
    n += frame.segmentList ? 1 : 0;
    n += frame.segmentTemplate ? 1 : 0;

    if (n == 0) {
      // TODO: Extend with the list of MIME types registered to TextEngine.
      if (frame.contentType == ContentType.TEXT || frame.contentType == ContentType.APPLICATION) {
        return true;
      }

      shakaLog.warning('Representation does not contain a segment information source:', 'the Representation must contain one of SegmentBase, SegmentList,', 'SegmentTemplate, or explicitly indicate that it is "text".', frame);
      return false;
    }

    if (n != 1) {
      shakaLog.warning('Representation contains multiple segment information sources:', 'the Representation should only contain one of SegmentBase,', 'SegmentList, or SegmentTemplate.', frame);

      if (frame.segmentBase) {
        shakaLog.info('Using SegmentBase by default.');
        frame.segmentList = null;
        frame.segmentTemplate = null;
      } else {
        goog.asserts.assert(frame.segmentList, 'There should be a SegmentList');
        shakaLog.info('Using SegmentList by default.');
        frame.segmentTemplate = null;
      }
    }

    return true;
  }
  /**
   * Makes a request to the given URI and calculates the clock offset.
   *
   * @param {!Array.<string>} baseUris
   * @param {string} uri
   * @param {string} method
   * @return {!Promise.<number>}
   * @private
   */


  async requestForTiming_(baseUris, uri, method) {
    const requestUris = ManifestParserUtils.resolveUris(baseUris, [uri]);
    const request = shaka.net.NetworkingEngine.makeRequest(requestUris, this.config_.retryParameters);
    request.method = method;
    const type = shaka.net.NetworkingEngine.RequestType.TIMING;
    const operation = this.playerInterface_.networkingEngine.request(type, request);
    this.operationManager_.manage(operation);
    const response = await operation.promise;
    let text;

    if (method == 'HEAD') {
      if (!response.headers || !response.headers.date) {
        shakaLog.warning('UTC timing response is missing', 'expected date header');
        return 0;
      }

      text = response.headers.date;
    } else {
      text = shaka.util.StringUtils.fromUTF8(response.data);
    }

    const date = Date.parse(text);

    if (Number.isNaN(date)) {
      shakaLog.warning('Unable to parse date from UTC timing response');
      return 0;
    }

    return date - Date.now();
  }
  /**
   * Parses an array of UTCTiming elements.
   *
   * @param {!Array.<string>} baseUris
   * @param {!Array.<!Element>} elems
   * @return {!Promise.<number>}
   * @private
   */


  async parseUtcTiming_(baseUris, elems) {
    const schemesAndValues = elems.map(elem => ({
      scheme: elem.getAttribute('schemeIdUri'),
      value: elem.getAttribute('value')
    })); // If there's nothing specified in the manifest, but we have a default from
    // the config, use that.

    const {
      clockSyncUri
    } = this.config_.dash;

    if (!schemesAndValues.length && clockSyncUri) {
      schemesAndValues.push({
        scheme: 'urn:mpeg:dash:utc:http-head:2014',
        value: clockSyncUri
      });
    }

    for (const sv of schemesAndValues) {
      try {
        const {
          scheme
        } = sv;
        const {
          value
        } = sv;

        switch (scheme) {
          // See DASH IOP Guidelines Section 4.7
          // https://bit.ly/DashIop3-2
          // Some old ISO23009-1 drafts used 2012.
          case 'urn:mpeg:dash:utc:http-head:2014':
          case 'urn:mpeg:dash:utc:http-head:2012':
            // eslint-disable-next-line no-await-in-loop
            return await this.requestForTiming_(baseUris, value, 'HEAD');

          case 'urn:mpeg:dash:utc:http-xsdate:2014':
          case 'urn:mpeg:dash:utc:http-iso:2014':
          case 'urn:mpeg:dash:utc:http-xsdate:2012':
          case 'urn:mpeg:dash:utc:http-iso:2012':
            // eslint-disable-next-line no-await-in-loop
            return await this.requestForTiming_(baseUris, value, 'GET');

          case 'urn:mpeg:dash:utc:direct:2014':
          case 'urn:mpeg:dash:utc:direct:2012':
            {
              const date = Date.parse(value);
              return Number.isNaN(date) ? 0 : date - Date.now();
            }

          case 'urn:mpeg:dash:utc:http-ntp:2014':
          case 'urn:mpeg:dash:utc:ntp:2014':
          case 'urn:mpeg:dash:utc:sntp:2014':
            shakaLog.alwaysWarn('NTP UTCTiming scheme is not supported');
            break;

          default:
            shakaLog.alwaysWarn('Unrecognized scheme in UTCTiming element', scheme);
            break;
        }
      } catch (e) {
        shakaLog.warning('Error fetching time from UTCTiming elem', e.message);
      }
    }

    shakaLog.alwaysWarn('A UTCTiming element should always be given in live manifests! ' + 'This content may not play on clients with bad clocks!');
    return 0;
  }
  /**
   * Parses an EventStream element.
   *
   * @param {number} periodStart
   * @param {?number} periodDuration
   * @param {!Element} elem
   * @param {number} availabilityStart
   * @private
   */


  parseEventStream_(periodStart, periodDuration, elem, availabilityStart) {
    const parseNumber = XmlUtils.parseNonNegativeInt;
    const schemeIdUri = elem.getAttribute('schemeIdUri') || '';
    const value = elem.getAttribute('value') || '';
    const timescale = XmlUtils.parseAttr(elem, 'timescale', parseNumber) || 1;

    for (const eventNode of XmlUtils.findChildren(elem, 'Event')) {
      const presentationTime = XmlUtils.parseAttr(eventNode, 'presentationTime', parseNumber) || 0;
      const duration = XmlUtils.parseAttr(eventNode, 'duration', parseNumber) || 0;
      let startTime = presentationTime / timescale + periodStart;
      let endTime = startTime + duration / timescale;

      if (periodDuration != null) {
        // An event should not go past the Period, even if the manifest says so.
        // See: Dash sec. 5.10.2.1
        startTime = Math.min(startTime, periodStart + periodDuration);
        endTime = Math.min(endTime, periodStart + periodDuration);
      } // Don't add unavailable regions to the timeline.


      if (endTime < availabilityStart) {
        continue;
      }
      /** @type {shaka.extern.TimelineRegionInfo} */


      const region = {
        schemeIdUri,
        value,
        startTime,
        endTime,
        id: eventNode.getAttribute('id') || '',
        eventElement: eventNode
      };
      this.playerInterface_.onTimelineRegionAdded(region);
    }
  }
  /**
   * Makes a network request on behalf of SegmentBase.createStreamInfo.
   *
   * @param {!Array.<string>} uris
   * @param {?number} startByte
   * @param {?number} endByte
   * @return {!Promise.<BufferSource>}
   * @private
   */


  async requestInitSegment_(uris, startByte, endByte) {
    const requestType = shaka.net.NetworkingEngine.RequestType.SEGMENT;
    const request = shaka.util.Networking.createSegmentRequest(uris, startByte, endByte, this.config_.retryParameters);
    const {
      networkingEngine
    } = this.playerInterface_;
    const operation = networkingEngine.request(requestType, request);
    this.operationManager_.manage(operation);
    const response = await operation.promise;
    return response.data;
  }
  /**
   * Guess the content type based on MIME type and codecs.
   *
   * @param {string} mimeType
   * @param {string} codecs
   * @return {string}
   * @private
   */


  static guessContentType_(mimeType, codecs) {
    MimeUtils.getFullType(mimeType, codecs);
    // types well.


    return mimeType.split('/')[0];
  }

}
/**
 * Contains the minimum amount of time, in seconds, between manifest update
 * requests.
 *
 * @private
 * @const {number}
 */


DashParser.MIN_UPDATE_PERIOD_ = 3;
/**
 * @typedef {
 *   function(!Array.<string>, ?number, ?number):!Promise.<BufferSource>
 * }
 */

DashParser.RequestInitSegmentCallback;
/**
 * @typedef {{
 *   segmentBase: Element,
 *   segmentList: Element,
 *   segmentTemplate: Element,
 *   baseUris: !Array.<string>,
 *   width: (number|undefined),
 *   height: (number|undefined),
 *   contentType: string,
 *   mimeType: string,
 *   codecs: string,
 *   frameRate: (number|undefined),
 *   pixelAspectRatio: (string|undefined),
 *   emsgSchemeIdUris: !Array.<string>,
 *   id: ?string,
 *   numChannels: ?number,
 *   audioSamplingRate: ?number,
 *   availabilityTimeOffset: number
 * }}
 *
 * @description
 * A collection of elements and properties which are inherited across levels
 * of a DASH manifest.
 *
 * @property {Element} segmentBase
 *   The XML node for SegmentBase.
 * @property {Element} segmentList
 *   The XML node for SegmentList.
 * @property {Element} segmentTemplate
 *   The XML node for SegmentTemplate.
 * @property {!Array.<string>} baseUris
 *   An array of absolute base URIs for the frame.
 * @property {(number|undefined)} width
 *   The inherited width value.
 * @property {(number|undefined)} height
 *   The inherited height value.
 * @property {string} contentType
 *   The inherited media type.
 * @property {string} mimeType
 *   The inherited MIME type value.
 * @property {string} codecs
 *   The inherited codecs value.
 * @property {(number|undefined)} frameRate
 *   The inherited framerate value.
 * @property {(string|undefined)} pixelAspectRatio
 *   The inherited pixel aspect ratio value.
 * @property {!Array.<string>} emsgSchemeIdUris
 *   emsg registered schemeIdUris.
 * @property {?string} id
 *   The ID of the element.
 * @property {?number} numChannels
 *   The number of audio channels, or null if unknown.
 * @property {?number} audioSamplingRate
 *   Specifies the maximum sampling rate of the content, or null if unknown.
 * @property {number} availabilityTimeOffset
 *   Specifies the total availabilityTimeOffset of the segment, or 0 if unknown.
 */

DashParser.InheritanceFrame;
/**
 * @typedef {{
 *   dynamic: boolean,
 *   presentationTimeline: !shaka.media.PresentationTimeline,
 *   period: ?shaka.dash.DashParser.InheritanceFrame,
 *   periodInfo: ?shaka.dash.DashParser.PeriodInfo,
 *   adaptationSet: ?shaka.dash.DashParser.InheritanceFrame,
 *   representation: ?shaka.dash.DashParser.InheritanceFrame,
 *   bandwidth: number,
 *   indexRangeWarningGiven: boolean,
 *   availabilityTimeOffset: number,
 *   profiles: !Array.<string>
 * }}
 *
 * @description
 * Contains context data for the streams.  This is designed to be
 * shallow-copyable, so the parser must overwrite (not modify) each key as the
 * parser moves through the manifest and the parsing context changes.
 *
 * @property {boolean} dynamic
 *   True if the MPD is dynamic (not all segments available at once)
 * @property {!shaka.media.PresentationTimeline} presentationTimeline
 *   The PresentationTimeline.
 * @property {?shaka.dash.DashParser.InheritanceFrame} period
 *   The inheritance from the Period element.
 * @property {?shaka.dash.DashParser.PeriodInfo} periodInfo
 *   The Period info for the current Period.
 * @property {?shaka.dash.DashParser.InheritanceFrame} adaptationSet
 *   The inheritance from the AdaptationSet element.
 * @property {?shaka.dash.DashParser.InheritanceFrame} representation
 *   The inheritance from the Representation element.
 * @property {number} bandwidth
 *   The bandwidth of the Representation, or zero if missing.
 * @property {boolean} indexRangeWarningGiven
 *   True if the warning about SegmentURL@indexRange has been printed.
 * @property {number} availabilityTimeOffset
 *   The sum of the availabilityTimeOffset values that apply to the element.
 * @property {!Array.<string>} profiles
 *   Profiles of DASH are defined to enable interoperability and the signaling
 *   of the use of features.
 */

DashParser.Context;
/**
 * @typedef {{
 *   start: number,
 *   duration: ?number,
 *   node: !Element,
 *   isLastPeriod: boolean
 * }}
 *
 * @description
 * Contains information about a Period element.
 *
 * @property {number} start
 *   The start time of the period.
 * @property {?number} duration
 *   The duration of the period; or null if the duration is not given.  This
 *   will be non-null for all periods except the last.
 * @property {!Element} node
 *   The XML Node for the Period.
 * @property {boolean} isLastPeriod
 *   Whether this Period is the last one in the manifest.
 */

DashParser.PeriodInfo;
/**
 * @typedef {{
 *   id: string,
 *   contentType: ?string,
 *   language: string,
 *   main: boolean,
 *   streams: !Array.<shaka.extern.Stream>,
 *   drmInfos: !Array.<shaka.extern.DrmInfo>,
 *   trickModeFor: ?string,
 *   representationIds: !Array.<string>
 * }}
 *
 * @description
 * Contains information about an AdaptationSet element.
 *
 * @property {string} id
 *   The unique ID of the adaptation set.
 * @property {?string} contentType
 *   The content type of the AdaptationSet.
 * @property {string} language
 *   The language of the AdaptationSet.
 * @property {boolean} main
 *   Whether the AdaptationSet has the 'main' type.
 * @property {!Array.<shaka.extern.Stream>} streams
 *   The streams this AdaptationSet contains.
 * @property {!Array.<shaka.extern.DrmInfo>} drmInfos
 *   The DRM info for the AdaptationSet.
 * @property {?string} trickModeFor
 *   If non-null, this AdaptationInfo represents trick mode tracks.  This
 *   property is the ID of the normal AdaptationSet these tracks should be
 *   associated with.
 * @property {!Array.<string>} representationIds
 *   An array of the IDs of the Representations this AdaptationSet contains.
 */

DashParser.AdaptationInfo;
/**
 * @typedef {function():!Promise.<shaka.media.SegmentIndex>}
 * @description
 * An async function which generates and returns a SegmentIndex.
 */

DashParser.GenerateSegmentIndexFunction;
/**
 * @typedef {{
 *   generateSegmentIndex: shaka.dash.DashParser.GenerateSegmentIndexFunction
 * }}
 *
 * @description
 * Contains information about a Stream. This is passed from the createStreamInfo
 * methods.
 *
 * @property {shaka.dash.DashParser.GenerateSegmentIndexFunction}
 *     generateSegmentIndex
 *   An async function to create the SegmentIndex for the stream.
 */

DashParser.StreamInfo;

DashParser.register = shakaNamespace => {
  shaka = shakaNamespace;
  console.log(shakaNamespace);
  MetaSegmentIndex = class extends shaka.media.SegmentIndex {
    /** */
    constructor() {
      super([]);
      /** @private {!Array.<!shaka.media.SegmentIndex>} */

      this.indexes_ = [];
    }
    /**
     * Append a SegmentIndex to this MetaSegmentIndex.  This effectively stitches
     * the underlying Stream onto the end of the multi-Period Stream represented
     * by this MetaSegmentIndex.
     *
     * @param {!shaka.media.SegmentIndex} segmentIndex
     */


    appendSegmentIndex(segmentIndex) {
      goog.asserts.assert(this.indexes_.length == 0 || segmentIndex.numEvicted == 0, 'Should not append a new segment index with already-evicted segments');
      this.indexes_.push(segmentIndex);
    }
    /**
     * Create a clone of this MetaSegmentIndex containing all the same indexes.
     *
     * @return {!shaka.media.MetaSegmentIndex}
     */


    clone() {
      const clone = new MetaSegmentIndex(); // Be careful to clone the Array.  We don't want to share the reference with
      // our clone and affect each other accidentally.

      clone.indexes_ = this.indexes_.slice();
      return clone;
    }
    /**
     * @override
     * @export
     */


    release() {
      for (const index of this.indexes_) {
        index.release();
      }

      this.indexes_ = [];
    }
    /**
     * @override
     * @export
     */


    find(time) {
      let numPassedInEarlierIndexes = 0;

      for (const index of this.indexes_) {
        const position = index.find(time);

        if (position != null) {
          return position + numPassedInEarlierIndexes;
        }

        numPassedInEarlierIndexes += index.numEvicted + index.references.length;
      }

      return null;
    }
    /**
     * @override
     * @export
     */


    get(position) {
      let numPassedInEarlierIndexes = 0;
      let sawSegments = false;

      for (const index of this.indexes_) {
        goog.asserts.assert(!sawSegments || index.numEvicted == 0, 'Should not see evicted segments after available segments');
        const reference = index.get(position - numPassedInEarlierIndexes);

        if (reference) {
          return reference;
        }

        const references = index.references || Object.values(index).find(it => it.push);
        numPassedInEarlierIndexes += index.numEvicted + references.length;
        sawSegments = sawSegments || references.length != 0;
      }

      return null;
    }
    /**
     * @override
     * @export
     */


    offset() {
      // offset() is only used by HLS, and MetaSegmentIndex is only used for DASH.
      goog.asserts.assert(false, 'offset() should not be used in MetaSegmentIndex!');
    }
    /**
     * @override
     * @export
     */


    merge() {
      // merge() is only used internally by the DASH and HLS parser on
      // SegmentIndexes, but never on MetaSegmentIndex.
      goog.asserts.assert(false, 'merge() should not be used in MetaSegmentIndex!');
    }
    /**
     * @override
     * @export
     */


    evict() {
      // evict() is only used internally by the DASH and HLS parser on
      // SegmentIndexes, but never on MetaSegmentIndex.
      goog.asserts.assert(false, 'evict() should not be used in MetaSegmentIndex!');
    }
    /**
     * @override
     * @export
     */


    mergeAndEvict() {
      // mergeAndEvict() is only used internally by the DASH and HLS parser on
      // SegmentIndexes, but never on MetaSegmentIndex.
      goog.asserts.assert(false, 'mergeAndEvict() should not be used in MetaSegmentIndex!');
    }
    /**
     * @override
     * @export
     */


    fit() {
      // fit() is only used internally by manifest parsers on SegmentIndexes, but
      // never on MetaSegmentIndex.
      goog.asserts.assert(false, 'fit() should not be used in MetaSegmentIndex!');
    }
    /**
     * @override
     * @export
     */


    updateEvery() {
      // updateEvery() is only used internally by the DASH parser on
      // SegmentIndexes, but never on MetaSegmentIndex.
      goog.asserts.assert(false, 'updateEvery() should not be used in MetaSegmentIndex!');
    }

  };
  shaka.media.ManifestParser.registerParserByExtension('mpd', () => new DashParser());
  shaka.media.ManifestParser.registerParserByMime('application/dash+xml', () => new DashParser());
  shaka.media.ManifestParser.registerParserByMime('video/vnd.mpeg.dash.mpd', () => new DashParser());
};

/* eslint-disable no-param-reassign */

const getBufferedAhead = (mediaSource, video) => {
  const items = mediaSource ? Array.from(mediaSource.sourceBuffers, item => item.buffered) : video.buffered;

  if (items.length < 1) {
    return 0;
  }

  return Math.min(...items.map(buffered => Math.max(video.currentTime, ...Array.from({
    length: (buffered === null || buffered === void 0 ? void 0 : buffered.length) || 0
  }, (_, i) => buffered.end(i))))) - video.currentTime;
};

const UPDATE_SPEEDUP_INTERVAL = 100;

const latencyManager = (player, video) => {
  // Custom DashParser offset availabilityStartTime by this to start segment download earlier
  window.segmentTimestampOffset = 0.5;
  DashParser.register(player.shaka);
  let updateIntervalId;
  const currentOptions = {
    speedup: 7,
    speedupThreshold: 1.5
  };
  let lastPlaybackTime = 0;
  const bufferAverage = ewma(1500 / UPDATE_SPEEDUP_INTERVAL);

  const getInfo = () => {
    var _player$getPresentati;

    return { ...currentOptions,
      systemTime: Date.now(),
      playbackTime: video.currentTime + ((player === null || player === void 0 ? void 0 : (_player$getPresentati = player.getPresentationStartTimeAsDate()) === null || _player$getPresentati === void 0 ? void 0 : _player$getPresentati.getTime()) || 0),
      playbackRate: video.playbackRate,
      bufferedAhead: getBufferedAhead(player.mediaSource, video),
      downloadSpeed: bufferAverage.getEstimate()
    };
  };

  const stop = () => {
    clearInterval(updateIntervalId);
  };

  const run = () => {
    stop();
    player.configure({
      manifest: {
        dash: {
          ignoreSuggestedPresentationDelay: true
        }
      },
      streaming: {
        lowLatencyMode: true,
        bufferingGoal: 10.0,
        rebufferingGoal: 0.01,
        updateIntervalSeconds: 0.2,
        gapDetectionThreshold: 0.001,
        inaccurateManifestTolerance: 1,
        retryParameters: {
          baseDelay: 50,
          backoffFactor: 1.2,
          fuzzFactor: 0,
          maxAttempts: 13
        }
      }
    });
    updateIntervalId = setInterval(() => {
      var _currentOptions$onUpd, _currentOptions$onUpd2;

      const info = getInfo();

      if (info.bufferedAhead >= 0) {
        bufferAverage.sample(1, info.bufferedAhead);
      }

      (_currentOptions$onUpd = currentOptions.onUpdate) === null || _currentOptions$onUpd === void 0 ? void 0 : _currentOptions$onUpd.call(currentOptions, info);

      if (!player || !video || video.currentTime < lastPlaybackTime + 0.08) {
        return;
      }

      (_currentOptions$onUpd2 = currentOptions.onUpdate) === null || _currentOptions$onUpd2 === void 0 ? void 0 : _currentOptions$onUpd2.call(currentOptions, info);
      lastPlaybackTime = video.currentTime;
      const bufferCap = +currentOptions.speedupThreshold * (info.playbackRate > 1 ? 1 : 1.2);

      if (video.currentTime < lastPlaybackTime - 7) {
        console.info(`seek from ${video.currentTime} to ${lastPlaybackTime}`);
        video.playbackRate = 1;
        video.currentTime = lastPlaybackTime;
        return;
      }

      lastPlaybackTime = video.currentTime;
      const bufferedAhead = getBufferedAhead(player.mediaSource, video);

      if (bufferedAhead > 5) {
        console.info(`Buffer abundant, seek from ${video.currentTime} to ${video.currentTime + bufferedAhead - 2.5}`);
        video.currentTime = video.currentTime + bufferedAhead - 2.5;
        return;
      }

      const rate = bufferAverage.getEstimate() > bufferCap && currentOptions.speedup ? +currentOptions.speedup : 0;

      if ((video === null || video === void 0 ? void 0 : video.currentTime) > 0) {
        video.playbackRate = 1 + rate / 100;
      }
    }, UPDATE_SPEEDUP_INTERVAL);
  };

  const configure = config => {
    if (!config) {
      return getInfo();
    }

    if ('enabled' in config) {
      const toggle = Boolean(config.enabled) !== currentOptions.enabled;
      toggle && config.enabled && run();
      toggle && !config.enabled && stop();
      currentOptions.enabled = Boolean(config.enabled);
    }

    Object.assign(currentOptions, config);
    if ('segmentTimestampOffset' in config) window.segmentTimestampOffset = config.segmentTimestampOffset;
  };

  return {
    configure
  };
};

export { addSentry, createApi, ensureTabLock, getContentInfo, getStreamInfo, handleIOSHeadphonesDisconnection, latencyManager, logEventNames$1 as logEventNames, mapLogEvents$1 as mapLogEvents, playlogv2, selectHlsQualities, startPlaybackSession as startSession, validateEnvironment };
