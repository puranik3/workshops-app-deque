import { Component } from 'react';
import { Spinner, Alert, Row, Col, Button } from 'react-bootstrap';
import WorkshopsListItem from './WorkshopsListItem/WorkshopsListItem';
import IWorkshop from '../../models/IWorkshop';
import { getWorkshops } from '../../services/workshops';

// ccc
interface Props {
    
}
 
interface State {
    loading: boolean,
    workshops: IWorkshop[],
    error: Error | null,
    page: number
}
 
class WorkshopsList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loading: true,
            workshops: [],
            error: null,
            page: 1
        };
    }

    previous = () => {
        this.setState({
            page: this.state.page - 1
        });
    }

    next = () => {
        this.setState({
            page: this.state.page + 1
        });
    }

    render() { 
        const { loading, error, workshops, page } = this.state;

        return (
            <div className="my-4">
                <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={this.previous}
                >
                    Previous
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={this.next}
                >
                    Next
                </Button>
                <div>You are viewing page {page}</div>
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

    // Called BEFORE props / state changes (when parent re-renders / state change is initaited using setState())
    // equivalent of React.memo() - we can check if the props/state that are used in the UI returned by render() changed (if they did then return true to render, else return false)
    shouldComponentUpdate(nextProps : Props, nextState : State) {
        console.log( 'scu' );
        
        return true; // true leads to render and cdm being called, false prevents it
    }

    async fetchWorkshops() {
        try {
            const data = await getWorkshops( this.state.page );
            this.setState({
                loading: false,
                workshops: data
            });
        } catch( error ) {
            this.setState({
                loading: false,
                error: error as Error,
                workshops: []
            });
        }
    }

    // runs ONLY AFTER first render (like providing [] in useEffect)
    async componentDidMount() {
        console.log( 'cdm' );
        this.fetchWorkshops();
    }

    // called AFTER any props / state changes
    componentDidUpdate(prevProps: Props, prevState: State) {
        console.log( 'cdu' );

        // make sure we fetch only if page changes (not if only some other states changes)
        if( prevState.page !== this.state.page ) {
            this.fetchWorkshops();
        }
    }

    componentWillUnmount() {
        console.log( 'cwu' )
    }
}
 
export default WorkshopsList;