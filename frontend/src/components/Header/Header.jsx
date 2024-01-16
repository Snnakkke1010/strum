import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { RiAlignJustify, RiCloseFill } from 'react-icons/ri'; // Import icons if not already imported
import classes from './Header.module.scss';
import { jwtDecode } from "jwt-decode";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);
    const id = jwtDecode(localStorage.getItem('token'));
    const menuToggleHandler = () => {
        setMenuOpen(prevState => !prevState);
    };

    return (
        <header className={classes.header}>
            <div className={classes.header__content}>
                <div className={classes.header__content__title}>
                        <h1>Strum</h1>

                </div>
                <nav
                    className={`${classes.header__content__nav} ${
                        menuOpen && size.width < 768 ? classes.isMenu : ""
                    }`}
                >
                    <ul className={classes.header__content__list}>
                        <li className={classes.header__content__item}>
                            <Link to="/vacancies" className={classes.header__content__link}>Вакансії</Link>
                        </li>
                        <li className={classes.header__content__item}>
                            <Link to="/direct" className={classes.header__content__link}>Повідомлення</Link>
                        </li>
                        <li className={classes.header__content__item}>
                            <Link to={`/profile/${id.nameid}`} className={classes.header__content__link}>Власний профіль</Link>
                        </li>
                    </ul>
                </nav>
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <RiAlignJustify onClick={menuToggleHandler} />
                    ) : (
                        <RiCloseFill onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
