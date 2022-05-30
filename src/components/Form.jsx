import { useRef, useState } from 'react'
import { FontAwesomeIcon, useSections } from './index'
import { ACTIONS, formatFormDate } from '../utils'
import { Controller, useForm } from 'react-hook-form'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Form = ({
  data: { title, description, date, flagged, key },
  sectionKey,
}) => {
  const { dispatch } = useSections()
  const [btnClicked, setBtnClicked] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const formRef = useRef(null)

  const handleBtnClicked = () => {
    setBtnClicked(clicked => !clicked)
  }

  const triggerSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    }
  }

  const onSubmit = formData => {
    const data = { ...formData }

    dispatch({
      type: ACTIONS.EDIT_TASK,
      payload: {
        data,
        sectionKey,
        key,
      },
    })
  }

  return (
    <div className='flex flex-col pl-8 pr-4 pt-2 pb-2 '>
      <form
        className='flex flex-col font-quicksand'
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        {errors.title?.type === 'required' && (
          <span className='text-red-500 font-semibold flex max-w-fit'>
            a title is required
          </span>
        )}
        <input
          className={`text-xl outline-none  `}
          type='text'
          name='title'
          placeholder='e.g., Watering plants'
          defaultValue={title}
          autoFocus
          {...register('title', { required: true })}
        />

        <textarea
          className={`outline-none resize-none  `}
          name='description'
          placeholder='Description'
          spellCheck={false}
          defaultValue={description}
          onKeyDown={e => {
            if (e.key === 'Enter' && e.shiftKey === false) {
              triggerSubmit()
            }
            //dynamic fieldsize:
            e.target.style.height = 'inherit'
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          {...register('description')}
        />
        <div className='flex items-baseline '>
          <div className='flex flex-row border-2 border-cusGrey rounded-lg  justify-start p-1 box-border  border-collapse max-w-fit'>
            <button className='flex  ' onClick={handleBtnClicked} type='button'>
              <FontAwesomeIcon
                className='flex self-center'
                icon='fa-calendar'
              />

              <p className=' flex ml-1'>{formatFormDate(date)}</p>
            </button>
          </div>

          <button
            className={`flex ml-3 ${flagged ? 'text-red-600' : ''} `}
            type='button'
            onClick={() => {
              onSubmit({ flagged: !flagged })
            }}
          >
            <FontAwesomeIcon icon='fa-flag' />
          </button>
        </div>
        {btnClicked && (
          <Controller
            control={control}
            name='date'
            render={({ field: { onChange, value } }) => (
              <Calendar
                className='animate-scale-in-tl self-start '
                calendarType='ISO 8601'
                selected={value}
                name='date'
                minDate={new Date()}
                onChange={date => {
                  onChange(date)
                  handleBtnClicked()
                  handleSubmit(onSubmit({ date: date }))
                }}
              />
            )}
          />
        )}
      </form>
      <div className='border-b-2 mt-2' />
    </div>
  )
}

export default Form
