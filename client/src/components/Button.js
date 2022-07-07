import React from 'react'
import "../dist/output.css"

export default function Button({value}) {
  return (
    <button className='bg-[#a2a4f3] text-white p-1 [border-radius:50rem] hover:[border-radius:50%]'>{value}</button>
  )
}
