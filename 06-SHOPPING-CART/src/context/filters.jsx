import { createContext, useState } from "react";

// 1. Create the context
// * This is that we need to consume
export const FiltersContext = createContext()

// 2. Create the provider, for the provider of the context
// * This only provide the access to the context
export function FilterProvider({ children }){

    const [filters, setFilters] = useState({category: 'all' ,minPrice: 250})

    return (
        <FiltersContext.Provider value={{
            filters ,
            setFilters
        }} >
            { children }
        </FiltersContext.Provider>
    )
}
