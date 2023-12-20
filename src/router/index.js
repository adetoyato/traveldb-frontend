import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import AddPlane from '../views/AddPlane.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/plane',
    name: 'plane',
    component: AddPlane
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/login", "/register", "/plane", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if(authRequired && !loggedIn) {
    return next("/home");
  }
  next();
})

export default router
