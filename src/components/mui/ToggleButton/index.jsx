import { ToggleButton as MUIToggleButton } from '@mui/material'

export function ToggleButton({ sx, ...props }) {
  return <MUIToggleButton sx={sx} {...props} />
}

export default ToggleButton

