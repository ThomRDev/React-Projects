import { AxiosError } from 'axios';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers/convertEventsToDateEvents';
import { errorHandler } from '../helpers/errorHandler';
import {
  ACTIVE_EVENT_TYPE,
  calendarSlice,
  Event,
  onAddNewEvent,
  onClearActiveEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
  RootState,
  TYPES_OF_ACTIVE_EVENTS,
  useAppDispatch,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );

  const { user } = useSelector((state: RootState) => state.auth)

  const setActiveEvent = (calendarEvent: ACTIVE_EVENT_TYPE) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const clearActiveNote = () => {
    dispatch(onClearActiveEvent());
  };

  const startSavingEvent = async (calendarEvent: Event) => {
    const payload = {
      title:calendarEvent.title,
      start:calendarEvent.start,
      end:calendarEvent.end,
      notes:calendarEvent.notes
    }
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`,payload)
        dispatch(onUpdateEvent({...calendarEvent,user} as Event));
      } else {
        const { data } = await calendarApi.post(`/events`,payload)
        dispatch(
          onAddNewEvent({ ...calendarEvent, id: data.event.id,user } as Event)
        );
      }
    } catch (error) {
      errorHandler(error as AxiosError,'Error al guardar','No se puedo guardar el evento')
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${ (activeEvent?.event as Event).id }` );
      dispatch( onDeleteEvent() );
    } catch (error) {
      console.log(error);
      errorHandler(error as AxiosError,'Error al eliminar','No se puedo eliminar el evento')
    }
  }
  
  const startLoadingEvents = async () => {
    try{
      const {data} = await calendarApi.get('/events')
      console.log(data.events)
      // se tiene que formatear el date ya que no es compatible
      // ya que el servidor devuelve string y no del tipo Date
      // el react-big-calendar necesita un objeto de tipo Date
      dispatch(onLoadEvents(convertEventsToDateEvents(data.events)))
    }catch(error){
      errorHandler(error as AxiosError,'Error al cargar los eventos','No se puedo cargar los eventos')
    }
  }
  

  return {
    events,
    activeEvent,
    setActiveEvent,
    clearActiveNote,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
    
    // si se selecciono
    hasEventSelected: !!activeEvent && activeEvent.type === TYPES_OF_ACTIVE_EVENTS.EXISTING_EVENT,
  };
};
