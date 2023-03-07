import SelectLang from '@/Components/SelectLang';
import Sort from '@/Components/Sort';
import QuestionTags from '@/Components/QuestionTags';
import { Link, } from '@inertiajs/inertia-react';
import { useForm, } from '@inertiajs/inertia-react';

export default function QuestionsLayout({
    checkMode, checkAll, releaseAll, onDengerButton, showModal, closeModal, needConfirm, onSubmitDeletion, processing, deletionMessage,
    questions, languages, changeLang, checked, clickCheckBox, language_id, nullMessage, noViewsMessage, isNull,
    selectSort, desc, changeOrder, needUser, isHome=false, good,  isLogin, hiddenMine, changeHiddenMine,
    confirmContents, language_valid=true,
}){
    
    const {get} = useForm();
    
    const clickQuestion = (id)=>{
        get(route('view_q', id));
    };
    
    return(
        <div>

        { !isNull ? 
                <div>
                    <div className='flex justify-between'>
                        <div>
                        {language_valid &&
                        <div>
                            言語：
                            <SelectLang
                                languages={languages}
                                changeLang={changeLang}
                                init={'all'}
                                selected={language_id}
                            />
                        </div>
                        }
                            { isHome && isLogin &&
                            <div onClick={()=>changeHiddenMine(hiddenMine)}>
                                自分が作成した問題を除く：
                                <input type='checkbox' checked={hiddenMine} className='px-2'/>
                            </div>
                            }
                        </div>
                        
                        <div align='right' className='px-2 inline-felex items-center'>
                            <div align='left'>ソート</div>
                            <div className='flex'>
                                <Sort
                                onChange={selectSort}
                                options={
                                    <>
                                        <option value='created_at' className='text-xs'>作成日時</option>
                                        <option value='updated_at' className='text-xs'>更新日時</option>
                                        <option value='g4q_hasmany_count' className='text-xs'>いいね数</option>
                                        <option value='comment_count' className='text-xs'>コメント数</option>
                                        <option value='level_hasmany_avg_level' className='text-xs'>難易度</option>
                                    </>
                                }
                                />
                                <div className='pl-3'>
                                    <input id='asc' type='radio' onClick={()=>changeOrder(false)} checked={!desc}/>
                                    <label for='asc' >昇順</label>
                                    <input id='desc' type='radio' onClick={()=>changeOrder(true)} checked={desc} className='pl-3'/>
                                    <label for='desc' >降順</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    { questions[0] != null ?
                    
                    <div>
                        {questions.map((question)=>
                        <div>
                                <div className='py-4 flex'>
                                    { checkMode &&
                                    <div>
                                        <input type='checkbox' checked={ checked.has(question.id) } onClick={()=>clickCheckBox(question.id)}/>
                                    </div>
                                    }
                                    
                                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg flex-1 w-auto hover:bg-gray-300 hover:cursor-pointer'
                                        onClick={ checkMode ? 
                                            ()=>clickCheckBox(question.id)
                                            :
                                            ()=>clickQuestion(question.id)
                                        }
                                    >       
                                        
                                            <div className='pl-3'>
                                            
                                                <div className='py-2 text-xl text-gray-900'>
                                                    {question.title}
                                                </div>
                                                
                                                { needUser &&
                                                <div className='py-2 flex'>
                                                    作成者：
                                                    <img class='h-6 w-auto' src={ question.user.user_icon_path }/> 
                                                    {question.user.name}

                                                </div>
                                                }
                                                <QuestionTags
                                                    tags={question.tag}
                                                    vaild={!checkMode}
                                                    name='tags'
                                                />
                                                
                                                <div className='flex space-x-4'>
                                                    <div className='py-2'>
                                                        いいね数：{question.g4q_hasmany_count}
                                                    </div>
                                                    
                                                    <div className='py-2'>
                                                        コメント数：{question.comment_count}
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
                                </div>
                        </div>
                        )}
                    </div>
                    
                    :
                    <div className='text-lg text-center py-4'>{noViewsMessage}</div>
                    }
                </div>
            :
            <div className='text-lg text-center py-4'>{nullMessage}</div>
        }
        </div>
    );
}