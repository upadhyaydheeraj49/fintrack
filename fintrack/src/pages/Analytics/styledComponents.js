import styled from 'styled-components';
import cardImage from '../../assets/images/cardImage.jpg';

export const AnalyticsContainer = styled.div`
  max-width: 100vw;
  display: flex;
`
export const Container = styled.div`
  padding: 20px;
  width: 70vw;
  height: 100vh;
  overflow-y: auto;
  &&::-webkit-scrollbar {
            display: none;
}
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const ChartSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const ChartCard = styled.div`
  flex: 1;
  min-width: 300px;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;
export const ChartSideContainer = styled.div`
@media screen and (width < 1285px) {
min-width: 100%;
}
display: flex;
flex-direction: column;
@media screen and (min-width: 1285px) {
width: 60%;
}`

export const Header = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20px;`
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
export const RightCard = styled.div`
width: 70%;
max-width: 500px;
max-height: 250px;
display: none;
background-image: url(${cardImage});
background-size: cover;
border-radius: 10px;
margin: 20px auto;
margin-top: 40px;
padding: 80px 40px;
@media screen and (min-width: 1285px) {
  display: block;
}
}`