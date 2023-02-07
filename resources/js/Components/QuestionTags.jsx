import { Link } from '@inertiajs/inertia-react';

export default function QuestionTags({tags}){
    return(
        <div className='flex flex-wrap'>
            <div>
                タグ：
            </div>
            {tags.map((tag)=>
                <div className='pl-3'>
                    <Link>
                        {tag.name}
                    </Link>
                </div>
            )}
        </div>
    );
}