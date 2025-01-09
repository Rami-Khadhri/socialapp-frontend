<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/feed" class="home-link">
        <img :src="require('@/assets/trendy_logo.png')" alt="My Image" style="height: 62px; width: 80px;" />
      </router-link>

      <div class="container">
        <div class="logo"></div>

        <div class="nav-links">
          <template v-if="isLoggedIn">
            <router-link to="/feed" class="nav-link">Home</router-link>

            <router-link to="/users" class="nav-link">Admin Dashboard</router-link>

            <div class="dropdown">
              <!-- User Photo as Dropdown Trigger -->
              <button class="dropdown-btn">
                <div class="profile-photo">
                  <img
                    v-if="user.isGoogleUser"
                    :src="user.photoUrl"
                    alt="User Photo"
                    class="user-photo"
                  />
                  <img
                    v-else-if="!user.isGoogleUser && user.photo"
                    :src="getUserPhoto(user)"
                    alt="User Photo"
                    class="user-photo"
                  />
                  <img
                    v-else
                    src="@/assets/user.png"
                    alt="Default Photo"
                    class="user-photo"
                  />
                </div>
              </button>

              <!-- Dropdown Content -->
              <div class="dropdown-content">
                <router-link to="/profile" class="dropdown-item">Profile</router-link>
                <button @click="logout" class="dropdown-item">Logout</button>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/register" class="signup-btn">Signup</router-link>
            <router-link to="/profilepage" class="signup-btn">profilepage</router-link>
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
import axios from 'axios';
export default {

  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      user: null
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/login');
    },
    getUserPhoto(user) {
      // Check if the user's photo is available and handle accordingly
      if (user.photo) {
        return user.photo.startsWith('data:image') ? user.photo : `data:image/jpeg;base64,${user.photo}`;
      }
      return '/default-avatar.png';  // Default image if photo is not available
    },
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.$router.push('/login');
          return;
        }

        const response = await axios.get('http://localhost:8081/api/auth/verify-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        let photoData = null;
        if (!response.data.googleUser) {
          const photoResponse = await axios.get('http://localhost:8081/api/users/photo', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          photoData = photoResponse.data.photo ? `data:image/jpeg;base64,${photoResponse.data.photo}` : null;
        }

        this.user = {
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          verified: response.data.verified,
          enabled: response.data.enabled,
          photo: photoData,
          photoUrl: response.data.photoUrl,
          isGoogleUser: response.data.googleUser
        };
        this.isLoggedIn = true;
      } catch (error) {
        this.logout();
      }
    }
  },
  created() {
    this.fetchUserProfile();
  }
};
</script>

<style scoped>
#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;

}
/* Navbar styles */
.navbar {
  background: linear-gradient(to right, #ffffff, #cc87e6, #f030ba);
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: sticky;
  top: 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
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

/* Dropdown styles */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.profile-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.user-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 8px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-item {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  color: #333;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

.nav-link,
.signup-btn {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #d1d5db;
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
