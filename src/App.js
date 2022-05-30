import React from 'react'
import { AppBar, Section, useSections } from './components/index'

const App = () => {
  const { sections } = useSections()

  return (
    <div className='App'>
      <AppBar />

      {sections.map(items => (
        <Section items={items} key={items.key} />
      ))}
    </div>
  )
}

export default App
