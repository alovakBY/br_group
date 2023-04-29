import api from '@/api/config'
import { INewsItemResponse } from '@/types'

export const getNews = async () => {
   const { data } = await api.get<number[]>('newstories.json')

   return data
}

export const getNewsItem = async (id: string) => {
   const { data } = await api.get<INewsItemResponse>(`item/${id}.json`)

   return data
}
