<template>
  <div>
    <PageTitle
      title="Staff View"
      :backBtn="true"
      :editRoute="'/staff/edit/' + this.$route.params.id"
    />
    <v-container fluid>
      <!-- Page Title -->

      <v-row>
        <v-col cols="12" sm="12" md="4" lg="4">
          <v-card>
      
            <v-img src="../../../assets/userprofile.png" height="450"> </v-img>
            <v-list two-line class="pl-10 pr-10">
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-id-card</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-black text-decoration-underline"
                    >Full Name</v-list-item-title
                  >
                  <v-list-item-title>  {{Staff.salutation_id}} {{Staff.first_name}} {{ Staff.last_name}} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            
               <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-gender-male-female</span> 2</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-black text-decoration-underline"
                    >Gender</v-list-item-title
                  >
                  <v-list-item-title> {{Staff.gender}} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-account-group-outline</v-icon>
                </v-list-item-action>
                
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-black text-decoration-underline"
                    >Designation</v-list-item-title
                  >
                  <v-list-item-title> {{Staff.designation_id}} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
   <v-divider inset></v-divider>
                 <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-blood-bag</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-black text-decoration-underline"
                    >Blood Group</v-list-item-title
                  >
                  <v-list-item-title> {{Staff.blood_group}} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

             <v-divider inset></v-divider>
                 <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-account-group</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-black text-decoration-underline"
                    >Employment Type</v-list-item-title
                  >
                  <v-list-item-title> {{Staff.employment_type_id}} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>


                  <v-divider inset></v-divider>
                 <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-office-building-marker-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-black text-decoration-underline"
                    >Office</v-list-item-title
                  >
                  <v-list-item-title>{{ Staff.office_id}} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="8">
          <v-card class="mb-15">
            <v-card-title>Contact</v-card-title>
            <v-list two-line class="pa-0">
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-phone-classic </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                  {{Staff.telephone}}
                  </v-list-item-title>

                  <v-list-item-sub-title
                    >Telephone Number</v-list-item-sub-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-cellphone-basic</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title> {{Staff.mobile }}</v-list-item-title>
                  <v-list-item-sub-title>Mobile Number</v-list-item-sub-title>
                </v-list-item-content>
              </v-list-item>
                <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-skype</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title> {{Staff.skype }}</v-list-item-title>
                  <v-list-item-sub-title>Skype</v-list-item-sub-title>
                </v-list-item-content>
              </v-list-item>
                <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mail</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                     <v-list-item-title> {{Staff.email}} </v-list-item-title>
                  <v-list-item-title
                 
                    >Mail</v-list-item-title
                  >
               
                </v-list-item-content>
              </v-list-item>
                    <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title> {{Staff.home_address }}</v-list-item-title>
                  <v-list-item-sub-title>Home Address</v-list-item-sub-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>


   <v-card class="mb-15">
            <v-card-title>Salary Details</v-card-title>
            <v-list two-line class="pa-0">
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-bank </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                  {{Staff.bank_name}}
                  </v-list-item-title>

                  <v-list-item-sub-title
                    >Bank</v-list-item-sub-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-source-branch</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title> {{Staff.branch_name }}</v-list-item-title>
                  <v-list-item-sub-title>Branch</v-list-item-sub-title>
                </v-list-item-content>
              </v-list-item>
                <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-account-reactivate-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title> {{Staff.account_no }}</v-list-item-title>
                  <v-list-item-sub-title>Account</v-list-item-sub-title>
                </v-list-item-content>
              </v-list-item>
                    <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-cash-100</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title> {{Staff.basic_salary }}</v-list-item-title>
                  <v-list-item-sub-title>Basic Salaray</v-list-item-sub-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
         
        </v-col>


      </v-row>

      <v-row>
<v-col cols="12">
   <v-card class="address-card">
            <v-card-title> Other Information</v-card-title>
            <v-list two-line class="pa-0">
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-account-heart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>Civil Status</v-list-item-sub-title>
                  <v-list-item-title>
             {{Staff.civil_status}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-account-tie-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>Joined Date</v-list-item-sub-title>
                  <v-list-item-title>
                   {{ Staff.joined_at | formatDate}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-calendar-heart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>BirthDay</v-list-item-sub-title>
                  <v-list-item-title>
                   {{Staff.date_of_birth | formatDate}} 
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-certificate</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>Nic</v-list-item-sub-title>
                  <v-list-item-title> {{Staff.nic_number}} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-heart-circle-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>Religion</v-list-item-sub-title>
                  <v-list-item-title>
                   {{ Staff.religion}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
                 <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-head-cog-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>Ethnicity</v-list-item-sub-title>
                  <v-list-item-title>
                   {{ Staff.ethnicity}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
                    <v-divider inset></v-divider>
              <v-list-item href="#">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-chat</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-sub-title>Description</v-list-item-sub-title>
                  <v-list-item-title>
                   {{ Staff.description}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { Staff } from "../../../models/Staff";

export default {
  data: () => ({
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],

    errors: [],
    Staff: new Staff(),
    messages: [],
  }),

  methods: {
    GetStaff() {
      let StaffId = this.$route.params.id;

      this.$store
        .dispatch("staff/GetStaff", StaffId)
        .then((res) => {
          this.Staff = new Staff().toView(res.data.data);
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
  },
  created() {
    this.GetStaff();
   
  },
};
</script>
