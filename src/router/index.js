import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/Login/Login.vue";
import dashboard from "../views/Dashboard/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
    meta: { requiresVisitor: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem("userOtto"));
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (user) {
      next({
        path: "/dashboard",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
