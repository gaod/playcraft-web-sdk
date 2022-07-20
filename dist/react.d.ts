/// <reference types="react" />

declare module 'playcraft' {
  export interface SupportEnvironmentItem {
    device?: { type: string };
    os?: { name: string; version: string };
    browser?: { name: string; version: string };
  };

  export interface Recommendation {
    title: string;
    content: React.ReactNode;
  };

  export interface PlayerInstance {
    load(): void;
  };

  export const getEnterpriseDrmConfig: function;
  export const getBVKDrmConfig: function;

  export interface PlayerProps {
    ref?: MutableRefObject<PlayerInstance>;
    licenseKey: string;
    config?: object;
    host?: string;
    accessToken?: string;
    deviceId?: string;
    content?: {
      contentId: number | string;
      contentType: 'videos' | 'lives';
    };
    customHeader?: object;
    customQuery?: object;
    lang?: 'en' | 'ja' | 'zh-TW';
    langCustomCode?: object;
    preload?: 'auto' | 'none';
    autoplay?: boolean;
    autoplayNext?: boolean;
    startTime?: number;
    quality?: string | number | {
      default: string | number;
      getQualityText?({width: number, height: number}): string;
      qualitySelectionHack: boolean;
    };
    mediaSource?: string;
    thumbnailSeeking?: boolean;
    supportEnvironmentList?: Array<SupportEnvironmentItem>;
    limitOnePlaybackAtSameTime?: boolean;
    recommendation?: Recommendation;
    coverImageUrl?: string;
    widevine?: 'force-l1' | 'device' | 'auto' | 'force-l3';
    plugins?: Array;
    drm?(object): any;
    sentry?(object): any;

    onSourceLoaded?(): void;
    onReady?(): void;
    onPlay?(): void;
    onPaused?(): void;
    onPlaying?(): void;
    onEnded?(): void;
    onError?(error: object): void;
    onBack?(contentId: number | string): void;
    onTimeChanged?(currentTime: number): void;
    onSeek?(seekTarget: number, position: number): void;
    onSeeked?(currentTime: number): void;
    onVolumeChanged?(targetVolume: number, sourceVolume: number): void;
    onMuted?(): void;
    onUnmuted?(): void;
    onVideoQualityChanged?(targetQuality: string, sourceQuality: string): void;
    onMediaSourceChanged?(mediaSource: string): void;
    onViewModeChange?(viewModeChangedEvent: object): void;
    onEnterFullscreen?(): void;
    onExitFullscreen?(): void;
    onStallStarted?(): void;
    onStallEnded?(): void;
    onReplay?(): void;
    onChangeVideo?(content: object): void;
    onChangeToNextVideo?(content: object): void;
    onChangeToPreviousVideo?(content: object): void;
    onLogging?(type: string, property: object): void;
    onSectionChange?(sectionChangedEvent: object): void;
  };

  export const Player: React.FunctionComponent<PlayerProps>;
}

declare module 'playcraft/react' {
  export interface Intl {
    locale?: string,
    messages?: object,
  }

  export interface PremiumPlayerProps {
    source: object;
    startTime?: number;
    autoplay?: boolean;
    title?: string;
    quality?: object;
    bitmovin?: object;
    videoRef?: React.useRef<HTMLVideoElement>,
    playbackState?: string;
    currentTime?: number;
    playbackRate?: number;
    volume?: number;
    thumbnailsUrl?: string;
    drm?: object;
    intl?: Intl;
    controls?: object;
    plugins?: object[];
    onError?: function;
    onPlaybackStateChange?: function;
    onBack?: functoin;
    onChangeNext?: function;
    onChangePrevious?: function;
    onOpenSettings?: function;
    onChangeSettings?: function;
    sendLog?: function;
  }
  export const PremiumPlayer: React.FunctionComponent<PremiumPlayerProps>;

  export interface CoverImageProps {
    src?: string
  };
  export const CoverImage: React.FunctionComponent<CoverImageProps>;

  export const FunctionBarExtension = React.FunctionComponent;
  export const InfoBarExtension = React.FunctionComponent;
  export const TitleBarExtension = React.FunctionComponent;
}

declare module 'playcraft/modules' {
  export const createApi: function;
  export const startSession: function;
  export const getContentInfo: function;
  export const getStreamInfo: function;
  export const mapLogEvents: function;
  export const logEventNames: function;
  export const selectHlsQualities: function;
  export const addSentry: function;
}

declare module 'playcraft/plugins' {
  export const MediaTailorPlugin: function;
  export const ImaDaiPlugin: function;
  export const StallReloadPlugin: function;
}