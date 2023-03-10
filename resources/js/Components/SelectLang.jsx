export default function SelectLang({languages, changeLang, selected, init,}){
  
  const contents = languages.map((language)=>
        <option selected={selected == language.id} value={language.id} className='text-xs'>{language.name}</option>
    );
  
  return(
      <select onChange={(e)=>(changeLang(e))} className='w-36 text-sm'>
          { init == 'all' && 
            <option selected value='all' className='text-xs'>全て</option>
          }
          
          { init == !null && init != 'all' && (
            <option selected hidden className='text-xs'>言語を選択</option>
          )}
          {contents}
      </select>
  );
}
