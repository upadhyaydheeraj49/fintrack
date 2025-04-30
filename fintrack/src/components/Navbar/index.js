import {useNavigate} from 'react-router-dom'
import { LoginButton, Nav, NavItem, NavLink, NavItemsContainer, NavLogo, SignUpButton } from './styledComponents'
import fintracklogo from '../../assets/logo/fintracklogo.png'

const Navbar = () => {
    const navigate = useNavigate()
    const redirectToLogin = () => {
        navigate('/login')
    }
    const redirectToSignUp = () => {
        navigate('/signup')
    }
    return (
        <Nav>
            <NavLogo src={fintracklogo} alt="logo"/>
            <NavItemsContainer>
                <NavItem><NavLink href="/dashboard">Dashboard</NavLink></NavItem>
                <NavItem><NavLink href="/transactions">Transactions</NavLink></NavItem>
                <NavItem><NavLink href='/budgets'>Budgets</NavLink></NavItem>
                <NavItem><NavLink href='finance-ai'>Finance AI</NavLink></NavItem>
            </NavItemsContainer>
            <div>
                <LoginButton onClick={redirectToLogin}>Login</LoginButton>
                <SignUpButton onClick={redirectToSignUp}>Sign Up</SignUpButton>
            </div>
            
        </Nav>
    )
}
export default Navbar
