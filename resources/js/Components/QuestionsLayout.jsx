import QuestionIndex from '@/Components/QuestionIndex';
import NormalButton from '@/Components/NormalButton';
import DeleteForm from '@/Components/DeleteForm';
import SelectLang from '@/Components/SelectLang';
import Sort from '@/Components/Sort';

export default function QuestionsLayout({
    checkMode, checkAll, releaseAll, onDengerButton, showModal, closeModal, needConfirm, onSubmitDeletion, processing, deletionMessage,
    questions, languages, changeLang, checked, clickCheckBox, clickQuestion, language_id, nullMessage, noViewsMessage, isNull,
    selectSort, desc, changeOrder, needUser, isHome=false, good, later, complete, isLogin, hiddenMine, changeHiddenMine,
}){
    
    return(
        <div>
        { !isNull ? 
                <div>
                { checkMode && questions[0] != null &&
                    <div className='bg-white bg-opacity-75 h-20 inlin-flex'>
                        <div className='flex py-4 justify-between'>
                            <div className='flex'>
                                <div className='px-2'>
                                    <NormalButton onClick={checkAll} >全選択</NormalButton>
                                </div>
                                <div className='px-2'>
                                    <NormalButton onClick={releaseAll}>選択解除</NormalButton>
                                </div>
                            </div>
                            
                            { isHome ?
                            <div align='right' className='px-2 flex'>
                            {/*
                                <div className='px-2'>
                                    <NormalButton onClick={later}>「後で解く」に追加</NormalButton>
                                </div>
                                <div className='px-2'>
                                    <NormalButton onClick={complete}>「完了」に追加</NormalButton>
                                </div>
                                <div className='px-2'>
                                    <NormalButton onClick={good}>いいねする</NormalButton>
                                </div>
                            */}
                            </div>
                            
                            :
                            <div align='right' className='px-2'>
                                <DeleteForm
                                    onDengerButton={onDengerButton}
                                    showModal={showModal}
                                    onClose={closeModal}
                                    onSubmit={onSubmitDeletion}
                                    processing={processing}
                                    closeModal={closeModal}
                                    message={deletionMessage}
                                    needConfirm={needConfirm}
                                />
                            </div>
                            }
                        </div>
                    </div>
                }
                        
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
                        
                        <div>
                            <div className='flex justify-between'>
                                <div>
                                    <div>言語選択</div>
                                    <div>
                                        <SelectLang
                                            languages={languages}
                                            changeLang={changeLang}
                                            init={'all'}
                                            selected={language_id}
                                        />
                                    </div>
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
                                                <option value='comments' className='text-xs'>コメント数</option>
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
                            <QuestionIndex
                                questions={questions}
                                checked={checked}
                                checkMode={checkMode}
                                clickCheckBox={clickCheckBox}
                                clickQuestion={clickQuestion}
                                selected_lang={language_id}
                                needUser={needUser}
                            />
                            :
                            <div className='text-lg text-center py-4'>{noViewsMessage}</div>
                            }
                        </div>
                    </div>
                </div>
            :
            <div className='text-lg text-center py-4'>{nullMessage}</div>
        }
        </div>
    );
}