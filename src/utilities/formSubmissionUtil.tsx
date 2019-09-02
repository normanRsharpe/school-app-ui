import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import {Action, addTicketAsync} from '../actions/actions';
import IState from '../types/State';
import { Thunk } from '../types/Thunk';
import {Ticket} from "../api";

export const createTicketOnSubmit = <I extends { id?: string }>(
    initialState: IState,
    formState: I,
    dispatch: React.Dispatch<Thunk<IState, Action> | Action>,
    setFormState: React.Dispatch<React.SetStateAction<I>>,
    afterSubmit?: (e: React.FormEvent) => void
) => (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTicketAsync(formState));
    setFormState({
        ...formState,
        id: "",
        photoURL: "",
        coordinates: "",
        description: ""
    });
    if (afterSubmit) {
        afterSubmit(e);
    }
};

//image handling
export const processFile = (e:any) => (setFormState: React.Dispatch<React.SetStateAction<Ticket>>, formState: Ticket) => {
    var file = e.target.files[0]
    var formData = new FormData();
    formData.append('file', file);
    formData.append('cloud_name',  'normans-cloud');
    formData.append('upload_preset', 'hsdpkwtg');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "https://api.cloudinary.com/v1_1/normans-cloud/image/upload",true);
    xhr.onload = function () {
        setFormState({
            ...formState,
            photoURL: JSON.parse(xhr.response).url,
        })
    };
    xhr.send(formData);
}

//Geolocation
export const setLocation = (position : Position, setFormState: React.Dispatch<React.SetStateAction<Ticket>>, formState: Ticket) =>{
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
    setFormState({
        ...formState,
        coordinates: location
    })
}