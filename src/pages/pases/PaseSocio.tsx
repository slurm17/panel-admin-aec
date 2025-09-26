import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { getSocioAccess } from "../../api/socio.api"
import type { SocioAccess } from "../../types/socioAccess"
import { addDays, format, set } from "date-fns"
import { DocumentoField } from "../../components/DocumentoField"
import { generarCodigoQR } from "../../functions/generarCodigoQr"
import { postQrCode } from "../../api/qr.api"
import { toLocalISOString } from "../../functions/toLocalISOString"
import { imprimir } from "../../api/paseDiario"

const PaseSocio = ({ vencHs }: { vencHs: number }) => {
  const [datos, setDatos] = useState<{ dni: string, nombre: string }>({
    dni: '',
    nombre: '',
    // apellido: '',
  })
  const [socioData, setSocioData] = useState<SocioAccess | null>(null)
  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await getSocioAccess(datos.dni)
      setDatos({ ...datos, nombre: data.nombre })
      console.log(data)
      setSocioData(data)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
    }
  }

  const imprimirPase = async () => {
      const fechaVencimientoDate = set(addDays(new Date(), 1), { hours: vencHs, minutes: 0 })
      const codigo = generarCodigoQR({
          tipo: 'socio',
          dni: datos.dni,
          fechaVencimiento: fechaVencimientoDate,
      })
      try {
        await postQrCode({
          codigo,
          tipo: 'socio',
          documento: datos.dni,
          fecha_emitido: toLocalISOString(new Date()),
          fecha_venc: toLocalISOString(fechaVencimientoDate)
        })
        //    await imprimir(datos)
        await imprimir({...datos, codigo, fechaEmision: toLocalISOString(new Date()), fechaVencimiento: toLocalISOString(fechaVencimientoDate)})
        
      } catch (error) {
        console.error("Error al enviar el formulario:", error)
      }
  }

  if (socioData) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Card sx={{ borderRadius: 3, boxShadow: 3, maxWidth: 400, p: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Datos del Socio
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1}>
              <Typography variant="body1">
                <strong>Documento:</strong> {datos.dni.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </Typography>
              <Typography variant="body1">
                <strong>Número de Socio:</strong> {socioData.num_socio}
              </Typography>
              <Typography variant="body1">
                <strong>Nombre:</strong> {socioData.nombre}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body1"><strong>Estado:</strong> {socioData.estado_socio} </Typography>
              </Stack>
              <Typography variant="body1">
                <strong>Fecha de Estado:</strong> {format(new Date(socioData.fecha_estado), "dd/MM/yyyy")}{/* HH:mm*/}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }} maxWidth={'sm'}>
          <Button variant="contained" onClick={() => setSocioData(null)}>Buscar otro Socio</Button>
          <Button variant="contained" onClick={imprimirPase} color="primary">Imprimir Pase</Button>
        </Stack>
      </Box>
    )
  }

  return (
    <Box component={'form'} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    }} maxWidth={'sm'} onSubmit={onSumbit}>
      <Typography variant="h4" component="h1" gutterBottom>Pase de Socio</Typography>
      <DocumentoField
          value={datos.dni}
          autoComplete="off"
          autoFocus
          required
          onChange={(value) => setDatos({ ...datos, dni: value })}
          label="Documento"
          variant="outlined"
          name="dni"
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={!datos.dni || datos.dni.length < 7}
      >
          Buscar Socio
      </Button>
    </Box>
  )
}

export default PaseSocio