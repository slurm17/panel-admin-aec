import { Box, Button, Card, CardContent, Divider, Stack, TextField, Typography } from "@mui/material"
import { getSocioAccess } from "../../api/socio.api"
import { useState } from "react"
import type { SocioAccess } from "../../types/socioAccess"
import { format } from "date-fns"
import { DocumentoField } from "../../components/DocumentoField"
import { generarCodigoQR } from "../../functions/generarCodigoQr"


const PaseInvitado = () => {
  const [datos, setDatos] = useState<{ dni: string }>({ dni: ''})
  const [pasesAImprimir, setPasesAImprimir] = useState<number>(1)
  const [socioData, setSocioData] = useState<SocioAccess | null>(null)
  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await getSocioAccess(datos.dni)
      console.log(data)
      setSocioData(data)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
    }
  }

  const imprimirPase = () => {
    for (let i = 0; i < pasesAImprimir || 0; i++) {
      const codigo = generarCodigoQR({
        tipo: 'invitado',
        dni: datos.dni,
        fechaVencimiento: new Date(Date.now() + 12 * 60 * 60 * 1000),
        id: i.toString()
      })
      console.log("🚀 ~ imprimirPase ~ codigo:", codigo)
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
                <strong>Documento:</strong> {datos.dni}
              </Typography>
              <Typography variant="body1">
                <strong>Número de Socio:</strong> {socioData.num_socio}
              </Typography>
              <Typography variant="body1">
                <strong>Nombre:</strong> {socioData.nombre}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body1"><strong>Estado:</strong> {socioData.estado_socio} </Typography>
                {/* <Chip label={estadoLabel} color={estadoColor} size="small" /> */}
              </Stack>
              <Typography variant="body1">
                <strong>Fecha de Estado:</strong> {format(new Date(socioData.fecha_estado), "dd/MM/yyyy")}{/* HH:mm*/}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
        <Typography>
          Cantidad de pases a imprimir:
        </Typography>
        <TextField
          sx={{ maxWidth: 100, bgcolor: 'white' }}
          value={pasesAImprimir}
          slotProps={{
            htmlInput: { maxLength: 3, minLength: 1 }
          }}
          onChange={(e) => setPasesAImprimir(Number(e.target.value))}
          variant="outlined"
          size="small"
        />
        </Stack>
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }} maxWidth={'sm'}>
          <Button variant="contained" onClick={() => setSocioData(null)}>Buscar otro Socio</Button>
          <Button disabled={pasesAImprimir === 0 || pasesAImprimir === null} variant="contained" onClick={imprimirPase} color="primary">Imprimir Pase/s</Button>
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
      <Typography variant="h4" component="h1" gutterBottom>Pase de Invitado</Typography>
      <DocumentoField
          autoFocus
          autoComplete='off'
          required
          value={datos.dni}
          onChange={(value) => setDatos({ ...datos, dni: value })}
          label="Documento"
          name="dni"
          variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
          Buscar Socio
      </Button>
    </Box>
  )
}

export default PaseInvitado