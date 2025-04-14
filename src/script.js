import { createRoot} from 'react-dom/client';
// import Site from './components/Site';
import Desktop from './components/Desktop';
import data from "./data.yaml";

const desktop = document.getElementById('desktop');
createRoot(desktop).render(<Desktop data={ data } />);
