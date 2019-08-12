import React from 'react';
import {Action, addTicketAsync} from '../actions/actions';
import {Ticket} from '../api';
import IState from '../types/State';
import { Thunk } from '../types/Thunk';


export const createTicketOnSubmit = <I extends { id?: string }>(
    initialState: I,
    formState: I,
    buildTicketFromState: (fs: I) => Ticket,
    setFormState: React.Dispatch<React.SetStateAction<I>>,
    dispatch: React.Dispatch<Thunk<IState, Action> | Action>,
    afterSubmit?: (e: React.FormEvent) => void
) => (e: React.FormEvent) => {
    e.preventDefault();
    const builtTicket = buildTicketFromState(formState);

    dispatch(addTicketAsync(builtTicket));
    setFormState(initialState);
    if (afterSubmit) {
        afterSubmit(e);
    }
};