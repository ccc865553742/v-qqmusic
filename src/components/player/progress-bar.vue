<template lang="html">
  <div class="progress_bar_wrapper" ref="progressBar">
      <div class="bar_inner" >
        <div class="progress" ref="progress" ></div>
        <div class="progress_btn_wrapper" >
          <div class="progress_btn" ref="progressBtn"></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="css">
</style>
