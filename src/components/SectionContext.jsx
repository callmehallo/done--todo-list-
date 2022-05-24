import React, { useContext, useReducer, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import produce from 'immer'

const SectionContext = React.createContext()

const useSections = () => useContext(SectionContext)

const ACTIONS = {
  ADD_TASK: 'addTask',
  EDIT_TASK: 'editTask',
  DELETE_TASK: 'deleteTask',
  RESTORE_TASK: 'restoreTask',
  ADD_SECTION: 'addSection',
  EDIT_SECTION: 'editSection',
  DELETE_SECTION: 'deleteSection',
  RESTORE_SECTION: 'restoreSection',
}

const section = ({ section }) => ({
  section,
  key: uuidv4(),
  tasks: [],
})

const task = ({
  title,
  description = '',
  date = null,
  flagged = false,
  done = false,
  sectionKey,
}) => ({
  title,
  description,
  date,
  flagged,
  done,
  key: uuidv4(),
  sectionKey,
})

const setInitialValue = () =>
  localStorage.getItem('sections')
    ? JSON.parse(localStorage.getItem('sections'))
    : [section('General')]

const SectionProvider = ({ children }) => {
  const [isTaskClicked, setTaskClicked] = useState(false)

  const [sections, dispatch] = useReducer(
    produce((draft, action) => {
      switch (action.type) {
        case ACTIONS.ADD_TASK:
          draft
            .find(section => section.key === action.payload.sectionKey)
            .tasks.push(task(action.payload))

          break

        case ACTIONS.EDIT_TASK:
          draft
            .find(section => section.key === action.payload.sectionKey)
            .tasks.map(task =>
              task.key === action.payload.key
                ? { ...task, ...action.payload }
                : task
            )
          break

        case ACTIONS.DELETE_TASK:
          {
            const index = draft
              .find(section => section.key === action.payload.sectionKey)
              .tasks.findIndex(task => task.key === action.payload.key)

            if (index !== -1)
              draft
                .find(section => section.key === action.payload.sectionKey)
                .tasks.splice(index, 1)
          }
          break

        case ACTIONS.ADD_SECTION:
          draft.push(section(action.payload))
          break

        case ACTIONS.DELETE_SECTION:
          {
            const index = draft.find(
              section => section.key === action.payload.key
            )
            if (index !== -1) draft.splice(index, 1)
          }
          break

        case ACTIONS.EDIT_SECTION:
          draft.map(section =>
            section.key === action.payload.key
              ? action.payload.section
              : section
          )
          break

        default:
          break
      }
    }),
    setInitialValue()
  )

  const handleTaskClicked = () => {
    setTaskClicked(clicked => !clicked)
  }

  return (
    <SectionContext.Provider
      value={{ sections, dispatch, isTaskClicked, handleTaskClicked }}
    >
      {children}
    </SectionContext.Provider>
  )
}
export { SectionProvider, useSections, ACTIONS }
