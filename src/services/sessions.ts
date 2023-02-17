import axios from 'axios';
import ISession from '../models/ISession';

export type VoteType = 'upvote' | 'downvote';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const getSessionsForWorkshop = async ( id : number | string ) => {
    const response = await axios.get( `${apiBaseUrl}/workshops/${id}/sessions` );
    return response.data;
};

const voteForSession = async ( id : number | string, voteType : VoteType ) => {
    const response = await axios.put( `${apiBaseUrl}/sessions/${id}/${voteType}` );
    return response.data;
};

const addSession = async ( session : Omit<ISession, 'id'> ) => {
    const response = await axios.post( `${apiBaseUrl}/sessions`, session, {
        headers: {
            'Content-Type': 'application/json'
        }
    } );
    return response.data;
};

export {
    getSessionsForWorkshop,
    voteForSession,
    addSession
};