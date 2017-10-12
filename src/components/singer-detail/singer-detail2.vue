<template lang="html">
  <div class="singer_detail_container" >
    <div class="title_container" ref="title" >
      <span class="icon_wrap" @click="_back">
        <i class="icon-right"></i>
      </span>

      <span class="title">{{ this.singer.name }}</span>

      <div class="filter"></div>
    </div>

    <div class="header_container" ref="bg">
      <div class="filter"></div>
      <div class="play" ref="play">
        <i class="icon-play2 icon"></i>
        <span>随机播放全部</span>
      </div>
    </div>

    <div class="song_list" id="song_list" ref="list" @scroll.stop.prevent="scroll">
      <div class="bg_layer" ref="layer"></div>

      <ul>
        <li class="song_item" v-for="(item, index) in list">
          <span class="index">{{ index + 1 }}</span>
          <div class="song_detail">
            <span class="song_name">{{ item.name }}</span>
            <span class="song_singer">{{ `${item.singer} - ${item.album}` }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Singer from '../../common/js/singer';
import { getSingerDetail } from '../../api/singer';
import { createSong } from '../../common/js/song';

export default {
  data() {
    return {
      singer: {},
      desc: '',
      list: [],
      scrollTop: 0,
      showHolder: false,
    };
  },
  methods: {
    scroll() {
      this.scrollTop = this.$refs.list.scrollTop;
    },
    _back() {
      this.$router.back();
    },
    _getSginerDetail(id) {
      if (!id) {
        this.$router.back();
      }
      getSingerDetail(id)
      .then((res) => {
        this.singer = new Singer({
          name: res.data.singer_name,
          id: res.data.singer_mid,
        });
        this.desc = res.data.SingerDesc;
        this.$refs.bg.style.backgroundImage = `url(${this.singer.avatar})`;
        this.$refs.title.style.backgroundImage = `url(${this.singer.avatar})`;

        this.list = this._normalizeSongs(res.data.list);
      });
    },
    _normalizeSongs(list) {
      const ret = [];
      list.forEach((item) => {
        const { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
  },
  created() {
    const id = this.$route.params.id;
    this._getSginerDetail(id);
  },
};
</script>

<style lang="css" scoped>
.singer_detail_container{
  position: fixed;
  left:0 ;
  top:0;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  background: #efefef;
  z-index: 20;
}

.bg_layer{
  height: 5.5rem;
  background: transparent;
}

.title_container{
  z-index: 50;
  width: 100%;
  height: .8rem;
  position: fixed;
  left: 0;
  top: 0;
  background-size: cover;
  box-shadow: .02rem 0 .05rem rgba(7,17,27,0.4);
}

.header_container{
  position: relative;
  z-index: 10;
  width: 100%;
  height: 5.5rem;
  background-size: cover;
}
.icon_wrap{
  z-index: 51;
  position: absolute;
  left: 0;
  top: 0;
  padding: .2rem;
  height: .8rem;
  box-sizing: border-box;
  display: inline-block;
  font-size: .36rem;
  color: #fff;
  transform: rotate(-180deg);
}
.title{
  z-index: 50;
  position: absolute;
  text-align: center;
  width: 100%;
  display: block;
  height: .8rem;
  line-height: .8rem;
  color: #fff;
  font-size: .36rem;
}
.filter{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  background: rgba(7,17,27,0.4);
}
.play{
  display: flex;
  align-items: center;
  padding: .15rem .25rem;
  border-radius: .5rem;
  border: .02rem solid #fff;
  position: absolute;
  z-index: 31;
  color: #fff;
  bottom: .3rem;
  left: 50%;
  font-size: .28rem;
  letter-spacing: .01rem;
  transform: translateX(-50%);
}
.play:active {
  opacity: .7;
}
.play .icon {
  font-size: .32rem;
  margin-right: .1rem;
}
.song_list{
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  position: fixed;
  z-index: 40;
}
.song_item{
  display: flex;
  height: 1rem;
  width: 100%;
  align-items: center;
  background: #efefef;
}
.song_item .index{
  flex: 0 0 1rem;
  line-height: 1rem;
  font-size: .36rem;
  color:rgba(0,0,0,0.4);
}
.song_item .song_detail {
  flex: 1;
  height: 100%;
  padding: .15rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: left;
  border-bottom: .02rem solid #fff;
}
.song_detail .song_name{
  font-size: .28rem;

}
.song_detail .song_singer{
  /*margin-top: .1rem;*/
  font-size: .28rem;
  color: rgba(0,0,0,.4);
}
</style>
