<template lang="html">
  <v-touch class="carousel_container" @swipeleft="next" @swiperight="prev">
    <div class="img_container" :class="{img_wrap_tran: isTrans}" ref="img_wrap" :style="{transform:  `translate3d(${- index * clientWidth}px, 0, 0)`, width:cslider.length * 100 + '%'}">
      <a class="img_item" v-for="(item, index) in cslider" :href="item.linkUrl" :key="index">
        <img :src="item.picUrl" alt="">
      </a >
    </div>
    <div class="wrapper_buttons" >
      <span class="button_item" :class="{active: btn_index - 1 === idx}" v-for="(item, idx) in slider" :key="idx" @click="turnTo(idx)"></span>
    </div>
  </v-touch>
</template>

<script>
export default {
  data() {
    return {
      index: 1,
      btn_index: 1,
      isTrans: false,
      timer: null,
      clientWidth: 0,
    };
  },
  props: {
    slider: {
      type: Array,
      required: true,
    },
    props: {
      autoplay: true,
      default: true,
    },
  },
  methods: {
    move(e) {
      console.log(e);
    },
    prev() {
      this.isTrans = true; // 从最后一张转到第一张的时候不显示动画
      this.index = this.index - 1; // 更改坐标
      this.btn_index = this.index - 1;

      // 到达最前面一张的时候, 由于要悄悄的转回第一张 所以要关闭动画
      if (this.index === 0) {
        this.btn_index = this.cslider.length - 2;
        setTimeout(() => {
          this.isTrans = false;
          this.index = this.cslider.length - 2;
        }, 500);
      }
      this.play();
    },
    next() {
      this.isTrans = true;
      this.index = this.index + 1;
      this.btn_index = this.index;

      // 到达最后一张的时候, 由于要悄悄的转回第一张 所以要关闭动画
      if (this.index >= this.cslider.length - 1) {
        this.btn_index = 1;
        setTimeout(() => {
          this.isTrans = false;
          this.index = 1;
        }, 500);
      }
      this.play();
    },
    turnTo(index) {
      this.isTrans = true;
      this.index = index + 1;
      this.btn_index = index + 1;
      this.play();
    },
    play() {
      this.stop();
      this.timer = setTimeout(() => {
        this.next();
      }, 3000);
    },
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    },
  },
  computed: {
    cslider() {
      if (this.slider.length === 0) {
        return [{ linkUrl: '', picUrl: '' }];
      }
      const cslider = [];
      this.slider.forEach((item) => {
        cslider.push(item);
      });
      cslider.unshift(this.slider[this.slider.length - 1]);
      cslider.push(this.slider[0]);
      return cslider;
    },
  },
  mounted() {
    this.clientWidth = document.body.clientWidth;
    this.play();
  },
};
</script>

<style lang="css" scoped>
.carousel_container{
  position: relative;
  height: 3rem;
  width: 100vw;
  overflow: hidden;
}
.img_container {
  position: relative;
  display: flex;
  height: 100%;
}
.img_wrap_tran {
  transition: all .5s ease-in-out;
}
.img_item{
  width: 100vw;
  height: 100%;
}
.img_item img {
  height: 100%;
  width: 100%;
}
.wrapper_buttons{
  display: flex;
  position: absolute;
  padding: .2rem;
  left: 50%;
  transform: translateX(-50%);
  bottom: .1rem;
}
.button_item{
  display: inline-block;
  height: .1rem;
  width: .1rem;
  padding: .05rem;
  margin-left: .15rem;
  border-radius: 100%;
  background: rgba(0, 0, 0, .7);
}
.button_item.active {
  background: #fff;
}
</style>
