import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function Project() {

    const location = useLocation();
    console.log(location.state);

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);

    const user = [
        {id: 1, name: 'John1  jfklwhdasshknnkjnjpaw'},
        {id: 2, name: 'John2'},
        {id: 3, name: 'John3'},
        {id: 4, name: 'John1  jfklwhdassjkjhknnkjnjpaw'},
        {id: 5, name: 'John2'},
        {id: 6, name: 'John3'},
        {id: 7, name: 'John1  jfklwhdasshknnkjnjpaw'},
        {id: 8, name: 'John2'},
        {id: 10, name: 'John3'},
        {id: 11, name: 'John1  jfklwhdasshknnkjnjpaw'},
        {id: 22, name: 'John2'},
        {id: 33, name: 'John3'},
        {id: 12, name: 'John1  jfklwhdasshknnkjnjpaw'},
        {id: 54, name: 'John2'},
        
    ]
    
    const handleUserClick = (id) => {
        setSelectedUserId([...selectedUserId, id]);
    }
    
    
    return (
        <main className='h-screen w-screen flex'>
            <section className='left relative flex flex-col h-full min-w-96 bg-slate-300'>
                <header className='flex justify-between items-center p-2 px-4 w-full bg-slate-100'>
                    <button 
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        className='flex gap-1'
                    >
                        <i className='ri-add-fill mr-1'></i>
                        <p>Add Collaborator</p>
                    </button> 
                    
                    <button 
                        className='p-2'
                        onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                    >             
                        <i className="ri-group-line"></i>
                    </button>
                </header>

                <div className="conversation-area flex-grow flex flex-col">
                    
                    <div className="message-box p-1 flex-grow flex flex-col gap-1">
                        <div className="incoming message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                            <small className='opacity-65 text-xs'>test@gmail.com</small>
                            <p className='text-sm'>Hi, how are you?</p>
                        </div>
                        <div className="outgoing message ml-auto max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                            <small className='opacity-65 text-xs'>test@gmail.com</small>
                            <p className='text-sm'>Hi, how are you Lorem ipsum dolor sit amet.?</p>
                        </div>
                    </div>

                    <div className="inputField w-full flex ">
                        <input 
                            className='p-2 px-3 border-none outline-none flex-grow'
                            type='text' 
                            placeholder='Enter Message' 
                        />
                        <button className='px-5 bg-slate-900 text-white'>
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </div>

                <div className={`sidePanel flex flex-col gap-2 w-full h-full bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}> 
                    <header className='flex justify-end px-3 bg-slate-200'>
                        <button
                            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}    
                            className='p-2'
                        >
                            <i className='ri-close-line'></i>
                        </button>
                    </header>

                    <div className="users flex flex-col gap-2">
                        <div className="user cursor-pointer flex gap-2 items-center hover:bg-slate-200 p-2">
                            <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                <i className="ri-user-fill absolute"></i>
                            </div>

                            <h1 className='font-semibold text-lg'>
                                userName
                            </h1>

                        </div>
                    </div> 
                </div>
            </section>

            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-4 rounded-md w-95 max-w-full relative'>
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2'>
                                <i className='ri-close-fill'></i>
                            </button>
                        </header>
                        <div className='users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto'>
                            {user.map((user) => (
                                <div 
                                    key={user.id}
                                    onClick={() => handleUserClick(user.id)}
                                    className={`user cursor-pointer flex gap-2 items-center hover:bg-slate-200 ${selectedUserId.indexOf(user.id) != -1 ? 'bg-slate-200' : ''} p-2`}
                                >
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>

                                    <h1 className='font-semibold text-lg'>
                                        {user.name}
                                    </h1>
                                </div>
                            ))}
                        </div>
                        <button className='relative bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}

        </main>
    )
}

export default Project
