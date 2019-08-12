import { Ticket } from '../api';

export interface IEntity<E> {
  readonly byId: { readonly [id: string]: E };
  readonly allIds: ReadonlyArray<string>;
}

interface IState {
  readonly tickets: IEntity<Ticket>;
}

export default IState;
