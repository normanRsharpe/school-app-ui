import { Ticket } from '../api';

export interface IEntity<T> {
  readonly byId: { readonly [id: string]: T };
  readonly allIds: ReadonlyArray<string>;
}

interface IState {
  readonly tickets: IEntity<Ticket>;
}

export default IState;
