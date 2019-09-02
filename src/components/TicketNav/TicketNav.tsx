import React, {useContext, useEffect} from 'react';
import {Ticket} from "../../api";
import {DispatchContext, StateContext} from "../../context/AppContext";
import {getAllTickets} from "../../reducers/reducer";
import TicketSubmission from "../TicketSubmision/TicketSubmision";
import {setTickets} from "../../actions/actions";
import '../../index.css';

import { Flipper, Flipped } from 'react-flip-toolkit'



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
            <div className="w-70 flex flex-column-reverse">
                    <Flipper flipKey={getTickets.join('')} spring='stiff'>
                        <ul className="list">
                            {getTickets.reverse().map(ticket => (
                                <Flipped key={ticket.id} flipId={ticket.id}>
                                    <li>
                                    <TicketSubmission ticket={ticket} key={ticket.id}/>
                                    </li>
                                </Flipped>
                            ))}
                        </ul>
                    </Flipper>
            </div>

    )
}
export default TicketNav;