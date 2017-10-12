<template lang="html">
  <div class="loading_container">
    <div class="icon">
      <i class="icon-loading"></i>
    </div>
    <span class="text" v-if="showText">加载中</span>
  </div>
</template>

<script>
export default {
  props: {
    showText: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="css" scoped>
.loading_container{
  font-size: .36rem;
}
@keyframes loading{
from {transform: rotate(0)}
to {transform: rotate(360deg)}
}
.loading_container .icon{
  display: inline-block;
  position: relative;
  margin-right: .2rem;
  animation: loading 2s linear infinite;
}

</style>
