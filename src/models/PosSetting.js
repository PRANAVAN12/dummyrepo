export class PosSetting {
  constructor() {
    (this.defaultcategory = ""),
      (this.defaultcategorygroup = ""),
      (this.displaytime = ""),
      (this.onscreenkeyboard = ""),
      (this.dislaycustomerdetails = "");
  }
  initialise(initialiser) {
     
    const possetting = new PosSetting();
    (possetting.defaultcategory = initialiser.category.name
      ? initialiser.category.name
      : ""),
      (possetting.defaultcategorygroup = initialiser.customerGroup.name
        ? initialiser.customerGroup.name
        : ""),
      (possetting.displaytime = initialiser.display_time
        ? initialiser.display_time
        : false),
      (possetting.onscreenkeyboard = initialiser.on_screen_keyboard
        ? initialiser.on_screen_keyboard
        : false),
      (possetting.dislaycustomerdetails = initialiser.display_customer_details_on_receipt
        ? initialiser.display_customer_details_on_receipt
        : false);

    return possetting;
  }
}
