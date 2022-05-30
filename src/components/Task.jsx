import { useEffect, useState } from 'react'
import { useSections, TaskDefaultView, Form } from './index'

const Task = ({ items, sectionKey }) => {
  const { title, key, description } = items
  const [isTaskOpen, setTaskOpen] = useState(true)
  const { selectTask } = useSections()

  useEffect(() => {
    title === '' ? setTaskOpen(true) : setTaskOpen(false)
  }, [title, description])

  const onClick = () => setTaskOpen(prev => !prev)

  return (
    <div
      className={`w-full pl-4 pr-4 pt-2 pb-2 border-collapse box-border flex flex-col  border-cusGrey relative  `}
    >
      <div
        id={key}
        sectionkey={sectionKey}
        className={`${
          selectTask
            ? 'absolute hover:bg-cusBlack hover:bg-opacity-10 z-20 w-screen -ml-4 h-full'
            : 'hidden'
        }`}
      />
      <TaskDefaultView data={items} onClick={onClick} isTaskOpen={isTaskOpen} />
      {isTaskOpen && <Form data={items} sectionKey={sectionKey} />}
    </div>
  )
}

export default Task
