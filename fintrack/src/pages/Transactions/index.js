import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { RiRobot2Fill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import Sidebar from '../../components/Sidebar';
import { AddWithAIButton, AddWithAIContainer, AddWithAIInput, Amount, Container, Form, Heading, TransactionCard, TransactionContainer, TransactionInfo, TransactionList, ButtonContainer } from './styledComponents';
import BottomBarMobile from '../../components/BottomBarMobile';

class Transactions extends Component {
      state = {
        transactions: [],
        loading: false,
        addingOrUpdating: false,
        editingId: null,
        addAIText: '',
        toastMessage: '',
        formData: {
          title: '',
          amount: '',
          date: '',
          category: '',
          type: 'expense',
        },
      }
  
    componentDidMount() {
      this.fetchTransactions();
    }
  
    fetchTransactions = async () => {
      this.setState({ loading: true });
      
      try {
        const token = Cookies.get('jwtToken')
        const headers = {Authorization: `Bearer ${token}`}
        const response = await axios.get('http://localhost:4000/api/transactions', {headers});
        // console.log(response)
        this.setState({ transactions: response.data });
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      } finally {
        this.setState({ loading: false });
      }
    };
  
    handleInputChange = (e) => {
      const { name, value } = e.target;
      this.setState((prevState) => ({
        formData: {
          ...prevState.formData,
          [name]: value,
        },
      }));
    };

    notify = () => {
      // console.log('called')
      const {toastMessage} = this.state
      setTimeout(() => {
        toast.success(toastMessage);
      }, 100);
    }
  
    handleAddOrUpdateTransaction = async (e) => {
      e.preventDefault();
      this.setState({ addingOrUpdating: true });
      const { formData, editingId } = this.state;
      const token = Cookies.get('jwtToken')
        const headers = {Authorization: `Bearer ${token}`}
        // console.log(formData)
        
        try {
        
          const res = await axios.get('http://localhost:4000/api/analytics/summary?filterType=year', {headers});
          const {balance = 0} = res.data
          const amount = parseInt(formData.amount)
          if (amount <= balance) {
            try {
        if (editingId) {
          await axios.put(`http://localhost:4000/api/transactions/${editingId}`, formData,{headers});
          this.setState({ toastMessage: 'Transaction updated successfully !' }, this.notify);
          
        } else {
            // console.log("Here")
          await axios.post('http://localhost:4000/api/transactions', formData, {headers});
          this.setState({ toastMessage: 'Transaction added successfully !' }, this.notify)
        }

        const amount = parseInt(formData.amount)
        this.checkIsSpendingMore(formData.category)
        this.setState({
          formData: { title: '', amount: '', date: '', category: '', type: 'expense' },
          editingId: null,
        });
        this.fetchTransactions();
      } catch (error) {
        console.error('Failed to submit transaction', error);
      } finally {
        this.setState({ addingOrUpdating: false });
      }
          }
          else {
            setTimeout(() => {
                  toast.error("Your balance is low !", 90000)
                }, 100);
          }
        }
        catch(e) {
          console.log("Error")
        }
        
      
    };

    handleEdit = (transaction) => {
      this.setState({
        editingId: transaction.id,
        formData: {
          title: transaction.title,
          amount: transaction.amount,
          date: transaction.date.slice(0, 10),
          category: transaction.category,
          type: transaction.type,
        },
      });
    };
  
    handleDelete = async (id) => {
      try {
        const token = Cookies.get('jwtToken')
        const headers = {Authorization: `Bearer ${token}`}
        
        await axios.delete(`http://localhost:4000/api/transactions/${id}`, {headers});
        this.setState({toastMessage: "Transaction deleted successfully !"}, this.notify)
        this.fetchTransactions();
      } catch (error) {
        console.error('Failed to delete transaction', error);
      }
    };

    checkIsSpendingMore = async (category) => {
      const token = Cookies.get('jwtToken');

      const analyticsData = await axios.get('http://localhost:4000/api/analytics/summary?filterType=year', { headers: { Authorization: `Bearer ${token}` } })
      const response = await axios.get('http://localhost:4000/api/budgets?filterType=month', { headers: { Authorization: `Bearer ${token}` } });
        const budgets = response.data
        
        const {categorySpend} = analyticsData.data
        const formattedData = Object.entries(categorySpend).map(([key, value]) => ({
          'category': key,
          'value': value
        }));
        
        const matchedBudget = budgets.find(budget => budget.category === category)
        console.log(category)
        
        if (matchedBudget !== undefined) {
          const spendingCategory = formattedData.find(item => item.category === category)
          const isSpendingMore = matchedBudget.amount < spendingCategory.value

          if (isSpendingMore) {
            setTimeout(() => {
              toast.warning("You are spending more than your budget !", 90000)
            }, 100);
          }
        }
        
        
    }

    addWithAI = async () => {
      const {addAIText} = this.state
      if (addAIText !== "") {
        const token = Cookies.get('jwtToken')
        const headers = {Authorization: `Bearer ${token}`}
        axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        try {
          const aiResponse = await axios.post('https://fintrack-api-ipi5.onrender.com/predict', {text: addAIText})
          // console.log(aiResponse.data)
          const {amount, category, title, type} = aiResponse.data

          const dateObj = new Date()
          const date = dateObj.toLocaleDateString('en-GB')

          // console.log(dateObj.getDate())
          const tData = {amount, category, title, type, date}
          // console.log(tData)
          await axios.post('http://localhost:4000/api/transactions', tData, {headers});
          this.fetchTransactions();
          this.setState({ toastMessage: 'Transaction added successfully !' , addAIText: ''}, this.notify)
        } catch (error) {
          console.error('Failed to categorize transaction', error);
      }
      }
  }

    updateAIInputTText = e => {
      this.setState({addAIText: e.target.value})
    }
  
    render() {
      const { transactions, loading, formData, addingOrUpdating, editingId, addAIText } = this.state;
  
      return (
        <TransactionContainer>
            <Sidebar />
        <Container>
          <Heading>Add/Edit Transactions</Heading>
  
          <Form onSubmit={this.handleAddOrUpdateTransaction}>
            <Input
              name="title"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={this.handleInputChange}
              required
            />
            <Input
              name="amount"
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={this.handleInputChange}
              required
            />
            <Input
              name="date"
              type="date"
              value={formData.date}
              onChange={this.handleInputChange}
              required
            />
            <Input
              name="category"
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={this.handleInputChange}
              required
            />
            <select
              name="type"
              value={formData.type}
              onChange={this.handleInputChange}
              style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
  
            <Button type="submit" disabled={addingOrUpdating}>
              {editingId ? 'Update Transaction' : 'Add Transaction'}
            </Button>
          </Form>
          <AddWithAIContainer>
            <AddWithAIInput placeholder='Enter your text' value={addAIText} onChange={this.updateAIInputTText} />
            <AddWithAIButton onClick={this.addWithAI}>Add With AI <RiRobot2Fill style={{fontSize: '25px'}} /></AddWithAIButton>
          </AddWithAIContainer>
            
          {/* Transactions */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
            <ToastContainer position="bottom-center" autoClose={3000} theme='colored' />
          <Heading>Recent Transactions</Heading>
            <TransactionList>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TransactionCard key={transaction.id}>
                    <TransactionInfo>
                      <h4>{transaction.title}</h4>
                      <small>{new Date(transaction.date).toLocaleDateString()} • {transaction.category}</small>
                    </TransactionInfo>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Amount type={transaction.type}>
                        {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                      </Amount>
                      <ButtonContainer>
                        <Button variant="outline" size="small" onClick={() => this.handleEdit(transaction)}>
                          Edit
                        </Button>
                        <Button variant="danger" size="small" onClick={() => this.handleDelete(transaction.id)}>
                          Delete
                        </Button>
                      </ButtonContainer>
                    </div>
                  </TransactionCard>
                ))
              ) : (
                <p>No transactions found.</p>
              )}
            </TransactionList>
            </>
          )}
        </Container>
        <BottomBarMobile/>
        </TransactionContainer>
      );
    }
  }
  
  export default Transactions