import { addHours } from "date-fns";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Author {
  uid: string;
  name: string;
}

export interface Event {
  id: number;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: Author;
}

export enum TYPES_OF_ACTIVE_EVENTS {
  NEW_EVENT = "[new]",
  EXISTING_EVENT = "[existing]",
}

export type TYPE_OF_THE_ACTIVE_EVENT =
  TYPES_OF_ACTIVE_EVENTS[keyof TYPES_OF_ACTIVE_EVENTS];

// export interface ACTIVE_EVENT {
//   type : TYPE_OF_THE_ACTIVE_EVENT,
//   event:Event
// }

export type ACTIVE_EVENT_TYPE =
  | { type: TYPES_OF_ACTIVE_EVENTS.EXISTING_EVENT; event: Event }
  | { type: TYPES_OF_ACTIVE_EVENTS.NEW_EVENT; event: Omit<Event, "id"> };

export interface CalendarState {
  events: Event[];
  activeEvent?: ACTIVE_EVENT_TYPE | null;
  // isLoadingEvents:boolean
}

const initialState: CalendarState = {
  events: [
    // {
    //   _id: new Date().getTime(),
    //   title: "Cumpleaños del Jefe",
    //   notes: "Hay que comprar el pastel",
    //   start: new Date(),
    //   end: addHours(new Date(), 2),
    //   bgColor: "#fafafa",
    //   user: {
    //     _id: "123",
    //     name: "Thom",
    //   },
    // },
  ],
  activeEvent: null,
};
export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // cuando e voy doble click al evento para que se ponga en el modal
    onSetActiveEvent: (
      state: CalendarState,
      action: PayloadAction<ACTIVE_EVENT_TYPE>
    ) => {
      state.activeEvent = action.payload;
    },
    // cuando creo un nuevo evento
    onAddNewEvent: (state: CalendarState, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },

    // actualizar el evento seleccionado, que es el activo en el modal
    onUpdateEvent: (state: CalendarState, action: PayloadAction<Event>) => {
      state.events = state.events.map((event) => {
        if (event.id === action.payload.id) {
          return {
            ...action.payload,
            id: event.id,
          };
        }

        return event;
      });
      state.activeEvent = null;
    },
    onClearActiveEvent: (state: CalendarState) => {
      state.activeEvent = null;
    },
    // cuando le doy click a un evento y sale un boton para eliminar
    onDeleteEvent: ( state:CalendarState ) => {
      if ( state.activeEvent != null && state.activeEvent.type === TYPES_OF_ACTIVE_EVENTS.EXISTING_EVENT ) {
          state.events = state.events.filter( event => event.id !==  (state.activeEvent?.event as Event).id);
          state.activeEvent = null;
      }
    },
    onLogoutCalendar : (state: CalendarState) => {
      state.activeEvent = null
      state.events = []
    },
    onLoadEvents : (state: CalendarState, action: PayloadAction<Event[]>) => {
      action.payload.forEach(event=>{
        const exists = state.events.some(dbEvent=>dbEvent.id === event.id)
        if(!exists ){
          state.events.push(event)
        }
      })
    }
  },
});
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onClearActiveEvent,
  onDeleteEvent,
  onLogoutCalendar,
  onLoadEvents
} = calendarSlice.actions;
