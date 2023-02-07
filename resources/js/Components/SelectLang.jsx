export default function SelectLang({languages, changeLang, selected, init,}){
  
  const contents = languages.map((language)=>
        <option selected={selected == language.id} value={language.id}>{language.name}</option>
    );
  
  return(
      <select onChange={(e)=>(changeLang(e))} className='w-36'>
          { init == !null &&(
              <option selected hidden>言語を選択</option>
          )}
          {contents}
      </select>
  );
}
