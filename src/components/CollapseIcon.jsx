import { FontAwesomeIcon } from './index'

const CollapseIcon = ({ onClick, isCollapsed, size }) => {
  return (
    <div onClick={onClick} className='hover:cursor-pointer hover:text-gray-500'>
      <FontAwesomeIcon
        icon='fa-angle-down'
        size={size}
        className={`${isCollapsed ? 'rotate-90' : ''}`}
      />
    </div>
  )
}

export default CollapseIcon
