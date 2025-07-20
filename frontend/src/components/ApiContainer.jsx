import { useRef } from "react";

function ApiContainer({url, copy}){

    const inputRef = useRef(null);
    const handleCopy = () =>{
        inputRef.current?.select();
        window.navigator.clipboard.writeText(url);
    }

    return(
        <>
           <div className="px-2 flex" >
                <input 
                    className="bg-gray-800 w-full rounded-l-md h-[30px] outline-none overflow-hidden
                    text-yellow-300 font-medium px-3 py-[2px] hover:text-blue-400 hover:underline"
                    type="text"
                    value={url}
                    readOnly
                    ref={inputRef}
                >
                </input>
                {copy && (
                    <button 
                        onClick={handleCopy}    
                        className="px-2 text-center bg-blue-500 text-white rounded-r-md text-sm outline-none"
                    >Copy</button>
                )   
                }
           </div>
        </>
    )
};

export default ApiContainer;