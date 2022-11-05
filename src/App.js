import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ProductsPage from './pages/ProductsPage';
import Cart from './pages/Cart'
import Navigation from './components/Navigation';
import SingleProduct from './pages/SingleProduct';
import { CartContext } from './CartContext'
import { useEffect, useState } from 'react';
import { getCart, storeCart } from './helper';
const App = () => {
    const [cart, setCart] = useState({});

    // Fetch cart from local storage
    useEffect(()=>{
    //    let cart =  window.localStorage.getItem('cart')
       /*
       if(cart == null)
        {
            cart = JSON.stringify({});
        }
        */
    //    setCart(JSON.parse(cart)) 
    getCart().then(res=>{
        setCart(JSON.parse(res))
    })
    },[])

    useEffect(()=>{
        // window.localStorage.setItem('cart',JSON.stringify(cart))
        storeCart(cart)
    },[cart])

    return (<>
                <Router>
                    <CartContext.Provider value={{ cart, setCart }}>
                        <Navigation />
                            <Switch>
                                <Route path="/" component={Home} exact></Route>
                                <Route path="/about" component={About}></Route>
                                <Route path="/products" component={ProductsPage} exact></Route>
                                <Route path="/products/:_id" component={SingleProduct}></Route>
                                <Route path="/cart" component={Cart}></Route>
                            </Switch>
                    </CartContext.Provider>
                </Router>
            </>);
}
export default App;