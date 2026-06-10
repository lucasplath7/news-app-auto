import { ToggleButtonGroup as MUIToggleButtonGroup } from '@mui/material'

const defaultSx = {
  '& .MuiToggleButton-root': {
    px: { xs: 2, sm: 3 },
    py: 0.75,
    fontSize: { xs: '0.75rem', sm: '0.8rem' },
    textTransform: 'none',
    letterSpacing: '0.2px',
    minHeight: '44px',
  },
}

export function ToggleButtonGroup({ sx, ...props }) {
  return <MUIToggleButtonGroup sx={{ ...defaultSx, ...sx }} {...props} />
}

export default ToggleButtonGroup

