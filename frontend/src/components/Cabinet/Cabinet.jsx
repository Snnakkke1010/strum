import React, {useEffect, useRef, useState} from "react";
import classes from './Cabinet.module.scss'
import {Link, NavLink, useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import IMAGE from './../../styles/images/user.png'
import GIF  from  './../../styles/images/waving-hand.png'
import {GoKebabHorizontal} from "react-icons/go";
import {FaHeart} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";
import PostComments from "../PostComments/PostComments";
import AddPost from "../AddPost/AddPost";
import { jwtDecode } from "jwt-decode";
import { getUserById, logOut } from "../../features/user/userSlice";
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from "react-redux";
import { getPostsByUserId } from "../../features/post/postSlice";

const Cabinet = () => {
    const { isLoading, currentUser } = useSelector((state) => state.user);
    const {isLoad, list} = useSelector((state) => state.post);
    console.log(list);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleModalToggle = () =>
        {setIsModalOpen(!isModalOpen);
    };

    const handleModalToggle2 = () =>
        {setIsModalOpen2(!isModalOpen2);
    };
    const decoded = jwtDecode(localStorage.getItem('token'));
    const userId = decoded.nameid; 

    const handleLogout = () => {
        try {
          dispatch(logOut());
          navigate("/")
          window.location.reload();
        } catch (error) {
          console.error("Error during logout:", error);
          navigate("/")
        }
      };
      useEffect(() => {
        // Assuming there is a userId field in the token
        dispatch(getUserById(userId));
        dispatch(getPostsByUserId(userId));
      }, [dispatch]);


    return (
        <div>
        <Header />
        {isLoading && currentUser? (
          <div className={classes.loadingContainer}>
            <ReactLoading type="spokes" color="purple" height={50} width={50} />
          </div>
        ) : (
          <div className={classes.container}>
            <div className={classes.wrapper}>
              <div className={classes.card}>
                <div className={classes.card__inner}>
                  <div className={classes.front}>
                    <img src={IMAGE} alt="User Image" />
                    <div className={classes.front__content}>
                      <h2>{currentUser?.firstName || "No Name"}</h2>
                      <p>Guitar, Lviv</p>
                    </div>
                  </div>
                  <div className={classes.back}>
                    {currentUser ? (
                      <>
                        <img src={GIF} alt="GIF Image" />
                        <h1>
                          {currentUser.firstName}{" "}
                          <span>
                            <br /> {currentUser.lastName}
                          </span>
                        </h1>
                        <h4>{currentUser.email}</h4>
                        <p>{currentUser.description}</p>
                        <div className={classes.back__content}>
                          <div className={classes.back__col}>
                            <h2>{currentUser?.instrument}</h2>
                            <p>Instrument</p>
                          </div>
                          <div className={classes.back__col}>
                            <h2>{currentUser?.ganre}</h2>
                            <p>Genre</p>
                          </div>
                          <div className={classes.back__col}>
                            <h2>{currentUser?.expirience}</h2>
                            <p>Experience</p>
                          </div>
                        </div>
                        <button>Text me</button>
                        <button><NavLink to="update">Edit</NavLink></button>
                        <button
                          className={classes.redbtn}
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <p>No user data available</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={classes.posts}>
                <h1>User posts</h1>
                <button
                  className={classes.posts__button}
                  onClick={handleModalToggle2}
                >
                  Добавити пост
                </button>
                <AddPost isOpen={isModalOpen2} onClose={handleModalToggle2} userId={userId} />
                {[...list].reverse().map((post) => (
                <div key={post.id} className={classes.post}>
                  <div className={classes.post__header}>
                    <img src={IMAGE} alt="User Image" />
                    <div className={classes.post__headerText}>
                      <h3>{currentUser?.firstName || 'John Doe'}</h3>
                    </div>
                  </div>
                  <span className={classes.post__time}>{post.datePosted.slice(0,10)}</span>
                  <p className={classes.post__content}>
                    {post.text} {/* Render the post content */}
                  </p>
                  <div className={classes.post__footer}>
                    <button className={classes.post__likeButton}>
                      <FaHeart />
                    </button>
                    <button
                      className={classes.post__commentButton}
                      onClick={handleModalToggle}
                    >
                      <FaMessage />
                    </button>
                    
                    <PostComments isOpen={isModalOpen} onClose={handleModalToggle} />
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

export default Cabinet;