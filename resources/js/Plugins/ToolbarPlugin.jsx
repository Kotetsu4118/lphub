import { 
    TbH1, TbH2, TbAlignCenter, TbAlignJustified, TbAlignLeft, TbAlignRight, TbIndentDecrease, TbIndentIncrease, TbCode,
    TbList, TbListNumbers, TbBold, TbUnderline, TbUnlink, TbStrikethrough, TbSubscript, TbSuperscript, TbItalic, TbBlockquote
} from "react-icons/tb";

import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";


import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isParentElementRTL,
  $wrapNodes,
  $isAtNodeEnd
} from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode
} from "@lexical/list";
import { createPortal } from "react-dom";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
} from "@lexical/rich-text";
import {
  $createCodeNode,
  $isCodeNode,
  // getDefaultCodeLanguage,
  getCodeLanguages
} from "@lexical/code";


const LowPriority = 1;

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol"
]);

const blockTypeToBlockName = {
  code: "Code Block",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List"
};

function Divider() {
  return <div className="divider" />;
}



function Select({ onChange, className, options, value }) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value="" />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function getSelectedNode(selection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

  
  

export default function Toolbar({languages, selectedLang}) {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [codeLanguage, setCodeLanguage] = useState('python');
  const [isRTL, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSuperScript, setIsSuperScript] = useState(false);
  const [isSubScript, setIsSubScript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isQuote, setIsQuote] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberList, setIsNumberList] = useState(false);
  // const [isHeading, setIsHeading] = useState(false);
  
  const _selectedLang = selectedLang;
  
  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h1"));
        }
      });
    }else{
      formatParagraph();
    }
  };

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h2"));
        }
      });
    }else{
      formatParagraph();
    }
  };
  
  
  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }else{
      formatParagraph();
    }
    
  };
  
  const isCreateCOdeNode = useRef();
  
  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
          isCreateCOdeNode.current = true;
        }
      });
    }else{
      formatParagraph();
    }
  };
  
  if(isCreateCOdeNode.current==true){
    editor.update(() => {
      const node = $getNodeByKey(selectedElementKey);
      if ($isCodeNode(node)) {
        if(selectedLang!=null){
          node.setLanguage(selectedLang.name.toLowerCase());
        }else{
          node.setLanguage('python');
        }
      }
    });
    isCreateCOdeNode.current=false;
  }
  
  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);
      editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);
      formatParagraph();
      
    }
  };
  
  const formatNumberList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);
      editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);
      formatParagraph();
    }
  };
  
  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
  };
  

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
          setIsBulletList(type == "ul");
          setIsNumberList(type == "ol");
          setIsCode(false);
          setIsQuote(false);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          setIsBulletList(false);
          setIsNumberList(false);
          setIsCode(false);
          setIsQuote(false);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || 'python');
            setIsCode(true);
          }
          if($isQuoteNode(element)){
            setIsQuote(true);
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSuperScript(selection.hasFormat("superscript"));
      setIsSubScript(selection.hasFormat("subscript"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }else{
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            if(selectedLang != null){
              node.setLanguage(selectedLang);
            }else{
              node.setLanguage('python');
            }
          }
          
        }
      });
    },
    [editor, selectedElementKey]
  );



  const langs = languages.map((lang)=>
      lang.name.toLowerCase()
  );
  
  const superScript = ()=>{
    if(isSubScript){
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
    }
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
  };
  
  const subScript = ()=>{
    if(isSuperScript){
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
    }
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
  };
  
  return (
    
    <div className="toolbar flex" ref={toolbarRef}>
      
      {/*Redo Undo*/}

      <div className='flex'>
        <button
          type='button'
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND);
          }}
          className="toolbar-item spaced"
          aria-label="Undo"
        >
          <AiOutlineUndo className='h-6 w-auto' />
        </button>
        <button
          type='button'
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND);
          }}
          className="toolbar-item"
          aria-label="Redo"
        >
          <AiOutlineRedo className='h-6 w-auto'/>
        </button>
        <Divider />
        
        </div>
            <div>
            {/*一段目*/}
            <div className='flex'>
              <button
                type='button'
                onClick={() => {
                  editor.dispatchCommand(INDENT_CONTENT_COMMAND);
                }}
                className="toolbar-item spaced "
                aria-label="Indent"
              >
                <TbIndentIncrease className='h-6 w-auto'/>
              </button>
              <button
                type='button'
                onClick={() => {
                  editor.dispatchCommand(OUTDENT_CONTENT_COMMAND);
                }}
                className="toolbar-item spaced "
                aria-label="outdent"
              >
                <TbIndentDecrease className='h-6 w-auto'/>
              </button>
              
              <Divider />
              
              <button
                type='button'
                onClick={() => 
                  formatLargeHeading()
                }
                className={"toolbar-item spaced " + (blockType=='h1' ? "active" : "")}
                aria-label="LargeHeading"
                // disabled={isCode}
              >
                <TbH1 className='h-6 w-auto'/>
              </button>
              <button
                type='button'
                onClick={() => 
                  formatSmallHeading()
                }
                className={"toolbar-item spaced " + (blockType=='h2' ? "active" : "")}
                aria-label="SmallHeading"
                // disabled={isCode}
              >
                <TbH2 className='h-6 w-auto'/>
              </button>
              <button
                type='button'
                onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }}
                className={"toolbar-item spaced " + (isBold ? "active" : "")}
                aria-label="FormatBold"
                // disabled={isCode}
              >
                <TbBold className='h-6 w-auto'/>
              </button>
              <button
                type='button'
                onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }}
                className={"toolbar-item spaced " + (isItalic ? "active" : "")}
                aria-label="Format Italics"
                // disabled={isCode}
              >
                <TbItalic className='h-6 w-auto'/>
              </button>
              <button
                type='button'
                onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                }}
                className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
                aria-label="Format Underline"
                // disabled={isCode}
              >
                <TbUnderline className='h-6 w-auto'/>
              </button>
              <button
                type='button'
                onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
                }}
                className={
                  "toolbar-item spaced " + (isStrikethrough ? "active" : "")
                }
                aria-label="Format Strikethrough"
                // disabled={isCode}
              >
                <TbStrikethrough className='h-6 w-auto'/>
              </button>
              <button
                type='button'
                onClick={() => {
                  superScript();
                }}
                className={
                  "toolbar-item spaced " + (isSuperScript ? "active" : "")
                }
                aria-label="Format SuperScript"
                // disabled={isCode}
              >
                <TbSuperscript className='h-6 w-auto'/>
              </button>
              <button
                type='button'
                onClick={() => {
                  subScript();
                }}
                className={
                  "toolbar-item spaced " + (isSubScript ? "active" : "")
                }
                aria-label="Format SubScript"
                // disabled={isCode}
              >
                <TbSubscript className='h-6 w-auto'/>
              </button>
            </div>
            
            <hr />
            
            {/*二段目*/}
            <div className='flex'>
              <button
                type='button'
                onClick={() => formatQuote()}
                className={"toolbar-item spaced " + (isQuote ? "active" : "")}
                aria-label="Insert Quote"
              >
                <TbBlockquote className='h-6 w-auto'/>
              </button>
              <button
                type='button'
                onClick={() => formatCode()}
                className={"toolbar-item spaced " + (isCode ? "active" : "")}
                aria-label="Insert Code"
              >
                <TbCode className='h-6 w-auto'/>
              </button>
              
              <Divider />
              
              <button
                type='button'
                onClick={() => formatBulletList()}
                className={"toolbar-item spaced " + (isBulletList ? "active" : "")}
                aria-label="Insert Code"
              >
                <TbList className='h-6 w-auto'/>
              </button>
              
              <button
                type='button'
                onClick={() => formatNumberList()}
                className={"toolbar-item spaced " + (isNumberList ? "active" : "")}
                aria-label="Insert Code"
              >
                <TbListNumbers className='h-6 w-auto'/>
              </button>
              
              
              <Divider />
              
              <button
                type='button'
                onClick={() => {
                  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
                }}
                className="toolbar-item spaced"
                aria-label="Left Align"
                disabled={isCode}
              >
                <TbAlignLeft className='h-6 w-auto'/>
              </button>
              <button
                type='button'
                onClick={() => {
                  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
                }}
                className="toolbar-item spaced"
                aria-label="Center Align"
                disabled={isCode}
              >
                <TbAlignCenter className='h-6 w-auto'/>
              </button>
              <button
                type='button'
                onClick={() => {
                  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
                }}
                className="toolbar-item spaced"
                aria-label="Right Align"
                disabled={isCode}
              >
                <TbAlignRight className='h-6 w-auto'/>
              </button>
              <button 
                type='button'
                onClick={() => {
                  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
                }}
                className="toolbar-item"
                aria-label="Justify Align"
                disabled={isCode}
              >
                <TbAlignJustified className='h-6 w-auto'/>
              </button>
              
              {blockType === "code" &&
                <div className='flex'>
                  <Divider />
                  <div className='selectLang pt-3'>言語選択：</div>
                  <Select
                    className="toolbar-item code-language"
                    onChange={onCodeLanguageSelect}
                    options={langs}
                    value={codeLanguage}
                  />
                </div>
              }
          </div>  
        </div>
    </div>
  );
}
