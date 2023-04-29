import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import { Alert, Box, Card, CardActionArea, CardContent, Skeleton, Typography } from '@mui/material'
import useSWR from 'swr'

import { getDate } from '@/helpers'
import { getNewsItem } from '@/services/newsService'

interface IState {
   id: number
}

export const NewsItem: FC<IState> = memo(({ id }) => {
   const { data, error, isLoading } = useSWR(id ? `${id}` : null, (keyId) => getNewsItem(keyId), {
      revalidateIfStale: false,
      revalidateOnFocus: false,
   })

   if (isLoading) {
      return (
         <Card>
            <CardContent>
               <Skeleton variant="text" sx={{ fontSize: '2rem', mb: 2 }} />
               <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 2 }} />
               <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </CardContent>
         </Card>
      )
   }

   if (error) {
      return (
         <Alert severity="error" sx={{ mb: 1 }}>
            {error.message}
         </Alert>
      )
   }

   if (!data) {
      return null
   }

   const date = data?.time ? getDate(data?.time) : ''

   return (
      <Link to={`/${id}`}>
         <Card>
            <CardActionArea>
               <CardContent>
                  <Typography
                     sx={{
                        fontSize: 20,
                        mb: 2,
                        fontWeight: 'bold',
                        lineHeight: '1.3',
                     }}
                     component="div"
                  >
                     {data?.title}
                  </Typography>

                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                     }}
                  >
                     <Typography
                        component="div"
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           gap: 1,
                           fontWeight: 'bold',
                        }}
                        color={'green'}
                     >
                        <ThumbUpOffAltIcon />
                        {data?.score}
                     </Typography>

                     <Typography
                        component="div"
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           gap: 1,
                           fontWeight: 'bold',
                        }}
                        color={'secondary'}
                     >
                        <ChatBubbleOutlineIcon />
                        {data?.kids?.length || 0}
                     </Typography>
                  </Box>

                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                     }}
                  >
                     <Typography color={'primary'}>{data?.by}</Typography>

                     <Typography color="text.secondary">{date}</Typography>
                  </Box>
               </CardContent>
            </CardActionArea>
         </Card>
      </Link>
   )
})
