import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllProductsThunk } from "../store/slices/products.slice"
import axios from "axios";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ListProducts from "../components/ListProducts"
import InputHome from "../components/InputHome";
import FilterHome from "../components/FilterHome";

const Home = () => {

    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const [categories, setCategories] = useState([])

    useEffect(() => {
        dispatch(getAllProductsThunk())
        getAllCategories()
    }, [])

    const getAllCategories = () => {
        axios
            .get("https://api-ecommerce-1.onrender.com/categories")
            .then(resp => setCategories(resp.data))
            .catch(error => console.log(error))
    }

    return(
        <main>

            <Row style={{marginLeft: "2rem", marginRight: "2rem", marginTop: "6rem"}}>
                <Col md={4} lg={3}>
                    {
                        categories?.map(category => (
                            <FilterHome 
                            key={category.id}
                            data={category}
                            />
                        ))
                    }
                </Col>
                <Col md={8} lg={9}>
                    <Row>
                        <InputHome/>
                    </Row>

                    <Row xs={1} md={2} lg={3}>
                        {
                            products?.map(product => (
                                <Col key={product.id}>
                                    <ListProducts 
                                    data = {product}
                                    />
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </main>
    )
}

export default Home