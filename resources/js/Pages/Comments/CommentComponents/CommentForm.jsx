import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import NormalButton from '@/Components/NormalButton';
import { Link } from '@inertiajs/inertia-react';

export default function CommentForm({value, onhandleChange, errors, submit, processing, clickReset, cancel_link, submitValue }){

    return(
        <div>
                <div>
                    <div class='py-4'>
                        <InputLabel for="comment" value="コメントを送る" />
                        {/*
                        <TextInput
                                id="comment"
                                className="mt-1 block w-full h-44"
                                value={value}
                                handleChange={(e) => onhandleChange(e)}
                                required
                        />
                        */}
                        <textarea
                            id="comment"
                            className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full mt-1 block h-44'
                            value={value}
                            onChange={onhandleChange}
                            required
                        />
                        
                        
                        <InputError className="mt-2" message={errors.comment} />
                    </div>
                </div>
                
                <div className="py-2">
                    <PrimaryButton type={'button'} onClick={submit} processing={processing}>{submitValue}</PrimaryButton>
                </div>
        
            <div className='flex'>
                {/*
                <div>
                    <NormalButton onClick={clickReset}>リセット</NormalButton>
                </div>
                */}
                { cancel_link !=null &&
                <div className='pl-3'>
                    <Link href={cancel_link}>
                        <NormalButton>キャンセル</NormalButton>
                    </Link>
                </div>
                }
            </div>
        </div>
    );
}