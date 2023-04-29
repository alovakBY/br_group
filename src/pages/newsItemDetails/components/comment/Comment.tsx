import { FC, Fragment, memo, useState } from 'react'
import {
   Alert,
   Box,
   Button,
   Card,
   CardActions,
   CardContent,
   Skeleton,
   Typography,
} from '@mui/material'
import useSWR from 'swr'

import { getDate } from '@/helpers'
import { getNewsItem } from '@/services/newsService.ts'

export const Comment: FC<{ id: number }> = memo(({ id }) => {
   const [open, setOpen] = useState(false)
   const { data, error, isLoading } = useSWR(id ? `${id}` : null, (keyId) => getNewsItem(keyId), {
      revalidateIfStale: false,
      revalidateOnFocus: false,
   })

   if (error) {
      return (
         <Alert severity="error" sx={{ mb: 1 }}>
            {error.message}
         </Alert>
      )
   }

   if (isLoading) {
      return (
         <Card sx={{ mt: 2, p: 3, backgroundColor: '#d3b2d936' }}>
            <CardContent>
               <Skeleton variant="text" sx={{ fontSize: '2rem', mb: 2 }} />
               <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
               <Skeleton variant="text" sx={{ fontSize: '1rem', maxWidth: '80%' }} />
               <Skeleton variant="text" sx={{ fontSize: '1rem', maxWidth: '90%' }} />
               <Skeleton variant="text" sx={{ fontSize: '1rem', maxWidth: '20%' }} />
            </CardContent>
         </Card>
      )
   }

   if (!data) {
      return null
   }

   const date = data?.time ? getDate(data?.time) : ''

   return (
      <div className="comment-item">
         <Card sx={{ mt: 2, p: 3, backgroundColor: '#d3b2d936' }} onClick={() => setOpen(!open)}>
            {data.deleted ? (
               <Typography variant="body2" color="error">
                  Comment has been deleted
               </Typography>
            ) : (
               <Fragment>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                     <Typography variant="h6">{data.by}</Typography>

                     <Typography variant="body2">{date}</Typography>
                  </Box>
                  <Typography variant="body2">
                     <span dangerouslySetInnerHTML={{ __html: data.text ? data.text : '' }} />
                  </Typography>
               </Fragment>
            )}

            {data.kids
               ? !open && (
                    <CardActions>
                       <Button size="small" color="primary" sx={{ ml: 'auto' }}>
                          show nested comments
                       </Button>
                    </CardActions>
                 )
               : null}
         </Card>

         <Box sx={{ pl: 10 }}>
            {open &&
               data.kids &&
               data.kids.map((id) => {
                  return <Comment id={id} key={id} />
               })}
         </Box>
      </div>
   )
})
