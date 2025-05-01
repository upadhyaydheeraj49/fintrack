import { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import SidebarContext from './context/SidebarContext.js';

import ProtectedRoute from './components/ProtectedRoute/index.js';
import Analytics from './pages/Analytics/index.js';
import Budgets from './pages/Budgets/index.js';
import Dashboard from './pages/Dashboard';
import FinanceAI from './pages/FinanceAI/index.js';
import Home from './pages/Home';
import Login from './pages/Login/index.js';
import NotFound from './pages/NotFound/index.js';
import Profile from './pages/Profile/index.js';
import Signup from './pages/Signup/index.js';
import Transactions from './pages/Transactions/index.js';

class App extends Component {
  state ={
    activeTabItem: 'Dashboard'
  }

  updateTabItem = (e) => {
    const {id} = e.target
    // console.log('Here', id)
    this.setState({activeTabItem: id})
  }

  render() {
    const {activeTabItem} = this.state
    return (
      <SidebarContext.Provider value={{activeTabItem, updateTabItem: this.updateTabItem}}>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route exact path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route exact path='/budgets' element={<ProtectedRoute><Budgets /></ProtectedRoute>} />
          <Route exact path='/analytics' element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route exact path='/user-profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/finance_ai" element={<ProtectedRoute><FinanceAI /></ProtectedRoute>} />
          <Route exact path="/not-found" element={<NotFound />} />
          <Route path='*' element={<Navigate replace to="/not-found" />} />
        </Routes>
      </SidebarContext.Provider>
  )
  }
  
}

export default App
