import { Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react"
import PaseInvitado from "./PaseInvitado"
import PaseMantenimiento from "./PaseMantenimiento"
import PaseDiario from "./PaseDiario"
import PaseSocio from "./PaseSocio"
import { getConfig } from "../../api/config.api"

const Pases = () => {
    const [activeTab, setActiveTab] = useState(0)
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }
    const [vencHs, setVencHs] = useState<number>(8);

    useEffect(() => {
        getConfig().then((data) => setVencHs(
            data.venc_pase_hs
        ))
        .catch(() => console.error('Error al obtener la configuración.'))
        // .finally(() => setLoading(false))
    }, [])

return (
    <>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Reminder tabs">
          <Tab label={`Socio`} />
          <Tab label={`Diario`} />
          <Tab label={`Invitado`} />
          <Tab label={`Mantenimiento`} />
        </Tabs>
        {activeTab === 0 && (<PaseSocio vencHs={vencHs}/>)}
        {activeTab === 1 && (<PaseDiario vencHs={vencHs}/>)}
        {activeTab === 2 && (<PaseInvitado />)}
        {activeTab === 3 && (<PaseMantenimiento/>)}
    </>
  )
}

export default Pases