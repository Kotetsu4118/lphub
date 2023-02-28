import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";

import Toolbar from "@/Plugins/ToolbarPlugin";
import CtrlEnterPlugin from "@/Plugins/CtrlEnterPlugin";
import {TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin';

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


export default function Editor({languages, selectedLang, editMode}) {
  
  
  return (
    <>

      <div  className="editor-container">
        
        { editMode &&
        <Toolbar 
          languages={languages}
          selectedLang={selectedLang}
        />
        }
        <div className="editor-inner">
          <div className={ editMode ? 'overflow-y-auto overflow-x-hidden h-96' : ''}>
          <RichTextPlugin
            contentEditable={ 
              <ContentEditable className="editor-input" />
            }
            placeholder={<Placeholder />}
            // ErrorBoundary={LexicalErrorBoundary}
            
          />
          </div>
          <HistoryPlugin />
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
