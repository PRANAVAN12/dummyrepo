<template>
  <div>
    <div>
    <img src="../../assets/img/svg/empty.svg" />
    <h4
      class="subtitle-1 mt-6"
      style="font-weight: inherit font-size: 1.25rem;"
    >
      You don’t have any {{ name }} yet.
    </h4>
    <p style="font-size: 0.875rem; color: rgb(0 0 0 / 0.59)">
      {{ appName }} is waiting for you to create your {{ name }}.
    </p>
  </div>
  </div>
</template>

<script>
import env from "@/config/env";

export default {
  props: {
    name: String,
  },
  computed: {
    appName() {
      return env.name;
    },
  },
};
</script>