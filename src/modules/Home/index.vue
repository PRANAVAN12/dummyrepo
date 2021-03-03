<template>
  <div>
    <v-container fluid>
      <v-row>
   
        <v-col cols="12" lg="12" class="mb-0">
          <h2>Welcome to Speed Hrm</h2>
        </v-col>
        
         </v-row>
         <v-row>
        
           <v-col lg="4" class="py-0">
          <v-sheet height="48">
            <v-toolbar flat>
            
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right> mdi-menu-down </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="450px">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="eventsdata"
              :event-color="getEventColor"
              :type="type"
                 @click:event="showEvent"
                      @click:more="viewDay"
                      @click:date="viewDay"
                      @change="updateRange"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <!-- <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn> -->
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      
 
    
        <v-col class="py-0" lg="4" >
           <v-card height="78px">
             
                       <v-container fluid>
              <v-row class="ui1">
                <v-col
                  lg="3
                  "
                >
                  <h4>Work Hours</h4>
                </v-col>
                <v-col lg="4" class="pl-0">
                  <!-- <v-chip label :color="this.totaldaywork.background" > -->
                  {{ this.totaldaywork.total_working_hours }}
                  <!-- </v-chip> -->
                </v-col>
                <v-col lg="3">
                  <h4>Breake Hours</h4>
                </v-col>
                <v-col lg="2" class="pl-0">
                  <!-- <v-chip label class="ui1"> -->
                  {{ this.totaldaywork.total_essential_breakes_hours }}
                  <!-- </v-chip> -->
                </v-col>
              </v-row>
            </v-container>
        
          </v-card>
          <v-col></v-col>
          <v-card hover class="card-height" height="395px">
            <v-card-title>
              <h3>Leave</h3>
            </v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="5">
                
                </v-col>
                <v-col lg="2">
                 Total
                              </v-col>
                              <v-col  lg="2">
                Taken
                </v-col>
                <v-col  lg="3">
                  Available
                </v-col>
              </v-row>
            
               <v-row v-for="(item, index) in selectedLeaveAllocation" :key="index">
                <v-col cols="12" sm="12" md="6" lg="5">
                  <h4>{{item.leaveType.name}} leave</h4>
                </v-col>
                <v-col  lg="2">
                  <v-avatar
      color="indigo"
      size="40"
    >
      <span class="white--text ">{{item.total}}</span>
    </v-avatar>
                </v-col>
                <v-col  lg="2">
                   <v-avatar
      color="teal"
      size="40"
    >
      <span class="white--text ">{{item.taken}}</span>
    </v-avatar>
                </v-col>
                <v-col  lg="2">
                  <v-avatar
      color="orange"
      size="40"
    >
      <span class="white--text ">{{item.available}}</span>
    </v-avatar>
                </v-col>
              </v-row>
              
            
            </v-container>
          </v-card>
         
         
      
        </v-col>
      
        <v-col cols="12" lg="4" md="12" sm="12" class="py-0">
          <v-card hover class="overflow-y-auto" height="495px">
            <v-card-title class="py-0">
              <v-list>
                <v-row>
                  <v-col lg="9">
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img :src="avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ this.username }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        this.jobTitle
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  </v-col>
                  <v-col lg="3">
                      <v-container fluid>
            
                
                 
                    <v-list-item-action>
                      <toggle-button
                        :value="true"
                        :sync="true"
                        color="red"
                        :movement="movement"
                        v-model="inOutToggle"
                        @change="changeMovementToggle"
                        :labels="{ checked: 'Out', unchecked: 'In' }" 
                      />

                    </v-list-item-action>
              
                
              </v-container>
                  </v-col>
                  
                  
                  
                </v-row>
              </v-list>
            </v-card-title>
            <v-container fluid>
              <div class="moments">
              <v-timeline
                class="pa-0"
                align-top
                dense
                v-for="(item, i) in attendances"
                :key="i"
              >
                <v-timeline-item :color="item.background" small class="m-0">
                  <v-row>
                    <v-col lg="8">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{
                            item.moment
                          }}</v-list-item-title>
                          <v-list-item-subtitle>
                            {{ item.movement_date }}</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col lg="4">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle>
                            {{ item.duration }}</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-timeline-item>
              </v-timeline>
              </div>
            </v-container>
   
        
            
          
          </v-card>
        </v-col>
         </v-row>
         <v-container fluid>
         <v-row>
        
             
             
            <v-carousel>

      <v-carousel-item
        src="../../assets/img/sliderpic1.jpg"
        reverse-transition="fade"
        transition="fade"
        
      ></v-carousel-item>
    </v-carousel>
          
           
 
         </v-row>
            </v-container>

     <Attendace
        ref="attendance"
        :inOutToggle="inOutToggle"
       :moment="last_element"
        @conform="TodayAttendances()"
        @cancels="inOutToggle=!inOutToggle"
      />

    </v-container>

  </div>
</template>
<script>
import { Event } from "../../models/Event";
import Attendace from "./Attendance";
// :moment="last_element.momentBy.relatedMoment"
export default {
  props: {
    movement: {
      type: Boolean,
      default: true,
    },
    // moment:{
    //    type: Array,
    //   default: true,
    // }
  },
  components: {
    Attendace,
  },
  data: () => ({
    avatar: "",
    jobTitle: "",
    selectedLeaveAllocation:[],
    last_element:null,

    attendances: [],
    eventsdata: [],
    totaldaywork: {},
    inOutToggle: false,
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    relatedMovements:[]
    
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.colurs = this.inOutToggle == false ? "success" : "red darken-3";
  },
  created() {
    // debugger
    //  var intervalId = setInterval(() => {
      //  let { email, token } = this;
      //  var isAuthenticated=this.$msal.isAuthenticated()
      //  if(isAuthenticated){
          // this.GetLoginUser(email, token);
          // clearInterval(intervalId);
         
      //  }
      // if (token !== null && !localStorage.getItem("token")) {   
      //    this.fetchPhoto();      
      //   this.GetLoginUser(email, token);
      //    clearInterval(intervalId);
      // }
     
    // }, 500);

    this.GetEvents();
    this.TodayAttendances();
    this.GetLeaveAllocation();
    var intervalId = setInterval(() => {
     this.fetchPhoto();
      this.fetchData();
      //  let { email, token } = this;
      // if (token !== null) {
      //   this.GetLoginUser(email, token);
      //    clearInterval(intervalId);
      // }
      clearInterval(intervalId);
    }, 500);
  },
  computed: {
    username() {
      return (this.msal && this.msal.user.name) || "Unknown";
    },
    email() {
   
      return (this.msal && this.msal.user.userName) || null;
    },
    token() {
      return (this.msal && this.msal.accessToken) || null;
    },
  },
  methods: {
    // GetLoginUser( email, token) {
      
    //   this.$store.dispatch("user/Logins", { email, token }).then((res)=>{ 
    //       if (res.data && res.data.accessToken) {
    //         this.$store.dispatch("user/LoginUsers").then(resp=>{
    //           this.$router.push("/");
    //           this.loading = false;
    //         })   
    //       }else{
    //         this.$router.push("/notFound");
    //       }
    //   })
    // },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    TodayAttendances() {
      this.$store
        .dispatch("staff/TodayAttendances")
        .then((res) => {
          debugger
          this.attendances = res.monents;
          // res.monents.map(moment=>{
          //   return moment.momentBy.relatedMovements.map(data=>{
          //     this.relatedMovements.push(data)
          //   })
          // })
          this.totaldaywork = res;
          let arraylength = this.attendances;
          if(arraylength && arraylength.length>0)
          {
            this.inOutToggle = arraylength[arraylength.length - 1].momentBy.type == "In" ? true : false;

          }
          if(arraylength &&arraylength.length>0 && arraylength[arraylength.length - 1] &&arraylength[arraylength.length - 1] && arraylength[arraylength.length - 1].momentBy  )
          {
            
  this.last_element = _.cloneDeep(arraylength[arraylength.length - 1].momentBy.relatedMoment );
          }
      
          
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },

      GetEvents() {
      this.$store
        .dispatch("event/GetEvents")
        .then((res) => {
          var eventsdata = new Event();
          this.eventsdata = eventsdata.toListView(res);
        })
        .catch((err) => {
          this.messages = err.data.title;
        });
    },
      GetLeaveAllocation()
    {
 this.$store
        .dispatch(`staff/UserLeaveAllocation`)
        .then((res) => {
         this.selectedLeaveAllocation=res;
        })
        .catch((err) => {
          this.isLoading = false;
         
        });  

    },
    changeMovementToggle(value) {
      // this.inOutToggle=!this.inOutToggle;
      this.$refs.attendance.openModal();
    },
     togglelable(value) {
      this.$refs.attendance.openModal();
    },
    async fetchPhoto() {
      await this.$msal
        .msGraph({ url: "/me/photo/$value", responseType: "blob" })
        .then(({ body }) => {
          const avatar = (window.URL || window.webkitURL).createObjectURL(body);
          this.avatar = avatar;
        })
        .catch(() => {
          // this.avatar = process.env.default_avatar
        });
    },
    async fetchData() {
      await this.$msal
        .msGraph({ url: "/me" })
        .then(({ body }) => {
          this.jobTitle = body.jobTitle;
        })
        .catch(() => {
          // this.avatar = process.env.default_avatar
        });
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];
      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);
      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);
        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }
      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
<style scoped>
.card-height {
  height: 250px;
}
.ui1 {
  font-size: 12px;
}

</style>