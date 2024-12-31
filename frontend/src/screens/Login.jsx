import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();


    function submitHandler(e) {
        e.preventDefault();
        axios.post('/users/login', {
            email,
            password
        }).then((res) => {
            console.log(res.data);
            
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);

            navigate('/');       
        }).catch((err) => {
            console.log(err.response.data);
        });
    }

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                    <form 
                        onSubmit={submitHandler}
                        className="space-y-4"
                    >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder='Enter your email'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder='Enter your password'
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-600">
                        Don&apos;t have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
                    </p>
                </div>
            </div>
            
        </div>
    )
}

export default Login
