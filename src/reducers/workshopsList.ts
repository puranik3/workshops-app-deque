import {
    FETCHING_WORKSHOPS_LIST,
    FETCHED_WORKSHOPS_LIST,
    ERROR_FETCHING_WORKSHOPS_LIST
} from '../actions/constants';
import { WL_Actions } from '../actions/creators';
import IWorkshop from '../models/IWorkshop';
import { RootState } from '../store';

const initialState = {
    workshops: [] as IWorkshop[],
    error: null as Error | null,
    loading: true
};

const workshopsListReducer = ( state = initialState, action : WL_Actions ) => {
    switch( action.type ) {
        case FETCHING_WORKSHOPS_LIST:
            return {
                ...state,
                loading: true,
                error: null,
                workshops: [] as IWorkshop[]
            };
        case FETCHED_WORKSHOPS_LIST:
            return {
                ...state,
                workshops: action.payload.workshops,
                loading: false,
                error: null
            };
        case ERROR_FETCHING_WORKSHOPS_LIST:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
                workshops: [] as IWorkshop[]
            };
        default:
            return state;
    }
};

export const selectWLState = ( state : RootState ) => state.workshopsList;

export default workshopsListReducer;