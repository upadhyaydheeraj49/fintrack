import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from 'recharts';
import Sidebar from '../../components/Sidebar';
import { AnalyticsContainer, ChartCard, ChartSection, ChartSideContainer, Container, Header, OptionEl, RightCard, SelectEl, Title } from './styledComponents';

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#FF6666'];

  class Analytics extends Component {
    state = {
        monthlyTransactions: [],
        incomeExpenseData: [],
        categoryDistribution: [],
        filterType: 'year'
      }
  
    componentDidMount() {
      this.fetchAnalytics();
    }

    updateFilterType = e => {
      this.setState({filterType: e.target.value}, this.fetchAnalytics)
  }
  
    fetchAnalytics = async () => {
      const {filterType} = this.state
      // console.log(filterType)
      const token = Cookies.get('jwtToken')
      try {
        const [monthlyRes, incomeExpenseRes] = await Promise.all([
          axios.get('http://localhost:4000/api/analytics/monthly-count', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`http://localhost:4000/api/analytics/summary?filterType=${filterType}`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        // console.log(incomeExpenseRes.data.categorySpend)
        
        const {costs, categorySpend} = incomeExpenseRes.data
        const costsFormatted = costs.labels.map((month, idx) => ({
            month,
            received: costs.datasets[0].data[idx],
            expenses: costs.datasets[1].data[idx],
        }));

        const formattedData = Object.entries(categorySpend).map(([key, value]) => ({
          'category': key,
          'value': value
        }));
        // console.log(formattedData)

        this.setState({
          monthlyTransactions: monthlyRes.data,
          incomeExpenseData: costsFormatted,
          categoryDistribution: formattedData
        });
      } catch (error) {
        console.error('Error fetching analytics', error);
      }
    };
  
    render() {
      const { monthlyTransactions, incomeExpenseData, categoryDistribution, filterType } = this.state;
  
      return (
        <AnalyticsContainer>
            <Sidebar />
        <Container>
          <Header>
            <Title>Analytics</Title>
            <SelectEl onChange={this.updateFilterType} value={filterType}>
                <OptionEl value="week">Week</OptionEl>
                <OptionEl value="month">Month</OptionEl>
                <OptionEl value="year">Year</OptionEl>
            </SelectEl>
          </Header>
          
  
          <ChartSection>
            <ChartSideContainer>
              <ChartCard>
                <h3>Monthly Number of Transactions</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTransactions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
    
              <ChartCard>
                <h3>Income vs Expense</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={incomeExpenseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="2 2" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="received" fill="#171f46" />
                  <Bar dataKey="expenses" fill="#80bfff" />
                  </BarChart>
              </ResponsiveContainer>
                
              </ChartCard>
            </ChartSideContainer>
            <ChartCard>
              <h3>Spending Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <RightCard>
                        <h2 style={{color: '#f2f2f2'}}>Get Financial Advice</h2>
                        <p style={{color: '#f2f2f2'}}>On FinTrack, Finance AI can assist you to manage your financial records....</p>
                        <a style={{color: '#0066ff', textDecoration: 'none'}} href="/finance_ai">Get Advice</a>
                    </RightCard>
            </ChartCard>
          </ChartSection>
        </Container>
        </AnalyticsContainer>
      );
    }
  }
  
  export default Analytics