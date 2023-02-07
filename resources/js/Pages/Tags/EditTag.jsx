import DualLayout from '@/Layouts/DualLayout';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import TagForm from '@/Pages/Tags/TagsComponents/TagForm';

export default function EditTag(props) {
    const _languages = props.languages;
    const _name = props.tag.name;
    const _language_id = props.tag.language_id;
    
    const { data, setData, post, errors, processing, reset } = useForm({
        name : _name,
        language_id : _language_id,
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
        post(route('update_t', props.tag.id));
    };
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">タグの編集：{data.name}（言語＝{_languages[data.language_id].name}）</h2>}
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
                cancel_link={route('index_t')}
                changeLang={changeLang}
            />
        
        </DualLayout>
    );
}