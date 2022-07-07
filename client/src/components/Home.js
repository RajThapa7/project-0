import React from 'react'
import ResponsiveAppBar from './navbar'
import "../dist/output.css"
import Button from './Button'
export default function Home() {
  return (
    <>
 <button className='peer bg-blue-200 text-slate-white hover:bg-green-200 '>Hover over me</button>
 <p className='invisible peer-hover:visible'> You are hovering over me</p>
 <form action="">

 <label htmlFor="">email</label>
 <input type="email" placeholder="Enter your email" className="outline-none outline-black outline-dashed bg-red-100 placeholder:italic focus:outline focus:outline-green-300"/>
 <input type="file" class="
 file:rounded-full file:text-blue-600
 file:hover:bg-blue-400 file:hover:text-white
    "/>
    <div className='portrait:invisible landscape:visible bg-green-300 text-center'>This is landscape</div>
    <div className='portrait:visible landscape:invisible bg-green-300 text-center'>This is portrait</div>

 </form>
<div className='px-5'>
  <details className='open:bg-sky-600 open:text-white'>
    <summary >who is the father of cs?</summary>
  <p className='text-green-500'>That's me bitch</p>
  </details>
</div>

<p className='thapa raj'>dark mode</p> 
<Button value="click Me"/>

<p className='font-mono'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero vel in aspernatur minima nesciunt veritatis ex facere, officiis ipsa iste laboriosam ducimus minus quam labore adipisci fugiat neque sunt molestias aut non maiores quisquam? Aspernatur ullam aperiam dolorum sit, at, ducimus consequuntur hic suscipit quidem, tempora voluptas aut maiores dolores!</p>



</>
  )
}
