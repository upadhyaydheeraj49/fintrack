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
      <div style={styles.mainContainer}>
      <div style={styles.container}>
        <h2>My Profile</h2>
        <img src='https://static.vecteezy.com/system/resources/previews/024/183/525/original/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg' alt="Avatar" style={styles.avatar} />
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <label style={styles.label}>Name</label>
          <input style={styles.input} type="text" name="name" value={name} onChange={this.handleChange} required />

          <label style={styles.label}>Email (read-only)</label>
          <input style={styles.input} type="email" value={email} disabled />

          <button style={styles.button} type="submit">Update Profile</button>
        </form>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      </div>
    );
  }
}

const styles = {
  mainContainer: {
    width: "100vw",
    height: "100vh",
    background: 'radial-gradient( #cce6ff, #ccddff, #ffffff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    width: '400px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#b3ccff',
    borderRadius: '12px',
    boxShadow: '0px 0px 10px #6699ff',
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center'
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
  },
  label: {
    color: '#001a4d',
    fontSize: '17px',
    fontFamily: 'Roboto'
  },
  input: {
    outline: 'none',
    border: '1px solid #001a4d',
    borderRadius: '8px',
    padding: '8px 10px',
    width: '300px'
  },
  button: {
    color: '#E8F1FA',
    backgroundColor: '#2277EC',
    fontSize: '15px',
    fontFamily: 'Roboto',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    outline: 'none',
    cursor: 'pointer',
    alignSelf: 'center'
  }
};

export default Profile;
