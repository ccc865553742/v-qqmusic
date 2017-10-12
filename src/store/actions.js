import * as types from './mutations-types';

export const setTabIndex = ({ commit, state }, index) => {
  commit(types.SET_TAB_INDEX, index);
};

export const setUser = ({ commit, state }, user) => {
  commit(types.SET_USER, user);
};

export const setMode = ({ commit, state }, mode) => {
  commit(types.SET_PLAY_MODE, mode);
};

export const selectPlay = ({ commit, state }, { list, index }) => {
  commit(types.SET_PLAYLIST, list);
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};


export const setFullScreen = ({ commit, state }, flag) => {
  commit(types.SET_FULL_SCREEN, flag);
};


export const insertSong = ({ commit, state }, song) => {
  const playlist = state.playlist.slice();
  let currentIndex = state.currentIndex;
  if (playlist.length === 0) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
  playlist.splice(currentIndex, 0, song);
  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};
