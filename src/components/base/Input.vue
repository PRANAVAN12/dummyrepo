<template>
  <!-- <form-group :name="getname()"> -->
  <!-- <v-text-field
      prepend-icon=""
      slot-scope="{attrs, listeners}"
      v-bind="attrs"
      v-on="listeners"
      v-model="name"
      @change="onChange"
      @input="onInput"
      @update="onUpdate"
      @blur="onBlur"
  />-->

  <v-text-field
    label="E-mail"
    v-model="name"
    :error-messages="emailErrors"
    @change="onChange"
    @input="onInput"
    @update="onUpdate"
    @blur="onBlur"
    required
  ></v-text-field>
  <!-- </form-group> -->
</template>

<script>
import VuelidateMixin from "../../mixins/VuelidateMixins";
import required from "vuelidate/lib/validators";
// import singleErrorExtactor from "vuelidate-error-extractor";

export default {
  mixins: [VuelidateMixin],
  props: {
    value: {
      type: String,
    },
    errors: [],
    // type: {
    //   type: String,
    //   default: '',
    //   required:true
    // }
  },
  computed: {
    name: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    onChange(value) {
      this.$emit("change", value);
    },
    onInput(value) {
      this.$emit("input", value);
    },
    onUpdate(value) {
      this.$emit("update", value);
    },
    onBlur(event) {
      this.$emit("blur", event);
    },
  },
  data() {
    return {
      emailErrors: ["hgdfuihsduf"],
    };
  },
  validations: {
    data: {
      username: { required },
      password: { required },
    },
  },
};
</script>
