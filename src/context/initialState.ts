import IState from '../types/State';

// Application state prior to data fetch.
const initialState: IState = {
  tickets: {
    byId: {},
    allIds: [],
  }
};

export default initialState;
