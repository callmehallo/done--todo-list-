import { parseISO } from 'date-fns'
import produce from 'immer'
import { v4 as uuidv4 } from 'uuid'

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

const task = ({
  title = '',
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

const section = ({ section }) => ({
  section,
  key: uuidv4(),
  tasks: [],
})

const addTask = produce((state, action) => {
  state
    .find(section => section.key === action.payload.sectionKey)
    .tasks.push(task(action.payload))
})

const editTask = (state, action) =>
  state.map(section =>
    section.key === action.payload.sectionKey
      ? {
          ...section,
          tasks: section.tasks.map(task =>
            task.key === action.payload.key
              ? {
                  ...task,
                  ...action.payload.data,
                }
              : task
          ),
        }
      : section
  )

const deleteTask = produce((state, action) => {
  const index = state
    .find(section => section.key === action.payload.sectionKey)
    .tasks.findIndex(task => task.key === action.payload.key)

  if (index !== -1)
    state
      .find(section => section.key === action.payload.sectionKey)
      .tasks.splice(index, 1)
})

const addSection = produce((state, action) => {
  state.push(section(action.payload))
})

const deleteSection = produce((state, action) => {
  const index = state.findIndex(
    section => section.key === action.payload.sectionKey
  )
  if (index !== -1) state.splice(index, 1)
})

const editSection = (state, action) =>
  state.map(section =>
    section.key === action.payload.key
      ? { ...section, section: action.payload.section }
      : section
  )

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return addTask(state, action)

    case ACTIONS.EDIT_TASK:
      return editTask(state, action)

    case ACTIONS.DELETE_TASK:
      return deleteTask(state, action)

    case ACTIONS.ADD_SECTION:
      return addSection(state, action)

    case ACTIONS.DELETE_SECTION:
      return deleteSection(state, action)

    case ACTIONS.EDIT_SECTION:
      return editSection(state, action)

    default:
      return state
  }
}

const getInitialValue = () => {
  const sections =
    localStorage.getItem('sections') &&
    localStorage.getItem('sections') !== '[]'
      ? JSON.parse(localStorage.getItem('sections'))
      : [section({ section: 'General' })]

  return sections.map(section =>
    section.tasks !== []
      ? {
          ...section,
          tasks: section.tasks.map(task =>
            task.date
              ? {
                  ...task,
                  date: parseISO(task.date),
                }
              : task
          ),
        }
      : section
  )
}

export { ACTIONS, section, reducer, getInitialValue }
