import { CircularProgress as MUICircularProgress } from '@mui/material'

export function CircularProgress({ sx, ...props }) {
  return <MUICircularProgress sx={sx} {...props} />
}

export default CircularProgress

