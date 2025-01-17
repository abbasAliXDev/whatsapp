import React, { useEffect, useState } from 'react';
import menuIcon from '../assets/menu.svg';
import newChatIcon from '../assets/newChat.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import Fuse from 'fuse.js';

const ContactBox = ({ setActiveUser }) => {
    const [usersData, setUserData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [value, setValue] = useState('');
    const [debouncedValue] = useDebounce(value, 300);
    const [isFocus, setIsFocus] = useState(false);
    const [activeCard, setActiveCard] = useState(0);

    // Fetch user data
    const fetchData = async () => {
        const api = 'https://dummyjson.com/users?limit=100';
        try {
            const res = await axios.get(api);
            if (res) {
                setOriginalData(res.data.users);
                setUserData(res.data.users);
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fuse = new Fuse(originalData, {
        keys: ['firstName', 'lastName'],
        threshold: 0.3,
    });

    const searchResult = () => {
        let filteredData = [...originalData];
        if (activeCard === 1) {
            filteredData = filteredData.filter((user) => user.isUnread); // Example condition for Unread
        } else if (activeCard === 2) {
            filteredData = filteredData.filter((user) => user.isFavourite); // Example condition for Favourites
        } else if (activeCard === 3) {
            filteredData = filteredData.filter((user) => user.isGroup); // Example condition for Groups
        }
        if (debouncedValue.trim()) {
            const results = fuse.search(debouncedValue.trim());
            filteredData = results.map((result) => result.item); // Fuzzy search results
        }

        setUserData(filteredData);
    };

    useEffect(() => {
        searchResult();
    }, [debouncedValue, activeCard]);

    return (
        <div className="contactBox">
            <div className="fixedSection">
                <div className="hdgContactBox">
                    <div>Chats</div>
                    <div className="iconDivHdgContactBox">
                        <span>
                            <img src={newChatIcon} alt="New Chat" />
                        </span>
                        <span>
                            <img src={menuIcon} alt="Menu" />
                        </span>
                    </div>
                </div>

                <div className="searchBox">
                    <div className={`${isFocus ? 'arrowActive' : 'searchIconActive'}`}>
                        {isFocus ? (
                            <span className="faArrowLeftIcon">
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </span>
                        ) : (
                            <span className="faSearchIcon">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        )}
                    </div>

                    <input
                        placeholder="Search"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                    />

                    {value && (
                        <span className="faXmarkIcon" onClick={() => setValue('')}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    )}
                </div>


                <div className="gridMsgType">
                    <div
                        onClick={() => setActiveCard(0)}
                        className={`${activeCard === 0 ? 'activeCard' : ''} cardMsgType`}
                    >
                        All
                    </div>
                    <div onClick={() => setActiveCard(1)} className={`${activeCard === 1 ? 'activeCard' : ''} cardMsgType`}>
                        Unread
                    </div>
                    <div
                        onClick={() => setActiveCard(2)}
                        className={`${activeCard === 2 ? 'activeCard' : ''} cardMsgType`}
                    >
                        Favourite
                    </div>
                    <div
                        onClick={() => setActiveCard(3)}
                        className={`${activeCard === 3 ? 'activeCard' : ''} cardMsgType`}
                    >
                        Group
                    </div>
                </div>
            </div>

            <div className="contactList">
                <div className="contactGrid">
                    {usersData.length > 0 ? (
                        usersData.map((data) => (
                            <div
                                onClick={() => setActiveUser((prev) => (prev === data.id ? null : data.id))}
                                key={data.id}
                                className="contactCard"
                            >
                                <img src={data.image} alt={data.id} />
                                <div className="cardDivPerson">
                                    <div className="nameOfPerson">
                                        {data.firstName} {data.lastName}
                                    </div>
                                    <div className="lastMsg">{data.university}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="emptyState">No users found. Try adjusting your search or filters.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactBox;
