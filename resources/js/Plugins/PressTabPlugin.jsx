import { KEY_TAB_COMMAND, OUTDENT_CONTENT_COMMAND, INDENT_CONTENT_COMMAND } from '@lexical/rich-text';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";


export default function PressTabPlugin(){
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return KEY_TAB_COMMAND,
       (payload) => {
         const event = payload;
         event.preventDefault();
         return editor.dispatchCommand(
           event.shiftKey ? OUTDENT_CONTENT_COMMAND : INDENT_CONTENT_COMMAND,
         );
       };
      }, [editor]);
  
  
  return null;
}