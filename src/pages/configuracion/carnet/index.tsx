import {
  Box,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
  Button
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCarnet, updateCarnet } from "../../../api/carnet.fetch";

const Carnet = () => {
  const [checked, setChecked] = useState(true);
  const [minutes, setMinutes] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState(""); 
  const resetValues = () => {
    setError('');
    setMensaje('');
  }
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetValues();
    setChecked(event.target.checked);
  };
  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetValues();
    const value = event.target.value;
    // Solo números
    if (!/^\d*$/.test(value)) return;
    // Convertimos a número para validar rango
    const num = Number(value);
    if (value === "" || (num >= 1 && num <= 99)) {
      setMinutes(value);
    }
  };

  const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCarnet({ bloqueo: checked, minutos: Number(minutes) }).then(() => {
      setMensaje("Configuración guardada correctamente.");
    }).catch((error) => {
      setError(error.message);
    })
  };

  useEffect(() => {
    getCarnet().then((data) => {
      setChecked(data.bloqueo);
      setMinutes(data.minutos.toString());
    }).catch((error) => {
      setError(error.message);
    });
  }, [])
  

  return (
    <Box p={3} display="flex" flexDirection="column" gap={3} component={'form'} onSubmit={onSumbit}>
      {/* Bloqueo */}
      <Box
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 2,
          width: "fit-content",
          minWidth: 320
        }}
      >
        <Typography variant="h6" gutterBottom>
          Bloqueo de carnet
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleSwitchChange}
            />
          }
          label={checked ? "Activado" : "Desactivado"}
        />
      </Box>
      {/* Tiempo */}
      <Box
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 2,
          width: "fit-content",
          minWidth: 320
        }}
      >
        <Typography variant="h6" gutterBottom>
          Tiempo de bloqueo de carnet
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          label="Minutos"
          value={minutes}
          onChange={handleMinutesChange}
          disabled={!checked}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 2
          }}
          helperText="Ingresá un valor entre 1 y 99 minutos"
          size="small"
        />
      </Box>
      <Button 
            disabled= {
                minutes.length === 0 ||
                !!mensaje
            }
            type="submit"
            variant="contained"
        >
            Guardar
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {mensaje && <Typography color="success">{mensaje}</Typography>}
    </Box>
  );
};

export default Carnet;