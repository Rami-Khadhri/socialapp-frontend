import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import UserList from './components/UserList.vue';
import UserForm from './components/UserForm.vue';
import UserLogin from './components/UserLogin.vue';
import UserProfile from './components/UserProfile.vue';
import UserRegister from './components/UserRegister.vue';
import VerifyEmail from './components/VerifyEmail.vue';
import Home from './components/Home.vue';
import ProfilePage from './components/ProfilePage.vue';
import AI_Assistant from './components/AI_Assistant.vue';
import AveragePostsChart from './components/AveragePostsChart.vue';


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList,
    meta: { requiresAuth: true, requiresAdmin: true }  // Only admin can access
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: UserForm,
    props: true,
  },
  {
    path: '/edit-user/:id',
    name: 'EditUser',
    component: UserForm,
    props: true,
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Home,
    meta: { requiresAuth: true }, // Ensure only logged-in users can access
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/profilepage/:id',
    name: 'ProfilePage',
    component: ProfilePage,
  },
  
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,

  },
  {
    path: '/verify',
    component: VerifyEmail
  },
  {
    path: '/chat',
    name: 'AI_Assistant',
    component: AI_Assistant,
    meta: { requiresAuth: true }, // Ensure only logged-in users can access
  },
  {
    path: '/chart',
    name: 'AveragePostsChart',
    component: AveragePostsChart,
    meta: { requiresAuth: true }, // Ensure only logged-in users can access
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to check authentication and role
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Assuming the role is stored in localStorage

  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/login'); // Redirect to login if no token
    } else if (to.matched.some(record => record.meta.requiresAdmin) && role !== 'ROLE_ADMIN') {
      next('/login'); // Redirect to login if user is not admin
    } else {
      next(); // Proceed if the user is authorized
    }
  } else {
    next(); // Proceed if no authentication is required
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');

export default router;