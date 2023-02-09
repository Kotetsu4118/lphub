import DualLayout from '@/Layouts/DualLayout';
import { useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import NormalButton from '@/Components/NormalButton';
import DeleteForm from '@/Components/DeleteForm'
import Collapse from '@/Components/Collapse';

export default function MyCommnets(props){
    
    const _questions = props.questions;
    // const comment_group = props.comment_group;
    const _comments = props.comments;
    
    const [isOpen, setIsOpen] = useState(new Set());
    const [checkMode, setCheckMode] = useState(false);
    
    const clickTitle = (event) => {
        if(isOpen.has(event.target.value)){
            const checked = new Set(isOpen);
            checked.delete(event.target.value);
            setIsOpen(checked);
        }else{
            setIsOpen(new Set(isOpen).add(event.target.value));
        }
    };
    
    
    // const questionComments = questions.map((question)=>{
         
    // });
    
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
            onFinish: () => (reset(), setCheckMode(false)),
        });
        data.checked = new Set();
    };
    
    const comments = _comments.map((comment)=>
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
    );
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={
                <div className='flex justify-between'>
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">作成した問題</h2>
                    </div>
                    <div className='px-2' align='right'>
                        <NormalButton onClick={
                            checkMode==false ? checkModeOn : checkModeOff
                        }>
                            {checkMode==false ? '選択操作' : 'やめる'}
                        </NormalButton>
                    </div>
                </div>
            }
        >
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
        
            <div onClick={()=>(console.log(data))}>dataを見る</div>

            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
                {comments}
            </div>
        </DualLayout>
    );
}