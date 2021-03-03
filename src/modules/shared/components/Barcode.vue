<template>
  <div class="d-flex justify-center">
    <v-text-field v-if="generatorVisibility"
                  label="Barcode"
                  :disabled="isNotNew"
                  append-icon="mdi-sync"
                  v-model="barcodeValue"
                  outlined
                  @click:append="generateCode"
    ></v-text-field>

    <VueBarcode :width="width" :height="height" style="display: contents;" :display-value="barcodeNumber" v-if="barcodeVisibility" v-bind:value="barcodeValue">
      Show this if the rendering fails.
    </VueBarcode>
  </div>
</template>
<script>
import VueBarcode from 'vue-barcode';


export default {
  props: {
    height:{
      type:Number,
      default:25
    },
    width:{
      type:Number,
      default:2
    },
    generatorVisibility: {
      type: Boolean,
      default: false
    },
    barcodeVisibility: {
      type: Boolean,
      default: true
    }, barcodeValue: {
      type: String,
    },
    barcodeNumber:{
      type:Boolean,
      default:true
    },
    isNotNew:{
      type:Boolean,
      default:false
    },

  },
  data: () => ({}),
  methods: {
    generateCode() {
      this.barcodeValue = String(new Date().getTime());
      this.$emit("input", this.barcodeValue);
    }
  }, components: {
    VueBarcode
  },mounted(){
    if(this.barcodeValue==""){
      this.barcodeValue=String(new Date().getTime());
    }
  }
}
</script>