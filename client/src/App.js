import { BrowserRouter, Routes , Route } from 'react-router-dom';

import {Home} from './pages'
import './App.css';
import {LoginForm, RegisterForm} from "./modules";
import {useDispatch} from "react-redux";
import {userActions} from "./redux/actions";

const App = () => {
    const dispatch = useDispatch()

    userActions.fetchUserData(dispatch, localStorage.getItem('token'))

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginForm/>} exact/>
                    <Route path="/register" element={<RegisterForm/>} exact/>
                    <Route path="/im" element={<Home/>} exact/>
                    <Route path="*" element={<LoginForm/>} exact/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
