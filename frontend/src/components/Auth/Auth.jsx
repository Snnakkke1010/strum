    import React, {useEffect, useState} from "react";
    import classes from './Auth.module.scss';
    import { Link } from "react-router-dom";

    const Auth = () => {
        const [isActive, setIsActive] = useState(false);

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
                    <form>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input type="email" required/>
                            <label>Email</label>
                        </div>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input type="password" required/>
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
                    <form>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input type="text" required/>
                            <label>First Name</label>
                        </div>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input type="text" required/>
                            <label>Last Name</label>
                        </div>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input type="email" required/>
                            <label>Email</label>
                        </div>
                        <div className={`${classes.form__input} ${classes.animation}`}>
                            <input type="password" required/>
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
