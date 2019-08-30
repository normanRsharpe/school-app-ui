import React, {useContext, useState} from 'react';
import Button from "../Button/Button";
import {createTicketOnSubmit} from "../../utilities/formSubmissionUtil";
import {DispatchContext, StateContext} from "../../context/AppContext";
import {Ticket} from "../../api";

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
    function success(position : Position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
    }
    const setLocation = (location: string) =>{
        setFormState({
            ...formState,
            coordinates: location
        })
    };

    const processFile = (e: any) => {
        var file = e.target.files[0]
        var formdata = new FormData();

        formdata.append('file', file);
        formdata.append('cloud_name',  'normans-cloud');
        formdata.append('upload_preset', 'hsdpkwtg');

        var xhr = new XMLHttpRequest();
        xhr.open('POST', "https://api.cloudinary.com/v1_1/normans-cloud/image/upload",true);

        xhr.onload = function () {
            // do something to response
            console.log(this.responseText);
            const stringResponse = JSON.parse(xhr.response)
            setFormState({
                photoURL: stringResponse.url,
            })
        };
        xhr.send(formdata);
    }
    return (
        <form className="ma5 bg-light-gray shadow-5 br3 flex-column justify-between"
             style={{maxWidth: "26rem", minWidth: "16rem"}}
              onSubmit={createTicketOnSubmit(
                  formState,
                  dispatch,
                  afterSubmit,
              )}>
            <div className="w-100 h3 br--top br3 bg-silver flex items-center">
                <div className="center f2 fw3 dark-gray">SUBMIT</div>
            </div>
            <div>{formState.photoURL ?
                <div className="ma4 h5 w5 center">
                    <img src={formState.photoURL} className= "w-100 h-100"/>
                </div>
                : <div className="ma4 h5 w5 bg-gray center"/>}
            </div>
            <div className="h5 flex flex-column justify-between">
                <div className="h-100 center">
                    <input type="file" id="fileElem" multiple accept="image/*" onChange={processFile} className="bg-moon-gray pv2 dim dark-gray pointer br2 w4"/>
                    {/*<Button onClick={() => setFormState({*/}
                    {/*    ...formState,*/}
                    {/*    description:"Hello"*/}
                    {/*})}>Upload Image</Button>*/}
                </div>
                <div className="h-100 center">
                    <Button
                        onClick={() => navigator.geolocation.getCurrentPosition(success)}
                        style={formState.coordinates ? "bg-green" : ""}
                    >Tag Location</Button>
                </div>
                <div className="h-100 center">
                    <Button type="submit">Submit Ticket</Button>
                </div>
            </div>
        </form>
    );
};

export default SubmitForm;
