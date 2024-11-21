import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category'
import { NavLink } from "react-router-dom";




const NavBar = ({navLinkList, hideNavList}) => {
    const [open, setOpen] = useState(false);

    return (
        <>

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                    
                    color="inherit"
                    size="large"
                    onClick={() => { setOpen(true) }}
                    >
                        <MenuIcon />
                        </IconButton>
                        <Typography 
                        sx= {{ flexGrow: 1}}
                        variant="h6" 
                        >
                        Categorias
                        </Typography>
                        {
                        navLinkList.map(item =>(
                            <Button 
                            component={NavLink}
                            to={item.path}
                            key={item.path}
                            color="inherit" 
                            
                            >
                                {item.tittle}{item.icon}</Button>
                        ))
                        }
                    
                </Toolbar>
            </AppBar>

            <Drawer
            open = {open}
            anchor="left"
            onClose ={()=> {setOpen(false)}}
            >
                <NavListDrawer 
                hideNavList={hideNavList}
                setOpen = {setOpen}
                />
            </Drawer>
        </>
    )
}

export default NavBar