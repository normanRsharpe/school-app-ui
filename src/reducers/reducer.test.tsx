import { action } from 'typesafe-actions';
import {
  addEvent,
  deleteEvent,
  setConflicts,
  setEventFormEventId,
  setEventFormType,
  setEvents,
  setShowModal,
  updateEvent,
  setGanttDay,
} from '../actions/actions';
import { Conflict, FlightEvent } from '../api';
import { GROUND_EVENT } from '../const';
import initialState from '../context/initialState';
import reducer from './reducer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const pers1 = {
  name: 'melissa knight',
  rank: '2',
  quals: [],
  tnrCodes: [],
  lastFlightDate: '1956-10-13T12:50:10Z',
  isEnlisted: true,
  id: '34bdeeb2-e230-4a8c-85ff-c30535d50edf',
};
const pers2 = {
  name: 'annette washington',
  rank: '1',
  quals: [],
  tnrCodes: [],
  lastFlightDate: '1951-01-04T14:35:40Z',
  isEnlisted: true,
  id: '24c95226-4845-46da-9579-a51fc3a7cc47',
};

const dummyEvent1 = {
  id: 'c3053d13-12c5-40b1-afc2-617e969d2ef4',
  eventType: 'GroundEvent',
  personnel: [],
  name: 'expedita',
  startTime: '2019-05-29T01:00:00.000Z',
  endTime: '2019-05-29T03:00:00.000Z',
  description: 'Molestiae quibusdam ea voluptatem qui aut distinctio provident est rerum.',
};
const dummyEvent2 = {
  id: 'c3043d13-12d5-40b1-afg2-617e969t2ef4',
  eventType: 'GroundEvent',
  personnel: [],
  name: 'expedita',
  startTime: '2019-05-29T06:00:00.000Z',
  endTime: '2019-05-29T08:00:00.000Z',
  description: 'Molestiae quibusdam ea voluptatem qui aut distinctio provident est rerum.',
};
const dummyEvent2Upd = {
  id: 'c3043d13-12d5-40b1-afg2-617e969t2ef4',
  eventType: 'GroundEvent',
  personnel: [pers1.id, pers2.id],
  name: 'expedita',
  startTime: '2019-05-29T05:00:00.000Z',
  endTime: '2019-05-29T08:00:00.000Z',
  description: 'New descrition.',
};
const dummyEvent3 = {
  id: 'c3543d23-12d5-40b1-afg2-577e969t2ef4',
  eventType: 'GroundEvent',
  personnel: [],
  name: 'expedita',
  startTime: '2019-05-29T06:00:00.000Z',
  endTime: '2019-05-29T08:00:00.000Z',
  description: 'Molestiae quibusdam ea voluptatem qui aut distinctio provident est rerum.',
};
const dummyEvent4 = {
  id: 'c3534d23-12d5-67b1-afg2-577e989t2ef4',
  eventType: 'GroundEvent',
  personnel: [],
  name: 'expedita',
  startTime: '2019-05-29T06:00:00.000Z',
  endTime: '2019-05-29T08:00:00.000Z',
  description: 'Molestiae quibusdam ea voluptatem qui aut distinctio provident est rerum.',
};

describe('Test the event actions of the reducer', () => {
  it('Should Set all Events structured correctly', () => {
    const expectedState = {
      ...initialState,
      events: {
        byId: {
          [dummyEvent1.id]: dummyEvent1,
          [dummyEvent2.id]: dummyEvent2,
          [dummyEvent3.id]: dummyEvent3,
        },
        allIds: [dummyEvent1.id, dummyEvent2.id, dummyEvent3.id],
      },
    };
    const actn = setEvents([dummyEvent1, dummyEvent2, dummyEvent3]);
    const newState = reducer(initialState, actn);
    expect(newState).toEqual(expectedState);
    expect(newState).not.toBe(initialState);
  });

  it('Should Add additional Event to the State', () => {
    const previousState = {
      ...initialState,
      events: {
        byId: {
          [dummyEvent1.id]: dummyEvent1,
          [dummyEvent2.id]: dummyEvent2,
          [dummyEvent3.id]: dummyEvent3,
        },
        allIds: [dummyEvent1.id, dummyEvent2.id, dummyEvent3.id],
      },
    };
    const expectedState = {
      ...initialState,
      events: {
        byId: {
          [dummyEvent1.id]: dummyEvent1,
          [dummyEvent2.id]: dummyEvent2,
          [dummyEvent3.id]: dummyEvent3,
          [dummyEvent4.id]: dummyEvent4,
        },
        allIds: [dummyEvent1.id, dummyEvent2.id, dummyEvent3.id, dummyEvent4.id],
      },
    };

    const actn = addEvent(dummyEvent4);
    const newState = reducer(previousState, actn);
    expect(newState).toEqual(expectedState);
    expect(newState).not.toBe(previousState);
    expect(newState.events).not.toBe(previousState.events);
    expect(newState.events.byId).not.toBe(previousState.events.byId);
    expect(newState.events.allIds).not.toBe(previousState.events.allIds);
  });

  it('Should delete an Event from the State', () => {
    const expectedState = {
      ...initialState,
      events: {
        byId: {
          [dummyEvent1.id]: dummyEvent1,
          [dummyEvent2.id]: dummyEvent2,
          [dummyEvent3.id]: dummyEvent3,
        },
        allIds: [dummyEvent1.id, dummyEvent2.id, dummyEvent3.id],
      },
    };
    const previousState = {
      ...initialState,
      events: {
        byId: {
          [dummyEvent1.id]: dummyEvent1,
          [dummyEvent2.id]: dummyEvent2,
          [dummyEvent3.id]: dummyEvent3,
          [dummyEvent4.id]: dummyEvent4,
        },
        allIds: [dummyEvent1.id, dummyEvent2.id, dummyEvent3.id, dummyEvent4.id],
      },
    };

    const actn = deleteEvent(dummyEvent4.id);
    const newState = reducer(previousState, actn);
    expect(newState).toEqual(expectedState);
    expect(newState).not.toBe(previousState);
    expect(newState.events).not.toBe(previousState.events);
    expect(newState.events.byId).not.toBe(previousState.events.byId);
    expect(newState.events.allIds).not.toBe(previousState.events.allIds);
  });

  it('Should update an Event in the state', () => {
    const expectedState = {
      ...initialState,
      events: {
        ...initialState.events,
        byId: {
          [dummyEvent1.id]: dummyEvent1,
          [dummyEvent2Upd.id]: dummyEvent2Upd,
        },
        allIds: [dummyEvent1.id, dummyEvent2Upd.id],
      },
    };
    const previousState = {
      ...initialState,
      events: {
        ...initialState.events,
        byId: {
          [dummyEvent1.id]: dummyEvent1,
          [dummyEvent2.id]: dummyEvent2,
        },
        allIds: [dummyEvent1.id, dummyEvent2.id],
      },
    };
    const updateObject = {
      id: dummyEvent2Upd.id,
      personnel: [pers1.id, pers2.id],
      description: 'New descrition.',
      startTime: '2019-05-29T05:00:00.000Z',
    };

    const actn = updateEvent(updateObject);
    const newState = reducer(previousState, actn);
    expect(newState).toEqual(expectedState);
  });

  it('Should set the modal display state', () => {
    const expectedState = {
      ...initialState,
      ui: {
        ...initialState.ui,
        modal: {
          ...initialState.ui.modal,
          isOpen: true,
        },
      },
    };

    const actn = setShowModal(true);
    const newState = reducer(initialState, actn);
    expect(newState).toEqual(expectedState);
  });

  it('Should set the event form eventId', () => {
    const eventId = 'abcd';
    const expectedState = {
      ...initialState,
      ui: {
        ...initialState.ui,
        eventForm: {
          ...initialState.ui.eventForm,
          eventId,
        },
      },
    };

    const actn = setEventFormEventId(eventId);
    const newState = reducer(initialState, actn);
    expect(newState).toEqual(expectedState);
  });

  it('Should set the conflicts array', () => {
    const testConflict: Conflict = {
      primaryEventId: 'cba',
      conflictingEventId: 'cba',
      conflictingPersonId: 'abc',
      reason: 'Some reason.',
    };

    const expectedState = {
      ...initialState,
      ui: {
        ...initialState.ui,
        conflicts: [testConflict],
      },
    };

    const actn = setConflicts([testConflict]);
    const newState = reducer(initialState, actn);
    expect(newState).toEqual(expectedState);
  });

  it('Should set the type of the form to be presented', () => {
    const expectedState = {
      ...initialState,
      ui: {
        ...initialState.ui,
        eventForm: {
          ...initialState.ui.eventForm,
          eventFormType: GROUND_EVENT,
        },
      },
    };
    const actn = setEventFormType(GROUND_EVENT);
    const newState = reducer(initialState, actn);
    expect(newState).toEqual(expectedState);
  });

  it('Should set the current gantt day to a given day', () => {
    //Given a current day as initial state
    //and a desired day to be set in state
    //When I use the setCurrentGanttDay is dispatched
    //Then I expect the state to update to the desired day.
    const desiredDay = dayjs('2019-01-01T09:00:00.000Z').utc();
    const expectedState = {
      ...initialState,
      ui: {
        ...initialState.ui,
        gantt: {
          ...initialState.ui.gantt,
          currentGanttDay: desiredDay,
        },
      },
    };

    const newState = reducer(initialState, setGanttDay(desiredDay));
    expect(newState).toEqual(expectedState);
  });

  //   it("should add personnel to the state"), () => {

  //   }

  /*
  More to test

  case SET_PERSONNEL:
      return {
        ...state,
        personnel: action.payload,
      };
    case INC_GANTTDAY:
      return {
        ...state,
        currentGanttDay: state.currentGanttDay.add(1, 'd'),
      };
    case DEC_GANTTDAY:
      return {
        ...state,
        currentGanttDay: state.currentGanttDay.subtract(1, 'd'),
      };
  */
});
