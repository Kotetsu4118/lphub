export default function Collapse({opened, contents, opened_label, closed_label, onClick, width }){
    
    return(
        <div>
            <div onClick={onClick} className={width+'hover:text-gray-700'}>
                { opened ?
                    opened_label :
                    closed_label
                }
            </div>
            
            { opened &&
            <div 
            >
                {contents}
            </div>
            }
        </div>
    );
}