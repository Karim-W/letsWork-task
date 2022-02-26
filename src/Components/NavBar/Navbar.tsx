import React from 'react'
import JSONButton from './JsonButton'

export default function Navbar() {
    return (
        <div className='h-12 w-full p-4  drop-shadow-lg shadow-md flex flex-row justify-between items-center fixed z-10 bg-white'>
            <div className='text-2xl font-light'>
                <span className='font-medium'>lets</span>work Task
            </div>
            {/* <div className='text-xl text-blue-700 font-medium'>
                Json
            </div> */}
            <JSONButton />

        </div>
    )
}
