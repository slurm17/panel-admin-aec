import { Box, Button, TextField, Typography } from "@mui/material"
import { imprimir } from "./../../api/paseDiario"
import { useState } from "react"
import type { DataPaseDiario } from "../../types/dataPaseDiario"

const PaseDiario = () => {
    const [datos, setDatos] = useState<DataPaseDiario>({
        nombre: '',
        apellido: '',
        dni: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDatos({ ...datos, [name]: value })
    }

    const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
           await imprimir(datos)
        } catch (error) {
          console.error("Error al enviar el formulario:", error)
        }
    }
  return (
    <Box component={'form'} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    }} maxWidth={'sm'} onSubmit={onSumbit}>
        <Typography variant="h4" component="h1" gutterBottom>
            Pase diario
        </Typography>
        <TextField 
            required
            value={datos.nombre}
            onChange={handleChange}
            label="Nombre" 
            name="nombre"
            variant="outlined" 
            fullWidth 
        />
        <TextField 
            required
            value={datos.apellido}
            onChange={handleChange}
            label="Apellido" 
            name="apellido"
            variant="outlined" 
            fullWidth 
        />
        <TextField 
            required
            value={datos.dni}
            onChange={handleChange}
            label="Documento" 
            name="dni"
            variant="outlined" 
            fullWidth 
        />
        <Button type="submit" variant="contained" color="primary">
            Enviar
        </Button>
    </Box>
  )
}

export default PaseDiario