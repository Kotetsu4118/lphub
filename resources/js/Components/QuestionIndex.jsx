import { Link, } from '@inertiajs/inertia-react';
import QuestionTags from '@/Components/QuestionTags';

export default function QuestionIndex({questions, checkMode=false, checked, clickCheckBox, needUser=true, clickQuestion, selected_lang}){
    
    
    return(
        questions.data.map((question)=>
        <div>
            { (selected_lang == 'all' || selected_lang == question.language_id) && (
                <div className='py-4 flex'>
                    { checkMode &&
                    <div>
                        <input type='checkbox' checked={ checked.has(question.id) } onClick={()=>clickCheckBox(question.id)}/>
                    </div>
                    }
                    
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg flex-1 w-auto'
                        onClick={ checkMode  ?
                            ()=>clickCheckBox(question.id) : ()=>clickQuestion(question.id)
                        }
                    >
                            <div className='pl-3'>
                            
                                <div className='py-2 text-xl text-gray-900'>
                                    {question.title}
                                </div>
                                
                                <div className='py-4 pl-3 text-gray-900'>
                                    {question.body}
                                </div>
                                
                                { needUser &&
                                <div className='py-2'>
                                    作成者：{question.user.name}
                                </div>
                                }
                                <QuestionTags
                                    tags={question.tag}
                                    vaild={!checkMode}
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
                </div>
            )}
            </div>
        )
    );
}