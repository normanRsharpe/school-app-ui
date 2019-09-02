import React from 'react'
import NavBar from "../NavBar/NavBar";
import SubmitForm from "../SubmitForm/SubmitForm";
import TicketNav from "../TicketNav/TicketNav";


const Main: React.FC = () => {
    return (
        <div className="h-100 relative overflow-hidden">
            <NavBar/>
            <div className="flex justify-between h-100">
                <div className="ma5 h-75 flex flex-column justify-around">
                    <SubmitForm/>
                </div>
                <div className="w-50 overflow-scroll mb3">
                        <TicketNav/>
                </div>
            </div>
        </div>
    );
}

export default Main;
