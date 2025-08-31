// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// // conectar al backend
// const socket = io("http://localhost:4000");

// interface Props {}
// const ControlAcceso = (props: Props) => {
//   const [mensajes, setMensajes] = useState<string[]>([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     socket.on("mensaje", (msg) => {
//       setMensajes((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("mensaje");
//     };
//   }, []);

//   const enviarMensaje = () => {
//     if (input.trim() !== "") {
//       socket.emit("mensaje", input);
//       setInput("");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Chat con Socket.IO</h2>
//       <div style={{ border: "1px solid #ccc", padding: 10, height: 200, overflowY: "auto" }}>
//         {mensajes.map((m, i) => (
//           <p key={i}>{m}</p>
//         ))}
//       </div>

//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Escribe un mensaje..."
//       />
//       <button onClick={enviarMensaje}>Enviar</button>
//     </div>
//   )
  
// }

// export default ControlAcceso