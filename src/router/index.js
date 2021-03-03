import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/store";
Vue.use(VueRouter);
const Dashboard = () => import("../modules/shared/components/layout.vue");
//const Login = () => import("../modules/login/components/Login.vue");

const Login = () => import("../modules/SingleSign/components/Login.vue");

const AccessDenied = () =>
  import("../modules/shared/components/AccessDenied.vue");
const NotFound = () => import("../modules/shared/components/NotFound.vue");
const LoadingHome = () =>
  import("../modules/shared/components/LoadingHome.vue");

const Home = () => import("../modules/Home");
//Staff Component
const StaffList = () => import("../modules/Staff/Component/StaffList.vue");
const StaffAdd = () => import("../modules/Staff/Component/StaffCreate.vue");
const StaffEdit = () => import("../modules/Staff/Component/StaffEdit.vue");
const StaffView = () =>
  import("../modules/Staff/Component/StaffDetailsView.vue");

//user Components
const UserList = () => import("../modules/user/components/UserList.vue");
const UserAdd = () => import("../modules/user/components/UserCreate.vue");
const UserEdit = () => import("../modules/user/components/UserEdit.vue");
const UserView = () => import("../modules/user/components/UserDetails.vue");

//role Components
const RoleList = () => import("../modules/role/RoleList.vue");
const RoleAdd = () => import("../modules/role/RoleCreate.vue");
const RoleEdit = () => import("../modules/role/RoleEdit.vue");
const RoleView = () => import("../modules/role/RoleDetails.vue");

//Leave Components
const LeaveList = () => import("../modules/Leave/components/LeaveList.vue");

//Leave Components
const StaffLeaveList = () =>
  import("../modules/StaffLeaves/components/LeaveList.vue");

//Event Components
const EventCalendar = () => import("../modules/Event/EventCalendar.vue");
const EventAdd = () => import("../modules/Event/EventCreate.vue");
const EventEdit = () => import("../modules/Event/EventEdit.vue");

const Systemmanager = () =>
  import(
    "../modules/shared/settings/systemManager/Component/SystemManagerComponent.vue"
  );

const AttendanceList = () => import("../modules/attendance/AttendanceList.vue");

const routes = configRoutes();
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function checkPermission(to, from, next) {
  debugger
  if (localStorage.getItem('token')) {
    console.log('store :',store)
    let permissions = store.state.user.policies;
    let filtered = [];
    
    if (to && to.meta && to.meta.permission == "Dashboard") {
      hadpermission = true;
    } else {
      filtered = permissions.map((item) => item.name == to.meta.permission);
    }
    let hadpermission = filtered.includes(true);
    if (hadpermission) {
      next();
    } else {
      next("/notFound");
    }
  } else{
    next('/login')
  }
}

function configRoutes() {
  return [
    {
      path: "/login",
      component: () => import("../modules/shared/layouts/EmptyLayout.vue"),
      children: [{ path: "", name: "login", component: Login }],
    },

    {
      path: "/accessDenied",
      name: "AccessDenied",
      component: AccessDenied,
    },
   
    {
      path: "/notFound",
      name: "notFound",
      component: NotFound,
    },
    {
      path: "/loadinghome",
      name: "LoadingHome",
      component: LoadingHome,
    },

    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      // beforeEnter: (to, from, next) => {
      //   checkPermission(to, from, next);
      // },
      children: [
        //  { path: '', name: 'home', component: () => import('../modules/shared/home.vue') },
        {
          path: "/",
          name: "Dashboard",
          component: Home,
          // beforeEnter: (to, from, next) => {
          //   checkPermission(to, from, next);
          // },
          meta: {
            permission: ["Dashboard"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/user",
          name: "Dashboard",
          component: UserList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["User Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Users",
                disabled: false,
                to: "/user",
                exact: true,
              },
            ],
          },
        },
        {
          path: "user/edit/:id",
          name: "User",
          component: UserEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["User Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Users",
                disabled: false,
                to: "/user",
                exact: true,
              },
              {
                text: "Edit",
                disabled: true,
                to: "/user/edit/:id",
                exact: true,
              },
            ],
          },
        },
        {
          path: "user/add",
          name: "User",
          component: UserAdd,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
             permission: ["User Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Users",
                disabled: false,
                to: "/user",
                exact: true,
              },
              {
                text: "Create",
                disabled: false,
                to: "/user/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: "user/:id",
          name: "viewUser",
          component: UserView,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["User Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Users",
                disabled: false,
                to: "/user",
                exact: true,
              },
              {
                text: ":id",
                disabled: true,
                to: (route) => `${route.param}`,
                exact: true,
              },
              {
                text: "View",
                disabled: true,
                exact: true,
              },
            ],
          },
        },
        {
          path: "role",
          name: "Dashboard",
          component: RoleList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
              permission: ["Role Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },

              {
                text: "Roles",
                disabled: false,
                to: "/role",
                exact: true,
              },
            ],
          },
        },
        {
          path: "role/create",
          name: "Add Role",
          component: RoleAdd,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
             permission: ["Role Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Roles",
                disabled: false,
                to: "/role",
                exact: true,
              },
              {
                text: "Create",
                disabled: true,
                to: "/role/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: "role/edit/:id",
          name: "Edit",
          component: RoleEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          props: true,
          meta: {
            permission: ["Role Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Roles",
                disabled: false,
                to: "/role",
                exact: true,
              },
              {
                text: ":id",
                disabled: true,
                to: (route) => `role/${route.param}`,
                exact: true,
              },
              {
                text: "Edit",
                disabled: true,
                to: "Edit",
                exact: true,
              },
            ],
          },
        },
        {
          path: "role/:id",
          name: "View",
          component: RoleView,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          props: true,
          meta: {
             permission: ["Role Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Roles",
                disabled: false,
                to: "/role",
                exact: true,
              },
              {
                text: ":id",
                disabled: true,
                to: (route) => `role/${route.param}`,
                exact: true,
              },
              {
                text: "View",
                disabled: true,
                to: "View",
                exact: true,
              },
            ],
          },
        },
        {
          path: "leave",
          name: "Dashboard",
          component: LeaveList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Leave Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },

              {
                text: "Leaves",
                disabled: false,
                to: "/leave",
                exact: true,
              },
            ],
          },
        },
        {
          path: "staff_leave",
          name: "Dashboard",
          component: StaffLeaveList,

          meta: {
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },

              {
                text: "Leaves",
                disabled: false,
                to: "/staff_leave",
                exact: true,
              },
            ],
          },
        },
      ],
    },

    {
      path: "/staff",
      name: "Staff",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        checkPermission(to, from, next);
      },
      children: [
        {
          path: "/",
          name: "Staff List",
          component: StaffList,
          meta: {
            permission: ["Staff Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Staffs",
                disabled: false,
                to: "/staff",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/master-data",
          name: "Master Data",
          component: Systemmanager,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Salutation Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
              },
              // {
              //   text: "Settings",
              //   disabled: true,
              //   // to: "/",
              // },
              {
                text: "Master Data",
                disabled: true,
              },
            ],
          },
        },
        {
          path: "edit/:id",
          name: "Edit Staff",
          component: StaffEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Staff Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Staffs",
                disabled: false,
                to: "/staff",
                exact: true,
              },
              {
                text: ":id",
                disabled: false,
                to: (route) => `${route.param}`,
                exact: true,
              },
              {
                text: "edit",
                disabled: true,
                to: "edit/:id",
                exact: true,
              },
            ],
          },
        },
        {
          path: "add",
          name: "CreateStaff",
          component: StaffAdd,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
             permission: ["Staff Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Staffs",
                disabled: false,
                to: "/staff",
                exact: true,
              },
              {
                text: "Create",
                disabled: false,
                to: "/staff/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: ":id",
          name: "ViewStaff",
          component: StaffView,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Staff Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Staffs",
                disabled: false,
                to: "/staff",
                exact: true,
              },
              {
                text: ":id",
                disabled: false,
                to: (route) => `${route.param}`,
                exact: true,
              },
              {
                text: "View",
                disabled: false,
              },
            ],
          },
        },
        {
          path: "/event",
          name: "Dashboard",
          component: EventCalendar,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Event Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Event",
                disabled: false,
                to: "/event",
                exact: true,
              },
            ],
          },
        },

        {
          path: "event/:id",
          name: "Edit Event",
          component: EventEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Event Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Event",
                disabled: false,
                to: "/event",
                exact: true,
              },
              {
                text: ":id",
                disabled: false,
                to: (route) => `${route.param}`,
                exact: true,
              },
              {
                text: "edit",
                disabled: true,
                to: "edit/:id",
                exact: true,
              },
            ],
          },
        },
        {
          path: "add",
          name: "CreateEvent",
          component: EventAdd,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
             permission: ["Event Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Event",
                disabled: false,
                to: "/event",
                exact: true,
              },
              {
                text: "Create",
                disabled: false,
                to: "/event/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/attendance",
          name: "Attendance",
          component: AttendanceList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Leave Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Attendance",
                disabled: false,
                to: "/attendance",
                exact: true,
              },
            ],
          },
        },
      ],
    },
  ];
}

export default router;
