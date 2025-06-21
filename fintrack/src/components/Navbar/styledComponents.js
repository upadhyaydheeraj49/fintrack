import styled from 'styled-components'

export const Nav = styled.nav`
max-width: 100%;
background-color: #0E3D64;
padding: 15px;
display: flex;
justify-content: space-between;
box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.32);
@media screen and (min-width: 900px) {
padding: 15px 10%;
}

`
export const NavLogo = styled.img`
width: 150px;`

export const NavItemsContainer = styled.ul`
list-style-type: none;
display: flex;
margin: 0px;
@media screen and (width <900px) {
    display: none;
}
`

export const NavItem = styled.li`
margin-right: 18px;
`
export const NavLink = styled.a`
text-decoration: none;
font-size: 15px;
font-family: 'Roboto';
color: #E8F1FA;
outline: none;`

export const LoginButton = styled.button`
color: #E8F1FA;
font-size: 14px;
background-color:rgb(24, 84, 134);
border: 1px solid #E8F1FA;
border-radius: 5px;
padding: 8px 15px;
outline: none;
cursor: pointer;
margin-right: 10px;
`
export const SignUpButton = styled(LoginButton)`
background-color: #2277ec;
border: none;
`