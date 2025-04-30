import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import {BudgetContainer, Container, HeaderSection, Title, Subtitle, BudgetCard, BudgetDetails, BudgetTitle, BudgetAmount, BudgetCategory, Button, ModalBackground, ModalContent, Input, FormButton, SelectEl, OptionEl} from './styledComponents';
import Sidebar from '../../components/Sidebar'

class Budget extends Component {
  state = {
    budgets: [],
    showModal: false,
    title: '',
    amount: '',
    category: '',
    editingId: null,
    filterType: 'month',
  };
  
    componentDidMount() {
      this.fetchBudgets();
    }
  
    fetchBudgets = async () => {
      const token = Cookies.get('jwtToken');
      const {filterType} = this.state
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      try {
        const response = await axios.get(`http://localhost:4000/api/budgets?filterType=${filterType}`, { headers });
        // console.log(response)
        this.setState({ budgets: response.data });
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };
  
    openModal = (budget = null) => {
      if (budget) {
        this.setState({
          showModal: true,
          title: budget.title,
          amount: budget.amount,
          category: budget.category,
          editingId: budget.id,
        });
      } else {
        this.setState({
          showModal: true,
          title: '',
          amount: '',
          category: '',
          editingId: null,
        });
      }
    };
  
    closeModal = () => {
      this.setState({ showModal: false });
    };
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    handleSubmit = async () => {
      const { title, amount, category, editingId } = this.state;
      const token = Cookies.get('jwtToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const d = new Date()
      const month = d.getMonth()
      const year = d.getFullYear()
      const budgetData = { title, amount, category, month, year };
  
      try {
        if (editingId) {
          // Update Budget
          await axios.put(`http://localhost:4000/api/budgets/${editingId}`, budgetData, { headers });
        } else {
          // Add New Budget
          await axios.post('http://localhost:4000/api/budgets', budgetData, { headers });
        }
        this.fetchBudgets();
        this.closeModal();
      } catch (error) {
        console.error('Error saving budget:', error);
      }
    };
  
    handleDelete = async (id) => {
      const token = Cookies.get('jwtToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      try {
        await axios.delete(`http://localhost:4000/api/budgets/${id}`, { headers });
        this.fetchBudgets();
      } catch (error) {
        console.error('Error deleting budget:', error);
      }
    };

    updateFilterType = e => {
      // console.log(e.target.value)
      this.setState({filterType: e.target.value}, this.fetchBudgets)
  }
  
    render() {
      const { budgets, showModal, title, amount, category, filterType } = this.state;
  
      return (
        <BudgetContainer>
          <Sidebar />
        
        <Container>
          <HeaderSection>
            <div>
              <Title>Budgets</Title>
              <Subtitle>Track and manage your monthly spending limits.</Subtitle>
            </div>
            <Button onClick={() => this.openModal()}>+ New Budget</Button>
          </HeaderSection>
          <SelectEl onChange={this.updateFilterType} value={filterType}>
              <OptionEl value="week">Week</OptionEl>
              <OptionEl value="month">Month</OptionEl>
              <OptionEl value="year">Year</OptionEl>
          </SelectEl>
          {budgets.map(budget => (
            <BudgetCard key={budget.id}>
              <BudgetDetails>
                <BudgetTitle>{budget.title}</BudgetTitle>
                <BudgetAmount>₹{budget.amount}</BudgetAmount>
                <BudgetCategory>{budget.category}</BudgetCategory>
              </BudgetDetails>
              <div>
                <Button onClick={() => this.openModal(budget)}>Edit</Button>
                <Button onClick={() => this.handleDelete(budget.id)} style={{ backgroundColor: '#ef4444' }}>Delete</Button>
              </div>
            </BudgetCard>
          ))}
  
          {/* Modal */}
          <ModalBackground show={showModal}>
            <ModalContent>
              <h2>{this.state.editingId ? 'Edit Budget' : 'New Budget'}</h2>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={this.handleChange}
              />
              <Input
                type="number"
                name="amount"
                placeholder="Amount"
                value={amount}
                onChange={this.handleChange}
              />
              <Input
                type="text"
                name="category"
                placeholder="Category"
                value={category}
                onChange={this.handleChange}
              />
              <FormButton onClick={this.handleSubmit}>
                {this.state.editingId ? 'Update' : 'Add'}
              </FormButton>
              <FormButton onClick={this.closeModal} style={{ backgroundColor: '#64748b', marginTop: '10px' }}>
                Cancel
              </FormButton>
            </ModalContent>
          </ModalBackground>
  
        </Container>
        </BudgetContainer>
      );
    }
  }
  
  export default Budget