import DualLayout from '@/Layouts/DualLayout';
import Pagination from '@/Components/Paginate';
import { Link, useForm } from '@inertiajs/inertia-react';
import SelectLang from '@/Components/SelectLang';
import QuestionIndex from '@/Components/QuestionIndex';
import {useState} from 'react';

export default function Home(props) {
    
    const _languages = props.languages;
    
    const [language_id, setLanguage_id] = useState('all');
    
    const {get} = useForm();
    
    const clickQuestion = (id)=>{
        get(route('view_q', id));
    };
    
    const changeLang = (event)=>{
        setLanguage_id(event.target.value);
        console.log(language_id);
    };
    
    return(
        
        <DualLayout 
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-4'>
                <div onClick={()=>(console.log(language_id))}>dataを見る</div>

                <div>言語選択</div>
                <div>
                    <SelectLang
                        languages={_languages}
                        changeLang={changeLang}
                        init={'all'}
                        selected={language_id}
                    />
                </div>
                
                <div>
                    <QuestionIndex
                        questions={props.questions}
                        clickQuestion={clickQuestion}
                        checked={new Set()}
                        selected_lang={language_id}
                    />
                </div>
            </div>
            
        </DualLayout>
        
        
        
    );
}