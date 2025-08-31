import React, { useEffect, useState } from "react";
import io from "socket.io-client";

type Socio = {
  dni: string;
  nombre?: string;
  apellido?: string;
};

type ResultadoSocio = {
  dni: string;
  socio?: Socio;
  estado: string;
};

const ControlAcceso2: React.FC = () => {
  const [estado, setEstado] = useState("Esperando lectura de DNI o código QR...");
  const [fotoVisible, setFotoVisible] = useState(false);
  const socketUrl = import.meta.env.VITE_SOCKET_URL

  useEffect(() => {
    const socket = io(socketUrl, {
    transports: ["websocket"] // opcional, para evitar polling
  });
    socket.on("scanner-entrada", (data: ResultadoSocio) => {
      console.log("🚀 ~ ControlAcceso2 ~ data:", data)
      const { dni, socio, estado } = data;
      setEstado(`${estado} (${dni}) ENTRADA`);
      if (socio && socio.dni === dni) {
        setFotoVisible(true);
      } else {
        setFotoVisible(false);
      }
    });

    socket.on("scanner-salida", (data: ResultadoSocio) => {
      console.log("🚀 ~ ControlAcceso2 ~ data:", data)
      const { dni, socio, estado } = data;
      setEstado(`${estado} (${dni}) SALIDA`);
      if (socio && socio.dni === dni) {
        setFotoVisible(true);
      } else {
        setFotoVisible(false);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socketUrl]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>Control de Accesos - Club</h1>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem", margin: "1rem 0" }}>{estado}</div>
      {fotoVisible && (
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
      )}
    </div>
  );
};

export default ControlAcceso2;
