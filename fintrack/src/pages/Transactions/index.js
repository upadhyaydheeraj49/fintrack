import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import {TransactionContainer, Amount, Container, Form, Heading, TransactionCard, TransactionInfo, TransactionList } from './styledComponents';
import Sidebar from '../../components/Sidebar'

class Transactions extends Component {
      state = {
        transactions: [],
        loading: false,
        addingOrUpdating: false,
        editingId: null,
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
  
    handleAddOrUpdateTransaction = async (e) => {
      e.preventDefault();
      this.setState({ addingOrUpdating: true });
      const { formData, editingId } = this.state;
      const token = Cookies.get('jwtToken')
        const headers = {Authorization: `Bearer ${token}`}
        // console.log(formData)
      try {
        if (editingId) {
          await axios.put(`http://localhost:4000/api/transactions/${editingId}`, formData,{headers});
        } else {
            // console.log("Here")
          await axios.post('http://localhost:4000/api/transactions', formData, {headers});
        }
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
        this.fetchTransactions();
      } catch (error) {
        console.error('Failed to delete transaction', error);
      }
    };
  
    render() {
      const { transactions, loading, formData, addingOrUpdating, editingId } = this.state;
  
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
          {/* Transactions */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
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
                      <Button variant="outline" size="small" onClick={() => this.handleEdit(transaction)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="small" onClick={() => this.handleDelete(transaction.id)}>
                        Delete
                      </Button>
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
        </TransactionContainer>
      );
    }
  }
  
  export default Transactions