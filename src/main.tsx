import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'

import ScrollToTop from '@/hooks/ScrollToTop.ts'
import { Router } from '@/routes/Router'

import '@/styles/common.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <BrowserRouter>
         <SWRConfig value={{ provider: () => new Map() }}>
            <ScrollToTop />
            <Router />
         </SWRConfig>
      </BrowserRouter>
   </React.StrictMode>,
)
