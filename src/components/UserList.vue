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
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button @click="editUser(user)" class="edit-btn">Edit</button>
                <button @click="deleteUser(user.id)" class="delete-btn">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      stats: [
        {
          title: "Total Users",
          value: 0,
          icon: "fas fa-users",
        },
        {
          title: "New Users",
          value: 0,
          icon: "fas fa-user-plus",
        },
      ],
      users: [],
      filteredUsers: [],
      searchQuery: "",
      currentUser: {
        username: "Admin",
        photo: null, // Add photo URL if available
      },
    };
  },
  methods: {
    async fetchStats() {
      try {
        const response = await axios.get("http://localhost:8081/api/users/all", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.stats[0].value = response.data.length; // Total Users
        this.users = response.data;
        this.filteredUsers = response.data; // For search
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    },
    filterUsers() {
      this.filteredUsers = this.users.filter((user) =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:8081/api/users/delete/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("User deleted successfully");
        this.fetchStats(); // Refresh data
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    editUser(user) {
      alert(`Editing user: ${user.username}`);
      // Add your edit logic here
    },
  },
  mounted() {
    this.fetchStats();
  },
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
</style>
