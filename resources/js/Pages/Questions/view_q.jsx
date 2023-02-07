import DualLayout from '@/Layouts/DualLayout';
import NormalButton from '@/Components/NormalButton';
import SelectLevel from '@/Components/SelectLevel';
import CompleteLater from '@/Components/CompleteLater';
import QuestionTags from '@/Components/QuestionTags';
import Collapse from '@/Components/Collapse';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { useState } from 'react'


export default function View_q(props){
    
    const question = props.question;
    const selected_level = props.selected_level;
    
    const { data, setData, put, errors, processing, recentlySuccessful, reset } = useForm({
        complete : props.complete_flag,
        later : props.later_flag,
        level : selected_level,
        g4q : props.g4q,
        g4c : '',
    });
    
    const [open, setOpen] = useState(false);
    const clickAnswer = () => setOpen((prev) => !prev);
    
    const comments = props.comments.map((comment)=>
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
                        {props.logined && props.auth.user.id != comment.user_id &&(
                            <div className='pl-3'>
                                <label>いいね：</label>
                                <input type='checkbox' value={comment.id} defaultChecked={comment.g4c_hasmany_exists} onClick={(e)=>(changeG4C(e))}/>
                            </div>
                        )}
                        
                    </div>
                    
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
        
        put('/questions/' + question.id + '/level', data.level);
    };
    
    return (
        <DualLayout 
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{question.title}</h2>}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className='p-4'>
                        
                        <div className='flex'>
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
                        
                        
                        {/*フラグ管理*/}
                        { props.logined && props.auth.user.id != question.user.id && (
                        
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
                        { props.logined && props.auth.user.id != question.user_id && (
                        <div className='py-2'>
                            難易度を評価する：
                            <SelectLevel
                                selected={selected_level}
                                changeLevel={changeLevel}
                            />
                            
                        </div>
                        )}
                        
                        {/*問題内容*/}
                        <div className="p-4">
                            <div>
                                問題：
                                <br/>
                                { question.body }
                            </div>
                        
                        
                        {/*答え*/}
                            <div className='pt-4'>
                                <Collapse
                                    opened_label={'答え：隠す'}
                                    closed_label={'答え：見る'}
                                    opened={open}
                                    contents={question.answer}
                                    onClick={clickAnswer}
                                    width={'w-20'}
                                />
                            </div>
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
                        {props.logined && props.auth.user.id != question.user_id &&(
                        <div className='py-2'>
                            <label>いいね：</label>
                            <input type='checkbox' defaultChecked={props.g4q} onClick={(e)=>(changeG4Q(e))}/>
                        </div>
                        )}
                        
                        {/*編集の導線*/}
                        { props.logined && props.auth.user.id == question.user_id && (
                            
                            <div className="pt-2">
                                <Link href={route('edit_q', question.id)}>
                                    <NormalButton >編集</NormalButton>
                                </Link>
                            </div>
                                
                        )}
                        
                        
                    </div>
                </div>
                
                {/*ここからはコメント系*/}
                <hr className='py-4'/>
                    <div>コメント系</div>
                
                { comments[0] ?
                    <div className='py-6'>
                        {comments}
                    </div>
                :
                    <div className='py-6'>
                        コメントはまだありません
                    </div>
                }
            </div>
            
            
            
            
        </DualLayout>
    );
    
}