export default function SelectLevel({changeLevel, selected, init}){
    const levels = [];
    
    for(let i = 1; i<=10; i++){
        levels.push(<option selected={selected == i} value={i}>{i}</option>);
    }
    
    
    return(
        <select onChange={(e)=>(changeLevel(e))} className='h-10 w-48'>
            { selected == null &&(
              <option selected hidden>まだ評価していません</option>
            )}
            {levels}
        </select>
    );
}