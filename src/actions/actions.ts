import { action, ActionType } from 'typesafe-actions';
import { Ticket } from '../api';
import { AsyncAction } from '../types/AsnycAction';

// tickets
export const ADD_TICKET = 'ADD_TICKET';
export const SET_TICKETS = 'SET_TICKETS';
export const DELETE_TICKET = 'DELETE_TICKET';

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

export const deleteTicket = (ticket: Ticket) => action(DELETE_TICKET, ticket);

export const deleteTicketAsync: AsyncAction = (
    ticket: Ticket,
) => (dispatch, _, getApi) => {
    ticket.id ?
    getApi()
        .deleteTicket(ticket.id)
        .then(() => {
            getApi()
                .gettickets()
                .then(response => {
                    dispatch(setTickets(response.data));
                })
        })
        .catch()
    : console.log("bad request");
};


// the action type
export type Action =
    | ActionType<typeof setTickets>
    | ActionType<typeof addTicket>
    | ActionType<typeof deleteTicket>
