import { useEffect, useState } from "react";
import { IToDoReq, IToDoResp } from "../../Shared/types";

const AddFetch  =  (url: string,body:IToDoReq,formSubmitted:boolean,setFormSubmitted: (value: boolean) => void) =>{
    const [data, setData] = useState<IToDoResp | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              });
        
              if (!response.ok) {
                throw new Error('Failed to add todo item');
              }
              const data = await response.json();
          setData(data);
        } catch (error:any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      
      if (formSubmitted) {
        fetchData().then(() => {
            // Reset formSubmitted after the request is done
            resetFormSubmitted();
          })
      }  
      return () => {
        // Cleanup if needed
      };
    }, [body, url,formSubmitted]);

    const resetFormSubmitted = () => {
        setFormSubmitted(false);
    };
  
    return { data, loading, error };
}

export default AddFetch