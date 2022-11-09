<template>
  <div class="wrapper">
    <notifications position="top right"/>
    <Loader />
    <router-view/>
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

body.disabledScroll {
  overflow: hidden;
}

.wrapper {
  position: relative;
  min-height: 100vh;
  background-color: $mainBG;
  color: $textColor;
  padding: 10px 10%;
}
</style>
