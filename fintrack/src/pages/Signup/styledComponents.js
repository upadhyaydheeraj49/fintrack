import styled from 'styled-components';

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 90%;
  max-width: 1110px;
  margin: auto;
  @media screen and (min-width: 992px) {
    flex-direction: row;
    justify-content: space-around;
}
`;

export const SignupCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 350px;
  @media screen and (min-width: 992px) {
    width: 350px;
    flex-shrink: 0;
    box-shadow: 0px 8px 40px rgba(7, 7, 7, 0.08);
    padding: 64px 48px 64px 48px;
}
`;

export const Title = styled.h2`
  margin-bottom: 24px;
  color: #1e293b;
  font-size: 28px;
  text-align: center;
`;

export const Label = styled.label`
margin-bottom: 0px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #475569;`


export const ErrorText = styled.p`
  align-self: start;
  font-size: 12px;
  margin-top: 3px;
  margin-bottom: 0px;
  font-family: 'Roboto';
  line-height: 16px;
  color: #ff0b37;
`;
export const MobileLogoImage = styled.img`
  width: 165px;
  margin-top: 50px;
  margin-bottom: 35px;
  @media screen and (min-width: 992px) {
    display: none;
}
`
export const DesktopLogoImage = styled.img`
width: 185px;
margin-bottom: 20px;
@media screen and (max-width: 991px) {
  display: none;
}
`
export const LoginImage = styled.img`
width: 278px;
@media screen and (min-width: 992px) {
    width: 60%;
    max-width: 524px;
    flex-shrink: 1;
    margin-right: 20px;
}
`