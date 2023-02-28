import { Link } from '@inertiajs/inertia-react';

export default function QuestionTags({tags, vaild}){
    return(
        <div className='flex flex-wrap'>
            <div>
                タグ：
            </div>
            {tags.map((tag)=>
                <div className='pl-3 hover:text-blue-400 hover:underline hover:cursor-pointer'>
                    { vaild ? 
                    <Link href={route('home_t', tag.id)}>
                        ・{tag.name}
                    </Link>
                    :
                        <div>・{tag.name}</div>
                    }
                </div>
            )}
        </div>
    );
}