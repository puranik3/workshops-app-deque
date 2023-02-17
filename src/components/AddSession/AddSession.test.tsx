import AddSession from "./AddSession";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AllProviders from "../../test-utils/AllProviders";
import ISession, { SessionLevel } from "../../models/ISession";

let sequenceIdInput : HTMLElement, nameInput : HTMLElement, durationInput : HTMLElement, speakerInput : HTMLElement, levelInput : HTMLElement, abstractInput : HTMLElement, submitButton : HTMLButtonElement;

const newSession = {
    sequenceId: 12,
    name: 'New session in React',
    speaker: 'John Doe',
    level: 'Basic' as SessionLevel,
    duration: 2.5,
    abstract: 'New session in React'
};

const setup = () => {
    render(
        <AllProviders url="/workshops/2/add" path="/workshops/:id/add">
            <AddSession id={2} />
        </AllProviders>
    );

    sequenceIdInput = screen.getByLabelText( /Sequence ID/i );
    nameInput = screen.getByLabelText( /Name/i );
    speakerInput = screen.getByLabelText( /Speaker/i );
    levelInput = screen.getByLabelText( /Level/i );
    durationInput = screen.getByLabelText( /Duration/i );
    abstractInput = screen.getByLabelText( /Abstract/i );

    submitButton = screen.getByRole( 'button', { name: /Add a session/i } );

    // may be this is not needed since we render in each test afresh...
    userEvent.clear( sequenceIdInput );
    userEvent.clear( nameInput );
    userEvent.clear( speakerInput );
    userEvent.selectOptions( levelInput, '' );
    userEvent.clear( durationInput );
    userEvent.clear( abstractInput );
};

const fillAndSubmit = ( session : Omit<ISession, 'id' | 'workshopId' | 'upvoteCount'> ) => {
    userEvent.type( sequenceIdInput, '' + session.sequenceId );
    userEvent.type( nameInput, session.name );
    userEvent.type( speakerInput, session.speaker );
    userEvent.selectOptions( levelInput, session.level );
    userEvent.type( durationInput, '' + session.duration );
    userEvent.type( abstractInput, session.abstract );

    userEvent.click( submitButton );
};

describe( 'AddSession form on submit (invalid inputs)', () => {
    test( 'should display error message when sequence ID input is a negative number', async () => {
        setup();

        fillAndSubmit({
            ...newSession,
            sequenceId: -1
        });

        const errorMessageEl = await screen.findByText( /Sequence ID should be minimum 1/i );
        expect( errorMessageEl ).toBeInTheDocument();
    } )

    test( 'should add a new session when all inputs are valid and the form is submitted', async () => {
        setup();

        fillAndSubmit( newSession );

        expect( screen.queryByText( /Sequence ID should be minimum 1/i ) ).not.toBeInTheDocument();
        // ...similarly we check if all other error messages DO NOT appear...
        
        const successMessageEl = await screen.findByText( /Session has been added and assigned id = 6/ );
        expect( successMessageEl ).toBeInTheDocument();
    });
});