import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus,
  faEllipsisVertical,
  faFolderPlus,
  faTrashCan,
  faCalendar,
  faFlag,
  faAngleDown,
  faBars,
  faCalendarDay,
  faCircleCheck,
  faCircleXmark,
  faFolderMinus,
  faPenToSquare,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import { SectionProvider } from './components'

library.add(
  faPlus,
  faEllipsisVertical,
  faFolderPlus,
  faTrashCan,
  faCalendar,
  faFlag,
  faAngleDown,
  faBars,
  faCalendarDay,
  faCircleCheck,
  faCircleXmark,
  faFolderMinus,
  faPenToSquare,
  faEye,
  faEyeSlash
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <SectionProvider>
      <App />
    </SectionProvider>
  </React.StrictMode>
)
