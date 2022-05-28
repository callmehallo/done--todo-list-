import { addDays, format, isToday, isWithinInterval, formatISO } from 'date-fns'
import { useState } from 'react'
import { Calendar } from 'react-calendar'
import { Controller, useForm } from 'react-hook-form'
import { FontAwesomeIcon, useSections, ACTIONS } from './index'
import 'react-calendar/dist/Calendar.css'

const Form = ({
  data: { title, description, date, flagged, key },
  sectionKey,
}) => {
  const { dispatch } = useSections()
  const [value, setValue] = useState(date ? date : new Date())
  const [btnClicked, setBtnClicked] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm()

  const handleBtnClicked = () => {
    setBtnClicked(prev => !prev)
  }

  const onSubmit = () => {
    const data = { ...getValues(), ...{ flagged } }
    const { title } = data
    if (title === '') return
    dispatch({
      type: ACTIONS.EDIT_TASK,
      payload: {
        data,
        sectionKey,
        key,
      },
    })
    console.log(data)
  }

  const changeFlagged = () => {
    flagged = !flagged
    console.log(flagged)
  }

  return (
    <div className='flex flex-col pl-8 pr-4 pt-2 pb-2 '>
      <form
        className='flex flex-col font-quicksand'
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.title?.type === 'required' && (
          <span className='text-red-500 font-semibold flex max-w-fit'>
            a title is required
          </span>
        )}
        <input
          className='text-xl outline-none'
          type='text'
          name='title'
          placeholder='e.g., Watering plants'
          defaultValue={title}
          autoFocus
          {...register('title', { required: true })}
        />

        <textarea
          className='outline-none resize-none'
          name='description'
          placeholder='Description'
          spellCheck={false}
          defaultValue={description}
          onKeyDown={e => {
            //dynamic fieldsize:
            if (e.key === 'Enter' && e.shiftKey === false) {
              handleSubmit(onSubmit())
            }

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

              <p className=' flex ml-1'>
                {isToday(value)
                  ? 'No Date'
                  : isWithinInterval(value, {
                      start: new Date(),
                      end: addDays(new Date(), 7),
                    })
                  ? format(value, 'EEEE')
                  : format(value, 'dd.MMM')}
              </p>
            </button>
          </div>

          <button className='flex ml-3' type='button' onClick={changeFlagged}>
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
                onChange={date => {
                  onChange(date)
                  handleBtnClicked()
                  setValue(date)
                  handleSubmit(onSubmit({ date: formatISO(date) }))
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

/* dispatch({type: ACTIONS.ADD_TASK, payload: { data }}) */