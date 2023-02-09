import { useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import DualLayout from '@/Layouts/DualLayout';
import QuestionIndex from '@/Components/QuestionIndex';
import NormalButton from '@/Components/NormalButton';
import DeleteForm from '@/Components/DeleteForm'
import SelectLang from '@/Components/SelectLang';

export default function MyCompletes(props){
    
    const questions = props.questions;
    const _languages = props.languages;
    
    const [checkMode, setCheckMode] = useState(false);
    const [language_id, setLanguage_id] = useState('all');
    
    const { data, setData, get, put, errors, processing, reset, transform } = useForm({
        checked : new Set(),
    });
    
    const clickQuestion = (id)=>{
        get(route('view_q', id));
    };
    
    
    const changeLang = (event)=>{
        setLanguage_id(event.target.value);
        reset();
        console.log(language_id);
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
    
    
    const checkModeOn = ()=>{
        setCheckMode(true);
    };
    
    const checkModeOff = ()=>{
        setCheckMode(false);
        reset();
    };
    
    const checkAll = ()=>{
        
        const all = new Set(); 
        questions.data.forEach(function(question){
            all.add(question.id);
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
    
     const Detach = (e) => {
        e.preventDefault();
        
        data.checked = Array.from(data.checked);

        put(route('delete_complete_flags'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => (reset(), setCheckMode(false)),
        });
        data.checked = new Set();
    };
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={
                <div className='flex justify-between'>
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">完了した問題</h2>
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
                            onSubmit={Detach}
                            processing={processing}
                            closeModal={closeModal}
                            message={'選択した問題を「完了した」から削除しますか？'}
                            needConfirm={false}
                        />
                    </div>
                </div>
            </div>
            }
            
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
            
                <div>言語選択</div>
                <div>
                    <SelectLang
                        languages={_languages}
                        changeLang={changeLang}
                        init={'all'}
                        selected={language_id}
                    />
                </div>
                
                { questions.data[0] != null ?
                <QuestionIndex
                    questions={questions}
                    checked={data.checked}
                    checkMode={checkMode}
                    clickCheckBox={clickCheckBox}
                    clickQuestion={clickQuestion}
                    selected_lang={language_id}
                />
                :
                <div className='text-lg text-center'>「完了した」問題がありません</div>
                }
            </div>
        </DualLayout>
    );
}