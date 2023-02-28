import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
    KEY_ENTER_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
  $getSelection,
  $createParagraphNode,
  ParagraphNode,
  $wrapNodes,
  insertNewAfter,
  insertParagraph,
  createParentElementNode,
  getNextSibling,
} from "lexical";





export default function CtrlEnterPlugin({blockType}){
    const [editor] = useLexicalComposerContext();
    
    useEffect(()=>{
        return editor.registerCommand(KEY_ENTER_COMMAND, (payload) => {
          const event = payload;
          event.preventDefault();
          // Handle enter key presses here
          const selection = $getSelection();
          const anchorNode = selection.anchor.getNode();
          const element =
            anchorNode.getKey() === "root"
              ? anchorNode
              : anchorNode.getTopLevelElementOrThrow();
          console.log('element：',element);
          console.log('selection：', selection);
          console.log('anchorNode：', anchorNode);
          console.log('getNextSibling：', anchorNode.getNextSibling());
          if(event.ctrlKey){
            if(element.getType() == 'code'){
                event.preventDefault();
                // $wrapNodes(selection, ()=>$createParagraphNode());
            }
            else if(element.getType() !== 'paragraph'){
                event.preventDefault();
                editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);
                
                editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);
                editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);
            }
            
          }
          return false;
        }, 1);
        
    }, [editor]);
    
    
    
    return null;
}