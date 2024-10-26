import React, { useContext } from 'react'
import { BounceLoader } from 'react-spinners'
import { LoadingContext } from '../providers/provider'

export default function LoadingComponent() {
    const { isLoading } = useContext(LoadingContext);
    return (
        <div className="absolute top-[45%] left-[42%]">
            {
                isLoading && <BounceLoader size={150} color="#000" />
            }
        </div>
    )
}
