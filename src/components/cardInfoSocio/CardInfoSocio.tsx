import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material"
import { format } from "date-fns"
import imgClub from '../../assets/logo-club.png'

interface Props {
    dni: string,
    numSocio: string,
    nombre: string,
    estadoSocio: string,
    fechaEstado: string,
    foto: string | null,
}

const estadoMap: Record<string | number, string> = {
  0: "REGULAR (0)",
  2: "BAJA (2)",
  5: "TEMPORAL (5)",
};


const CardInfoSocio = (props: Props) => {
  return (
    <Card sx={{ borderRadius: 3, maxWidth: 600, boxShadow: 3, p: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Datos del Socio
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Contenedor con foto + datos */}
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box
            component={'img'}
            src={props.foto || imgClub}
            alt="Foto socio"
            sx={{
                // width: 150,
                height: 200, 
                objectFit: 'contain',
            }}
            />
          {/* Datos */}
          <Stack spacing={1}>
            <Typography variant="body1">
              <strong>Nombre:</strong> {props.nombre}
            </Typography>
            <Typography variant="body1">
              <strong>Documento:</strong>{" "}
              {props.dni.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Typography>
            <Typography variant="body1">
              <strong>Número de Socio:</strong> {props.numSocio}
            </Typography>
            <Typography variant="body1">
              <strong>Estado:</strong> {estadoMap[props.estadoSocio] || props.estadoSocio}
            </Typography>
            <Typography variant="body1">
              <strong>Fecha de Estado:</strong>{" "}
              {format(new Date(props.fechaEstado), "dd/MM/yyyy")}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CardInfoSocio