import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import HomePage from './pages/HomePage/HomePage';
import WorkshopDetailsPage from './pages/WorkshopDetailsPage/WorkshopDetailsPage';
import WorkshopsListPage from './pages/WorkshopsListPage/WorkshopsListPage';

function App() {
    return (
      <div>
        <Menu />
        <Container className="my-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workshops" element={<WorkshopsListPage />} />
            <Route path="/workshops/:id/*" element={<WorkshopDetailsPage />} />
          </Routes>
        </Container>
      </div>
    );
}

export default App;