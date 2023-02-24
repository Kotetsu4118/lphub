import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
    KEY_ENTER_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
  $getSelection,
  $createParagraphNode,
  $setBlocksType_experimental,
  ParagraphNode,
  $wrapNodes,
  insertNewAfter,
} from "lexical";





export default function CtrlEnterPlugin({blockType}){
    const [editor] = useLexicalComposerContext();
    
    useEffect(()=>{
        return editor.registerCommand(KEY_ENTER_COMMAND, (payload) => {
          // Handle enter key presses here
          const selection = $getSelection();
          const anchorNode = selection.anchor.getNode();
          const element =
            anchorNode.getKey() === "root"
              ? anchorNode
              : anchorNode.getTopLevelElementOrThrow();
          
          const event = payload;
          if(event.ctrlKey){
            if(element.getType() == 'code'){
                console.log(element);
                event.preventDefault();
                // editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);
                // $setBlocksType_experimental(selection, ()=>ParagraphNode);
                // $wrapNodes(selection, ()=>$createParagraphNode());
                // insertNewAfter(selection, false);
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