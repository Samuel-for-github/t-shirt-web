import React from 'react'

import CustomButton from "../components/CustomButton"

const AiPicker = ({prompt, setPrompt, generatingImg, handleSubmit}) => {
  return (
    <div className='aipicker-container'>
       <textarea className='aipicker-textarea' placeholder='Ask AI...' rows={5} value={prompt} onChange={(e)=>{
        setPrompt(e.target.value)
       }}>
       </textarea>
       <div className='flex flex-wrap gap-3'>
       {generatingImg ?(
        <CustomButton type="outline" title="Asking AI..." customStyle="text-sm" />
       ):(
        <>
        <CustomButton type="outline" title="AI Logo" handleClick={()=> handleSubmit('logo')} customStyle="text-sm" />
        <CustomButton type="filled" title="AI Full" handleClick={()=> handleSubmit('full')} customStyle="text-sm" />
        </>
       )}
       </div>
    </div>
  )
}

export default AiPicker
