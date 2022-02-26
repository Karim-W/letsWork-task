import { Dialog, Transition } from '@headlessui/react'
import { PencilIcon, PlusIcon } from '@heroicons/react/outline'
import { Fragment, useState } from 'react'
import { IImageObject } from '../../Models/Interfaces/IImageObject'
import { IPost, IPostDialog } from '../../Models/Interfaces/IPostDialog'
import { addImageObject, updateImageObject } from '../../Store/store'
import { v4 as uuidv4 } from 'uuid'

export default function GalleryDialog(props: IPostDialog) {
    const [isOpen, setIsOpen] = useState(false)
    const [formValues, setFormValues] = useState({
        text: props.Post?.text || '',
        img: props.Post?.img || '',
        id: props.Post?.id || null,
        dateAdded: props.Post?.dateAdded || null
    })
    const [showImage, setShowImage] = useState(false)
    const [isErr, setIsErr] = useState(false)

    function closeModal() {
        setFormValues({
            text: props.Post?.text || '',
            img: props.Post?.img || '',
            id: props.Post?.id || '',
            dateAdded: props.Post?.dateAdded || null
        })
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (showImage && !isErr) {
            if (props.Post?.id) {
                updateImageObject(formValues as IPost)
            } else {
                let obj: IImageObject = {
                    text: formValues.text,
                    img: formValues.img,
                    dateAdded: new Date(),
                    lastUpdated: new Date(),
                    id: uuidv4()
                }
                addImageObject(obj)
            }
            setIsOpen(false)
        }
    }
    return (
        <>
            {
                props.Post ? <PencilIcon onClick={openModal} className='h-6 w-6 text-blue-600 hover:text-blue-700' /> :
                    <button
                        onClick={openModal}
                        className='flex flex-row gap-2 justify-center items-center bg-black text-white p-1 px-4 rounded-md hover:scale-95'>
                        <PlusIcon className='h-4 w-4' />
                        <>Add</>
                    </button>
            }

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto bg-[rgba(0,0,0,0.3)]"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all bg-white transform  shadow-2xl drop-shadow-2xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Edit items
                                </Dialog.Title>
                                <form onSubmit={handleSubmit}>
                                    <div className="mt-2 flex flex-col gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                                Title:
                                            </label>
                                            <input required id="name" value={formValues.text} onChange={(e) => setFormValues({ ...formValues, text: e.target.value })} className="form-input block w-full transition duration-150 border-2 border-gray-100 rounded-md p-2 ease-in-out sm:text-sm sm:leading-5" />
                                        </div>
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                                Image Url:
                                            </label>
                                            <input required id="name" value={formValues.img} onChange={(e) => { setFormValues({ ...formValues, img: e.target.value }), setIsErr(false) }} className="form-input block w-full transition duration-150 border-2 border-gray-100 rounded-md p-2 ease-in-out sm:text-sm sm:leading-5" />
                                        </div>
                                        {
                                            formValues.img !== "" && <div>
                                                <p className='block text-sm  font-medium leading-5 mb-2'>Image Preview:</p>
                                                {
                                                    !showImage && <div className='text-center'>Image Url is not valid</div>
                                                }
                                                <img src={formValues.img} alt="" className="w-full object-contain max-h-[16rem]" onLoad={() => { setShowImage(true) }} onError={(e) => { setShowImage(false), setIsErr(true) }} />
                                            </div>

                                        }
                                    </div>
                                    <div className="mt-4 flex flex-row-reverse justify-start items-center gap-4">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-white border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
