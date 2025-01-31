import React, { useEffect, useState, useContext } from 'react'
import { data, useLocation } from 'react-router-dom';
import axios from '../config/axios';
import { intializeSocket, receiveMessage, sendMessage } from '../config/socket';
import {UserContext} from '../context/user.context';
import Markdown from 'markdown-to-jsx';

function Project() {

    const location = useLocation();
    // console.log(location.state);

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [project, setProject] = useState(location.state.project);

    const [messages, setMessages] = useState([]);
    const messageBox = React.createRef();

    const { user } = useContext(UserContext);

    const handleUserClick = (id) => {
        setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            if(newSelectedUserId.has(id)){
                newSelectedUserId.delete(id);
            }else{
                newSelectedUserId.add(id);
            }            
            return newSelectedUserId;
        });
    }

    // console.log("ADD",messages[1].message);
    


    function addCollaborators(){
        axios.put('/projects/add-user', {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then((res) => {
            console.log(res.data);
            setIsModalOpen(false);
        }).catch((err) => {
            console.log(err);
        })   
    }


    const send = () => {
        // e.stopPropagation()
        // e.preventDefault();
        // console.log(user);
        
        sendMessage('project-message',{
            message,
            sender: user,
        })

        setMessages(prevMessages => [...prevMessages, {sender: user, message }]);
        setMessage("");
    }

    useEffect(() => {

        intializeSocket(project._id);

        receiveMessage('project-message', data => {
            console.log(data);
            setMessages(prevMessages => [...prevMessages, data]);
            
        });
        
        axios.get(`/projects/get-project/${location.state.project._id}`).then((res) => {
            setProject(res.data.project);
            console.log("Project",project);
        }).catch((err) => {
            console.log(err);
        })


        axios.get('/users/all').then((res) => {
            setUsers(res.data.users);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    

    function scrollToBottom() {
        if (messageBox.current) {
            messageBox.current.scrollTop = messageBox.current.scrollHeight;
        }
    }

    return (
        <main className='h-screen w-screen flex'>
            <section className='left relative flex flex-col h-screen min-w-96 bg-slate-300'>
                <header className='flex justify-between items-center p-2 px-4 w-full bg-slate-100 top-0 absolute'>
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

                <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
                    <div 
                        ref={messageBox} 
                        className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide"
                    >  
                        {messages.map((msg, idx) => (
                            // console.log("MSG", msg.sender.email);
                            
                            <div key={idx} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'ml-auto max-w-54'} ${msg.sender._id == user._id.toString() && 'ml-auto'} message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
                                <small className='opacity-65 text-xs'>{msg.sender.email}</small>
                                <p className='text-sm'>
                                    {msg.sender._id == 'ai' ? 
                                    <div className='overflow-auto bg-slate-900 text-white rounded-md p-2'>
                                        <Markdown>{msg.message}</Markdown> 
                                    </div>
                                     : msg.message}
                                </p>
                            </div>
                        ) )}                 
                    </div>

                    <div className="inputField w-full flex absolute bottom-0">
                        <input 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='p-2 px-3 border-none outline-none flex-grow'
                            type='text' 
                            placeholder='Enter Message' 
                        />
                        <button 
                            onClick={send}
                            className='px-5 bg-slate-900 text-white'
                        >
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </div>

                <div className={`sidePanel flex flex-col gap-2 w-full h-full bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}> 
                    <header className='flex justify-between items-center px-4 bg-slate-200'>
                        <h1 className='font-semibold text-lg'>Collaborators</h1>
                        <button
                            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}    
                            className='p-2'
                        >
                            <i className='ri-close-line text-xl text-red-500 hover:bg-red-300'></i>
                        </button>
                    </header>

                    <div className="users flex flex-col gap-2">
                        {project.users && project.users.map((user) => {
                            return (
                                <div key={user._id} className="user cursor-pointer flex gap-2 items-center hover:bg-slate-200 p-2">
                                    <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>
                                        {user.email}
                                    </h1>
                                </div>
                            );
                        })}
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
                            {users.map((user) => (
                                <div 
                                    key={user._id}
                                    onClick={() => handleUserClick(user._id)}
                                    className={`user cursor-pointer flex gap-2 items-center hover:bg-slate-300 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-400' : ''} p-2`}
                                >
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>

                                    <h1 className='font-semibold text-lg'>
                                        {user.email}
                                    </h1>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addCollaborators}
                            className='relative bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded-md'
                        >
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}

        </main>
    )
}

export default Project
