import DualLayout from '@/Layouts/DualLayout';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import TagForm from '@/Pages/Tags/TagsComponents/TagForm';

export default function CreateTag(props) {
    const _languages = props.languages;
    
    const { data, setData, post, errors, processing, reset } = useForm({
        name : '',
        language_id : '',
    });
    
    const changeLang = (event)=>{
        setData('language_id', event.target.value);
        console.log(data.language_id);
    };
    
    const onhandleChange = (event)=>{
        setData(event.target.id, event.target.value);  
    };
    
    const clickReset = ()=>{
        reset();
    };
    
    const submit = (e) => {
        e.preventDefault();
        post(route('store_t'));
    };
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">タグ作成</h2>}
        >
            <div onClick={()=>(console.log(data))}>Debag</div>

            <TagForm
                languages={_languages}
                selected_lang={data.language_id}
                init_lang={true}
                name_value={data.name}
                onhandleChange={onhandleChange}
                submit={submit}
                errors={errors}
                processing={processing}
                clickReset={clickReset}
                cancel_link={route('home')}
                changeLang={changeLang}
            />
        
        </DualLayout>
    );
}