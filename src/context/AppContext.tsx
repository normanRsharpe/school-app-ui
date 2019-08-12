import React, {createContext, Dispatch, useCallback, useEffect, useRef, useState} from 'react';
import {Action, SET_TICKETS, setTickets} from '../actions/actions';
import { DefaultApi } from '../api/api';
import reducer from '../reducers/reducer';
import IState from '../types/State';
import { Thunk } from '../types/Thunk';
import initialState from './initialState';

/**
 * Context objects (provider and consumer) for app state.
 * Used as the only argument to useContext() hook.
 * Split state and dispatch to avoid rerenders if only using dispatch
 */
export const StateContext = createContext<{ state: IState }>({ state: initialState });

export const DispatchContext = createContext<{
  dispatch: Dispatch<Action | Thunk<IState, Action>>;
  getApi: () => DefaultApi;
}>({
  dispatch: () => null,
  getApi: () => new DefaultApi(),
});

declare global {
  interface Window {
    baseApiUrl: string;
  }
}

export const AppProvider: React.FC = ({ children }) => {
  const [appState, setAppState] = useState(initialState);
  const api = useRef(new DefaultApi(undefined, window.baseApiUrl));
  const getApi = useCallback(() => api.current, []);

  // Set up the reducer as context
  const state = useRef(appState);
  const getState = useCallback(() => state.current, []);
  const setState = useCallback(
    newState => {
      state.current = newState;
      setAppState(newState);
    },
    [setAppState]
  );

  const reduce = useCallback((action: Action) => reducer(getState(), action), [getState]);
  const thunkDispatch: Dispatch<Action | Thunk<IState, Action>> = useCallback(
    action =>
      typeof action === 'function'
        ? action((a: Action) => setState(reduce(a)), getState, getApi)
        : setState(reduce(action)),
    [getApi, getState, reduce, setState]
  );

  useEffect(() => {
    getApi()
        .gettickets()
        .then(response => {
          thunkDispatch(setTickets(response.data));
        })
        .catch(e => undefined);
  }, [getApi, thunkDispatch]);
  return (
    <DispatchContext.Provider value={{ dispatch: thunkDispatch, getApi }}>
      <StateContext.Provider value={{ state: appState }}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
