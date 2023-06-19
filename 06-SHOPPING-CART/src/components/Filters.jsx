import { useState, useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'

function Filters() 
{
    const { filters, setFilters } = useFilters()

    const minPriceFilterId = useId()
    const categoryFilterId = useId()
        
    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState , 
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState , 
            category: event.target.value
        }))
    }

    return (
        <>
            <section className='filters'>
                <div>
                    <label htmlFor={minPriceFilterId}>Price a partir de: </label>                
                    <input type="range" name="price" id={minPriceFilterId} min={0} max={1000} value={filters.minPrice} onChange={handleChangeMinPrice} />
                    <span>${filters.minPrice}</span>
                </div>

                <div>
                    <label htmlFor={categoryFilterId}>Categoría</label>
                    <select id={categoryFilterId} onChange={handleChangeCategory}>
                        <option value="all">Todas</option>
                        <option value="laptops">Portátiles</option>
                        <option value="smartphones">Celulares</option>
                    </select>
                </div>
            </section>
        </>
    )
}

export default Filters