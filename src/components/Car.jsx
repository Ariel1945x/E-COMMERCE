import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { 
    getProductsSelected, 
    putProductsSelected, 
    deleteProductsSelected,
    purchasesProductThunk } from '../store/slices/selectedProduct.slice';

import Offcanvas from 'react-bootstrap/Offcanvas';

import Button from 'react-bootstrap/Button';

const Car = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const token = localStorage.getItem("token")
        
        if (token) {
            return setShow(true)
        } else {
            return <Navigate to={"/login"} />
        }
    }

    const buy = useSelector(state => state.selectedProduct)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsSelected())
    }, [])

    const plus = (buy) => {
        dispatch(putProductsSelected(buy.id, buy.quantity + 1))
    }

    const less = (buy) => {
        if(buy.quantity > 1) {
            dispatch(putProductsSelected(buy.id, buy.quantity - 1))
        } else  {
            dispatch(deleteProductsSelected(buy.id))
        }
    }

    const deleteProduct = (buy) => {
        dispatch(deleteProductsSelected(buy.id))
    }

    const purchase = () => {
        dispatch(purchasesProductThunk())
    }

    return (
        <>
        <a variant="primary" onClick={handleShow}>
        <svg className='svg-navapp' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0a2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0a2 2 0 0 1-4 0z"/></svg>
        </a>

        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Products</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul className='ul-of-products'>
                {
                    buy?.map(buys => (
                        <li className="father" key={buys.id}>

                            <div className='div-container'>

                                <img className='img-of-container' src={buys.product?.images[0].url}/>
                                <span className='span-of-container'>{buys?.product?.title}</span>

                            </div>

                            <hr />

                            <div className='div-buttons'>
                                <div className='delete'>
                                    <Button 
                                    variant="outline-danger"
                                    style={{width: "3rem", height: "3rem", borderRadius: "50%"}}
                                    onClick={() => deleteProduct(buys)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z"/></svg>
                                    </Button>
                                </div>

                                <div className='plus-less'>
                                    <Button 
                                    variant="outline-success"
                                    style={{width: "3rem", height: "3rem", borderRadius: "50%"}}
                                    onClick={() => plus(buys)}>+</Button>
                                    <span className='pluss-less-span'>{buys.quantity}</span>
                                    <Button 
                                    variant="outline-success"
                                    style={{width: "3rem", height: "3rem", borderRadius: "50%"}}
                                    onClick={() => less(buys)}>-</Button>
                                </div>
                            </div>

                            <hr />

                            <p className='p-father'>
                               <span className='span-father'>Total: {Number(buys.product.price) * buys.quantity}$</span>
                            </p>
                        </li>
                    ))
                }
                </ul>
                <Button 
                style={{
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    width: "15rem",
                    height: "3rem",
                    margin: "0 5rem"
                }}
                onClick={() => purchase()}>Buy!</Button>
            </Offcanvas.Body>
        </Offcanvas>
    </>
    )
}

export default Car