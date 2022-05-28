import React from 'react'
import { DropdownMenu, DropdownIcon, FontAwesomeIcon } from './index'

const DropdownItem = ({ icon, label, size, onClick }) => {
  return (
    <div>
      <button
        className='flex justify-start w-full hover:bg-gray-400 rounded-md p-1 hover:cursor-pointer justify-items-center active:bg-slate-600'
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

const AppBar = ({ handleModal }) => {
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
        </DropdownMenu>
      </DropdownIcon>
    </div>
  )
}

export default AppBar
