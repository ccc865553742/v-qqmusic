<template lang="html">
  <transition name="slide">
    <musicList :title="title" :bgImage="bg" :songs="list"></musicList>
  </transition>
</template>

<script>
import musicList from '../music-list/music-list';
import { getTop } from '../../api/toplist';
import { createSong } from '../../common/js/song';

export default {
  data() {
    return {
      list: [],
      title: '',
      bg: '',
    };
  },
  methods: {
    _getTopDetail(id) {
      getTop(id)
      .then((res) => {
        this.bg = res.topinfo.pic_album;
        this.title = res.topinfo.ListName;
        this.list = this._normalizeSongs(res.songlist);
      });
    },
    _normalizeSongs(list) {
      const ret = [];
      list.forEach((item) => {
        const { data } = item;
        if (data.songid && data.albummid) {
          // ret.push(createSong(data));
          createSong(data)
          .then((musicData) => {
            ret.push(musicData);
          });
        }
      });
      return ret;
    },
  },
  components: {
    musicList,
  },
  activated() {
    this.list = [];
    const id = this.$route.params.id;
    this._getTopDetail(id);
  },
};
</script>

<style lang="css" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all .5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  transform: translate3d(100%, 0 , 0);
}
</style>
