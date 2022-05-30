import { useState } from 'react'
import { useSections, SectionHeader, Task } from './index'

const showBorder = (collapsed, tasks) =>
  collapsed || tasks.length === 0 || tasks.every(task => task.done === true)
    ? 'border-b-2'
    : ''

const TaskList = ({ tasks, collapsed }) => {
  const { showDoneTasks } = useSections()

  return (
    <ul>
      {tasks.map(
        items =>
          (!items.done || showDoneTasks) && (
            <li key={items.key}>
              <Task
                items={items}
                sectionKey={items.sectionKey}
                isCollapsed={collapsed}
              />
            </li>
          )
      )}
    </ul>
  )
}

const Section = ({ items: { section, tasks, key } }) => {
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapse = () => {
    setCollapsed(collapsed => !collapsed)
  }

  return (
    <div className={`font-quicksand mb-3 ${showBorder(collapsed, tasks)}`}>
      <SectionHeader
        name={section}
        sectionKey={key}
        onClick={handleCollapse}
        isCollapsed={collapsed}
      />

      {!collapsed && <TaskList tasks={tasks} collapsed={collapsed} />}
    </div>
  )
}

export default Section
