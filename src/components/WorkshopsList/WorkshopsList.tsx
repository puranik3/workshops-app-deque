import { useState, useEffect } from 'react';
import { Spinner, Alert, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import WorkshopsListItem from './WorkshopsListItem/WorkshopsListItem';
import IWorkshop from '../../models/IWorkshop';
import { selectWLState } from '../../reducers/workshopsList';

import {
    fetching
} from '../../actions/creators';
 
const WorkshopsList = () => {
    const dispatch = useDispatch();

    const [ page, setPage ] = useState( 1 );
    const {
        workshops,
        error,
        loading
    } = useSelector( selectWLState );

    const previous = () => {
        setPage( ( p : number ) => p - 1 );
    };
    
    const next = () => {
        setPage( ( p : number ) => p + 1 );
    };

    useEffect(
        () => {
            dispatch( fetching( page ) as any );
        },
        [ page/*w, dispatch */ ]
    );

    return (
        <div className="my-4">
            <Button
                variant="primary"
                size="sm"
                className="me-2"
                onClick={previous}
            >
                Previous
            </Button>
            <Button
                variant="primary"
                size="sm"
                onClick={next}
            >
                Next
            </Button>
            <div>You are viewing page {page}</div>
            {
                loading && (
                    <div className="text-center">
                        <Spinner data-testid="loading-spinner" />
                    </div>
                )
            }
            {
                !loading && error && (
                    <Alert variant="danger">{error.message}</Alert>
                )
            }
            {
                !loading && !error && (
                    <Row xs={1} lg={3} xl={4}>
                        {
                            workshops.map(
                                workshop => (
                                    <Col className="d-flex my-3" key={workshop.id}>
                                        <WorkshopsListItem workshop={workshop} />
                                    </Col>
                                )
                            )
                        }
                    </Row>
                )
            }
        </div>
    );
}
 
export default WorkshopsList;