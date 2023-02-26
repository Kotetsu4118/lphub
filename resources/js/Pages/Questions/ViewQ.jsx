import DualLayout from '@/Layouts/DualLayout';
import NormalButton from '@/Components/NormalButton';
import SelectLevel from '@/Components/SelectLevel';
import CompleteLater from '@/Components/CompleteLater';
import QuestionTags from '@/Components/QuestionTags';
import Collapse from '@/Components/Collapse';
import { Link, useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import CommentForm from '@/Pages/Comments/CommentComponents/CommentForm';
import Pagination from '@/Components/PaginateByFront';

// リッチテキストエディタ系
import "@/Plugins/styles.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import Theme from '@/Plugins/Theme';
import Editor from '@/Components/Editor';


export default function View_q(props){
    
    const question = props.question;
    const selected_level = props.selected_level;
    
    const { data, setData, post, put, errors, processing, recentlySuccessful, reset } = useForm({
        complete : props.complete_flag,
        later : props.later_flag,
        level : selected_level,
        g4q : props.g4q,
        g4c : '',
        comment : '',
    });
    
    const [isOpen, setIsOpen] = useState(false);
    const clickAnswer = () => setIsOpen((prev) => !prev);
    const [page, setPage] = useState(1);
    const limit = Math.ceil(props.comments.length / 10);
    
    const clickPage = (p)=>{
        setPage(p);
    };
    
    // コメント
    const comments = props.comments.slice( (page - 1) * 10, (page * 10) ).map((comment)=>
        <div className='py-4'>
            <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                <div className='pl-3'>
                    <div className='flex py-2'>
                        <div className='flex'>
                            <img class='h-8 w-auto' src={ comment.user.user_icon_path }/>
                            <div className='text-lg p-1'>{comment.user.name}</div>
                        </div>
                        <div>
                            { comment.created_at }
                        </div>
                    
                    </div>
                    
                    
                    <div className='pt-2 px-6'>
                        { comment.body }
                    </div>
                    
                    <div class='flex py-2'>
                        <div>
                            いいね数：{ comment.g4c_hasmany_count }
                        </div>
                        
                        {/*いいねする*/}
                        {/*ログインしている || ログインユーザidとコメントユーザidの不一致*/}
                        {props.auth.user != null && props.auth.user.id != comment.user_id &&(
                            <div className='pl-3'>
                                <label>いいね：</label>
                                <input type='checkbox' value={comment.id} defaultChecked={comment.g4c_hasmany_exists} onClick={(e)=>(changeG4C(e))}/>
                            </div>
                        )}
                        
                        
                    </div>
                    
                    {props.auth.user != null && props.auth.user.id == comment.user_id &&(
                        <div className="py-2">
                            <Link href={route('edit_c', comment.id)}>
                                <NormalButton>編集</NormalButton>
                            </Link>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    );
    
    const changeLevel = (event)=>{
        event.preventDefault();
        // setData('level', event.target.value);
        data.level = event.target.value;
        console.log(data.level);
        put('/questions/' + question.id + '/level');
    };
    
    const changeComplete = (event)=>{
        data.complete = !data.complete;
        console.log(data.complete);
        put(route('update_complete', question.id));
    };
    
    const changeLater = (event)=>{
        data.later = !data.later;
        console.log(data.later);
        put(route('update_later', question.id));
    };
    
    const changeG4Q = (event)=>{
        data.g4q = !data.g4q;
        console.log(data.g4q);
        put(route('update_g4q', question.id));
    };
    
    const changeG4C = (event)=>{
        console.log(event.target.checked);
        data.g4c = event.target.checked;
        // console.log(data.g4c);
        put(route('update_g4c', event.target.value));
    };
    
    const submit = (e) => {
        e.preventDefault();
        
        post(route('store_c', question.id));
    };
    
    const onhandleChange = (event)=>{
        setData(event.target.id, event.target.value);  
    };
    
    const resetComment = ()=>{
        reset('comment');
    };
    
    // ----------------------------------------------------
    // リッチテキストエディタ系
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
      
      const initialBody = question.body;
      const initialAnswer = question.answer;
      
      const bodyConfig = {
          editorState: initialBody,
          editable: false,
          theme: Theme(),
          nodes: nodes,
          onError(error) {throw error;},
      };
      const answerConfig = {
          editorState: initialAnswer,
          editable: false,
          theme: Theme(),
          nodes: nodes,
          onError(error) {throw error;},
      };
    
    return (
        <DualLayout 
            logined={props.auth.user != null}
            auth={props.auth}
            header={
                <div>
                    <h2 className="font-semibold text-2xl text-gray-800 leading-tight">{question.title}</h2>
                    <div className='pl-3 pt-2 text-sm flex'>
                        <div>
                            {question.level_hasmany_avg_level ?
                                <div>難易度(全ユーザ平均)：{Math.round(question.level_hasmany_avg_level * 100) / 100}</div> :
                                <div>難易度(全ユーザ平均)：未評価</div>
                            }
                        </div>
                        
                        <div className='pl-5'>
                            いいね数：{ question.g4q_hasmany_count }
                        </div>
                    </div>
                </div>
            }
        >

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className='p-4'>
                        
                        {/*フラグ管理*/}
                        { props.auth.user != null && props.auth.user.id != question.user.id && (
                        
                        <div className='py-2'>
                            <CompleteLater
                                user_id={props.auth.user.id}
                                complete={props.complete_flag}
                                later={props.later_flag}
                                changeLater={changeLater}
                                changeComplete={changeComplete}
                            />
                        </div>
                        )}
                        
                        {/*難易度の評価-->*/}
                        { props.auth.user != null && props.auth.user.id != question.user_id && (
                        <div className='py-2'>
                            難易度を評価する：
                            <SelectLevel
                                selected={selected_level}
                                changeLevel={changeLevel}
                            />
                            
                        </div>
                        )}
                        
                        {/*問題内容*/}
                        <div className="py-2">
                            
                            <div>
                                <div className='text-base'>問題：</div>
                                {/*
                                <div className='pt-2'>{ question.body }</div>
                                */}
                            </div>
                            
                            <LexicalComposer initialConfig={bodyConfig}>
                                <Editor editMode={false} />
                            </LexicalComposer>
                        
                        {/*答え*/}
                            <div className='pt-4'>
                                <Collapse
                                    opened_label={'答えを隠す'}
                                    closed_label={'答えを見る'}
                                    opened={isOpen}
                                    contents={
                                        // question.answer
                                        <LexicalComposer initialConfig={answerConfig}>
                                            <Editor editMode={false} />
                                        </LexicalComposer>
                                    }
                                    onClick={clickAnswer}
                                    width={'w-20'}
                                />
                            </div>
                        </div>
                        
                        <div>
                            
                            
                            
                        </div>
                        
                        <div className='py-4 flex'>
                            <div className='pr-4'>
                                作成者：{ question.user.name }
                            </div>
                                
                            <div className='pr-4'>
                                作成日：{ question.created_at }
                            </div>
                            
                            <div>
                                更新日：{ question.updated_at }
                            </div>
                        </div>

                        
                        {/*タグの表示*/}
                        <div>
                            <QuestionTags
                                tags={props.tags}
                            />
                        </div>
                        
                        {/*いいね*/}
                        {props.auth.user != null && props.auth.user.id != question.user_id &&(
                        <div className='py-2'>
                            <label>いいね：</label>
                            <input type='checkbox' defaultChecked={props.g4q} onClick={(e)=>(changeG4Q(e))}/>
                        </div>
                        )}
                        
                        {/*編集の導線*/}
                        { props.auth.user != null && props.auth.user.id == question.user_id && (
                            
                            <div className="pt-2">
                                <Link href={route('edit_q', question.id)}>
                                    <NormalButton >編集</NormalButton>
                                </Link>
                            </div>
                                
                        )}
                        
                        
                    </div>
                </div>
                
                {/*ここからはコメント系*/}
                
                <div className='py-6'>
                コメント
                { comments[0] ?
                <div>
                    {comments}
                    <div className>
                        <Pagination
                            page={page}
                            limit={limit}
                            clickPage={clickPage}
                            footer={false}
                        />
                    </div>
                </div>
                :
                <div>
                    コメントはまだありません
                </div>
                }
                </div>
                
                <CommentForm
                    value={data.comment}
                    onhandleChange={onhandleChange}
                    errors={errors}
                    processing={processing}
                    clickReset={resetComment}
                    submit={submit}
                    submitValue={'送信'}
                />
                
            </div>
            
        </DualLayout>
    );
    
}