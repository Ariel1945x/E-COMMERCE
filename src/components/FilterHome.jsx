import { useSelector, useDispatch } from 'react-redux';
import { getFilterCategoryProductsThunk } from '../store/slices/products.slice';

import ListGroup from 'react-bootstrap/ListGroup';

const FilterHome = ({data}) => {

    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    return(
        <ListGroup 
        style={{marginTop: "1rem", marginBottom: "2rem"}}
        >
            <ListGroup.Item 
            onClick={() => dispatch(getFilterCategoryProductsThunk(data.id))}
            style={{cursor:"pointer"}}
            >
                {data.name}
            </ListGroup.Item>
        </ListGroup>
    )
}

export default FilterHome