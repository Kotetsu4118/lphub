export default function SelectLevel({changeLevel, selected, init}){
    const levels = [];
    
    for(let i = 1; i<=10; i++){
        levels.push(<option className='text-xs' selected={selected == i} value={i}>{i}</option>);
    }
    
    
    return(
        <select onChange={(e)=>(changeLevel(e))} className='h-8 w-40 text-xs'>
            { selected == null &&(
              <option selected hidden className='text-xs'>まだ評価していません</option>
            )}
            {levels}
        </select>
    );
}