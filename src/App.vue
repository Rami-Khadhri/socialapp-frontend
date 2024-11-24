<template>
  <div id="app">
    <nav>
      <router-link to="/">Login</router-link> |
      <router-link to="/users">Admin dashboard</router-link>
      
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>


<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: purple;
}

nav a.router-link-active {
  font-weight: bold;
  color: #35495e;
}

main {
  padding: 20px;
}
</style>
