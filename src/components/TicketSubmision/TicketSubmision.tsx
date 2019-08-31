import React, {useContext} from 'react';
import {Ticket} from "../../api";
import Button from "../Button/Button";
import {deleteTicket, deleteTicketAsync} from "../../actions/actions";
import {DispatchContext} from "../../context/AppContext";


export interface ITicketSubmissionProps {
    ticket: Ticket;
}

export const TicketSubmission: React.FC<ITicketSubmissionProps> = ({ticket}) => {
    const { dispatch } = useContext(DispatchContext);
    return(
    <div className="ma3 bg-light-gray shadow-5 br3 flex-column justify-between"
         style={{maxWidth: "26rem", minWidth: "24rem"}}>
        <div className="w-100 h3 br--top br3 bg-silver flex items-center relative overflow-container">
            <div className="center f2 fw4 dark-gray">Ticket</div>
            <div className="w2 h2 br3 bg-gray tc pt1 f4 dark-gray pointer mr2 absolute" style={{right:5}}onClick={()=>(dispatch(deleteTicketAsync(ticket)))}>X</div>
        </div>
        <div>{ticket.photoURL ?
            <div className="ma4 h5 w5 center">
                <img src={ticket.photoURL} className= "w-100 h-100"/>
            </div>
            : <div className="ma4 h5 w5 bg-gray center"/>}
        </div>
        <div className="w-100 h3">
            <a style={{ textDecoration: 'none' }} target="_blank" href={ticket.coordinates}><Button>Find Me</Button></a>
        </div>
    </div>
)
}

export default TicketSubmission;