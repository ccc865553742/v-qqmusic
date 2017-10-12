<template lang="html">
  <transition name="confirm_fade">
    <div class="confirm" v-show="showFlag">
      <div class="confirm_wrapper">
        <div class="confirm_content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div class="operate_btn left" @click="cancel">{{cancelBtnText}}</div>
            <div class="operate_btn" @click="confirm">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
</transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    cancelBtnText: {
      type: String,
      default: '取消',
    },
    confirmBtnText: {
      type: String,
      default: '确认',
    },
  },
  data() {
    return {
      showFlag: false,
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    cancel() {
      this.hide();
      // this.$emit('cancel')
    },
    confirm() {
      this.hide();
      this.$emit('confirm');
    },
  },
};
</script>

<style lang="css" scoped>

.confirm_fade-enter-active {
  transition: opacity .3s;
}

.confirm_fade-enter , .confirm_fade-leave-to {
  opacity: 0;
}

.confirm_fade-enter-active .confirm_content {
  animation: zoom 0.3s;
}

@keyframes zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.3);
}
.confirm .confirm_wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.confirm_content{
  width: 5.4rem;
  background: #efefef;
  border-radius: .2rem;
}
.confirm_content .text {
  font-size: .48rem;
  height: 1.2rem;
  line-height: 1.2rem;
}
.operate {
  font-size: .36rem;
  display: flex;
  align-items: center;
  border-top: .02rem solid rgba(0,0,0,.3);
}
.operate .operate_btn {
  line-height: .8rem;
  height: .8rem;
  flex: 1;
}
.operate .operate_btn.left {
  border-right: .02rem solid rgba(0,0,0,.3);
}

</style>
