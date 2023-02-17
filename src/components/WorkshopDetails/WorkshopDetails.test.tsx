import WorkshopDetails from "./WorkshopDetails";
import { render, screen } from '@testing-library/react';
import workshops from '../../mocks/data/workshops.json';
import AllProviders from "../../test-utils/AllProviders";

describe( 'WorkshopsDetails page', () => {
    test( 'should show the details of the `current workshop` on load', async () => {
        render(
            <AllProviders url="/workshops/2" path="/workshops/:id/*">
                <WorkshopDetails />
            </AllProviders>
        );

        const workshopNameEl = await screen.findByText( workshops[1].name );
        expect( workshopNameEl ).toBeInTheDocument();
    })
});