import React from 'react'
import spinner from '../public/spinner.gif'
import Image from 'next/image'

const Spinner = () => {
  return (
    <div>
      <Image className='w-[200px] m-auto black' alt='loading' src={spinner} />
    </div>
  )
}

export default Spinner
