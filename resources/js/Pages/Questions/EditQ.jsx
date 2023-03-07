import DualLayout from '@/Layouts/DualLayout';
import { useForm } from '@inertiajs/inertia-react';
import QuestionForm from '@/Pages/Questions/QuestionComponents/QuestionForm';
import DeleteForm from '@/Components/DeleteForm';
import { useState, useRef } from 'react';

import "@/Plugins/styles.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import Theme from '@/Plugins/Theme';
import Editor from '@/Components/Editor';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';



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
        
    };
    
    const changeLang = (event)=>{
        
        data.checked_tag = default_tags;
        setData('language_id', event.target.value);
    };
    
    
    const tags = _tags.map((tag)=>
        
            <div style={{ display: data.language_id == tag.language_id ? '' : 'none' }} 
                className='mr-2 hover:cursor-pointer' 
                onClick={()=>(
                clickTag(tag.id)
                
            )}>
                <input type='checkbox' 
                    id={tag.id}
                    name={tag.id}
                    value={tag.id}
                    checked={data.checked_tag.has(tag.id)}
                    className="rounded border-gray-300 shadow-sm focus:ring-indigo-500 hover:cursor-pointer"
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
        
        if(typeof body.current != 'undefined'){
            data.body = JSON.stringify(body.current);
        }
        
        if(typeof answer.current != 'undefined'){
            data.answer = JSON.stringify(body.current);
        }
        data.put_tags = Array.from(data.checked_tag);
        put(route('update_q', question.id));
    };
    
    
    const clickReset = ()=>{
        data.body = question.body;
        data.answer = question.answer;
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
    
    
    // ----------------------------------------------------
    const nodes = [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        AutoLinkNode,
        LinkNode
      ];
      
      const initialBody = question.body;
      const initialAnswer = question.answer;
      
        const body = useRef();
        const answer = useRef();
      
      const bodyConfig = {
          editorState: initialBody,
          theme: Theme(),
          nodes: nodes,
          onError(error) {throw error;},
      };
      const answerConfig = {
          editorState: initialAnswer,
          theme: Theme(),
          nodes: nodes,
          onError(error) {throw error;},
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
                body={
                    <LexicalComposer initialConfig={bodyConfig}>
                        <Editor
                          languages={props.languages}
                          editMode={true}
                          selectedLang={_languages.find((q)=>q.id==data.language_id)}
                        />
                        <OnChangePlugin onChange={editorState => body.current = editorState}/>
                    </LexicalComposer>
                }
                answer={
                    <LexicalComposer initialConfig={answerConfig}>
                        <Editor
                          languages={props.languages}
                          editMode={true}
                          selectedLang={_languages.find((q)=>q.id==data.language_id)}
                        />
                        <OnChangePlugin onChange={editorState => answer.current = editorState}/>
                    </LexicalComposer>
                }
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