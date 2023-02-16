import DualLayout from '@/Layouts/DualLayout';
import { Link } from '@inertiajs/inertia-react';
import NormalButton from '@/Components/NormalButton';
import SelectLang from '@/Components/SelectLang';
import Pagination from '@/Components/PaginateByFront';
import { useState } from 'react';

export default function TagIndex(props){
    
    const _tags = props.tags;
    const _languages = props.languages;

    const [language_id, setLanguage_id] = useState('all');
    const [page, setPage] = useState(1);
    
    const changeLang = (event)=>{
        setLanguage_id(event.target.value);
        console.log(language_id);
    };
    
    const clickPage = (p)=>{
        setPage(p);
    };
    
    let views = _tags;
    if(language_id != 'all'){
        views = views.filter((tag)=>tag.language_id == language_id);
    }
    
    const limit = Math.ceil(views.length / 20);
    
    const tags = views.slice( (page - 1) * 20, (page * 20) ).map((tag)=>
        <div>
            <div className='py-2'>
                <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                    <div className='py-4 flex justify-between'>
                        <div vertical-align='middle' className='px-2'>
                            {tag.name}
                        </div>
                        
                        {props.auth.user != null &&
                        <div align='right' className='px-2 flex'>
                            
                            <div>
                                <Link href={route('home_t', tag.id)}>
                                    <NormalButton>問題を見る</NormalButton>
                                </Link>
                            </div>
                            
                            <div className='pl-3'>
                                <Link href={route('edit_t', tag.id)}>
                                    <NormalButton>編集</NormalButton>
                                </Link>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">タグ一覧</h2>}
        >
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-4'>
                <div>言語選択</div>
                <div>
                    <SelectLang
                        languages={_languages}
                        changeLang={changeLang}
                        init={'all'}
                        selected={language_id}
                    />
                </div>
                
                { views[0] != null ?
                <div className='pb-10'>
                    {tags}
                </div>
                :
                <div align='center'>
                    選択した言語のタグはありません
                </div>
                }
            </div>
            
            { views[0] != null &&
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