import React from 'react'
import { DropdownMenu, DropdownIcon, DropdownItem } from './index'
import { useSections } from './SectionsContext'

const AppBar = ({ handleModal }) => {
  const { handleSelectTask, handleShowDoneTasks, showDoneTasks } = useSections()

  return (
    <div className='flex marker:content-none font-quicksand items-center justify-between w-full box-border bg-cusBlack h-20 p-4 font-bold '>
      <h2 className='flex  text-4xl text-cusGrey italic'>DONE.</h2>
      <DropdownIcon
        icon='fa-bars'
        className={
          'text-cusGrey text-3xl hover:text-gray-500  hover:cursor-pointer'
        }
      >
        <DropdownMenu className='flex flex-col  animate-scale-in-tr border-collapse m1 rounded-md bg-cusGrey absolute right-0 top-20  font-quicksand text-2xl p-1 z-20'>
          <DropdownItem
            icon='fa-folder-plus'
            label={'Create Project'}
            onClick={handleModal}
          />
          <DropdownItem
            icon='fa-trash-can'
            label='Delete Tasks'
            onClick={handleSelectTask}
          />
          <DropdownItem
            icon={showDoneTasks ? 'fa-eye-slash' : 'fa-eye'}
            label={showDoneTasks ? 'Hide Tasks' : 'Show All Tasks'}
            onClick={handleShowDoneTasks}
            className='mt-2'
          />
        </DropdownMenu>
      </DropdownIcon>
    </div>
  )
}

export default AppBar
