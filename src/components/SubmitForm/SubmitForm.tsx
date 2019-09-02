import React, {useContext, useState} from 'react';
import Button from "../Button/Button";
import {createTicketOnSubmit, processFile, setLocation} from "../../utilities/formSubmissionUtil";
import {DispatchContext} from "../../context/AppContext";
import {Ticket} from "../../api";
import initialState from "../../context/initialState";

export interface TicketFormProps {
    location?: string
    afterSubmit?: (e: React.FormEvent) => void;
}

export const SubmitForm: React.FC<TicketFormProps> = ({ afterSubmit }) => {
    const { dispatch } = useContext(DispatchContext);
    const ticket: Ticket = {
        id: "",
        photoURL: "",
        coordinates: "",
        description: ""
    };
    const [formState, setFormState] = useState(ticket);

    return (
        <form className="bg-light-gray shadow-5 br3 flex-column"
             style={{maxWidth: "26rem"}}
              onSubmit={createTicketOnSubmit(
                  initialState,
                  formState,
                  dispatch,
                  setFormState,
                  afterSubmit,
              )}
        >
            <div className="h3 br--top br3 bg-green flex items-center">
                <div className="center f2 fw4 near-white">Submit Ticket</div>
            </div>
            <div className="ph5">
                <div>{formState.photoURL ?
                <div className="ma4 h5 w5 center">
                    <img src={formState.photoURL} className= "w-100 h-100" alt="User submission"/>
                </div>
                : <div className="ma4 h5 w5 bg-gray center"/>}
            </div>
            <div className="h5 flex flex-column justify-between">
                <div className="h-100 center ">
                    <div className = "upload-btn-wrapper dim">
                        <Button style={formState.photoURL ? "bg-blue white" : ""}>Upload Image</Button>
                        <input type="file" onChange={e=> processFile(e)(setFormState, formState)} />
                    </div>

                </div>
                <div className="h-100 center ">
                    <Button
                        onClick={() => navigator.geolocation.getCurrentPosition(position => setLocation(position, setFormState, formState))}
                        style={formState.coordinates ? "bg-blue white" : ""}
                    >Tag Location</Button>

                </div>
                <div className="h-100 center ">
                    <Button type="submit">Submit Ticket</Button>
                </div>
            </div>
            </div>
        </form>
    );
};

export default SubmitForm;
