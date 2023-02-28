import { useForm, } from '@inertiajs/inertia-react';
import NormalButton from '@/Components/NormalButton';
// import { useRef } from 'react';

import Editor from '@/Components/Editor';
import DualLayout from '@/Layouts/DualLayout';
import "@/Plugins/styles.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import TreeViewPlugin from "@/Plugins/TreeViewPlugin";

import Theme from '@/Plugins/Theme';

import {$getSelection} from 'lexical';



export default function Practice(props){
  const { data, post, errors, processing} = useForm({
    title : 'LexicalTest1',
    language_id : 6,
    body : null,
    answer : null,
  });
  
  // const bodyRef = useRef();
  // const answerRef = useRef();
  
  const loadContent =  () => {
  // 'empty' editor
  const value = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

  return value;
  };
  
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

  const bodyEditor = loadContent();
  const answerEditor = loadContent();
  
  let body;
  let answer;

const bodyConfig = {
  editorState : bodyEditor,
  namespace: 'body',
  theme: Theme(),
  onError(error) {
    throw error;
  },
  nodes: nodes
};

const answerConfig ={
  editorState : answerEditor,
  namespace: 'answer',
  theme: Theme(),
  onError(error) {
    throw error;
  },
  nodes: nodes
};

  

  const submit = (e)=>{
    e.preventdefault;
    data.body = JSON.stringify(body);
    data.answer = JSON.stringify(answer);
    
    post(route('sotre_q'));
    // data.json = null;
  };
  
  
  
  return(
    <DualLayout
      logined={props.auth.user != null}
      auth={props.auth}
      header={
          <div className='flex justify-between'>
              <div>
                  <h2 className="font-semibold text-xl text-gray-800 leading-tight">練習なり</h2>
              </div>
          </div>
      }
    >

    <div onClick={()=>(console.log(JSON.stringify(body)))}>bodyを見る</div>

    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-4'>
      <div className='py-4'>
        <LexicalComposer initialConfig={bodyConfig} >
          <Editor
            languages={props.languages}
            editMode={true}
          />
          
          <OnChangePlugin onChange={editorState => body = editorState}/>
          <TreeViewPlugin />
        </LexicalComposer>
      </div>
      
      <div className='py-4'>
        <LexicalComposer initialConfig={answerConfig} className='py-4'>
          <Editor
            languages={props.languages}
            editMode={true}
          />
          <OnChangePlugin onChange={editorState => answer = editorState}/>
          <TreeViewPlugin />
        </LexicalComposer>
      </div>
      
      <div>
          <NormalButton onClick={(e)=>submit(e)}>保存</NormalButton>
      </div>
    
    </div>
    
    </DualLayout>
  );
}