// UserProfileUpdate.jsx
import React, {useEffect, useState} from 'react';
import classes from './AddPost.module.scss';
import { useDispatch } from 'react-redux';
import { sendPost } from '../../features/post/postSlice';

const AddPost = ({ isOpen, onClose, userId }) => {
    const dispatch = useDispatch();
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

      
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get the input value
        const text = event.target.elements.text.value;

        dispatch(sendPost({ text: text, userId: userId }));
        // Close the modal
        onClose();
    };


      const modalClassName = `${classes.modal} ${isOpen ? classes.opened : classes.closed}`;

      return (
            isOpen && (
                <div className={modalClassName} onClick={handleOverlayClick}>
                    <div className={classes.modal}>
                        <div className={classes.modal__content}>
                            <h1>Створіть пост</h1>
                            <form onSubmit={handleSubmit}>
                            <div className={classes.form__input}>
                                <input type="text" name="text" required />
                                <label>Текст</label>
                            </div>
                            <button type="submit" className={classes.buttonStyle}>
                                Створити
                            </button>
                            </form>
                        </div>
                    </div>
                </div>

            )
        )
}
export default AddPost;
