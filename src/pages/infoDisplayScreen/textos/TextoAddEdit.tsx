import { Button, FormControl, MenuItem, Stack, Switch, TextField, Typography } from "@mui/material"
import type { Texto } from "../../../types/Texto";

interface TextoAddEditProps {
    onAccept: (texto: Texto) => void;
    texto: Texto;
    setTexto: (texto: Texto) => void;
    onCancel: () => void
}

const TextoAddEdit = ({texto, onAccept, onCancel, setTexto}: TextoAddEditProps) => {
  const nroOrden = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {e.preventDefault(); onAccept(texto)}
  return (
    <Stack onSubmit={onSubmit} component="form" maxWidth={"sm"} sx={{
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 1,
      padding: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
        <TextField 
          required
          name='contenido'
          label='Contenido'
          multiline
          // maxRows={4}
          rows={2}
          variant="outlined"
          fullWidth
          value={texto.contenido}
          onChange={(e) => setTexto({...texto, contenido: e.target.value})}
        />
        <FormControl component="fieldset" variant="standard">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Activo:</Typography>
            <Stack direction="row" alignItems={"center"}>
              <Typography>No</Typography>
                <Switch 
                  name='activa'
                  checked={texto.activo} 
                  onChange={(e) => setTexto({...texto, activo: e.target.checked})} 
                  />
              <Typography>Si</Typography>
            </Stack>
          </Stack>
        </FormControl>
        <TextField
          required
          select
          name='orden'
          label="Posición"
          variant="standard"
          value={texto.orden}
          onChange={(e) => setTexto({...texto, orden: e.target.value})} 
        >
            <MenuItem value="">-- Seleccionar --</MenuItem>
            {nroOrden.map((nro) => (
              <MenuItem key={nro} value={nro}>
                {nro}
              </MenuItem>
            ))}
        </TextField>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={onCancel}>Cancelar</Button>
            <Button type="submit" autoFocus>Aceptar</Button>
        </Stack>
    </Stack>
  )
}

export default TextoAddEdit