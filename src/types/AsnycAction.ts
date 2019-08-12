import { Action } from '../actions/actions';
import IState from './State';
import { Thunk } from './Thunk';
import {Ticket} from "../api";

export type AsyncAction = (a: any) => Thunk<IState, Action>;

export type AddEventAsyncAction = (
    t: Ticket,
) => Thunk<IState, Action>;
