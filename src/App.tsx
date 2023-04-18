import 'normalize.css';
import './scss/global.scss';
import Header from './components/Header';
import PaginationBlock from './components/Pagination';
import Home from './pages/Home';

const App = () => (
  <div className="container">
    <Header />
    <Home />
    <PaginationBlock />
  </div>
);

export default App;
