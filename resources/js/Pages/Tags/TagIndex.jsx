import DualLayout from '@/Layouts/DualLayout';
import { Link, useForm } from '@inertiajs/inertia-react';
import NormalButton from '@/Components/NormalButton';
import SelectLang from '@/Components/SelectLang';

export default function TagIndex(props){
    
    const _tags = props.tags;
    const _languages = props.languages;

    const { data, setData } = useForm({
        language_id : 'all',
    });
    
    const changeLang = (event)=>{
        setData('language_id', event.target.value);
        console.log(data.language_id);
    };
    
    const tags = _tags.map((tag)=>
        <div>
            <div style={{ display: data.language_id == 'all' || data.language_id == tag.language_id ? '' : 'none' }} 
                className='py-2'
            >
                <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                    <div className='py-4 flex justify-between'>
                        <div vertical-align='middle' className='px-2'>
                            {tag.name}
                        </div>
                        
                        {props.auth.user != null &&
                        <div align='right' className='px-2 flex'>
                            
                            <div>
                                <Link>
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
                        selected={data.language_id}
                    />
                </div>
                
                <div>
                    {tags}
                </div>
                
            </div>
        </DualLayout>
    );
}