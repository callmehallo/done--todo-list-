import React from 'react'
import { useForm } from 'react-hook-form'
import { useSections } from './SectionsContext'
import { ACTIONS, FontAwesomeIcon } from './index'

const AddSectionModal = ({ handleModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { dispatch } = useSections()

  const onSubmit = formData => {
    const data = { ...formData }
    dispatch({ type: ACTIONS.ADD_SECTION, payload: { data } })
    handleModal()
  }

  return (
    <div className=' fixed w-screen h-screen  z-20 bg-cusBlack bg-opacity-10'>
      <div
        className='relative
      mt-0 mb-0 ml-auto  top-2/4 mr-auto  z-30   w-fit  p-1 '
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={'flex flex-col items-center font-quicksand'}
        >
          {errors.section?.type === 'required' && (
            <span className='  text-red-500  font-semibold flex w-fit mb-2'>
              a name for your project is required
            </span>
          )}
          <input
            placeholder='name your project'
            size={25}
            className='outline-none rounded-lg p-2 text-center text-xl font-semibold'
            name='section'
            defaultValue={''}
            autoFocus
            {...register('section', { required: true })}
          />
          <div className='flex justify-evenly mt-4 w-full'>
            <button type='submit' className='text-green-600'>
              <FontAwesomeIcon icon='fa-solid fa-circle-check' size='4x' />
            </button>
            <button
              type='button'
              onClick={handleModal}
              className={'text-red-600'}
            >
              <FontAwesomeIcon icon='fa-solid fa-circle-xmark' size='4x' />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSectionModal
