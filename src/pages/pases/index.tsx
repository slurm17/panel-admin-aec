import { Tab, Tabs } from "@mui/material"
import { useState } from "react"
import PaseInvitado from "./PaseInvitado"
import PaseMantenimiento from "./PaseMantenimiento"
import PaseDiario from "./PaseDiario"
import PaseSocio from "./PaseSocio"

const Pases = () => {
    const [activeTab, setActiveTab] = useState(0)
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

return (
    <>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Reminder tabs">
          <Tab label={`Socio`} />
          <Tab label={`Diario`} />
          <Tab label={`Invitado`} />
          <Tab label={`Mantenimiento`} />
        </Tabs>
        {activeTab === 0 && (<PaseSocio/>)}
        {activeTab === 1 && (<PaseDiario/>)}
        {activeTab === 2 && (<PaseInvitado/>)}
        {activeTab === 3 && (<PaseMantenimiento/>)}
    </>
  )
}

export default Pases