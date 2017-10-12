<template lang="html">
  <div class="player_container">
    <transition name="fade">
      <div class="normal_player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image" alt="">
      </div>
      <div class="top">
        <div class="back" @click="back">
          <i class="icon-right"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ currentSong.singer }}</h2>
      </div>
      <div class="middle"
      @touchstart.prevent="middleTouchStart"
      @touchmove.prevent="middleTouchMove"
      @touchend.prevent="middleTouchEnd">
        <div class="middle_l" ref="middleL" >
          <div class="cd_wrapper">
            <div class="cd" :class="[this.playing ? 'play' : 'play stop']">
              <img class="image" :src="currentSong.image" alt="">
            </div>
          </div>
          <div class="playing_lyric_wrapper">
            <div class="playing_lyric">
              {{playingLyric}}
            </div>
          </div>
        </div>
        <loading class="loading" :showText="false" v-show="!currentLyric && currentShow === 'lyric'"></loading>

        <div class="middle_r"  ref="lyriclist" v-show="currentShow === 'lyric'">
          <div v-if="currentLyric" class="lyric_wrapper"  ref="lyricwrap">
            <div v-if="currentLyric">
              <p ref="lyricLine"
                 class="text"
                 :class="{'current': currentLineNum === index}"
                 v-for="(line, index) in currentLyric.lines">{{line.txt}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="dot_wrapper">
          <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
          <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
        </div>
        <div class="progress_wrapper">
          <span class="time time_l">{{format(currentTime)}}</span>
          <div class="progress_bar_wrapper" ref="progressBar" @click="progressClick">
              <div class="bar_inner" >
                <div class="progress" ref="progress" ></div>
                <div class="progress_btn_wrapper" ref="progressBtn"
                @touchstart.prevent="progressTouchStart"
                @touchmove.prevent="progressTouchMove"
                @touchend="progressTouchEnd">
                  <div class="progress_btn" ></div>
                </div>
            </div>
          </div>
          <span class="time time_r">{{format(currentSong.duration)}}</span>
        </div>
        <div class="operators">
          <div class="icon i_left left1" @click="toggleMode">
            <i :class="modeIcon"></i>
          </div>
          <div class="icon i_left">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon i_center">
            <i :class="miniIcon" @click.stop="togglePlaying"></i>
          </div>
          <div class="icon i_right">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon i_right">
            <i class="icon-not-like"></i>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <div class="mini_player" @click="open" v-show="currentSong.duration">
      <div class="mini_progress_wrapper">
        <div class="mini_progress_inner">
          <div class="mini_progress" :style="{width: parcent * 100 + '%'}"></div>
        </div>
      </div>
      <div class="icon">
        <img :src="currentSong.image" class="mini_cd" :class="[this.playing ? 'play' : 'play stop']">
      </div>

      <div class="text">
        <h2 class="name">{{currentSong.name}}</h2>
        <p class="desc">{{currentSong.singer}}</p>
      </div>

      <div class="control" @click="togglePlaying">
        <i :class="miniIcon"></i>
      </div>
      <div class="control" @click="showlist">
        <i class="icon-musiclist"></i>
      </div>
    </div>
    <playlist ref="playlist" :showList="showList" @closeList="showlist" @toggleMode="toggleMode"></playlist>
    <audio ref="audio" :src="currentSong.url" @ended="end" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import Lyric from 'lyric-parser';
import { mapMutations, mapGetters } from 'vuex';
import { playerMixin } from '../../common/js/mixin';
import playlist from './player_music_list';
import loading from '../../base/loading/loading';

export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      playingLyric: '',
      currentNum: 0,
      showList: false,
    };
  },
  mixins: [playerMixin],
  methods: {
    shuffleIndex() {
      return Math.floor(Math.random() * this.playlist.length);
    },
    toggleMode() {
      const mode = this.mode + 1 > 2 ? 0 : this.mode + 1;
      this.setMode(mode);
    },
    showlist(e) {
      if (e) {
        e.stopPropagation();
      }
      this.showList = !this.showList;
    },
    middleTouchStart(e) {
      this.touch_m.initiated = true;
      //  用来判断是否是一次移动
      this.touch_m.moved = false;
      const touch = e.touches[0];
      // console.log(touch);
      this.touch_m.startX = touch.pageX;
      this.touch_m.startY = touch.pageY;
    },
    middleTouchMove(e) {
      if (!this.touch_m.initiated) {
        return;
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch_m.startX;
      const deltaY = touch.pageY - this.touch_m.startY;
      // 如果 y 移动的距离大于x 则不切换
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      // console.log(deltaX, 'deltaX');
      if (!this.touch_m.moved) {
        this.touch_m.moved = true;
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX));
      this.touch_m.parcent = Math.abs(offsetWidth / window.innerWidth);
      this.$refs.lyriclist.style.transform = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyriclist.style.transitionDuration = 0;
      this.$refs.middleL.style.opacity = 1 - this.touch_m.parcent;
      this.$refs.middleL.style.transitionDuration = 0;
    },
    middleTouchEnd() {
      if (!this.touch_m.moved) {
        return;
      }
      let offsetWidth = 0;
      let opacity = 0;

      /* eslint-disable no-lonely-if */
      if (this.currentShow === 'cd') {
        if (this.touch_m.parcent > 0.1) {
          offsetWidth = -window.innerWidth;
          this.currentShow = 'lyric';
        } else {
          // offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch_m.parcent < 0.9) {
          // offsetWidth = 0;
          this.currentShow = 'cd';
          opacity = 1;
        } else {
          offsetWidth = -window.innerWidth;
        }
      }
      // console.log(offsetWidth, 'offsetWidth');
      const time = 300;
      this.$refs.lyriclist.style.transform = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyriclist.style.transitionDuration = `${time}ms`;
      this.$refs.middleL.style.opacity = opacity;
      this.$refs.middleL.style.transitionDuration = `${time}ms`;
      this.touch_m.initiated = false;
    },
    open() {
      this.setFullScreen(true);
    },
    back() {
      this.setFullScreen(false);
    },
    togglePlaying(e) {
      if (e) {
        e.stopPropagation();
      }
      this.setPlayingState(!this.playing);
      if (this.playing) {
        this.currentLyric.play();
        if (this.currentLyric) {
          this.currentLyric.seek(this.currentTime * 1000);
        }
      } else {
        this.currentLyric.stop();
      }
    },
    end() {
      this.next();
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.currentLyric.play();
      this.setPlayingState(true);
    },
    next(e) {
      if (this.playlist.length === 1 || (this.mode === 2 && !e)) {
        this.loop();
        // return;
      } else if (this.mode === 1) {
        const index = this.shuffleIndex();
        this.setCurrentIndex(index);
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
      }
    },
    prev() {
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playlist.length - 1;
        }
        this.setCurrentIndex(index);
        // if (!this.playing) {
        //   this.togglePlaying();
        // }
      }
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    format(interval) {
      interval = Math.floor(interval || 0);
      const minute = Math.floor(interval / 60);
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    getLyric() {
      this.currentSong.getLyric().then((lyric) => {
        if (this.currentSong.lyric !== lyric) {
          return;
        }
        this.currentLyric = new Lyric(lyric, this.handleLyric);
        if (this.playing) {
          this.currentLyric.play();
        }
        // console.log(this.currentLyric);
      })
      .catch(() => {
        this.currentLyric = null;
        this.playingLyric = '';
        this.currentLineNum = 0;
      });
    },
    handleLyric({ lineNum, txt }) {
      const top = this.$refs.lyricLine[lineNum].offsetTop - 5 * 32;
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        this.$refs.lyricwrap.style.transform = `translate3d(0, -${top}px, 0)`;
      } else {
        this.$refs.lyricwrap.style.transform = 'translate3d(0, 0, 0)';
      }
      this.playingLyric = txt;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = `0${num}`;
        len += 1;
      }
      return num;
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`;
    },
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - 30,
                          Math.max(0, this.touch.left + deltaX));
      this._offset(offsetWidth);
    },
    progressTouchEnd() {
      this.touch.initiated = false;
      const barWidth = this.$refs.progressBar.clientWidth - 30;
      const percent = this.$refs.progress.clientWidth / barWidth;
      const currentTime = this.currentSong.duration * percent;
      this.$refs.audio.currentTime = currentTime;
      if (!this.playing) {
        this.togglePlaying();
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this._offset(offsetWidth);
      this.progressTouchEnd();
      // const barWidth = this.$refs.progressBar.clientWidth - 20;
      // const percent = this.$refs.progress.clientWidth / barWidth;
      // const currentTime = this.currentSong.duration * percent;
      // this.$refs.audio.currentTime = currentTime;
      // if (this.currentLyric) {
      //   this.currentLyric.seek(currentTime * 1000);
      // }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
    }),
  },
  computed: {
    miniIcon() {
      return this.playing ? 'icon-pause' : 'icon-play';
    },
    modeIcon() {
      let mode = 'icon-sequence';
      if (this.mode === 1) {
        mode = 'icon-random';
      } else if (this.mode === 2) {
        mode = 'icon-loop';
      }
      return mode;
    },
    parcent() {
      return this.currentTime / this.currentSong.duration;
    },
    ...mapGetters([
      'fullScreen',
      'currentIndex',
      'playing',
    ]),
  },
  components: {
    playlist,
    loading,
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        return;
      }
      if (newSong.id === oldSong.id) {
        return;
      }
      if (this.currentLyric) {
        this.currentLyric = null;
        // this.currentLyric.stop();
        this.currentTime = 0;
        this.playingLyric = '';
        this.currentLineNum = 0;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs.audio.play();
        this.getLyric();
      }, 1000);
    },
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        // newPlaying ? audio.play() : audio.pause();
        if (newPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
      });
    },
    parcent(newParcent) {
      if (newParcent >= 0) {
        const barWidth = this.$refs.progressBar.clientWidth - 30;
        // console.log();
        const offsetWidth = newParcent * barWidth;
        this._offset(offsetWidth);
      }
    },
  },
  created() {
    this.touch = {};
    this.touch_m = {};
  },
};
</script>

<style lang="css" scoped>
.middle_r {
  display: inline-block;
  position: relative;
  width: 100%;
}

.lyric_wrapper {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
  transition: all 1s ease;
}

.lyric_wrapper .text {
  line-height: .64rem;
  font-size: .28rem;
  color: rgba(255,255,255,.5)
}
 .lyric_wrapper .text.current {
   color: #fff;
 }

.player_container{}
/* 迷你播放器 */
.mini_player{
  position: fixed;
  display: flex;
  height: 1.2rem;
  width: 100%;
  left: 0;
  bottom: 0;
  font-size: .24rem;
  background: #efefef;
  box-shadow: 0 -1px 2px #fff;
  z-index: 50;
}
.mini_player .icon{
  margin: .2rem .1rem 0 .4rem;
}
.mini_player .icon .mini_cd{
  width: .8rem;
  height: .8rem;
  border-radius: 100%;
}
.mini_player .text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: .2rem;
  box-sizing: border-box;
  text-align: left;
  font-size: .32rem;
}
.text .name {
  color: rgba(0,0,0,.7);
}
.text .desc {
  font-size: .28rem;
}
.mini_player .control {
  display: flex;
  align-items: center;
  flex: 0 0 1rem;
  font-size: .72rem;
}

.normal_player{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 150;
  background: #222;
}
.normal_player .background{
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  filter: blur(.4rem);
  opacity: 0.6;
}
.top {
  position: relative;
  color: #fff;
  letter-spacing: .02rem;
  margin-bottom: .4rem;
}
.top .back{
  position: absolute;
  left: 0;
  top: 0;
  padding: .2rem;
  font-size: .48rem;
  color: #fff;
  transform: rotate(90deg);
}
.top .title {
  padding-top: .2rem;
  font-size: .48rem;
  line-height: .6rem;
}
.top .subtitle {
  font-size: .28rem;
  line-height: .6rem;
}

.middle {
  position: fixed;
  width: 100%;
  overflow: hidden;
  top: 1.6rem;
  bottom: 3.4rem;
  white-space: nowrap;
  font-size: 0;
}
.middle_l {
  display: inline-block;
  position: relative;
  width: 100%;
}
.middle_l .cd_wrapper {
  position: relative;
  margin: 0 auto;
  width: 6rem;
  height: 6rem;
}
.middle_l .cd {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 100%;
  width: 5.8rem;
  height: 5.8rem;
  border: .2rem solid rgba(255,255,255,0.1);
}


.middle_l .cd.play, .mini_cd.play {
  animation: circle 20s linear infinite;
}
.middle_l .cd.stop, .mini_cd.stop {
  animation-play-state: paused;
}

@keyframes circle
{
from {transform: rotate(0)}
to {transform: rotate(360deg)}
}

.middle_l .image {
  border-radius: 100%;
  width: 5.8rem;
  height: 5.8rem;
}
.middle_l .playing_lyric_wrapper{
  width: 80%;
  margin: .5rem auto 0 auto;
  overflow: hidden;
  text-align: center;
  font-size: .28rem;
  color: rgba(255,255,255,.9);
}

.bottom{
  position: absolute;
  bottom: .5rem;
  width: 100%;
}
.bottom .dot_wrapper{
  text-align: center;
  font-size: 0;
}
.bottom .dot_wrapper .dot {
  display: inline-block;
  width: .16rem;
  height: .16rem;
  margin:0 .08rem;
  background: rgba(255,255,255,.5);
  border-radius: 100%;
}
.bottom .dot_wrapper .dot.active {
  width: .4rem;
  border-radius: .4rem;
  background: rgba(255,255,255,.7);
}
.bottom .progress_wrapper{
  display: flex;
  align-items: center;
  margin: .2rem .6rem;
}
.progress_wrapper .progress_bar_wrapper{
  flex: 1;
  height: .6rem;
}
.progress_bar_wrapper .bar_inner{
  position: relative;
  height: .08rem;
  background: rgba(0,0,0,.3);
  top: .26rem;
  margin: 0 .2rem;
}
.bar_inner .progress{
  display: inline-block;
  background: #31c27c;
  position: absolute;
  height: 100%;
  left: 0;
}
.bar_inner .progress_btn_wrapper{
  position: absolute;
  left: -.16rem;
  top: -.26rem;
  width: .6rem;
  height: .6rem;
}
.progress_btn_wrapper .progress_btn {
  position: relative;
  height:.32rem;
  width: .32rem;
  top: .14rem;
  left:.14rem;
  border: .06rem solid #fff;
  box-sizing: border-box;
  border-radius: 100%;
  background: #31c27c;
}
.bottom .progress_wrapper .time {
  font-size: .24rem;
  color: #fff;
  letter-spacing: .01rem;
}
.bottom .operators{
  display: flex;
  align-items: center;
}
.operators .icon {
  position: relative;
  width: 20%;
  font-size: .72rem;
  color:#31c27c;
}
.icon.i_center {
  font-size:1rem;
}
.icon.left1 {
  /*font-size: .68rem;*/
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
}

.mini_progress_wrapper{
  position: absolute;
  top: -.02rem;
}
.mini_progress_inner {
  width: 100vw;
  height: .02rem;
}
.mini_progress {
  height: 100%;
  background: #31c27c;
  box-shadow: 0 -.02rem .05rem #31c27c;
}
.loading {
  position: fixed;
  left: 50%;
  color:#fff;
  font-size: .48rem;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
