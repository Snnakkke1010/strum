// UserProfileUpdate.jsx
import React, { useState } from 'react';
import classes from './UpdateProfile.module.scss';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const UserProfileUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editUserData, setEditUserData]= useState({
    genre: '',
    experience: '',
    instrument: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the userId from the decoded token
      const decoded = jwtDecode(localStorage.getItem('token'));
      const userId = decoded.nameid;
  
      // Include userId in the payload
      const updatedPayload = {
        userId,
        ...editUserData,
      };
  
      // Dispatch the updateUser action with the editUserData
      await dispatch(updateUser(updatedPayload));
  
      // Reset the form by clearing the editUserData state
      setEditUserData({
        ganre: '',
        expirience: '',
        instrument: '',
        description: '',
      });
  
      // Optionally, you can navigate to another page or perform other actions
      // Example: Redirect to the user profile page after successful update
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle the error, if needed
    }
  };


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Оновлення профіля</h2>
        <form onSubmit={handleFormSubmit} className={classes.form}>
          {/* <div className={classes.form__input}>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userProfile.lastName}
              onChange={handleInputChange}
              required
            />
            <label>Ім'я</label>
          </div>
          <div className={classes.form__input}>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userProfile.lastName}
              onChange={handleInputChange}
              required
            />
            <label>Прізвище</label>
          </div>
          <div className={classes.form__input}>
            <input
              type="email"
              id="email"
              name="email"
              value={editUserData.email}
              onChange={handleInputChange}
              required
            />
            <label>Пошта</label>
          </div> */}
          <div className={classes.form__input}>
            <input
              type="text"
              id="ganre"
              name="ganre"
              value={editUserData.ganre}
              onChange={handleInputChange}
            />
            <label>Жанр</label>
          </div>
          <div className={classes.form__input}>
            <input
              type="text"
              id="expirience"
              name="expirience"
              value={editUserData.expirience}
              onChange={handleInputChange}
            />
            <label>Досвід</label>
          </div>
          <div className={classes.form__input}>
            <input
              type="text"
              id="instrument"
              name="instrument"
              value={editUserData.instrument}
              onChange={handleInputChange}
            />
            <label>Інструмент</label>
          </div>
         {/* <div className={classes.form__input}>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={editUserData.lastName}
              onChange={handleInputChange}
              required
            />
            <label>Ваше місто</label>
          </div> */}
          <div className={classes.form__input}>
            <input
              type="text"
              id="description"
              name="description"
              value={editUserData.description}
              onChange={handleInputChange}
            />
            <label>Текст про вас</label>
          </div>
          <button type="submit" className={classes.form__button}>
            Обновити
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileUpdate;
