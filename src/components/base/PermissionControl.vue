<template>
  <div class="permission-content" >
    <slot />
  </div>
</template>

<script>
//v-if="userHasPermission()"
import { mapState } from "vuex";
export default {
  name: "permission-control",
  props: ["permissionName"],
  data: () => ({
    status: false,
  }),
  methods: {
    userHasPermission() {
      let permissions = this.policies;
      let filtered = permissions.map(
        (item) => item.name == this.permissionName
      );
      let hadpermission = filtered.includes(true);
      return hadpermission;
      // return this.policies.map((item) => item.name ==this.permissionName)
    },
  },
  computed: {
    ...mapState("user", ["policies"]),
  },
  // render() {
  //   // EDITABLE case. Don't change anything and just render control as is.
  //   if (userHasPermission(this.permissionName, EDITABLE)) {
  //     return this.$slots.default[0];
  //   }
  //   // If user has no EDITABLE permission, but he has 'VISIBLE',
  //   // let's change "disabled" prop value to the true
  //   if (userHasPermission(this.permissionName, VISIBLE)) {
  //     this.$slots.default[0].componentOptions.propsData.disabled = true;
  //     return this.$slots.default[0];
  //   }
  //   // User has permission for nothing! Let's don't show him anything!
  //   return null;
  // }
};
</script>
<style scoped>
.permission-content {
  display: contents;
}
</style>