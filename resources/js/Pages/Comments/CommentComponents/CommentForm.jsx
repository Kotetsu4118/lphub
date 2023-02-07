import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import NormalButton from '@/Components/NormalButton';
import { Link } from '@inertiajs/inertia-react';

export default function CommentForm({value, onhandleChange, errors, submit, processing, clickReset, cancel_link }){

    return(
        <div>
            <form onSubmit={submit}>
                <div>
                    <div class='py-4'>
                        <InputLabel for="comment" value="コメントを送る" />
                        <TextInput
                                id="comment"
                                className="mt-1 block w-full h-44"
                                value={value}
                                handleChange={(e) => onhandleChange(e)}
                                required
                        />
                        <InputError className="mt-2" message={errors.comment} />
                    </div>
                </div>
                
                <div className="py-2">
                    <PrimaryButton processing={processing}>送信</PrimaryButton>
                </div>
            </form>
        
            <div className='flex'>
                <div>
                    <NormalButton onClick={clickReset}>リセット</NormalButton>
                </div>
                
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