<template>
    <div class="user-item">
      <p><strong>{{ user.username }}</strong> ({{ user.email }})</p>
      <button @click="$emit('edit', user)">Edit</button>
      <button @click="deleteUser">Delete</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserItem',
    props: {
      user: Object,
    },
    methods: {
      deleteUser() {
        axios.delete(`http://localhost:8081/api/users/delete/${this.user.id}`)
          .then(() => {
            this.$emit('deleted', this.user.id);
          })
          .catch((error) => console.error('Error deleting user:', error));
      },
    },
  };
  </script>
  
  <style scoped>
  .user-item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  </style>
  