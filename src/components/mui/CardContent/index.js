import { CardContent as MUICardContent } from '@mui/material'

const defaultSx = {
  p: { xs: 2, sm: 3 },
  '&:last-child': { pb: { xs: 2, sm: 3 } },
}

export function CardContent({ sx, ...props }) {
  return <MUICardContent sx={{ ...defaultSx, ...sx }} {...props} />
}

export default CardContent

