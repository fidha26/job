import { AppBar, Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';

const Navadmin = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);

  };

  const DrawerList = (
    <Box sx={{ width: 250, color:"#00000000" }} role="presentation" onClick={toggleDrawer(false)}>
      <List sx={{backgroundColor:"#00000000"}}>
          <ListItem>
          <Link to='/admindash'>
            <ListItemButton> 
              <ListItemText primary="Dashboard" /><br/>
              </ListItemButton>
              </Link>
              </ListItem>
              <ListItem >
              <Link to='/fulluser'>
              <ListItemButton> 
              <ListItemText primary="Application List" /><br/>
              </ListItemButton>
              </Link>
              </ListItem>
              <ListItem >
              <Link to='/manjob'>
              <ListItemButton> 
              <ListItemText primary="Manage Job " />
            </ListItemButton>
            </Link>
          </ListItem><br/>
          <ListItem >
              <Link to='/'>
              <ListItemButton> 
              <ListItemText primary="Log out" />
            </ListItemButton>
            </Link>
          </ListItem>

      </List>
    </Box>
  );
  return (
    <div>
      <AppBar position='static' sx={{backgroundColor:"#00000000" }}>
              <Toolbar sx={{color:"#00000000" }}>
              <Button onClick={toggleDrawer(true)}><MenuIcon sx={{color:"black"}}/></Button>
              <Drawer open={open} onClose={toggleDrawer(false)} sx={{color:"#00000000"}}>
                {DrawerList}
               </Drawer>
              <Typography align='left' variant='h6' component="div" sx={{ flexGrow: 1,color:"black"}}>ADMIN DASHBOARD</Typography>
              </Toolbar>
          </AppBar>
    </div>
  )
}

export default Navadmin