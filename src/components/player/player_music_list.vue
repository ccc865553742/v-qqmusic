<template lang="html">
  <transition name="list_fade">
  <div class="player_list_container" v-show="showList">
    <transition name="fade">
      <div class="mask" v-show="showList" @click="closeList"></div>
    </transition>
    <div class="list_wrapper" >
      <div class="list_header">
        <div class="mode_btn" @click="toggleMode">
          <i :class="modeIcon" class="modeIcon"></i>
          {{this.mode === 0 ? '列表循环' : this.mode === 1 ? '随机播放' : '单曲循环'}}
        </div>
        <div class="clear_btn" @click="clear">
          <i class="icon-bin"></i>
          <span>清空</span>
        </div>
      </div>
      <ul class="list" ref="list">
        <li v-for="(song, index) in playlist"
        :class="{'active': index === currentIndex}"
         @click="selectItem(index)"
         ref="listItem">
         <i v-show="index === currentIndex" class="icon-headphones"></i>
         <span class="left">
          {{song.name}} - <span class="singer_name">{{song.singer}}
          </span>
        </span>
         <i style="color:#000" class="icon-close" @click="deleteItem($event,index)"></i>
       </li>
      </ul>
      <div class="close_btn" @click="closeList">
        关闭
      </div>
    </div>
    <confirm ref="confirm" text="是否清空列表" confirmBtnText="清空" @confirm="confirm"></confirm>
  </div>
</transition>

</template>

<script>
import { playerMixin } from '../../common/js/mixin';
import confirm from '../../base/confirm/confirm';
import ModalHelper from '../../common/js/modalHelper';

export default {
  props: {
    showList: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [playerMixin],
  methods: {
    toggleMode() {
      this.$emit('toggleMode');
    },
    closeList() {
      this.$emit('closeList');
    },
    selectItem(index) {
      this.setCurrentIndex(index);
      this.setPlayingState(true);
    },
    deleteItem(e, index) {
      e.stopPropagation();
      const playlist = this.playlist.slice();
      let currentIndex = this.currentIndex;
      playlist.splice(index, 1);

      if (index < currentIndex) {
        currentIndex -= 1;
      }
      this.setCurrentIndex(currentIndex);
      this.setPlaylist(playlist);
    },
    clear() {
      this.$refs.confirm.show();
    },
    confirm() {
      // console.log('confirm');
      this.closeList();
      this.setPlayingState(false);
      this.setPlaylist([]);
    },
    scrollTo(el, dest) {
      el.scrollTop = dest;
      // const t = setInterval(() => {
      //   const now = el.scrollTop;
      //   let Speed = (dest - now) / (500 / 24);
      //   Speed = Speed > 0 ? Math.ceil(Speed) : Math.floor(Speed); // 进行取整，便于计算
      //   const isToBottom = now < dest;
      //   const bottomHeight = this.$refs.listItem[this.$refs.listItem.length - 8].offsetTop;
      //   const isBottom = now >= bottomHeight;
      //   console.log(`now -> ${now} ,  to -> ${dest}`, Speed, isToBottom, bottomHeight, isBottom);
      //   if ((isToBottom && now >= dest) || (isBottom && isToBottom)) {
      //     clearInterval(t);
      //   } else if (!isToBottom && dest >= now) {
      //     clearInterval(t);
      //   }
      //   el.scrollTop += Speed;
      // }, 24);
    },
  },
  components: {
    confirm,
  },
  computed: {
    modeIcon() {
      let mode = 'icon-sequence';
      if (this.mode === 1) {
        mode = 'icon-random';
      } else if (this.mode === 2) {
        mode = 'icon-loop';
      }
      return mode;
    },
    // modeName() {
    //   const name = this.mode === 0 ? '列表循环' : this.mode === 1 ? '随机播放' : '单曲循环';
    //   return name;
    // },
  },
  watch: {
    showList(newVal) {
      if (newVal) {
        console.log(newVal);
        setTimeout(() => {
          const top = this.$refs.listItem[this.currentIndex].offsetTop -
                      this.$refs.listItem[this.currentIndex].clientHeight;
          // this.$refs.list.scrollTop = `${top}`;
          this.scrollTo(this.$refs.list, top);
        }, 500);
        ModalHelper.afterOpen();
      } else {
        ModalHelper.beforeClose();
      }
    },
  },
};
</script>

<style lang="css" scoped>
.list_fade-enter-active, .list_fade-leave-active {
  transition: all .3s;
}
.list_fade-enter, .list_fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: .6;
  transform: translate3d(0, 100%, 0);
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
}

.player_list_container {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 200;
}
.mode_btn .modeIcon{
  font-size: .36rem;
  margin-right: .1rem;
}

.mode_btn, .clear_btn{
  flex: 0 0 2rem;
  padding-left: .2rem;
  height: 100%;
  line-height: 1rem;
  color:#31c27c;
}
.mask {
  height: 100%;
  width: 100%;
  z-index: 200;
  background: rgba(0,0,0,.5);
}

.list_wrapper{
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 8rem;
  bottom: 0;
  left: 0;
  z-index: 201;
  background: #fff;
}
.list_header{
  flex: 0 0 1rem;
  display: flex;
  font-size: .36rem;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 2px 2px .1rem #222;
  border-bottom: .04rem solid #efefef;
}
.list{
  height: 6rem;
  overflow-y: scroll;
  font-size: .32rem;
}
.list li {
 display: flex;
 justify-content: space-between;
 line-height: .85rem;
 text-align: left;
 padding-left: .4rem;
 background: #fff;
 border-bottom: .04rem solid #efefef;
}
.list li.active {
  padding-left: .2rem;
  font-size: .36rem;
  color: #31c27c;
}
.list li.active .singer_name{
  color: #31c27c;
  font-size: .28rem;
}
.list li .singer_name{
  font-size: .24rem;
  color: rgba(0,0,0,.4);
}
.list li .left {
  width: 5.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.list li i {
  text-align: center;
  flex: 0 0 1rem;
  line-height: .8rem;
  box-sizing: border-box;
}
.list::-webkit-scrollbar {display:none}
.close_btn{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: #fff;
  line-height: 1rem;
  font-size: .36rem;
  height: 1rem;
  box-shadow: 0 -1px .1rem #eee;
  color:#31c27c;
}

</style>
