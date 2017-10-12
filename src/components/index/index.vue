<template lang="html">
  <div class="index_container">
    <carousel style="margin-top:.03rem;":slider="slider"></carousel>
    <!-- <div class="index_radio_wrap">
      <h2 class="radio_title">电台</h2>
      <div class="card_container">
        <card class="card_item" v-for="(item, index) in radioList" :item="item" :key="index"></card>
      </div>
    </div> -->
    <div class="index_list_wrap">
      <h2 class="list_title">热门歌单推荐</h2>
      <div class="card_container">
        <card class="card_item" @select="select" :showCount="true" v-for="(item, index) in songList" :item="item" :key="index"></card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getDiscList } from '../../api/recommend';
import getSlider from '../../api/rank';
import carousel from '../carousel/carousel';
import card from '../card/card';
import { getPlayList } from '../../api/playlist';

export default {
  data() {
    return {
      slider: [],
      radioList: [],
      songList: [],
    };
  },
  components: {
    carousel,
    card,
  },
  methods: {
    select(id) {
      getPlayList(id)
      .then((res) => {
        console.log(res);
      });
    },
    ...mapActions([
      'setTabIndex',
    ]),
  },
  mounted() {
    getSlider()
    .then((res) => {
      this.slider = res.data.slider;
    });
    getDiscList()
    .then((res) => {
      this.songList = res.data.list;
      // console.log(res);
    });
    this.setTabIndex(0);
  },
};
</script>

<style lang="css">
.index_container{
  /*padding-bottom: 4rem;*/
}

.index_radio_wrap, .index_list_wrap {
  margin: .2rem;
}

.radio_title, .list_title {
  margin: .3rem 0;
  font-size: .30rem;
  line-height: .48rem;
  text-align: center;
}
.card_container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card_item{
  width: 46%;
  margin: .1rem;
  margin-bottom: .4rem;
}
</style>
