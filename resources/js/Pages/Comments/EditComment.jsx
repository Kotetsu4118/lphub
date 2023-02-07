import DualLayout from '@/Layouts/DualLayout';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import CommentForm from '@/Pages/Comments/CommentComponents/CommentForm';
import { useState } from 'react'
import DeleteForm from '@/Components/DeleteForm'


export default function EditComment(props){
    const comment = props.comment;
    const [confirmingCommentDeletion, setConfirmingCommentDeletion] = useState(false);
    
    const { data, setData, put, delete: destroy, errors, processing, reset, transform } = useForm({
        comment : comment.body,
        confirm : '',
    });
    
    const onhandleChange = (event)=>{
        setData(event.target.id, event.target.value);
    };
    
    // 削除系
    const confirmCommentDeletion = () => {
        setConfirmingCommentDeletion(true);
    };
    
    const closeModal = () => {
        setConfirmingCommentDeletion(false);

        reset();
    };
    
     const deleteComment = (e) => {
        e.preventDefault();

        destroy(route('destroy_c', comment.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    
    const submit = (e) => {
        e.preventDefault();

        put(route('update_c', comment.id));
    };
    
    const clickReset = ()=>{
        reset();
    };
    
    return(
        <DualLayout 
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">コメントの編集</h2>}
        >
        <div onClick={()=>(console.log(data))}>Debag</div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
                <CommentForm
                    value={data.comment}
                    onhandleChange={onhandleChange}
                    errors={errors}
                    processing={processing}
                    clickReset={clickReset}
                    submit={submit}
                    cancel_link
                />
                
                <div className='py-4'>
                    <DeleteForm
                        onDengerButton={confirmCommentDeletion}
                        showModal={confirmingCommentDeletion}
                        onClose={closeModal}
                        onSubmit={deleteComment}
                        text_id={'confirm'}
                        input_value={data.confirm}
                        label_value={'確認'}
                        processing={processing}
                        handleChange={onhandleChange}
                        errors={errors}
                        closeModal={closeModal}
                    />
                
                </div>
            </div>
        </DualLayout>
    );
}