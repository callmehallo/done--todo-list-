import { ACTIONS, showStyles, formatDate } from '../utils'

import { useSections, FontAwesomeIcon } from './index'

const TaskDefaultView = ({
  data: { title, description, date, sectionKey, key, done, flagged },
  onClick,
  isTaskOpen,
}) => {
  const { dispatch } = useSections()

  const checkTask = () => {
    const data = { done: !done, key, sectionKey }

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
          <div className={`flex gap-1 text-sm ${showStyles(isTaskOpen, date)}`}>
            <FontAwesomeIcon className='self-center' icon='fa-calendar-day' />
            <div className='pt-1'>
              <p className=' flex ml-1'>{formatDate(date)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default TaskDefaultView
