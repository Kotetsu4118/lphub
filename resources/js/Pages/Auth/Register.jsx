import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import NromalButton from '@/Components/NormalButton';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        icon : null,
    });
    
    const [imagePreview, setImagePreview] = useState('https://lphub.s3.ap-northeast-1.amazonaws.com/user_icon/default_user_icon.png');

    const reader = new FileReader();
    
    const setIcon = (event)=>{
        const file = event.target.files[0];
        // ファイルを読み込み終わったタイミングで実行するイベントハンドラー
        reader.onload = () => {
            // imagePreviewに読み込み結果（データURL）を代入する
            // imagePreviewに値を入れると<output>に画像が表示される
            setImagePreview(reader.result);
        };
          
        reader.readAsDataURL(file);
        setData('icon', file);
    };
    
    const setDefaultIcon = ()=>{
        document.getElementById('icon').value = null;
        setData('icon', null);
        setImagePreview('https://lphub.s3.ap-northeast-1.amazonaws.com/user_icon/default_user_icon.png');
    };


    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="name" value="名前" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="email" value="メールアドレス" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="パスワード" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password_confirmation" value="パスワード（確認）" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                
                <div className="mt-4">
                    <InputLabel for="icon" value="アイコン" />
                    <input id='icon' type='file' accept="image/*" onChange={(e)=>setIcon(e)}/>
                    { data.icon == null && 
                        <div>
                            デフォルトではこの画像が設定されます
                        </div>
                    }
                    <img class='h-20 w-auto' src={ imagePreview }/>
                    
                </div>
                
                <NromalButton onClick={()=>setDefaultIcon()}>デフォルト画像を設定</NromalButton>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        登録済みの場合はこちら
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        登録
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
