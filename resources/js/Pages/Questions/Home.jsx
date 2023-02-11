import DualLayout from '@/Layouts/DualLayout';
import { Link, useForm } from '@inertiajs/inertia-react';
import SelectLang from '@/Components/SelectLang';
import {useState} from 'react';
import NormalButton from '@/Components/NormalButton';
import QuestionsLayout from '@/Components/QuestionsLayout';
import Pagination from '@/Components/PaginateByFront';

export default function Home(props) {
    
    const { data, setData, get, put, processing, reset, } = useForm({
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
    const [hiddenMine, setHiddenMine] = useState(false);
    
    const changeHiddenMine = (hidden)=>{
        setHiddenMine(!hidden);
    };
    
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
    
    let _views = views;
    
    if(hiddenMine){
        _views = views.filter((question)=> question.user_id != props.auth.user.id);
    }
    
    _views.sort((a,b)=>{
        return a[sorted] < b[sorted] ? -1 : 1;
    });
    
    
    if(desc){
        _views.reverse();
    }
    
    const limit = Math.ceil(_views.length / 20);
    
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
    
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={
                <div className='flex justify-between'>
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>
                    </div>
                    {/*
                    { questions[0] != null &&
                    <div className='px-2' align='right'>
                        <NormalButton onClick={
                            checkMode==false ? checkModeOn : checkModeOff
                        }>
                            {checkMode==false ? '選択操作' : 'やめる'}
                        </NormalButton>
                    </div>
                    }
                    */}
                </div>
            }
        >

            <QuestionsLayout
                checkMode={checkMode}
                checkAll={checkAll}
                releaseAll={releaseAll}
                needConfirm={false}
                processing={processing}
                deletionMessage={'選択した問題を「完了した」から削除しますか？'}
                isHome={true}
                isLogin={props.auth.user != null}
                hiddenMine={hiddenMine}
                changeHiddenMine={changeHiddenMine}
                
                questions={_views.slice( (page - 1) * 20, (page * 20) )}
                languages={_languages}
                changeLang={changeLang}
                checked={data.checked}
                clickCheckBox={clickCheckBox}
                clickQuestion={clickQuestion}
                language_id={language_id}
                isNull={questions[0] == null}
                nullMessage={'「完了した」問題がありません'}
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