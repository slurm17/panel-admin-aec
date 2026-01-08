import { Alert, Button, type ButtonProps } from "@mui/material";

type Props = ButtonProps & {
  puerto?: string,
  ip?: string
};

const ImprimirButton = ({ children, puerto, ip, ...rest }: Props) => {
  return (
    <>
      <Button {...rest}>
        {children}
      </Button>
      { !puerto && !ip &&
        <Alert severity="error" >
          Seleccione una impresora desde la configuración para poder imprimir.
        </Alert>
      }
    </>
  );
};

export default ImprimirButton;
