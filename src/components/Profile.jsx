import React from "react";

const ProfilePage = () => {
  return (
    <div className="profile-page">

      <div className="profile-info">
        <h2 className="username">backburner25!</h2>
        <p className="bio">Nagmahal nang wagas sa wala namang label.</p>
        <button className="edit-bio-button">Edit</button>
        <input type="password" className="password-input" placeholder="Password" />
        <button className="change-password-button">Change Password</button>
        <h3 className="watchlist-title">Watchlist:</h3>
        <ul className="watchlist">
          <li className="watchlist-item">BB</li>
          <li className="watchlist-item">BB</li>
        </ul>
        <button className="edit-watchlist-button">Edit</button>
        <button className="delete-watchlist-button">Delete</button>
      </div>
    </div>
  );    
};

export default ProfilePage;