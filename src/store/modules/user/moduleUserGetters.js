/*=========================================================================================
  File Name: moduleUserGetters.js
  Description: User Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Useror: SpeedCodeLabs
  Useror URL: http://www.speedcodelabs.com
==========================================================================================*/

export default {
  GetUser(state){
    return state.user
  },
  GetPolicies(state){
    return state.policies
  },
  GetMenuList(state) {
     var items= [
      {
        icon: "mdi-home-circle-outline",
        "icon-alt": "mdi-home-circle",
        text: "Dashboard",
        // model: true,
        link: "/",
        policy: ["Leave Index"],
      },
      {
        icon: "mdi-account-multiple-outline",
        "icon-alt": "mdi-account-multiple-plus",
        text: "Staffs",
        link: "/staff",
        policy: ["Staff Index"],
      },

      {
        icon: "mdi-calendar-multiple",
        "icon-alt": "mdi-calendar-multiple",
        text: "Leaves",
        policy: ["Leave Index"],
        children: [
          {
            icon: "mdi-calendar-plus",
            text: "Request",
            link: "/leave",
            policy: ["Leave Index"],
          },
          {
            icon: "mdi-calendar-multiple-check",
            text: "Approvals",
            link: "/staff_leave",
            policy: ["Leave Index"],
          },
        ],
      },

      {
        icon: "mdi-calendar-clock",
        text: "Event",
        link: "/event",
        policy: ["Event Index"],
      },
      {
        icon: "mdi-fingerprint",
        text: "Attendance",
        link: "/attendance",
        policy: ["Leave Index"],
      },
      {
        icon: "mdi-cog-transfer",
        text: "Master Data",
        link: "/master-data",
        policy: ["Salutation Index"],
      },
      {
        icon: "mdi-wrench-outline",
        "icon-alt": "mdi-wrench",
        text: "Settings",
        policy: ["User Index"],
        children: [
          {
            icon: "mdi-account-circle-outline",
            text: "Users",
            link: "/user",
            policy: ["User Index"],
          },
          {
            icon: "mdi-shield-lock",
            text: "Roles",
            link: "/role",
            policy: ["Role Index"],
          },
        ],
      },
    ]
    var itemList=[]
    items.map((item) => {
      var permission = state.user.permissions;
      debugger
      var hasPermission = _.find(permission, function(permission) {
        return permission.name == item.policy;
      });

      if (hasPermission) {
        itemList.push(item);
      }
    });
    return itemList;


  }
};
