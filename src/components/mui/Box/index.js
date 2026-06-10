import { Box as MUIBox } from '@mui/material'

export function Box({ sx, ...props }) {
  return <MUIBox sx={sx} {...props} />
}

export default Box

