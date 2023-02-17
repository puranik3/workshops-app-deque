import axios from 'axios';
import ISession from '../models/ISession';

export type VoteType = 'upvote' | 'downvote'

const getSessionsForWorkshop = async ( id : number | string ) => {
    const response = await axios.get( `https://workshops-server.herokuapp.com/workshops/${id}/sessions` );
    return response.data;
};

const voteForSession = async ( id : number | string, voteType : VoteType ) => {
    const response = await axios.put( `https://workshops-server.herokuapp.com/sessions/${id}/${voteType}` );
    return response.data;
};

const addSession = async ( session : Omit<ISession, 'id'> ) => {
    const response = await axios.post( `https://workshops-server.herokuapp.com/sessions`, session, {
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