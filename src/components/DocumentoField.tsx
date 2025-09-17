import { TextField, type TextFieldProps } from "@mui/material";
import { useState } from "react";

type DocumentoFieldProps = Omit<TextFieldProps, "value" | "onChange"> & {
  value?: string;
  onChange?: (value: string) => void;
};

// Función para mostrar puntos de miles
const formatNumber = (value: string) => {
  if (!value) return "";
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Función para limpiar los puntos
const cleanNumber = (value: string) => {
  return value.replace(/\./g, "");
};

export const DocumentoField: React.FC<DocumentoFieldProps> = ({
  value = "",
  onChange,
  ...props
}) => {
  const [innerValue, setInnerValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = cleanNumber(e.target.value);
    // Solo permitir números
    if (!/^\d*$/.test(rawValue)) return;
    if(rawValue.length > 9) return
    setInnerValue(rawValue);
    onChange?.(rawValue); // devolvemos el valor sin puntos al padre
  };

  return (
    <TextField
      {...props}
      // implementar reestriccion de digitos
      value={formatNumber(innerValue)}
      onChange={handleChange}
    />
  );
}; 
