import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function Project() {

    const location = useLocation();
    console.log(location.state);

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    
    return (
        <main className='h-screen w-screen flex'>
            <section className='left relative flex flex-col h-full min-w-96 bg-slate-300'>
                <header className='flex justify-end p-2 px-4 w-full bg-slate-100'>
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
        </main>
    )
}

export default Project
