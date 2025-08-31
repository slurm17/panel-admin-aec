// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import { FormControl, Grid, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material';
// import { Texto } from 'types/Texto';

// interface TextoDialogProps {
//     onAccept: (texto: Texto) => void;
//     texto: Texto;
//     setTexto: (texto: Texto) => void;
//     onCancel: () => void
// }

// export default function TextoDialog({texto, onAccept, onCancel, setTexto} : TextoDialogProps) {
//   const nroOrden = [1,2,3,4,5,6,7,8,9,10];
//   const onSubmit = (_e: React.FormEventHandler<HTMLDivElement>) => { onAccept(texto)}
//   return (
//     <>
//       <Dialog
//         onSubmit={onSubmit}
//         component={"form"}
//         open={open}
//         maxWidth="sm"
//         sx={{
//           "& .MuiDialog-paper": {
//             width: "100%",
//             // maxWidth: "none",
//             padding: 1
//           },
//         }}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle sx={{fontWeight: 'bold'}} align='center' id="alert-dialog-title">
//           {"TEXTO"}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid size={12} sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 2
//             }}>
//                 <TextField 
//                   required
//                   name='contenido'
//                   label='Contenido'
//                   multiline
//                   // maxRows={4}
//                   rows={2}
//                   variant="outlined"
//                   fullWidth
//                   value={texto.contenido}
//                   onChange={(e) => setTexto({...texto, contenido: e.target.value})}
//                 />
//                 <FormControl component="fieldset" variant="standard">
//                   <Stack direction="row" spacing={2} alignItems="center">
//                     <Typography>Activo:</Typography>
//                     <Stack direction="row" alignItems={"center"}>
//                       <Typography>No</Typography>
//                         <Switch 
//                           name='activa'
//                           checked={texto.activo} 
//                           onChange={(e) => setTexto({...texto, activo: e.target.checked})} 
//                           />
//                       <Typography>Si</Typography>
//                     </Stack>
//                   </Stack>
//                 </FormControl>
//                 <TextField
//                   required
//                   select
//                   name='orden'
//                   label="Posición"
//                   variant="standard"
//                   value={texto.orden}
//                   onChange={(e) => setTexto({...texto, orden: e.target.value})} 
//                 >
//                     <MenuItem value="">-- Seleccionar --</MenuItem>
//                     {nroOrden.map((nro) => (
//                       <MenuItem key={nro} value={nro}>
//                         {nro}
//                       </MenuItem>
//                     ))}
//                 </TextField>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onCancel}>Cancelar</Button>
//           <Button onClick={onAcceptClick} autoFocus>Aceptar</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }