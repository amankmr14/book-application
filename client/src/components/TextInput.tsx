import React from 'react'

type Props = {
    placeholder: string,
    muliLine?: boolean,
    type?: string,
}

const TextInput = React.forwardRef<any , Props>(({ placeholder, muliLine = false, ...rest }, ref) => {
  console.log(rest)
  return !muliLine ?
    <input ref={ref} placeholder={placeholder} type="text" className='p-2 border rounded border-gray-300' {...rest}/>
  : <textarea {...rest} ref={ref} placeholder={placeholder} className='p-2 border rounded border-gray-300 min-h-[160px]'/>
})

export default TextInput