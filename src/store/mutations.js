import * as types from './mutations-types';

const mutations = {
  [types.SET_TAB_INDEX](state, index) {
    state.tabIndex = index;
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag;
  },
  [types.SET_CURRENT_SONG](state, song) {
    state.currentSong = song;
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },
};

export default mutations;
