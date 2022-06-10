declare module 'playcraft/modules' {
  export type EnvironmentError = (
    | {allowDevices: string[]}
    | {allowOSs: string[]}
    | {minVersion: string}
    | {allowBrowsers: string[]}
  ) & {name: string};

  export const createApi: function;
  export const startSession: function;
  export const getContentInfo: function;
  export const getStreamInfo: function;
  export const mapLogEvents: function;
  export const logEventNames: function;
  export const selectHlsQualities: function;
  export const addSentry: function;
  export const validateEnvironment: (
    supportEnvironmentList: SupportEnvironmentItem[]
  ) => EnvironmentError;
  export const ensureTabLock: () => void | (() => void);
  export const handleIOSHeadphonesDisconnection: ({ maxStuckSeconds }?: {
    maxStuckSeconds?: number | undefined;
  }) => void;
}