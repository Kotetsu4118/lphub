export default function Pagination({ page, limit, clickPage, footer, }) {

    return (
        <div className=
            { footer ?
            "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            :
            ''   
            }
        >
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="relative z-0 flex rounded-md shadow-sm -space-x-px">
                    <div className='inline-flex items-center px-1 pt-1'>
                        Pages：
                    </div>
                    
                    {/*初めのページへ*/}
                    { page != 1 &&
                    <div onClick={()=>clickPage(1)} 
                        className='hover:cursor-pointer inline-flex items-center px-2 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                    >
                        {'<<'}
                    </div>
                    }
                    
                    {/*二つ前のページへ*/}
                    { page-2 > 0 && 
                    <div onClick={()=>clickPage(page-2)} 
                        className='hover:cursor-pointer inline-flex items-center px-2 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                    >
                        {page-2}
                    </div>
                    }
                    
                    {/*一つ前のページへ*/}
                    { page-1 > 0 && 
                    <div onClick={()=>clickPage(page-1)} 
                        className='hover:cursor-pointer inline-flex items-center px-2 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                    >
                        {page-1}
                    </div>
                    }
                    
                    {/*現在ページ*/}
                    <div 
                        className='hover:cursor-pointer inline-flex items-center px-2 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                    >
                        {page}
                    </div>
                    
                    {/*一つ次のページへ*/}
                    { page+1 <= limit &&
                    <div onClick={()=>clickPage(page+1)} 
                        className='hover:cursor-pointer inline-flex items-center px-2 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                    >
                        {page+1}
                    </div>
                    }
                    
                    {/*二つ次のページへ*/}
                    { page+2 <= limit &&
                    <div onClick={()=>clickPage(page+2)} 
                        className='hover:cursor-pointer inline-flex items-center px-2 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                    >
                        {page+2}
                    </div>
                    }
                    
                    {/*最後のページへ*/}
                    { page != limit &&
                    <div onClick={()=>clickPage(limit)} 
                        className='hover:cursor-pointer inline-flex items-center px-2 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                    >
                        {'>>'}
                    </div>
                    }
                </div>
            </div>
        </div>
    );

}