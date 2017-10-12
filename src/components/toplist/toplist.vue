<template lang="html">
  <div class="toplist_container">
    <topic-card class="card_item" @select="select" v-for="(item, index) in topList" :item="item" :key="index" ></topic-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getTopList } from '../../api/toplist';
import topicCard from './topic_card';

export default {
  data() {
    return {
      topList: [],
    };
  },
  methods: {
    select(id) {
      this.$router.push(`/toplist/${id}`);
    },
    ...mapActions([
      'setTabIndex',
    ]),
    _normalToplist(list) {
      return list.filter(item => item.id !== 201);
    },
  },
  components: {
    'topic-card': topicCard,
  },
  activated() {
    getTopList()
    .then((res) => {
      this.topList = this._normalToplist(res.data.topList);
    });

    this.setTabIndex(2);
  },
};
</script>

<style lang="css">
.toplist_container {
  padding-top: .1rem;
  background: #ededed;
}
.card_item{
  margin-bottom: .4rem;
  box-shadow:-2px 0px 11px rgba(0,0,0,.3);
}
</style>
