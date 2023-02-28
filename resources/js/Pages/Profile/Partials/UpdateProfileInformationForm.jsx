import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import NromalButton from '@/Components/NormalButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
    const user = usePage().props.auth.user;

    const [imagePreview, setImagePreview] = useState(user.user_icon_path);
    
    
    const { data, setData, patch,setDefaults, post, errors, processing, reset, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        icon : false,
        _method : 'patch',
    });
    
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
        setData('icon','default');
        setImagePreview('https://lphub.s3.ap-northeast-1.amazonaws.com/user_icon/default_user_icon.png');
    };
    
    const resetIcon = ()=>{
        document.getElementById('icon').value = null;
        reset('icon');
        setImagePreview(user.user_icon_path);
    };

    const submit = (e) => {
        e.preventDefault();
        
        data.icon = data.icon;
        post(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>
            
            
            <form onSubmit={submit} className="mt-6 space-y-6"
                // enctype="multipart/form-data"
            >
                <div>
                    <InputLabel for="name" value="名前" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        handleChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel for="email" value="メールアドレス" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        handleChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}
                

                <div className="mt-4">
                    <InputLabel for="icon" value="アイコン" />
                    <input id='icon' type='file' accept="image/*" onChange={(e)=>setIcon(e)}/>
    
                </div>
                    <img className='h-20 w-auto' src={ imagePreview }/>
                    
                
                <div className="flex items-center gap-4">
                    <NromalButton onClick={()=>resetIcon()}>元の画像に戻す</NromalButton>
                    <NromalButton onClick={()=>setDefaultIcon()}>デフォルト画像を設定</NromalButton>
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton processing={processing}>保存</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
