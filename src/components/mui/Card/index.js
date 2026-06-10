import { Card as MUICard } from '@mui/material'

const defaultSx = {
  backgroundColor: 'background.paper',
  borderColor: 'divider',
  borderRadius: 2,
  transition: 'border-color 0.2s ease',
  '&:hover': {
    borderColor: 'primary.main',
  },
}

export function Card({ sx, ...props }) {
  return <MUICard sx={{ ...defaultSx, ...sx }} {...props} />
}

export default Card

