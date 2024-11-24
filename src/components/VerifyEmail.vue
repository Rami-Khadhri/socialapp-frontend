<template>
  <div class="verify-container">
    <h2>Verifying Your Account</h2>
    <div v-if="verifying">
      <p>Verifying your account...</p>
    </div>
    <div v-if="success" class="success">
      <h3>Account Verified!</h3>
      <p>You can now login to your account.</p>
      <p>You will be redirected in {{ countdown }} seconds...</p>
    </div>
    <div v-if="error" class="error">
      <p>{{ errorMessage }}</p>
      <router-link to="/login" class="btn">Back to Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      verifying: true,
      success: false,
      error: false,
      errorMessage: "",
      countdown: 3, // Countdown timer in seconds
    };
  },
  created() {
    this.verifyAccount();
  },
  methods: {
    async verifyAccount() {
      try {
        const token = this.$route.query.token;
        await axios.get(`http://localhost:8081/api/auth/verify?token=${token}`);
        this.verifying = false;
        this.success = true;

        // Start the countdown for redirection
        const interval = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--;
          } else {
            clearInterval(interval);
            // Redirect to the login page after countdown ends
            window.location.href = "http://localhost:8080/login";
          }
        }, 1000);
      } catch (err) {
        this.verifying = false;
        this.error = true;
        this.errorMessage =
          err.response?.data?.error || "Verification failed";
      }
    },
  },
};
</script>
<style>
.verify-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.success h3 {
  color: #4caf50;
  font-size: 20px;
}

.error p {
  color: #f44336;
  font-size: 18px;
}

p {
  font-size: 16px;
  margin: 10px 0;
}

.btn {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>