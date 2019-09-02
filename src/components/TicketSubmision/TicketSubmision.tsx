import React, {useContext} from 'react';
import {Ticket} from "../../api";
import Button from "../Button/Button";
import {deleteTicketAsync} from "../../actions/actions";
import {DispatchContext} from "../../context/AppContext";


export interface ITicketSubmissionProps {
    ticket: Ticket;
}

export const TicketSubmission: React.FC<ITicketSubmissionProps> = ({ticket}) => {
    const { dispatch } = useContext(DispatchContext);
    return(
    <article className="ma5 bg-light-gray shadow-5 br3 flex-column justify-between w-two-thirds">
        <div className="w-100 h3 br--top br3 bg-green flex items-center relative">
            <div className="center f2 fw4 near-white">Ticket</div>
            <div className="w2 h2 br3 tc pt1 f4 bg-dark-green green pointer mr2 absolute" style={{right:5}}onClick={()=>(dispatch(deleteTicketAsync(ticket)))}>X</div>
        </div>
        <div>{ticket.photoURL ?
            <div className="ma4 h5 w5 center">
                <img src={ticket.photoURL} className= "w-100 h-100" alt = "User depiction of damaged infrastructure"/>
            </div>
            : <div className="ma4 h5 w5 bg-gray center"/>}
        </div>
        <div className="w-100 h3">
            <a style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer"  href={ticket.coordinates}><Button>Find Me</Button></a>
        </div>
    </article>
)
}

export default TicketSubmission;