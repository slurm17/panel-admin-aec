import { TableBody, TableCell, TableRow, Button, TableContainer, Table, TableHead, Paper, Radio } from "@mui/material";
import type { ImpresoraConId } from "../../../types/Impresora";

type Props = {
  impresoras: ImpresoraConId[];
  openModalEdit: (impresora: ImpresoraConId) => void,
  openModalDelete: (impresora: ImpresoraConId) => void,
  impresoraActiva: ImpresoraConId | null,
  setImpresoraActiva: (impresora: ImpresoraConId | null) => void
//   onEdit: (txt : TextoConId) => void;
//   onDelete : (id: number) => void
}

const TableImpresora = ({ impresoras, openModalEdit, openModalDelete, impresoraActiva, setImpresoraActiva }: Props) => {
return (
  <TableContainer sx={(theme) => ({ maxWidth: theme.breakpoints.values.md })} component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="center">ip</TableCell>
            <TableCell align="center">Puerto</TableCell>
            <TableCell>Activa</TableCell>
            <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {impresoras.map((impresora) => (
          <TableRow key={impresora.id}>
            <TableCell>{impresora.nombre || "-"}</TableCell>
            <TableCell align="center">
                {impresora.ip || ''}
            </TableCell>
            <TableCell align="center">
                {impresora.puerto || '-'}
            </TableCell>
            <TableCell>
              {/* <Checkbox disabled checked /> */}
              <Radio
                checked={impresoraActiva?.id === impresora.id}
                onChange={() => setImpresoraActiva(impresora)}
              />
            </TableCell>
            <TableCell>
              <Button sx={{mr: 1}} onClick={() => {openModalEdit(impresora)}} variant="contained" color="warning">
                Editar
              </Button> 
              <Button onClick={() => {openModalDelete(impresora)}} variant="contained" color="error">
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

export default TableImpresora;
