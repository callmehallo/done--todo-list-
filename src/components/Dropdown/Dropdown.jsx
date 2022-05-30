import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'

const Dropdown = ({ children, icon, className, size }) => {
  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(clicked => !clicked)
  }
  const node = useRef()

  const isClickedOutside = e => {
    e.stopPropagation()
    if (node.current && !node.current.contains(e.target)) {
      handleClick()
    }
  }

  useEffect(() => {
    if (clicked) {
      document.addEventListener('mousedown', isClickedOutside)
      return () => {
        document.removeEventListener('mousedown', isClickedOutside)
      }
    }
  })

  return (
    <div ref={node} onClick={handleClick}>
      <FontAwesomeIcon className={className} icon={icon} size={size} />

      {clicked && (
        <div
          className={`flex flex-col  animate-scale-in-tr mt-1 border-collapse m1 rounded-md bg-cusGrey  z-20 absolute right-0   font-quicksand text-2xl p-1 ${
            icon === 'fa-bars' ? 'top-20' : ''
          } `}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown
