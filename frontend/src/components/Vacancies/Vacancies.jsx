import React, {useEffect, useRef, useState} from "react";
import classes from './Vacancies.module.scss'
import {Link} from "react-router-dom";
import Header from "../Header/Header";
import IMAGE from './../../styles/images/user.png'
import GIF  from  './../../styles/images/waving-hand.png'
import {GoKebabHorizontal} from "react-icons/go";
import {FaHeart} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";
import PostComments from "../PostComments/PostComments";
import AddPost from "../AddPost/AddPost";
const Vacancies = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Sample user data
    const users = [
        {
            name: 'John Doe',
            region: 'Lviv',
            instrument: 'Guitar',
            style: 'Metal',
            post: {
                date: '21.11.2023',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel nisl vitae justo vehicula congue nec in erat. Nulla facilisi...',
            },
        },
        // Add more users as needed
    ];

    // Filter state
    const [selectedInstrument, setSelectedInstrument] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState(null);

    // Filter function
    const filterPosts = (user) => {
        if (!selectedInstrument && !selectedStyle) {
            return true;
        }

        const instrumentMatch = !selectedInstrument || user.instrument === selectedInstrument;
        const styleMatch = !selectedStyle || user.style === selectedStyle;

        return instrumentMatch && styleMatch;
    };

    return (
        <div>
            <Header />

            <div className={classes.container}>
                <div className={classes.wrapper}>
                    {/* Filter Panel */}
                    <div className={classes.filterPanel}>
                        <h2>Filter</h2>
                        <div>
                            <label>Instrument:</label>
                            <select onChange={(e) => setSelectedInstrument(e.target.value)}>
                                <option value="">All</option>
                                {/* Add instrument options based on your data */}
                                <option value="Guitar">Guitar</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div>
                            <label>Style:</label>
                            <select onChange={(e) => setSelectedStyle(e.target.value)}>
                                <option value="">All</option>
                                {/* Add style options based on your data */}
                                <option value="Metal">Metal</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                    </div>

                    {/* User Posts */}
                    <div className={classes.posts}>
                        <h1>User posts</h1>
                        {users.map((user, index) => (
                            <div key={index} className={classes.post} style={{ display: filterPosts(user) ? 'block' : 'none' }}>
                                <div className={classes.post__header}>
                                    <img src={IMAGE} alt="User Image" />
                                    <div className={classes.post__headerText}>
                                        <h3>{user.name}</h3>
                                            <div className={classes.wrapper2}>
                                                <p>{user.region}</p>
                                            <p>{user.instrument}</p>
                                            <p>{user.style}</p>
                                            </div>

                                    </div>
                                </div>
                                <span className={classes.post__time}>{user.post.date}</span>
                                <p className={classes.post__content}>{user.post.content}</p>
                                <div className={classes.post__footer}>
                                    <button className={classes.post__likeButton}>
                                        <FaHeart />
                                    </button>
                                    <button className={classes.post__commentButton} onClick={handleModalToggle}>
                                        <FaMessage />
                                    </button>
                                    <PostComments isOpen={isModalOpen} onClose={handleModalToggle} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vacancies;