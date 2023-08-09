import { useParams, Navigate } from "react-router-dom" 
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getFilterCategoryProductsThunk } from "../store/slices/products.slice"
import { addProductSelected } from "../store/slices/selectedProduct.slice"
import axios from "axios"

import ProductosSame from "../components/ProductosSame"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

const ProductType = () => {

    const {id} = useParams()
    const productType = useSelector(state => state.products)
    const dispatch = useDispatch()

    const [product, setproduct] = useState({})
    const[count, setCount] = useState(0)

    useEffect(() => {
        detail()
    }, [id])

    const detail = () => {
        axios    
            .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(resp => {
                setproduct(resp.data),
                dispatch(getFilterCategoryProductsThunk(resp.data.categoryId))
            })
            .catch(error => console.log(error))
    }

    const plus = () => {
        return setCount(count + 1)
    }

    const less = () => {
        if (count > 0) {
            return setCount(count - 1)
        } else {
            return alert("I know you didn't like it, but less than zero can't be 😢")
        }
    }

    const productToSelected = () => {
        const token = localStorage.getItem("token")

        if (!token) {
            return <Navigate to={"/login"} />
        }

        const data = {
            quantity: count,
            productId: product.id
        }

        dispatch(addProductSelected(data))
    }

    return (
        <main>
            <Row style={{marginTop: "4rem", marginBottom: "4rem"}}>
                <Row 
                style={{display: "flex", 
                justifyContent: "center", 
                alignContent: "center",
                marginTop: "2rem",
                marginBottom: "4rem"}}
                >
                    <Col lg={4} style={{marginTop: "2rem", marginBottom: "4rem"}}>
                        <article className="art-producttype1">
                            <img src={product.images?.[0].url} className="img-producttype"/>
                        </article>
                    </Col>
                    <Col lg={4} 
                    style={{marginTop: "2rem", marginLeft: "3rem"}}>
                        <article>
                            <span>{product.brand}</span>
                            <h1>{product.title}</h1>
                            <p>{product.description}</p>
                            <div className="info-card">
                                <div>
                                    <span className="span-producttype">Price</span>
                                    <p>$ {product.price}</p>
                                </div>
                                    <Button 
                                    variant="outline-success"
                                    style={{width: "2rem", borderRadius: "50%"}}
                                    onClick={plus}
                                    >+</Button>
                                    <span className="span-producttype">{count}</span>
                                    <Button 
                                    variant="outline-success"
                                    style={{width: "2rem", borderRadius: "50%"}}
                                    onClick={less}
                                    >- </Button>
                                <div></div>
                            </div>
                            <Button 
                            variant="outline-success"
                            style={{width: "20rem"}}
                            onClick={productToSelected}
                            > Go Go Go! </Button>
                        </article>
                    </Col>
                </Row>
                <Row 
                style={{display: "flex", 
                justifyContent: "center", 
                textAlign: "center",
                marginTop: "2rem",
                marginBottom: "4rem"}}>
                    <Col>
                        <h3>Similar products</h3>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={3}
                style={{display: "flex", 
                justifyContent: "start", 
                alignContent: "center",
                marginLeft: "3rem"}}
                >
                    {
                        productType?.map(card => (
                            <Col key={card.id}>
                                <ProductosSame data={card}/>
                            </Col>
                        ))
                    }
                </Row>
            </Row>
        </main>
    )
}

export default ProductType