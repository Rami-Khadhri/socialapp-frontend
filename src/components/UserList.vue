<template>
  <!-- Delete Confirmation Modal -->
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold text-gray-900">Confirm Delete</h3>
        <button @click="onCancel" class="text-gray-400 hover:text-gray-500">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-4">
        <p class="text-sm text-gray-500">Are you sure you want to delete this user? This action cannot be undone.</p>
      </div>
      <div class="mt-6 flex justify-end space-x-4">
        <button @click="onCancel" class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          Cancel
        </button>
        <button @click="onConfirm" class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  </div>

  <!-- Toast Notifications -->
  <div class="fixed right-4 top-4 z-50 flex flex-col gap-2">
    <div v-for="toast in toasts" :key="toast.id"
      :class="[
        'min-w-[300px] transform rounded-lg p-4 shadow-lg transition-all duration-300',
        toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500',
        'animate-slideIn'
      ]">
      <div class="flex items-center justify-between text-white">
        <div class="flex items-center space-x-2">
          <svg v-if="toast.type === 'success'" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <svg v-else class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span class="font-medium">{{ toast.message }}</span>
        </div>
        <button @click="removeToast(toast.id)" class="ml-4 text-white hover:text-gray-100">×</button>
      </div>
    </div>
  </div>

  <!-- Main Dashboard -->
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation -->
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <router-link to="/chart" class="button-chart">Chart of Posts Monthly</router-link>
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input type="text" v-model="searchQuery" @input="filterUsers"
              class="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              placeholder="Search users..." />
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <!-- Stats Overview -->
      <div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.title"
          class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <i :class="stat.icon" class="h-6 w-6 text-gray-400"></i>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dt class="truncate text-sm font-medium text-gray-500">{{ stat.title }}</dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stat.value }}</dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="overflow-hidden rounded-lg bg-white shadow">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-lg font-medium text-gray-900">Users Management</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Photo</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Username</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4">
                  <img :src="user.photoUrl || (user.photo ? `data:image/jpeg;base64,${user.photo}` : '/default-avatar.png')"
                    class="h-10 w-10 rounded-full object-cover" alt="User avatar" />
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ user.username }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ user.email }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <span :class="[
                    'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                    user.role === 'ROLE_ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  ]">
                    {{ user.role === 'ROLE_ADMIN' ? 'Admin' : 'User' }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <span v-if="user.verified" class="inline-flex items-center text-green-600">
                    <svg class="mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Verified
                  </span>
                  <span v-else class="inline-flex items-center text-gray-500">
                    <svg class="mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                    Not Verified
                  </span>
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <span v-if="user.googleUser" class="inline-flex items-center">
  <svg class="mr-2" width="20px" height="20px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
    <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
    <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
    <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
    <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
  </svg>
  <span>Google</span>
</span>
                  <span v-else class="inline-flex items-center text-gray-600">
                    <svg width="22px" height="22px" class="mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    Standard
                  </span>
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <button @click="openEditModal(user)"
                    class="mr-2 inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100">
                    Edit
                  </button>
                  <button @click="confirmDeleteUser(user.id)"
                    class="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!filteredUsers.length" class="px-6 py-12 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p class="mt-1 text-sm text-gray-500">Try adjusting your search query.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
  <!-- Edit Modal -->
  <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold text-gray-900">Edit User</h3>
  <button @click="closeEditModal" class="text-gray-400 hover:text-gray-500">
    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
      </div>

      <form @submit.prevent="saveUserEdit" class="mt-6 space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" v-model.trim="editingUser.username" @input="validateUsername"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm" />
          <p v-if="validationErrors.username" class="mt-1 text-sm text-red-600">{{ validationErrors.username }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" v-model.trim="editingUser.email" @input="validateEmail"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm" />
          <p v-if="validationErrors.email" class="mt-1 text-sm text-red-600">{{ validationErrors.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <select v-model="editingUser.role"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium text-gray-700">Account Status</label>
            <button type="button" @click="editingUser.enabled = !editingUser.enabled"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                editingUser.enabled ? 'bg-blue-600' : 'bg-gray-200'
              ]">
              <span
                :class="[
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  editingUser.enabled ? 'translate-x-5' : 'translate-x-0'
                ]" />
            </button>
          </div>
          <p class="mt-1 text-sm text-gray-500">{{ editingUser.enabled ? 'Account is active' : 'Account is inactive' }}</p>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium text-gray-700">Verification Status</label>
            <button type="button" @click="editingUser.verified = !editingUser.verified"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                editingUser.verified ? 'bg-blue-600' : 'bg-gray-200'
              ]">
              <span
                :class="[
                  'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  editingUser.verified ? 'translate-x-5' : 'translate-x-0'
                ]" />
            </button>
          </div>
          <p class="mt-1 text-sm text-gray-500">{{ editingUser.verified ? 'User is verified' : 'User is not verified' }}</p>
        </div>

        <div class="mt-6 flex justify-end space-x-4">
          <button type="button" @click="closeEditModal"
            class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" :disabled="!isFormValid"
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Save Changes
          </button>
        </div>
      </form>
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
      toasts: [],
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

    addToast(message, type) {
      const id = Date.now();
      this.toasts.push({ id, message, type });

      // Remove the toast after 3 seconds
      setTimeout(() => this.removeToast(id), 3000);
    },
    // Remove a toast by its ID
    removeToast(id) {
      this.toasts = this.toasts.filter(toast => toast.id !== id);
    },
    // Success toast
    successToast(message) {
      this.addToast(message, 'success');
    },
    // Error toast
    errorToast(message) {
      this.addToast(message, 'error');
    },
     // Confirmation for deleting a user
     confirmDeleteUser(userId) {
      this.$dialog.confirm({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this user?',
        onConfirm: () => this.deleteUser(userId),
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel',
        confirmButtonClass: 'bg-red-500 hover:bg-red-600 text-white',
        cancelButtonClass: 'bg-gray-300 hover:bg-gray-400 text-black'
      });
    },
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
        
        // Show success toast
        this.successToast('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        
        // Detailed error handling
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data.message || 'Failed to delete user';
          
          switch (status) {
            case 403:
              this.errorToast('You do not have permission to delete this user.');
              break;
            case 404:
              this.errorToast('User not found.');
              break;
            default:
              this.errorToast(message);
          }
        } else {
          this.errorToast('Network error. Please try again.');
        }
      }
    }
  },
  async mounted() {
    // Install recommended plugins for toast and dialog
    this.$toast = {
      success: (msg) => this.successToast(msg),
      error: (msg) => this.errorToast(msg)
    };

    this.$dialog = {
      confirm: ({ message, onConfirm, title }) => {
        if (window.confirm(`${title}\n\n${message}`)) {
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

  font-family: Arial, sans-serif;
}

/* Top Navigation */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0078d7;
  color: white;
  border-radius: 10px;
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

.verified {
  display: flex;
  align-items: center;
  color: green;
}
.not-verified {
  color: red;
}

@keyframes slideIn {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideIn 0.5s ease-in-out;
}
.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.button-chart {
  position: absolute;
  top: 200px;
  right: 25px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(45deg, #6a11cb, #2575fc); /* Gradient background */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none; /* Remove underline */
  text-align: center;
  display: inline-block;
}

.button-chart:hover {
  background: linear-gradient(45deg, #2575fc, #6a11cb); /* Reverse gradient on hover */
  transform: scale(1.1); /* Slightly increase the size */
}

.button-chart:active {
  transform: scale(0.95); /* Slightly shrink on click */
}

.button-chart {
  animation: color-change 3s infinite alternate; /* Color-changing animation */
}

/* Keyframes for color change animation */
@keyframes color-change {
  0% {
    background: linear-gradient(45deg, #6a11cb, #2575fc);
  }
  50% {
    background: linear-gradient(45deg, #ff7e5f, #feb47b); /* Soft orange gradient */
  }
  100% {
    background: linear-gradient(45deg, #6a11cb, #2575fc);
  }
}
</style>

