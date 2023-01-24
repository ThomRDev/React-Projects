import { calendarInitialState, calendarWithActiveEventState, calendarWithEventsState, events } from './../../fixtures/calendarStates';
import { calendarSlice, Event, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent, TYPES_OF_ACTIVE_EVENTS } from './../../../src/store/calendar/calendarSlice';
describe('Tests CalendarSlice', () => {
  test('should return the initial state', () => {
    const state = calendarSlice.getInitialState()
    expect(state).toEqual(calendarInitialState)
  })
  test('onSetActiveEvent should active the event', () => {
    const state = calendarSlice.reducer(calendarWithEventsState,onSetActiveEvent({
      type: TYPES_OF_ACTIVE_EVENTS.EXISTING_EVENT,
      event: events[0]
    }))
    expect(state.activeEvent?.event).toEqual(events[0])
  })
  test('onAddNewEvent should add a new event', () => {
    const newEvent:Event = {
      bgColor:'#222',
      start: new Date('2020-10-21 13:00:00'),
      end: new Date('2020-10-21 15:00:00'),
      title: 'My title',
      notes: 'Alguna nota!!',
      id:2,
      user:{
        name:'Carlos',
        uid:'asdasdasd'
      }
    }
    const state = calendarSlice.reducer(calendarWithEventsState,onAddNewEvent(newEvent))
    expect(state.events).toEqual([...events,newEvent])
  })

  test('onUpdateEvent should update an event', () => {
    
    const updatedEvent = {
      ...events[0],
      title:'Titulo actualizado'
    }
    
    const state = calendarSlice.reducer(calendarWithEventsState,onUpdateEvent(updatedEvent))
    expect( state.events ).toContainEqual(updatedEvent)

  })
  test('onDeleteEvent should delete an event', () => {
   
    const activeEvent = calendarInitialState.activeEvent?.event
    const state = calendarSlice.reducer(calendarWithActiveEventState,onDeleteEvent())
    expect( state.activeEvent ).toBe(null)
    expect( state.events ).not.toContainEqual(activeEvent)
    
  })
  test('onLoadEvents should load the events', () => {
    const state = calendarSlice.reducer(calendarInitialState,onLoadEvents(events))
    expect(state.events).toEqual(events)

    const newState = calendarSlice.reducer(state,onLoadEvents(events))
    expect(newState.events.length).toBe(events.length)
  })
  test('onLogoutCalendar should clear the state', () => {
    const state = calendarSlice.reducer(calendarInitialState,onLogoutCalendar())
    expect(state).toEqual(calendarInitialState)
  })
})