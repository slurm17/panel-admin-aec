import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Grid, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { VisuallyHiddenInput } from './styles/VisuallyHiddenInput';
import photoImg from '../../../assets/photo.png'
import type { Imagen } from '../../../types/Imagen';

interface ImagenDialogProps {
  open: boolean;
  onClose: () => void;
  imagen: Imagen
  onAccept: () => void
  setImagen: (img : Imagen) => void;
  setFile: (file: File | null) => void;
}

export default function ImagenDialog({ open, onClose, imagen, onAccept, setImagen, setFile } : ImagenDialogProps) {
    const nroOrden = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const [preview, setPreview] = useState<string | null>(null);
    useEffect(() => {
      setPreview(null);
    }, [open])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // 👀 Esto solo es para mostrar la vista previa
    setPreview(URL.createObjectURL(selectedFile));
  }
}

  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            // maxWidth: "none",
            padding: 1
          },
        }}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{fontWeight: 'bold'}} align='center' id="alert-dialog-title">
          {"IMAGEN"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid size={4} sx={{
              display: 'grid',
              placeItems: 'center',
              gap: 2
            }}>
              <img
                src={preview || imagen?.url || photoImg}
                alt={imagen?.titulo || "Sin título"}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: "cover",
                  borderRadius: 4
                }}
              />
              <Button
                sx={{textAlign: "center"}}
                component="label"
                variant="contained"
              >
                { 'id' in imagen ? 'Cambiar Imagen' : ' Seleccionar Imagen'}
              <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
              />
            </Button>
            </Grid>
            <Grid size={8} sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
                <TextField 
                  name='descripcion'
                  label='Descripción'
                  multiline
                  // maxRows={4}
                  rows={2}
                  variant="outlined"
                  fullWidth
                  value={imagen.descripcion}
                  onChange={(e) => setImagen({...imagen, descripcion: e.target.value}) }//|| setDescripcion(e.target.value)}
                />
                <FormControl component="fieldset" variant="standard">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography>Activa:</Typography>
                    <Stack direction="row" alignItems={"center"}>
                      <Typography>No</Typography>
                        <Switch 
                          name='activa'
                          checked={imagen.activa} 
                          onChange={(e) => setImagen({...imagen, activa: e.target.checked})} //|| setActiva(e.target.checked)}
                          />
                      <Typography>Si</Typography>
                    </Stack>
                  </Stack>
                </FormControl>
                <TextField
                  select
                  name='orden'
                  label="Posición"
                  variant="standard"
                  value={imagen.orden}
                  onChange={(e) => setImagen({...imagen, orden: e.target.value})} //|| setOrden(e.target.value ? Number(e.target.value) : '')}
                >
                    <MenuItem value="">-- Seleccionar --</MenuItem>
                    {nroOrden.map((nro) => (
                      <MenuItem key={nro} value={nro}>
                        {nro}
                      </MenuItem>
                    ))}
                </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onAccept} autoFocus>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
