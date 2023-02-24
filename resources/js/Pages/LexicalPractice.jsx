import { Link, useForm, } from '@inertiajs/inertia-react';
import NormalButton from '@/Components/NormalButton';

import Editor from '@/Components/Editor';
import DualLayout from '@/Layouts/DualLayout';
import "./styles.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";


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

const exampleTheme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem"
    },
    olDepth: [
      "editor-list-ol1",
      "editor-list-ol2",
      "editor-list-ol3",
    ],
    ulDepth: [
      "editor-list-ul1",
      "editor-list-ul2",
      "editor-list-ul3",
    ],
    listitem: "editor-listitem"
  },
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    hashtag: "editor-text-hashtag",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
    code: "editor-text-code"
  },
  code: "editor-code",
  codeHighlight: {
    atrule: "editor-tokenAttr",
    attr: "editor-tokenAttr",
    boolean: "editor-tokenProperty",
    builtin: "editor-tokenSelector",
    cdata: "editor-tokenComment",
    char: "editor-tokenSelector",
    class: "editor-tokenFunction",
    "class-name": "editor-tokenFunction",
    comment: "editor-tokenComment",
    constant: "editor-tokenProperty",
    deleted: "editor-tokenProperty",
    doctype: "editor-tokenComment",
    entity: "editor-tokenOperator",
    function: "editor-tokenFunction",
    important: "editor-tokenVariable",
    inserted: "editor-tokenSelector",
    keyword: "editor-tokenAttr",
    namespace: "editor-tokenVariable",
    number: "editor-tokenProperty",
    operator: "editor-tokenOperator",
    prolog: "editor-tokenComment",
    property: "editor-tokenProperty",
    punctuation: "editor-tokenPunctuation",
    regex: "editor-tokenVariable",
    selector: "editor-tokenSelector",
    string: "editor-tokenSelector",
    symbol: "editor-tokenProperty",
    tag: "editor-tokenProperty",
    url: "editor-tokenOperator",
    variable: "editor-tokenVariable"
  }
};



const bodyConfig = {
  namespace: 'body',
  // The editor theme
  theme: exampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: nodes
  // [
  //   HeadingNode,
  //   ListNode,
  //   ListItemNode,
  //   QuoteNode,
  //   CodeNode,
  //   CodeHighlightNode,
  //   AutoLinkNode,
  //   LinkNode
  // ]
};

const answerConfig ={
  namespace: 'answer',
  // The editor theme
  theme: exampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: nodes
};



export default function Practice(props){
  const { data, post, errors, processing} = useForm({
    title : 'LexicalTest2',
    language_id : 6,
    body : null,
    answer : null,
  });
  
  const updateBody = (str)=>{
    data.body = str;
  };
  
  const updateAnswer = (str)=>{
    data.answer = str;
  };
  

  const submit = (e)=>{
    e.preventdefault;
    // post('/test');
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

    <div onClick={()=>(console.log(data.body))}>bodyを見る</div>

    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-4'>
      <LexicalComposer id='unko' initialConfig={bodyConfig}>
        <Editor
          languages={props.languages}
          formdata={data.body}
          func={updateBody}
        />
      </LexicalComposer>
      
      <LexicalComposer initialConfig={answerConfig}>
        <Editor
          languages={props.languages}
          formdata={data.answer}
          func={updateAnswer}
        />
      </LexicalComposer>
      
      <div>
          <NormalButton onClick={(e)=>submit(e)}>保存</NormalButton>
      </div>
    
    </div>
    
    </DualLayout>
  );
}