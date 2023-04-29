import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@mui/material'

import { RightColumn } from '@/components/header/components/RightColumn.tsx'
import { ROUTE_NAMES } from '@/constants/routeNames.ts'
export const Header = () => {
   return (
      <AppBar color="default">
         <Toolbar>
            <Typography
               variant="h6"
               component="div"
               sx={{
                  flexGrow: 1,
                  fontSize: '27px',
                  fontWeight: 'bold',
               }}
            >
               <Link to={ROUTE_NAMES.HOME}>BR Group</Link>
            </Typography>

            <RightColumn />
         </Toolbar>
      </AppBar>
   )
}
