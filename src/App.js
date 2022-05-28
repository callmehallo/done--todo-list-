import './App.css'
import React from 'react'
import {
  AppBar,
  Section,
  useSections,
  SectionNameModal,
  useModal,
  ACTIONS,
} from './components/index'

const App = () => {
  const { sections, dispatch } = useSections()
  const [modalHidden, handleModal] = useModal()

  const addSection = formData => {
    const { section } = formData
    const capitalSection = section.charAt(0).toUpperCase() + section.slice(1)
    dispatch({
      type: ACTIONS.ADD_SECTION,
      payload: { section: capitalSection },
    })
    handleModal()
  }

  return (
    <div className='App'>
      {!modalHidden && (
        <SectionNameModal handleModal={handleModal} onSubmit={addSection} />
      )}
      <AppBar handleModal={handleModal} />

      {sections.map(items => (
        <Section items={items} key={items.key} />
      ))}
    </div>
  )
}

export default App
