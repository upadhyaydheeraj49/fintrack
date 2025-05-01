import Cookies from 'js-cookie';
import { FaChartLine, FaMoneyBillWave, FaRobot, FaTachometerAlt, FaWallet } from 'react-icons/fa';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import fintracklogo from '../../assets/logo/fintracklogo.png';
import { AvatarContainer, BottomSidebarContainer, Logo, LogoutButton, Menu, MenuItem, SidebarContainer } from './styledComponents';

const Sidebar = () => {
    const navigate = useNavigate()
    const onLogout = () => {
        Cookies.remove('jwtToken')
        navigate('/')
    }
    const urlString = document.URL;
    const url = new URL(urlString);
    const path = url.pathname
    const activeTabItem = path.split('/')[1]
    //console.log(activeTabItem)


    return (
        
                    <SidebarContainer>
                        <Logo src={fintracklogo} alt="logo" />
                            <Menu>
                                <MenuItem as={Link} to="/dashboard" id="dashboard" activ={activeTabItem}><FaTachometerAlt /> Dashboard </MenuItem>
                                <MenuItem as={Link} to="/transactions" id="transactions" activ={activeTabItem}><FaMoneyBillWave /> Transactions</MenuItem>
                                <MenuItem as={Link} to="/budgets" id="budgets" activ={activeTabItem}><FaWallet /> Budgets</MenuItem>
                                <MenuItem as={Link} to="/analytics" id="analytics" activ={activeTabItem}><FaChartLine /> Analytics</MenuItem>
                                <MenuItem as={Link} to="/finance_ai" id="finance-ai" activ={activeTabItem}><FaRobot /> Finance AI</MenuItem>
                            </Menu>
                            <BottomSidebarContainer>
                                <AvatarContainer href='/user-profile'><RxAvatar style={{marginRight: '10px', fontSize: '22px', marginLeft: '10px'}} />Profile</AvatarContainer>
                                <LogoutButton onClick={onLogout}>Log Out <FaArrowRightFromBracket style={{marginLeft: '10px'}} /></LogoutButton>
                            </BottomSidebarContainer>
                    </SidebarContainer>
    
);
};

export default Sidebar;