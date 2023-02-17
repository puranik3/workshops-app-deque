import { useState, useEffect } from 'react';
import { Spinner, Alert, ListGroup , Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getSessionsForWorkshop, voteForSession, VoteType } from '../../services/sessions';
import ISession from '../../models/ISession';
import SessionsListItem from './SessionsListItem/SessionsListItem';

type Props = {
    id: number | string
}

const SessionsList = ( { id } : Props ) => {
    const [ loading, setLoading ] = useState( true );
    const [ sessions, setSessions ] = useState<ISession[]>( [] );
    const [ error, setError ] = useState<Error | null>( null );

    const vote = async ( id : number | string, voteType : VoteType ) => {
        try {
            const updatedSession = await voteForSession( id, voteType );
            const newSessions = sessions.map( s => s.id === id ? updatedSession : s );
            setSessions( newSessions );
            alert( 'Your vote has been captured' );
        } catch( error ) {
            alert( (error as Error).message );
        }
    }

    useEffect(
        () => {
            const helper = async () => {
                try {
                    const data = await getSessionsForWorkshop( id );
                    setSessions( data );
                } catch( error ) {
                    setError( error as Error );
                }

                setLoading( false );
            };

            helper();
        },
        []
    );

    return (
        <div>
            <h2>
                List of sessions
                <Link to="add" className="btn btn-primary btn-sm float-end">Add a session</Link>
            </h2>
            <hr />
            {
                loading && (
                    <div className="text-center">
                        <Spinner />
                    </div>
                )
            }
            {
                !loading && error && (
                    <Alert variant="danger">{error.message}</Alert>
                )
            }
            {
                !loading && !error && sessions && (
                    <ListGroup>
                    {
                        sessions.map(
                            session => (
                                <SessionsListItem
                                    session={session}
                                    vote={vote}
                                    key={session.id}
                                />
                            )
                        )
                    }
                    </ListGroup>
                )
            }
        </div>
    );
}
 
export default SessionsList;