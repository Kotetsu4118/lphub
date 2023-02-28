import DualLayout from '@/Layouts/DualLayout';
import { Link, useForm, } from '@inertiajs/inertia-react';
import QuestionForm from '@/Pages/Questions/QuestionComponents/QuestionForm';
import { useRef } from 'react';

import "@/Plugins/styles.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import Theme from '@/Plugins/Theme';
import Editor from '@/Components/Editor';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

export default function CreateQ(props) {
    
    const _tags = props.tags; 
    const _languages = props.languages;
    const default_tags = new Set();
    
    const { data, setData, post, errors, processing, reset } = useForm({
        title : '',
        body : '',
        answer : '',
        checked_tag : default_tags,
        language_id : '',
        post_tags : '',
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
                className='hover:cursor-pointer mr-2' 
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
        setData(event.target.id, event.target.value);  
    };
    
    
    const submit = (e) => {
        e.preventDefault();
        
        data.body = JSON.stringify(body.current);
        data.answer = JSON.stringify(answer.current);
        data.post_tags = Array.from(data.checked_tag);
        post('/questions');
    };
    
    
    const clickClear = ()=>{
        reset();
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
      
      
        const body = useRef();
        const answer = useRef();
      
      const bodyConfig = {
          theme: Theme(),
          nodes: nodes,
          onError(error) {throw error;},
      };
      const answerConfig = {
          theme: Theme(),
          nodes: nodes,
          onError(error) {throw error;},
      };
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">問題作成</h2>}
        >
        
            <QuestionForm
                languages={_languages}
                selected_lang={data.language_id}
                tags={tags}
                init_lang={true}
                title_value={data.title}
                errors={errors}
                processing={processing}
                submit={submit}
                changeLang={changeLang}
                onhandleChange={onhandleChange}
                cancel_link={'/'}
                clickClear={clickClear}
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
            
        </DualLayout>
    );
}