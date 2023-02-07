import DualLayout from '@/Layouts/DualLayout';
import Pagination from '@/Components/Paginate';
import { Link } from '@inertiajs/inertia-react';
import SelectLang from '@/Components/SelectLang';
import QuestionIndex from '@/Components/QuestionIndex';
import {useState} from 'react';

export default function Home(props) {
    
    // if(!props.logined){
    //         props.auth = false;
    //     }
    
    
    // const questions = props.questions.data.map((question)=>
    //     <div className='py-4'>
    //     <Link href={'/questions/' + question.id}>
    //         <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
    //             <div className='pl-3'>
                
    //                 <div className='py-2 text-xl text-gray-900'>
    //                     {question.title}
    //                 </div>
                    
    //                 <div className='py-4 pl-3 text-gray-900'>
    //                     {question.body}
    //                 </div>
                    
    //                 <div className='py-2'>
    //                     作成者：{question.user.name}
    //                 </div>
                    
    //                 <div className='flex py-2'>
    //                     <div className='flex'>
    //                     タグ：
    //                         {question.tag.map((tag)=>
    //                             <div className='pl-3'>
    //                                 {tag.name}
    //                             </div>
    //                         )}
    //                     </div>
    //                 </div>
                    
    //                 <div className='py-2'>
    //                     いいね数：{question.g4q_hasmany_count}
    //                 </div>
    //                 <div className='py-2'>
                    
    //                     {question.level_hasmany_avg_level ?
    //                         <div>難易度：{Math.round(question.level_hasmany_avg_level * 100) / 100}</div> :
    //                         <div>難易度：未評価</div>
    //                     }
    //                 </div> 
    //             </div>
    //         </div>
    //         </Link>
    //     </div>
    // );
    
    return(
        
        <DualLayout 
            logined={props.auth.user != null}
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 py-4'>
                <div>
                    <SelectLang
                        languages={props.languages}
                        init={true}
                    />
                </div>
                
                <div>
                    <QuestionIndex
                        questions={props.questions}
                    />
                </div>
            </div>
            
            <Pagination data={props.questions} />
        </DualLayout>
        
        
        
    );
}