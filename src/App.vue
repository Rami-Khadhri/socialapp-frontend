<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <div class="logo">
          <router-link to="/feed" class="home-link">  <img :src="require('@/assets/trendy_logo.png')" alt="My Image" style="height:68px;width: 90px;"></router-link>
        </div>

        <div class="nav-links">
          <template v-if="isLoggedIn">
            <router-link to="/profile" class="nav-link">Profile</router-link>
            <router-link to="/feed" class="nav-link">Accueil</router-link>
            <router-link to="/users" class="nav-link">Admin Dashboard</router-link>
            <button @click="logout" class="logout-btn">Logout</button>
          </template>
          <template v-else>
            <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/register" class="signup-btn">Signup</router-link>
          </template>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  },
  created() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }
};
</script>

<style scoped>
/* Navbar styles */
.navbar {
  background: linear-gradient(to right, #4f46e5, #7c3aed, #ec4899);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 
  position: sticky;
  top:0px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.125rem;
  font-weight: bold;
}

.home-link {
  color: white;
  text-decoration: none;
}

.home-link:hover {
  color: #d1d5db;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #d1d5db;
}

.logout-btn {
  background-color: #e11d48;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #dc2626;
}

.signup-btn {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.signup-btn:hover {
  background-color: #1d4ed8;
}

/* Main content styles */
.main-content {
  padding: 2rem;
}
</style>
