import { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import RefreshIcon from '@mui/icons-material/Refresh'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import { Button } from '@mui/material'
import { useSWRConfig } from 'swr'

import { ROUTE_NAMES } from '@/constants/routeNames.ts'
import { SWR_KEYS } from '@/constants/swrKeys.ts'

export const RightColumn = () => {
   const [isLoading, setIsLoading] = useState(false)

   const router = useParams()
   const { mutate } = useSWRConfig()

   if (router.newsItemId) {
      return (
         <Fragment>
            <Link to={ROUTE_NAMES.HOME}>
               <Button color="primary" variant="contained" startIcon={<ChevronLeftIcon />}>
                  back
               </Button>
            </Link>
         </Fragment>
      )
   }

   return (
      <div>
         {isLoading ? (
            <LoadingButton
               endIcon={<SaveIcon />}
               loading={isLoading}
               loadingPosition="end"
               variant="contained"
            >
               <span>refresh news</span>
            </LoadingButton>
         ) : (
            <Button
               color="primary"
               variant="contained"
               endIcon={<RefreshIcon />}
               onClick={() => {
                  setIsLoading(true)
                  return mutate(SWR_KEYS.NEWS_KEY).finally(() => setIsLoading(false))
               }}
            >
               refresh news
            </Button>
         )}
      </div>
   )
}
