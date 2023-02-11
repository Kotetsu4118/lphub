import { useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import DualLayout from '@/Layouts/DualLayout';
import NormalButton from '@/Components/NormalButton';
import QuestionsLayout from '@/Components/QuestionsLayout';
import Pagination from '@/Components/PaginateByFront';

export default function MyCreates(props){
    
    const { data, setData, get, delete:destroy, processing, reset, } = useForm({
        checked : new Set(),
    });
    
    const questions = props.questions;
    const _languages = props.languages;
    
    const [checkMode, setCheckMode] = useState(false);
    const [language_id, setLanguage_id] = useState('all');
    const [sorted, setSorted] = useState('created_at');
    const [views, setViews] = useState(questions);
    const [page, setPage] = useState(1);
    const [desc, setDesc] = useState(true);
    
    
    
    const changeOrder = (order)=>{
        setDesc(order);
        reset();
    };
    
    const clickPage = (p)=>{
        setPage(p);
        reset();
    };
    
    // ソート
    const selectSort = (event)=>{
        setSorted(event.target.value);
        reset();
    };
    
    // 言語選択
    const changeLang = (event)=>{
        setLanguage_id(event.target.value);
        reset();
        
        if(event.target.value == 'all' ){
            setViews(questions);
        }else{
            setViews(questions.filter(question=>question.language_id == event.target.value));
        }
        
    };
    
    
    
    views.sort((a,b)=>{
        return a[sorted] < b[sorted] ? -1 : 1;
    });
    
    
    if(desc){
        views.reverse();
    }
    
    const limit = Math.ceil(views.length / 20);
    
    const clickQuestion = (id)=>{
        get(route('view_q', id));
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
        questions.forEach(function(question){
            all.add(question.id);
        });
        
        setData('checked', all);
    };
    
    const releaseAll = ()=>{
        reset();
    };
    
    // 削除系
    const [confirmingDetach, setConfirmingDetach] = useState(false);
    
    const confirmQuestionDeletion = () => {
        setConfirmingDetach(true);
    };
    
    const closeModal = () => {
        setConfirmingDetach(false);

    };
    
     const Delete = (e) => {
        e.preventDefault();
        
        data.checked = Array.from(data.checked);

        destroy(route('delete_creates'), {
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
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">作成した問題</h2>
                    </div>
                    { questions[0] != null &&
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
        <div onClick={()=>(console.log(questions))}>questionsを見る</div>
        
            <QuestionsLayout
                checkMode={checkMode}
                checkAll={checkAll}
                releaseAll={releaseAll}
                onDengerButton={confirmQuestionDeletion}
                showModal={confirmingDetach}
                closeModal={closeModal}
                needConfirm={false}
                onSubmitDeletion={Delete}
                processing={processing}
                deletionMessage={'選択した問題を「作成した」から削除しますか？'}
                
                questions={views.slice( (page - 1) * 20, (page * 20) )}
                languages={_languages}
                changeLang={changeLang}
                needUser={false}
                checked={data.checked}
                clickCheckBox={clickCheckBox}
                clickQuestion={clickQuestion}
                language_id={language_id}
                isNull={questions[0] == null}
                nullMessage={'「作成した」問題がありません'}
                noViewsMessage={'選択した言語の問題はありません'}
                
                selectSort={selectSort}
                desc={desc}
                changeOrder={changeOrder}
            
            />
            
            { !(questions[0] == null || views[0] == null) &&
            <Pagination
                page={page}
                limit={limit}
                clickPage={clickPage}
                footer={true}
            />
            }
        </DualLayout>
        
        
    );
}