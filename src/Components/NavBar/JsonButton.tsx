import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { initalStates } from '../../Models/Data/InitalStates'
import store, { reInitImages } from '../../Store/store'

export default function JSONButton() {
    const [data, setData] = useState(JSON.stringify(store.getState()))
    const [isOpen, setIsOpen] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    function closeModal() {
        setIsOpen(false)
        setData(JSON.stringify(initalStates))
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setErrMessage('')
        e.preventDefault()
        try {
            const obj = JSON.parse(data)
            reInitImages(obj)
            setIsOpen(false)
        } catch (error: any) {
            console.log(typeof error)
            setErrMessage(error.message)
        }
    }


    return (
        <>
            <div onClick={openModal} className='text-xl text-blue-700 font-medium'>
                Json
            </div>

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
                            <div className="inline-block min-w-[50vw]  max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    JSON view
                                </Dialog.Title>
                                <p>{errMessage === "" ? null : errMessage}</p>
                                <form onSubmit={handleSubmit}> <div className="mt-2">
                                    <textarea className='w-full min-h-[50vh] outline-none border-2 border-[rgba(0,0,0,0.3)] p-2 rounded-md' value={data} onChange={(e) => { setData(e.target.value); setErrMessage("") }} />
                                </div>

                                    <div className="mt-4 flex flex-row-reverse gap-4">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium  border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div></form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
