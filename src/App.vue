<template>
  <div class="wrapper">
    <div class="container">
      <Loader />
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import Loader from '@/components/Loader.vue';

</script>

<style lang="scss">
@import "./assets/main.css";

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  font-family: 'Montserrat';
  background-color: $mainBG;
}

.wrapper {
  height: 100vh;
  overflow-y: scroll;
  background-color: $mainBG;
  color: $textColor;
  padding: 10px 0;
}

.container {
  width: 80%;
  margin: auto;
}
</style>
