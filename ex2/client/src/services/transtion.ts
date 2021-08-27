import {TRANSITION} from "@constants";
import {makeRequest} from '@configs/axios';
interface Response {
    data: any,
    message: string
}
interface ITransitionService {
    getNextState: (state: TRANSITION.STATE) => Promise<Response>,
    reset: () => Promise<Response>
}

const TransitionService: ITransitionService = {
    getNextState: async (state: TRANSITION.STATE) => {
        const {data: response} = await makeRequest(`/transitions/${state}`, {
            method: 'PATCH',
        });
        return response;

    },
    reset: async () => {
        const response = await makeRequest(`/transitions/reset`, {
            method: 'PATCH',
        });

        return {
            data: response.data.data,
            message: response.data.message
        };
    }
}

export {TransitionService};