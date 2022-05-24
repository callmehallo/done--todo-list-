import React, { useState } from 'react'
import { format, isAfter } from 'date-fns'
import {
  Form,
  DropdownMenu,
  DropdownIcon,
  FontAwesomeIcon,
  useSections,
  ACTIONS,
} from './index'

const TaskDefaultView = ({ data: { title, description, date } }) => {
  const { handleTaskClicked } = useSections()
  return (
    <div className='flex w-full gap-2'>
      <div className='flex items-baseline'>
        <input className='m-0 h-10 w-6 ' type='checkbox' />
      </div>
      <div
        className='w-full hover:cursor-pointer flex flex-col'
        onClick={handleTaskClicked}
      >
        <div className=' flex font-semibold text-lg pt-1'>{title}</div>
        <div className='flex text-gray-500'>{description}</div>
        {date && (
          <div
            className={`flex gap-1 text-sm ${
              isAfter(new Date(), date) ? 'text-red-600' : 'text-black'
            }`}
          >
            <FontAwesomeIcon className='self-center' icon='fa-calendar-day' />
            <div className='pt-1'>{format(date, 'dd.MMM')}</div>
          </div>
        )}
      </div>
    </div>
  )
}

const Task = ({ items, sectionKey }) => {
  const { isTaskClicked, handleTaskClicked } = useSections()

  return (
    <div className='w-full pl-4 pr-4 pt-2 pb-2 border-collapse box-border flex flex-col'>
      <TaskDefaultView data={items} onClick={handleTaskClicked} />
      {isTaskClicked && <Form data={items} sectionKey={sectionKey} />}
    </div>
  )
}

const CollapseIcon = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <FontAwesomeIcon icon='fa-angle-down' />
    </div>
  )
}

const DropdownItem = ({ icon, label, size, onClick }) => {
  return (
    <div>
      <button
        className='flex w-full justify-start hover:bg-gray-400 rounded-md p-1 hover:cursor-pointer justify-items-center active:bg-slate-600'
        onClick={onClick}
      >
        <FontAwesomeIcon
          className='max-w-[24px] mr-1'
          icon={icon}
          size={size}
        />
        <h3>{label}</h3>
      </button>
    </div>
  )
}

const SectionHeader = ({ sectionKey, name = 'General', onClick }) => {
  const { dispatch, handleTaskClicked, isTaskClicked } = useSections()

  const addTask = () => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: { sectionKey } })
    if (!isTaskClicked) handleTaskClicked()
  }

  return (
    <div className='flex text-cusBlack p-1 pl-4 pr-4'>
      <div className='flex justify-between w-full'>
        <div>{name}</div>
        {/* ANZAHL AN TASKS IN DER JEWEILIGEN SECTION */}
      </div>
      <div className='flex gap-6'>
        <CollapseIcon onClick={onClick}>
          <Task />
        </CollapseIcon>
        <DropdownIcon
          className={'flex hover:cursor-pointer'}
          icon='fa-ellipsis-vertical'
        >
          <DropdownMenu
            className={
              'flex flex-col  animate-scale-in-tr mt-1 border-collapse m1 rounded-md bg-cusGrey absolute right-0  font-quicksand text-2xl p-1'
            }
          >
            <DropdownItem icon='fa-plus' label='Add Task' onClick={addTask} />
            <DropdownItem icon='fa-trash-can' label='Delete Task' />
          </DropdownMenu>
        </DropdownIcon>
      </div>
    </div>
  )
}

const Section = ({ items: { section, tasks, key } }) => {
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapse = () => {
    setCollapsed(collapsed => !collapsed)
  }

  return (
    <div className='font-quicksand'>
      <SectionHeader name={section} sectionKey={key} onClick={handleCollapse} />
      <ul>
        {!collapsed &&
          tasks.map(items => (
            <li key={items.key}>
              {' '}
              <Task items={items} sectionKey={key} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Section
