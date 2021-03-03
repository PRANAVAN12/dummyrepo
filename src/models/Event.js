import * as moment from "moment/moment";
export class Event {
  constructor() {
    this.title = "";
    this.all_day = true;
    this.start =
      this.all_day == true
        ? moment(new Date()).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    this.end =
      this.all_day == true
        ? moment(new Date()).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    this.repeat = "";
    this.repeat_end = moment(new Date()).format("YYYY-MM-DD");
    this.visibility = "";
    this.event_type_id = "";
    this.staffs = [];
    this.description = "";
    // return this;
  }
  toViewModel(event) {
    this.id = event.id;
    this.title = event.title;
    this.start = event.start;
    this.end = event.end;
    this.all_day = event.all_day;
    this.repeat = event.repeat;
    this.repeat_end = event.repeat_end;
    this.visibility = event.visibility;
    this.event_type_id = event.event_type_id;
    this.staffs = event.staffs;
    this.description = event.description;

    return this;
  }

  toEditView(item) {

    
      return {
        id : item.id,
        title: item.title,
        description: item.description,
        start: item.start ? moment(item.start).format("YYYY-MM-DD HH:mm:ss") : '----',
        end: item.end ? moment(item.end).format("YYYY-MM-DD HH:mm:ss") : '----',
       
        all_day : item.all_day,
        repeat : item.repeat,
        repeat_end : item.repeat_end,
        visibility : item.visibility,
        event_type_id : item.event_type_id,
        staffs : item.staffs,
      }
  
}
  toListView(event) {
      return event.map(function(item){
        return {
          id : item.id,
          name: item.title,
          details: item.description,
          start: item.start ? moment(item.start).format("YYYY-MM-DD HH:mm:ss") : '----',
          end: item.end ? moment(item.end).format("YYYY-MM-DD HH:mm:ss") : '----',
          color: item.eventType.color,
        }
      })
  }

  toRequestModel(event) {
    let tempEvent = {};
    tempEvent.title = event.title;
    tempEvent.start = event.start;
    tempEvent.end = event.end;
    tempEvent.all_day = event.all_day == true ? "Yes" : "No";
    tempEvent.repeat = event.repeat;
    tempEvent.repeat_end = event.repeat_end;
    tempEvent.visibility = event.visibility;
    tempEvent.event_type_id = event.event_type_id;
    tempEvent.staffs = event.staffs;
    tempEvent.description = event.description;

    return tempEvent;
  }
}
