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
    ],
  },
  {
    path: "/MIS",
    component: Layout,
    redirect: "noRedirect",
    name: "MIS",
    meta: {
      title: "MIS相关",
      icon: "user-edit",
      permissions: ["admin"],
    },
    children: [
      {
        path: "MISreads",
        name: "MISreads",
        component: () => import("@/views/project/MISreads/index"),
        meta: {
          title: "统一查询入口",
          icon: "book-reader",
          permissions: ["admin"],
        },
        children: null,
      },
      {
        path: "MISedits",
        component: EmptyLayout,
        name: "MISedits",
        meta: {
          title: "信息录入",
          icon: "book-reader",
          permissions: ["admin"],
        },
        children: [
          {
            path: "MISFile",
            name: "MISFile",
            component: () => import("@/views/project/MISFile/index"),
            meta: {
              title: "MIS档案上传",
              noKeepAlive: true,
            },
            children: null,
          },
          {
            path: "MISmobile",
            name: "MISmobile",
            component: () => import("@/views/project/MISmobile/index"),
            meta: {
              title: "申请功能机",
              noKeepAlive: true,
            },
            children: null,
          },
        ],
      },
    ],
  },
  {
    path: "/OAquick",
    component: Layout,
    redirect: "noRedirect",
    name: "OAquick",
    meta: {
      title: "OA快速维护",
      icon: "user-edit",
      permissions: ["admin"],
    },

    children: [
      {
        path: "MISFile",
        name: "MISFile",
        component: () => import("@/views/project/MISreads/index"),
        meta: {
          title: "MIS档案上传",
          noKeepAlive: true,
        },
        children: null,
      },
      {
        path: "MISmobile",
        name: "MISmobile",
        component: () => import("@/views/project/MISreads/index"),
        meta: {
          title: "申请功能机",
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
