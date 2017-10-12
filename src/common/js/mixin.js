import { mapGetters, mapMutations } from 'vuex';

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist',
    ]),
  },
  mounted() {
    this.handlePlaylist(this.playlist);
  },
  activated() {
    this.handelPlaylist(this.playlist);
  },
  watch: {
    playlist(newVal) {
      this.handelPlaylist(newVal);
    },
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method');
    },
  },
};

export const playerMixin = {
  computed: {
    ...mapGetters([
      'playlist',
      'currentSong',
      'currentIndex',
      'mode',
    ]),
  },
  methods: {
    ...mapMutations({
      setPlaylist: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE',
      setMode: 'SET_PLAY_MODE',
    }),
  },
};
