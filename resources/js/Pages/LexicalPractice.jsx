import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';


// import ExampleTheme from "./themes/ExampleTheme";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";
// import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

// import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
// import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
// import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

export default function Practice(){
    const onChange = (editorState)=> {
      editorState.read(() => {
        // Read the contents of the EditorState here.
        const root = $getRoot();
        const selection = $getSelection();
    
        console.log(root, selection);
      });
    };
    
    const MyCustomAutoFocusPlugin = ()=> {
      const [editor] = useLexicalComposerContext();
    
      useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
      }, [editor]);
    
      return null;
    };
    
    const onError = (error)=> {
        console.error(error);
    };
    
    const initialConfig = {
        namespace: 'MyEditor', 
        // theme,
        onError,
    };
    
    
    
    return(
        <>
            <div>
                でいやっ
            </div>
            <div className='w-44 px-2'>
                <LexicalComposer initialConfig={initialConfig}>
                  <PlainTextPlugin
                    contentEditable={<ContentEditable />}
                    placeholder={<div>Enter some text...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                  />
                  <OnChangePlugin onChange={onChange} />
                  <HistoryPlugin />
                  <MyCustomAutoFocusPlugin />
                </LexicalComposer>
                
                <LexicalComposer initialConfig={initialConfig}>
                  <RichTextPlugin
                    contentEditable={<ContentEditable />}
                    ErrorBoundary={LexicalErrorBoundary}
                    placeholder={<div>うんちーーーーー</div>}
                  />
                  <OnChangePlugin onChange={onChange} />
                  <HistoryPlugin />
                  <MyCustomAutoFocusPlugin />
                </LexicalComposer>
                
            </div>
        </>
    );
}