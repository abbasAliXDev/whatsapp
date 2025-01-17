import axios from 'axios';
import React, { useEffect, useState } from 'react';
import catelogIcon from '../assets/tool.svg';
import moreIcon from '../assets/menu.svg';
import plusIcon from '../assets/plus.svg';
import voiceIcon from '../assets/voice.svg';
import sendIcon from '../assets/sendIcon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIcons, faSearch } from '@fortawesome/free-solid-svg-icons';

const ChatBox = ({ activeUser }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [myMsg, setMyMsg] = useState([]);

    const handleAdd = (id) => {
        if (message.trim()) {
            // Create a new array to avoid mutating the state directly
            setMyMsg((prevMsgs) => {
                const existingMsg = prevMsgs.find((msg) => msg.id === id);
                if (existingMsg) {
                    return prevMsgs.map((msg) =>
                        msg.id === id
                            ? { ...msg, messages: [...msg.messages, message] }
                            : msg
                    );
                } else {
                    return [...prevMsgs, { id, messages: [message] }];
                }
            });
            setMessage(''); // Clear the message input after sending
        }
    };

    const fetchData = async () => {
        try {
            const api = 'https://dummyjson.com/users?limit=100';
            const res = await axios.get(api);
            if (res && res.data && res.data.users) {
                const foundUser = res.data.users.find((user) => user.id === activeUser);
                setUser(foundUser);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (activeUser) {
            fetchData();
        }
    }, [activeUser]);

    return (
        <>
            {activeUser ? (
                <>
                    {user ? (
                        <div className='mainChatDiv'>
                            <header className='mainHeader'>
                                <div>
                                    <img src={user.image} alt={user.id} />
                                    <div>{user.firstName}</div>
                                </div>
                                <div>
                                    <img src={catelogIcon} alt="catelogIcon" />
                                    <FontAwesomeIcon className='searchIcon' icon={faSearch} />
                                    <img src={moreIcon} alt="moreIcon" />
                                </div>
                            </header>

                            <div className="mainBoxChat">
                                {myMsg
                                    .filter((msg) => msg.id === activeUser)
                                    .map((msg, idx) => (
                                        <div key={idx} className='mainMsgDiv'>
                                            {msg.messages.map((message, index) => (
                                                <div key={index} className='msgDiv'>
                                                    {message}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                            </div>

                            <div className="chatBoxForUser">
                                <div><img src={plusIcon} alt="" /></div>
                                <div className='inputDivChatbox'>
                                    <div className='iconsOfChatEmoji'><FontAwesomeIcon icon={faIcons} /></div>
                                    <input
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder='Send Message ..'
                                        type="text"
                                    />
                                </div>
                                <div>
                                    {message.trim() ? (
                                        <img
                                            onClick={() => handleAdd(activeUser)}
                                            src={sendIcon}
                                            alt="sendIcon"
                                        />
                                    ) : (
                                        <img src={voiceIcon} alt="voiceIcon" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Loading user data...</div>
                    )}
                </>
            ) : (
                <div>No Active User</div>
            )}
        </>
    );
};

export default ChatBox;
