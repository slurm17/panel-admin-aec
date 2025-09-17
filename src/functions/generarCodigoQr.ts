type TipoPase = 'diario' | 'socio' | 'invitado' | 'mantenimiento';

interface DatosQR {
  tipo: TipoPase;
  dni: string;
  fechaVencimiento: Date;
  id?: string; // solo para invitado
  fechaActual?: Date;
}

export function generarCodigoQR({ tipo, dni, fechaActual, fechaVencimiento, id }: DatosQR): string {
  // const fechaActual = new Date();
  const formatoFecha = (fecha: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dd = pad(fecha.getDate());
    const mm = pad(fecha.getMonth() + 1);
    const yyyy = fecha.getFullYear();
    const hh = pad(fecha.getHours());
    const min = pad(fecha.getMinutes());
    return `${dd}${mm}${yyyy}_${hh}${min}`;
  };
  const fechaActualStr = formatoFecha(fechaActual || new Date());
  const fechaVencStr = formatoFecha(fechaVencimiento);

  switch (tipo) {
    case 'diario':
      return `PASE-${dni}-${fechaActualStr}-${fechaVencStr}`;
    case 'socio':
      return `SOCIO-${dni}-${fechaActualStr}-${fechaVencStr}`;
    case 'invitado':
      if (!id) throw new Error('El ID es obligatorio para pases de invitado');
      return `INV-${dni}-${fechaActualStr}-${fechaVencStr}-${id}`;
    case 'mantenimiento':
      return `MAN-${dni}-${fechaActualStr}-${fechaVencStr}`;
    default:
      throw new Error('Tipo de pase no válido');
  }
}

// Ejemplo
// const codigoQR = generarCodigoQR({
//   tipo: 'invitado',
//   dni: '12345678',
//   fechaVencimiento: new Date(Date.now() + 2 * 60 * 60 * 1000),
//   id: 'INV001'
// });

// console.log(codigoQR);
