import axios from 'axios';
import React, { Component } from 'react';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ErrorText, Label, SignupCard, SignupContainer, Title, MobileLogoImage, DesktopLogoImage, LoginImage } from './styledComponents';

class Signup extends Component {
    state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      isSubmitting: false,
    };
  
    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value, errorMessage: '' });
    };
  
    handleSubmit = async (e) => {
      e.preventDefault();
      const { fullName, email, password, confirmPassword } = this.state;
  
      if (!fullName || !email || !password || !confirmPassword) {
        this.setState({ errorMessage: 'Please fill all fields.' });
        return;
      }
  
      if (password !== confirmPassword) {
        this.setState({ errorMessage: 'Passwords do not match.' });
        return;
      }
  
      try {
        this.setState({ isSubmitting: true });
  
        await axios.post('http://localhost:4000/api/auth/register', {
          fullName,
          email,
          password,
        });
  
        alert('Signup successful! Please login.');
        window.location.href = '/login'; // Redirect to login page
      } catch (error) {
        this.setState({
          errorMessage: error.response?.data?.message || 'Signup failed',
          isSubmitting: false,
        });
      }
    };
  
    render() {
      const { fullName, email, password, confirmPassword, errorMessage, isSubmitting } = this.state;
  
      return (
        <SignupContainer>
          <MobileLogoImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                    alt="website logo"
                  />
                  <LoginImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                    alt="website login"
                  />
          <SignupCard>
            <DesktopLogoImage
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                        alt="website logo"
                      />
            <Title>Create Account</Title>
            <form onSubmit={this.handleSubmit}>
                <Label htmlFor='fullname'>FULL NAME</Label>
              <Input
                id="fullname"
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={fullName}
                onChange={this.handleChange}
                style={{ marginBottom: '16px' }}
              />
              <Label htmlFor='email'>EMAIL</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={this.handleChange}
                style={{ marginBottom: '16px' }}
              />
              <Label htmlFor='password'>PASSWORD</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleChange}
                style={{ marginBottom: '16px' }}
              />
              <Label htmlFor='confirmpass'>CONFIRM PASSWORD</Label>
              <Input
                id="confirmpass"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                style={{ marginBottom: '16px' }}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{ marginTop: '24px', width: '100%' }}
              >
                {isSubmitting ? 'Signing up...' : 'Signup'}
              </Button>
  
              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
              <div style={{textAlign: 'center'}}>or <a href='/login' style={{color: '#0b69ff', textDecoration: 'none', fontSize: '16px', fontWeight: '600'}}>Login</a></div>
            </form>
          </SignupCard>
        </SignupContainer>
      );
    }
  }
  
  export default Signup