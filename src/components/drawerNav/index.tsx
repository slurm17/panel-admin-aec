import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import { Box, List } from '@mui/material'
import imgNetter from '../../assets/logo_netter.png'
import DrawerItem from '../drawerItem'
import type { ListItemsNavData } from '../../types/ListItemsNavData'

interface DrawerNavProps {
  listItemsNav : ListItemsNavData[],
}
const drawerWidthMd = 190
const drawerWidthSm = 190
const DrawerNav = ({ listItemsNav/*, ...props*/ } : DrawerNavProps) => {
  return (
    <Drawer
        // {...props}
      sx={{
          display: { xs: 'none', sm: 'block' },
          width: { sm: drawerWidthSm, md: drawerWidthMd },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: { sm: drawerWidthSm, md: drawerWidthMd },
            boxSizing: 'border-box',
          },
        }}
      variant="permanent"
      anchor="left"
      >
      <Toolbar sx={{
        padding: '0px !important'
      }}>
        <Box 
          component={'img'}
          src={imgNetter} 
          alt="Logo Netter" 
          sx={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'contain',
            padding: 0
          }} 
      />
      </Toolbar>
      <Divider />
      <List>
        {listItemsNav.map((item, i) => (
          <DrawerItem
            key={i}
            text={item.text} 
            // icon={item.icon} 
            navigateTo={item.navigateTo} 
        />
      ))}
      </List>
    </Drawer>
  )
}

export default DrawerNav