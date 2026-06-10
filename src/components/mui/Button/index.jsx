import { Button as MUIButton } from '@mui/material'

const defaultSx = {
  minHeight: '44px',
  textTransform: 'none',
}

export function Button({ sx, ...props }) {
  return <MUIButton sx={{ ...defaultSx, ...sx }} {...props} />
}

export default Button

