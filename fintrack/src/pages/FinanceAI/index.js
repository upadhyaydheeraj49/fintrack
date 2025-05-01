import axios from 'axios';
import Cookies from 'js-cookie';
import { Component } from "react";
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoSend } from "react-icons/io5";

import Sidebar from "../../components/Sidebar";
import { BotReplyContainer, ChatBody, ChatboxContainer, ClientQueryContainer, Container, FinanceAIContainer, FinanceDescription, FormInput, Label, PrimaryButton, QueryInput, QueryInputContainer, RightContainer } from "./styledComponents";

let count = 2

class FinanceAI extends Component {
    state = {
        dataFetched: false,
        predictedData: '',
        query: '',
        year: '',
        month: '',
        salary: '',
        chatData: [{id: count, side: "bot", text: "Hello, How can i help you ?"}]
    }

    onChangeQuery = e => {
        this.setState({query: e.target.value})
    }

    onClickGetBudget = async e => {
        e.preventDefault()
        const {salary, year, month} = this.state

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        try {
            const aiResponse = await axios.post('https://fintrack-api2.onrender.com/predict', {
                salary, year, month
                }, {
                headers: {
                    "Content-Type": "application/json"
                }})
            const {predicted_expenses} = aiResponse.data
            this.setState({predictedData: Math.round(predicted_expenses)})
        } catch (error) {
            console.error('Failed to predict expense', error);
        }
        this.setState({
            dataFetched: true
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    };

    onSubmitQuery = async () => {
        this.setState(prevState => ({
            chatData: [...prevState.chatData, {id: count, side: "client", text: prevState.query}],
            query: ""
        }))
        count += 1
        const {query} = this.state
        try {
            const token = Cookies.get('jwtToken')
            const headers = {Authorization: `Bearer ${token}`}
            const res = await axios.post("http://localhost:4000/api/finance-ai/ask-ai", {question: query}, {headers})
            const {answer="I am sorry"} = res.data
            console.log(res)
            this.setState(prevState => ({
                chatData: [...prevState.chatData, {id: count, side: "bot", text: answer}],
                query: ""
            }))
            count += 1
        } catch (e) {
            this.setState(prevState => ({
                chatData: [...prevState.chatData, {id: count, side: "bot", text: "Something went wrong"}],
                query: ""
            }))
            count += 1
            console.log("Error while fetching answer",e)
        }
        
    }

    render() {
        const {dataFetched, query, chatData, predictedData, salary, year, month} = this.state

        return (
            <FinanceAIContainer>
                <Sidebar />
                <Container>
                    <h2 style={{color: '#002147', marginBottom: '0px'}}>Finance AI</h2>
                    <FinanceDescription>Get personalized financial insights and advice from your AI assistant. </FinanceDescription>
                    <ChatboxContainer>
                        <ChatBody>
                            { chatData.map(item => {
                                if (item.side === "bot") {
                                    return <BotReplyContainer key={item.id}>{item.text}</BotReplyContainer>
                                }
                                return <ClientQueryContainer key={item.id}>{item.text}</ClientQueryContainer>
                            })
                            }
                        </ChatBody>
                        <QueryInputContainer>
                            <QueryInput placeholder="Type your query here ..." value={query} onChange={this.onChangeQuery} />
                            <PrimaryButton onClick={this.onSubmitQuery}><IoSend /></PrimaryButton>
                        </QueryInputContainer>
                    </ChatboxContainer>
                </Container>
                <RightContainer>
                    <h3>Expense Predictor </h3>
                    <p style={{fontFamily:'Roboto', fontSize: '16px'}}>Easily get the upcomming months expenses in just three steps:</p>
                    <form style={{display: 'flex', flexDirection: 'column', padding: '10px', borderRadius: '10px', boxShadow: '0px 0px 5px 2px #8c8c8c'}} onSubmit={this.onClickGetBudget}>
                        <Label htmlFor='salary'>SALARY</Label>
                        <FormInput style={{border: '1px solid #000000'}} id="salary" placeholder='Your salary' name='salary' onChange={this.handleChange} value={salary} />
                        <Label htmlFor='year'>YEAR</Label>
                        <FormInput style={{border: '1px solid #000000'}} id="year" placeholder='Year' name='year' onChange={this.handleChange} value={year} />
                        <Label htmlFor='month'>MONTH</Label>
                        <FormInput style={{border: '1px solid #000000'}} id="month" placeholder='Month' name='month' onChange={this.handleChange} value={month} />
                        <PrimaryButton type='submit'>Get Expenses <FaArrowRightLong style={{marginLeft: '10px'}} /></PrimaryButton>
                        {dataFetched && <p style={{fontFamily: 'Roboto', fontWeight: '600'}}>Predicted Expenses: {predictedData}</p>}
                    </form>
                    
                    
                </RightContainer>
            </FinanceAIContainer>
        )
    }
}
export default FinanceAI