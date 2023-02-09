export default function Collapse({opened, contents, opened_label, closed_label, onClick, width, label_value }){
    
    return(
        <div>
            <div onClick={onClick} value={label_value} className={width+'hover:text-gray-700'}>
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