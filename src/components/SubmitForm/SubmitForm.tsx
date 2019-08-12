import React from 'react';
import Button from "../Button/Button";
import {addTicketAsync} from "../../actions/actions";
import {Ticket} from "../../api";

const SubmitForm = () => {

    return (
        <form className="ma5 bg-light-gray shadow-5 br3 flex-column justify-between"
             style={{maxWidth: "26rem", minWidth: "16rem"}}
              onSubmit={addTicketAsync()}>
            <div className="w-100 h3 br--top br3 bg-silver flex items-center">
                <div className="center f2 fw3 dark-gray">SUBMIT</div>
            </div>
            <div className="ma4 h5 w5 bg-gray center"/>
            <div className="h5 flex flex-column justify-between">
                <div className="h-100 center">
                    <Button>Upload Image</Button>
                </div>
                <div className="h-100 center">
                    <Button>Tag Location</Button>
                </div>
                <div className="h-100 center">
                    <Button type="submit">Submit Ticket</Button>
                </div>
            </div>
        </form>
    );
};

export default SubmitForm;
