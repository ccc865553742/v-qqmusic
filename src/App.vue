<template>
  <div id="app">
    <v-header class="header"></v-header>
    <tab class="tab"></tab>
    <div style="margin-top:1.66rem"></div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div style="height:1.2rem" v-show="currentIndex !== -1"></div>
    <player></player>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import header from "./components/header/header";
import tab from "./components/tab/tab";
import player from "./components/player/player";

export default {
  name: "app",
  components: {
    "v-header": header,
    tab,
    player
  },
  computed: {
    ...mapGetters(["currentIndex"])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 7.5rem;
  height: 100vh;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
*::-webkit-scrollbar {
  display: none;
}

.header {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
}
.tab {
  position: fixed;
  /*color: #2c3e50;*/
  background: #fff;
  top: 0.88rem;
  z-index: 10;
}
</style>
