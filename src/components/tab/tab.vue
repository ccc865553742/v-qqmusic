<template lang="html">
  <div class="tab_container">
    <div class="tab_item" :class="{active_tab: tabIndex === 0}"  @click="changetab(0)">
      推荐
    </div>
    <div class="tab_item" :class="{active_tab: tabIndex === 1}"  @click="changetab(1)">
      歌手
    </div>
    <div class="tab_item" :class="{active_tab: tabIndex === 2}"  @click="changetab(2)">
      排行
    </div>
    <div class="tab_item" :class="{active_tab: tabIndex === 3}"  @click="changetab(3)">
      搜索
    </div>
    <div class="tab_cursor" :style="{left: tabIndex * 25 + 'vw' }"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    changetab(index) {
      if (index === 0) {
        this.$router.push('/');
      } else if (index === 1) {
        this.$router.push('/singer');
      } else if (index === 2) {
        this.$router.push('/toplist');
      } else {
        this.$router.push('/search');
      }
      this.setTabIndex(index);
    },
    ...mapActions([
      'setTabIndex',
    ]),
  },
  computed: {
    ...mapGetters([
      'tabIndex',
    ]),
  },
};
</script>

<style lang="css" scoped>
.tab_container {
  /*position: relative;*/
  display: flex;
  height: .8rem;
  align-items: center;
  width: 100vw;
}

.tab_container .tab_item {
  flex: 1;
  font-size: .26rem;
}

.tab_container .tab_item.active_tab {
  color: #31c27c;
}

.tab_cursor{
  bottom: 0;
  position: absolute;
  width: 25vw;
  height: .04rem;
  background: #31c27c;
  transition: left .1s ease-in-out;
}
</style>
