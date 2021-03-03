/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------
  Item Name: POS SYSTEM
  Author: SpeedCodeLabs
  Author URL: http://www.speedcodelabs.com
==========================================================================================*/

// This global state is used to store the 'Master Data' and 'Default Confiqurations'

const state = {
  // Theme default confiqurations
  theme: "light",
  // Master Data
  countries: "",
  server_messages: [],
//pos url
pos_url:"",
  // For Filters
  dateformat: "DD-MMM-YYYY",
  timeformat: "DD-MMM-YYYY HH:mm:ss",
  monthyearformat: "MMMM YYYY",
  yearonlyformat: "YYYY",

  // Pagination Settings
  pagination_settings: {},
  // BreadCrumb
  breadcrumb: "",
};

export default state;
