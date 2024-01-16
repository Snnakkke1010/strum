import React, {useEffect} from "react";
import classes from './PostComments.module.scss'
import IMAGE from "../../styles/images/user.png";
import {FaHeart, FaPlus} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";

const PostModal = ({ isOpen, onClose }) => {

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
        <div className={classes.modal__content}>
          <div className={classes.posts}>
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
                      цурпєцругпцупцупцу рц угпргцупрцугп упурцпг
                  </p>
                  <div className={classes.post__footer}>
                      <button className={classes.post__likeButton}><FaHeart/></button>
                  </div>
              </div>
              <hr className={classes.line}/>
              <form>
                  <div className={`${classes.form__input} ${classes.flexform}`}>
                     <div>
                         <input type="text" required/>
                         <label>Добавте коментар</label>
                     </div>
                     <div>
                         <button><FaPlus/></button>
                     </div>
                  </div>
              </form>

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
                      цурпєцругпцупцупцу рц угпргцупрцугп упурцпг
                  </p>
                  <div className={classes.post__footer}>
                      <button className={classes.post__likeButton}><FaHeart/></button>
                  </div>
              </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PostModal;
