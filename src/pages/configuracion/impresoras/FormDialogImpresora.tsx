import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import type { ImpresoraConId } from '../../../types/Impresora';

type Props = {
  handleClose: () => void,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  open: boolean,
  isDeletePrint: boolean
  impresora: ImpresoraConId,
}

export default function FormDialogImpresora( props: Props ) {
  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleClose} maxWidth="sm">
        <DialogTitle>Impresora</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{
            display: 'flex',
            gap: 1.5,
            flexDirection: 'column',
            width: '100%',
            minWidth: '300px',
            marginTop: 1
          }} onSubmit={props.onSubmit} id="subscription-form">
            <TextField
                color='primary'
                required
                name="nombre"
                slotProps={{
                  input: {
                    readOnly: props.isDeletePrint,
                  },
                }}
                label="Nombre"
                type="text"
                variant="outlined"
                fullWidth
                onChange={props.handleChange}
                value={props.impresora?.nombre || ''}
            />
            <TextField
                color='primary'
                required
                slotProps={{
                  input: {
                    readOnly: props.isDeletePrint,
                  },
                }}
                name="ip"
                label="ip"
                type="text"
                onChange={props.handleChange}
                fullWidth
                variant="outlined"
                value= {props.impresora?.ip || ''}
            />
            <TextField
                color='primary'
                required
                slotProps={{
                  input: {
                    readOnly: props.isDeletePrint,
                  },
                }}
                name="puerto"
                onChange={props.handleChange}
                label="Puerto"
                type="text"
                fullWidth
                variant="outlined"
                value={props.impresora?.puerto || ''}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} variant='contained'>
            Cancelar
          </Button>
          <Button type="submit" variant='contained' form="subscription-form"
          >
            { props.isDeletePrint ? 'Borrar' : props.impresora.id ? 'Guardar' : 'Agregar' }
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
