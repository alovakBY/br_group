import { FC, memo } from 'react'
import { Alert, CircularProgress, Container, Stack } from '@mui/material'

import { useNews } from '@/hooks/useNews.ts'
import { NewsItem } from '@/pages/news/components/NewsItem/NewsItem'

export const News: FC = memo(() => {
   const { news, isLoading, error } = useNews()

   if (error) {
      return (
         <Alert severity="error" sx={{ mb: 1 }}>
            {error.message}
         </Alert>
      )
   }
   return (
      <Container maxWidth={'sm'}>
         {isLoading ? (
            <CircularProgress
               sx={{
                  position: 'absolute',
                  top: 'calc(50% - 20px)',
                  left: 'calc(50% - 20px)',
               }}
            />
         ) : (
            <Stack spacing={2}>
               {news && news.slice(0, 100).map((id) => <NewsItem key={id} id={id} />)}
            </Stack>
         )}
      </Container>
   )
})
