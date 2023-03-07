import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import NormalButton from '@/Components/NormalButton';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/inertia-react';
import SelectLang from '@/Components/SelectLang';

export default function QuestionForm({
    languages, selected_lang, tags, init_lang, title_value, body_value, answer_value, 
    errors, processing, submit, changeLang, onhandleChange, tag2array, cancel_link, clickReset, clickClear ,
    body, answer,
    }){
    
    return(
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-4'>
            
                <div>言語選択</div>
                <div className='flex'>
                    <div>
                        <SelectLang
                            languages={languages}
                            changeLang={changeLang}
                            init={init_lang}
                            selected={selected_lang}
                        />
                    </div>
                    
                    <div className='pl-5'>
                        言語を変更するとタグのチェックが外れます
                    </div>
                </div>
                <InputError className="mt-2" message={errors.language_id} />
            
                
                <div className='pt-4'>
                    
                    <InputLabel for="title" value="タイトル" />
                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={title_value}
                        handleChange={(e) => onhandleChange(e)}
                        // required
                        isFocused
                        
                        // autoComplete="name"
                    />
                    
                    <InputError className="mt-2" message={errors.title} />
                    
                </div>
                
            
                <div className='pt-4'>
                    問題
                    {body}
                    {/*
                    <InputLabel for="body" value="問題" />
                    <TextInput
                            id="body"
                            className="mt-1 block w-full h-44"
                            value={body_value}
                            handleChange={(e) => onhandleChange(e)}
                            // required
                            // autoComplete="name"
                    />
                    
                    */}    
                    <InputError className="mt-2" message={errors.body} />
                </div>
                
                <div class='py-4'>
                    答え
                    {answer}
                    {/*
                    <InputLabel for="answer" value="答え" />
                    <TextInput
                            id="answer"
                            className="mt-1 block w-full h-44"
                            value={answer_value}
                            handleChange={(e) => onhandleChange(e)}
                            // required
                            // autoComplete="name"
                    />
                    */}
                    <InputError className="mt-2" message={errors.answer} />
                </div>
                
                {/*タグ*/}
                <div className=''>
                    <div>
                        タグの設定：{ selected_lang == '' && '言語を選択してください'}
                    </div>
                    <div className='py-2 flex flex-wrap'>
                        {tags}
                    </div>
                </div> 
                
                <div>
                    <Link href={route('create_t')}>
                        <NormalButton>タグを作成する</NormalButton>
                    </Link>
                </div>
                
            
                <div className="py-2">
                    <NormalButton onClick={submit} processing={processing}>保存</NormalButton>
                </div>
            
            <div className="py-2">
                <Link href={cancel_link}>
                    <NormalButton processing={processing}>キャンセル</NormalButton>
                </Link>
            </div>
            
        </div>
    );
}