import DualLayout from '@/Layouts/DualLayout';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
// import SelectLang from '@/Components/SelectLang';
import QuestionForm from '@/Pages/Questions/QuestionComponents/QuestionForm';




export default function EditQ(props) {
    const question = props.question;
    const _tags = props.tags; 
    const _languages = props.languages;
    const default_tags = new Set(props.checked_tag);
    
    const { data, setData, put, errors, processing, reset, transform } = useForm({
        title : question.title,
        body : question.body,
        answer : question.answer,
        checked_tag : default_tags,
        language_id : question.language_id,
        post_tags : '',
        init_lang : false,
    });
    
    
    const clickTag = (id)=>{
        if(data.checked_tag.has(id)){
            const changed_tag = new Set(data.checked_tag);
            changed_tag.delete(id);
            setData('checked_tag', changed_tag);
        }else{
            
            setData('checked_tag', new Set(data.checked_tag).add(id));
        }
        console.log(data.checked_tag);
        
    };
    
    const changeLang = (event)=>{
        
        data.checked_tag = default_tags;
        setData('language_id', event.target.value);
        console.log(data.language_id);
    };
    
    
    const tags = _tags.map((tag)=>
        
            <div style={{ display: data.language_id == tag.language_id ? '' : 'none' }} 
                className='px-2' 
                onClick={()=>(
                clickTag(tag.id)
                
            )}>
                <input type='checkbox' 
                    id={tag.id}
                    name={tag.id}
                    value={tag.id}
                    checked={data.checked_tag.has(tag.id)}
                    className="rounded border-gray-300 shadow-sm focus:ring-indigo-500"
                />
                {tag.name}
            </div>
            
    );
    
    
    const onhandleChange = (event)=>{
        setData(event.target.id, event.target.value);  
    };
    
    
    const submit = (e) => {
        e.preventDefault();

        data.put_tags = Array.from(data.checked_tag);
        put(route('update_q', question.id));
    };
    
    
    const clickClear = ()=>{
        reset();
    };
    
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">編集：{question.title}</h2>}
        >
        <div onClick={()=>(console.log(data))}>Debag</div>
        <div onClick={()=>(console.log(props.checked_tag))}>props.checked_tag</div>

            <QuestionForm
                languages={_languages}
                selected_lang={data.language_id}
                tags={tags}
                init_lang={data.init_lang}
                title_value={data.title}
                body_value={data.body}
                answer_value={data.answer}
                errors={errors}
                processing={processing}
                submit={submit}
                changeLang={changeLang}
                onhandleChange={onhandleChange}
                cancel_link={'/'}
                clickClear={clickClear}
            />

        
        </DualLayout>
    );
}