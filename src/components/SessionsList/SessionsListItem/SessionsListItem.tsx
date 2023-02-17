import { ListGroupItem, Row, Col } from "react-bootstrap";
import ISession from "../../../models/ISession";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { VoteType } from '../../../services/sessions';

type SessionListItemProps = {
    session: ISession,
    vote: ( id: number | string, voteType : VoteType ) => void
};

const SessionsListItem = ( { session, vote } : SessionListItemProps ) => {
    return (
        <ListGroupItem>
            <Row>
                <Col xs={1} className="d-flex flex-column text-center">
                    <FontAwesomeIcon
                        icon={faCaretUp}
                        className="fa-2x"
                        onClick={() => vote( session.id, 'upvote' )}
                    />
                    <span>{session.upvoteCount}</span>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        className="fa-2x"
                        onClick={() => vote( session.id, 'downvote' )}
                    />
                </Col>
                <Col xs={11}>{session.name}</Col>
            </Row>
        </ListGroupItem>
    );
}
 
export default SessionsListItem;