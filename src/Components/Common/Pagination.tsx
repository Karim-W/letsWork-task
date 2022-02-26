import React from 'react';
import { IPaginationProps } from '../../Models/Interfaces/IPaginationProps';

export default function Pagination(props: IPaginationProps) {
    const [totalPages, setTotalPages] = React.useState(props.total);
    const [currentPage, setCurrentPage] = React.useState(0);
    React.useEffect(() => {
        setTotalPages(props.total);
    }, [props.total])
    React.useEffect(() => {
        setCurrentPage(Math.floor(props.skip / props.take))
    }, [props.skip]);
    const handleCLick = (index: number) => {
        props.goToPage(index)
    }
    return (
        <div className='flex flex-row gap-4 justify-center items-center'>
            {
                Array(totalPages).fill(0).map((_, index) => {
                    return (<div key={index}
                        onClick={() => { handleCLick(index) }}
                        className={`p-3 ${index !== currentPage ? "bg-gray-100 border-2  text-black hover:bg-gray-200" : "bg-[#3078ff]  text-white hover:bg-[#6094f5]"}  px-4 rounded-lg hover:scale-95 duration-300`}>
                        {index + 1}
                    </div>)
                })
            }
        </div>
    );
}
