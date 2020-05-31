import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import EmptyLayout from "@/layouts/EmptyLayout";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/401"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
];

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页",
          icon: "home",
          affix: true,
          noKeepAlive: true,
        },
      },
      // {
      //   path: "/MISComputers",
      //   name: "MISComputers",
      //   component: () => import("@/views/project/MISComputers/index"),
      //   meta: {
      //     title: "东莞资讯部",
      //     icon: "biohazard",
      //     affix: true,
      //     noKeepAlive: true,
      //   },
      // },
    ],
  },
  {
    path: "/MIS",
    component: Layout,
    redirect: "noRedirect",
    name: "MIS",
    meta: {
      title: "哟吼",
      icon: "biohazard",
      permissions: ["admin"],
    },

    children: [
      {
        path: "computers",
        name: "Computers",
        component: () => import("@/views/project/MISComputers/index"),
        meta: {
          title: "电脑",
          noKeepAlive: true,
        },
        children: null,
      },
      {
        path: "computers2",
        name: "Computers2",
        component: () => import("@/views/project/MISComputers/index"),
        meta: {
          title: "电脑2",
          noKeepAlive: true,
        },
        children: null,
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});

export function resetRouter() {
  router.matcher = new VueRouter({
    mode: "history",
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher;
}
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};
export default router;