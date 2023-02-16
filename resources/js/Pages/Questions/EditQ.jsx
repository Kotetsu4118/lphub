import DualLayout from '@/Layouts/DualLayout';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import QuestionForm from '@/Pages/Questions/QuestionComponents/QuestionForm';
import DeleteForm from '@/Components/DeleteForm'
import { useState } from 'react'

export default function EditQ(props) {
    const question = props.question;
    const _tags = props.tags; 
    const _languages = props.languages;
    const default_tags = new Set(props.checked_tag);
    
    const [confirmingCommentDeletion, setConfirmingCommentDeletion] = useState(false);
    
    const { data, setData, put,　delete: destroy, errors, processing, reset, transform } = useForm({
        title : question.title,
        body : question.body,
        answer : question.answer,
        checked_tag : default_tags,
        language_id : question.language_id,
        post_tags : '',
        init_lang : false,
        confirm : '',
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
        event.preventDefault();
        setData(event.target.id, event.target.value);  
    };
    
    
    const submit = (e) => {
        e.preventDefault();

        data.put_tags = Array.from(data.checked_tag);
        put(route('update_q', question.id));
    };
    
    
    const clickReset = ()=>{
        reset();
    };
    
    // 削除系
    const confirmCommentDeletion = () => {
        setConfirmingCommentDeletion(true);
    };
    
    const closeModal = () => {
        setConfirmingCommentDeletion(false);

        reset();
    };
    
     const deleteQuestion = (e) => {
        e.preventDefault();

        destroy(route('delete_q', question.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">問題の編集：{question.title}</h2>}
        >

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
                cancel_link={route('view_q', question.id)}
                clickClear={clickReset}
            />
            
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-4'>
                <div className='py-4'>
                    <DeleteForm
                        onDengerButton={confirmCommentDeletion}
                        showModal={confirmingCommentDeletion}
                        onClose={closeModal}
                        onSubmit={deleteQuestion}
                        text_id={'confirm'}
                        input_value={data.confirm}
                        label_value={'確認'}
                        processing={processing}
                        handleChange={onhandleChange}
                        errors={errors}
                        closeModal={closeModal}
                        message={'この問題を削除しますか?'}
                    />
                
                </div>
            </div>
        
        </DualLayout>
    );
}