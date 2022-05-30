import { ACTIONS } from './index'

const addTask = (dispatch, sectionKey) => {
  dispatch({ type: ACTIONS.ADD_TASK, payload: { sectionKey } })
}

const deleteSection = (dispatch, sectionKey) => {
  dispatch({ type: ACTIONS.DELETE_SECTION, payload: { sectionKey } })
}

const renameSection = (formData, dispatch, sectionKey, handleModal) => {
  const { section } = formData
  const capitalSection = section.charAt(0).toUpperCase() + section.slice(1)
  dispatch({
    type: ACTIONS.EDIT_SECTION,
    payload: { section: capitalSection, key: sectionKey },
  })
  handleModal()
}

export { addTask, deleteSection, renameSection }
