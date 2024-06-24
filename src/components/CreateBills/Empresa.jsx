import React from "react";

export const Empresa = ({data}) => {
    return (
        <div>
           {Object.keys(data).map((key)=> (
             <div key= {key}>
             {data[key]}
             </div>
            ))} 
        </div>
    );
};

  
  
