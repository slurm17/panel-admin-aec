import React, { useState } from 'react'
import { imprimir } from '../../api/paseDiario'
import { Alert, Box, TextField, Typography } from '@mui/material'
import { DocumentoField } from '../../components/DocumentoField'
import { generarCodigoQR } from '../../functions/generarCodigoQr'
import { postQrCode } from '../../api/qr.api'
import { addDays, set } from 'date-fns'
// import { getSocioAccess } from '../../api/socio.api'
import { toLocalISOString } from '../../functions/toLocalISOString'
import ImprimirButton from '../../components/imprimirButton/ImprimirButton'
import { useImpresoraStore } from '../../store/impresoraStore'
import type { ApiError } from '../../api/client.fetch'

interface DataPaseDiario {
    nombre: string,
    apellido: string,
    dni: string
}

const PaseDiario = ({vencHs}: {vencHs: number}) => {
    const impresoraActiva = useImpresoraStore((s) => s.impresoraActiva);
    const [errorImpresion, setErrorImpresion] = useState<string | null>(null)
    const [loadingImpresion, setLoadingImpresion] = useState(false)
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
        const fechaVencimientoDate = set(addDays(new Date(), 1), { hours: vencHs, minutes: 0 })
        setLoadingImpresion(true)
        try {
            // const socio = await getSocioAccess(datos.dni)
            // if (socio) throw new Error('Este dni corresponde a un socio, tiene que generar un "Pase de Socio".')
            const codigo = generarCodigoQR({
                tipo: 'diario',
                dni: datos.dni,
                fechaVencimiento: fechaVencimientoDate,
            })
            await postQrCode({
                codigo,
                tipo: 'diario',
                documento: datos.dni,
                fecha_emitido: toLocalISOString(new Date()),
                fecha_venc: toLocalISOString(fechaVencimientoDate),
            })
            const fechaEmision = toLocalISOString(new Date())
            const fechaVencimiento = toLocalISOString(fechaVencimientoDate)
            await imprimir({
                ...datos, 
                codigo, 
                fechaVencimiento, 
                fechaEmision, 
                tipoDePase: 'PASE DIARIO',
                ip: impresoraActiva?.ip,
                puerto: impresoraActiva?.puerto
            })
            console.log('imprimir')
        } catch (error) {
            const apiErr = error as ApiError
            setErrorImpresion(apiErr.message)
          console.error("Error al enviar el formulario:", error)
        } finally {
            setLoadingImpresion(false)
        }
    }

  return (
    <Box component={'form'} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    }} maxWidth={'sm'} onSubmit={onSumbit}>
        <Typography variant="h4" component="h1" gutterBottom>
            Pase Diario
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
            autoComplete='off'
            required
            value={datos.apellido}
            onChange={handleChange}
            label="Apellido" 
            name="apellido"
            variant="outlined" 
            fullWidth 
        />
        <DocumentoField 
            value={datos.dni} 
            onChange={(value) => setDatos({ ...datos, dni: value })} 
            required
            autoComplete='off'
            label="Documento" 
            name="dni"
            variant="outlined" 
            fullWidth 
        />
        <ImprimirButton
            type="submit" 
            variant="contained" 
            color="primary"
            loading={loadingImpresion}
            disabled={!datos.nombre || !datos.apellido || !datos.dni || datos.dni.length < 7}
            ip={impresoraActiva?.ip}
            puerto={impresoraActiva?.puerto}
        >
            Imprimir
        </ImprimirButton>
        {errorImpresion && <Alert severity="error">{errorImpresion}</Alert>}
    </Box>
  )
}

export default PaseDiario