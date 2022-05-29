import React, { useEffect, useState } from 'react'
import {
  addDays,
  format,
  isAfter,
  isSameYear,
  isWithinInterval,
} from 'date-fns'
import {
  Form,
  DropdownMenu,
  DropdownIcon,
  DropdownItem,
  FontAwesomeIcon,
  useSections,
  SectionNameModal,
  useModal,
  ACTIONS,
} from './index'

const TaskDefaultView = ({
  data: { title, description, date, sectionKey, key, done, flagged },
  onClick,
  isTaskOpen,
}) => {
  const { dispatch } = useSections()

  const checkTask = () => {
    const toggleDone = !done

    const data = { done: toggleDone, key, sectionKey }

    dispatch({ type: ACTIONS.EDIT_TASK, payload: { data, key, sectionKey } })
  }

  return (
    <div className='flex w-full gap-2'>
      <div className='flex items-baseline'>
        <input
          className={`m-0 h-7 w-7 mt-[0.25rem]  appearance-none	border-4 rounded-full hover:bg-red-600 checked:bg-red-600 active:bg-red-700 ${
            flagged
              ? 'bg-red-600  bg-opacity-40 border-red-600 '
              : 'border-gray-400 '
          } `}
          type='checkbox'
          onChange={checkTask}
          checked={done}
        />
      </div>
      <div
        className='w-full hover:cursor-pointer flex flex-col'
        onClick={onClick}
      >
        <div className=' flex font-semibold text-lg pt-1 '>{title}</div>
        <div
          className={`flex text-gray-500 overflow-hidden break-words ${
            !date && !isTaskOpen ? 'border-b-2' : ''
          }`}
        >
          {description}
        </div>
        {date && title !== '' && (
          <div
            className={`flex ${!isTaskOpen ? 'border-b-2' : ''} gap-1 text-sm ${
              isAfter(new Date(), date) ? 'text-red-600' : 'text-black'
            }`}
          >
            <FontAwesomeIcon className='self-center' icon='fa-calendar-day' />
            <div className='pt-1'>
              {/* KANN MAN IN UTILS DATEI EXPORTIEREN FUER BESSERE LESBARKEIT: */}
              <p className=' flex ml-1'>
                {isWithinInterval(date, {
                  start: new Date(),
                  end: addDays(new Date(), 7),
                })
                  ? format(date, 'EEEE')
                  : isSameYear(new Date(), date)
                  ? format(date, 'dd.MMM')
                  : format(date, 'dd.MM.yy')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

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

const CollapseIcon = ({ onClick, isCollapsed, size }) => {
  return (
    <div onClick={onClick} className='hover:cursor-pointer hover:text-gray-500'>
      <FontAwesomeIcon
        icon='fa-angle-down'
        size={size}
        className={`${
          isCollapsed
            ? 'animate-rotate-90-cw'
            : ' rotate-90 animate-rotate-90-cw-r '
        }`}
      />
    </div>
  )
}

const SectionHeader = ({ sectionKey, name, onClick, isCollapsed }) => {
  const { dispatch, sections } = useSections()
  const [modalHidden, handleModal] = useModal()

  const addTask = () => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: { sectionKey } })
  }

  const deleteSection = () => {
    dispatch({ type: ACTIONS.DELETE_SECTION, payload: { sectionKey } })
  }

  const renameSection = formData => {
    const { section } = formData
    const capitalSection = section.charAt(0).toUpperCase() + section.slice(1)
    dispatch({
      type: ACTIONS.EDIT_SECTION,
      payload: { section: capitalSection, key: sectionKey },
    })
    handleModal()
  }

  const countedTasks = () =>
    sections
      .find(section => section.key === sectionKey)
      .tasks.filter(task => task.done === false).length

  return (
    <div
      className={`flex text-cusBlack font-semibold  p-1 pl-4 pr-4   
      `}
    >
      {' '}
      {!modalHidden && (
        <SectionNameModal handleModal={handleModal} onSubmit={renameSection} />
      )}
      <div className='flex justify-between w-full'>
        <div className='flex gap-2'>
          <h3 className=''>{name}</h3>
          {countedTasks() > 0 && (
            <p className='text-gray-500 '>{countedTasks()}</p>
          )}
        </div>
      </div>
      <div className='flex gap-6'>
        <CollapseIcon onClick={onClick} isCollapsed={isCollapsed} size='lg'>
          <Task />
        </CollapseIcon>
        <DropdownIcon
          className={'flex hover:cursor-pointer hover:text-gray-500'}
          icon='fa-ellipsis-vertical'
          size='lg'
        >
          <DropdownMenu
            className={
              'flex flex-col  animate-scale-in-tr mt-1 border-collapse m1 rounded-md bg-cusGrey  z-10 absolute right-0   font-quicksand text-2xl p-1'
            }
          >
            <DropdownItem icon='fa-plus' label='Add Task' onClick={addTask} />

            <DropdownItem
              isDisabled={name}
              icon='fa-folder-minus'
              label='Delete Project'
              onClick={deleteSection}
            />
            <DropdownItem
              isDisabled={name}
              icon='fa-pen-to-square'
              label='Rename Project'
              onClick={handleModal}
            />
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

  const { showDoneTasks } = useSections()
  return (
    <div
      className={`font-quicksand mb-3 ${
        collapsed ||
        tasks.length === 0 ||
        tasks.every(task => task.done === true)
          ? 'border-b-2'
          : ''
      }`}
    >
      <SectionHeader
        name={section}
        sectionKey={key}
        onClick={handleCollapse}
        isCollapsed={collapsed}
      />
      <ul>
        {!collapsed &&
          tasks.map(
            items =>
              (!items.done || showDoneTasks) && (
                <li key={items.key}>
                  <Task
                    items={items}
                    sectionKey={key}
                    isCollapsed={collapsed}
                  />
                </li>
              )
          )}
      </ul>
    </div>
  )
}

export default Section
