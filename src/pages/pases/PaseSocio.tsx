import { Box, Button, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { getSocioAccess } from "../../api/socio.api"
import type { SocioAccess } from "../../types/socioAccess"
import { addDays, set } from "date-fns"
import { DocumentoField } from "../../components/DocumentoField"
import { generarCodigoQR } from "../../functions/generarCodigoQr"
import { postQrCode } from "../../api/qr.api"
import { toLocalISOString } from "../../functions/toLocalISOString"
import { imprimir } from "../../api/paseDiario"
import type { ApiError } from "../../api/client.fetch"
import CardInfoSocio from "../../components/cardInfoSocio/CardInfoSocio"

const PaseSocio = ({ vencHs }: { vencHs: number }) => {
  const urlImageSocio = import.meta.env.VITE_URL_IMAGES
  const [loadingImpresion, setLoadingImpresion] = useState(false)
  const [errorImpresion, setErrorImpresion] = useState<string | null>(null)
  const [successImpresion, setSuccessImpresion] = useState<string | null>(null)
  const [datos, setDatos] = useState<{ dni: string, nombre: string }>({
    dni: '',
    nombre: '',
    // apellido: '',
  })
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [socioData, setSocioData] = useState<SocioAccess | null>(null)
  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await getSocioAccess(datos.dni)
      setDatos({ ...datos, nombre: data.nombre })
      setSocioData(data)
      fetch(`${urlImageSocio}/fotos-socios/${datos.dni}.jpg`)
      .then((res) => {
        if (!res.ok) {
          setSrc(null);
          throw new Error("No existe imagen");
        }
        setSrc(res.url);
      })
      .catch((error) => console.error(error));
    } catch (error) {
      const apiErr = error as ApiError
      setError(apiErr.message)
    }
  }

  const imprimirPase = async () => {
      setErrorImpresion(null)
      setSuccessImpresion(null)
      const fechaVencimientoDate = set(addDays(new Date(), 1), { hours: vencHs, minutes: 0 })
      const codigo = generarCodigoQR({
          tipo: 'socio',
          dni: datos.dni,
          fechaVencimiento: fechaVencimientoDate,
      })
      try {
        setLoadingImpresion(true)
        await postQrCode({
          codigo,
          tipo: 'socio',
          documento: datos.dni,
          fecha_emitido: toLocalISOString(new Date()),
          fecha_venc: toLocalISOString(fechaVencimientoDate)
        })
        //    await imprimir(datos)
        await imprimir({
          ...datos, 
          codigo, 
          fechaEmision: toLocalISOString(new Date()), 
          fechaVencimiento: toLocalISOString(fechaVencimientoDate),
          tipoDePase: 'PASE SOCIO'
        })
        setSuccessImpresion('Pase impreso correctamente')
      } catch (error) {
        const apiErr = error as ApiError
        setErrorImpresion(apiErr.message)
      } finally {
        setLoadingImpresion(false)
      }
  }

  if (socioData) {
    return (
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 2 }}>
        <CardInfoSocio 
          dni={datos.dni}
          numSocio={socioData.num_socio}
          nombre={socioData.nombre}
          estadoSocio={socioData.estado_socio}
          fechaEstado={socioData.fecha_estado}
          foto={src}
        />
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }} maxWidth={'sm'}>
          <Button 
            variant="contained" 
            onClick={() => {
              setSocioData(null); 
              setDatos({ dni: '', nombre: '' })
              setErrorImpresion(null)
              setSuccessImpresion(null)
            }}>
              Buscar otro Socio
          </Button>
          <Button 
            sx={{ maxWidth: '500px' }}
            disabled={loadingImpresion} 
            loading={loadingImpresion}
            variant="contained" 
            loadingPosition="end"
            onClick={imprimirPase} 
            color="primary"> {loadingImpresion ? 'Imprimiendo espere...' : ' Imprimir Pase'}</Button>
        </Stack>
        {errorImpresion && <Typography color="error">{errorImpresion}</Typography>}
        {successImpresion && <Typography color="success">{successImpresion}</Typography>}
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
          onChange={(value) =>{ setDatos({ ...datos, dni: value }); setError(null)}}
          label="Documento"
          variant="outlined"
          name="dni"
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={!datos.dni || datos.dni.length < 7 || !!error}
      >
          Buscar Socio
      </Button>
      {!!error && <Typography color="error">{error}</Typography>}
    </Box>
  )
}

export default PaseSocio