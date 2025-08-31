import { Alert, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { createImagen, deleteImagen, getImagenes, updateImagen, } from "../../../api/imagen.api";
import ImagenTable from "./ImagenTable";
import ImagenDialog from "./ImagenDialog";
import { useConfirm } from "material-ui-confirm";
import type { Imagen, ImagenConId } from "../../../types/Imagen";

const INITIAL_IMAGEN: Imagen = {
    url: '',
    titulo: '',
    descripcion: '',
    activa: true,
    orden: ''
}

const Imagenes = () => {
    const [imagenes, setImagenes] = useState<ImagenConId[]>([])
    const [imagen, setImagen] = useState<Imagen>(INITIAL_IMAGEN);
    const [imgUrl, setImgUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const confirm = useConfirm();
    const onDelete = async (id: number) => {

        const { confirmed } = await confirm({
            title: 'Eliminar imagen',
            description: '¿Estás seguro de que querés borrar esta imagen?',
            confirmationText: 'Eliminar',
            cancellationText: 'Cancelar',
        })
    if (confirmed) {
        try {
            await deleteImagen(id);
            await getImagenes().then(setImagenes);
        } catch (err) {
            setError('Error al eliminar la imagen');
            alert(JSON.stringify(err) || err);
            console.error("Error deleting image:", err);
        }
    }
    }

    const onEdit = (img: Imagen, urlImg: string) => {
        setImagen({
            ...img,
            url: `${urlImg}${img.url}`
        });
        setImgUrl(img.url);
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
  };

    const onAccept = async () => {
        try {
            if ("id" in imagen) {
            await updateImagen(imagen, file, imgUrl);
            } else {
            await createImagen(imagen, file);
            }
            await getImagenes().then(setImagenes);
        } catch (error) {
            alert(JSON.stringify(error) || error);
        }
        setOpen(false);
     }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getImagenes();
                setImagenes(data);
            } catch (err) {
                setError('Error al cargar las imágenes');
                console.error("Error fetching images:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <Box>Cargando imágenes...</Box>;
    }
    if (error) {
        return <Box color="error.main">{error}</Box>;
    }
    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
                variant="contained"
                onClick={() => {setImagen(INITIAL_IMAGEN); setOpen(true)}}
            >
                Agregar Imagen
            </Button>
            { imagenes.length > 0 ? 
                <ImagenTable 
                    imagenes={imagenes} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                /> : 
                <Alert severity="info">No hay imágenes para mostrar</Alert>
            }
            <ImagenDialog 
                open={open}
                imagen={imagen}
                setImagen={setImagen}
                onClose={onClose}
                onAccept={onAccept}
                setFile={setFile}
            />
        </Box>
    );
};

export default Imagenes;