import { addTask, deleteSection, renameSection, useModal } from '../utils'
import {
  CollapseIcon,
  useSections,
  SectionNameModal,
  Dropdown,
  DropdownItem,
} from './index'

const SectionHeader = ({ sectionKey, name, onClick, isCollapsed }) => {
  const { dispatch, sections } = useSections()
  const [modalHidden, handleModal] = useModal()

  const countedTasks = sections
    .find(section => section.key === sectionKey)
    .tasks.filter(task => task.done === false).length

  return (
    <div
      className={`flex text-cusBlack font-semibold  p-1 pl-4 pr-4   
      `}
    >
      {!modalHidden && (
        <SectionNameModal
          handleModal={handleModal}
          onSubmit={formData =>
            renameSection(formData, dispatch, sectionKey, handleModal)
          }
        />
      )}

      <div className='flex justify-between w-full'>
        <div className='flex gap-2'>
          <h3 className=''>{name}</h3>
          {countedTasks > 0 && <p className='text-gray-500 '>{countedTasks}</p>}
        </div>
      </div>

      <div className='flex gap-6'>
        <CollapseIcon onClick={onClick} isCollapsed={isCollapsed} size='lg' />
        <Dropdown
          className={'flex hover:cursor-pointer hover:text-gray-500'}
          icon='fa-ellipsis-vertical'
          size='lg'
        >
          <DropdownItem
            icon='fa-plus'
            label='Add Task'
            onClick={() => addTask(dispatch, sectionKey)}
          />
          <DropdownItem
            isDisabled={name}
            icon='fa-folder-minus'
            label='Delete Project'
            onClick={() => deleteSection(dispatch, sectionKey)}
          />
          <DropdownItem
            isDisabled={name}
            icon='fa-pen-to-square'
            label='Rename Project'
            onClick={handleModal}
          />
        </Dropdown>
      </div>
    </div>
  )
}

export default SectionHeader
