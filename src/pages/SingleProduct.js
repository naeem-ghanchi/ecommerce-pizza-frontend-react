import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CartContext } from "../CartContext"
import { addCart } from "../helper";

const SingleProduct = () => {
  const [ product, setProduct] = useState({});
  const params = useParams();
  const history = useHistory();
  const { cart, setCart } = useContext(CartContext)
  const [ isAdding, setIsAdding ] = useState(false)
  useEffect(()=>{
    fetch(`/api/products/${params._id}`)
    .then(res=>res.json())
    .then(product=>setProduct(product))
  },[params._id])

  const addToCart = (event,product) =>{
      event.preventDefault()
      // let _cart = {...cart}
      // if(!_cart.items)
      // {
      //     _cart.items = {}
      // }
      // if(_cart.items[product._id])
      // {
      //     _cart.items[product._id] += 1;
      // } else {
      //     _cart.items[product._id] = 1
      // }
      // if(!_cart.totalItems)
      // {
      //     _cart.totalItems = 0
      // }
      // _cart.totalItems += 1
      // setCart(_cart)
      // setIsAdding(true)
      // setTimeout(() => {
      //     setIsAdding(false)
      // }, 1000);
      setIsAdding(true)
      addCart(product,cart).then(res=>{
        console.log("res:",res)
        setCart(res._cart)
        setIsAdding(res.isAdding)
      })
  }

  return (
    <div className="container mx-auto mt-12">
        <button className="mb-12 font-bold" onClick={ () => history.goBack() }>Back</button>
        <div className="flex">
          <img src={product.image}  alt="pizza" style={{width:200}}/>
          <div className="ml-16">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <div className="text-md">{product.size}</div>
            <div className="font-bold mt-2">$ {product.price}</div>
            {/* <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">Add to cart</button> */}
            <button disabled={isAdding} className={`${isAdding?'bg-green-500':'bg-yellow-500'} py-1 px-4 rounded-full font-bold` } onClick={(e)=>{addToCart(e,product)}}>ADD{isAdding?'ED':''} to cart</button>
          </div>
        </div>
    </div>
  );
};

export default SingleProduct;
