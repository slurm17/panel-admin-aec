import { Card, CardContent, Divider, Stack, Typography } from "@mui/material"

interface Props {
    text: string,
    children: React.ReactNode
}

// const estadoMap: Record<string | number, string> = {
//   0: "REGULAR (0)",
//   2: "BAJA (2)",
//   5: "TEMPORAL (5)",
// };


const PanelBotones = ({children, text}: Props) => {
  return (
    <Card sx={{ borderRadius: 3, maxWidth: 300, boxShadow: 3, p: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {text}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Stack spacing={1.5}>
            {children}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PanelBotones