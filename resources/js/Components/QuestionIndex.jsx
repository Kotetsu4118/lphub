import { Link } from '@inertiajs/inertia-react';
import QuestionTags from '@/Components/QuestionTags'

export default function QuestionIndex({questions}){
    return(
        questions.data.map((question)=>
            <div className='py-4'>
            <Link href={route('view_q', question.id)}>
                <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                    <div className='pl-3'>
                    
                        <div className='py-2 text-xl text-gray-900'>
                            {question.title}
                        </div>
                        
                        <div className='py-4 pl-3 text-gray-900'>
                            {question.body}
                        </div>
                        
                        <div className='py-2'>
                            作成者：{question.user.name}
                        </div>
                        
                        <QuestionTags
                            tags={question.tag}
                        />
                        
                        <div className='py-2'>
                            いいね数：{question.g4q_hasmany_count}
                        </div>
                        <div className='py-2'>
                        
                            {question.level_hasmany_avg_level ?
                                <div>難易度：{Math.round(question.level_hasmany_avg_level * 100) / 100}</div> :
                                <div>難易度：未評価</div>
                            }
                        </div> 
                    </div>
                </div>
                </Link>
            </div>
        )
    );
}