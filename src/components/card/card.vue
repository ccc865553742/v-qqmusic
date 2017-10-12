<template lang="html">
  <div class="card_container" @click="select">
    <div class="card_img_wrap">
      <img v-lazy="item.imgurl" alt="">
      <i class="icon-play"></i>
      <span class="listen_count_wrap" v-if="showCount">
        <i class="icon-headphones"></i>
        {{ accessnum }}
      </span>
    </div>
    <!-- <span class="card_name">{{ item.Ftitle || item.songListDesc }}</span> -->
    <span class="card_name">{{ item.creator.name }}</span>
    <span class="card_text">{{ item.dissname }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    showCount: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    select() {
      this.$emit('select', this.item.dissid);
    },
  },
  computed: {
    accessnum() {
      let accessnum = '';
      if (this.item.listennum) {
        const arr = this.item.listennum.toString().split('');
        if (arr.length > 8) {
          accessnum = `${arr.slice(0, arr.length - 8).join('')}亿.${arr[arr.length - 9]}`;
        } else if (arr.length > 4) {
          accessnum = `${arr.slice(0, arr.length - 4).join('')}.${arr[arr.length - 5]}万`;
        } else {
          accessnum = arr.join('');
        }
      }
      return accessnum;
    },
  },
};
</script>

<style lang="css" scoped>
.card_container {
  display: flex;
  flex-direction: column;
  font-size: .24rem;
  box-shadow:-1px 0px 8px rgba(0,0,0,.3);
}

.card_img_wrap {
  position: relative;
  /*height: 3.6rem;*/
  background-color: #eee;
}
.card_img_wrap img {
  width: 100%;
  height: 100%;
}


.icon-play {
  position: absolute;
  font-size: .60rem;
  color: rgba(255,255,255, .7);
  right: .2rem;
  bottom: .2rem;;
}
.card_img_wrap:hover .icon-play2 {
  color: #fff;
}


.listen_count_wrap {
  position: absolute;
  color: #fff;
  left: .2rem;
  bottom: .2rem;
  letter-spacing: .02rem;
}

.card_name, .card_text{
  padding: .05rem 0 0 .1rem;
  margin-top: .1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: .02rem;
  text-align: left;
}
.card_text{
  margin-bottom: .1rem;
}

.icon-headphones{
  margin-right: .05rem;
}
</style>
