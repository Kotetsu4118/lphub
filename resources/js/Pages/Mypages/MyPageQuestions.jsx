import { useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import DualLayout from '@/Layouts/DualLayout';
import NormalButton from '@/Components/NormalButton';
import QuestionsLayout from '@/Components/QuestionsLayout';
import Pagination from '@/Components/PaginateByFront';

export default function MyPageQuestions(props){
    const questions = props.questions;
    const _languages = props.languages;
    
    const status = props.status;
    const Mrssages = {'laters': '後で解く問題', 'completes': '完了した問題', 'creates': '作成した問題'};
    
    const { data, setData, get, put, delete:destroy, processing, reset, errors, } = useForm({
        checked : new Set(),
    });
    
    
    const [checkMode, setCheckMode] = useState(false);
    const [language_id, setLanguage_id] = useState('all');
    const [sorted, setSorted] = useState('created_at');
    // const [views, setViews] = useState(questions);
    const [page, setPage] = useState(1);
    const [desc, setDesc] = useState(true);
    const [confirmContents, setConfirmContents] = useState(new Set);
    
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
    
    let views = questions;
    
    // 言語選択
    const changeLang = (event)=>{
        setLanguage_id(event.target.value);
        reset();
        
        
    };
    
    if(language_id == 'all' ){
        views = questions;
    }else{
        views = questions.filter(question=>question.language_id == language_id);
    }
    
    
    
    views.sort((a,b)=>{
        if(desc){
            if(a[sorted] > b[sorted]) return -1;
            if(a[sorted] < b[sorted]) return 1;
        }else{
            if(a[sorted] < b[sorted]) return -1;
            if(a[sorted] > b[sorted]) return 1;
        }
        
        if(a.id < a.id) return -1;
        if(a.id > a.id) return 1;
    });
    
    
    
    const limit = Math.ceil(views.length / 20);
    
    const clickQuestion = (id)=>{
        get(route('view_q', id));
    };
    
    
    
    const clickCheckBox = (id)=>{
        const title = views.find( q => q.id==id ).title;
        const _checked = new Set(data.checked);
        const _confirmContents = new Set(confirmContents);
         
        if(confirmContents.has(title)){
            _confirmContents.delete(title);
            setConfirmContents(_confirmContents);
            
        }else{
            setConfirmContents(_confirmContents.add(title));
            
        }
        
        
        if(data.checked.has(id)){
            // const _checked = new Set(data.checked);
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
        
        const checked_all = new Set();
        const confirmContents_all = new Set();
        
        views.forEach(function(question){
            checked_all.add(question.id);
            confirmContents_all.add(question.title);
        });
        
        setConfirmContents(confirmContents_all);
        setData('checked', checked_all);
    };
    
    const releaseAll = ()=>{
        setConfirmContents(new Set());
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
        
        if(status=='laters'){
            put(route('delete_later_flags'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => (reset(), setCheckMode(false)),
            });
        }else if(status=='completes'){
            put(route('delete_complete_flags'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onFinish: () => (reset(), setCheckMode(false)),
            });
            
        }else{
            destroy(route('delete_creates'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => (reset(), setCheckMode(false)),
            });
        }
        
        
        data.checked = new Set();
    };
    
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={
                <div className='flex justify-between'>
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">{Mrssages[status]}</h2>
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
            <div onClick={()=>(console.log(confirmContents))}>contentsを見る</div>
            <div onClick={()=>(console.log(data.checked))}>checkedを見る</div>

            <div className='pb-10'>
                <QuestionsLayout
                    checkMode={checkMode}
                    checkAll={checkAll}
                    releaseAll={releaseAll}
                    onDengerButton={confirmQuestionDeletion}
                    showModal={confirmingDetach}
                    closeModal={closeModal}
                    needConfirm={status == 'creates'}
                    onSubmitDeletion={Delete}
                    processing={processing}
                    deletionMessage={'選択した問題を' + Mrssages[status] + 'から削除しますか？'}
                    
                    questions={views.slice( (page - 1) * 20, (page * 20) )}
                    languages={_languages}
                    changeLang={changeLang}
                    checked={data.checked}
                    clickCheckBox={clickCheckBox}
                    clickQuestion={clickQuestion}
                    language_id={language_id}
                    isNull={questions[0] == null}
                    nullMessage={Mrssages[status]+'がありません'}
                    noViewsMessage={'選択した言語の問題はありません'}
                    needUser={!(status == 'creates')}
                    
                    selectSort={selectSort}
                    desc={desc}
                    changeOrder={changeOrder}
                    confirmContents={confirmContents}
                    
                    errors={errors}
                
                />
            </div>
            
            { !(questions[0] == null || views[0] == null) &&
            <div className='bottom-0 fixed w-full'>
                <Pagination
                    page={page}
                    limit={limit}
                    clickPage={clickPage}
                    footer={true}
                />
            </div>
            }
        </DualLayout>
    );
}