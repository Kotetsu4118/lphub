import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import NormalButton from '@/Components/NormalButton';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/inertia-react';
import SelectLang from '@/Components/SelectLang';

export default function TagForm({ languages, selected_lang, init_lang, name_value, submit, errors, onhandleChange, processing, clickReset, cancel_link, changeLang}){
    return(
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-4'>
            <form onSubmit={submit} className="mt-6 space-y-6">
            
                <div>言語選択</div>
                <div className='flex'>
                    <div>
                        <SelectLang
                            languages={languages}
                            init={init_lang}
                            selected={selected_lang}
                            changeLang={changeLang}
                        />
                    </div>
                    
                </div>
                <InputError className="mt-2" message={errors.language_id} />
                
                <div className='py-4'>
                    
                    <InputLabel for="name" value="タグ名" />
                    <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={name_value}
                            handleChange={(e) => onhandleChange(e)}
                            // required
                            isFocused
                            
                            // autoComplete="name"
                    />
                    
                    <InputError className="mt-2" message={errors.name} />
                    
                </div>
                
                
                <div>
                    <PrimaryButton processing={processing}>保存</PrimaryButton>
                </div>
            
                <div className="py-2 flex">
                    <div>
                        <NormalButton onClick={clickReset}>リセット</NormalButton>
                    </div>
                    <div className='pl-5'>
                        <Link href={cancel_link}>
                            <PrimaryButton processing={processing}>キャンセル</PrimaryButton>
                        </Link>
                    </div>
                
                </div>
            </form>
        </div>
    );
}