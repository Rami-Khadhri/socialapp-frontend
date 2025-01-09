<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container" style="height: 51px;">
        <!-- Left section -->
        <div class="left-section">
          <router-link to="/feed" class="home-link">
            <img :src="require('@/assets/trendy_logo.png')" alt="Trendy Logo" class="logo-img" />
          </router-link>
          
          
          <div class="search-wrapper" v-if="isLoggedIn">
  <div class="search-container">
    <span class="search-icon">🔍</span>
    <input 
      type="text" 
      v-model="searchQuery"
      @input="handleSearchInput"
      @focus="showDropdown = true"
      placeholder="Search Users" 
      class="search-input" 
    />
    
    <!-- Modified dropdown visibility condition -->
    <div v-show="showDropdown && searchQuery.length > 0" class="search-results-dropdown">
      <div v-if="processedSearchResults.length > 0">
        <div 
          v-for="user in processedSearchResults" 
          :key="user.id" 
          class="search-result-item"
          @click="handleUserSelect(user)"
        >
          <div class="user-result-container">
            <div class="user-photo-container">
              <img 
                :src="user.photo || user.photoUrl || require('@/assets/user.png')" 
                :alt="user.username"
                class="user-result-photo"
              />
            </div>
            <span class="user-result-username">{{ user.username }}</span>
          </div>
        </div>
      </div>
      <div v-else class="no-results">
        No users found
      </div>
    </div>
  </div>
</div></div>

        <!-- Middle section -->
        <div class="middle-section" v-if="isLoggedIn">
          <router-link to="/feed" class="nav-icon-link active">
            <svg  viewBox="0 0 1024 1024" class="nav-icon"  fill="currentColor" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M981.4 502.3c-9.1 0-18.3-2.9-26-8.9L539 171.7c-15.3-11.8-36.7-11.8-52 0L70.7 493.4c-18.6 14.4-45.4 10.9-59.7-7.7-14.4-18.6-11-45.4 7.7-59.7L435 104.3c46-35.5 110.2-35.5 156.1 0L1007.5 426c18.6 14.4 22 41.1 7.7 59.7-8.5 10.9-21.1 16.6-33.8 16.6z" fill="CurrentColor"></path><path d="M810.4 981.3H215.7c-70.8 0-128.4-57.6-128.4-128.4V534.2c0-23.5 19.1-42.6 42.6-42.6s42.6 19.1 42.6 42.6v318.7c0 23.8 19.4 43.2 43.2 43.2h594.8c23.8 0 43.2-19.4 43.2-43.2V534.2c0-23.5 19.1-42.6 42.6-42.6s42.6 19.1 42.6 42.6v318.7c-0.1 70.8-57.7 128.4-128.5 128.4z" fill="currentColor"></path></g></svg>
            <span class="nav-label">Home</span>
          </router-link>
          <router-link to="/users" class="nav-icon-link" v-if="isAdmin">
            <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
              <path d="M10.5 18.5C10.5 19.3284 9.82843 20 9 20H4C3.17157 20 2.5 19.3284 2.5 18.5V13.5C2.5 12.6716 3.17157 12 4 12H9C9.82843 12 10.5 12.6716 10.5 13.5V18.5ZM21.5 18.5C21.5 19.3284 20.8284 20 20 20H15C14.1716 20 13.5 19.3284 13.5 18.5V13.5C13.5 12.6716 14.1716 12 15 12H20C20.8284 12 21.5 12.6716 21.5 13.5V18.5ZM10.5 7.5C10.5 8.32843 9.82843 9 9 9H4C3.17157 9 2.5 8.32843 2.5 7.5V2.5C2.5 1.67157 3.17157 1 4 1H9C9.82843 1 10.5 1.67157 10.5 2.5V7.5ZM21.5 7.5C21.5 8.32843 20.8284 9 20 9H15C14.1716 9 13.5 8.32843 13.5 7.5V2.5C13.5 1.67157 14.1716 1 15 1H20C20.8284 1 21.5 1.67157 21.5 2.5V7.5Z"></path>
            </svg>
            <span class="nav-label">Users</span>

          </router-link>

          <router-link to="/chat" class="nav-icon-link" v-if="isLoggedIn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    class="sparkle"
  >
    <!-- Gradient Definitions -->
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color: #6ee7b7; stop-opacity: 1" />
        <stop offset="100%" style="stop-color: #3b82f6; stop-opacity: 1" />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color: #f472b6; stop-opacity: 1" />
        <stop offset="100%" style="stop-color: #9333ea; stop-opacity: 1" />
      </linearGradient>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color: #eab308; stop-opacity: 1" />
        <stop offset="100%" style="stop-color: #f59e0b; stop-opacity: 1" />
      </linearGradient>
    </defs>
    
    <!-- Paths with Gradient Colors -->
    <path
      class="path"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="url(#grad1)"
      fill="url(#grad1)"
      d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
    ></path>
    <path
      class="path"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="url(#grad2)"
      fill="url(#grad2)"
      d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
    ></path>
    <path
      class="path"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="url(#grad3)"
      fill="url(#grad3)"
      d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
    ></path>
  </svg>
  <span class="nav-label">Chat</span>
</router-link>


<router-link :to="'/profilepage/' + user.id" class="nav-icon-link">
  <svg viewBox="0 0 24 24" class="nav-icon" fill="currentColor">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"></path>
  </svg>
  <span class="nav-label">Profile</span>
</router-link>

        </div>

        <div class="right-section" v-if="isLoggedIn">
    <button class="action-btn" @click="toggleNotificationsDropdown">
      <span class="action-icon">🔔</span>
      <span v-if="unreadNotificationsCount > 0" class="notification-badge">
        {{ unreadNotificationsCount }}
      </span>
    </button>

    <!-- Updated Notifications Dropdown -->
    <div v-if="showNotificationsDropdown" class="notifications-dropdown">
      <div v-if="loadingNotifications" class="loading-notifications">
        Loading notifications...
      </div>
      <ul v-else-if="unreadNotifications.length > 0">
        <li v-for="notification in unreadNotifications" :key="notification.id" class="notification-item">
          <p>{{ notification.message }}</p>
          <small>{{ formatDate(notification.createdAt) }}</small>
          <button @click="markNotificationAsRead(notification.id)" class="mark-as-read-btn">
            Mark as Read
          </button>
        </li>
      </ul>
      <div v-else class="no-notifications">
        No new notifications
      </div>
    </div>
          <template v-if="isLoggedIn">
            <button class="action-btn">
              <span class="action-icon">💬</span>
            </button>



            <div class="dropdown">
              <button class="profile-btn">
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

              <div class="dropdown-content">
                <router-link to="/profile" class="dropdown-item">Settings</router-link>
                <button @click="logout" class="dropdown-item">Logout</button>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link to="/login" class="auth-link">Login</router-link>
            <router-link to="/register" class="signup-btn">Sign up</router-link>
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
      user: null,
      isAdmin: false,
      searchQuery: '',
      searchResults: [],
      showDropdown: false,
      searchTimeout: null,
      messages: [],
      menuOpen: false,
      dropdownOpen: false,
      notifications: [], // List of all notifications
      showNotificationsDropdown: false, // Controls visibility of dropdown
      loadingNotifications: false,
      currentUserId: null, // Add this to store the current user's ID
      processedSearchResults: []
    };
  },
  computed: {
    userInitials() {
      return this.user?.username?.substring(0, 2).toUpperCase() || 'U';
    },
    unreadMessages() {
      return this.messages.filter(m => !m.read).length;
    },
    unreadNotificationsCount() {
      return this.notifications.filter((n) => !n.read).length;
    },
    // Get only unread notifications
    unreadNotifications() {
      return this.notifications.filter((n) => !n.read);
    },
  },
  methods: {
    async login() {
      this.$router.push('/login');
    },
    async logout() {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      this.$router.push('/login');
      try {
        await axios.post('http://localhost:8081/api/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        this.isLoggedIn = false;
        this.user = null;
        this.$router.push('/login');
      }
    },
    getUserPhoto(user) {
      if (user.photo) {
        return user.photo.startsWith('data:image') 
          ? user.photo 
          : `data:image/jpeg;base64,${user.photo}`;
      }
      return '/default-avatar.png';
    },
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.handleNoAuth();
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
          photoData = photoResponse.data.photo 
            ? `data:image/jpeg;base64,${photoResponse.data.photo}` 
            : null;
        }
        
        this.user = {
          id:response.data.id,
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
        this.currentUserId = this.user.id;
       
        if(localStorage.getItem('role') == 'ROLE_ADMIN'){
          this.isAdmin= true;
        }
        
        // Fetch additional user data after successful authentication
        await this.fetchUserNotifications();
        await this.fetchUserMessages();
      } catch (error) {
        this.handleAuthError(error);
      }
    },
    handleNoAuth() {
      this.isLoggedIn = false;
      this.user = null;
      if (this.$route.meta.requiresAuth) {
        this.$router.push('/login');
      }
    },
    handleAuthError(error) {
      console.error('Authentication error:', error);
      this.logout();
    },
    async fetchUserNotifications() {
      try {
        const response = await axios.get('http://localhost:8081/api/notifications', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.notifications = response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },
    async fetchUserMessages() {
      try {
        const response = await axios.get('http://localhost:8081/api/messages', {
          headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.messages = response.data;
      } catch (error) {
      console.error('Error fetching messages:', error);
    }
    },
    // Add these to your existing methods
    async handleSearchInput() {
      // Show dropdown as soon as user starts typing
      this.showDropdown = true;
      
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(async () => {
        if (this.searchQuery.trim().length > 0) {
          this.isLoading = true;
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8081/api/users/search`, {
              params: { q: this.searchQuery },
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            // Filter out current user
            const filteredUsers = response.data.filter(
              user => user.username !== this.user?.username
            );
            
            // Process photos
            this.processedSearchResults = await Promise.all(
              filteredUsers.map(async (user) => {
                try {
                  const photoData = await this.fetchUserPhoto(user.username);
                  return {
                    ...user,
                    
                    photo: photoData || null
                  };
                } catch (error) {
                  return {
                    ...user,
                    photo: null
                  };
                }
              })
            );

            console.log('Processed results:', this.processedSearchResults); // Debug log
          } catch (error) {
            console.error('Error searching users:', error);
            this.processedSearchResults = [];
          } finally {
            this.isLoading = false;
          }
        } else {
          this.processedSearchResults = [];
        }
      }, 300);
    },

    async fetchUserPhoto(username) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8081/api/users/photo/${username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.photo;
      } catch (error) {
        console.error('Error fetching user photo:', error);
        return null;
      }
    },

    handleUserSelect(user) {
      this.$router.push(`/profilepage/${user.id}`);
      this.searchQuery = '';
      this.showDropdown = false;
      this.processedSearchResults = [];
    },

    handleClickOutside(event) {
      if (!event.target.closest('.search-wrapper')) {
        this.showDropdown = false;
      }
    
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdowns() {
      this.menuOpen = false;
      this.dropdownOpen = false;
    },

    async fetchNotifications() {
  this.loadingNotifications = true;
  try {
    const response = await axios.get('http://localhost:8081/api/notifications', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    // No need to pass userId anymore, the backend handles it
    this.notifications = response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
  } finally {
    this.loadingNotifications = false;
  }
},

// Update the markNotificationAsRead method:
async markNotificationAsRead(notificationId) {
  try {
    await axios.put(`http://localhost:8081/api/notifications/${notificationId}/read`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    // Remove the notification from the local array
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
},

    toggleNotificationsDropdown() {
      this.showNotificationsDropdown = !this.showNotificationsDropdown;
      if (this.showNotificationsDropdown) {
        this.fetchNotifications(); // Refresh notifications when opening dropdown
      }
    },

    // Format Date for Display
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
  created() {
    this.fetchUserProfile();
    // Add event listener for closing dropdowns when clicking outside
    document.addEventListener('click', this.closeDropdowns);
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  // Fetch notifications every 30 seconds
  this.notificationInterval = setInterval(() => {
    if (this.isLoggedIn) {
      this.fetchNotifications();
    }
  }, 30000);
},
  beforeUnmount() {
    if (this.notificationInterval) {
    clearInterval(this.notificationInterval);
  }
    document.removeEventListener('click', this.closeDropdowns);
  },
  watch: {
    searchQuery(newValue) {
      if (!newValue) {
        this.processedSearchResults = [];
      }},
    '$route'() {
      // Close dropdowns on route change
      this.closeDropdowns();
    }
  }
};
</script>
<style scoped>
#app {
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
}

.navbar {
  background: linear-gradient(135deg, #4444e4 0%, #6c029e 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 0.75rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;

}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1920px;
  margin: 0 auto;
  gap: 2rem;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;
}

.logo-img {
  height: 60px;
  width: 63px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.search-wrapper {
  flex: 1;
  max-width: 480px;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.75rem 1rem 0.75rem 3rem;
  width: 100%;
  font-size: 0.95rem;
  color: white;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  outline: none;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
}


.nav-icon-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1.5rem;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}


.nav-label {
  font-size: 0.7rem;
  font-weight: 450;
}

.nav-icon-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-icon-link.active {
  color: #60a5fa;
  background-color: rgba(96, 165, 250, 0.1);
}

.right-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-btn {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 12px;
  width: 40px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.action-icon {
  font-size: 1.25rem;
  color: white;
}

.profile-btn {
  background: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.profile-btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
}

.profile-photo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
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
  right: 0;
  top: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  min-width: 220px;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  display: block;
  text-decoration: none;
  color: #1f2937;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.auth-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.auth-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.signup-btn {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
}

.signup-btn:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  transform: translateY(-1px);
}

.main-content {
 padding-top: 0.1rem;
  min-height: calc(70vh - 60px);
}


.right-section{
  position: absolute;
  right: 20px;
}

.left-section{
  position: absolute; 
  left: 12px;
}
.middle-section {
  display: flex;
  justify-content: space-between; /* Adds space between items */
  gap: 75px; /* Adds a fixed gap between the items */
}
.middle-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* Notifications Dropdown Styling */
.notifications-dropdown {
  max-height: 400px;
  overflow-y: auto;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  width: 320px;
  position: absolute;
  top: 60px;
  right: 15px;
  transition: all 0.3s ease-in-out;
  animation: fadeIn 0.4s ease-out;
  z-index: 1000;
}

/* Notification Item Styling */
.notification-item {
  padding: 12px 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.notification-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

.notification-item p {
  margin: 0;
  font-weight: 500;
}

.notification-item small {
  margin-top: 5px;
  font-size: 0.8rem;
  color: #888;
}

/* Notification Badge */
.notification-badge {
  position: absolute;
  top: -7px;
  right: 110px;
  background-color: #ff4d4d;
  color: white;
  border-radius:100%;
  padding: 5px 8px;
  font-size: 0.6rem;
  font-weight: bold;
}

/* Button to Mark Notification as Read */
.mark-as-read-btn {
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
  text-align: right;
  margin-top: 8px;
}

.mark-as-read-btn:hover {
  text-decoration: underline;
}

/* "No Notifications" Styling */
.no-notifications {
  text-align: center;
  padding: 15px;
  color: #999;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  background-color: #f1f1f1;
}

/* Loading State */
.loading-notifications {
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: #007bff;
  margin-top: 10px;
}

/* Fade-in Animation for Dropdown */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-icon-link:hover svg path {
  fill: url(#grad3); /* Change to a different gradient or effect */
  transition: fill 0.3s ease-in-out;
}
.nav-icon-link svg {
  width: 32px;  /* Adjust width */
  height: 32px; /* Adjust height */
  transition: transform 0.3s ease-in-out; /* Smooth scale effect */
}

.nav-icon-link:hover svg {
  transform: scale(1.2); /* Slightly enlarge on hover */
}
.search-results-dropdown {
  position: absolute;
  top: calc(100% + 5px); /* Adjusted positioning */
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: 300px;
  overflow-y: auto;
  z-index: 9999; /* Increased z-index */
  margin-top: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.search-result-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background-color: #f3f4f6;
}

.user-result-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-photo-container {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f3f4f6;
  flex-shrink: 0;
}

.user-result-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-result-username {
  color: #1f2937;
  font-size: 0.95rem;
  font-weight: 500;}
</style>