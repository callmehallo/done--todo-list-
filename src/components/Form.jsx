import { addDays, format, isToday, isWithinInterval } from 'date-fns'
import { useState } from 'react'
import { Calendar } from 'react-calendar'
import { Controller, useForm } from 'react-hook-form'
import { FontAwesomeIcon, useSections, ACTIONS } from './index'

const Form = ({
  data: { title, description, date, flagged, key },
  sectionKey,
  isNewTask,
}) => {
  const { dispatch } = useSections()
  const [value, setValue] = useState(date ? date : new Date())
  const [btnClicked, setBtnClicked] = useState(false)
  const { register, handleSubmit, control } = useForm()

  const handleBtnClicked = () => {
    setBtnClicked(prev => !prev)
  }
  const type = isNewTask ? ACTIONS.ADD_TASK : ACTIONS.EDIT_TASK

  const onSubmit = data => {
    console.log(data)
  }

  const changeFlagged = () => {
    flagged = !flagged
    console.log(flagged)
  }

  return (
    <div className='flex flex-col pl-8 pr-4 pt-2 pb-2'>
      <form
        className='flex flex-col font-quicksand'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className='text-xl outline-none'
          type='text'
          name='title'
          placeholder='e.g., Watering plants'
          defaultValue={title}
          autoFocus
          {...register('title', { required: true })}
        ></input>

        <textarea
          className='outline-none'
          name='description'
          placeholder='Description'
          defaultValue={description}
          onKeyDown={e => {
            e.target.style.height = 'inherit'
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          {...register('description')}
        ></textarea>
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

          <button
            className='flex ml-3'
            value={flagged}
            type='button'
            {...register('flagged')}
            onClick={changeFlagged}
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
                onChange={date => {
                  onChange(date)
                  handleBtnClicked()
                  setValue(date)
                }}
              />
            )}
          />
        )}
      </form>
    </div>
  )
}

export default Form

/* dispatch({type: ACTIONS.ADD_TASK, payload: { data }}) */
