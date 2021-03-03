<template>
<div>
    
</div>
</template>
<script>
import { Discount } from "../../models/View Models/DiscountViewModel";

export default {
  data: () => ({
      discount:new Discount()
  }),
  methods: {
    getDiscount() {
      let productId = this.$route.params.id;
      this.$store
        .dispatch("discount/discounts", id)
        .then((res) => {
          this.discount = this.discount.toViewModel(res.data);
          console.log( this.discount);
        })
        .catch((err) => {
          this.messages.push(err.data.title);
        });
    },
  },
};
</script>