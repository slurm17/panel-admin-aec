import { Alert, Box, Button } from "@mui/material"
import TableImpresora from "./TableImpresora"
import { useEffect, useState } from "react"
import { createImpresora, deleteImpresora, getImpresoras, updateImpresora } from "../../../api/impresora.api"
import type { ImpresoraConId } from "../../../types/Impresora"
import FormDialogImpresora from "./FormDialogImpresora"
import { useImpresoraStore } from "../../../store/impresoraStore"

const impresoraVacia: ImpresoraConId = {
    id: 0,
    nombre: "",
    ip: "",
    puerto: ""
};

const Impresoras = () => {
    const [impresoras, setImpresoras] = useState<ImpresoraConId[]>([])
    const [impresora, setImpresora] = useState<ImpresoraConId>(impresoraVacia)
    const [open, setOpen] = useState(false);
    const [isDeletePrint, setIsDeletePrint] = useState(false);
    const [error, setError] = useState('');
    // const [impresoraActiva, setImpresoraActiva] = useState<number | null>(null);
    const { setImpresoraActiva } = useImpresoraStore();
    const impresoraActiva = useImpresoraStore((s) => s.impresoraActiva);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const openModalEdit = (impresora: ImpresoraConId) => {
        setOpen(true);
        setImpresora(impresora);
    };
    const openModalDelete = (impresora: ImpresoraConId) => {
        setOpen(true);
        setIsDeletePrint(true);
        setImpresora(impresora);
    }
    const handleClose = () => {
        setOpen(false);
        setImpresora(impresoraVacia);
        setIsDeletePrint(false);
    };
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isDeletePrint){
            if(impresora.id === 0) {
                await agregarImpresora();
            } else {
                await guardarImpresora();
            }
        } else {
            await eliminarImpresora();
        }
        handleClose();
        fetchImpresoras();
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setImpresora({ ...impresora, [name]: value })
    }
    const eliminarImpresora = async () => {
        try {
            await deleteImpresora( impresora.id );
            if(impresoraActiva?.id === impresora.id) {
                setImpresoraActiva(null);
            }
        } catch (error) {
            console.error("Error creating impresora:", error)
            setError('Error al eliminar la impresora')
        }
    }
    const agregarImpresora = async () => {
        try {
            await createImpresora(impresora);
        } catch (error) {
            console.error("Error creating impresora:", error)
            setError('Error al agregar la impresora')
        }
    }
    const guardarImpresora = async () => {
        try {
            await updateImpresora( impresora.id, impresora );
            if(impresoraActiva?.id === impresora.id) {
                setImpresoraActiva(impresora);
            }
        } catch (error) {
            console.error("Error creating impresora:", error)
            setError('Error al guardar la impresora')
        }
    }
    const fetchImpresoras = async () => {
        try {
            const data = await getImpresoras()
            setImpresoras(data)                
        } catch (error) {
            console.error("Error fetching impresoras:", error)
            setError('Error al cargar las impresoras')
        }
    }
    useEffect(() => {
        fetchImpresoras()
    }, [])

  return (
    <Box sx={{
        display: 'flex',
        padding: 2,
        gap: 2,
        flexDirection: 'column'
    }}>
        <Button variant="contained" onClick={handleClickOpen}>
            Agregar Impresora
        </Button>
        <TableImpresora 
            impresoras={impresoras} 
            openModalEdit={openModalEdit}
            openModalDelete={openModalDelete}
            impresoraActiva={impresoraActiva}
            setImpresoraActiva={setImpresoraActiva}
        />
        <FormDialogImpresora 
            open={open} 
            impresora={impresora}
            handleClose={handleClose} 
            onSubmit={onSubmit}
            handleChange={handleChange}
            isDeletePrint={isDeletePrint}
        />
        {error && <Alert severity="error">{error}</Alert>}
    </Box>
  )
}

export default Impresoras