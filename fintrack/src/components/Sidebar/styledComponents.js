import styled from 'styled-components';

export const SidebarContainer = styled.div`
min-width: 200px;
width: 30vw;
max-width: 250px;
background-color: #002147;
color: white;
height: 97vh;
display: flex;
flex-direction: column;
padding: 20px;
top: 0;
left: 0;
`;

export const Logo = styled.img`
width: 150px;
`;

export const Menu = styled.ul`
list-style: none;
padding: 0;
flex-grow: 1;
`;

export const MenuItem = styled.li`
color: #ffffff;
text-decoration: none;
display: flex;
align-items: center;
gap: 15px;
font-size: 18px;
padding: 12px 0;
cursor: pointer;
background-color: ${props => props.activ === props.id ? '#003366' : 'transparent'};
border-radius: 8px;
padding-left: 10px;
`
export const BottomSidebarContainer = styled.div`
height: 100px;
border-top: 1px solid #ffffff;
`
export const LogoutButton = styled.button`
color: #E8F1FA;
background: none;
font-size: 15px;
font-family: 'Roboto';
padding: 8px 15px;
border: none;
outline: none;
align-self: flex-start;
display: flex;
align-items: center;
justify-content: space-between;
cursor: pointer;
margin-top: 10px;
`
export const AvatarContainer = styled.a`
font-size: 17px;
font-family: 'Roboto';
margin-top: 20px;
display: flex;
align-items: center;
text-decoration: none;
color: #ffffff;
`