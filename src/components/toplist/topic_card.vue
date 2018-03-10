<template lang="html">
  <div class="toplist_card_container" @click="select">
    <div class="card_left">
      <img v-lazy="item.picUrl" alt="">
      <span class="count_wrap">
        <i class="icon-headphones"></i>
        {{ listenCount }}
      </span>
    </div>
    <div class="card_right">
      <!-- <h3 class="topic_titl">{{ item.topTitle }}</h3> -->
      <div class="topic_content">
        <p v-for="(item, index) in item.songList">{{ `${index}  ${item.songname} -` }}
          <span class="item_text"> {{ item.singername }}</span>
        </p>
      </div>
    </div>
    <i class="icon-right"></i>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    select() {
      this.$emit('select', this.item.id);
    },
  },
  computed: {
    listenCount() {
      let listenCount = '';
      if (this.item.listenCount) {
        const arr = this.item.listenCount.toString().split('');
        if (arr.length > 8) {
          listenCount = `${arr.slice(0, arr.length - 8).join('')}亿.${arr[arr.length - 9]}`;
        } else if (arr.length > 4) {
          listenCount = `${arr.slice(0, arr.length - 4).join('')}.${arr[arr.length - 5]}万`;
        } else {
          listenCount = arr.join('');
        }
      }
      return listenCount;
    },
  },
};
</script>

<style lang="css" scoped>
.toplist_card_container {
  position: relative;
  display: flex;
  height: 2.1rem;
  width: calc(7.5rem - .3rem * 2);
  margin:.3rem auto;
  padding: .05rem;
  background: #fff;
  box-sizing: border-box;
  font-size: .24rem;
}
.card_left {
  position: relative;
  flex: 0 0 2rem;
  height: 2rem;
  background: #000;
}
.card_left img{
  height: 100%;
  width: 100%;
}
.count_wrap {
  position: absolute;
  left: .1rem;
  opacity: .7;
  bottom: .1rem;
  letter-spacing: .01rem;
  color: #fff;
  font-size: .18rem;
}
.card_right{
  flex: 1;
  text-align: letf;
  margin:.1rem .2rem;
  margin-right: .5rem;
  overflow: hidden;
}
.card_right .topic_titl {
  text-align: left;
  font-size: .36rem;
}
.card_right .topic_content{
  width: 100%;
  color: #000;
}
.item_text{
  color: #b2b2b2;
}
.card_right .topic_content p {
  text-align: left;
  font-size: .26rem;
  line-height: .26rem;
  width: 95%;
  margin-top: .26rem;
  white-space: nowrap;
  /* overflow: auto; */
  text-overflow: ellipsis;
}
.icon-right{
  position: absolute;
  font-size: .36rem;
  right: .1rem;
  top: 50%;
  /*transform: translateY(-50%);*/
  color: #b2b2b2;
}
</style>
