<template>
  <div  class="preloader" :class="{'showLoader': isLoading}">
    <div class="preloader__spinner"></div>
  </div>
</template>

<script setup>
import useBaseStore from '@/store/baseStore';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const baseStore = useBaseStore();

const { isLoading } = storeToRefs(baseStore);

// const handleLoaderStatusUpdate = () => {
//   if (isLoading.value) {
//     window.scroll(0, 0);
//     // document.body.classList.add('disabledScroll');
//   } 
//   // else document.body.classList.remove('disabledScroll');
// };

// watch(isLoading, () => {
//   handleLoaderStatusUpdate();
// });
</script>

<style lang="scss">
  .preloader {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  &__spinner {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 80px;
    height: 80px;
    margin: -80px 0 0 -40px;
    border-radius: 50%;

    &::after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid $contrastColor;
      border-color: $contrastColor transparent $contrastColor transparent;
      animation: loader-spin 1.2s linear infinite;
    }
  }

  &.showLoader{
    display: block;
    background-color: $mainBGTransparent;
    z-index: 11;
  }
}

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>