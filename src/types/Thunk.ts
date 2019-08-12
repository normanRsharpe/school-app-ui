import { Dispatch } from 'react';
import { DefaultApi } from '../api';

export type Thunk<S, A> = (
  dispatch: Dispatch<A>,
  getState: () => S,
  getApi: () => DefaultApi
) => void;
