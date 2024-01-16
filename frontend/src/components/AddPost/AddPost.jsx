// UserProfileUpdate.jsx
import React, {useEffect, useState} from 'react';
import classes from './AddPost.module.scss';

const AddPost = ({ isOpen, onClose }) => {

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto"; // Disable scrolling when modal is open
        return () => {
          document.body.style.overflow = "auto"; // Enable scrolling when modal is closed
        };
      }, [isOpen]);

      const handleOverlayClick = (event) => {
        // Check if the click happened on the overlay
        if (event.target.classList.contains(classes.modal)) {
          onClose(); // Close the modal only if clicked on the overlay
        }
      };

      const modalClassName = `${classes.modal} ${isOpen ? classes.opened : classes.closed}`;

      return (
            isOpen && (
                <div className={modalClassName} onClick={handleOverlayClick}>
                    <div className={classes.modal}>
                        <div className={classes.modal__content}>
                            <h1>Створіть пост</h1>
                            <form>
                                <div className={classes.form__input}>
                                    <input type="text" required/>
                                    <label>Текст</label>
                                </div>
                                <button className={classes.buttonStyle}>Створити</button>
                            </form>
                        </div>
                    </div>
                </div>

            )
        )
}
export default AddPost;
