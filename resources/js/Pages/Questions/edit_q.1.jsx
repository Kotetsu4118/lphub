import DualLayout from '@/Layouts/DualLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import SelectLang from '@/Components/SelectLang';




export default function EditQ(props) {
    
    const _tags = props.tags; 
    const question = props.question;
    const checked_tag = new Set(props.checked_tag);
    const _languages = props.languages;
    
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        title: question.title,
        body: question.body,
        answer: question.answer,
        checked_tag_data : checked_tag,
        language_id : question.language_id,
    });
    
    
    const clickTag = function(id){
        if(data.checked_tag_data.has(id)){
            data.checked_tag_data.delete(id);
            setData('checked_tag_data', data.checked_tag_data);
        }else{
            setData('checked_tag_data', data.checked_tag_data.add(id));
        }
        console.log(data.checked_tag_data);
        
    };
    
    const changeLang = function(event){
        // console.log('event.value:'+event.target.value);
        // console.log('type:'+ typeof(event.target.value));
        
        data.language_id = Number(event.target.value);
        
        setData('language_id', data.language_id);
        data.checked_tag_data.clear();
        setData('checked_tag_data', data.checked_tag_data);
        console.log('data.language_id:'+data.language_id);
        console.log('type:'+ typeof(data.language_id));
        console.log(data.checked_tag_data);
        console.log('');
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
                    checked={data.checked_tag_data.has(tag.id)}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                {tag.name}
            </div>
            
    );
    
    const submit = (e) => {
        e.preventDefault();
        
        put('/questions/' + question.id);
    };
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">編集：{question.title}</h2>}
        >
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-4'>
            <form onSubmit={submit} className="mt-6 space-y-6">
                
                <div>言語選択：</div>
                <div className='flex'>
                    <div>
                        <SelectLang
                            languages={_languages}
                            changeLang={changeLang}
                            selected={question.language_id}
                        />
                    </div>
                    
                    <div className='pl-5'>
                        言語を変更するとタグのチェックが外れます
                    </div>
                </div>
            
                
                <div className='py-4'>
                    
                    <InputLabel for="title" value="タイトル" />
                    <TextInput
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            handleChange={(e) => setData('title', e.target.value)}
                            // required
                            isFocused
                            
                            // autoComplete="name"
                    />
                    
                    <InputError className="mt-2" message={errors.title} />
                    
                </div>
                
            
                <div className='py-4'>
                    
                    <InputLabel for="body" value="問題" />
                    <TextInput
                            id="body"
                            className="mt-1 block w-full h-44"
                            value={data.body}
                            handleChange={(e) => setData('body', e.target.value)}
                            required
                            name='question[body]'
                            // autoComplete="name"
                    />
                    {/*
                    <InputError className="mt-2" message={errors.question.body} />
                    */}    
                </div>
                
                <div class='py-4'>
                    
                    <InputLabel for="answer" value="答え" />
                    <TextInput
                            id="answer"
                            className="mt-1 block w-full h-44"
                            value={data.answer}
                            handleChange={(e) => setData('answer', e.target.value)}
                            required
                            name='question[answer]'
                            // autoComplete="name"
                    />
                    {/*
                    <InputError className="mt-2" message={errors.question.answer} />
                    */}    
                </div>
                
                {/*タグ*/}
                <div className=''>
                    <div>
                        タグの設定：   
                    </div>
                    <div className='py-2 flex flex-wrap'>
                        {tags}
                    </div>
                </div> 
                
                <hr className='py-2'/>
            
                <div className="py-2">
                    <PrimaryButton  onClick={(e)=>(
                    // console.log(data.checked_tag_data),
                    setData('put_tags', Array.from(data.checked_tag_data))
                    )} 
                    processing={processing}>保存</PrimaryButton>
                </div>
            </form>
            
            <div className="py-2">
                <Link href={'/questions/' + question.id}>
                <PrimaryButton processing={processing}>キャンセル</PrimaryButton>
                </Link>
            </div>
            
        </div>
        </DualLayout>
    );
}