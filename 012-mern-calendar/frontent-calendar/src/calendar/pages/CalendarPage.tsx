import { Navbar } from "../components/Navbar";
import { Calendar, CalendarProps, EventPropGetter, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css ";
import { addHours } from "date-fns";
import { localizer, getMessagesES } from "../../helpers";
import { CalendarEvent } from "../components/CalendarEvent";
import { useEffect, useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useAuthStore, useCalendarStore, useUIStore } from "../../hooks";
import { Event, TYPES_OF_ACTIVE_EVENTS } from "../../store";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";

// const events = [
//   {
//     title: "Cumpleaños del jefe",
//     notes: "Hay que comprar el pastel",
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: "#fafafa",
//     user: {
//       _id: "21",
//       name: "thom",
//     },
//   },
// ];

// interface EventCalendarProps {
//   _id:number
//   title: string;
//   notes: string;
//   start: Date;
//   end: Date;
//   bgColor: string;
//   user: {
//       _id: string;
//       name: string;
//   };
// }

export const CalendarPage = () => {

  const { user } = useAuthStore()
  const { openDateModal } = useUIStore()
  const { events,setActiveEvent,startLoadingEvents } = useCalendarStore()

  // const [lastView,setLastView] = useState(localStorage.getItem('view') || 'agenda')
  const [lastView,setLastView] = useState(localStorage.getItem('view') || 'week')

  // cambia el stylo del la fecha selecionada
  const eventStyleGetter: EventPropGetter<any> = (
    event,
    start,
    end,
    isSelected
  ) => {
    // console.log('eventStyleGetter',{ event, start, end, isSelected });
    console.log(event.user)
    const isMyEvent = user?.uid == event.user._id || user?.uid == event.user.uid

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return { style };
  };

  // cuando se hace doble click
  const onDoubleClick = (event:Event) => {
    openDateModal()
    console.log({ doubleClick: event })
  }
  
  // cuando se hace click
  const onSelect = (event:Event) => {
    setActiveEvent({
      event,
      type : TYPES_OF_ACTIVE_EVENTS.EXISTING_EVENT
    })
    console.log({ click: event })
  }

  // cuando cambia la vista (mes,semana,dia,agenda)
  const onViewChanged = (event:View) => {
    
    console.log({ viewChanged: event })

    localStorage.setItem('view',event)
    setLastView(event)
  }
  
  useEffect(()=>{
    startLoadingEvents()
  },[])

  return (
    <div className="animate__animated animate__fadeIn">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}

        // la vista por defecto
        // defaultView={ 'agenda' }
        defaultView={ lastView as any }



        // culture busca el objeto de locales donde esta mi helper de localizer
        // y cambia el idioma calendario en si
        culture="es"
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        // para formatear las cabeceras los botones a otro idioma
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          // lo que hace es cambiar el cuadro en si de la fecha marcada
          // con un componente personalizable
          event:CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </div>
  );
};
