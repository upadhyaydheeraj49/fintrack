import { useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import React, { useState } from "react";
import { FaChartLine, FaRobot, FaTachometerAlt } from 'react-icons/fa';

function BottomBarMobile() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Navigate based on the tab
    if (newValue === 0) navigate("/dashboard");
    if (newValue === 1) navigate("/transactions");
    if (newValue === 2) navigate("/budgets");
    if (newValue === 3) navigate("/analytics");
    if (newValue === 4) navigate("/finance_ai");
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={handleChange}
      sx={{ position:'fixed', bottom: 0, left: 0, right: 0, boxShadow:'0 -2px 5px #0003', justifyContent: 'space-around', display: {xs: "flex", sm: "flex", md: "none"}, padding:'8px 0', "& .Mui-selected": { 
          color: "#1976d2", // Change color for selected tab
          transform: "translateY(-4px)", // Lift it up slightly
          fontWeight: "600",
          fontSize: "0.9rem",
          marginTop: '5px'
        }}}
    >
      <BottomNavigationAction label="Dashboard" icon={<FaTachometerAlt />} sx={{ fontSize: "1.2rem" }} />
      <BottomNavigationAction label="Transactions" icon={<AccountBalanceWalletIcon />} sx={{ fontSize: "1.2rem" }} />
      <BottomNavigationAction label="Budget" icon={<BarChartIcon />} sx={{ fontSize: "1.2rem" }} />
      <BottomNavigationAction label="Analytics" icon={<FaChartLine />} sx={{ fontSize: "1.2rem" }} />
      <BottomNavigationAction label="Finance AI" icon={<FaRobot />} sx={{ fontSize: "1.2rem" }} />
    </BottomNavigation>
  )
}

export default BottomBarMobile;
