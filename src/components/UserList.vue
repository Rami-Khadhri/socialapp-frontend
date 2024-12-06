<template>
  <div class="dashboard-container">
    <!-- Top Navigation Bar -->
    <header class="top-nav">
      <h1>Admin Dashboard</h1>
      <div class="nav-right">
        <div class="search-bar">
          <input
            type="text"
            placeholder="Search users..."
            v-model="searchQuery"
            @input="filterUsers"
          />
          <i class="fas fa-search"></i>
        </div>
        <div class="user-menu">
          <img
            :src="currentUser.photo || '/default-avatar.png'"
            alt="Admin"
            class="user-avatar"
          />
          <span>{{ currentUser.username }}</span>
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Stats Overview -->
      <section class="stats-overview">
        <div class="stat-card" v-for="stat in stats" :key="stat.title">
          <i :class="stat.icon" class="stat-icon"></i>
          <div>
            <h3>{{ stat.title }}</h3>
            <p>{{ stat.value }}</p>
          </div>
        </div>
      </section>

      <!-- Users Management Table -->
      <section class="users-table">
        <div class="table-header">
          <h2>All Users</h2>
          <button @click="fetchStats" class="refresh-btn">
            Refresh Data
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>
  <img 
    :src="user.photoUrl || (user.photo ? `data:image/jpeg;base64,${user.photo}` : '/default-avatar.png')" 
    alt="users-photo" 
    class="user-avatar" 
  />
</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              
              <td>
                <button @click="openEditModal(user)" class="edit-btn">Edit</button>
                <button @click="confirmDeleteUser(user.id)" class="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="!filteredUsers.length" class="no-data">
          No users found.
        </p>
      </section>
    </main>
    
    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click.self="closeEditModal">
      <div class="edit-modal">
        <h2>Edit User</h2>
        <form @submit.prevent="saveUserEdit">
          <div class="form-group">
            <label>Username</label>
            <input 
              v-model.trim="editingUser.username" 
              type="text" 
              required 
              @input="validateUsername"
            />
            <span v-if="validationErrors.username" class="error-message">
              {{ validationErrors.username }}
            </span>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input 
              v-model.trim="editingUser.email" 
              type="email" 
              required 
              @input="validateEmail"
            />
            <span v-if="validationErrors.email" class="error-message">
              {{ validationErrors.email }}
            </span>
          </div>

          <div class="form-group">
            <label>Role</label>
            <select v-model="editingUser.role" required>
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>

          <div class="form-group">
            <label>Account Status</label>
            <div class="toggle-switch">
              <input 
                type="checkbox" 
                v-model="editingUser.enabled" 
                id="account-status"
              />
              <label for="account-status">
                {{ editingUser.enabled ? 'Active' : 'Inactive' }}
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Verification Status</label>
            <div class="toggle-switch">
              <input 
                type="checkbox" 
                v-model="editingUser.verified" 
                id="verification-status"
              />
              <label for="verification-status">
                {{ editingUser.verified ? 'Verified' : 'Unverified' }}
              </label>
            </div>
          </div>

          <div class="modal-actions">
            <button 
              type="submit" 
              class="save-btn"
              :disabled="!isFormValid"
            >
              Save Changes
            </button>
            <button 
              type="button" 
              class="cancel-btn" 
              @click="closeEditModal"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      stats: [
        { title: "Total Users", value: 0, icon: "fas fa-users" },
        { title: "New Users", value: 0, icon: "fas fa-user-plus" }
      ],
      users: [],
      filteredUsers: [],
      searchQuery: "",
      showEditModal: false,
      currentUser: {
        username: "",
        photo: null,
        role: ""
      },
      editingUser: {
        id: null,
        username: '',
        email: '',
        role: 'ROLE_USER',
        enabled: true,
        verified: false
      },
      validationErrors: {
        username: '',
        email: ''
      }
    };
  },
  computed: {
    isFormValid() {
      return this.editingUser.username && 
             this.editingUser.email && 
             !this.validationErrors.username && 
             !this.validationErrors.email;
    }
  },
  methods: {
    validateUsername() {
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(this.editingUser.username)) {
        this.validationErrors.username = 'Username must be 3-20 characters, alphanumeric or underscore';
      } else {
        this.validationErrors.username = '';
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.editingUser.email)) {
        this.validationErrors.email = 'Invalid email format';
      } else {
        this.validationErrors.email = '';
      }
    },
    filterUsers() {
      if (!this.searchQuery) {
        this.filteredUsers = this.users;
      } else {
        const query = this.searchQuery.toLowerCase();
        this.filteredUsers = this.users.filter(user => 
          user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
        );
      }
    },
    async fetchCurrentUserProfile() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }

    try {
      // Fetch current user's profile
      const userResponse = await axios.get("http://localhost:8081/api/auth/verify-token", {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Determine photo source
      let userPhoto;
      if (userResponse.data.photoUrl) {
        // For users with URL-based photos (e.g., Google users)
        userPhoto = userResponse.data.photoUrl;
      } else {
        // For users with binary photos
        const photoResponse = await axios.get("http://localhost:8081/api/users/photo", {
          headers: { Authorization: `Bearer ${token}` }
        });

        userPhoto = photoResponse.data.photo 
          ? `data:image/jpeg;base64,${photoResponse.data.photo}` 
          : '/default-avatar.png';
      }

      this.currentUser = {
        username: userResponse.data.username,
        role: userResponse.data.role,
        photo: userPhoto
      };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.logout();
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("Error fetching current user profile:", error);
    this.$toast.error('Error fetching profile. Please try again.');
    this.logout();
  }
},
async fetchStats() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8081/api/users/all", {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Check if user has admin role
    if (this.currentUser.role !== 'ROLE_ADMIN') {
      this.$router.push("/unauthorized");
      return;
    }

    // Process users to fetch their photos
    const usersWithPhotos = await Promise.all(response.data.map(async (user) => {
      try {
        // If user has photoUrl, use that
        if (user.photoUrl) {
          return { ...user, photoUrl: user.photoUrl };
        }

        // Otherwise, fetch user photo
        const photoResponse = await axios.get(`http://localhost:8081/api/users/photo/${user.username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // If photo exists, add it to the user object
        if (photoResponse.data.photo) {
          return { 
            ...user, 
            photoUrl: `data:image/jpeg;base64,${photoResponse.data.photo}` 
          };
        }

        // If no photo, use default
        return { 
          ...user, 
          photoUrl: '/default-avatar.png' 
        };
      } catch (photoError) {
        console.error(`Error fetching photo for user ${user.username}:`, photoError);
        return { 
          ...user, 
          photoUrl: '/default-avatar.png' 
        };
      }
    }));

    // Total Users
    this.stats[0].value = usersWithPhotos.length;

    // Count New Users (users created in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newUsers = usersWithPhotos.filter(user => 
      new Date(user.createdAt) > thirtyDaysAgo
    );
    this.stats[1].value = newUsers.length;

    this.users = usersWithPhotos;
    this.filteredUsers = usersWithPhotos;
  } catch (error) {
    console.error("Error fetching stats:", error);
    this.$router.push("/login");
  }
},
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    openEditModal(user) {
      this.editingUser = { 
        ...user,
        // Reset validation errors when opening modal
        username: user.username,
        email: user.email 
      };
      this.validationErrors = { username: '', email: '' };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.resetEditingUser();
    },
    resetEditingUser() {
      this.editingUser = {
        id: null,
        username: '',
        email: '',
        role: 'ROLE_USER',
        enabled: true,
        verified: false
      };
    },
    async saveUserEdit() {
      try {
        // Additional client-side validation
        this.validateUsername();
        this.validateEmail();

        if (!this.isFormValid) {
          this.$toast.error('Please correct form errors before submitting');
          return;
        }

        const token = localStorage.getItem('token');
        const response = await axios.put(
          `http://localhost:8081/api/users/update/${this.editingUser.id}`, 
          {
            username: this.editingUser.username,
            email: this.editingUser.email,
            role: this.editingUser.role,
            enabled: this.editingUser.enabled,
            verified: this.editingUser.verified
          },
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Update local user list
        const index = this.users.findIndex(u => u.id === this.editingUser.id);
        if (index !== -1) {
          this.users[index] = response.data;
          this.filterUsers(); // Re-apply any active search filter
        }

        this.$toast.success('User updated successfully');
        this.closeEditModal();
      } catch (error) {
        console.error('Error updating user:', error);
        
        // More specific error handling
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data.message || 'Failed to update user';
          
          switch (status) {
            case 400:
              this.$toast.error('Invalid user data. Please check your input.');
              break;
            case 403:
              this.$toast.error('You do not have permission to update this user.');
              break;
            case 404:
              this.$toast.error('User not found.');
              break;
            default:
              this.$toast.error(message);
          }
        } else {
          this.$toast.error('Network error. Please try again.');
        }
      }
    },
    confirmDeleteUser(userId) {
      this.$dialog.confirm({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this user?',
        onConfirm: () => this.deleteUser(userId)
      });
    },
    async deleteUser(userId) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8081/api/users/delete/${userId}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Remove user from local list
        this.users = this.users.filter(user => user.id !== userId);
        this.filterUsers(); // Re-apply any active search filter
        
        this.$toast.success('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        
        // Detailed error handling
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data.message || 'Failed to delete user';
          
          switch (status) {
            case 403:
              this.$toast.error('You do not have permission to delete this user.');
              break;
            case 404:
              this.$toast.error('User not found.');
              break;
            default:
              this.$toast.error(message);
          }
        } else {
          this.$toast.error('Network error. Please try again.');
        }
      }
    }
  },
  async mounted() {
    // Install recommended plugins for toast and dialog
    this.$toast = {
      success: (msg) => alert(msg), // Placeholder, replace with actual toast library
      error: (msg) => alert(msg)
    };
    this.$dialog = {
      confirm: ({ message, onConfirm }) => {
        if (window.confirm(message)) {
          onConfirm();
        }
      }
    };

    await this.fetchCurrentUserProfile();
    this.fetchStats();
  }
};
</script>

<style>
/* General styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* Top Navigation */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0078d7;
  color: white;
  padding: 15px 20px;
}

.top-nav h1 {
  margin: 0;
}

.nav-right {
  display: flex;
  align-items: center;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 20px;
}

.search-bar input {
  border: none;
  outline: none;
  width: 150px;
  margin-right: 5px;
}

.search-bar i {
  color: #0078d7;
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

/* Main Content */
.main-content {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 60px);
}

.stats-overview {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card .stat-icon {
  font-size: 30px;
  color: #0078d7;
}

/* Users Table */
.users-table {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.table-header h2 {
  margin: 0;
}

.refresh-btn {
  background-color: #0078d7;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.refresh-btn:hover {
  background-color: #005bb5;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #0078d7;
  color: white;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.edit-btn,
.delete-btn {
  background-color: #0078d7;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn {
  background-color: #d9534f;
}

.edit-btn:hover {
  background-color: #005bb5;
}

.delete-btn:hover {
  background-color: #c9302c;
}

.no-data {
  text-align: center;
  color: gray;
  margin-top: 10px;
}
.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}

.logout-btn {
  margin-left: 10px;
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #c9302c;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.edit-modal {
  background-color: white;
  width: 450px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.edit-modal h2 {
  text-align: center;
  color: #0078d7;
  margin-bottom: 25px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #0078d7;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 120, 215, 0.2);
}

.toggle-switch {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toggle-switch input[type="checkbox"] {
  appearance: none;
  width: 40px;
  height: 20px;
  background-color: #ddd;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-switch input[type="checkbox"]::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: white;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
}

.toggle-switch input[type="checkbox"]:checked {
  background-color: #0078d7;
}

.toggle-switch input[type="checkbox"]:checked::before {
  transform: translateX(20px);
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.save-btn, 
.cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-btn {
  background-color: #0078d7;
  color: white;
}

.save-btn:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: #f1f1f1;
  color: #333;
}

.save-btn:hover:not(:disabled) {
  background-color: #005bb5;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.error-message {
  color: #d9534f;
  font-size: 0.8em;
  margin-top: 5px;
}
</style>
