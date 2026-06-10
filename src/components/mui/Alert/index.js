import { Alert as MUIAlert } from '@mui/material'

const defaultSx = {
  borderRadius: 2,
}

export function Alert({ sx, ...props }) {
  return <MUIAlert sx={{ ...defaultSx, ...sx }} {...props} />
}

export default Alert

