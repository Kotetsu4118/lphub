export default function CompleteLater({complete, later, question_id, user_id, changeComplete, changeLater}){
    return(
        <div className='flex'>
            <div>
                <label for='later'>後で</label>
                <input id='later' onClick={(e)=>(changeLater(e))} type='checkbox' value={user_id} defaultChecked={later} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
            </div>
            
            <div className='pl-3'>
                <label for='complete'>完了</label>
                <input id='complete' onClick={(e)=>(changeComplete(e))} type='checkbox' value={user_id} defaultChecked={complete} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
            </div>
        </div>
    );
}