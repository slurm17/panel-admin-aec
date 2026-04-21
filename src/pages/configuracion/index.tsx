import { Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import General from './general'
import Impresoras from './impresoras'
import Carnet from './carnet'

const Configuracion = () => {
  const [activeTab, setActiveTab] = useState(0)
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

return (
    <>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Reminder tabs">
          <Tab label={`General`} />
          <Tab label={`Impresoras`} />
          <Tab label={`Carnet`} />
        </Tabs>
        {activeTab === 0 && (<General/>)}
        {activeTab === 1 && (<Impresoras/>)}
        {activeTab === 2 && (<Carnet/>)}
    </>
  )
}

export default Configuracion