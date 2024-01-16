// UserProfileUpdate.jsx
import React, { useState } from 'react';
import classes from './UpdateProfile.module.scss';

const UserProfileUpdate = () => {
  const [userProfile, setUserProfile] = useState({
    lastName: '',
    email: '',
    genre: '',
    experience: '',
    instrument: '',
    description: '',
    userRegion: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update user profile with userProfile data
    console.log('Updating user profile:', userProfile);
    // Add your API call or state update logic here
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Оновлення профіля</h2>
        <form onSubmit={handleFormSubmit} className={classes.form}>
          <div className={classes.form__input}>
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
              value={userProfile.email}
              onChange={handleInputChange}
              required
            />
            <label>Пошта</label>
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
            <label>Жанр</label>
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
            <label>Досвід</label>
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
            <label>Інструмент</label>
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
            <label>Ваше місто</label>
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
