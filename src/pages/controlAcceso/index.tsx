import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { postRele } from "../../api/rele.api";
import { postReleLibre } from "../../api/releLibre.api";
import PanelBotones from "./components/PanelBotones";

type Socio = {
  dni: string;
  nombre?: string;
  apellido?: string;
};

type ResultadoSocio = {
  mensaje: string;
  data: object;
  dni: string;
  socio?: Socio;
  estado: string;
};

const ControlAcceso2: React.FC = () => {
  const [estado, setEstado] = useState("Esperando lectura de DNI o código QR...");
  const [datos, setDatos] = useState({
    dni: "",
    nombre: "",
    nroSocio: "",
    mensaje: ''
  });
  const socketUrl = import.meta.env.VITE_SOCKET_URL

  useEffect(() => {
    const socket = io(socketUrl, {
    transports: ["websocket"] // opcional, para evitar polling
  });
    socket.on("scanner-entrada", ({mensaje, datos_socio}) => {
      setEstado('')
      setDatos({
        dni: datos_socio?.dni,
        nombre: datos_socio?.nombre,
        nroSocio: datos_socio?.num_socio,
        mensaje : mensaje
      })
    });

    socket.on("scanner-salida", (data: ResultadoSocio) => {
      console.log("🚀 ~ ControlAcceso2 ~ data:", data)
      const { dni, socio, mensaje } = data;
      setEstado(`${mensaje} ${socio?.nombre} (${dni}) SALIDA`);
    });

    return () => {
      socket.disconnect();
    };
  }, [socketUrl]);

  const handleUnPaseEntrada = async () => {
    // Lógica para activar el relé
    try {
      await postRele('0');
    } catch (error) {
      console.log("🚀 ~ handleActivarRele ~ error:", error)
    }
  };

  const handleUnPaseSalida = async () => {
    // Lógica para activar el relé
    try {
      await postRele('1');
    } catch (error) {
      console.log("🚀 ~ handleActivarRele ~ error:", error)
    }
  };

  const handleLibreEntrada = async () => {
    // Lógica para activar el relé
    try {
      await postReleLibre('2');
    } catch (error) {
      console.log("🚀 ~ handleActivarRele ~ error:", error)
    }
  };

  const handleLibreSalida = async () => {
    // Lógica para activar el relé
    try {
      await postReleLibre('3');
    } catch (error) {
      console.log("🚀 ~ handleActivarRele ~ error:", error)
    }
  };

  const handleEmergencia = async () => {
    // Lógica para activar el relé
    try {
      postReleLibre('2');
      postReleLibre('3');
    } catch (error) {
      console.log("🚀 ~ handleActivarRele ~ error:", error)
    }
  };
  return (
    <Container>
      {/* <Stack spacing={2} sx={{ marginBottom: "1rem" }}> */}
      <Stack spacing={2} direction={"row"} sx={{ 
        marginBottom: "1rem",
        justifyContent: 'center',
        // alignItems: 'center'
        }} >
        <PanelBotones text={'Entrada'}>
            <Button  
            variant="contained" 
            color="primary"
            onClick={handleUnPaseEntrada}
            sx={{
              maxWidth: '500px',
            }}
          >
            Liberar 1 pase
          </Button>
          <Button variant="contained" color="primary" onClick={handleLibreEntrada}>
            Pase libre
          </Button>
        </PanelBotones>
        <PanelBotones text={'Salida'}>
            <Button  
            variant="contained" 
            color="primary"
            onClick={handleUnPaseSalida}
            sx={{
              maxWidth: '500px',
            }}
          >
            Liberar 1 pase
          </Button>
          <Button variant="contained" color="primary" onClick={handleLibreSalida}>
            Pase libre
          </Button>
        </PanelBotones>
        <PanelBotones text="Emergencia">
          <Button fullWidth variant="contained" color="primary" onClick={handleEmergencia}>
            Emergencia
          </Button>
        </PanelBotones>
        </Stack>
      <h1 style={{ textAlign: "center" }}>Control de Accesos - Club</h1>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", margin: "1rem 0" }}>
            {estado}
        </Typography>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", margin: "1rem 0" }}>
            {datos.nombre}
        </Typography>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", margin: "1rem 0" }}>
            {datos.dni ? `DNI: ${datos.dni}` : ''}
        </Typography>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", margin: "1rem 0" }}>
            {datos.nroSocio ? `Socio nro: ${datos.nroSocio}` : ''}
        </Typography>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", margin: "1rem 0" }}>
            {datos.mensaje}
        </Typography> 
    </Container>
  );
};

export default ControlAcceso2;
