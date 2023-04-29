import { AxiosError } from 'axios'
import useSWR from 'swr'

import { SWR_KEYS } from '@/constants/swrKeys.ts'
import { getNews } from '@/services/newsService.ts'

export const useNews = () => {
   const { data, error, isLoading } = useSWR<number[], AxiosError>(SWR_KEYS.NEWS_KEY, getNews, {
      refreshInterval: 60000,
      revalidateIfStale: false,
      revalidateOnFocus: false,
   })

   return {
      news: data,
      error,
      isLoading,
   }
}
