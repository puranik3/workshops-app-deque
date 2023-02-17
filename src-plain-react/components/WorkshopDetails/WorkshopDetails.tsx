import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Spinner, Alert, Row, Col, Image } from 'react-bootstrap';
import IWorkshop from '../../models/IWorkshop';
import { getWorkshopById } from '../../services/workshops';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import SessionsList from '../SessionsList/SessionsList';
const AddSession = lazy( () => import( '../AddSession/AddSession' ) );

type Params = {
    id: string
}

const WorkshopDetails = () => {
    const { id } = useParams<Params>(); // { id: '2', action: 'edit' }

    const [ loading, setLoading ] = useState( true );
    const [ workshop, setWorkshop ] = useState<IWorkshop | null>( null );
    const [ error, setError ] = useState<Error | null>( null );

    useEffect(
        () => {
            const helper = async () => {
                try {
                    const data = await getWorkshopById( id as string );
                    setWorkshop( data );
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
                !loading && !error && workshop && (
                    <Row>
                        <h1>{workshop.name}</h1>
                        <hr />
                        <Col xs={12} lg={4}>
                            <Image src={workshop.imageUrl} fluid />
                        </Col>
                        <Col xs={12} lg={8}>
                            <Row xs={2} lg={4}>
                                <Col>
                                    <div>
                                        <small>
                                            <Moment format="DD MMM yyyy">{workshop.startDate}</Moment> - <Moment format="DD MMM yyyy">{workshop.endDate}</Moment>
                                        </small>
                                    </div>
                                    <div>
                                        <small>{workshop.time}</small>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <FontAwesomeIcon icon={workshop.modes.inPerson ? faCheckCircle : faTimesCircle} className="me-2" />
                                        In-person
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={workshop.modes.online ? faCheckCircle : faTimesCircle} className="me-2" />
                                        Online
                                    </div>
                                </Col>
                            </Row>
                            <Row className="my-3">
                                {/* React avoids script injection by setting text content. But if we are sure the string does not have script tags, we can ask React to set innerHTML this way */}
                                <Col dangerouslySetInnerHTML={ { __html: workshop.description } }></Col>
                            </Row>
                        </Col>
                    </Row>
                )
            }
            <div className="my-4">
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<SessionsList id={id as string} />} />
                        <Route path="/add" element={<AddSession id={id as string} />} />
                    </Routes>
                </Suspense>

                {/* <Suspense fallback={<Spinner />}>
                    <AddSession />
                </Suspense> */}
            </div>
        </div>
    );
}
 
export default WorkshopDetails;