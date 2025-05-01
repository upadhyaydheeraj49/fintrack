import axios from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import errorView from '../../assets/images/error-view.png';
import globe from '../../assets/images/globe.png';
import Sidebar from '../../components/Sidebar';
import { BalanceCard, CategoryCard, ChartContainer, Container, DashboardContainer, FailureContainer, FailureImage, GlobeImage, Header, LoaderContainer, OptionEl, RightContainer, SelectEl, SummaryCard, SummaryCards, TopCategories, RightCard } from './styledComponents';
// Failure View Component
const FailureView = () => (
    <FailureContainer>
        <FailureImage src={errorView} alt="failure" />
        <h3>Oops! Something Went Wrong</h3>
        <p>We are having some trouble processing your request. Please try again.</p>
    </FailureContainer>
);

// Loader Component
const Loader = () => (
    <LoaderContainer>
        <Sidebar />
        <ThreeDots
            height="50"
            width="50"
            radius="9"
            color="#003366"
            ariaLabel="three-dots-loading"
            visible={true}
        />
    </LoaderContainer>
);

/*
const IconsObj = {
    'Education' : ''
}
*/

class Dashboard extends Component {
    state = {
        balance: 0,
        transactionCount: 0,
        totalSpent: 0,
        totalSavings: 0,
        categories: [],
        costsData: [],
        filterType: 'year',
        loading: true,
        error: false,
        userData: {
            fullName: '',
            email: ''
        }
    };

    componentDidMount() {
        this.fetchDashboardData();
    }

    updateFilterType = e => {
        // console.log(e.target.value)
        this.setState({filterType: e.target.value}, this.fetchDashboardData)
    }

    fetchDashboardData = async () => {
        this.setState({ loading: true, error: false });
        try {
            const {filterType} = this.state
            // console.log(filterType)
            const token = Cookies.get('jwtToken')
            const headers = {'Authorization': `Bearer ${token}`}
            // console.log(headers)
        const res = await axios.get(`http://localhost:4000/api/analytics/summary?filterType=${filterType}`, {headers});
        const userRes = await axios.get('http://localhost:4000/api/user/profile', {headers})
        
        const {fullName, email} = userRes.data
        // console.log("Here", fullName)
        const { balance=0, transactionCount, totalSpent, totalSavings, topCategories, costs } = res.data;

        const costsFormatted = costs.labels.map((month, idx) => ({
            month,
            received: costs.datasets[0].data[idx],
            expenses: costs.datasets[1].data[idx],
        }));

        this.setState({
            balance,
            transactionCount,
            totalSpent,
            totalSavings,
            categories: topCategories,
            costsData: costsFormatted,
            loading: false,
            userData: {
                fullName,
                email
            }
        });
        } catch (err) {
        console.error('Error fetching dashboard data', err);
        this.setState({ loading: false, error: true });
        }
    };

    renderDashboard = () => {
        const { balance, transactionCount, totalSpent, totalSavings, categories, costsData, filterType, userData } = this.state;
        const {fullName} = userData
        const firstName = fullName.split(' ')[0]

        return (
            <DashboardContainer>
                <Sidebar />
                <Container>
                    <Header>
                        <h2 style={{color: '#002147'}}>Dashboard</h2>
                    </Header>
                    <h2 style={{color: '#171f46'}}>Welcome, {firstName}</h2>
                    <BalanceCard>
                        <div style={{padding: '20px'}}>
                            <h2 style={{fontSize: '28px', color: '#6b6868', fontWeight: '500', margin: '0px'}}>Your balance:</h2>
                            <h1 style={{margin: '5px', color: '#171f46'}}>₹{balance.toLocaleString()}</h1>
                        </div>
                        <GlobeImage src={globe} alt="globe" />
                    </BalanceCard>
                    <SelectEl onChange={this.updateFilterType} value={filterType}>
                        <OptionEl value="week">Week</OptionEl>
                        <OptionEl value="month">Month</OptionEl>
                        <OptionEl value="year">Year</OptionEl>
                    </SelectEl>
                    <SummaryCards>
                        <SummaryCard>
                            <h4 style={{fontSize: '18px', fontWeight: '600'}}>Transactions</h4>
                            <p style={{fontSize: '16px', fontWeight: '600'}}>{transactionCount}</p>
                        </SummaryCard>
                        <SummaryCard>
                            <h4 style={{fontSize: '18px', fontWeight: '600'}}>Total Income</h4>
                            <p style={{fontSize: '16px', fontWeight: '600'}}>₹{totalSavings}</p>
                        </SummaryCard>
                        <SummaryCard>
                            <h4 style={{fontSize: '18px', fontWeight: '600'}}>Total Expenses</h4>
                            <p style={{fontSize: '16px', fontWeight: '600'}}>₹{totalSpent}</p>
                        </SummaryCard>
                        <SummaryCard>
                            <h4 style={{fontSize: '18px', fontWeight: '600'}}>Total Savings</h4>
                            <p style={{fontSize: '16px', fontWeight: '600'}}>₹{totalSavings - totalSpent}</p>
                        </SummaryCard>
                    </SummaryCards>
                    <h2 style={{margin: '5px', color: '#171f46', fontSize: '16px'}}>Top Categories</h2>
                    <TopCategories>
                        {categories.map((cat, index) => {
                            const {name} = cat
                            
                            
                            return (
                            <CategoryCard key={index}>
                            <h5 style={{fontSize: '18px', fontWeight: '600', margin: '0px'}}>{cat.name}</h5>
                            <p style={{fontSize: '16px', fontWeight: '600'}}>₹{cat.amount}</p>
                            </CategoryCard>
                        )})}
                    </TopCategories>

                    <ChartContainer>
                        <h2 style={{margin: '5px', color: '#171f46', fontSize: '16px'}}>Schedule of costs</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={costsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="received" fill="#171f46" />
                            <Bar dataKey="expenses" fill="#80bfff" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </Container>
                <RightContainer>
                    <RightCard>
                        <h2 style={{color: '#f2f2f2'}}>Visualize your finances</h2>
                        <p style={{color: '#f2f2f2'}}>On FinTrack you can easily visualize your finances through various graphs....</p>
                        <a style={{color: '#0000ff', textDecoration: 'none'}} href="/analytics">Visualize here</a>
                    </RightCard>
                </RightContainer>
        </DashboardContainer>
        );
    };

    render() {
        const { loading, error } = this.state;
        if (loading) return <Loader />;
        if (error) return <FailureView />;
        return this.renderDashboard();
    }
}

export default Dashboard;