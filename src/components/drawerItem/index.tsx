// import { SvgIconComponent } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface DrawerItemProps {
    text: string
    // icon: SvgIconComponent,
    navigateTo: string
}

const DrawerItem = ({ text, /*icon: Icon,*/ navigateTo }: DrawerItemProps) => {
  const navigate = useNavigate()
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate(navigateTo)}>
          {/* <ListItemIcon>
            <Icon/>
          </ListItemIcon> */}
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </>
  )
}

export default DrawerItem