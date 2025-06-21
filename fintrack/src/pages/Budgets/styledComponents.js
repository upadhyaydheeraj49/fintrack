import styled from 'styled-components';

export const BudgetContainer = styled.div`
  max-width: 100vw;
  display: flex;
`

export const Container = styled.div`
  padding: 30px;
  background-color: #f8f9fb;
  max-height: 100vh;
  width: 100%;
  @media screen and (width >899px) {
    width: 70vw;
  }
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: #1e293b;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #64748b;
  margin-top: 8px;
`;

export const BudgetCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  margin-top: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BudgetDetails = styled.div`
`;

export const BudgetTitle = styled.h2`
  font-size: 20px;
  color: #334155;
`;

export const BudgetAmount = styled.h3`
  font-size: 24px;
  color: #0f172a;
  margin: 10px 0;
`;

export const BudgetCategory = styled.p`
  font-size: 16px;
  color: #64748b;
`;
export const ButtonsContainer = styled.div`
display: flex;
flex-direction: column;
@media screen and (width >899px) {
    flex-direction: row;
}
`

export const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  margin: 5px 8px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
`;

export const FormButton = styled(Button)`
  width: 100%;
`;
export const SelectEl = styled.select`
padding: 10px 20px;
font-size: 20px;
font-family: 'Roboto';
font-weight: 600;
border: 2px solid #313332;
color: #313332;
border-radius: 10px;
align-self: flex-end;
`

export const OptionEl = styled.option`
  font-size: 16px;
`