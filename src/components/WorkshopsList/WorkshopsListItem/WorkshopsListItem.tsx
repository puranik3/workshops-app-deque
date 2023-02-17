import IWorkshop from "../../../models/IWorkshop";
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import './WorkshopsListItem.scss';

interface Props {
    workshop: IWorkshop
}

const WorkshopsListItem = ( { workshop } : Props ) => {
    return (
        <Link to={'' + workshop.id} className="d-flex text-reset text-decoration-none">
            <Card className="w-100 p-3 workshops-list-item" data-testid={`workshop-${workshop.id}`}>
                <Card.Img variant="top" src={workshop.imageUrl} alt={workshop.name} />
                <Card.Body>
                    <Card.Title>{workshop.name}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default WorkshopsListItem;