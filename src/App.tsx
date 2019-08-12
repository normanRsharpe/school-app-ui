import React from 'react';
import logo from './logo.svg';
import NavBar from "./components/NavBar/NavBar";
import SubmitForm from "./components/SubmitForm/SubmitForm";
import TicketNav from "./components/TicketNav/TicketNav";
import {AppProvider} from "./context/AppContext";

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className=" h-100 relative overflow-hidden">
          <NavBar/>
          <div className="flex justify-between h-100">
              <div className="h-75 w-50">
                <SubmitForm/>
              </div>
              <div className="w-50 overflow-scroll"
              style={{height: "90%", }}>
                <TicketNav/>
              </div>
          </div>
      </div>
    </AppProvider>
  );
}

export default App;
