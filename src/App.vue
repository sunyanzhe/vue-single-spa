<template>
  <div id="app">
      <ul class="nav">
        <li>
            <router-link to="/app1">APP1</router-link>
        </li>
        <li>
            <router-link to="/app1/about">APP1-About</router-link>
        </li>
        <li>
            <router-link to="/app2">APP2</router-link>
        </li>
      </ul>
      <div class="content">
          <div id="app1" class="single-spa-vue"></div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  min-height: 500px;
}
.nav {
    flex-basis: 150px;
}
.content {
    flex-grow: 2;
    padding: 10px;
    position: relative;
    background: #f0f0f0;
}

</style>
