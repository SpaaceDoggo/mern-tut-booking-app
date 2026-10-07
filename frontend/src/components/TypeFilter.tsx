import {hotelTypes} from '../configs/hotel-types';

type Props = {
    selectedTypes: string[]
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TypeFilter = ({selectedTypes, onChange}: Props) => {
    return(
        <div className='border-b border-slate-400 pb-5'>
            <h4>Hotel Types</h4>

            {
                hotelTypes.map((type) => (
                    <label className='flex items-center gap-2'>
                        <input
                         type='checkbox'
                         value={type}
                         checked={selectedTypes.includes(type)}
                         onChange={onChange}
                        />
                        {type}
                    </label>
                ))
            }
        </div>
    )
}

export default TypeFilter