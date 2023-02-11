export default function Sort({options, onChange, width='', className = ''}){
    return(
        <div>
            <select onChange={(e)=>onChange(e)} className={'text-xs' + width + className}>
                {options}
            </select>
        </div>
    );
}