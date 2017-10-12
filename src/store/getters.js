export const tabIndex = state => state.tabIndex;

export const user = state => state.user;

export const playlist = state => state.playlist;

export const currentIndex = state => state.currentIndex;

export const fullScreen = state => state.fullScreen;

export const playing = state => state.playing;

export const currentSong = state => state.playlist[state.currentIndex] || {};

export const mode = state => state.mode;
