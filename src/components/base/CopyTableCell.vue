<template>
  <div class="d-flex" @mouseover="showCopy" @mouseleave="hideCopy">
    <span class="pr-3 cursor-pointer">{{text}}</span>
    <v-tooltip bottom v-if="hovered">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-clipboard:copy="text"
         @click="$event.stopPropagation();onCopy"
          color="Black"
          v-bind="attrs"
          v-on="on"
          small
        >mdi-content-copy</v-icon>
      </template>
      <span>{{tooltipText}}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "TEST ONE",
    },
  },
  data() {
    return {
      hovered: false,
      left: true,
      tooltipText: "Copy",
    };
  },
  methods: {
    trigger() {},
    showCopy() {
      this.left = false;
      setTimeout(() => {
        if (!this.left) {
          this.hovered = true;
        } else {
          this.hovered = false;
        }
      }, 300);
    },
    hideCopy() {
      this.left = true;
      this.hovered = false;
      this.tooltipText = "Copy";
    },
    onCopy() {
      this.tooltipText = "Copied to clipboard !";
    },
  },
};
</script>