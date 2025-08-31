import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'


const MyAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar sx={{
        // width: '100%',
      }} position="static" >
        <Toolbar>
          <Typography align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Panel de Control
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MyAppBar