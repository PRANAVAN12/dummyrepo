import * as moment from "moment/moment";
export class Discount {
    constructor() {
        this.name = "";
        this.start = moment(new Date()).format("YYYY-MM-DD");
        this.end = moment(new Date()).format("YYYY-MM-DD");
        this.hasEnd = false;
        this.purchasingProducts = []
        this.purchasingConditions = [];
        this.selectedWarehouses = [];
        this.selectedCustomerGroups = [];
        this.selectedPurchasingProductCategories = [];
        this.selectedPurchasingBrands = [];
        this.selectedProducts = [];
        this.purchasingOperands = [];
        this.selectedWarehouses = [];
        this.selectedCustomerGroups = [];
        this.selectedPurchasingType = null;
        this.selectedPurchasingOperator = null;
        this.selectedPurchasingOperand = null;
        this.selectedWarehouseOption = true;
        this.selectedCustomerGroupOption = true;
        this.purchasingTypes = [
            { text: "Total", value: "Total Amount" },
            { text: "Brand", value: "Brand" },
            { text: "Product Category", value: "Category" },
            { text: "Product", value: "Product" },
        ];
        this.purchasingOperators = [
            { text: "Above/Equal", value: "Above/Equal" },
            { text: "Match", value: "Match" },
        ];


        //#region offer
        this.offerProducts = [];
        this.selectedOfferProducts = [];
        this.offerTypes = [
            { text: "Total", value: "Total" },
            { text: "Product", value: "Product" },
        ];
        this.offerOperators = [
            { text: "Equal", value: "Equal" },
        ];
        this.offerOperands = [];
        this.selectedOfferType = null;
        this.selectedOfferValue = null;
        this.selectedOfferOperator = null;
        this.operandValue
            = null;
        this.selectedOfferoperandValue
            = null;
        //#endregion offer

        this.purchasingConditionBrandError = ""
        this.purchasingConditionProductCantegoryError = ""
        this.offerProductError = ""
        this.offerOperatorError = ""
        this.offerOperandError = ""
        this.purchasingOperandError = ""
        this.purchasingOperatorError = ""
        this.purchasingTypeError = ""
        this.offerHasEnd = false;
        this.offerHasMaximum = false;
        this.offerMaximumValue = 0;


    }


    toViewModel(discount) {

        this.id = discount.id ? discount.id : '';
        this.is_active = discount.is_active ? discount.id : '';
        this.name = discount.name ? discount.name : '';
        this.start = discount.start_date ? moment(new Date(discount.start_date)).format("YYYY-MM-DD") : '';
        this.end = discount.end_date ? moment(new Date(discount.end_date)).format("YYYY-MM-DD") : '';
        this.hasEnd = !discount.has_end;

        this.selectedWarehouseOption = discount.is_all_warehouses;
        this.selectedWarehouses = discount.wareHouses ? discount.wareHouses : '';

        this.selectedCustomerGroupOption = discount.is_all_customer_groups;
        this.selectedCustomerGroups = discount.customerGroups ? discount.customerGroups : '';

        this.selectedOfferType = discount.offer ? discount.offer.type : '';
        this.selectedOfferOperator = discount.offer ? discount.offer.operator : '';
        this.selectedOfferOperand = discount.offer ? discount.offer.operand : '';
        this.selectedOfferoperandValue = discount.offer ? discount.offer.value : '';
        debugger
        if (discount.offer) {
            this.offerHasMaximum = discount.offer.has_maximum;
            this.offerMaximumValue = discount.offer.maximum_value;
        }


        if (this.selectedOfferType == "Total") {
            this.offerOperands = [
                { text: "Amount", value: "Amount" },
                { text: "Percentage", value: "Percentage" },
            ];
            this.selectedOfferOperand = "Amount";
        } else {
            if (this.selectedOfferType == "Product") {
                this.offerOperands = [{ text: "Qty", value: "Quantity" }];
                this.selectedOfferOperand = "Quantity";
            } else {
                this.offerOperands = [
                    { text: "Qty", value: "Quantity" },
                    { text: "Amount", value: "Amount" },
                ];
            }
        }

        this.purchasingConditions = []
        discount.discountConditions && discount.discountConditions.forEach(condition => {
            debugger
            let tempCondition = {
                type: condition.type,
                operator: condition.operator,
                operand: condition.operand,
                operandValue: condition.discountConditionValues.value

            }
            if (condition.type == "Product") {
                tempCondition.value = [];
                condition.discountConditionValues.productDiscountConditionValues.forEach(conditionValue => {
                    let productTypeValue = {
                        product: conditionValue.product,
                        selectedProduct: conditionValue.product,
                        selectedProductId: conditionValue.product.id,
                        batch: {},
                        unit: conditionValue.unit,
                        selectedUnitId: conditionValue.unit.id,
                    };
                    productTypeValue.hasBatch = productTypeValue.batch ? true : false;

                    productTypeValue.batches = conditionValue.product.batches ? conditionValue.product.batches : [];
                    productTypeValue.units = conditionValue.product.units ? conditionValue.product.units : [];
                    if (conditionValue.batch) {
                        productTypeValue.batch = conditionValue.batch;
                        productTypeValue.selectedBatchId = conditionValue.batch.id
                    }
                    tempCondition.value.push(
                        productTypeValue
                    )
                });
            } else if (condition.type == "Brand") {
                debugger
                tempCondition.value = [];
                condition.discountConditionValues.brands.forEach(brand => {

                    tempCondition.value.push(
                        brand
                    )
                });
            } else if (condition.type == "Category") {
                debugger
                tempCondition.value = [];
                condition.discountConditionValues.categories.forEach(brand => {

                    tempCondition.value.push(
                        brand
                    )
                });
            }
            if (condition.type == "Total Amount") {
                this.purchasingOperands = [
                    { text: "Amount", value: "Amount" },
                ];
            } else {
                this.purchasingOperands = [
                    { text: "Qty", value: "Quantity" },
                    { text: "Amount", value: "Amount" },
                ];
            }

            this.purchasingConditions.push(tempCondition);
        });


        console.log('----------------------------------------------');
        console.log(this);
        console.log('----------------------------------------------');


        return this;

    }


    toRequestModel() {
        let discount = this;

        let discountRequest = {
            name: discount.name,
            start_date: discount.start,
            end_date: discount.end,
            has_end: !discount.hasEnd,
            is_all_warehouses: discount.selectedWarehouseOption,
            is_all_customer_groups: discount.selectedCustomerGroupOption,
            customer_groups: discount.selectedCustomerGroups.map(v => {
                return v.id
            }),
            warehouses: discount.selectedWarehouses.map(v => {
                return v.id
            }),
            conditions: []
        }
        discount.purchasingConditions.forEach(con => {
            debugger
            let condition = {
                type: con.type,
                operator: con.operator,
                operand: con.operand,
                operand_value: con.operandValue
            }
            if (con.type == 'Product') {
                condition.type_value = [];
                con.value.forEach(val => {
                    let product = {
                        product_id: val.product.id,
                        unit_id: val.unit.id,
                    }
                    if (val.hasBatch) {
                        product.batch_id = val.batch.id;
                    }
                    condition.type_value.push(
                        product
                    )
                });
            } else if (con.type == 'Brand') {
                condition.type_value = con.value.map(v => {
                    return v.id
                })
            } else if (con.type == 'Category') {
                condition.type_value = con.value.map(v => {
                    return v.id
                })
            } else {
                condition.type_value = con.value
            }
            discountRequest.conditions.push(condition);

        });

        let offer = {
            type: discount.selectedOfferType,
            products: discount.operandValue,
        }

        if (offer.type == 'Product') {
            debugger
            offer.products = [];
            discount.selectedOfferProducts.forEach(val => {
                let product = {
                    product_id: val.selectedProduct.id,
                    unit_id: val.selectedUnitId,
                }
                if (val.selectedBatchId && val.selectedBatchId > 0) {
                    product.batch_id = val.selectedBatchId;
                }

                if (val.quantity && val.quantity > 0) {
                    product.quantity = val.quantity;
                }

                if (val.maxQuantity && val.maxQuantity > 0) {
                    product.maximum_quantity = val.maxQuantity;
                }

                offer.products.push(product)
            })
        } else {
            offer.operand = discount.selectedOfferOperand
            offer.operator = discount.selectedOfferOperator
            offer.value = discount.selectedOfferoperandValue
            if (discount.offerMaximumValue && +discount.offerMaximumValue > 0) {
                offer.maximum_value = +discount.offerMaximumValue
            }
        }
        discountRequest.offer = offer;
        return discountRequest;
    }


}