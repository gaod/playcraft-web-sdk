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