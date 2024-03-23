import React from 'react'
const ColorPicker = (props) => {
    return (
        <div className='color-picker'>
            <input id={props.id} type="color" value={props.value} defaultValue={props.defaultValue} onBlur={props.onBlur} onInput={props.onInput} />
            <input id={props.id} name={props.name} maxLength={7} type="text" className='color-picker-input' defaultValue={props.defaultValue} value={props.value} onInput={props.onInput} />
        </div>
    )
}

export default ColorPicker