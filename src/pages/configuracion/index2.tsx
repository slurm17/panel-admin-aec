// import { Tab, Tabs } from "@mui/material"
// import { useEffect, useState } from "react"
// import { getConfig } from "../../api/config.api"

// const Pases = () => {
//     const [activeTab, setActiveTab] = useState(0)
//     const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
//         setActiveTab(newValue)
//     }

// return (
//     <>
//         <Tabs value={activeTab} onChange={handleTabChange} aria-label="Reminder tabs">
//           <Tab label={`General`} />
//           <Tab label={`Impresoras`} />
//         </Tabs>
//         {activeTab === 0 && (<PaseSocio vencHs={vencHs}/>)}
//         {activeTab === 1 && (<PaseDiario vencHs={vencHs}/>)}
//     </>
//   )
// }

// export default Pases