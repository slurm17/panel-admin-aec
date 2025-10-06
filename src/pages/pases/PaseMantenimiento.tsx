import React, { useState } from 'react'
// import { imprimir } from '../../api/paseDiario'
import type { DataPaseMantenimiento } from '../../types/dataPaseDiario'
import { Box, Button, TextField, Typography } from '@mui/material'
import { DocumentoField } from '../../components/DocumentoField'
import { generarCodigoQR } from '../../functions/generarCodigoQr'
import { postQrCode } from '../../api/qr.api'
import { toLocalISOString } from '../../functions/toLocalISOString'
import { set } from 'date-fns'
import { imprimir } from '../../api/paseDiario'

const PaseMantenimiento = () => {

   const [datos, setDatos] = useState<DataPaseMantenimiento>({
        nombre: '',
        apellido: '',
        dni: '',
        tarea: '',
        tipoDePase: 'PASE MANTENIMIENTO'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDatos({ ...datos, [name]: value })
    }

    const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        const fechaVencimientoDate = set(new Date(), { hours: 23, minutes: 59 })
        e.preventDefault()
        try {
            const codigo = generarCodigoQR({
                tipo: 'mantenimiento',
                dni: datos.dni,
                fechaVencimiento: fechaVencimientoDate,
            })
            await postQrCode({
                codigo,
                tipo: 'mantenimiento',
                documento: datos.dni,
                fecha_emitido: toLocalISOString(new Date()),
                fecha_venc: toLocalISOString(fechaVencimientoDate),
                tarea: datos.tarea
            })
            await imprimir({...datos, codigo, fechaEmision: toLocalISOString(new Date()), fechaVencimiento: toLocalISOString(fechaVencimientoDate)})
            //    await imprimir(datos)
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
            Pase de Mantenimiento
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
        <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={!datos.nombre || !datos.apellido || !datos.dni || datos.dni.length < 7 || !datos.tarea}
        >
            Imprimir
        </Button>
    </Box>
  )
}

export default PaseMantenimiento