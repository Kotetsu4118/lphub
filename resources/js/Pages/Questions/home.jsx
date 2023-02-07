import DualLayout from '@/Layouts/DualLayout';
import Pagination from '@/Components/Paginate';
import { Link } from '@inertiajs/inertia-react';
import SelectLang from '@/Components/SelectLang';
import QuestionIndex from '@/Components/QuestionIndex';
import {useState} from 'react';

export default function Home(props) {
    
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