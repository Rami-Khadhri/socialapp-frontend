<template>
  <div class="user-form">
    <h2>{{ isEditing ? 'Update User' : 'Add User' }}</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Username -->
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          v-model="user.username"
          type="text"
          id="username"
          placeholder="Enter username"
          :class="{ 'error-border': errors.username }"
        />
        <small v-if="errors.username" class="error-msg">
          {{ errors.username }}
        </small>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          v-model="user.email"
          type="email"
          id="email"
          placeholder="Enter email"
          :class="{ 'error-border': errors.email }"
        />
        <small v-if="errors.email" class="error-msg">
          {{ errors.email }}
        </small>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          v-model="user.password"
          type="password"
          id="password"
          placeholder="Enter password"
          :class="{ 'error-border': errors.password }"
        />
        <small v-if="errors.password" class="error-msg">
          {{ errors.password }}
        </small>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-btn">
        {{ isEditing ? 'Update' : 'Create' }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserForm",
  data() {
    return {
      user: { username: "", email: "", password: "" },
      errors: {},
    };
  },
  computed: {
    isEditing() {
      return !!this.user.id;
    },
  },
  created() {
    const editingUser = this.$route.params.editingUser;
    if (editingUser) {
      this.user = { ...editingUser }; // Populate with existing user data for editing
    } else {
      const userId = this.$route.params.id;
      if (userId) {
        axios
          .get(`http://localhost:8081/api/users/${userId}`)
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.user.username) this.errors.username = "Username is required.";
      if (!this.user.email) this.errors.email = "Email is required.";
      else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.user.email))
        this.errors.email = "Enter a valid email address.";
      if (!this.user.password)
        this.errors.password = "Password is required.";
      else if (this.user.password.length < 6)
        this.errors.password = "Password must be at least 6 characters.";

      return Object.keys(this.errors).length === 0;
    },
    handleSubmit() {
      if (!this.validateForm()) return;

      const apiEndpoint = this.isEditing
        ? `http://localhost:8081/api/users/update/${this.user.id}`
        : `http://localhost:8081/api/users/create`;

      const userData = {
        username: this.user.username || undefined,
        email: this.user.email || undefined,
        password: this.user.password || undefined,
      };

      const request = this.isEditing
        ? axios.put(apiEndpoint, userData)
        : axios.post(apiEndpoint, userData);

      request
        .then(() => {
          this.$router.push("/users"); // Navigate back to user list after success
        })
        .catch((error) => console.error("Error creating/updating user:", error));
    },
  },
};
</script>

<style scoped>
.user-form {
  max-width: 450px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input.error-border {
  border-color: #ff4d4d;
}

small.error-msg {
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.submit-btn {
  width: 100%;
  padding: 10px 15px;
  background-color: #0078d7;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #005bb5;
}
</style>
