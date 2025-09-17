import { Alert, Box, Button } from "@mui/material";
import { createTexto, deleteTexto, getTextos, updateTexto } from "../../../api/texto.api";
import { useEffect, useState } from "react";
import type { Texto, TextoConId } from "./../../../types/Texto";
import TextoTable from "./TextoTable";
import TextoAddEdit from "./TextoAddEdit";
import { useConfirm } from "material-ui-confirm";

const INITIAL_TEXT: Texto = {
  contenido: "",
  activo: true,
  orden: ''
};

const Textos = () => {
  const confirm = useConfirm();
  const [textos, setTextos] = useState<TextoConId[]>([])
  const [texto, setTexto] = useState<Texto>(INITIAL_TEXT);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewAddEditText, setViewAddEditText] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getTextos();
            setTextos(data);
        } catch (err) {
            setError('Error al cargar los textos');
            console.error("Error fetching textos:", err);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);


  const onDelete = async (id: number) => {
    const { confirmed } = await confirm({
      title: 'Eliminar texto',
      description: '¿Estás seguro de que querés borrar este texto?',
      confirmationText: 'Eliminar',
      cancellationText: 'Cancelar',
    })
    if (confirmed) {
      try {
          await deleteTexto(id);
          await getTextos().then(setTextos);
      } catch (err) {
          setError('Error al eliminar la imagen');
          alert(JSON.stringify(err) || err);
          console.error("Error deleting image:", err);
      }
    }
  }
  
  const onEdit = (txt: TextoConId) => {
      setTexto(txt);
      setViewAddEditText(true);
  }
  
  const onCancel = () => {
      setViewAddEditText(false);
  };
  
  const handleAccept = async (txt: Texto) => {
        if (!txt.contenido) {
            console.error("El contenido es obligatorio");
            return;
        }
        if (!txt.orden) {
            console.error("La posición es obligatoria");
            return;
        }
      try {
        if ("id" in txt) {
        // acá txt es TextoConId
        await updateTexto(txt.id, txt);
        } else {
        // acá txt es TextoBase
        await createTexto(txt);
        }
        setTextos(await getTextos());
        setViewAddEditText(false);
    } catch (error) {
        alert(JSON.stringify(error) || String(error));
    }
}
  
  if (loading) {
      return <Box>Cargando textos...</Box>;
  }
  if (error) {
      return <Box color="error.main">{error}</Box>;
  }
  return (
    <>
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
           { !viewAddEditText && <Button
                variant="contained"
                onClick={() => {
                    setTexto(INITIAL_TEXT); 
                    setViewAddEditText(true);
                }}
                >
                Agregar Texto
            </Button>}
           {!viewAddEditText && (
                textos.length > 0 ? 
                    <TextoTable 
                        textos={textos} 
                        onEdit={onEdit} 
                        onDelete={onDelete} 
                    /> : 
                    <Alert severity="info">No hay textos para mostrar</Alert>
            )}
            {viewAddEditText && 
                <TextoAddEdit
                    texto={texto}
                    setTexto={setTexto}
                    onCancel={onCancel}
                    onAccept={handleAccept}
                />
            }
        </Box>
    </>
  )
}

export default Textos