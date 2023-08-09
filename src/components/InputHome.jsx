import { useSelector, useDispatch } from 'react-redux'; 
import { useState } from 'react';
import { getFilterTitleProductsThunk } from '../store/slices/Products.slice';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const InputHome = ({data}) => {

    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const[value, setValue] = useState("")

    return (
        <InputGroup 
        className="mb-3"
        style={{width: "65rem", marginTop: "1rem", marginBottom: "2rem"}}
        >
            <Form.Control
            placeholder="¿Qué buscas?"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={value}
            onChange={e => setValue(e.target.value)}
            />
            <Button 
            variant="outline-secondary" 
            id="button-addon2"
            onClick={() => dispatch(getFilterTitleProductsThunk(value))}
            >Button</Button>
        </InputGroup>
    ) 
}

export default InputHome