import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import {Navigate} from 'react-router-dom'

// import fintracklogo from '../../assets/logo/fintracklogo.png';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ErrorText, Label, LoginCard, LoginContainer, LoginImage, MobileLogoImage, DesktopLogoImage } from './styledComponents';

class Login extends Component {
    state = {
      email: '',
      password: '',
      errorMessage: '',
      isSubmitting: false,
    };
  
    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value, errorMessage: '' });
    };
  
    handleSubmit = async (e) => {
      e.preventDefault();
      const { email, password } = this.state;
  
      if (email === '' || password === '') {
        this.setState({ errorMessage: 'Please fill all fields.' });
        return;
      }
  
      try {
        this.setState({ isSubmitting: true });
  
        const response = await axios.post('http://localhost:4000/api/auth/login', {
          email,
          password,
        });
  
        const { token } = response.data;
        console.log(token)
        Cookies.set('jwtToken', token, {expires: 1})
  
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        this.setState({
          errorMessage: error.response?.data?.message || 'Login failed',
          isSubmitting: false,
        });
      }
    };
  
    render() {
      const { email, password, errorMessage, isSubmitting } = this.state;
      const token = Cookies.get('jwtToken')
      if (token !== undefined) {
        return <Navigate to="/dashboard" />
      }
      return (
        <LoginContainer>
          <MobileLogoImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
        />
        <LoginImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
        />
          <LoginCard>
          <DesktopLogoImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
            <form onSubmit={this.handleSubmit}>
                <Label htmlFor='email'>EMAIL</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={this.handleChange}
                style={{ marginBottom: '15px' }}
              />
              <Label htmlFor='password'>PASSWORD</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleChange}
                style={{ marginTop: '5px' }}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{ marginTop: '24px', width: '100%' }}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
  
              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
              <div style={{textAlign: 'center'}}>or <a href='/signup' style={{color: '#0b69ff', textDecoration: 'none', fontSize: '16px', fontWeight: '600'}}>Signup</a></div>
            </form>
          </LoginCard>
        </LoginContainer>
      )
    }
  }
  
  export default Login