import { action, ActionType } from 'typesafe-actions';
import { Ticket } from '../api';
import { AsyncAction } from '../types/AsnycAction';

// tickets
export const ADD_TICKET = 'ADD_TICKET';
export const SET_TICKETS = 'SET_TICKETS';

/*
 *
 * Tickets
 *
 */
export const setTickets = (tickets: Ticket[]) => action(SET_TICKETS, tickets);

export const addTicket = (ticket: Ticket) => action(ADD_TICKET, ticket);

export const addTicketAsync: AsyncAction = (
  ticket: Ticket,
  ) => (dispatch, _, getApi) => {
  getApi()
    .createTicket(ticket)
    .then(response => {
        dispatch(addTicket(response.data));
    })
    .catch();
};


// the action type
export type Action =

  | ActionType<typeof setTickets>
  | ActionType<typeof addTicket>
