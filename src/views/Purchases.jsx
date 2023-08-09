import { useEffect, useState } from "react"
import axios from "axios"

import Button from 'react-bootstrap/Button';

const Purchases = () => {

    const [purchase, setPurchase] = useState([])

    useEffect(() => {
        axios
            .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(resp => setPurchase(resp.data))
            .catch(error => console.log(error))
    }, [])

    const [pages, setPaget] = useState(1)
    const productsForPage = 8
    const lastIndex = productsForPage * pages
    const fisrtsIndex = lastIndex - productsForPage
    const productPage = purchase.slice(fisrtsIndex, lastIndex)
    const total = Math.ceil(purchase?.length / productsForPage)
    const pagesArray = []

    for (let i = 1; i <= total; i++) {
        pagesArray.push(i)
    }

    return (
        <section style={{marginTop: "7rem"}}>
            <h1 className="h1-pur">Purchases</h1>
            <ul>
            {
                productPage?.map(buy => (
                    <li className="li-father" key={buy.id}>
                        <div className="container-pur">
                            <img className="container-img" src={buy.product?.images?.[0]. url}/>
                            <p className="container-p1">{buy.product?.title}</p>
                            <span className="container-span1">{buy.updatedAt.split("T")[0]}</span>
                            <p className="container-p2">{buy.quantity}</p>
                            <span className="container-span2">$ {Number(buy.product.price) * buy.quantity}</span>
                        </div>
                        <hr />
                    </li>
                ))
            }
            </ul>  

            <ul>
                {
                    pagesArray?.map(num => (
                        <Button 
                        style={{
                            marginTop: "2rem",
                            marginRight: 10
                        }}
                        key={num} 
                        onClick={() => setPaget(num)}>{num}</Button>
                    ))
                }
            </ul>
        </section>
    )
}

export default Purchases