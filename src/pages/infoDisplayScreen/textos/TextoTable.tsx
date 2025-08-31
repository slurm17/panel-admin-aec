import { TableBody, TableCell, TableRow, Button, TableContainer, Table, TableHead, Paper } from "@mui/material";
import type { TextoConId } from "../../../types/Texto";

type Props = {
  textos: TextoConId[];
  onEdit: (txt : TextoConId) => void;
  onDelete : (id: number) => void
}

const TextoTable = ({ textos, onDelete, onEdit }: Props) => {
return (
  <TableContainer sx={(theme) => ({ maxWidth: theme.breakpoints.values.md })} component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="center">Activo</TableCell>
            <TableCell align="center">Orden</TableCell>
            <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {textos.map((txt) => (
          <TableRow key={txt.id}>
            <TableCell>{txt.contenido || "-"}</TableCell>
            <TableCell align="center">
                {txt.activo ? 'Si' : 'No'}
            </TableCell>
            <TableCell align="center">
                {txt.orden || '-'}
            </TableCell>
            <TableCell>
              <Button sx={{mr: 1}} onClick={() => onEdit(txt)} variant="contained" color="warning">
                Editar
              </Button> 
              <Button onClick={() => onDelete(txt.id)} variant="contained" color="error">
                Borrar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer> 
  );
};

export default TextoTable;
