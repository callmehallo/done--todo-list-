import './App.css'
import { React, useState } from 'react'
import {
  AppBar,
  Section,
  useSections,
  AddSectionModal,
} from './components/index'

const App = () => {
  const { sections } = useSections()
  const [modalHidden, setModalHidden] = useState(true)

  const handleModal = () => {
    setModalHidden(hidden => !hidden)
  }

  return (
    <div className='App'>
      {!modalHidden && <AddSectionModal handleModal={handleModal} />}
      <AppBar onClick={handleModal} />
      {sections.map(items => (
        <Section items={items} key={items.key} />
      ))}
    </div>
  )
}

export default App
