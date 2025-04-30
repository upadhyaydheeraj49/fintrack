import styled from 'styled-components';

export const TransactionContainer = styled.div`
width: 100vw;
display: flex;`

export const Container = styled.div`
padding: 2rem;
width: 70vw;
max-height: 100vh;
overflow-y: auto;
&::-webkit-scrollbar {
            display: none;
}
`;

export const Heading = styled.h2`
font-size: 1.5rem;
font-weight: 600;
margin-bottom: 1rem;
`;

export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 0.75rem;
margin-bottom: 2rem;
max-width: 400px;
`;

export const TransactionList = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
`;

export const TransactionCard = styled.div`
background: #ffffff;
padding: 1rem;
border-radius: 0.5rem;
box-shadow: 0 1px 4px rgba(0, 0, 0, 0.41);
display: flex;
justify-content: space-between;
align-items: center;
transition: background 0.2s;

&:hover {
    background: #f9f9f9;
}
`;

export const TransactionInfo = styled.div`
display: flex;
flex-direction: column;
`;

export const Amount = styled.p`
font-weight: 600;
color: ${(props) => (props.type === 'income' ? '#22c55e' : '#ef4444')};
margin-right: 20px;
`;