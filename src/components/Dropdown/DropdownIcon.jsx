import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'

const DropdownIcon = ({ children, icon, className }) => {
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

  /* const childrenArray = React.Children.toArray(children)
  const lastElement = childrenArray.length - 1 */

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
      <FontAwesomeIcon className={className} icon={icon} />

      {clicked && children}
    </div>
  )

  /* <div ref={node} onClick={handleClick}>
      {icon ? (
        <FontAwesomeIcon className={className} icon={icon} />
      ) : (
        childrenArray[0]
      )}
      {clicked && childrenArray[lastElement]}
    </div> */
}

export default DropdownIcon
