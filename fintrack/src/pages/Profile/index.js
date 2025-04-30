// components/ProfilePage.jsx
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    loading: true,
    error: '',
    success: ''
  };

  componentDidMount() {
    const token = Cookies.get('jwtToken')
    axios.get('http://localhost:4000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const { fullName, email } = res.data;
      this.setState({ name:fullName, email, loading: false });
    })
    .catch(err => {
      this.setState({ error: 'Failed to fetch profile', loading: false });
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, success: '', error: '' });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    const token = Cookies.get('jwtToken')
    const formData = {fullName: name, email}

    try {
      await axios.put('http://localhost:4000/api/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      this.setState({ success: 'Profile updated successfully', error: '' });
    } catch (err) {
      this.setState({ error: 'Failed to update profile', success: '' });
    }
  };

  render() {
    const { name, email, loading, error, success } = this.state;

    if (loading) return <p>Loading profile...</p>;

    return (
      <div style={styles.container}>
        <h2>My Profile</h2>
       <img src='https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg' alt="Avatar" style={styles.avatar} />
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={this.handleChange} required />

          <label>Email (read-only)</label>
          <input type="email" value={email} disabled />

          <button type="submit">Update Profile</button>
        </form>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }
};

export default Profile;
