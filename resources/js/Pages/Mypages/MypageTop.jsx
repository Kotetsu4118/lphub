import { Link } from '@inertiajs/inertia-react';
import DualLayout from '@/Layouts/DualLayout';

export default function MypageTop(props){
    
    
    return(
        <DualLayout
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">マイページ</h2>}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
                <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                    <div className='pl-3'>
                        <div className='py-2'>
                            <Link href={route('my_laters')}>
                                後で解く問題({props.laters})
                            </Link>
                        </div>
                        <div className='py-2'>
                            <Link href={route('my_completes')}>
                                完了した問題({props.completes})
                            </Link>
                        </div>
                        <div className='py-2'>
                            <Link href={route('my_creates')}>
                                作成した問題({props.creates})
                            </Link>
                        </div>
                        <div className='py-2'>
                            <Link href={route('my_comments')}>
                                送ったコメント({props.comments})
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </DualLayout>
    )
}