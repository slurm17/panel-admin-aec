import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getConfig, updateConfig } from "../../api/config.api"

type ConfigData = {
  pases: string
  tiempoIMG: string
  vencimiento: string
}

const Configuracion = () => {
    const [mensajes, setMensajes] = useState({
        errorHora: '',
        success: ''
    })
    const [loading, setLoading] = useState(true)
    const [errorFetch, setErrorFetch] = useState('')
    const [dataConfig, setDataConfig] = useState<ConfigData>({
        pases: '',
        tiempoIMG: '',
        vencimiento: ''
    })

    useEffect(() => {
        getConfig().then((data) => setDataConfig({
            pases: data.pase_permitidos.toString(),
            tiempoIMG: data.duracion_img_seg.toString(),
            vencimiento: data.venc_pase_hs.toString()
        }))
        .catch(() => setErrorFetch('Error al obtener la configuración.'))
        .finally(() => setLoading(false))
    }, [])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMensajes({ ...mensajes, errorHora: '', success: '' })
        const { name, value } = e.target
        if (/^\d*$/.test(value)) {
            setDataConfig({ ...dataConfig, [name]: value })
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const vencNum = Number(dataConfig.vencimiento)
        if (vencNum < 1 || vencNum > 12) {
            setMensajes({
                ...mensajes,
                errorHora: 'Error: El vencimiento debe ser un número entre 1 y 12.'
            })
            return
        }
        try {
            await updateConfig({
                pase_permitidos: Number(dataConfig.pases),
                duracion_img_seg: Number(dataConfig.tiempoIMG),
                venc_pase_hs: Number(dataConfig.vencimiento)
            })
            setMensajes({ ...mensajes, success: 'Configuración guardada correctamente.' })
        } catch (error) {
            console.error(error)
            setErrorFetch('Error al actualizar la configuración.')
        }
    }

    if (loading) return <Typography variant="h5">Cargando configuración...</Typography>
    if (errorFetch) return <Typography variant="h5" color="error">{errorFetch}</Typography>

  return (
    <Box
         padding={2}
         component={'form'}
        //  maxWidth={'sm'}
         sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
         }}
         onSubmit={onSubmit}
    >
        <Typography variant="h4" component="h1">Configuración</Typography>
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
            <Typography>
                Pases permitidos en estado de deuda:
            </Typography>
            <TextField
                slotProps={{
                    htmlInput: {
                        maxLength: 2
                    }
                }}
                required
                value={dataConfig.pases}
                onChange={handleChange}
                name="pases"
                sx={{ maxWidth: 50, bgcolor: 'white' }}
                variant="outlined"
                size="small"
            />
        </Stack>
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
            <Typography>
                Tiempo de visulización de imágenes y textos (segundos):
            </Typography>
            <TextField
                slotProps={{
                    htmlInput: {
                        maxLength: 2
                    }
                }}
                required
                value={dataConfig.tiempoIMG}
                onChange={handleChange}
                name="tiempoIMG"
                sx={{ maxWidth: 50, bgcolor: 'white' }}
                variant="outlined"
                size="small"
            />
        </Stack>
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
            <Typography>
                Vencimiento de pase diario / socio:
            </Typography>
            <TextField
                slotProps={{
                    htmlInput: {
                        maxLength: 2
                    }
                }}
                required
                value={dataConfig.vencimiento}
                onChange={handleChange}
                name="vencimiento"
                sx={{ maxWidth: 50, bgcolor: 'white' }}
                variant="outlined"
                size="small"
            />
            AM
            <Typography variant="caption">
                (hora del día posterior ej: 12 AM, 01 AM, etc.)
            </Typography>
        </Stack>
        {mensajes.errorHora && <Typography color="error">{mensajes.errorHora}</Typography>}
        {mensajes.success && <Typography color="success">{mensajes.success}</Typography>}
        {errorFetch && <Typography color="error">{errorFetch}</Typography>}
        {loading && <Typography>{'Cargando configuración...'}</Typography>}
        <Button 
            disabled= {
                dataConfig.pases === '' || 
                dataConfig.tiempoIMG === '' || 
                dataConfig.vencimiento === '' ||
                !!mensajes.errorHora ||
                !!mensajes.success
            }
            type="submit"
            variant="contained"
        >
            Guardar
        </Button>
    </Box>
  )
}

export default Configuracion