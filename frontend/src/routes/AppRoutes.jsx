import { Route, BrowserRouter, Routes} from 'react-router-dom';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Register from '../screens/Register';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home />} />
                <Route path='/login' element={ <Login />} />
                <Route path='/register' element={ <Register /> } />
            </Routes>
        
        </BrowserRouter>
    )
}

export default AppRoutes
