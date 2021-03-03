<template>
  <div>
    <PageTitle
      title="Create Discount"
      :backBtn="true"
      :permission="'Discount Create'"
    />
    <v-container fluid class="lighten-12 pt-0">
      <v-row>
        <v-col cols="12" lg="4" md="12" sm="12">
          <ValidationObserver ref="discountObserver">
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>General</v-card-title>
                  <v-container>
                    <v-row>
                      <v-col cols="12 ">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Discount name"
                          rules="required"
                        >
                          <v-text-field
                            :error-messages="errors"
                            v-model="discount.name"
                            outlined
                            dense
                            hide-details="auto"
                            label="Discount Name"
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12 ">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Start"
                          rules="required"
                        >
                          <datePickComponent
                            :error-messages="errors"
                            v-model="discount.start"
                            labelname="Start"
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <datePickComponent
                          v-model="discount.end"
                          labelname="End"
                          :disabled="discount.hasEnd"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-checkbox
                          v-model="discount.hasEnd"
                          color="#002db3"
                          dense
                          hide-details="auto"
                          label="Do not set end date for this discount"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card>
                  <v-card-title>Customer Groups</v-card-title>
                  <v-container>
                    <v-row>
                      <v-col cols="12 pb-0">
                        <v-radio-group
                          v-model="discount.selectedCustomerGroupOption"
                          column
                        >
                          <v-radio
                            color="#002db3"
                            label="All Customers"
                            :value="true"
                          ></v-radio>
                          <v-radio
                            color="#002db3"
                            label="Particular customer group/s"
                            :value="false"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                    <v-row v-if="!discount.selectedCustomerGroupOption">
                      <v-col cols="12 pb-0">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Customer group"
                          rules="required"
                        >
                          <v-combobox
                            :error-messages="errors"
                            v-model="discount.selectedCustomerGroups"
                            :items="customerGroups"
                            hide-selected
                            label="Customer groups"
                            multiple
                            persistent-hint
                            small-chips
                            outlined
                            :search-input.sync="searchCustomerGroups"
                            item-text="name"
                            item-value="id"
                          >
                            <template
                              v-slot:selection="{
                                attrs,
                                item,
                                parent,
                                selected,
                              }"
                            >
                              <v-chip
                                v-if="item === Object(item)"
                                v-bind="attrs"
                                color="lightgray"
                                :input-value="selected"
                                label
                                small
                              >
                                <span class="pr-2">
                                  {{ item.name }}
                                </span>
                                <v-icon small @click="parent.selectItem(item)"
                                  >close</v-icon
                                >
                              </v-chip>
                            </template>
                          </v-combobox>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card>
                  <v-card-title>Warehouses</v-card-title>
                  <v-container>
                    <v-row>
                      <v-col cols="12 pb-0">
                        <v-radio-group
                          v-model="discount.selectedWarehouseOption"
                          column
                        >
                          <v-radio
                            color="#002db3"
                            label="All Warehouses"
                            :value="true"
                          ></v-radio>
                          <v-radio
                            color="#002db3"
                            label="Particular warehouse/s"
                            :value="false"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                    <v-row v-if="!discount.selectedWarehouseOption">
                      <v-col cols="12 pb-0">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Warehouse"
                          rules="required"
                        >
                          <v-combobox
                            :error-messages="errors"
                            v-model="discount.selectedWarehouses"
                            :items="warehouses"
                            hide-selected
                            label="Warehouses"
                            multiple
                            persistent-hint
                            small-chips
                            outlined
                            :search-input.sync="searchWarehouse"
                            item-text="name"
                            item-value="id"
                          >
                            <template
                              v-slot:selection="{
                                attrs,
                                item,
                                parent,
                                selected,
                              }"
                            >
                              <v-chip
                                v-if="item === Object(item)"
                                v-bind="attrs"
                                color="lightgray"
                                :input-value="selected"
                                label
                                small
                              >
                                <span class="pr-2">
                                  {{ item.name }}
                                </span>
                                <v-icon small @click="parent.selectItem(item)"
                                  >close</v-icon
                                >
                              </v-chip>
                            </template>
                          </v-combobox>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </ValidationObserver>
        </v-col>

        <v-col cols="12" lg="8" md="12" sm="12">
          <ValidationObserver ref="discountConditionObserver">
            <v-row>
              <v-col lg="">
                <v-card>
                  <v-card-title>Purchasing Conditions</v-card-title>
                  <v-container>
                    <v-col cols="12" v-if="purchasingConditionError != ''">
                      <v-flex
                        v-model="purchasingConditionError"
                        class="product-red"
                      >
                        {{ purchasingConditionError }}
                      </v-flex>
                    </v-col>
                    <div>
                      <v-container>
                        <v-row
                          :class="
                            discount.selectedPurchasingType != 'Total Amount'
                              ? 'sub-section'
                              : ''
                          "
                        >
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <ValidationProvider
                              v-slot="{ errors }"
                              name="Discount type"
                              rules="required"
                            >
                              <v-autocomplete
                                v-model="discount.selectedPurchasingType"
                                item-text="text"
                                item-value="value"
                                :items="discount.purchasingTypes"
                                :error-messages="errors"
                                outlined
                                required
                                dense
                                hide-details="auto"
                                label="Purchasing Types"
                                @change="
                                  onChangePurchasingType(
                                    discount.purchasingTypeError
                                  )
                                "
                              ></v-autocomplete>
                            </ValidationProvider>
                          </v-col>
                          <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PERODUCT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                          <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            lg="12"
                            class="py-0"
                            v-if="discount.selectedPurchasingType == 'Product'"
                          >
                            <v-row>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-autocomplete
                                  item-text="name"
                                  item-value="id"
                                  v-model="selectedProductId"
                                  :items="discount.purchasingProducts"
                                  outlined
                                  required
                                  dense
                                  hide-details="auto"
                                  label="Product"
                                  :error-messages="
                                    discount.purchasingConditionProductError
                                  "
                                  :search-input.sync="searchPurchasingProducts"
                                  :loading="purchasingProductLoading"
                                  @change="onChangePurchasingProduct()"
                                ></v-autocomplete>
                              </v-col>
                              <v-col class="d-flex align-end px-0">
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                      class="icon_medium add-arrow-icon"
                                      color="#13928e"
                                      @click="addDiscountProduct"
                                      v-bind="attrs"
                                      v-on="on"
                                      >mdi-subdirectory-arrow-left</v-icon
                                    >
                                  </template>
                                  <span>Add Product</span>
                                </v-tooltip></v-col
                              >
                            </v-row>
                            <!-- <v-card-title>Products</v-card-title> -->
                            <v-row>
                              <v-col cols="12">
                                <v-data-table
                                  :headers="puchasingProductsHeaders"
                                  :items="discount.selectedProducts"
                                  :items-per-page="5"
                                  hide-default-footer
                                >
                                  <template v-slot:item.name="{ item }">
                                    {{ item.selectedProduct.name }}
                                  </template>
                                  <template v-slot:item.unit="{ item }">
                                    <v-autocomplete
                                      v-model="item.selectedUnitId"
                                      item-text="name"
                                      item-value="id"
                                      :items="item.units"
                                      outlined
                                      required
                                      dense
                                      hide-details="auto"
                                    ></v-autocomplete>
                                  </template>
                                  <template v-slot:item.hasBatch="{ item }">
                                    <div v-if="item.batches.length > 0">
                                      <v-checkbox
                                        dense
                                        hide-details="auto"
                                        v-model="item.hasBatch"
                                      ></v-checkbox>
                                    </div>
                                  </template>
                                  <template v-slot:item.batch="{ item }">
                                    <div v-if="item.hasBatch">
                                      <v-autocomplete
                                        v-model="item.selectedBatchId"
                                        item-text="batch"
                                        item-value="id"
                                        :items="item.batches"
                                        outlined
                                        required
                                        dense
                                        hide-details="auto"
                                        label="Batch"
                                      ></v-autocomplete>
                                    </div>
                                  </template>

                                  <template v-slot:item.action="{ item }">
                                    <v-tooltip class="px10" bottom>
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-icon
                                          color="#b30000"
                                          class="icon_small"
                                          v-bind="attrs"
                                          v-on="on"
                                          @click="
                                            removeDiscountProduct(item.index)
                                          "
                                          >mdi-close</v-icon
                                        >
                                      </template>
                                      <span>Remove</span>
                                    </v-tooltip>
                                  </template>
                                </v-data-table>
                              </v-col>
                            </v-row>
                          </v-col>
                          <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ BRAND ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
                          <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            lg="12"
                            class="py-0"
                            v-if="discount.selectedPurchasingType == 'Brand'"
                          >
                            <v-row>
                              <v-col cols="6" sm="12" md="6" lg="6">
                                <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Brand"
                                  rules="required"
                                >
                                  <v-combobox
                                    v-model="discount.selectedPurchasingBrands"
                                    :items="brands"
                                    hide-selected
                                    label="Brands"
                                    multiple
                                    persistent-hint
                                    small-chips
                                    outlined
                                    :error-messages="errors"
                                    :search-input.sync="searchBrands"
                                    item-text="name"
                                    item-value="id"
                                    @change="onChangePurchasingBrands"
                                  >
                                    <template
                                      v-slot:selection="{
                                        attrs,
                                        item,
                                        parent,
                                        selected,
                                      }"
                                    >
                                      <v-chip
                                        v-if="item === Object(item)"
                                        v-bind="attrs"
                                        color="lightgray"
                                        :input-value="selected"
                                        label
                                        small
                                      >
                                        <span class="pr-2">
                                          {{ item.name }}
                                        </span>
                                        <v-icon
                                          small
                                          @click="parent.selectItem(item)"
                                          >close</v-icon
                                        >
                                      </v-chip>
                                    </template>
                                  </v-combobox>
                                </ValidationProvider>
                              </v-col>
                            </v-row>
                          </v-col>
                          <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PERODUCT CATEGORY  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
                          <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            lg="12"
                            class="py-0"
                            v-if="discount.selectedPurchasingType == 'Category'"
                          >
                            <v-row>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-combobox
                                  v-model="
                                    discount.selectedPurchasingProductCategories
                                  "
                                  :items="productCategories"
                                  hide-selected
                                  label="Product Categories"
                                  multiple
                                  persistent-hint
                                  small-chips
                                  outlined
                                  :search-input.sync="searchProductCategory"
                                  item-text="name"
                                  item-value="id"
                                  :error-messages="
                                    discount.purchasingConditionProductCantegoryError
                                  "
                                  @change="onChangePurchasingProductCategory"
                                >
                                  <template
                                    v-slot:selection="{
                                      attrs,
                                      item,
                                      parent,
                                      selected,
                                    }"
                                  >
                                    <v-chip
                                      v-if="item === Object(item)"
                                      v-bind="attrs"
                                      color="lightgray"
                                      :input-value="selected"
                                      label
                                      small
                                    >
                                      <span class="pr-2">
                                        {{ item.name }}
                                      </span>
                                      <v-icon
                                        small
                                        @click="parent.selectItem(item)"
                                        >close</v-icon
                                      >
                                    </v-chip>
                                  </template>
                                </v-combobox></v-col
                              >
                            </v-row>
                          </v-col>
                        </v-row>
                        <!-- <v-divider></v-divider> -->

                        <!--  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  OPRATOR  -->
                        <v-row>
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <ValidationProvider
                              v-slot="{ errors }"
                              name="Purchasing operator"
                              rules="required"
                            >
                              <v-autocomplete
                                v-model="discount.selectedPurchasingOperator"
                                item-text="text"
                                item-value="value"
                                :items="discount.purchasingOperators"
                                :error-messages="errors"
                                outlined
                                required
                                dense
                                hide-details="auto"
                                label="Operator"
                                @change="
                                  onChangePurchasingOperator(
                                    discount.purchasingOperatorError
                                  )
                                "
                              ></v-autocomplete>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <!-- <v-divider></v-divider> -->
                        <!-- ----------------------------------------------------------------------- OPARAND ----------------------------------------------------------------------- -->
                        <v-row>
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <ValidationProvider
                              v-slot="{ errors }"
                              name="Purchasing operand"
                              rules="required"
                            >
                              <v-autocomplete
                                v-model="discount.selectedPurchasingOperand"
                                item-text="text"
                                item-value="value"
                                :items="discount.purchasingOperands"
                                :error-messages="errors"
                                outlined
                                required
                                dense
                                hide-details="auto"
                                label="Oparand"
                                @change="
                                  onChangePurchasingOperand(
                                    discount.purchasingOperandError
                                  )
                                "
                              ></v-autocomplete>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <v-text-field
                              :rules="[valueNumberRule]"
                              v-model="selectedPurchaseOperandValue"
                              outlined
                              type="number"
                              dense
                              :min="0"
                              hide-details="auto"
                              label="Value"
                              :append-icon="
                                discount.selectedPurchasingOperand ==
                                'Percentage'
                                  ? 'mdi-percent'
                                  : ''
                              "
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </div>

                    <v-row v-if="isNewCondition">
                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        lg="12"
                        class="d-flex justify-end"
                      >
                        <v-btn
                          depressed
                          small
                          class="text-white btn_blue btn_medium w-100"
                          @click="addPurchasingConditions"
                          >Add</v-btn
                        ></v-col
                      ></v-row
                    >

                    <v-row v-else>
                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        lg="12"
                        class="d-flex justify-end"
                      >
                        <v-btn
                          depressed
                          small
                          class="text-white btn_blue btn_medium w-100 px-5"
                          @click="updatePurchasingConditions"
                          >Update</v-btn
                        >

                        <v-btn
                          depressed
                          small
                          class="text-white btn_medium w-100 px-5"
                          @click="cancelUpdateCondition"
                          >cancel</v-btn
                        ></v-col
                      ></v-row
                    >
                    <!-- ------------------------------------------------------------------------------------------------ EXPANSION PANELS ------------------------------------------------------------------------------- -->
                    <v-row>
                      <v-col cols="12" sm="12" md="12" lg="12">
                        <v-card-title>Conditions</v-card-title>
                        <v-simple-table>
                          <template v-slot:default>
                            <v-expansion-panels>
                              <v-expansion-panel
                                v-if="discount.purchasingConditions.length == 0"
                              >
                                <v-expansion-panel-header class="pl-2">
                                  <v-row>
                                    <v-col class="d-flex justify-center">
                                      There is no conditions</v-col
                                    >
                                  </v-row>
                                </v-expansion-panel-header>
                              </v-expansion-panel>

                              <v-expansion-panel
                                v-else
                                v-for="purchasingCondition in discount.purchasingConditions"
                                :key="purchasingCondition.index"
                              >
                                <v-expansion-panel-header class="pl-2">
                                  <v-row
                                    ><v-col cols="6" class="pl-5">
                                      {{ purchasingCondition.type }}</v-col
                                    ><v-col cols="2">
                                      {{ purchasingCondition.operator }}</v-col
                                    ><v-col cols="3">
                                      {{
                                        purchasingCondition.type !=
                                        "Total Amount"
                                          ? purchasingCondition.operand
                                          : `${purchasingCondition.operand} : ${purchasingCondition.operandValue}`
                                      }} </v-col
                                    ><v-col
                                      cols="1"
                                      class="content-space-between pr-7"
                                    >
                                      <v-icon
                                        large
                                        @click="
                                          editPurchasingCondition(
                                            purchasingCondition
                                          )
                                        "
                                        >mdi-square-edit-outline</v-icon
                                      >
                                      <v-icon
                                        large
                                        @click="
                                          removePurchasingCondition(
                                            purchasingCondition
                                          )
                                        "
                                        >close</v-icon
                                      ></v-col
                                    ></v-row
                                  >
                                </v-expansion-panel-header>
                                <v-expansion-panel-content
                                  v-if="
                                    purchasingCondition.type != 'Total Amount'
                                  "
                                >
                                  <v-row>
                                    <!-- TOTAL -->
                                    <v-col
                                      cols="6"
                                      class="pl-7"
                                      v-if="purchasingCondition.type == 'Total'"
                                    >
                                      <template>
                                        {{ purchasingCondition.value }}
                                      </template>
                                    </v-col>

                                    <!-- Category AND BRANDS -->
                                    <v-col
                                      cols="6"
                                      class="px-0"
                                      v-if="
                                        purchasingCondition.type == 'Brand' ||
                                        purchasingCondition.type == 'Category'
                                      "
                                    >
                                      <v-list-item-group color="primary">
                                        <v-list-item
                                          v-for="item in purchasingCondition.value"
                                          :key="item.name"
                                        >
                                          <v-list-item-content>
                                            <v-list-item-title
                                              v-html="item.name"
                                            ></v-list-item-title>
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list-item-group>
                                    </v-col>

                                    <!-- PRODUCT -->
                                    <v-col
                                      cols="6"
                                      class="px-0"
                                      v-if="
                                        purchasingCondition.type == 'Product'
                                      "
                                    >
                                      <!-- <v-list-item-group
                                        v-model="item"
                                        color="primary"
                                      > -->
                                      <v-container>
                                        <v-row
                                          v-for="item in purchasingCondition.value"
                                          :key="item.product.name"
                                        >
                                          <v-row
                                            ><v-col cols="5">
                                              Name :
                                              {{ item.product.name }}</v-col
                                            >
                                            <v-col cols="4" class="pl-0"
                                              >Unit :
                                              {{ item.unit.name }}</v-col
                                            >
                                            <v-col
                                              v-if="item.batch"
                                              cols="3"
                                              class="pl-0"
                                              >Batch :
                                              {{ item.batch.batch }}</v-col
                                            ></v-row
                                          >
                                        </v-row>
                                      </v-container>
                                      <!-- </v-list-item-group> -->
                                    </v-col>

                                    <v-col cols="2"> </v-col>
                                    <v-col cols="4">
                                      {{
                                        purchasingCondition.operandValue
                                      }}</v-col
                                    >
                                  </v-row>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                          </template>
                        </v-simple-table></v-col
                      >
                    </v-row>
                    <v-row>
                      <v-col>
                        <!-- <v-card-title>Discounts</v-card-title> -->
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </ValidationObserver>
          <!-- ------------------------------------------------------------------------------ OFFER -------------------------------------------------------------------------------------- -->
          <ValidationObserver ref="offerObserver">
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>Offer</v-card-title>
                  <v-container>
                    <!-- --------------------------------------------------------------------------------- OFER TYPE --------------------------------------------------------------------------- -->
                    <v-row>
                      <v-col cols="12" sm="12" md="3" lg="3">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Offer type"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="discount.selectedOfferType"
                            item-text="text"
                            item-value="value"
                            :items="discount.offerTypes"
                            :error-messages="errors"
                            outlined
                            required
                            dense
                            hide-details="auto"
                            label="Offer Types"
                            @change="onChangeOfferType"
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        lg="6"
                        class="d-flex justify-space-between"
                        v-if="discount.selectedOfferType == 'Product'"
                      >
                        <v-autocomplete
                          item-text="name"
                          item-value="id"
                          v-model="selectedOfferProductId"
                          :items="discount.offerProducts"
                          outlined
                          required
                          dense
                          hide-details="auto"
                          label="Product"
                          :search-input.sync="searchOfferProducts"
                          :loading="offerProductLoading"
                          @change="onChangeOfferProduct(selectedProduct)"
                        ></v-autocomplete>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              class="icon_medium add-arrow-icon"
                              color="#13928e"
                              @click="addOfferProduct"
                              v-bind="attrs"
                              v-on="on"
                              >mdi-subdirectory-arrow-left</v-icon
                            >
                          </template>
                          <span>Add Product</span>
                        </v-tooltip>
                      </v-col>

                      <v-col class="d-flex align-end px-0"> </v-col>

                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="12"
                        class="py-0"
                        v-if="discount.selectedOfferType == 'Product'"
                      >
                        <v-row> </v-row>

                        <v-row>
                          <v-col cols="12" lg="12">
                            <v-data-table
                              :headers="offerProductsHeaders"
                              :items="discount.selectedOfferProducts"
                              :items-per-page="5"
                              hide-default-footer
                            >
                              <template v-slot:item.name="{ item }">
                               
                              <v-text-field
                              v-model="item.selectedProduct.name"
                              outlined
                                hide-details="auto"
                              disabled
                              >
                              </v-text-field>
                              </template>
                              <template v-slot:item.unit="{ item }">
                                <v-autocomplete
                                  v-model="item.selectedUnitId"
                                  item-text="name"
                                  item-value="id"
                                  :items="item.units"
                                  outlined
                                  required
                                  dense
                                  hide-details="auto"
                                ></v-autocomplete>
                              </template>
                              <template v-slot:item.quantity="{ item }">
                                <v-text-field
                                  :rules="[valueNumberRule]"
                                  v-model="item.quantity"
                                  outlined
                                  type="number"
                                  :min="0"
                                  dense
                                  hide-details="auto"
                                  required
                                ></v-text-field>
                              </template>
                              <template v-slot:item.hasBatch="{ item }">
                                <div v-if="item.batches.length > 0">
                                  <v-checkbox
                                    dense
                                    hide-details="auto"
                                    v-model="item.hasBatch"
                                  ></v-checkbox>
                                </div>
                              </template>
                              <template v-slot:item.batch="{ item }">
                                <div>
                                  <v-autocomplete
                                    v-model="item.selectedBatchId"
                                    item-text="batch"
                                    item-value="id"
                                    :items="item.batches"
                                    outlined
                                    required
                                    clearable
                                    dense
                                    hide-details="auto"
                                  ></v-autocomplete>
                                </div>
                              </template>
                              <template v-slot:item.maxQuantity="{ item }">
                                <v-text-field
                                  :rules="[valueNumberRule]"
                                  v-model="item.maxQuantity"
                                  outlined
                                  clearable
                                  :min="0"
                                  dense
                                  hide-details="auto"
                                  required
                                ></v-text-field>
                              </template>

                              <template v-slot:item.action="{ item }">
                                <v-tooltip class="px10" bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                      color="#b30000"
                                      class="icon_small"
                                      v-bind="attrs"
                                      v-on="on"
                                      @click="removeOfferProduct(item.index)"
                                      >mdi-close</v-icon
                                    >
                                  </template>
                                  <span>Remove</span>
                                </v-tooltip>
                              </template>
                            </v-data-table>
                          </v-col>
                        </v-row>
                        <div
                          hidden
                          v-for="selectedOfferProduct in discount.selectedOfferProducts"
                          :key="selectedOfferProduct.index"
                        >
                          <v-row>
                            <v-col cols="12" sm="12" md="6" lg="4 item-center">
                              {{ selectedOfferProduct.selectedProduct.name }}
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="2">
                              <v-autocomplete
                                v-model="selectedOfferProduct.selectedUnitId"
                                item-text="name"
                                item-value="id"
                                :items="selectedOfferProduct.units"
                                outlined
                                required
                                dense
                                hide-details="auto"
                                label="Unit"
                              ></v-autocomplete>
                            </v-col>

                            <v-col
                              cols="2"
                              sm="12"
                              md="6"
                              lg="2"
                              v-if="selectedOfferProduct.batches.length > 0"
                            >
                              <v-checkbox
                                dense
                                hide-details="auto"
                                label="Batch"
                                v-model="selectedOfferProduct.hasBatch"
                              ></v-checkbox>
                            </v-col>

                            <v-col
                              cols="2"
                              sm="12"
                              md="6"
                              lg="2"
                              v-if="selectedOfferProduct.hasBatch"
                            >
                              <v-autocomplete
                                v-model="selectedOfferProduct.selectedBatchId"
                                item-text="batch"
                                item-value="id"
                                :items="selectedOfferProduct.batches"
                                outlined
                                required
                                dense
                                hide-details="auto"
                                label="Batch"
                              ></v-autocomplete>
                            </v-col>
                            <v-col
                              cols="1"
                              sm="12"
                              md="6"
                              lg="1"
                              class="content-space-between"
                            >
                              <v-tooltip
                                class="px10"
                                bottom
                                v-if="discount.selectedOfferProducts.length > 1"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-icon
                                    color="#b30000"
                                    class="icon_small"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="
                                      removeOfferProduct(
                                        selectedOfferProduct.index
                                      )
                                    "
                                    >mdi-close</v-icon
                                  >
                                </template>
                                <span>Remove</span>
                              </v-tooltip>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="12"
                              md="6"
                              lg="1"
                              class="content-space-between"
                            >
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>
                    </v-row>
                    <!-- --------------------------------------------------------------------------------- OFFER OPERATOR --------------------------------------------------------------------------- -->
                    <v-row> </v-row>
                    <!-- --------------------------------------------------------------------------------- OFER OPARAND --------------------------------------------------------------------------- -->
                    <v-row v-if="discount.selectedOfferType == 'Total'">
                      <v-col cols="12" sm="12" md="3" lg="3">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Offer operator"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="discount.selectedOfferOperator"
                            item-text="text"
                            item-value="value"
                            :items="discount.offerOperators"
                            :error-messages="errors"
                            outlined
                            required
                            dense
                            hide-details="auto"
                            label="Operator"
                            @change="
                              onChangePurchasingOperator(
                                discount.selectedPurchasingOperatorError
                              )
                            "
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="12" md="3" lg="3">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Offer oparand"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="discount.selectedOfferOperand"
                            item-text="text"
                            item-value="value"
                            :items="discount.offerOperands"
                            :error-messages="errors"
                            outlined
                            required
                            dense
                            hide-details="auto"
                            label="Oparand"
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="12" md="3" lg="3">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Value"
                          rules="required"
                        >
                          <v-text-field
                            :rules="[valueNumberRule]"
                            :error-messages="errors"
                            v-model="discount.selectedOfferoperandValue"
                            outlined
                            type="number"
                            :min="0"
                            dense
                            hide-details="auto"
                            label="Value"
                            :append-icon="
                              discount.selectedOfferOperand == 'Percentage'
                                ? 'mdi-percent'
                                : ''
                            "
                            required
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col
                        cols="3"
                        sm="12"
                        md="6"
                        lg="3"
                        v-if="!(discount.selectedOfferOperand == 'Percentage')"
                      >
                        <div class="d-flex">
                          <!-- <v-checkbox
                          v-model="discount.offerHasMaximum"
                          color="#002db3"
                          dense
                          hide-details="auto"
                          label="Set maximim offer"
                        ></v-checkbox> -->
                          <!-- <v-text-field
                            :rules="[valueNumberRule]"
                            :error-messages="errors"
                            v-model="discount.offerMaximumValue"
                            outlined
                            :min="0"
                            dense
                            hide-details="auto"
                            label="Maximim offer"
                            required
                            clearable
                          ></v-text-field> -->
                          <currency-input
                            label="Maximim offer"
                            v-model="discount.offerMaximumValue"
                          ></currency-input>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row v-if="false">
                      <v-col cols="12" sm="12" md="6" lg="3">
                        <v-checkbox
                          v-model="discount.offerHasMaximum"
                          color="#002db3"
                          dense
                          hide-details="auto"
                          label="Set maximim offer"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </ValidationObserver>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="submit"
          depressed
          small
          class="text-white btn_blue btn_medium w-100"
          >submit</v-btn
        >
      </v-card-actions>
    </v-container>
  </div>
</template>
<script>
import { Product } from "../../models/Product";
import datePickComponent from "@/components/base/DateComponent";
import { Discount } from "../../models/View Models/DiscountViewModel";
import { required, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
// import AddButton from "@/components/base/AddButton";

extend("required", {
  ...required,
  message: "{_field_} is required",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  data: () => ({
    //#region main data
      valueNumberRule: (v) => {
      v = _.replace(v, new RegExp(",", "g"), "");
      console.log('=sjdhfkhfdkhskjfhjksffhgbklsfhgkhsfkghfskhglhsfkghskfhghkjfsh      =========',v);
      if (v) {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v >= 0) return true;
        return "Value can not be negative";
      }else{
        return true
      }
    },
    isEdit: false,
    purchasingConditionError: "",
    purchasingProductLoading: false,
    offerProductLoading: false,
    puchasingProductsHeaders: [
      {
        text: "Name",
        value: "name",
        show: true,
        disabled: false,
        width: "30%",
      },
      {
        text: "Unit",
        value: "unit",
        show: true,
        disabled: false,
        width: "25%",
      },
      {
        text: "Batch",
        value: "hasBatch",
        show: true,
        disabled: false,
        width: "10%",
      },
      {
        text: "",
        value: "batch",
        show: true,
        disabled: false,
        width: "25%",
      },
      {
        text: "",
        value: "action",
        show: true,
        disabled: false,
        width: "10%",
      },
    ],
    offerProductsHeaders: [
      {
        text: "Name",
        value: "name",
        show: true,
        disabled: false,
        width: "20%",
      },
      {
        text: "Unit",
        value: "unit",
        show: true,
        disabled: false,
        width: "20%",
      },

      // {
      //   text: "Batch",
      //   value: "hasBatch",
      //   show: true,
      //   disabled: false,
      // },
      {
        text: "Batch",
        value: "batch",
        show: true,
        disabled: false,
        width: "15%",
      },
      {
        text: "Qty",
        value: "quantity",
        show: true,
        disabled: false,
        width: "10%",
      },
      {
        text: "Max Qty",
        value: "maxQuantity",
        show: true,
        disabled: false,
        width: "10%",
      },
      {
        text: "",
        value: "action",
        show: true,
        disabled: false,
        width: "5%",
      },
    ],
    discount: new Discount(),
    selectedCondition: null,
    isNewCondition: true,
    selectedPurchaseOperandValue: 0,

    warehouses: [],
    customerGroups: [],
    brands: [],
    productCategories: [],
    selectedProductId: 0,
    selectedOfferProductId: 0,
    //#endregion main data

    //#region purchase add conditions
    //#endregion purchase add conditions

    //#region search
    searchPurchasingProducts: null,
    searchOfferProducts: null,
    searchWarehouse: null,
    searchCustomerGroups: null,
    searchBrands: null,
    searchProductCategory: null,
    //#endregion search
  }),
  components: {
    datePickComponent,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode,
  },
  mounted() {
    // if (this.$route.params.id) {
    //   this.isEdit = true;
    //   this.getDiscount(this.$route.params.id);
    // } else {
    //   this.isEdit = false;
    // }
  },
  methods: {
    async submit() {
      const isValidDiscountObserver = await this.$refs.discountObserver.validate();
      const isValidOfferObserver = await this.$refs.offerObserver.validate();
      if (
        isValidOfferObserver &&
        isValidOfferObserver &&
        this.discount.purchasingConditions.length == 0
      ) {
        this.purchasingConditionError =
          "Please add at least one purchasing condition";
      } else if (isValidOfferObserver && isValidOfferObserver) {
        if (this.$route.params.id) {
          this.updateDiscount();
        } else {
          this.createDiscount();
        }
      }
    },
    onChangePurchasingBrands() {
      this.discount.purchasingConditionBrandError = "";
    },
    onChangePurchasingProductCategory() {
      this.discount.purchasingConditionProductCantegoryError = "";
    },
    onChangePurchasingType(error) {
      this.discount.purchasingTypeError = "";
      if (this.discount.selectedPurchasingType == "Total Amount") {
        this.discount.purchasingOperands = [
          { text: "Amount", value: "Amount" },
        ];
        this.discount.selectedPurchasingOperand = "Amount";
      } else {
        this.discount.purchasingOperands = [
          { text: "Qty", value: "Quantity" },
          { text: "Amount", value: "Amount" },
          // { text: "Percentage", value: "Percentage" },
        ];
      }
    },
    onChangePurchasingOperator(error) {
      this.discount.purchasingOperatorError = "";
    },
    onChangePurchasingOperand(error) {
      this.discount.purchasingOperandError = "";
    },
    removePurchasingCondition(condition) {
      this.discount.purchasingConditions.splice(condition.index);
      if (
        this.selectedCondition &&
        this.selectedCondition.index == condition.index
      ) {
        this.resetConditionSection();
      }
    },
    validateConditionSection() {
      let valid = true;
      if (this.discount.selectedPurchasingType == null) {
        this.discount.purchasingTypeError = "Please select type";
        valid = false;
      } else {
        if (
          this.discount.selectedPurchasingType == "Product" &&
          this.discount.selectedProducts.length == null
        ) {
          this.discount.purchasingConditionProductError =
            "Please select product";
        }

        if (this.discount.selectedPurchasingType == "Total") {
        }
        if (
          this.discount.selectedPurchasingType == "Brand" &&
          this.discount.selectedPurchasingBrands.length == null
        ) {
          this.discount.purchasingConditionBrandError = "Please select brand";
          valid = false;
        }
        if (
          this.discount.selectedPurchasingType == "Category" &&
          this.discount.selectedPurchasingProductCategories.length == null
        ) {
          this.discount.purchasingConditionProductCantegoryError =
            "Please select Category";
          valid = false;
        }
      }

      if (this.discount.selectedPurchasingOperand == null) {
        this.discount.purchasingOperandError = "Please select operand";
        valid = false;
      }

      if (this.discount.selectedPurchasingOperator == null) {
        this.discount.purchasingOperatorError = "Please select operator";
        valid = false;
      }
      return valid;
    },
    cancelUpdateCondition() {
      this.resetConditionSection();
    },
    async addPurchasingConditions() {
      let isValid = await this.$refs.discountConditionObserver.validate();
      if (isValid) {
        let condition = {
          type: this.discount.selectedPurchasingType,
          operator: this.discount.selectedPurchasingOperator,
          operand: this.discount.selectedPurchasingOperand,
          operandValue: this.selectedPurchaseOperandValue,
        };
        if (this.discount.selectedPurchasingType == "Total Amount") {
          condition.value = this.selectedPurchaseOperandValue;
        }
        if (this.discount.selectedPurchasingType == "Brand") {
          condition.value = this.discount.selectedPurchasingBrands;
        }
        if (this.discount.selectedPurchasingType == "Category") {
          condition.value = this.discount.selectedPurchasingProductCategories;
        }
        if (this.discount.selectedPurchasingType == "Product") {
          this.discount.selectedProducts.forEach((sp) => {
            sp.product = sp.selectedProduct;
            sp.unit = sp.units.find((p) => p.id == sp.selectedUnitId);
            if (sp.hasBatch) {
              sp.batch = sp.batches.find((p) => p.id == sp.selectedBatchId);
            }
          });
          condition.value = this.discount.selectedProducts;
        }
        this.discount.purchasingConditions.push(condition);
        this.discount.purchasingConditions.forEach((element, index, arr) => {
          element.index = index;
        });
        this.resetConditionSection();
      }
    },
    updatePurchasingConditions() {
      let condition = {
        type: this.discount.selectedPurchasingType,
        operator: this.discount.selectedPurchasingOperator,
        operand: this.discount.selectedPurchasingOperand,
        operandValue: this.selectedPurchaseOperandValue,
      };
      if (this.discount.selectedPurchasingType == "Total Amount") {
        condition.value = this.selectedPurchaseOperandValue;
      }
      if (this.discount.selectedPurchasingType == "Brand") {
        condition.value = this.discount.selectedPurchasingBrands;
      }
      if (this.discount.selectedPurchasingType == "Category") {
        condition.value = this.discount.selectedPurchasingProductCategories;
      }
      if (this.discount.selectedPurchasingType == "Product") {
        condition.value = this.discount.selectedProducts;
      }
      this.discount.purchasingConditions[
        this.selectedCondition.index
      ] = condition;
      this.discount.purchasingConditions.push(condition);
      this.discount.purchasingConditions.splice(
        this.discount.purchasingConditions.length - 1
      );
      this.resetConditionSection();
    },
    editPurchasingCondition(condition) {
      this.isNewCondition = false;
      this.discount.selectedPurchasingType = condition.type;
      this.discount.selectedPurchasingOperator = condition.operator;
      this.discount.selectedPurchasingOperand = condition.operand;
      debugger;
      if (condition.type == "Brand") {
        this.discount.selectedPurchasingBrands = condition.value;
      }
      if (condition.type == "Total Amount") {
        this.selectedPurchaseOperandValue = condition.operandValue;
      }
      if (this.discount.selectedPurchasingType == "Category") {
        this.discount.selectedPurchasingProductCategories = condition.value;
      }
      if (this.discount.selectedPurchasingType == "Product") {
        this.discount.selectedProducts = condition.value;
      }

      this.selectedCondition = condition;
    },

    removeDiscountProduct(index) {
      this.discount.selectedProducts.splice(index);
      this.resetIndex(this.discount.selectedProducts);
      this.discount.selectedProducts.forEach((element, index, arr) => {
        element.index = index;
      });
    },
    removeOfferProduct(index) {
      this.discount.selectedOfferProducts.splice(index);
      this.resetIndex(this.discount.selectedOfferProducts);
      this.discount.selectedOfferProducts.forEach((element, index, arr) => {
        element.index = index;
      });
    },
    resetIndex(arr) {
      arr.forEach((element, index, arr) => {
        element.index = index;
      });
    },
    addDiscountProduct() {
      let selectedProduct = this.discount.purchasingProducts.find(
        (p) => p.id == this.selectedProductId
      );
      if (selectedProduct) {
        this.discount.selectedProducts.push({
          products: [],
          selectedProduct: selectedProduct,
          units: selectedProduct.units,
          selectedUnit: 0,
          batches: selectedProduct.batches,
          selectedBatch: 0,
        });
        this.discount.selectedProducts.forEach((element, index, arr) => {
          element.index = index;
        });
        this.discount.selectedProducts = this.discount.selectedProducts;
      }
    },
    addOfferProduct() {
      let selectedProduct = this.discount.offerProducts.find(
        (p) => p.id == this.selectedOfferProductId
      );
      if (selectedProduct) {
        this.discount.selectedOfferProducts.push({
          products: [],
          selectedProduct: selectedProduct,
          units: selectedProduct.units,
          selectedUnit: 0,
          batches: selectedProduct.batches,
          selectedBatch: 0,
          quantity: 0,
        });

        this.discount.selectedOfferProducts.forEach((sp) => {
          element.index = index;
        });
        this.discount.selectedOfferProducts = this.discount.selectedOfferProducts;
        console.log(this.discount.selectedOfferProducts);
      }
    },
    onChangePurchasingProduct() {
      this.discount.purchasingConditionProductError = "";
    },
    // OFFER START -----------------------------------------------------------------------------------------------------------------------------------------------------------
    onChangeOfferType() {
      if (this.discount.selectedOfferType == "Total") {
        this.discount.offerOperands = [
          { text: "Amount", value: "Amount" },
          { text: "Percentage", value: "Percentage" },
        ];
        this.discount.selectedOfferOperand = "Amount";
      } else {
        if (this.discount.selectedOfferType == "Product") {
          this.discount.offerOperands = [{ text: "Qty", value: "Quantity" }];
          this.discount.selectedOfferOperand = "Quantity";
        } else {
          this.discount.offerOperands = [
            { text: "Qty", value: "Quantity" },
            { text: "Amount", value: "Amount" },
          ];
        }
      }
    },
    onChangeOfferProduct(selectedProduct) {
      let tempProduct = selectedProduct.products.find(
        (p) => p.id == selectedProduct.selectedOfferProductId
      );
      selectedProduct.units = tempProduct.units ? tempProduct.units : [];
      selectedProduct.batches = tempProduct.batches ? tempProduct.batches : [];
    },

    // OFFER END -----------------------------------------------------------------------------------------------------------------------------------------------------------

    async GetBrandByQuery(query = "") {
      await this.$store
        .dispatch("brand/GetBrandSearch", { query: query })
        .then((res) => {
          console.log(res);

          this.brands = res.data;
        })
        .catch((err) => {});
    },
    async getWarehouseByQuery(query = "") {
      await this.$store
        .dispatch("warehouse/GetWarehouse", { query: query })
        .then((res) => {
          this.warehouses = res;
        })
        .catch((err) => {});
    },
    getPurchasingProductsByQuery(query = "") {
      this.purchasingProductLoading = true;
      this.$store
        .dispatch("product/GetProduct", {
          query: query,
        })
        .then((res) => {
          this.discount.purchasingProducts = res.map((u, i, arr) => {
            u.index = i + 1;
            return new Product().toViewModel(u);
          });
          this.purchasingProductLoading = false;
        })
        .catch((err) => {
          this.purchasingProductLoading = false;
        });
    },
    getOfferProductsByQuery(query = "") {
      this.offerProductLoading = true;
      this.$store
        .dispatch("product/GetProduct", {
          query: query,
        })
        .then((res) => {
          this.discount.offerProducts = res.map((u, i, arr) => {
            u.index = i + 1;
            return new Product().toViewModel(u);
          });
          this.offerProductLoading = false;
        })
        .catch((err) => {
          this.offerProductLoading = false;
        });
    },
    getAllProducts() {
      this.$store
        .dispatch("product/GetProduct", {})
        .then((res) => {
          this.discount.selectedProducts[0].products = res.map((u, i, arr) => {
            u.index = i + 1;
            return new Product().toViewModel(u);
          });
        })
        .catch((err) => {});
    },
    async GetCustomerGroups() {
      await this.$store
        .dispatch("customer/GetCustomerGroups")
        .then((res) => {
          this.customerGroups = res.data.data;
        })
        .catch((err) => {});
    },
    GetProductCategoriesByQuery(query = "") {
      this.$store
        .dispatch("product/GetCategorySearch", { query: query })
        .then((res) => {
          console.log(res);
          this.productCategories = res.data.data;
        })
        .catch((err) => {});
    },
    resetConditionSection() {
      this.discount.selectedPurchasingType = null;
      this.discount.selectedPurchasingOperator = null;
      this.discount.selectedPurchasingOperand = null;

      this.selectedPurchaseOperandValue = 0;
      this.discount.selectedPurchasingBrands = [];
      this.discount.selectedPurchasingProductCategories = [];
      this.discount.selectedProducts = [];
      this.selectedCondition = null;
      this.isNewCondition = true;
      this.discount.purchasingProducts = [];
      this.purchasingConditionError = "";
      this.$refs.discountConditionObserver.reset();
    },
    // API METHODS --------------------------------------------------------------------------------------
    createDiscount() {
      this.$store
        .dispatch("discount/CreateDiscount", this.discount.toRequestModel())
        .then((res) => {
          console.log(res);
          this.$toast.success("Discount created successfully");
          this.$router.push("/discount");
        })
        .catch((err) => {
          console.log(res);
        });
    },
    updateDiscount() {
      let payload = {
        body: this.discount.toRequestModel(),
        id: this.$route.params.id,
      };
      this.$store
        .dispatch("discount/UpdateDiscount", payload)
        .then((res) => {
          console.log(res);
          this.$toast.success("Discount updated successfully");
          this.$router.push("/discount");
        })
        .catch((err) => {
          console.log(res);
        });
    },
    async getDiscount(id) {
      await this.$store
        .dispatch("discount/GetDiscount", id)
        .then((res) => {
          console.log(
            "-----------------------------------------------------------------------------------"
          );
          console.log(res);

          this.discount = this.discount.toViewModel(res);
        })
        .catch((err) => {
          console.log(res);
        });
    },
  },
  async created() {
    await this.getWarehouseByQuery();
    await this.GetCustomerGroups();

    if (this.$route.params.id) {
      this.isEdit = true;
      this.getDiscount(this.$route.params.id);
    } else {
      this.isEdit = false;
    }
    this.getPurchasingProductsByQuery();
    this.getOfferProductsByQuery();
    await this.GetBrandByQuery();
    this.GetProductCategoriesByQuery();
  },

  watch: {
    searchWarehouse(value) {
      if (!value) {
        return;
      }
      this.getWarehouseByQuery(value);
    },
    searchPurchasingProducts(value) {
      if (!value) {
        return;
      }
      this.getPurchasingProductsByQuery(value);
    },
    searchOfferProducts(value) {
      if (!value) {
        return;
      }
      this.getOfferProductsByQuery(value);
    },
    searchCustomerGroups(value) {
      if (!value) {
        return;
      }
      this.GetCustomerGroups(value);
    },
    searchBrands(value) {
      if (!value) {
        return;
      }
      this.GetBrandByQuery(value);
    },
    searchProductCategory(value) {
      if (!value) {
        return;
      }
      this.GetProductCategoriesByQuery(value);
    },
  },
};
</script>