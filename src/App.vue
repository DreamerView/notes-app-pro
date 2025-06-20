<template>
  <h1 class="text-center">📒 Notes App Pro</h1>
  <router-view />
</template>

<script setup>
  import {onMounted} from 'vue';
  onMounted(()=>{
    document.body.classList.add("bg-body-tertiary");
  })
</script>

<style>
body {
  font-family: sans-serif;
  margin: 2rem;
}
</style>
