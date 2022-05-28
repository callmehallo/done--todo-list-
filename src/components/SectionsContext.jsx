import React, { useContext, useReducer, useState, useEffect } from 'react'
import { getInitialValue, ACTIONS, reducer } from './index'

const SectionContext = React.createContext()

const useSections = () => useContext(SectionContext)

const SectionProvider = ({ children }) => {
  const [sections, dispatch] = useReducer(reducer, getInitialValue())

  const [selectTask, setSelectTask] = useState(false)

  const handleSelectTask = () => setSelectTask(selected => !selected)

  const deleteSelectedTask = e => {
    const { key, sectionKey } = {
      key: e.target.id,
      sectionKey: e.target.getAttribute('sectionkey'),
    }
    if (!key || !sectionKey) return setSelectTask(selected => !selected)
    dispatch({ type: ACTIONS.DELETE_TASK, payload: { sectionKey, key } })
  }

  useEffect(() => {
    if (!selectTask) return
    window.addEventListener('mousedown', deleteSelectedTask)

    return () => {
      window.removeEventListener('mousedown', deleteSelectedTask)
    }
  }, [selectTask])

  useEffect(() => {
    localStorage.setItem('sections', JSON.stringify(sections))
  }, [sections])

  return (
    <SectionContext.Provider
      value={{
        sections,
        dispatch,
        selectTask,
        handleSelectTask,
      }}
    >
      {children}
    </SectionContext.Provider>
  )
}
export { SectionProvider, useSections }
