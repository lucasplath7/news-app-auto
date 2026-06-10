import { Chip as MUIChip } from '@mui/material'

const defaultSx = {
  height: '36px',
  minWidth: '44px',
}

export function Chip({ sx, ...props }) {
  return <MUIChip sx={{ ...defaultSx, ...sx }} {...props} />
}

export default Chip

