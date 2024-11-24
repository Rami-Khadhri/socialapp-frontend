<template>
  <div class="register-container">
    <div class="form-box">
      <!-- Logo/Header Section -->
      <div class="header">
        <h2>Create Account</h2>
        <p class="subtitle">Please fill in your details to register</p>
      </div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <div class="input-with-icon">
            <i class="icon user-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </i>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Username"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <div class="input-with-icon">
            <i class="icon email-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </i>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <div class="input-with-icon">
            <i class="icon lock-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </i>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Password"
              required
            />
          </div>
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <button type="submit" class="btn-primary">
          Create Account
        </button>
      </form>

      <p class="login-link">
        Already have an account? 
        <router-link to="/login">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.post('http://localhost:8081/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
  
        console.log(response.data);
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.form-box {
  background: white;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h2 {
  color: #2d3748;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle {
  color: #718096;
  font-size: 14px;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.input-with-icon {
  position: relative;
}

.icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #a0aec0;
}

input {
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #f8fafc;
}

input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  background: white;
}

.btn-primary {
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

.btn-primary:hover {
  background: #3182ce;
}

.error-message {
  color: #e53e3e;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
}

.login-link {
  text-align: center;
  color: #718096;
  font-size: 14px;
  margin-top: 24px;
}

.login-link a {
  color: #4299e1;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}

.login-link a:hover {
  color: #3182ce;
}

@media (max-width: 480px) {
  .form-box {
    padding: 24px;
  }
}
</style>