import React from "react";

const SidebarContext = React.createContext({
    activeTabItem: 'Dashboard',
    updateTabItem: () => {}
})

export default SidebarContext