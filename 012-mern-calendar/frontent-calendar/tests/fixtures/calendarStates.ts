import { CalendarState, Event, TYPES_OF_ACTIVE_EVENTS } from "../../src/store/calendar/calendarSlice";

export const events:Event[] = [
  {
    id: 1,
    title: 'Titulo',
    notes: 'Description',
    start:  new Date('2022-10-21 13:00:00'),
    bgColor:'#c3b556',
    end: new Date('2022-10-21 15:00:00'),
    user: {
      name:'Thom',
      uid:'54654564'
    },
  }
]


export const calendarInitialState:CalendarState = {
  events:[],
  activeEvent : null
}

export const calendarWithEventsState = {
  events:[...events],
  activeEvent : null
}
export const calendarWithActiveEventState:CalendarState = {
  events:[...events],
  activeEvent : {
    type : TYPES_OF_ACTIVE_EVENTS.EXISTING_EVENT,
    event : {...events[0]}
  }
}