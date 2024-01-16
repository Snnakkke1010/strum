import React, {useEffect, useRef, useState} from "react";
import classes from './Cabinet.module.scss'
import {Link} from "react-router-dom";
import Header from "../Header/Header";
import IMAGE from './../../styles/images/user.png'
import GIF  from  './../../styles/images/waving-hand.png'
import {GoKebabHorizontal} from "react-icons/go";
import {FaHeart} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";
import PostComments from "../PostComments/PostComments";
import AddPost from "../AddPost/AddPost";

const Cabinet = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const handleModalToggle = () =>
        {setIsModalOpen(!isModalOpen);
    };

    const handleModalToggle2 = () =>
        {setIsModalOpen2(!isModalOpen2);
    };

    return (
      <div>
          <Header/>

          <div className={classes.container}>
             <div className={classes.wrapper}>
                 <div className={classes.card}>
                    <div className={classes.card__inner}>
                        <div className={classes.front}>
                            <img src={IMAGE}/>
                            <div className={classes.front__content}>
                                <h2>John Doe</h2>
                                <p>Guitar, Lviv</p>
                            </div>
                        </div>
                        <div className={classes.back}>
                            <img src={GIF}/>
                            <h1>John <span><br/>Doe</span></h1>
                            <h4>test@gmail.com</h4>
                            <p>Хочу знайти групу та грати там на гітарі, також можу і на бас гітарі, шукаю людей у львові чи в області</p>
                            <div className={classes.back__content}>
                                <div className={classes.back__col}>
                                    <h2>Guitar</h2>
                                    <p>Instrument</p>
                                </div>
                                <div className={classes.back__col}>
                                    <h2>Metal</h2>
                                    <p>Genre</p>
                                </div>
                                <div className={classes.back__col}>
                                    <h2>2 years</h2>
                                    <p>Experience</p>
                                </div>
                            </div>
                            <button>Text me</button>
                            <button>Edit</button>
                            <button className={classes.redbtn}>Logout</button>
                        </div>
                    </div>
                 </div>
                 <div className={classes.posts}>
                        <h1>User posts</h1>
                        <button className={classes.posts__button} onClick={handleModalToggle2}>Добавити пост</button>
                        <AddPost isOpen={isModalOpen2} onClose={handleModalToggle2} />
                        {/* Sample Post */}
                        <div className={classes.post}>
                            <div className={classes.post__header}>
                                <img src={IMAGE} alt="User Image"/>
                                <div className={classes.post__headerText}>
                                    <h3>John Doe</h3>
                                </div>
                            </div>
                            <span className={classes.post__time}>21.11.2023</span>
                            <p className={classes.post__content}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Fusce vel nisl vitae justo vehicula congue nec in erat.
                                Nulla facilisi.агфпшцрупшрцупрцу0рпцушрпппппппппугрпцщпрцуїп
                                цурпєцругпцупцупцу
                                рц
                                угпргцупрцугп
                                упурцпг
                            </p>
                            <div className={classes.post__footer}>
                                <button className={classes.post__likeButton}><FaHeart/></button>
                                <button className={classes.post__commentButton} onClick={handleModalToggle}><FaMessage/></button>
                                <PostComments isOpen={isModalOpen} onClose={handleModalToggle} />
                            </div>
                        </div>
                 </div>
             </div>
          </div>
      </div>
    )
}

export default Cabinet;