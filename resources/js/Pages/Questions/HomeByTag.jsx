import DualLayout from '@/Layouts/DualLayout';
import { Link, useForm } from '@inertiajs/inertia-react';
import {useState} from 'react';
import NormalButton from '@/Components/NormalButton';
import PrimaryButton from '@/Components/PrimaryButton';
import QuestionsLayout from '@/Components/QuestionsLayout';
import Pagination from '@/Components/PaginateByFront';
import TextInput from '@/Components/TextInput';

export default function HomeByTag(props) {
    
    const { data, setData, get, processing, reset, } = useForm({
        searchWord : props.searchWord,
    });
    
    const questions = props.questions;
    const _languages = props.languages;
    let views = questions;
    
    const [language_id, setLanguage_id] = useState('all');
    const [sorted, setSorted] = useState('created_at');
    const [page, setPage] = useState(1);
    const [desc, setDesc] = useState(true);
    const [hiddenMine, setHiddenMine] = useState(false);
    // const [searchWord, setSearchWord] = useState(null);
    const [searchTarget, setSearcTarget] = useState(new Set().add('title'));
    const [onSearch, setOnSearch] = useState(false);
    
    const changeWord = (event)=>{
        setData('searchWord',event.target.value);
    };
    
    const checkSearchTarget = (value)=>{
        const prev = new Set(searchTarget);
        if(prev.has(value)){
            prev.delete(value);
            setSearcTarget(prev);
        }else{
            setSearcTarget(prev.add(value));
        }
    };
    
    
    
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
    };
    
    // 言語による絞り込み
    if(language_id == 'all' ){
        views = questions;
    }else{
        views = questions.filter(question=>question.language_id == language_id);
    }
    
    
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
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">タグ検索：{props.tag_name}</h2>
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
                        
                        language_valid={false}
                    
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