import React from 'react';
import {Ticket} from "../../api";
import Button from "../Button/Button";


export interface ITicketSubmissionProps {
    ticket?: Ticket;
}
export const TicketSubmission: React.FC<ITicketSubmissionProps> = ({ticket}) => (
    <div className="ma3 bg-light-gray shadow-5 br3 flex-column justify-between"
         style={{maxWidth: "26rem", minWidth: "24rem"}}>
        <div className="w-100 h3 br--top br3 bg-silver flex items-center">
            <div className="center f2 fw3 dark-gray">{ticket ? ticket.id : "" }</div>
        </div>
        <div className="ma4 h5 w5 bg-gray center"/>
    </div>
)

export default TicketSubmission;