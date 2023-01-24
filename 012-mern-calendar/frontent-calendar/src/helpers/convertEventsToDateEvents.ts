import { parseISO } from 'date-fns';
import { Event } from '../store';


export const convertEventsToDateEvents = ( events:Event[]) => {

    return events.map( event => {

        event.end = parseISO( event.end.toString() );
        event.start = parseISO( event.start.toString() );

        return event;
    })

}