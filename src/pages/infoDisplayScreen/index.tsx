import { Tab, Tabs } from "@mui/material"
import { useState } from "react"
import Imagenes from "./imagenes/Imagenes"
import Textos from "./textos/Textos"

const InfoDisplayScreen = () => {
  const [activeTab, setActiveTab] = useState(0)
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }
  return (
    <>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Reminder tabs">
          <Tab label={`Imágenes`} />
          <Tab label={`Textos`} />
        </Tabs>
        {activeTab === 0 && (<Imagenes/>)}
        {activeTab === 1 && (<Textos/>)}
    </>
  )
}

export default InfoDisplayScreen