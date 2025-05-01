import styled from "styled-components";

export const FinanceAIContainer = styled.div`
  max-width: 100vw;
  display: flex;
  @media screen and (width <= 768px) {
  flex-wrap: wrap;
}
`

export const Container = styled.div`
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 70vw;
  &&::-webkit-scrollbar {
            display: none;
}
@media screen and (width >= 768px){
  width: 60vw;}
`;

export const FinanceDescription = styled.p`
// color:rgba(232, 241, 250, 0.72);
font-size: 16px;
font-family: 'Roboto';
color: #2b2a2a;`

export const ChatboxContainer = styled.div`
background-color: #e6e6ff;
width: 80%;
height: 60vh;
border-radius: 10px;
padding: 20px;
display: flex;
flex-direction: column;
justify-content: center;
box-shadow: 0px 0px 5px 2px #9999ff`

export const RightContainer = styled.div`
width: 25%;
border-left: 1px solid #ffffff;
padding: 40px 10px;`

export const PrimaryButton = styled.button`
color: #E8F1FA;
background-color: #2277EC;
font-size: 15px;
font-family: 'Roboto';
padding: 8px 15px;
border: none;
border-radius: 5px;
outline: none;
align-self: flex-start;
display: flex;
align-items: center;
justify-content: space-between;
cursor: pointer;
`
export const ChatBody = styled.div`
width: 100%;
height: 100%;
overflow-y: auto;
&&::-webkit-scrollbar {
            display: none;
}
`

export const QueryInputContainer = styled.div`
border: 2px solid #2277EC;
border-radius: 10px;
padding: 2px;
display: flex;
justify-content: space-between;
align-items: center;
background-color: #ffffff;`

export const QueryInput = styled.input`
width: 80%;
padding: 8px 20px;
border: none;
outline: none;
border-radius: 10px;
`
export const BotReplyContainer = styled.div`
max-width: 70%;
background-color: #00004d;
padding: 10px;
border-radius: 10px;
border-bottom-right-radius: 0px;
color: #ffffff;
font-size: 16px;
font-family: 'Roboto';
margin: 8px 0px;
`
export const ClientQueryContainer = styled.div`
max-width: 70%;
background-color: #9999ff;
padding: 10px;
border-radius: 10px;
border-bottom-left-radius: 0px;
color: #ffffff;
font-size: 16px;
font-family: 'Roboto';
margin: 8px 0px;
margin-left: auto;
`
export const Label = styled.label`
  margin-bottom: 0px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #475569;`

export const FormInput = styled.input`
max-width: 100px;
padding: 8px 20px;
border: none;
outline: none;
border-radius: 10px;
margin-bottom: 20px;
`