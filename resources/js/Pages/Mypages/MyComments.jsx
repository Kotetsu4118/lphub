import DualLayout from '@/Layouts/DualLayout';
import { useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import NormalButton from '@/Components/NormalButton';
import Sort from '@/Components/Sort';
import Pagination from '@/Components/PaginateByFront';
import DeleteForm from '@/Components/DeleteForm';

export default function MyCommnets(props){
    const _questions = props.questions;
    const _comments = props.comments;
    const Q_comments = props.Q_comments;
    
    const [isClosed, setIsClosed] = useState(new Set());
    
    const [checkMode, setCheckMode] = useState(false);
    const [sortedComments, setSortedComments] = useState(_comments);
    const [page, setPage] = useState(1);
    const [questionMode, setQuestionMode] = useState(false);
    
    let views;
    let limit;
    
    if(questionMode){
        views = _questions.slice( (page - 1) * 10, (page * 10) );
        limit = Math.ceil(_comments.length / 20);
    }else{
        views = sortedComments.slice( (page - 1) * 20, (page * 20) );
        limit = Math.ceil(_questions.length / 10);
    }
    
    const clickPage = (p)=>{
        setPage(p);
    };
    
    // 問題の折り畳み
    const clickTitle = (id) => {
        if(isClosed.has(id)){
            const closed = new Set(isClosed);
            closed.delete(id);
            setIsClosed(closed);
        }else{
            setIsClosed(new Set(isClosed).add(id));
        }
    };
    
    // ソート
    const selectSort = (event)=>{
        const prev_comments = Array.from(sortedComments);
        const sort = event.target.value.split(',');
        
        if(sort[0]=='question_id'){
            setQuestionMode(true);
            return;
        }
        
        prev_comments.sort((a,b)=>{
            return a[sort[0]] < b[sort[0]] ? -1 : 1;
        });
        if(sort[1]=='desc'){
            prev_comments.reverse();
        }
        setSortedComments(prev_comments);
        setQuestionMode(false);
    };
    
    const toQuestion = (id)=>{
        get(route('view_q', id));
    };
    
    const toEdit = (id)=>{
        get(route('edit_c', id));
    };
    
    
    
    const { data, setData, get, delete:destroy, errors, processing, reset, transform } = useForm({
        checked : new Set(),
    });
    
    
    // 選択系
    const checkModeOn = ()=>{
        setCheckMode(true);
    };
    
    const checkModeOff = ()=>{
        setCheckMode(false);
        reset();
    };
    
    const clickCheckBox = (id)=>{
        if(data.checked.has(id)){
            const _checked = new Set(data.checked);
            _checked.delete(id);
            setData('checked', _checked);
        }else{
            setData('checked', new Set(data.checked).add(id));    
        }
        
    };
    
    const checkAll = ()=>{
        
        const all = new Set(); 
        _comments.forEach(function(comment){
            all.add(comment.id);
        });
        
        setData('checked', all);
    };
    
    const releaseAll = ()=>{
        reset();
    };
    
    
    // 削除系
    const [confirmingDetach, setConfirmingDetach] = useState(false);
    
    const confirmCommentDeletion = () => {
        setConfirmingDetach(true);
    };
    
    const closeModal = () => {
        setConfirmingDetach(false);

    };
    
     const Delete = (e) => {
        e.preventDefault();
        
        data.checked = Array.from(data.checked);

        destroy(route('delete_c'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            // onFinish: () => (reset(), ),
        });
        setCheckMode(false);
        data.checked = new Set();
    };
    
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={
                <div className='flex justify-between'>
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">投稿したコメント  </h2>
                    </div>
                    { _comments[0] != null &&
                    <div className='px-2' align='right'>
                        <NormalButton onClick={
                            checkMode==false ? checkModeOn : checkModeOff
                        }>
                            {checkMode==false ? '選択操作' : 'やめる'}
                        </NormalButton>
                    </div>
                    }
                </div>
            }
        >
        { _comments[0] != null ? (
        <div>
            { checkMode &&
            <div className='bg-white bg-opacity-75 h-20'>
                <div className='flex py-4 justify-between'>
                    <div className='flex'>
                        <div className='px-2'>
                            <NormalButton onClick={checkAll} >全選択</NormalButton>
                        </div>
                        <div className='px-2'>
                            <NormalButton onClick={releaseAll}>選択解除</NormalButton>
                        </div>
                    </div>
                    
                    <div align='right' className='px-2'>
                        <DeleteForm
                            onDengerButton={confirmCommentDeletion}
                            showModal={confirmingDetach}
                            onClose={closeModal}
                            onSubmit={Delete}
                            processing={processing}
                            closeModal={closeModal}
                            message={'選択したコメントを削除しますか？'}
                            needConfirm={false}
                        />
                    </div>
                </div>
            </div>
            }
        
            <div onClick={()=>(console.log(views))}>viewsを見る</div>

            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
                <div>
                    <Sort
                        onChange={selectSort}
                        options={
                            <>
                                <option value='created_at,asc' className='text-xs'>作成日時（古い順）</option>
                                <option value='created_at,desc' className='text-xs'>作成日時（新しい順）</option>
                                <option value='updated_at,asc' className='text-xs'>更新日時（古い順）</option>
                                <option value='updated_at,desc' className='text-xs'>更新日時（新しい順）</option>
                                <option value='g4c,desc' className='text-xs'>いいね数（多い順）</option>
                                <option value='g4c,asc' className='text-xs'>いいね数（少ない順）</option>
                                <option value='question_id' className='text-xs'>問題ごと（五十音順）</option>
                            </>
                        }
                    />
                </div>
                
                
                <div className='pb-10'>
                    { !questionMode ?
                        views.map((comment)=>
                            <div className='py-4 flex'>
                                { checkMode &&
                                <div>
                                    <input type='checkbox' 
                                        checked={ data.checked.has(comment.id) } onClick={()=>clickCheckBox(comment.id)}
                                    />
                                </div>
                                }
                                
                                <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg flex-1 w-auto'
                                    onClick={ checkMode && 
                                        (()=>clickCheckBox(comment.id))
                                    }
                                >
                        
                                    <div className='py-4 px-2 flex justify-between'>
                                        <div>
                                            <div>
                                                {comment.body}
                                            </div>
                                            <div className='text-xs flex py-2'>
                                                <div>
                                                    いいね数：{comment.g4c}
                                                </div>
                                                <div className='pl-3'>
                                                    作成日時：{comment.created_at}
                                                </div>
                                            </div>
                                        </div>
                                        <div align='right' className='py-2 flex'>
                                            <div className='px-2'>
                                                <NormalButton onClick={()=>toEdit(comment.id)}>編集</NormalButton>
                                            </div>
                                            <div className='px-2'>
                                                <NormalButton onClick={()=>toQuestion(comment.question_id)}>問題を見る</NormalButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        views.map((question)=>
                            <div className='py-2'>
                                <div className='text-lg'>
                                    <div className='flex justify-between'>
                                        <div className='flex' onClick={(e)=>clickTitle(question.id)}>
                                            問題「{question.title}」へのコメント：
                                        { !isClosed.has(question.id) ?
                                            <div className='px-2'>
                                                閉じる
                                            </div>
                                            :
                                            <div className='px-2'>
                                                開く
                                            </div>
                                        }
                                        </div>
                                        <div align='right' className='px-2'>
                                            <NormalButton onClick={()=>toQuestion(question.id)}>問題を見る</NormalButton>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                { !isClosed.has(question.id) &&
                                    Q_comments[question.id].map((comment)=>
                                        <div className='py-4 flex'>
                                            { checkMode &&
                                                <div>
                                                    <input type='checkbox' 
                                                        checked={ data.checked.has(comment.id) } onClick={()=>clickCheckBox(comment.id)}
                                                    />
                                                </div>
                                            }
                                        
                                            <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg flex-1 w-auto'
                                                onClick={ checkMode && 
                                                    (()=>clickCheckBox(comment.id))
                                                }
                                            >
                                                <div className='py-4 px-2 flex justify-between'>
                                                    <div>
                                                        <div>
                                                            {comment.body}
                                                        </div>
                                                        <div className='text-xs flex py-2'>
                                                            <div>
                                                                いいね数：{comment.g4c_hasmany_count}
                                                            </div>
                                                            <div className='pl-3'>
                                                                作成日時：{comment.created_at}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div align='right' className='py-2'>
                                                        <div className='px-2'>
                                                            <NormalButton onClick={()=>toEdit(comment.id)}>編集</NormalButton>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            
            <div className='bottom-0 fixed w-full'>
                <Pagination
                    page={page}
                    limit={limit}
                    clickPage={clickPage}
                    footer={true}
                />
            </div>
        </div>)
            :
            <div className='text-lg text-center py-4'>投稿したコメントがありません</div>
        }
        </DualLayout>
    );
}