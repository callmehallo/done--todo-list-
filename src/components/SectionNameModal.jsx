import React from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from './index'

const AddSectionModal = ({ onSubmit, handleModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className=' fixed w-screen h-screen  top-0 left-0 right-0 bottom-0 bg-cusBlack bg-opacity-10 z-40'>
      <div
        className='relative
      mt-0 mb-0 ml-auto  top-2/4 mr-auto  z-50   w-fit  p-1 '
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={
            'flex flex-col items-center font-quicksand bg-opacity-100 z-50'
          }
        >
          {errors.section?.type === 'required' && (
            <span className='  text-red-500  font-bold flex w-fit mb-2'>
              a name for your project is required
            </span>
          )}
          <input
            placeholder='name your project'
            size={25}
            className='outline-none rounded-lg p-2 text-center text-xl font-semibold 
            bg-opacity-100 opacity-100'
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
