import React from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import Button from '../components/Button'

type Props = {}

const AddBook = (props: Props) => {
  const navigate = useNavigate();

  return (
    <main>
      <Button variant="outlined" onClick={() => navigate(-1)} text="&larr; Back to Home" className='mx-10'/>
      <Form />
    </main>
  )
}

export default AddBook