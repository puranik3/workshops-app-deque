import { ReactNode } from 'react';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../store';

type Props = {
    children: ReactNode,
    url: string,
    path: string
}

const AllProviders = ( { children , url, path } : Props ) => {
    // initialEntries sets up the router history (like browser history) - we have configured it with only 1 page (the current page) in history.
    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={[ url ]}>
                <Routes>
                    <Route path={path} element={children} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
};

export default AllProviders;