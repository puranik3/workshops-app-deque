import WorkshopsList from "./WorkshopsList";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';
import workshops from '../../mocks/data/workshops.json';
import { errorHandlers } from "../../mocks/handlers";
import server from '../../mocks/server';

describe( 'WorkshopsList on load', () => {
    test( 'should show a spinner', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <WorkshopsList />
                </BrowserRouter>
            </Provider>
        );

        // Use getBy*() and getAllBy*() methods when you expect element to be in the DOM right away
        const loadingMessage = screen.getByTestId( "loading-spinner" );
        expect( loadingMessage ).toBeInTheDocument();
    });

    test( 'should load and show workshop items', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <WorkshopsList />
                </BrowserRouter>
            </Provider>
        );

        for( let i = 0; i < 10; i++ ) {
            // Use findBy*() and findAllBy*() methods when you expect element to be in the DOM right away
            const workshopNameEl = await screen.findByText( workshops[i].name )
            expect( workshopNameEl ).toBeInTheDocument();
        }
    });

    test( 'should show an error message if initial load fails', async () => {
        // API call will succeed. we don't want that.
        server.use( ...errorHandlers );

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <WorkshopsList />
                </BrowserRouter>
            </Provider>
        );

        // second argument is the accessible name
        const errorAlert = await screen.findByRole( 'alert', /*{ name : }*/ );
        expect( errorAlert ).toBeInTheDocument();

        // Use queryBy*() when you expect the element NOT to be in the DOM currently
        const loadingMessage = screen.queryByTestId( "loading-spinner" );
        expect( loadingMessage ).not.toBeInTheDocument();
    });
});

describe( 'Pagination', () => {
    test( 'should show the next page of workshops when next button is clicked', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <WorkshopsList />
                </BrowserRouter>
            </Provider>
        );

        const nextButton = screen.getByRole( 'button', { name: /^Next$/ } );
        userEvent.click( nextButton );

        for( let i = 10; i < 12; i++ ) {
            const workshopNameEl = await screen.findByText( workshops[i].name )
            expect( workshopNameEl ).toBeInTheDocument();
        }
    });
    
    test( 'should show the previous page of workshops when previous button is clicked', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <WorkshopsList />
                </BrowserRouter>
            </Provider>
        );

        const nextButton = screen.getByRole( 'button', { name: /^Next$/ } );
        userEvent.click( nextButton );

        await screen.findByText( workshops[11].name );

        const previousButton = screen.getByRole( 'button', { name: /^Previous$/ } );
        userEvent.click( previousButton );

        for( let i = 0; i < 10; i++ ) {
            const workshopNameEl = await screen.findByText( workshops[i].name )
            expect( workshopNameEl ).toBeInTheDocument();
        }
    });
});

describe( 'Style tests', () => {
    test( 'workshop list item should have a box-shadow when hovered upon', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <WorkshopsList />
                </BrowserRouter>
            </Provider>
        );

        const workshopListItem = await screen.findByTestId( `workshop-${workshops[0].id}` );
        expect( workshopListItem ).toHaveClass( 'workshops-list-item' );
    });
});