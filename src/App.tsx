import { HashRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/mainLayout';
import routes from './constants/routes'
import Home from './pages/home';
import InfoDisplayScreen from './pages/infoDisplayScreen';
import ControlAcceso from './pages/controlAcceso';
import Pases from './pages/pases';
import Configuracion from './pages/configuracion';

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route element={<MainLayout/>}>
            {/* <Route path="/" element={<Navigate to={routes.MAIN} replace />} /> */}
            <Route path={routes.HOME} element={<Pases />} />
            <Route path={routes.INFO_DISPLAY_SCREEN} element={<InfoDisplayScreen />} />
            <Route path={routes.CONTROL_ACCESO} element={<ControlAcceso />} />
            <Route path={routes.PASE_DIARIO} element={<Pases />} />
            <Route path={routes.CONFIG} element={<Configuracion />} />
            <Route path="*" element={<Pases />} />
          </Route>
        </Routes>
      </HashRouter>
  )
}

export default App
