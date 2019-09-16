import {
  ADD_TICKET, DELETE_TICKET,
  SET_TICKETS
} from '../actions/actions';
import initialState from '../context/initialState';
import IState from '../types/State';
import {Action} from "../actions/actions";
import {Ticket} from "../api";

const reducer = (state: IState = initialState, action: Action): IState => {
  switch (action.type) {
    case ADD_TICKET:
      return action.payload.id ? {
        ...state,
        tickets: {
          ...state.tickets,
          byId: {
            ...state.tickets.byId,
            [action.payload.id]: action.payload,
          },
          allIds: state.tickets.allIds.concat(action.payload.id),
        }
      } : state;
    case SET_TICKETS:
      const startObject: { readonly [id: string]: Ticket } = {};
      const ticketObject = action.payload.reduce((newObject, ticket) => {
        return ticket.id
            ? {
              ...newObject,
              [ticket.id]: {
                ...ticket,
              },
            }
            : newObject;
      }, startObject);

      return {
        ...state,
        tickets: {
          byId: ticketObject,
          allIds: action.payload
              .map(ticket => (ticket.id ? ticket.id : ''))
              .filter(ticketId => ticketId !== ''),
        },
      };
    case DELETE_TICKET:

      const { [action.payload.id ? action.payload.id : ""]: value, ...rest } = state.tickets.byId;
      return {
        ...state,
        tickets: {
          ...state.tickets,
          allIds: state.tickets.allIds.filter(id => action.payload !== id),
          byId: rest
        },
      };

    default:
      return state;
  }
};

export default reducer;

// Selectors

export const getTicketById = (state: IState) => state.tickets.byId;
export const getAllTickets = (state: IState) => state.tickets.allIds.map(personId => getTicketById(state)[personId]);

