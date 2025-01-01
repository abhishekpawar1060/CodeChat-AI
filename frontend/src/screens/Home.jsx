import { useContext, useState } from 'react';
import { UserContext } from '../context/user.context';  
import axios from '../config/axios';

function Home() {
    const { user } = useContext(UserContext);

    const [ isModalOpen, setIsModelOpen ] = useState(false);
    const [projectName, setProjectName] = useState(null);

    function createProject (e) {
        e.preventDefault();
        console.log(projectName);
        axios.post('/projects/create', 
            { 
                name: projectName 
            }).then((res) => {
                console.log(res);
                setIsModelOpen(false);
                
            }).catch((err) => {
                console.log(err);       
            })
    }

    return (
        <main className='p-4'>
            <div className='projects'>
                <button 
                    className='project p-4 border border-slate-300'
                    onClick={() => setIsModelOpen(true)}
                >
                    New Project<i className="ri-link ml-2"></i>
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-xl mb-4">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
                                    Project Name
                                </label>
                                <input
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName}
                                    type="text"
                                    id="projectName"
                                    name="projectName"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Create
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModelOpen(false)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Home
