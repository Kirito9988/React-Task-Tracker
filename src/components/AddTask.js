import React from 'react'
import { useState } from 'react'
const AddTask = ({onAdd}) => {
    const [text,setText] = useState('')
    const [day,setDay] = useState('')

    const [reminder,setReminder] = useState(false)


    const onSubmit  = (e) => {
        e.preventDefault() 

        if (!text) { 
            alert('Please add a task')
            return
        }

        onAdd({text, day, reminder})
        //clear
        setText('')
        setDay('')
        setReminder(false)
    }
  return (
    <form onSubmit={onSubmit} className='add-form'>
        <div className="form-control">
            <label htmlFor="">Task</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="form-control">
            <label htmlFor="">d and t</label>
            <input type="text" value={day} onChange={(e) => setDay(e.target.value)} />
        </div>
        <div className="form-control form-control-check">
            <label htmlFor="">set r</label>
            <input type="checkbox" value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
        </div>
        <input type="submit" value="save" className="btn btn-block" />
    </form>
  )
}

export default AddTask