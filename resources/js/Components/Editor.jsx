// import ExampleTheme from "@Plugins/ExampleTheme";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "@/Plugins/TreeViewPlugin";
import Toolbar from "@/Plugins/preToolbar";
import CtrlEnterPlugin from "@/Plugins/CtrlEnterPlugin";
import {TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin';

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";




import ListMaxIndentLevelPlugin from "@/Plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "@/Plugins/CodeHighlightPlugin";
// import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}





export default function Editor({languages, func}) {
    const [editor] = useLexicalComposerContext();
    const editorState = editor.getEditorState();
    const jsonString = JSON.stringify(editorState);
    func(jsonString);
    // func(editorState.toJSON());
  
  return (
    <>

      <div  className="editor-container">
        
        <Toolbar 
          languages={languages}
        />
        
        <div id='unko'  className="editor-inner">
          <div className='overflow-y-auto overflow-x-hidden h-96'>
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            // ErrorBoundary={LexicalErrorBoundary}
            
            
          />
          </div>
          <HistoryPlugin />
          
          <TreeViewPlugin />
          
          <AutoFocusPlugin />
          
          <CodeHighlightPlugin />
          
          <ListPlugin />
          <LinkPlugin />
          {/*
          <AutoLinkPlugin />
          */}
          
          <ListMaxIndentLevelPlugin maxDepth={3} />
          
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          
          <TabIndentationPlugin />
          
          <CtrlEnterPlugin />
        </div>
      </div>
    </>
  );
}
