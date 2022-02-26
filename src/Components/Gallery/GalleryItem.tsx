import React from 'react'
import { IImageObject } from '../../Models/Interfaces/IImageObject'
import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { removeImageObject } from '../../Store/store'
import GalleryDialog from './GalleryDialog'

export default function GalleryItem(galleryObject: IImageObject) {
    const [hoverState, setHoverState] = React.useState(false)
    return (
        <div style={{ background: `linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.1),rgba(0,0,0,0.8)) , url('${galleryObject.img}')`, backgroundSize: "cover" }}
            className={`w-full flex flex-col xxs:min-h-[16rem] xxs:rounded-lg md:rounded-2xl bg-gray-100 bg-fixed drop-shadow-md shadow-md hover:scale-[0.98] bg-cover hover:bg-[rgba(0,0,0,1)]`}
            onMouseEnter={(e) => { setHoverState(true) }}
            onMouseLeave={(e) => { setHoverState(false) }}>
            <div style={{ display: hoverState ? "contents" : "none" }}>
                <div className='h-full p-4 flex flex-col justify-end items-start w-full '>
                    <div className='flex flex-row justify-between w-full'>
                        <div className='text-lg text-white font-semibold'>{galleryObject.text}</div>
                        <div className='flex flex-row gap-4'>
                            <TrashIcon className='h-6 w-6 text-red-600 hover:text-red-700' onClick={() => { removeImageObject(galleryObject.id) }} />
                            <GalleryDialog Post={{
                                img: galleryObject.img,
                                text: galleryObject.text,
                                id: galleryObject.id
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
