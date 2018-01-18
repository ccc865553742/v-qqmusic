<template lang="html">
  <transition name="slide">
    <musicList :title="title" :songs="list" :bgImage="bg" ></musicList>
  </transition>
</template>

<script>
import musicList from '../music-list/music-list';
import { getSingerDetail } from '../../api/singer';
import { createSong } from '../../common/js/song';

export default {
  data() {
    return {
      list: [],
      bg: '',
      title: '',
    };
  },
  methods: {
    _getSginerDetail(id) {
      if (!id) {
        this.$router.back();
      }
      getSingerDetail(id)
      .then((res) => {
        this.title = res.data.singer_name;
        this.bg = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`;
        this.list = this._normalizeSongs(res.data.list);
      });
    },
    _normalizeSongs(list) {
      const ret = [];
      list.forEach((item) => {
        const { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          createSong(musicData)
          .then((data) => {
            ret.push(data);
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
    this._getSginerDetail(id);
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
