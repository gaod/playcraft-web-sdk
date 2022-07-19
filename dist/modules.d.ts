type Playlogv2 = Readonly<{
  __proto__: any
  mapLogEvents: ({
    video,
    version,
    playerName,
    userId,
    getPlaybackStatus,
  }: {
    video: any
    version: any
    playerName: any
    userId?: string
    getPlaybackStatus?: () => any
  }) => {
    addEventListener: (name: any, handler: any) => void
    all: (handler: any) => void
    emit: (
      name: any,
      {
        currentTime,
      }: {
        currentTime: any
      },
      properties: any
    ) => void
    updateContent: (content: any) => void
    reset: () => void
  }
  logEventNames: {
    playbackBeganLoading: string
    playbackBeganPlayerStartupTime: string
    playbackBeganVideoStartupTime: string
    playbackVideoStarted: string
    playbackVideoPaused: string
    playbackVideoBufferingBegan: string
    playbackVideoBufferingEnded: string
    playbackVideoEnded: string
    playbackSeekingBegan: string
    playbackSeekingEnded: string
    playbackError: string
    playbackSpeedChange: string
    playbackAudioVolumeChange: string
    playbackAudioMuteChange: string
    playbackStreamingQualityChangeDownload: string
    playbackStreamingQualityChangeRender: string
    playing: string
    paused: string
    seek: string
    rewind: string
    forward: string
    openSettings: string
    closeSettings: string
    speedSettingChange: string
    qualitySettingChange: string
    audioVolumeSettingChange: string
    audioMuteSettingChange: string
  }
}>

declare module 'playcraft/modules' {
  export type EnvironmentError = (
    | {allowDevices: string[]}
    | {allowOSs: string[]}
    | {minVersion: string}
    | {allowBrowsers: string[]}
  ) & {name: string}

  export const createApi: function
  export const startSession: function
  export const getContentInfo: function
  export const getStreamInfo: function
  export const mapLogEvents: function
  export const logEventNames: function
  export const playlogv2: Playlogv2
  export const selectHlsQualities: function
  export const addSentry: function
  export const validateEnvironment: (
    supportEnvironmentList: SupportEnvironmentItem[]
  ) => EnvironmentError
  export const ensureTabLock: () => void | (() => void)
  export const handleIOSHeadphonesDisconnection: ({
    maxStuckSeconds,
  }?: {
    maxStuckSeconds?: number | undefined
  }) => void
}
