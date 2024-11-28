import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from "react-router-dom";
import { AuthRol, useAuth } from "../../Auth";



const NavBar = ({ navLinkList, hideNavList }) => {
    const [open, setOpen] = useState(false);
    const { AuthStatus } = useAuth();

    const navigate = useNavigate();


    return (

        <>  
        <AuthRol roles={["administrador","empleado"]}>
            
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
                                sx={{ flexGrow: 1 }}
                                variant="h6"
                            >
                                Administración
                            </Typography>
                            {
                                navLinkList.map(item => (
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
                </AuthRol>
                
            

            <AuthRol roles={["administrador"]}>
            <Drawer
                open={open}
                anchor="left"
                onClose={() => { setOpen(false) }}
            >
                <NavListDrawer
                    hideNavList={hideNavList}
                    setOpen={setOpen}
                />
            </Drawer>
            </AuthRol>
        </>
    )
}

export default NavBar