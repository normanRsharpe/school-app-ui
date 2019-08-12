import React, {useContext, useEffect} from 'react';
import {Ticket} from "../../api";
import {DispatchContext, StateContext} from "../../context/AppContext";
import {getAllTickets, getTicketById} from "../../reducers/reducer";
import TicketSubmission from "../TicketSubmision/TicketSubmision";
import {setTickets} from "../../actions/actions";



const TicketNav = (): React.ReactElement =>   {

    const { state } = useContext(StateContext);
    const getTickets: Ticket[] = getAllTickets(state);
    const { dispatch, getApi } = useContext(DispatchContext);


    useEffect(() => {
        getApi()
            .gettickets()
            .then(response => {
                dispatch(setTickets(response.data));
            })
            .catch();
    }, [getApi, dispatch]);

    return (
        <div className="w-70 flex flex-column items-center overflow-scroll">
            {getTickets.map(ticket => <TicketSubmission ticket={ticket}/> )}
        </div>
    )
}

export default TicketNav;