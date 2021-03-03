import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/store";
Vue.use(VueRouter);
const Dashboard = () => import("../modules/shared/components/layout.vue");
const Login = () => import("../modules/login/components/Login.vue");
const ForgotPassword = () =>
  import("../modules/login/components/ForgotPassword.vue");
const ChangePassword = () =>
  import("../modules/login/components/ChangePassword.vue");
const ResetPassword = () =>
  import("../modules/login/components/ResetPassword.vue");
const AccessDenied = () =>
  import("../modules/shared/components/AccessDenied.vue");
const NotFound = () => import("../modules/shared/components/NotFound.vue");

const Home = () => import("../modules/Home");
//Customer Component
const CustomerList = () =>
  import("../modules/Customer/Component/CustomerList.vue");
const CustomerAdd = () =>
  import("../modules/Customer/Component/CustomerCreate.vue");
const CustomerEdit = () =>
  import("../modules/Customer/Component/CustomerEdit.vue");
const CustomerView = () =>
  import("../modules/Customer/Component/CustomerDetailsView.vue");



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

//Supplier Components
const SupplierAdd = () =>
  import("../modules/supplier/components/SupplierCreate.vue");
const SupplierEdit = () =>
  import("../modules/supplier/components/SupplierEdit.vue");
const SupplierList = () =>
  import("../modules/supplier/components/SupplierList.vue");
const SupplierDetails = () =>
  import("../modules/supplier/components/SupplierDetails.vue");

//Product Components
const ProductAdd = () =>
  import("../modules/Product/components/ProductCreate.vue");
const ProductEdit = () =>
  import("../modules/Product/components/ProductEdit.vue");
const ProductList = () =>
  import("../modules/Product/components/ProductList.vue");
const ProductView = () =>
  import("../modules/Product/components/ProductDetails.vue");
const ProductBatchView = () =>
  import("../modules/Product/components/ProductBatchView");

//PurchaseOrder Components
const PurchaseOrderAdd = () =>
  import("../modules/Purchase-Order/components/PurchaseOrderCreate.vue");
const PurchaseOrderEdit = () =>
  import("../modules/Purchase-Order/components/PurchaseOrderEdit.vue");
const PurchaseOrderList = () =>
  import("../modules/Purchase-Order/components/PurchaseOrderList.vue");
const PurchaseOrderView = () =>
  import("../modules/Purchase-Order/components/PurchaseOrderDetails.vue");


//Purchases
const PurchaseAdd = () =>
  import("../modules//Purchases/components/PurchaseCreate.vue");
const PurchaseList = () =>
  import("../modules//Purchases/components/PurchaseList.vue");
const PurchaseEdit = () =>
  import("../modules//Purchases/components/PurchaseEdit.vue");
const PurchaseView = () =>
  import("../modules//Purchases/components/PurchaseDetails.vue");

//Purchase Return
const PurchaseAddReturn = () =>
  import("../modules/purchase_return/components/PurchaseReturnCreate.vue");
const PurchaseReturnEdit = () =>
  import("../modules/purchase_return/components/PurchaseReturnEdit.vue");
const PurchaseReturnList = () =>
  import("../modules/purchase_return/components/PurchaseReturnList.vue");
const PurchaseReturnView = () =>
  import("../modules/purchase_return/components/PurchaseReturnDetails.vue");

//SettingComponents
const CategoryListComponent = () =>
  import(
    "../modules/shared/settings/productCategory/components/CategoryList.vue"
  );

const ExpenseCategoryList = () =>
    import(
        "../modules/shared/settings/ExpenseCategory/components/ExpenseCategoryList"
        );

        const IncomeCategoryList = () =>
    import(
        "../modules/shared/settings/incomeCategory/components/IncomeCategoryList"
        );
//change Password

const ChangePasswordComponent = () => import("../modules/shared/settings/ChangePassword/components/ChangePasswordComponent.vue");


//shop component
const ShopComponentCreate = () =>
  import("../modules/shared/settings/Shop/components/CreateShopComonent.vue");
  const ShopComponentEdit = () =>
  import("../modules/shared/settings/Shop/components/EditShopComponent.vue");
const ShopComponent = () =>
  import("../modules/shared/settings/Shop/components/ShopComponent.vue");
const ShopComponentDetails = () =>
  import("../modules/shared/settings/Shop/components/ShopDetailsComponent.vue");


const CategoryListViewComponent = () =>
  import(
    "../modules/shared/settings/productCategory/components/CategoryDetails.vue"
  );
const AccountList = () =>
    import("../modules/Accounts/AccountsList");

//warehouse Comonents
const Warehouse = () =>
  import("../modules/shared/settings/Warehouse/components/WareHouseList.vue");

const WarehouseView = () =>
  import(
    "../modules/shared/settings/Warehouse/components/WarehouseDetails.vue"
  );

//Setting Component
const PosSetting = () =>
  import(
    "../modules/shared/settings/posSetting/components/PosSettingComponent.vue"
  );
const SiteSetting = () =>
  import(
    "../modules/shared/settings/siteSetting/components/SiteSettingComponent.vue"
  );


//Meta Data
const Brand = () =>
  import("../modules/shared/settings/brand/BrandListComponent.vue");

const Unit = () =>
  import("../modules/shared/settings/Units/components/UnitList.vue");

// Reports Component
const SalesReports = () =>
  import("../modules/Reports/SalesReportComponent.vue");
const ProductReports = () =>
  import("../modules/Reports/ProductReportComponent.vue");
const ProductAllReport = () =>
    import("../modules/Reports/ProduttAllReport.vue");
const ExpiredProducts = () =>
    import("../modules/Reports/ExpiredProducts.vue");
    const DamagedProducts = () =>
    import("../modules/Reports/DamageProducts.vue");
const PurchaseReturnReports = () =>
  import("../modules/Reports/PurchaseReturnReportComponent.vue");
const PurchaseReports = () =>
  import("../modules/Reports/PurchaseReportComponent.vue");
const PurchaseOrderReports = () =>
  import("../modules/Reports/PurchaseOrderReportComponent.vue");
const OutofStockReportComponent = () =>
  import("../modules/Reports/OutofStockReportComponent.vue");
  const LowStockReportComponent = () =>
  import("../modules/Reports/LowStockReportComponent.vue");

  //Discount Component
const DiscountCreateComponent = () =>
  import("../modules/Discount/Discount.vue");
const DiscountDetailsComponent = () =>
  import("../modules/Discount/DiscountDetails.vue");
const DiscountListComponent = () =>
  import("../modules/Discount/DiscountList.vue");

//Stock Coponents
const StockList = () =>
  import("../modules/Stocks/components/StockList.vue");
const StockTransferAdd = () =>
  import("../modules/Stocks/components/StockTransferCreate.vue");
const StockTransferList = () =>
  import("../modules/Stocks/components/StockTransferList.vue");
const StockTransferDetails = () =>
  import("../modules/Stocks/components/StockTrasferDetails.vue");

const StockTransferEdit = () =>
  import("../modules/Stocks/components/StockTransferEdit.vue");


//Sales Component
  const SalesList = () =>
  import("../modules/Sales/SalesList.vue");

  const SalesDetails = () =>
  import("../modules/Sales/SalesDetails.vue");



  const PurchasePaymentView = () =>
    import("../modules//Purchases/components/PurchasePaymentView.vue");

    const ChequeList = () =>
    import("../modules/ChequeManagement/ChequeList.vue");

const ExpensesList = () =>
    import("../modules/Expenses/components/ExpenseList");
    const IncomesList = () =>
    import("../modules/Income/components/IncomeList");
    const Organization = () =>
    import(
      "../modules/shared/settings/Organization/OrganizationComponent.vue"
    );
    const PaymentList = () =>
    import("../modules/Payment/components/PaymentList");
const PaymentView = () =>
    import("../modules/Payment/components/PaymentView");

    const ShopStockList = () =>
  import("../modules/ShopStock/ShopStockList.vue");

const routes = configRoutes();
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
////Stocks////


// router.beforeEach((to, from, next) => {
//   app.loading = true;
//   next();
// });

// router.afterEach(() => {
//   setTimeout(() => (app.loading = false), 1500); // timeout for demo purposes
// });

function checkPermission(to, from, next) {
  if (localStorage.getItem("user") != null) {
    let yre = localStorage.getItem("user") != null;
    console.log("=====================================");
    console.log(yre);
    let permissions = store.state.user.policies;
    let filtered = [];
    if (to && to.meta && to.meta.permission == "Dashboard") {
    } else {
      filtered = permissions.map((item) => item.name == to.meta.permission);
    }
    let hadpermission = filtered.includes(true);

    if (to && to.meta && to.meta.permission == "Dashboard") {
      hadpermission = true;
    }
    if (hadpermission) {
      next();
    } else {

      next("/notFound");
    }
  } else {
    next("/login");
  }
}

function configRoutes() {
  return [
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
      path: "/login",
      name: "Home",
      component: Login,
    },

    {
      path: "/reset-password",
      name: "Reset Password",
      component: ResetPassword,
      children: [
        {
          path: "/reset_password",
          name: "resetPassword",
          component: ResetPassword,
          props: (route) => ({ query: [route.query.token] }),
        },
      ],
    },
    {
      path: "/forgot-password",
      name: "Forget Password",
      component: ForgotPassword,
    },
    {
      path: "/change-password",
      name: "Change Password",
      component: ChangePassword,
    },

    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        checkPermission(to, from, next);
      },
      children: [
        {
          path: "/",
          name: "Dashboard",
          component: Home,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Dashboard Index"],
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
          // beforeEnter: (to, from, next) => {
          //   // check if the token already here
          //   if (localStorage.getItem('token') !== null) {
          //     next();
          //   } else {
          //     next({ name: '/login' })
          //   }
          // }
          // ,
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
              // {
              //   text: "Setting",
              //   disabled: false,
              //   to: "/",
              //   exact: true,
              // },
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

          // beforeEnter: (to, from, next) => {
          //   // check if the token already here
          //   if (localStorage.getItem('token') !== null) {
          //     next();
          //   } else {
          //     next({ name: '/login' })
          //   }
          // }
          // ,
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
      ],
    },
    {
      path: "/sales",
      name: "Sales",
      component: Dashboard,
      children: [
        {
          path: "/sales",
          name: "SalesList",
          component: SalesList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Sales Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Sales",
                disabled: false,
                to: "/sales",
                exact: true,
              },
            ],
          },
        },
        {
          path: "view/:id",
          name: "ViewSales",
          component: SalesDetails,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Sales Show"],
            breadcrumb: [
              {
                text: "Dasboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Sales",
                disabled: false,
                to: "/sales",
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
              },
            ],
          },
        }
      ]
    },

    {
      path: "/supplier",
      name: "Supplier",
      component: Dashboard,
      children: [
        {
          path: "/supplier",
          name: "SupplierList",
          component: SupplierList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Supplier Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Suppliers",
                disabled: false,
                to: "/supplier",
                exact: true,
              },
            ],
          },
        },

        {
          path: "add",
          name: "AddSupplier",
          component: SupplierAdd,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Supplier Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Suppliers",
                disabled: false,
                to: "/supplier",
                exact: true,
              },
              {
                text: "Create",
                disabled: false,
                to: "/supplier/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: "edit/:id",
          name: "EditSupplier",
          component: SupplierEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Supplier Edit"],
            breadcrumb: [
              {
                text: "Dasboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Suppliers",
                disabled: false,
                to: "/supplier",
                exact: true,
              },
              {
                text: ":id",
                disabled: true,
                to: (route) => `${route.param}`,
                exact: true,
              },
              {
                text: "Edit",
                disabled: true,
                to: "",
                exact: true,
              },
            ],
          },
        },
       ,
        {
          path: ":id",
          name: "ViewSupplier",
          component: SupplierDetails,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Supplier Show"],
            breadcrumb: [
              {
                text: "Dasboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Suppliers",
                disabled: false,
                to: "/supplier",
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
              },
            ],
          },
        },
      ],
    },

    {
      path: "/accounts",
      name: "Account",
      component: Dashboard,
      children: [
        {
          path: "/accounts",
          name: "AccountsDetails",
          component: AccountList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Supplier Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Accounts",
                disabled: false,
                to: "/accounts",
                exact: true,
              },
            ],
          },
        },

        {
          path: "add",
          name: "AddSupplier",
          component: SupplierAdd,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Supplier Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Supplier",
                disabled: false,
                to: "/supplier",
                exact: true,
              },
              {
                text: "Create",
                disabled: false,
                to: "/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: "edit/:id",
          name: "EditSupplier",
          component: SupplierEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Supplier Edit"],
            breadcrumb: [
              {
                text: "Dasboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Supplier",
                disabled: false,
                to: "/supplier",
                exact: true,
              },
              {
                text: ":id",
                disabled: false,
                to: (route) => `${route.param}`,
                exact: true,
              },
              {
                text: "Edit",
                disabled: false,
                to: "",
                exact: true,
              },
            ],
          },
        },
     
     
      ],
    },



    {
      path: "/product/",
      name: "Product",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        checkPermission(to, from, next);
      },
      children: [
        {
          path: "",
          name: "Product",
          component: ProductList,
          meta: {
            permission: ["Product Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Products",
                disabled: false,
                to: "/product",
                exact: true,
              },
            ],
          },
        },
        {
          path: "add",
          name: "AddProduct",
          component: ProductAdd,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Product Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Products",
                disabled: false,
                to: "/product",
                exact: true,
              },
              {
                text: "Create",
                disabled: false,
                to: "/product/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: ":id",
          name: "View",
          component: ProductView,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Product Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Products",
                disabled: false,
                to: "/product",
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
                exact: true,
              },
            ],
          },
        },
        {
          path: ":id/batch/:batch_id",
          name: "Batch",
          component: ProductBatchView,

          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },

          meta: {
            permission: ["Batch Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Products",
                disabled: false,
                to: "/product",
                exact: true,
              },
              {
                text: ":id",
                disabled: false,
                to: (route) => `${route.param.id}`,
                exact: true,
              },
              {
                text: "Batches",
                disabled: false,
                exact: true,
              },
              {
                text: ":id",
                disabled: false,
                to: (route) => `${route.param.id}`,
                exact: true,
              },
            ],
          },
        },
        {
          path: "edit/:id",
          name: "Edit",
          component: ProductEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Product Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Products",
                disabled: false,
                to: "/product",
                exact: true,
              },
              {
                text: ":id",
                disabled: false,
                to: (route) => `product/${route.param}`,
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
      ],
    },
    {
      path: "/",
      name: "Reports",
      component: Dashboard,
      children: [
        {
          path: "sales-report",
          name: "SalesReport",
          component: SalesReports,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Sales Report Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Report",
                disabled: true,
                to: "/product-report",
                exact: true,
              },
              {
                text: "Sales Report",
                disabled: false,
                to: "/sales",
                exact: true,
              },
            ],
          },
        },
        {
          path: "out-of-stock-report",
          name: "OutOfStockReport",
          component: OutofStockReportComponent,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Out Of Stocks Report Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Report",
                disabled: true,
                to: "/out-of-stock-report",
                exact: true,
              },
              {
                text: "Out of Stock Report",
                disabled: false,
                to: "/out-of-stock-report",
                exact: true,
              },
            ],
          },
        },
        {
          path: "low-stock-report",
          name: "Low-Stock-Report",
          component: LowStockReportComponent,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Low Stocks Report Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Report",
                disabled: true,
                to: "/low-stock-report",
                exact: true,
              },
              {
                text: "Low Stock Report",
                disabled: false,
                to: "/low-stock-report",
                exact: true,
              },
            ],
          },
        },
        {
          path: "product-report",
          name: "Productreport",
          component: ProductReports,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Product Report Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Report",
                disabled: false,
                to: "/product-report",
                exact: true,
              },
              {
                text: "Product Report",
                disabled: false,
                to: "/product-report",
                exact: true,
              },
            ],
          },
        },
        {
          path: "product-list",
          name: "product-list",
          component: ProductAllReport,
          meta: {
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Stocks",
                disabled: false,
                to: "/product-list",
                exact: true,
              },
            ],
          },
        },
        {
          path: "expired-product-list",
          name: "product-list",
          component: ExpiredProducts,
          meta: {
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Expired Stocks",
                disabled: false,
                to: "/expired-product-list",
                exact: true,
              },
            ],
          },
        },



        {
          path: "damaged-product-list",
          name: "product-list",
          component: DamagedProducts,
          meta: {
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Damaged Stocks",
                disabled: false,
                to: "/damaged-product-list",
                exact: true,
              },
            ],
          },
        },
        {
          path: "purchase-return-report",
          name: "PurchaseReturnReport",
          component: PurchaseReturnReports,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["PurchaseReturn Report Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Report",
                disabled: true,
                to: "/purchase-return-report",
                exact: true,
              },
              {
                text: "Purchase Return Report",
                disabled: true,
                to: "/purchase-return-report",
                exact: true,
              },
            ],
          },
        },
        {
          path: "purchase-report",
          name: "PurchaseReport",
          component: PurchaseReports,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Report Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Report",
                disabled: true,
                to: "/Purchase-Report",
                exact: true,
              },
              {
                text: "Purchase Report",
                disabled: false,
                to: "/Purchase-Report",
                exact: true,
              },
            ],
          },
        },
        {
          path: "purchase-order-report",
          name: "PurchaseOrderReport",
          component: PurchaseOrderReports,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["PurchaseOrder Report Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Report",
                disabled: true,
                to: "/Purchase-Order-Report",
                exact: true,
              },
              {
                text: "Purchase Oder Report",
                disabled: false,
                to: "/Purchase-Order-Report",
                exact: true,
              },
            ],
          },
        },
      ],
    },
    {
      path: "/purchase-order",
      name: "PurchaseOrder",
      component: Dashboard,

      children: [
        {
          path: "add",
          name: "AddPurchaseOrder",
          component: PurchaseOrderAdd,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Order Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: true,
                to: "/",
                exact: true,
              },   {
                text: "Purchase Orders",
                disabled: false,
                to: "/purchase-order",
                exact: true,
              },
              {
                text: "Create",
                disabled: false,
                to: "/purchase-order/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/",
          name: "ListPurchaseOrder",
          component: PurchaseOrderList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Order Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Purchase Orders",
                disabled: false,
                to: "/purchase-order",
                exact: true,
              },
            ],
          },
        },
        {
          path: "edit/:id",
          name: "EditPurchaseOrder",
          component: PurchaseOrderEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Order Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Purchase Orders",
                disabled: false,
                to: "/purchase-order",
                exact: true,
              },
              {
                text: ":id",
                disabled: true,
                to: (route) => `${route.param}`,
                exact: true,
              },
              {
                text: "Edit",
                disabled: true,
                to: "/purchase-order",
                exact: true,
              },
            ],
          },
        },
        {
          path: ":id",
          name: "View",
          component: PurchaseOrderView,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Order Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: true,
                to: "/",
                exact: true,
              },   {
                text: "Purchase Orders",
                disabled: false,
                to: "/purchase-order",
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
                to: "/purchase-order/:id",
                exact: true,
              },
            ],
          },
        },
      ],
    },

    {

      path: "/masterdata",
      name: "MasterData",
      component: Dashboard,
      children: [

          {

        path: "category",
        name: "categoryList",
        component: CategoryListComponent,
        beforeEnter: (to, from, next) => {
          checkPermission(to, from, next);
        },
        meta: {
          permission: ["Category Index"],
          breadcrumb: [
            {
              text: "Dashboard",
              disabled: false,
              to: "/",
              exact: true,
            },
            {
              text: "Master Data",
              disabled: true,
              // to: "/",
              exact: true,
            },
            {
              text: "Category",
              disabled: false,
              to: "/masterdata/category",
              exact: true,
            },
          ],
        },


      },
        {
        path: "category/:id",
        name: "categoryView",
        component: CategoryListViewComponent,
        beforeEnter: (to, from, next) => {
          checkPermission(to, from, next);
        },
        meta: {
          permission: ["Category Show"],
          breadcrumb: [
            {
              text: "Dashboard",
              disabled: false,
              to: "/",
              exact: true,
            },
            {
              text: "Master Data",
              disabled: true,
              // to: "/",
              exact: true,
            },
            {
              text: "Category",
              disabled: false,
              to: "/masterdata/category",
              exact: true,
            },
            {
              text: ":id",
              disabled: false,
              to: (route) => `${route.param}`,
              exact: true,
            },
          ],
        },
      },
        {
        path: "unit",
        name: "Unit",
        component: Unit,
        beforeEnter: (to, from, next) => {
          checkPermission(to, from, next);
        },
        meta: {
          permission: ["Unit Index"],
          breadcrumb: [
            {
              text: "Dashboard",
              disabled: false,
              to: "/",
            },
            {
              text: "Master Data",
              disabled: true,
              // to: "/",
            },
            {
              text: "Unit",
              disabled: false,
              to: "/masterdata/unit",
            },
          ],
        },
      },
        {
        path: "brand",
        name: "BRAND",
        component: Brand,
        beforeEnter: (to, from, next) => {
          checkPermission(to, from, next);
        },
        meta: {
          permission: ["Brand Index"],
          breadcrumb: [
            {
              text: "Dashboard",
              disabled: false,
              to: "/",
            },
            {
              text: "MasterData",
              disabled: true,

            },
            {
              text: "Brand",
              disabled: false,
              to: "/masterdata/brand",
            },
          ],
        },
      },
        {

          path: "expense-category",
          name: "Expense Category List",
          component: ExpenseCategoryList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Brand Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Master Data",
                disabled: true,
                // to: "/",
                exact: true,
              },
              {
                text: "Expense Category",
                disabled: true,
                exact: true,
              },
            ],
          },


        },
        {

          path: "income-category",
          name: "Expense Category List",
          component: IncomeCategoryList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Unit Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Master Data",
                disabled: true,
                // to: "/",
                exact: true,
              },
              {
                text: "Income Category",
                disabled: true,
                exact: true,
              },
            ],
          },


        },
      ]



    },

    {
      path: "/setting",
      name: "setting",
      component: Dashboard,
      children: [



        {
          path: "pos",
          name: "POS Setting",
          component: PosSetting,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Pos setting Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
              },
              {
                text: "Settings",
                disabled: true,
                // to: "/",
              },
              {
                text: "Pos Settings",
                disabled: true,
                //to: "/setting/warehouse",
              },
            ],
          },
        },

        {
          path: "organization",
          name: "Organization",
          component: Organization,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Organization Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
              },
              {
                text: "Settings",
                disabled: true,
                // to: "/",
              },
              {
                text: "Organization",
                disabled: true,
                //to: "/setting/warehouse",
              },
            ],
          },
        },





        {
          path: "sites",
          name: "SiteSetting",
          component: SiteSetting,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Site setting Index"],   
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
              },
              {
                text: "Settings",
                disabled: true,
                // to: "/",
              },
              {
                text: "Site Setting",
                disabled: true,
                //to: "/setting/warehouse",
              },
            ],
          },
        },



      ],
    },
    {
      path: "/purchase",
      name: "purchases",
      component: Dashboard,
      children: [
        {
          path: "add",
          name: "AddPurchase",
          component: PurchaseAdd,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: true,
                to: "/purchase",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: false,
                to: "/purchase",
                exact: true,
              },
              {
                text: "Create",
                disabled: true,
                to: "/purchase/add",
                exact: true,
              },
            ],
          },
        }, {
          path: "/changepassword",
          name: "ChangePassword",
          component: ChangePasswordComponent,
          meta: {
            permission: ["Purchase Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "ChangePassword",
                disabled: false,

                exact: true,
              },
            ],
          },
        },
        {
          path: "/warehouse",
          name: "warehouse",
          component: Warehouse,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Ware House Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Warehouses",
                disabled: false,
                to: "/warehouse",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/warehouse/:id",
          name: "warehouse",
          component: WarehouseView,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Ware House Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Warehouses",
                disabled: false,
                to: "/warehouse",
                exact: true,
              },

              {
                text: ":id",
                disabled: false,
                to: (route) => `${route.param}`,
                exact: true,
              },
              {
                text: "view",
                disabled: false,
                to: "/warehouse/:id",
                exact: true,
              },
            ],
          },
        },
     

        
        
        {
          path: "/shop/add",
          name: "Create shop",
          component: ShopComponentCreate,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Shop Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
              },

              {
                text: "Shops",
                disabled: false,
                to: "/shop",
                exact: true,

              },
              {
                text: "create",
                disabled: false,
                to: "/shop/add",

              },
            ],
          },
        },

        {
          path: "/shop/edit/:id",
          name: "EditShop",
          component: ShopComponentEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Shop Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Shops",
                disabled: false,
                to: "/shop",
                exact: true,
              },
              {
                text: ":id",
                disabled: true,
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
          path: "/shop/:id",
          name: "View",
          component: ShopComponentDetails,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Shop Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Shops",
                disabled: false,
                to: "/product",
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
                to: "shop/:id",
                exact: true,
              },
            ],
          },
        },

     
        {
          path: "/shop",
          name: "shop",
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          component: ShopComponent,
      
          meta: {
            permission: ["Shop Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
              },

              {
                text: "Shop",
                disabled: false,

              },
            ],
          },
        },
        
        {
          path: "/",
          name: "PurchaseList",
          component: PurchaseList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: true,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: false,
                to: "/purchase",
                exact: true,
              },
            ],
          },
        },
        {
          path: "edit/:id",
          name: "Edit",
          component: PurchaseEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Purchases",
                disabled: false,
                to: "/purchase",
                exact: true,
              },
              {
                text: ":id",
                disabled: true,
                to: (route) => `${route.param}`,
                exact: true,
              },
              {
                text: "edit",
                disabled: true,
                to: "/edit/:id",
                exact: true,
              },
            ],
          },
        },
        {
          path: ":id",
          name: "View",
          component: PurchaseView,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Purchases",
                disabled: false,
                to: "/purchase",
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
                to: "/purchase/:id",
                exact: true,
              },
            ],
          },
        },
        {
          path: ":id/payment/:paymentId",
          name: "Edit",
          component: PurchasePaymentView,
          // beforeEnter: (to, from, next) => {
          //   checkPermission(to, from, next);
          // },
          meta: {
            //permission: ["Purchase Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchase",
                disabled: false,
                to: "/purchase",
                exact: true,
              },
              {
                text: ":id",
                disabled: false,
                to: (route) => `${route.param}`,
                exact: true,
              },
              {
                text: "payment",
                disabled: false,
                to: "/payment",
                exact: true,
              },
              
            ],
          },
        },
      ],
    },
    {
      path: "/purchase-return",
      name: "Purchase Return",
      component: Dashboard,
      children: [
        {
          path: "add",
          name: "AddPurchaseOrder",
          component: PurchaseAddReturn,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Return Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Purchase Returns",
                disabled: false,
                to: "/purchase-return",
                exact: true,
              },
              {
                text: "create",
                disabled: false,
                to: "/purchase-return/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: "edit/:id",
          name: "Edit",
          component: PurchaseReturnEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Return Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: true,
                to: "/",
                exact: true,
              },  {
                text: "Purchase Returns",
                disabled: false,
                to: "/purchase-return",
                exact: true,
              },
              {
                text: ":id",
                disabled: true,
                to: "/purchase-return",
                exact: true,
              },
              {
                text: "Edit",
                disabled: true,
                to: "/purchase-return/edit/:id",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/",
          name: "Edit",
          component: PurchaseReturnList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Return Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchases",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Purchase Returns",
                disabled: false,
                to: "/purchase-return",
                exact: true,
              },
            ],
          },
        },
        {
          path: ":id",
          name: "View",
          component: PurchaseReturnView,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Purchase Return Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Purchase Returns",
                disabled: false,
                to: "/purchase-return",
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
                disabled: false,
                to: "/purchase-return/1",
                exact: true,
              },
            ],
          },
        },
      ],
    },
    {
      path: "/setting",
      name: "setting",
      component: Dashboard,
      children: [


      ],
    },

    {
      path: "/das",
      name: "Stock",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        checkPermission(to, from, next);
      },
      children: [
        {
          path: "/stock",
          name: "Stock",
          component: StockList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Stocks Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Stocks",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Warehouse",
                disabled: false,
                to: "/stock",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/shop-stock",
          name: "Shop Stock",
          component: ShopStockList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Stocks Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Stocks",
                disabled: true,
                to: "/",
                exact: true,
              },
              {
                text: "Shop",
                disabled: true,
                to: "/",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/stock-transfer/add",
          name: "Stock",
          component: StockTransferAdd,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Transfer Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Stocks",
                disabled: true,
                to: "/",
                exact: true,
              },  {
                text: "Stock Transfer",
                disabled: false,
                to: "/stock-transfer",
                exact: true,
              },
              {
                text: "create",
                disabled: false,
                to: "/stock-transfer/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/stock-transfer/edit/:id",
          name: "Stock",
          component: StockTransferEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Transfer Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Stocks",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Stock Transfer",
                disabled: false,
                to: "/stock-transfer",
                exact: true,
              },
              {
                text: ":id",
                disabled: true,
                to: "/stock-transfer",
                exact: true,
              },
              {
                text: "edit",
                disabled: true,
                to: "/stock-transfer",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/stock-transfer",
          name: "Stock",
          component: StockTransferList,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Transfer Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Stocks",
                disabled: true,
                to: "/",
                exact: true,
              },  {
                text: "Stock-Transfer",
                disabled: false,
                to: "/stock-transfer",
                exact: true,
              },

            ],
          },
        },
        {
          path: "/stock-transfer/:id",
          name: "Stock",
          component: StockTransferDetails,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Transfer Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Stocks",
                disabled: true,
                to: "/",
                exact: true,
              },  {
                text: "Stock Transfer",
                disabled: false,
                to: "/stock-transfer",
                exact: true,
              },
              {
                text: ':id',
                disabled: true,
                to: "/stock/transfer",
                exact: true,
              },
              {
                text: 'view',
                disabled: true,
                to: "/stock/transfer",
                exact: true,
              },
            ],
          },
        },

        {
          path: "add",
          name: "AddProduct",
          component: ProductAdd,
          // beforeEnter: (to, from, next) => {
          //   checkPermission(to, from, next);
          // },
          meta: {
            permission: ["Product Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Products",
                disabled: false,
                to: "/product",
                exact: true,
              },

              {
                text: "create",
                disabled: false,
                to: "/stock/transfer/add",
                exact: true,
              },
            ],
          },
        },
      ],
    },
    {
      path: "/customer",
      name: "Customer",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        checkPermission(to, from, next);
      },
      children: [
        {
          path: "/",
          name: "CustomerList",
          component: CustomerList,
          meta: {
            permission: ["Customer Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Customers",
                disabled: false,
                to: "/customer",
                exact: true,
              },
            ],
          },
        },
        {
          path: "edit/:id",
          name: "EditCustomer",
          component: CustomerEdit,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Customer Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Customers",
                disabled: false,
                to: "/customer",
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
          name: "CreateCustomer",
          component: CustomerAdd,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Customer Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Customers",
                disabled: false,
                to: "/customer",
                exact: true,
              },
              {
                text: "Create",
                disabled: false,
                to: "/customer/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: ":id",
          name: "ViewCustomer",
          component: CustomerView,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Customer Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Customers",
                disabled: false,
                to: "/customer",
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
      ],
    },
    {
      path: "/discount",
      name: "Discount",
      component: Dashboard,
      children: [
        {
          path: "add",
          name: "AddPurchase",
          component: DiscountCreateComponent,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Discount Create"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Discount",
                disabled: false,
                to: "/discount",
                exact: true,
              },
              {
                text: "Create",
                disabled: false,
                to: "/add",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/",
          name: "Discount",
          component: DiscountListComponent,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Discount Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Discount",
                disabled: false,
                to: "/discount",
                exact: true,
              },
            ],
          },
        },
        {
          path: "edit/:id",
          name: "Edit",
          component: DiscountCreateComponent,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
            permission: ["Discount Edit"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Discount",
                disabled: false,
                to: "/discount",
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
                disabled: false,
                to: "/edit/:id",
                exact: true,
              },
            ],
          },
        },
        {
          path: ":id",
          name: "View",
          component: DiscountDetailsComponent,
          beforeEnter: (to, from, next) => {
            checkPermission(to, from, next);
          },
          meta: {
             permission: ["Discount Show"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Discount",
                disabled: false,
                to: "/discount",
                exact: true,
              },
              {
                text: "Details",
                disabled: false,
                to: (route) => `${route.param}`,
                exact: true,
              },
            ],
          },
        },
      ],
    },
    {
      path: "/cheque/",
      name: "Cheque Management",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        checkPermission(to, from, next);
      },
      children: [
        {
          path: "",
          name: "Cheques",
          component: ChequeList,
          meta: {
            permission: ["Cheques Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Transactions",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Cheques",
                disabled: false,
                to: "/cheque",
                exact: true,
              },
            ],
          },
        }
      ],
    },
    {
      path: "/expenses/",
      name: "Expenses",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        checkPermission(to, from, next);
      },
      children: [
        {
          path: "",
          name: "Expenses",
          component: ExpensesList,
          meta: {
            permission: ["Cheques Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Transactions",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Expenses",
                disabled: false,
                to: "/expenses",
                exact: true,
              },
            ],
          },
        }
      ],
    },
    {
      path: "/incomes/",
      name: "income",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        checkPermission(to, from, next);
      },
      children: [
        {
          path: "",
          name: "Incomes",
          component: IncomesList,
          meta: {
            permission: ["Cheques Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Transactions",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Income",
                disabled: false,
                to: "/incomes",
                exact: true,
              },
            ],
          },
        }
      ],
    },
    {
      path: "/payment",
      name: "Payments ",
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        checkPermission(to, from, next);
      },
      children: [
        {
          path: "",
          name: "Payments",
          component: PaymentList,
          meta: {
            permission: ["Cheques Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Transactions",
                disabled: true,
                to: "/",
                exact: true,
              },
              {
                text: "Payments",
                disabled: false,
                to: "/payment",
                exact: true,
              },
            ],
          },
        },
        {
          path: "/payment/:id",
          name: "PaymentView",
          component: PaymentView,
          meta: {
            permission: ["Cheques Index"],
            breadcrumb: [
              {
                text: "Dashboard",
                disabled: false,
                to: "/",
                exact: true,
              },
              {
                text: "Transactions",
                disabled: true,
                to: "/",
                exact: true,
              }, {
                text: "Payments",
                disabled: false,
                to: "/payment",
                exact: true,
              },
              {
                text: ":id",
                disabled: false,
                to: "/:id",
                exact: true,
              },
            ],
          },
        }
      ],
    },
  ];
}

export default router;
