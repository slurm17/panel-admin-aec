import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import DrawerNav from "../drawerNav"
import { listItemsNav } from "../../constants/listItemsNav"
import MyAppBar from "../appBar/MyAppBar"

const MainLayout = () => {
  return (
    <>
        <DrawerNav listItemsNav={listItemsNav}/>
        <div id='container-main'>
          <MyAppBar/>
          <Box component='main'>
              <Outlet/>
          </Box>
        </div>
    </>
  )
}

export default MainLayout