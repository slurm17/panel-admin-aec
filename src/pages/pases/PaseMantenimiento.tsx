import React, { useState } from 'react'
// import { imprimir } from '../../api/paseDiario'
import type { DataPaseMantenimiento } from '../../types/dataPaseDiario'
import { Box, Button, TextField, Typography } from '@mui/material'
import { DocumentoField } from '../../components/DocumentoField'
import { generarCodigoQR } from '../../functions/generarCodigoQr'

const PaseMantenimiento = () => {

   const [datos, setDatos] = useState<DataPaseMantenimiento>({
        nombre: '',
        apellido: '',
        dni: '',
        tarea: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDatos({ ...datos, [name]: value })
    }

    const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
        //    await imprimir(datos)
           const codigo = generarCodigoQR({
               tipo: 'mantenimiento',
               dni: datos.dni,
               fechaVencimiento: new Date(Date.now() + 12 * 60 * 60 * 1000),
           })
           console.log("🚀 ~ onSumbit ~ codigo:", codigo)
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
            Pase de Matenimiento
        </Typography>
        <TextField 
            autoFocus
            autoComplete='off'
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
            autoComplete='off'
            value={datos.apellido}
            onChange={handleChange}
            label="Apellido" 
            name="apellido"
            variant="outlined" 
            fullWidth 
        />
        <DocumentoField
            required
            autoComplete='off'
            value={datos.dni}
            onChange={(value)=> setDatos({...datos, dni: value})}
            label="Documento" 
            name="dni"
            variant="outlined" 
            fullWidth
        />
        <TextField 
            required
            autoComplete='off'
            value={datos.tarea}
            onChange={handleChange}
            label="Tarea a realizar" 
            name="tarea"
            variant="outlined" 
            fullWidth 
        />
        <Button type="submit" variant="contained" color="primary">
            Imprimir
        </Button>
    </Box>
  )
}

export default PaseMantenimiento