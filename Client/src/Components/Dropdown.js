import React from 'react'
export default function Dropdown()
{
    return(
        <div className='w-full z-50 opacity-75 h-screen bg-white text-main flex  justify-end'>
    <ul className='mt-20 border-2  h-52 font-pat font-bold mr-4 border-silver-shadow p-2 rounded-lg'>
    <li className='pr-4 py-2 hover:bg-silver-shadow hover:cursor-pointer rounded-md'>Your profile</li>
    <li className='pr-4 py-2 hover:bg-silver-shadow hover:cursor-pointer rounded-md'>Your notes</li>
    <li className='pr-4 py-2 hover:bg-silver-shadow hover:cursor-pointer rounded-md'>Saved notes</li>
    <li className='pr-4 py-2 hover:bg-silver-shadow hover:cursor-pointer rounded-md'>Settings</li>
    <li className='pr-4 py-2 hover:bg-silver-shadow hover:cursor-pointer rounded-md'>Logout</li>
    </ul>
    
    </div>
    )
}