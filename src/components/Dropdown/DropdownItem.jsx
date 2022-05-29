import { FontAwesomeIcon } from '../index'

const DropdownItem = ({ icon, label, size, onClick, isDisabled = '' }) => {
  const disabled = isDisabled === 'General'
  return (
    <div>
      <button
        className={`flex w-full justify-start  rounded-md p-1  justify-items-center 
        ${
          !disabled
            ? ' hover:cursor-pointer hover:bg-gray-400 active:bg-slate-600'
            : ' opacity-30 hover: cursor-not-allowed'
        }
        `}
        disabled={disabled}
        onClick={onClick}
      >
        <FontAwesomeIcon
          className='w-[24px] mr-1 mt-[3px]'
          icon={icon}
          size={size}
        />
        <h3>{label}</h3>
      </button>
    </div>
  )
}

export default DropdownItem
