import DualLayout from '@/Layouts/DualLayout';
import { Link, useForm } from '@inertiajs/inertia-react';
import {useState} from 'react';
import NormalButton from '@/Components/NormalButton';
import PrimaryButton from '@/Components/PrimaryButton';
import QuestionsLayout from '@/Components/QuestionsLayout';
import Pagination from '@/Components/PaginateByFront';
import TextInput from '@/Components/TextInput';

export default function Home(props) {
    
    const { data, setData, get, processing, reset, } = useForm({
    });
    
    const questions = props.questions;
    const _languages = props.languages;
    
    const [language_id, setLanguage_id] = useState('all');
    const [sorted, setSorted] = useState('created_at');
    const [page, setPage] = useState(1);
    const [desc, setDesc] = useState(true);
    const [hiddenMine, setHiddenMine] = useState(false);
    const [searchedQuestions, setSearchedQuestions] = useState(questions);
    const [searchWord, setSearchWord] = useState('');
    const [searchTarget, setSearcTarget] = useState(new Set(['title']));
    
    let views;
    
    const searchReset = ()=>{
        setSearchWord('');
        setSearchedQuestions(questions);
        setSearcTarget(new Set(['title']));
    };
    
    const changeWord = (event)=>{
        setSearchWord(event.target.value);
    };
    
    // 言語選択
    const changeLang = (event)=>{
        setLanguage_id(event.target.value);
    };
    
    // 言語による絞り込み
    if(language_id == 'all' ){
        views = searchedQuestions;
    }else{
        views = searchedQuestions.filter(question=>question.language_id == language_id);
    }
    
    // 検索対象の選択
    const checkSearchTarget = (value)=>{
        const prev = new Set(searchTarget);
        if(prev.has(value)){
            prev.delete(value);
            setSearcTarget(prev);
        }else{
            setSearcTarget(prev.add(value));
        }
    };
    
    
    let tentativeQuestions = new Set(null);
    
    const searchByTarget = (target)=>{
        tentativeQuestions =  new Set([...tentativeQuestions, ...new Set(questions.filter(questions=>questions[target].indexOf(searchWord) > -1))]);
    };
    
    
    const search = ()=>{
        
        Array.from(searchTarget).forEach(target=>
            searchByTarget(target)
        );
        
        setSearchedQuestions(Array.from(tentativeQuestions));
    };
    
    
    
    
    const changeHiddenMine = (hidden)=>{
        setHiddenMine(!hidden);
    };
    
    const changeOrder = (order)=>{
        setDesc(order);
    };
    
    const clickPage = (p)=>{
        setPage(p);
    };
    
    // ソート
    const selectSort = (event)=>{
        setSorted(event.target.value);
    };
    
    const test = [];
    
    // 自分が作成した問題の排除
    if(hiddenMine){
        views = views.filter((question)=> question.user_id != props.auth.user.id);
    }
    
    // 並べ替え
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
    
    
    const set1 = new Set([1,2]);
    const set2 = new Set([1,3]);
    
    
    const limit = Math.ceil(views.length / 20);
    
    const clickQuestion = (id)=>{
        get(route('view_q', id));
    };
    
    
    const submit = (e)=>{
        e.preventDefault();
        get(route('home_search', data.searchWord));
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
                </div>
            }
        >
        
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-4'>
                { props.searchWord != null &&
                    <div className>
                        {props.searchWord}：での検索結果
                    </div>
                }
                
                {/*
                <form onSubmit={submit} className="mt-6 space-y-6">
                */}
                <div className='flex'>
                    <div className='flex-1 w-auto'>
                        <TextInput
                            className="mt-1 block w-full"
                            value={searchWord}
                            handleChange={(e) => changeWord(e)}
                            // required
                            isFocused
                        />
                    </div>
                    <div className='flex'>
                        {/*
                        <PrimaryButton processing={processing}>検索</PrimaryButton>
                        */}
                        <div className='px-2'>
                            <NormalButton onClick={()=>search()} processing={processing}>検索</NormalButton>
                        </div>
                        <div className=''>
                            <NormalButton onClick={()=>searchReset()} >検索リセット</NormalButton>
                        </div>
                    </div>
                </div>
                {/*
                </form>
                */}
                
                
                <div className='flex text-sm pt-1'>
                    検索対象：
                    <div className='px-2 hover:cursor-pointer' onClick={()=>checkSearchTarget('title')}>
                        タイトル
                        <input type='checkbox' className='hover:cursor-pointer' checked={searchTarget.has('title')}/>
                    </div>
                    <div className='px-2 hover:cursor-pointer' onClick={()=>checkSearchTarget('body')}>
                        本文
                        <input type='checkbox' className='hover:cursor-pointer' checked={searchTarget.has('body')}/>
                    </div>
                    <div className='px-2 hover:cursor-pointer' onClick={()=>checkSearchTarget('answer')}>
                        答え
                        <input type='checkbox' className='hover:cursor-pointer' checked={searchTarget.has('answer')}/>
                    </div>
                </div>
                
            
                <div className='pb-10 pt-4'>
                    <QuestionsLayout
                        needConfirm={false}
                        processing={processing}
                        deletionMessage={'選択した問題を「完了した」から削除しますか？'}
                        isHome={true}
                        isLogin={props.auth.user != null}
                        hiddenMine={hiddenMine}
                        changeHiddenMine={changeHiddenMine}
                        
                        questions={views.slice( (page - 1) * 20, (page * 20) )}
                        languages={_languages}
                        changeLang={changeLang}
                        clickQuestion={clickQuestion}
                        language_id={language_id}
                        isNull={questions[0] == null}
                        nullMessage={'当てはまる問題がありません'}
                        noViewsMessage={'当てはまる問題がありません'}
                        needUser={true}
                        
                        selectSort={selectSort}
                        desc={desc}
                        changeOrder={changeOrder}
                    
                    />
                </div>
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