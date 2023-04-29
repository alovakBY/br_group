import { Route, Routes } from 'react-router'

import { MainLayout } from '@/components/mainLayout/MainLayout.tsx'
import { ROUTE_NAMES } from '@/constants/routeNames.ts'
import { News } from '@/pages/news/News'
import { NewsItemDetails } from '@/pages/newsItemDetails/NewsItemDetails'

export const Router = () => {
   return (
      <Routes>
         <Route path={ROUTE_NAMES.HOME} element={<MainLayout />}>
            <Route path={ROUTE_NAMES.HOME} element={<News />} />
            <Route path={ROUTE_NAMES.NEWS_DETAILS} element={<NewsItemDetails />} />
         </Route>
      </Routes>
   )
}
