<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<style>
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>