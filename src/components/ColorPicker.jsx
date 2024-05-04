import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state)
  return (
    <div className='absolute left-full ml-3'>
       {/* presetColors={[]} */}
      <SketchPicker color={snap.color} disableAlpha onChange={(color)=> state.color = color.hex}/>
      <input type="text" className="w-full rounded-md my-4" value={snap.color} readOnly/>
      <input type="text" className="w-full rounded-md" placeholder='Enter the hex value' onChange={(e)=> state.color = e.target.value}/>
    </div>
  )
}

export default ColorPicker
