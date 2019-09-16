import {DefaultApi, Ticket} from "../api";
import {addTicketAsync, addTicket} from "../actions/actions"
import mockAxios from 'axios';
jest.mock('axios')

describe('Test the create (POST) ticket actions', () => {
    it('should call the API POST and dispatch for add ticket if valid response', async () => {
        const goodTicket: Ticket = {
            coordinates:"testCoordinates",
            photoURL:"testURL",
            description: "Empty description"
        };
        (mockAxios.request as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                data: goodTicket,
            })
        );
        const dispatch = jest.fn();
        const getState = jest.fn();
        const addTicketThunk = addTicketAsync(goodTicket)
        await addTicketThunk(dispatch, getState, () => new DefaultApi());
        expect(dispatch).toHaveBeenCalledWith(addTicket(goodTicket));
    });
})