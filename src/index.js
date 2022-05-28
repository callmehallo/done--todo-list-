import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
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
  faPenToSquare
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <SectionProvider>
      <App />
    </SectionProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
