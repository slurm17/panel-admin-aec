import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useMemo, useState } from 'react';
import { getEvento, type Evento } from '../../api/eventos.api';
import { format } from 'date-fns';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, type SelectChangeEvent } from '@mui/material';
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
// import moment from "moment-timezone";
import { formatDate, formatTime } from './functions/fxDate';
// import { toZonedTime } from "date-fns-tz";
type FormValues = {
  inicioDate: Date | null;
  inicioTime: Date | null;
  finDate: Date | null;
  finTime: Date | null;
};

type FormValuesError = {
  inicioDate: string | null;
  inicioTime: string | null;
  finDate: string | null;
  finTime: string | null;
};
const columns: GridColDef[] = [
  { 
    field: 'nom_y_ap', 
    headerName: 'Nombre y Apellido', 
    width: 300,
    sortable: false,
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  { 
    field: 'documento', 
    headerName: 'Documento', 
    width: 100 
  },
  { 
    field: 'nro_socio', 
    headerName: 'Nro Socio', 
    width: 80 
  },
  {
    field: 'fecha_hora',
    headerName: 'Fecha',
    // type: 'number',
    width: 150,
    // Corrregir formato de fecha
    // valueGetter: (_, row) => {
    //     const zonedDate = toZonedTime(row.fecha_hora, "America/Argentina/Buenos_Aires");
    //     return format(zonedDate, "dd/MM/yyyy HH:mm");
    // },
    // valueGetter: (value, row) => moment.tz(row.fecha_hora, "America/Argentina/Buenos_Aires"),
    // valueGetter: (value, row) => moment(row.fecha_hora).format("DD/MM/YYYY HH:mm"),
    valueGetter: (_, row) => `${format(new Date(row.fecha_hora), "dd/MM/yyyy HH:mm")}`,
  },
  {
    field: 'tipo_pase',
    headerName: 'Tipo',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 120,
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  { 
    field: 'tipo', 
    headerName: 'Evento', 
    width: 80,
    valueGetter: (_, row) => `${row.tipo === 'E' ? 'Entrada' : row.tipo === 'S' ? 'Salida' : '-'}`,
  },
  { 
    field: 'mensaje', 
    headerName: 'Mensaje', 
    width: 500 
  }
];

const paginationModel = { page: 0, pageSize: 10 };
export default function DataTable() {
    const [dataTable, setDataTable] = useState<Evento[]>([]);
    const dataGrid = useMemo(() => (
        <Paper sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                density='compact'
                rows={dataTable}
                getRowId={(row) => `${row.nro_socio}-${row.fecha_hora}`}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 15]}
                sx={{ border: 0 }}
            />
        </Paper>
    ), [dataTable]);
    const [identificador, setIdentificador] = useState('');
    const [nomApellido, setNomApellido] = useState('');
    const [evento, setEvento] = useState('');
    const [tipo, setTipo] = useState('');
    // const [errorSumbit, setErrorSubmit] = useState<string | null>(null)
    const [error, setError] = useState<FormValuesError>({
        inicioDate: '',
        inicioTime: '',
        finDate: '',
        finTime: ''
    })
      const [values, setValues] = useState<FormValues>({
        inicioDate: null,
        inicioTime: null,
        finDate: null,
        finTime: null
    });
    const handleChangeEvento = (event: SelectChangeEvent) => {
        setEvento(event.target.value as string);
    };
    const handleChangeTipo = (event: SelectChangeEvent) => {
        setTipo(event.target.value as string);
    };
    const handlePickerChange = (field: keyof FormValues) => (newValue: Date | null) => {
        // setErrorSubmit(null)
        setValues({ ...values, [field]: newValue });
    };
    const handleSearch = async() => {
        try {
            const data = await getEvento({
                identificador: identificador || undefined,
                tipo_pase: tipo || undefined,
                tipo: evento || undefined,
                nom_y_ap: nomApellido || undefined,
                fecha_inicio: formatDate(values.inicioDate) || undefined,
                fecha_fin: formatDate(values.finDate) || undefined,
                hora_inicio: formatTime(values.inicioTime) || undefined,
                hora_fin: formatTime(values.finTime) || undefined,
                offset: 0
            })
            setDataTable(data)
        } catch (error) {
            console.log("🚀 ~ handleSearch ~ error:", error)
        }
        // console.log("🚀 ~ DataTable ~ evento:", evento)
        // console.log("🚀 ~ DataTable ~ tipo:", tipo)
        // console.log("🚀 ~ DataTable ~ data:", identificador)
        // console.log("🚀 ~ DataTable ~ data:", nomApellido)
        // console.log("🚀 ~ values iniH:", formatTime(values.inicioTime))
        // console.log("🚀 ~ values finH:", formatTime(values.finTime))
        // console.log("🚀 ~ values iniD:", formatDate(values.inicioDate))
        // console.log("🚀 ~ values finD:", formatDate(values.finDate))
    }
    
    // useEffect(() => {
    //     async function getFetchData() {
    //         try {
    //             // const data = await getEvento()
    //             // setDataTable(data)
    //             // console.log("🚀 ~ DataTable ~ data:", data)
    //         } catch (error) {
    //             console.log("🚀 ~ getFetchData ~ error:", error)
    //         }
    //     }
    //     getFetchData()
    // }, [])
    
  return (
    <>
    <Stack 
        direction="row" 
        alignItems="center" 
        mt={2}
        spacing={2}
    >
      <TextField
        size="small"
        slotProps={{
          htmlInput: {
            maxLength: 9
          }
        }}
        autoFocus
        label="DNI o Nro de Socio"
        value={identificador}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) setIdentificador(e.target.value);
        }}
      />
      <TextField
        size="small"
        value={nomApellido}
        slotProps={{
          htmlInput: {
            maxLength: 50
          }
        }}
        sx={{ width: 330 }}
        label="Nombre y/o Apellido"
        onChange={(e) => setNomApellido(e.target.value)}
      />
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Evento</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={evento}
          label="Evento"
          onChange={handleChangeEvento}
        >
          <MenuItem value={''}>Ambos</MenuItem>
          <MenuItem value={'E'}>Entrada</MenuItem>
          <MenuItem value={'S'}>Salida</MenuItem>
          {/* <MenuItem value={30}></MenuItem> */}
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tipo}
          label="Evento"
          onChange={handleChangeTipo}
        >
          <MenuItem value={''}>Todos</MenuItem>
          <MenuItem value={'socio'}>Socio</MenuItem>
          <MenuItem value={'diario'}>Diario</MenuItem>
          <MenuItem value={'invitado'}>Invitado</MenuItem>
          <MenuItem value={'mantenimiento'}>Mantenimiento</MenuItem>
          {/* <MenuItem value={30}></MenuItem> */}
        </Select>
      </FormControl>
    </Box>
    </Stack>
    <Stack 
        direction="row" 
        alignItems="center"
        // m={2}
        spacing={2}
    >
        <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
            <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                <Typography sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>Desde:</Typography> 
                <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                  <DesktopDatePicker 
                    // disablePast
                    label="Fecha"
                    disableFuture
                    onChange={handlePickerChange('inicioDate')}
                    value={values.inicioDate}
                    onError={(reason) => setError({ ...error, inicioDate: reason })} // 👈 acá captás el error
                    slotProps={{
                      textField: {
                        helperText: error.inicioDate ? "Fecha inválida" : "", // mostrar mensaje
                        size: "small",
                        sx: { width: 180 },
                      },
                    }}
                  />
                  <TimePicker
                    label="Hora"
                    onChange={handlePickerChange('inicioTime')}
                    value={values.inicioTime}
                    format="HH:mm"   // 👈 Fuerza formato 24hs
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: { width: 150 },
                      },
                    }}
                  />
                </Stack>
            </Stack>
            <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                <Typography sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>Hasta:</Typography>
                <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                  <DesktopDatePicker 
                    label="Fecha"
                    disableFuture 
                    onChange={handlePickerChange('finDate')}
                    onError={(reason) => setError({ ...error, finDate: reason })} // 👈 acá captás el error
                    slotProps={{
                      textField: {
                        helperText: error.finDate ? "Fecha inválida" : "", // mostrar mensaje
                        size: "small",
                        sx: { width: 180 },
                      },
                    }}
                  />
                  <TimePicker
                    label="Hora"
                    onChange={handlePickerChange('finTime')}
                    value={values.finTime}
                    format="HH:mm"   // 👈 Fuerza formato 24hs
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: { width: 150 },
                      },
                    }}
                  />
                </Stack>
            </Stack>
          </Stack>
    </Stack>
    <Button onClick={handleSearch} variant="contained">Buscar</Button>
    {dataGrid}
    {/* <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        density='compact'
        rows={dataTable}
        getRowId={(row) => `${row.nro_socio}-${row.fecha_hora}`}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper> */}
    </>
  );
}
