import {Ticket} from '../api';
import initialState from "../context/initialState";
import reducer from "./reducer";
import {addTicket, deleteTicket, setTickets} from "../actions/actions";

describe("Ticket reducer test", () => {
    it('should add ticket to state', ()=>{
        // given a reducer call with the action of addTicket
        // and that action contains a new ticket as an argument
        // and that action contains old state, which does not contain the ticket
        // when I call newState.tickets.byId with the new ticket id
        // Then I expect the new state to contain that ticket.

        const newTicket: Ticket = {
            id: "testId",
            description: "test description",
            photoURL: "test photo",
            coordinates: "test coordinates"
        }
        const oldState = initialState;
        const newState = reducer(oldState, addTicket(newTicket));
        expect(newState.tickets.byId['testId']).toEqual(newTicket);
    })
    it('should set tickets to state', ()=>{
        // given a reducer call with the action of setTicket
        // and that action contains a new or updated ticket as an argument
        // and that action contains old state, which does not contain the new ticket
        // and has the old version of the updated ticket
        // when I inspect the values in byId and all Ids
        // Then I expect the new state to contain that new and updated ticket.

        const oldTicket: Ticket = {
            id: "oldTicketId",
            description: "old description",
            photoURL: "old photo",
            coordinates: "old coordinates"
        };
        const newTicket: Ticket = {
            id: "testId",
            description: "test description",
            photoURL: "test photo",
            coordinates: "test coordinates"
        };
        const updatedTicket: Ticket = {
            id: "oldTicketId",
            description: "new description",
            photoURL: "new photo",
            coordinates: "new coordinates"
        };
        const oldState = {
            ...initialState,
            tickets: {
                ...initialState.tickets,
                byId: {
                    ...initialState.tickets.byId,
                    ["oldTicketId"]: oldTicket
                },
                allIds: oldTicket.id ? [oldTicket.id] : []
            }
        };

        const newState = reducer(oldState, setTickets([newTicket, updatedTicket]));
        expect(newState.tickets.byId["testId"]).toEqual(newTicket);
        expect(newState.tickets.byId["oldTicketId"]).toEqual(updatedTicket)
    })
    it('should delete tickets from state', ()=>{
        // given a reducer call with the action of deleteTicket
        // when I inspect the values in byId and all Ids
        // Then I expect the new state to not contain that deleted ticket.

        const oldTicket: Ticket = {
            id: "oldTicketId",
            description: "old description",
            photoURL: "old photo",
            coordinates: "old coordinates"
        };
        const oldState = {
            ...initialState,
            tickets: {
                ...initialState.tickets,
                byId: {
                    ...initialState.tickets.byId,
                    ["oldTicketId"]: oldTicket
                },
                allIds: oldTicket.id ? [oldTicket.id] : []
            }
        };

        const newState = reducer(oldState, deleteTicket(oldTicket));
        expect(newState.tickets.byId["oldTicketId"]).toBeFalsy();
    })
})