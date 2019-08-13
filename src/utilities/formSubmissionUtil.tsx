import React from 'react';
import {Action, addTicketAsync} from '../actions/actions';
import {Ticket} from '../api';
import IState from '../types/State';
import { Thunk } from '../types/Thunk';


export const createTicketOnSubmit = <I extends { id?: string }>(
    formState: I,
    dispatch: React.Dispatch<Thunk<IState, Action> | Action>,
    afterSubmit?: (e: React.FormEvent) => void
) => (e: React.FormEvent) => {
    e.preventDefault();
    // const ticket: Ticket = {
    //     id: "",
    //     photoURL: "",
    //     coordinates: "",
    //     description: ""
    // };

    dispatch(addTicketAsync(formState));
    if (afterSubmit) {
        afterSubmit(e);
    }
};