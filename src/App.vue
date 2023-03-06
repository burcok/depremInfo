<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <HelloWorld />
</template>

<style>
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

:root {
  box-sizing: border-box;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
  position: relative;
  font-family: system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
  min-height: 100%;
}
</style>
