import { memo } from 'react'
import { useParams } from 'react-router-dom'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import HttpIcon from '@mui/icons-material/Http'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Alert, Box, Button, Paper, Skeleton, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import useSWR from 'swr'

import { getDate } from '@/helpers'
import { Comment } from '@/pages/newsItemDetails/components/comment/Comment.tsx'
import { getNewsItem } from '@/services/newsService.ts'
import { INewsItemResponse } from '@/types'

export const NewsItemDetails = memo(() => {
   const { newsItemId } = useParams()

   const { data, error, isLoading, mutate } = useSWR<INewsItemResponse, AxiosError>(
      newsItemId ? newsItemId : null,
      (newsItemId) => getNewsItem(newsItemId),
      {
         revalidateIfStale: false,
         revalidateOnFocus: false,
      },
   )

   if (error) {
      return (
         <Alert severity="error" sx={{ mb: 1 }}>
            {error.message}
         </Alert>
      )
   }

   if (isLoading) {
      return (
         <Paper elevation={3} sx={{ p: 3 }}>
            <Skeleton variant="text" sx={{ fontSize: '3rem', mb: 3 }} />

            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  mt: 2,
                  mb: 2,
               }}
            >
               <Skeleton variant="text" sx={{ fontSize: '2rem', mb: 2, width: '70px' }} />
               <Skeleton variant="text" sx={{ fontSize: '2rem', mb: 2, width: '130px' }} />
            </Box>
            <Skeleton
               variant="text"
               sx={{ fontSize: '1rem', ml: 'auto', maxWidth: '100px', mb: 2 }}
            />
         </Paper>
      )
   }

   if (!data) {
      return null
   }

   const date = data?.time ? getDate(data?.time) : ''

   return (
      <Paper elevation={3} sx={{ p: 3 }}>
         <Typography gutterBottom variant="h3" component="div">
            {data.title}
         </Typography>

         {data.url && (
            <a href={data.url} target="_blank" rel="noreferrer">
               <Button size="large" color="primary">
                  <HttpIcon fontSize="large" color="primary" />
               </Button>
            </a>
         )}

         <Box
            sx={{
               display: 'flex',
               alignItems: 'flex-end',
               justifyContent: 'space-between',
               mt: 2,
               mb: 2,
            }}
         >
            <Typography variant="h6">{data.by}</Typography>
            <Typography variant="overline" display="block">
               {date}
            </Typography>
         </Box>

         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'flex-end',
               gap: '10px',
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
               color={'secondary'}
            >
               <ChatBubbleOutlineIcon />
               {data?.kids?.length || 0}
            </Typography>

            <Button color="secondary" onClick={() => mutate()}>
               <RefreshIcon />
            </Button>
         </Box>

         {data.kids &&
            data.kids.map((commentId) => {
               return <Comment key={commentId} id={commentId} />
            })}
      </Paper>
   )
})
