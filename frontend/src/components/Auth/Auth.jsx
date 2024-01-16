    import React, {useEffect, useState} from "react";
    import classes from './Auth.module.scss';
    import { Link, useNavigate } from "react-router-dom";
    import { useDispatch } from "react-redux";
    import { createUser, loginUser } from "../../features/user/userSlice";
import { jwtDecode } from "jwt-decode";

    const Auth = () => {
        const [isActive, setIsActive] = useState(false);

        const [email, setEmail] = useState('');
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const salt = 'string';
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const handleRegisterSubmit = async (event) => {
            event.preventDefault();
    
            const user = {
                firstName: username.split(' ')[0],
                lastName: username.split(' ')[1] || '',
                email: email,
                passwordHash: password,
                salt: salt
            };
    
            try {
                // Dispatch an action to register a new user
                await dispatch(createUser(user));
                handleRegisterClick();
                // After successful registration, navigate to the login page
                
            } catch (error) {
                console.error('Error during user registration:', error);
            }
        };
    
        const handleLoginSubmit = async (event) => {
            event.preventDefault();
    
            const user = {
                email: email,
                passwordHash: password,
            };
    
            try {
                dispatch(loginUser(user)).then((resultAction) => {
                    if (loginUser.fulfilled.match(resultAction)) {

                      const decoded = jwtDecode(localStorage.getItem('token')); 
                      console.log(decoded) ;
                      navigate(`/profile/${decoded.nameid}`); // де history - це об'єкт history з react-router-dom
                    } 
                  })
            } catch (error) {
                console.error('Error during user login:', error);
            }
        };

        const handleRegisterClick = () => {
            setIsActive(!isActive);
        };

        useEffect(() => {
            const wrapper = document.querySelector('.wrapper');
            const registerLink = document.querySelector('.register__link');
            const loginLink = document.querySelector('.login__link');

            if (wrapper && registerLink && loginLink) {
                registerLink.addEventListener('click', handleRegisterClick);
            }

            return () => {
                if (registerLink) {
                    registerLink.removeEventListener('click', handleRegisterClick);
                }
            };
        }, []);

        return (
            <div className={classes.container}>
            <div className={`${classes.wrapper} ${isActive ? classes.active : ''}`}>
                <span className={classes.animate}></span>
                <span className={classes.animate2}></span>
                <div className={`${classes.form} ${classes.login}`}>
                    <h2 className={classes.animation}>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <button type="submit" className={`${classes.form__button} ${classes.animation}`}>Login</button>
                        <div className={`${classes.form__logreg} ${classes.animation}`}>
                            <p>Don't have an account? <Link to="#" className={classes.register__link} onClick={handleRegisterClick}>Sign up</Link></p>
                        </div>
                    </form>
                </div>
                <div className={`${classes.content} ${classes.login} ${classes.animation}`}>
                    <h2>Welcome back</h2>
                    <p>We are glad to see you on our project! </p>
                </div>

                <div className={`${classes.form} ${classes.register} ${isActive ? classes.active : ''}`}>
                    <h2 className={classes.animation}>Sign up</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label>First Name</label>
                        </div>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input
                                type="text"
                                required
                            />
                            <label>Last Name</label>
                        </div>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <button type="submit" className={`${classes.form__button} ${classes.animation}`}>Sign Up</button>
                        <div className={`${classes.form__logreg} ${classes.animation}`}>
                            <p>Already have an account? <Link to="#" className={classes.login__link} onClick={handleRegisterClick}>Login</Link></p>
                        </div>
                    </form>
                </div>
                <div className={`${classes.content} ${classes.register} ${classes.animation}`}>
                    <h2>Join to as</h2>
                    <p>We are glad to see you on our project! </p>
                </div>
            </div>
        </div>
        );
    }

    export default Auth;
