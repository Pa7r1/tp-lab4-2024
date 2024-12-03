import {
  Box,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  ListItemButton,
  List,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { NavLink } from "react-router-dom";

const NavListDrawer = ({ hideNavList, setOpen }) => {
  return (
    <>
      <Box sx={{ width: 200 }}>
        <nav>
          <List>
            {hideNavList.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.tittle} </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </>
  );
};

export default NavListDrawer;
