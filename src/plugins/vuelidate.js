import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor'

import FormGroup from '../components/base/FormGroup.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// import FormSummary from "@/components/common/base/FormSummary";

Vue.use(Vuelidate);
Vue.use(Toast);


/* We need messages for validation */
const messages = {
    required: "{attribute} is required.",
    email: "{attribute} should be a valid email.",
    telephone: "{attribute} Enter valid phoneno.",
    onlynumbers: "{attribute} should be only numbers.",
    countrycode: "{attribute} is invalid."
};

Vue.use(VuelidateErrorExtractor, {
    messages,
    attributes: {
        userName: 'userName',
        password:'password',
        email:'email',
        oldPassWord:''
        
    }
});

Vue.component('FormGroup', FormGroup)
    // Vue.component("FormSummary", FormSummary);
Vue.component('formWrapper', templates.FormWrapper)

