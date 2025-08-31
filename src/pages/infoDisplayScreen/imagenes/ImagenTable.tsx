import { TableBody, TableCell, TableRow, Button, TableContainer, Table, TableHead, Paper } from "@mui/material";
import type { ImagenConId } from "../../../types/Imagen";

type Props = {
  imagenes: ImagenConId[];
  onEdit: (img : ImagenConId, urlImg: string) => void;
  onDelete : (id: number) => void
}

const ImagenTable = ({ imagenes, onDelete, onEdit }: Props) => {
const urlImg = import.meta.env.VITE_URL_IMAGES || '';
return (
  <TableContainer sx={(theme) => ({ maxWidth: theme.breakpoints.values.md })} component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
            <TableCell>Imagen</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="center">Activa</TableCell>
            <TableCell align="center">Orden</TableCell>
            <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {imagenes.map((img) => (
          <TableRow key={img.id}>
            <TableCell>
              <img
                src={`${urlImg}${img.url}`}
                alt={img.titulo || "Sin título"}
                style={{
                  width: 120,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 4
                }}
              />
            </TableCell>
            <TableCell>{img.descripcion || "-"}</TableCell>
            <TableCell align="center">
                {img.activa ? 'Si' : 'No'}
            </TableCell>
            <TableCell align="center">
                {img.orden || '-'}
            </TableCell>
            <TableCell>
              <Button sx={{mr: 1}} onClick={() => onEdit(img, urlImg)} variant="contained" color="warning">
                Editar
              </Button> 
              <Button onClick={() => onDelete(img.id)} variant="contained" color="error">
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

export default ImagenTable;
