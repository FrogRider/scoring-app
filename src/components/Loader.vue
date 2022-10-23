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
  place-items: center;
  display: none;
  position: fixed;
  left: 50%;
  top: 50%;
  translate: (-50%, -50%);
  &__spinner {
    display: inline-block;
    width: 80px;
    height: 80px;

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
    display: grid;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
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