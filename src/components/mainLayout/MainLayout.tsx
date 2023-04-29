import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

import { Header } from '@/components/header/Header.tsx'

export const MainLayout: FC = () => {
   return (
      <Container maxWidth={'lg'} sx={{ pt: 11, pb: 5 }}>
         <Header />
         <Outlet />
      </Container>
   )
}
