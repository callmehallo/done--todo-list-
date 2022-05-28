import { useState } from 'react'

const useModal = () => {
  const [modalHidden, setModalHidden] = useState(true)

  const handleModal = () => {
    setModalHidden(hidden => !hidden)
  }
  return [modalHidden, handleModal]
}

export default useModal
