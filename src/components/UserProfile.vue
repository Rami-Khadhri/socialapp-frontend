<template>
  <div class="user-profile">
    <h2 class="profile-title">User Profile</h2>
    <div v-if="user" class="profile-container">
      <div class="profile-card">
        <!-- User Photo -->
    
        <div class="profile-photo">
          <img 
            v-if="user.isGoogleUser" 
            :src="user.photoUrl" 
            alt="User Photo" 
            class="user-photo" 
          />
          <img 
            v-else-if="!user.isGoogleUser && user.photo" 
            :src="user.photo" 
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
     

        <div class="profile-username">
          <h3 class="lastname">{{ getLastName(user.username) }}</h3>
          <h3 class="firstname">{{ getFirstName(user.username) }}</h3>
        </div>

        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
        <p><strong>Account Status:</strong> {{ user.verified ? 'Verified' : 'Pending Verification' }}</p>
        <p><strong>Account Enabled:</strong> {{ user.enabled ? 'Active' : 'Inactive' }}</p>

        <div v-if="user.isGoogleUser" class="google-user-banner">
          <img src="@/assets/google.png" alt="Google Logo" width="25px" height="25px"/>
          <strong>Signed in with Google Account</strong>
        </div>

        <!-- Button to trigger Reset Password modal (only for non-Google users) -->
        <button v-if="!user.isGoogleUser" @click="showResetPasswordModal = true" class="reset-password-btn">
          Reset Password
        </button>

        <!-- Upload Photo Section (only for non-Google users) -->
        <div v-if="!user.isGoogleUser" class="upload-photo">
          <input type="file" accept="image/*" @change="handlePhotoUpload" />
          <button @click="uploadPhoto" class="upload-photo-btn">Upload Photo</button>
        </div>
      </div>
      
      <!-- Logout Button -->
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
    <!-- Reset Password Modal -->
    <div v-if="showResetPasswordModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Reset Password</h2>
        <form @submit.prevent="resetPassword">
          <div>
            <label for="email" hidden>Email</label>
            <!-- Disabled email input (just for display, cannot be modified) -->
            <input type="email" id="email" v-model="user.email" disabled hidden/>
          </div>
          <br>
          <div>
            <label for="oldPassword">Old Password</label>
            <input type="password" id="oldPassword" v-model="oldPassword" required />
          </div>

          <div>
            <label for="newPassword">New Password</label>
            <input type="password" id="newPassword" v-model="newPassword" required />
          </div>

          <div>
            <label for="confirmPassword">Confirm New Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required />
          </div>
          <br>
          <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
          <div v-if="successMessage" class="success">{{ successMessage }}</div>
          <button type="submit" class="submit-btn">Reset Password</button>
        </form>
        
        <button @click="closeModal" class="close-btn">Close</button>
      </div>
    </div>

    <div v-if="!user" class="loading-message">
      Loading user profile...
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: '',
      showResetPasswordModal: false, // Controls modal visibility
      userPhoto:null,
      selectedPhoto: null, // Store selected photo file
    };
  },
  methods: {
    logout() {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      
      // Redirect to login
      this.$router.push('/login');
    },
    getUserPhoto(user) {
  // Handle different photo sources for users
  if (user.photo) {
    // If it's base64 encoded image or binary data
    if (user.photo.startsWith('data:image')) {
      return user.photo;  // Return base64 encoded image as it is
    } else {
      // If it's binary data or URL (fallback), convert to base64 if needed
      return `data:image/jpeg;base64,${user.photo}`;
    }
  }
  return '/default-avatar.png';  // Fallback to default image if none is provided
}
,
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

    // For non-Google users, fetch photo separately
    let photoData = null;
    if (!response.data.googleUser) {
      try {
        const photoResponse = await axios.get('http://localhost:8081/api/users/photo', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        photoData = photoResponse.data.photo ? `data:image/jpeg;base64,${photoResponse.data.photo}` : null;
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    }

    this.user = {
      username: response.data.username,
      email: response.data.email,
      role: response.data.role,
      verified: response.data.verified,
      enabled: response.data.enabled,
      photo: photoData,
      photoUrl: response.data.photoUrl,
      isGoogleUser: response.data.googleUser,
    };
  } catch (error) {
    // Token invalid, redirect to login
    this.logout();
  }
},

    closeModal() {
      this.showResetPasswordModal = false; // Close modal
    },

    autoCloseModal() {
      setTimeout(() => {
        this.closeModal();
      }, 2000); // Close modal after 2 seconds
    },

    async resetPassword() {
      // Check if new and confirm passwords match
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      // Check for token in localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login'); // Redirect to login if no token
        return;
      }

      // Prepare request payload
      const payload = {
        email: this.user.email,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword
      };

      try {
        // Make POST request to reset password API
        const response = await axios.post(
          'http://localhost:8081/api/auth/reset-password',
          payload,
          { headers: { Authorization: `Bearer ${token}` } } // Add Authorization header
        );

        // Check for successful response
        if (response.status == 200) {
          this.successMessage = response.data.message;
          this.autoCloseModal();
        } else {
          this.errorMessage = response.data.message; // Handle server message
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = error.response ? error.response.data.message : 'An error occurred while resetting the password';
      }
    },

    getLastName(username) {
      if (!username) return '';
      return username.split('_')[0]; // Extract the last name
    },

    getFirstName(username) {
      if (!username) return '';
      return username.split('_')[1]; // Extract the first name
    },
    // Handle file selection
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedPhoto = file;
      }
    },

    async uploadPhoto() {
  if (!this.selectedPhoto) {
    this.errorMessage = "Please select a photo to upload.";
    return;
  }

  const formData = new FormData();
  formData.append("file", this.selectedPhoto);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }

    const response = await axios.post("http://localhost:8081/api/users/upload-photo", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      this.successMessage = "Photo uploaded successfully!";
      this.user.photo = `data:image/jpeg;base64,${response.data.photo}`; // Update the photo URL with Base64
      this.errorMessage = ""; // Clear any previous errors
    }
  } catch (error) {
    console.error(error);
    this.errorMessage = "An error occurred while uploading the photo.";
  }}}
,
  created() {
    this.fetchUserProfile();
  }
};
</script>

<style scoped>
.user-profile {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.profile-title {
  color: #2d3748;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
}

.profile-container {
  background: white;
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.profile-card {
  padding: 40px;
  background: white;
}

.profile-username {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 24px;
}

.lastname, .firstname {
  color: #2d3748;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.profile-photo {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.user-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4299e1;
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.15);
}

.profile-card p {
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 10px;
  margin-bottom: 12px;
  color: #4a5568;
  font-size: 14px;
}

.profile-card strong {
  color: #2d3748;
  font-weight: 600;
}

.google-user-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border-radius: 10px;
  padding: 12px 16px;
  margin: 20px 0;
  color: #4a5568;
}

.reset-password-btn {
  width: 100%;
  padding: 12px;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin: 20px 0;
}

.reset-password-btn:hover {
  background: #3182ce;
}

.upload-photo {
  margin: 20px 0;
  text-align: center;
}

.upload-photo input[type="file"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
}

.upload-photo-btn {
  width: 100%;
  padding: 12px;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.upload-photo-btn:hover {
  background: #3182ce;
}

.logout-btn {
  width: 100%;
  padding: 12px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 8px;
}

.logout-btn:hover {
  background: #c53030;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  color: #2d3748;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
}

.modal-content label {
  display: block;
  color: #4a5568;
  font-size: 14px;
  margin-bottom: 8px;
}

.modal-content input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #f8fafc;
  margin-bottom: 16px;
}

.modal-content input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  background: white;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-bottom: 12px;
}

.submit-btn:hover {
  background: #3182ce;
}

.close-btn {
  width: 100%;
  padding: 12px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: #c53030;
}

.error {
  color: #e53e3e;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
}

.success {
  color: #48bb78;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
}

.loading-message {
  color: #718096;
  font-size: 16px;
  text-align: center;
}

@media (max-width: 480px) {
  .profile-card {
    padding: 24px;
  }
  
  .modal-content {
    padding: 24px;
    margin: 20px;
  }
}
</style>