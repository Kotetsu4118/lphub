import { Link } from '@inertiajs/inertia-react';

export default function QuestionTags({tags, vaild}){
    return(
        <div className='flex flex-wrap'>
            <div>
                タグ：
            </div>
            {tags.map((tag)=>
                <div className='pl-3'>
                    { vaild ? 
                    <Link>
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