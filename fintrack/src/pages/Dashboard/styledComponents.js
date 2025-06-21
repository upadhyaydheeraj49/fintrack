import styled from "styled-components";
import globe2 from '../../assets/images/globe2.png';

export const DashboardContainer = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  @media screen and (width > 899px) {
    flex-direction: row;
  }
`

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 90vw;
  &&::-webkit-scrollbar {
            display: none;
}
@media screen and (width > 899px) {
    width: 70vw;
    height: 100vh;
  };
`
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoutButton = styled.button`
`

export const BalanceCard = styled.div`
  background: linear-gradient(135deg, #cfe9f3 0%, #e0f7fa 100%);
  padding: 0px;
  border-radius: 10px;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 5px 2px #1c5c97;
`;

export const GlobeImage = styled.img`
width: 15%;
`
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

export const SummaryCards = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 10px 0px;
  padding: 10px 0px;
  flex-wrap: wrap;
`;

export const SummaryCard = styled.div`
  min-width: 100px;
  max-width: 200px;
  background: #E8F1FA;
  flex: 1;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #1c5c97;
  text-align: center;
`;

export const TopCategories = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  max-width: 100%;
  flex-wrap: wrap;
`;

export const CategoryCard = styled.div`
  background:rgb(229, 243, 233);
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #ccc;
  flex: 1;
  text-align: center;
  min-width: 100px;
  max-width: 150px;
  min-height: 70px;
  box-shadow: 0px 0px 5px #4d971c;
`;

export const ChartContainer = styled.div`
  margin-top: 30px;
  background: #fff;
  border-radius: 10px;
  width: 100%;
`;

export const LoaderContainer = styled.div`
  display: flex;
  height: 90vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #334155;
`;

export const FailureImage = styled.img`
  width: 250px;
  margin-bottom: 20px;
`;

export const RightContainer = styled.div`
width: 100%;
@media screen and (width > 899px) {
    width: 25%;
    padding-top: 40px;
  }
border-left: 1px solid #ffffff;
display: none;
@media screen and (width > 90px) {
display: flex;
flex-direction: column;
justify-content: flex-end;`

export const RightCard = styled.div`
width: 70%;
max-width: 500px;
height: 250px;
background-image: url(${globe2});
background-size: cover;
border-radius: 10px;
margin: 20px auto;
padding: 80px 40px;
}`
export const ErrorText = styled.p`
  align-self: start;
  font-size: 12px;
  margin-top: 3px;
  margin-bottom: 0px;
  font-family: 'Roboto';
  line-height: 16px;
  color: #ff0b37;
`;
