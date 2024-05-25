import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      axios.get(`https://dummyjson.com/users/${id}`)
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError('An error occurred while fetching user data.');
          setLoading(false);
          console.error(error);
        });
    } else {
      setError('User ID not found.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="card">Loading...</div>;
  }

  if (error) {
    return <div className="card error">Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile of Current User</h2>
      {user && (
        <div className="grid-container">
          <div className="grid-item">
            <div className="card">
              <h3>User Information</h3>
              <p>Name: {user.firstName} {user.lastName}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
              <p>Gender: {user.gender}</p>
            </div>
          </div>
          <div className="grid-item">
            <div className="card">
              <h3>Additional Details</h3>
              <p>Height: {user.height} cm</p>
              <p>Weight: {user.weight} kg</p>
              <p>Eye Color: {user.eyeColor}</p>
              <p>Hair Color: {user.hair.color}</p>
            </div>
          </div>
          <div className="grid-item">
            <div className="card">
              <h3>Financial Information</h3>
              <p>Bank: {user.bank.cardType}</p>
              <p>Card Number: {user.bank.cardNumber}</p>
              <p>Currency: {user.bank.currency}</p>
            </div>
          </div>
          <div className="grid-item">
            <div className="card">
              <h3>Other Information</h3>
              <p>Blood Group: {user.bloodGroup}</p>
              <p>MAC Address: {user.macAddress}</p>
              <p>IP Address: {user.ip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
