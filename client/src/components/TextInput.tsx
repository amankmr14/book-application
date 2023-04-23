import React from 'react'

type Props = {
    placeholder: string,
    muliLine?: boolean,
}

const TextInput = React.forwardRef<any , Props>(({ placeholder, muliLine = false, ...rest }, ref) => {
  return !muliLine ?
    <input {...rest} ref={ref} placeholder={placeholder} type="text" className='p-2 border rounded border-gray-300'/>
  : <textarea {...rest} ref={ref} placeholder={placeholder} className='p-2 border rounded border-gray-300 min-h-[160px]'/>
})

export default TextInput