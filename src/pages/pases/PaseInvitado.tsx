import { Box, Button, Card, CardContent, Divider, Stack, TextField, Typography } from "@mui/material"
import { getSocioAccess } from "../../api/socio.api"
import { useState } from "react"
import type { SocioAccess } from "../../types/socioAccess"
import { format } from "date-fns"
import { DocumentoField } from "../../components/DocumentoField"
import { generarCodigoQR } from "../../functions/generarCodigoQr"
import { postQrCode } from "../../api/qr.api"
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import { toLocalISOString } from "../../functions/toLocalISOString"
import { imprimir } from "../../api/paseDiario"
import { daysBetween } from "./functions/daysBetween"
import type { ApiError } from "../../api/client.fetch"
type FormValues = {
  inicioDate: Date | null;
  inicioTime: Date | null;
  finDate: Date | null;
  finTime: Date | null;
};

type FormValuesError = {
  inicioDate: string | null;
  inicioTime: string | null;
  finDate: string | null;
  finTime: string | null;
};
const PaseInvitado = () => {
  const [datos, setDatos] = useState<{ dni: string, nombre: string }>({ 
    dni: '',
    nombre: '',
  })
  const [pasesAImprimir, setPasesAImprimir] = useState<number>(1)
  const [socioData, setSocioData] = useState<SocioAccess | null>(null)
  const [errorSumbit, setErrorSubmit] = useState<string | null>(null)
  const [errorSocio, setErrorSocio] = useState<string | null>(null)
  const [error, setError] = useState<FormValuesError>({
    inicioDate: '',
    inicioTime: '',
    finDate: '',
    finTime: ''
  })
  const [values, setValues] = useState<FormValues>({
    inicioDate: null,
    inicioTime: null,
    finDate: null,
    finTime: null
  });

  const handlePickerChange = (field: keyof FormValues) => (newValue: Date | null) => {
    setErrorSubmit(null)
    setValues({ ...values, [field]: newValue });
  };

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await getSocioAccess(datos.dni)
      setDatos({ ...datos, nombre: data.nombre })
      setSocioData(data)
    } catch (error) {
      const apiErr = error as ApiError
      setErrorSocio(apiErr.message)
    }
  }

  function combineDateAndTime(date: Date, time?: Date): Date {
    if (time) {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      );
    }
    // Solo la fecha, sin horas/minutos
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }

  const imprimirPase = async () => {
    try {
      if (values?.finDate && values?.inicioDate && values?.finTime && values?.inicioTime){
        // Crear objetos Date completos combinando la fecha y la hora
        const inicioFecha = combineDateAndTime(values.inicioDate)
        const finFecha = combineDateAndTime(values.finDate)
        if (finFecha < inicioFecha){
          setErrorSubmit('Error: La fecha de fin debe ser posterior o igual a la fecha de inicio')
          return
        }
        if (finFecha.getTime() === inicioFecha.getTime()){
          const inicioHora = combineDateAndTime(values.inicioDate, values.inicioTime)
          const finHora = combineDateAndTime(values.finDate, values.finTime)
          if (inicioHora >= finHora){
            setErrorSubmit('Error: La hora de fin debe ser posterior a la hora de inicio')
            return
          }
        }
        if (daysBetween(inicioFecha, finFecha) > 7){
          setErrorSubmit('Error: La cantidad máxima de días entre la fecha de inicio y fin debe ser de 7 días')
          return
        }
        for (let i = 0; i < pasesAImprimir || 0; i++) {
          const codigo = generarCodigoQR({
            tipo: 'invitado',
            dni: datos.dni,
            fechaActual: combineDateAndTime(values.inicioDate, values.inicioTime),
            fechaVencimiento: combineDateAndTime(values.finDate, values.finTime),
            id: i.toString()
          })
          postQrCode({
              id_invitado: i.toString(),
              codigo,
              tipo: 'invitado',
              documento: datos.dni,
              fecha_emitido: toLocalISOString(combineDateAndTime(values.inicioDate, values.inicioTime)),
              fecha_venc: toLocalISOString(combineDateAndTime(values.finDate, values.finTime))
          })
          //    await imprimir(datos)
          await imprimir({
            ...datos, 
            codigo, 
            fechaEmision: toLocalISOString(combineDateAndTime(values.inicioDate, values.inicioTime)), 
            fechaVencimiento: toLocalISOString(combineDateAndTime(values.finDate, values.finTime))
          })
          
          console.log('imprimir')
          
        }
      }
    } catch (error) {
      const apiErr = error as ApiError
      alert(apiErr.message)
    }
  }

  if (socioData) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 1, maxWidth: 400, p: 1 }}>
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
          <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography>Inicio de vigencia del pase</Typography> 
                <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                  <DesktopDatePicker 
                    disablePast 
                    onChange={handlePickerChange('inicioDate')}
                    value={values.inicioDate}
                    onError={(reason) => setError({ ...error, inicioDate: reason })} // 👈 acá captás el error
                    slotProps={{
                      textField: {
                        helperText: error.inicioDate ? "Fecha inválida" : "", // mostrar mensaje
                      },
                    }}
                  />
                  <TimePicker
                    label="Hora"
                    onChange={handlePickerChange('inicioTime')}
                    value={values.inicioTime}
                    format="HH:mm"   // 👈 Fuerza formato 24hs
                  />
                </Stack>
            </Stack>
            <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography>Fin de vigencia del pase</Typography>
                <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                  <DesktopDatePicker 
                    disablePast 
                    onChange={handlePickerChange('finDate')}
                    onError={(reason) => setError({ ...error, finDate: reason })} // 👈 acá captás el error
                    slotProps={{
                      textField: {
                        helperText: error.finDate ? "Fecha inválida" : "", // mostrar mensaje
                      },
                    }}
                  />
                  <TimePicker
                    label="Hora"
                    onChange={handlePickerChange('finTime')}
                    value={values.finTime}
                    format="HH:mm"   // 👈 Fuerza formato 24hs
                  />
                </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
          <Typography>
            Cantidad de pases a imprimir:
          </Typography>
          <TextField
            sx={{ maxWidth: 60, bgcolor: 'white' }}
            value={pasesAImprimir}
            slotProps={{
              htmlInput: { maxLength: 3, minLength: 1 }
            }}
            onChange={(e) => setPasesAImprimir(Number(e.target.value))}
            variant="outlined"
            size="small"
          />
        </Stack>
          {errorSumbit && <Typography color="error">{errorSumbit}</Typography>} 
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Button variant="contained" onClick={() => setSocioData(null)}>Buscar otro Socio</Button>
          <Button 
            disabled={
              pasesAImprimir === 0 ||
              pasesAImprimir === null ||
              values.inicioDate === null ||
              values.inicioTime === null ||
              values.finDate === null ||
              values.finTime === null ||
              !!error.inicioDate ||
              !!error.finDate ||
              !!errorSumbit
            } 
            variant="contained" 
            onClick={imprimirPase} 
            color="primary">
              Imprimir Pase/s
          </Button>
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
          onChange={(value) => {setDatos({ ...datos, dni: value }); setErrorSocio(null)}}
          label="Documento"
          name="dni"
          variant="outlined"
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={!datos.dni || datos.dni.length < 7 || !!errorSocio}
      >
          Buscar Socio
      </Button>
      {errorSocio && <Typography color="error">{errorSocio}</Typography>}
    </Box>
  )
}

export default PaseInvitado