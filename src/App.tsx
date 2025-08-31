import { HashRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/mainLayout';
import routes from './constants/routes'
import Home from './pages/home';
import InfoDisplayScreen from './pages/infoDisplayScreen';
import ControlAcceso from './pages/controlAcceso';
import PaseDiario from './pages/paseDiario';

function App() {
  // const llamarApi = () => {
  //   fetch("http://localhost:4000/api/users")
  //     .then(res => res.json())
  //     .then(json => alert(JSON.stringify(json)))
  //     .catch(err => console.error("Error al consumir API:", err));
  // }
  return (
      <HashRouter>
        <Routes>
          <Route element={<MainLayout/>}>
            {/* <Route path="/" element={<Navigate to={routes.MAIN} replace />} /> */}
            <Route path={routes.HOME} element={<Home />} />
            <Route path={routes.INFO_DISPLAY_SCREEN} element={<InfoDisplayScreen />} />
            <Route path={routes.CONTROL_ACCESO} element={<ControlAcceso />} />
            <Route path={routes.PASE_DIARIO} element={<PaseDiario />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
  )
}

export default App
