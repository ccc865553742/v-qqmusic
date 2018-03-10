<template lang="html">
  <div class="singer_container" onscroll="scroll()">
    <ul>
      <li v-for="group in singers" class="singer_list" ref="listGroup">
        <h2 class="list_group_tit">{{ group.title }}</h2>
        <ul>
          <li v-for="(item, index) in group.items" class="list_group_item" @click="select(item)">
              <img class="avatar" v-lazy="item.avatar" alt="">
              <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list_shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList" class="item" :data-index="index" :key="index" :class="{active: currentIndex === index}">
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- <div class="list_fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { ERR_OK } from '../../api/config';
import getSingerList from '../../api/singer';
import Singer from '../../common/js/singer';
// import getMvListInfo from '../../api/mvlist';
// import getRadioList from '../../api/radiolist';

const HOT_SINGER_LEN = 10;
const HOT_NAME = '热门';

export default {
  data() {
    return {
      scrollY: -1,
      singers: [],
      diff: -1,
      currentIndex: 0,
    };
  },
  methods: {
    select(item) {
      // console.log(id);
      this.$router.push(`/singer/${item.id}`);
    },
    scroll() {
      this.scrollY = window.scrollY;
      // console.log('abc', this.scrollY);
    },
    onShortcutTouchStart(e) {
      const anchorIndex = e.target.getAttribute('data-index');
      const firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;
      if (!anchorIndex) {
        return;
      }
      window.scrollTo(0, this.listHeight[anchorIndex] + 1);
    },
    _getSingerList() {
      getSingerList()
      .then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this.normalizeSinger(res.data.list);
          setTimeout(() => {
            this._calculateHeight();
            this.scrollY += 1;
          }, 20);
        }
      });
    },
    normalizeSinger(list) {
      const map = {
        hot: {
          title: HOT_NAME,
          items: [],
        },
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
          }));
        }

        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: [],
          };
        }

        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid,
        }));
      });
      // 为了得到有序列表
      const ret = [];
      const hot = [];
      for (const key in map) {
        const val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
      return hot.concat(ret);
    },
    _calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;

      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i += 1) {
        const item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    ...mapActions([
      'setTabIndex',
    ]),
  },
  computed: {
    shortcutList() {
      return this.singers.map(group => group.title.substr(0, 1));
    },
    // fixedTitle() {
    //   if (this.scrollY < 0) {
    //     return '';
    //   }
    //   return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
    // },
  },
  watch: {
    scrollY(newY) {
      const listHeight = this.listHeight;
      if (!this.listHeight) {
        return;
      }

      // 当滚到顶部 newY > 0
      if (newY < 0) {
        this.currentIndex = 0;
        return;
      }
      for (let i = 0; i < listHeight.length - 1; i += 1) {
        const height1 = listHeight[i];
        const height2 = listHeight[i + 1];
        if (newY >= height1 && newY <= height2) {
          this.currentIndex = i;
          this.diff = height2 + newY;
          return;
        }
      }

      this.currentIndex = listHeight.length - 2;
    },
    // diff(newVal) {
    //
    // },
  },
  created() {
    this.listHeight = [];
    this.touch = {};
  },
  mounted() {
    this._getSingerList();
    window.addEventListener('scroll', this.scroll);
  },
  activated() {
    this.setTabIndex(1);
  },
};
</script>

<style lang="css">
.singer_container{
  font-size: .24rem;
}
.list_group_tit{
  width: 100%;
  text-align: left;
  padding-left: .5rem;
  box-sizing: border-box;
  line-height: .8rem;
  background-color: #efefef;
}
.list_group_item{
  display: flex;
  align-items: center;
  height: 1.4rem;
  width: 100%;
  border-bottom:.02rem solid #efefef;
}
.list_group_item .avatar {
  height: 1rem;
  width: 1rem;
  margin-left: .4rem;
  border-radius: 100%;
}
.list_group_item .name {
  color: #000;
  margin-left: .6rem;
  font-size: .3rem;
}
.list_shortcut{
  position:fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  opacity: .7;
  padding:.4rem 0;
  border-radius: .5rem;
  background-color: #efefef;
  z-index: 5555;
}

.list_shortcut .item {
  line-height: .3rem;
  padding:0 .1rem;
}
.list_shortcut .item.active {
  color: #31c27c;
  font-weight: bold;
}
.list_fixed{

}
</style>
