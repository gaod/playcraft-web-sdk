import mitt from 'mitt';

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

/* eslint-disable no-bitwise */
const uuidv4 = () => {
  const crypto = window.crypto || window.msCrypto;
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
};

const modes = {
  videos: 'video',
  lives: 'live'
};

const mapLogEvents = ({
  session,
  video,
  version,
  playerName,
  getPlaybackStatus = () => video
}) => {
  const emitter = mitt();
  const state = {
    status: 'init',
    seeking: false,
    playerStartTime: Date.now(),
    moduleStartTime: Date.now(),
    content: session.getContent()
  };

  const commonPropties = () => ({
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
      section_id: state.content.section_id,
      name_2: state.content.channelName
    }),
    SSAI: state.ssaiProvider || 'None'
  });

  const dispatchStart = () => {
    if (state.status === 'started') {
      return;
    }

    state.status = 'started';
    state.lastStartTime = Date.now();
    const eventName = state.isPlayingAd ? 'adPlaybackStarted' : 'playbackStarted';
    emitter.emit(eventName, commonPropties());
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
    emitter.emit(eventName, { ...commonPropties(),
      ...(state.isPlayingAd && {
        ad_played_duration: played
      })
    });
  };

  const registered = [on(session, 'error', error => {
    emitter.emit('playbackError', {
      module_error_code: error.code || error.data.code,
      ...commonPropties()
    });
  }), once(session, 'playerStarted', () => {
    state.playerStartTime = Date.now();
  }), once(session, 'playbackBegan', event => {
    var _event$data;

    state.sessionId = uuidv4();
    state.playedDuration = 0;
    state.content = session.getContent();
    state.ssaiProvider = (_event$data = event.data) === null || _event$data === void 0 ? void 0 : _event$data.ssaiProvider;
    state.adPlayedDuration = 0;
  }), on(video, 'durationchange', () => {
    // duration may change when playing an ad stitched stream, take only initial value
    if (!state.duration) {
      state.duration = getPlaybackStatus().duration;
    }
  }), once(video, 'canplay', () => {
    state.status = 'began';
    emitter.emit('playbackBegan', {
      player_startup_time: (state.playerStartTime - state.moduleStartTime) / 1000,
      video_startup_time: (Date.now() - state.moduleStartTime) / 1000,
      ...commonPropties()
    });
  }), on(video, 'playing', dispatchStart), on(video, 'waiting', () => {
    if (!state.bufferingStartTime) {
      emitter.emit('bufferingStarted', commonPropties());
      state.bufferingStartTime = Date.now();
    }
  }), on(video, 'timeupdate', () => {
    state.currentTime = getPlaybackStatus().currentTime;

    if (state.bufferingStartTime) {
      emitter.emit('bufferingEnded', {
        buffering_second: (Date.now() - state.bufferingStartTime) / 1000,
        ...commonPropties()
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
        ...commonPropties()
      });
    }

    state.seeking = false;
  }), on(session, 'sectionChange', () => {
    dispatchStop();
    state.content = session.getContent();
    dispatchStart();
  }), once(session, 'playbackEnded', () => {
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
      ...commonPropties()
    });
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
    reset: () => registered.forEach(off => off())
  };
};

export { mapLogEvents };
