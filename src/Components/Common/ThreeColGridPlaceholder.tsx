import React from "react";
import { IThreeColGridPlaceholder } from "../../Models/Interfaces/IThreeColsGridPlaceholder";
export default function ThreeColGridPlaceholder(props: IThreeColGridPlaceholder) {
    return <div className='2xl:mx-[14rem] xl:mx-[10rem] md:mx-[5rem] sm:mx-[2rem] xs:mx-[2rem] xxs:mx-[1rem] h-full py-4 lg:py-[2rem] 2xl:py-[4rem]'>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 pt-16">
            {

                [...Array(3 * props.rows)].map((_, i) =>
                    <div key={i} className="w-[20rem] h-full flex flex-col xxs:min-h-[16rem] xxs:rounded-lg md:rounded-2xl bg-[#353535] bg-fixed drop-shadow-md shadow-md hover:scale-[0.98] bg-cover hover:bg-[rgba(0,0,0,1)] animate-pulse">

                    </div>)
            }</div>
    </div>;
}