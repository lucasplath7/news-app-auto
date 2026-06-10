import { Dialog as MUIDialog } from '@mui/material'

export function Dialog({ sx, ...props }) {
  return <MUIDialog sx={sx} {...props} />
}

export default Dialog

