import {
    FETCHING_WORKSHOPS_LIST,
    FETCHED_WORKSHOPS_LIST,
    ERROR_FETCHING_WORKSHOPS_LIST
} from './constants';
import IWorkshop from '../models/IWorkshop';
import { getWorkshops } from '../services/workshops';

const fetchingAC = () => {
    return {
        type: FETCHING_WORKSHOPS_LIST
    };
};

const fetchedAC = ( workshops : IWorkshop[] ) => {
    return {
        type: FETCHED_WORKSHOPS_LIST,
        payload: {
            workshops
        }
    };
};

const errorFetchingAC = ( error : Error ) => {
    return {
        type: ERROR_FETCHING_WORKSHOPS_LIST,
        payload: {
            error
        }
    };
};

const fetching = ( page : number ) => {
    return async ( dispatch : any ) => {
        // action
        dispatch( fetchingAC() );
                
        try {
            // side-effect
            const data = await getWorkshops( page );
            
            dispatch( fetchedAC( data ) );
        } catch( error ) {
            dispatch( errorFetchingAC( error as Error ) )
        };
    }
};

export type WL_Actions = {
    type: typeof FETCHING_WORKSHOPS_LIST
} | {
    type: typeof FETCHED_WORKSHOPS_LIST,
    payload: {
        workshops: IWorkshop[]
    }
} | {
    type: typeof ERROR_FETCHING_WORKSHOPS_LIST,
    payload: {
        error: Error
    }
};

export {
    fetchingAC,
    fetchedAC,
    errorFetchingAC,
    fetching
};