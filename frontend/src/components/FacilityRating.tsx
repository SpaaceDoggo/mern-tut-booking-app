import {hotelFacilities} from '../configs/hotel-types';

type Props = {
    selectedFacilities: string[],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FacilityRating = ({selectedFacilities, onChange}: Props) => {
    return(
        <div className='border-b border-slate-400 pb-2'>
            <h4 className="font-medium text text-gray-600">Hotel Facilities: </h4>

            {
                hotelFacilities.map((facility) => 
                 <label className='flex items-center gap-2'>
                    <input
                     type='checkbox'
                     value={facility}
                     checked={selectedFacilities.includes(facility)}
                     onChange={onChange}
                    />
                    {facility}
                 </label>
                )
            }
        </div>
    )
}

export default FacilityRating