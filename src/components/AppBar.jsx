import React from 'react'
import { Dropdown, DropdownItem, SectionNameModal, useSections } from './index'
import { ACTIONS, useModal } from '../utils'

const AppBar = () => {
  const { handleSelectTask, handleShowDoneTasks, showDoneTasks, dispatch } =
    useSections()

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
    <div className='flex marker:content-none font-quicksand items-center justify-between w-full box-border bg-cusBlack h-20 p-4 font-bold '>
      {!modalHidden && (
        <SectionNameModal handleModal={handleModal} onSubmit={addSection} />
      )}
      <h2 className='flex  text-4xl text-cusGrey italic'>DONE.</h2>
      <Dropdown
        icon='fa-bars'
        className={
          'text-cusGrey text-3xl hover:text-gray-500  hover:cursor-pointer'
        }
      >
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
      </Dropdown>
    </div>
  )
}

export default AppBar
