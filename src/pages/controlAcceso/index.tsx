import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { postRele } from "../../api/rele.api";

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
  // const [fotoVisible, setFotoVisible] = useState(false);
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
      // setEstado(`${mensaje} ${JSON.stringify(data)}`);
      // console.log("🚀 ~ ControlAcceso2 ~ data:", data)
      // const { dni, socio, mensaje } = data;
      // setEstado(`${mensaje} ${socio?.nombre} (${dni})  ENTRADA`);
      // if (socio && socio.dni === dni) {
      //   setFotoVisible(true);
      // } else {
      //   setFotoVisible(false);
      // }
    });

    socket.on("scanner-salida", (data: ResultadoSocio) => {
      console.log("🚀 ~ ControlAcceso2 ~ data:", data)
      const { dni, socio, mensaje } = data;
      setEstado(`${mensaje} ${socio?.nombre} (${dni}) SALIDA`);
      // if (socio && socio.dni === dni) {
      //   setFotoVisible(true);
      // } else {
      //   setFotoVisible(false);
      // }
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
      await postRele('2');
    } catch (error) {
      console.log("🚀 ~ handleActivarRele ~ error:", error)
    }
  };

  const handleLibreSalida = async () => {
    // Lógica para activar el relé
    try {
      await postRele('3');
    } catch (error) {
      console.log("🚀 ~ handleActivarRele ~ error:", error)
    }
  };

  const handleEmergencia = async () => {
    // Lógica para activar el relé
    try {
      postRele('2');
      postRele('3');
    } catch (error) {
      console.log("🚀 ~ handleActivarRele ~ error:", error)
    }
  };
  return (
    <Container>
      <Stack spacing={2} sx={{ marginBottom: "1rem" }}>
        <Stack direction="row" spacing={2}>
          <Button  
            variant="contained" 
            color="primary"
            onClick={handleUnPaseEntrada}
          >
            Liberar 1 pase entrada
          </Button>
          <Button variant="contained" color="primary" onClick={handleUnPaseSalida}>
            Liberar 1 pase salida
          </Button>
          <Button variant="contained" color="primary" onClick={handleLibreEntrada}>
            Pase libre entrada
          </Button>
          <Button variant="contained" color="primary" onClick={handleLibreSalida}>
            Pase libre salida
          </Button>
        </Stack> 
        <Button fullWidth variant="contained" color="primary" onClick={handleEmergencia}>
          Emergencia
        </Button>
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

  {/* {fotoVisible && (
    <img
      src="/img/socio.jpg"
      alt="Foto Socio"
      style={{
        maxWidth: 150,
        display: "block",
        margin: "1rem auto",
        borderRadius: 8,
        boxShadow: "0 0 10px #ccc",
      }}
    />
  )} */}