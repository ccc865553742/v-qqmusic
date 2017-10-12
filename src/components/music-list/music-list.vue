<template lang="html">
  <div class="singer_detail_container" >
    <div class="title_container" ref="title" :style="{backgroundImage: `url(${showbg ? bgImage : ''})`}">
      <span class="icon_wrap" @click="_back">
        <i class="icon-right"></i>
      </span>

      <span class="title" v-html="title"></span>

      <div class="filter" v-if="showbg"></div>
    </div>

    <div class="play" ref="play" @click="shufflePlay">
      <i class="icon-play2 icon"></i>
      <span>随机播放全部</span>
    </div>

    <div class="header_container" ref="bg" :style="bgStyle">
      <div class="filter"></div>
    </div>

    <div class="song_list" id="song_list" ref="list" @scroll.stop.prevent="scroll">
      <div class="bg_layer" ref="layer"></div>

      <ul v-if="songs.length">
        <li class="song_item" v-for="(item, index) in songs" @click="selectItem(index)">
          <span class="index">{{ index + 1 }}</span>
          <div class="song_detail">
            <span class="song_name">{{ item.name }}</span>
            <span class="song_singer">{{ `${item.singer} - ${item.album}` }}</span>
          </div>
        </li>
      </ul>
      <loading v-else class="loading"></loading>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import loading from '../../base/loading/loading';

export default {
  props: {
    bgImage: {
      type: String,
      default: '',
    },
    songs: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      scrollTop: 0,
      showbg: false,
    };
  },
  methods: {
    shufflePlay() {
      const index = Math.floor(Math.random() * this.songs.length);
      this.setMode(2);
      this.selectItem(index);
      // console.log('shufflePlay');
    },
    scroll() {
      this.scrollTop = this.$refs.list.scrollTop;
    },
    _back() {
      this.$router.back();
    },
    selectItem(index) {
      this.selectPlay({
        list: this.songs,
        index,
      });
    },
    ...mapActions([
      'selectPlay',
      'setMode',
    ]),
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    },
  },
  mounted() {
    this.bgHeight = this.$refs.bg.clientHeight;
    this.borderHeight = this.bgHeight - this.$refs.title.clientHeight;
  },
  components: {
    loading,
  },
  watch: {
    scrollTop(newVal) {
      // console.log(newVal, this.borderHeight);
      if (newVal >= this.borderHeight) {
        this.showbg = true;
      } else {
        this.showbg = false;
      }
    },
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
  /*display: none;*/
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
  padding: .15rem .15rem;
  border-radius: .5rem;
  border: .02rem solid #fff;
  position: fixed;
  top: 0;
  z-index: 52;
  color: #fff;
  bottom: .3rem;
  left: 50%;
  top: 4.3rem;
  width: 2rem;
  height: .4rem;
  line-height: .4rem;
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
  background: #fff;
  border-bottom: .04rem solid #efefef;
}
.song_item .index{
  flex: 0 0 1rem;
  line-height: 1rem;
  font-size: .36rem;
  color:rgba(0,0,0,0.4);
}
.song_item .song_detail {
  /*flex: 0 0 2.7rem;*/
  width: 6.25rem;
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
  text-overflow: ellipsis;
  overflow:hidden;
  white-space:nowrap;
}
.song_detail .song_singer{
  font-size: .28rem;
  color: rgba(0,0,0,.4);
  text-overflow: ellipsis;
  overflow:hidden;
  white-space:nowrap;
}

.loading {
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
