export const getCart = () =>{
    return new Promise((resolve)=>{
        const cart = window.localStorage.getItem('cart')
        resolve(cart)
    })
}

export const storeCart = (cart)=>{
    window.localStorage.setItem('cart',JSON.stringify(cart))
}

export const addCart = (product, cart) =>{
    return new Promise((resolve)=>{
        let _cart = {...cart}
        if(!_cart.items)
        {
            _cart.items = {}
        }
        if(_cart.items[product._id])
        {
            _cart.items[product._id] += 1;
        } else {
            _cart.items[product._id] = 1
        }
        if(!_cart.totalItems)
        {
            _cart.totalItems = 0
        }
        _cart.totalItems += 1
        setTimeout(() => {
            resolve({isAdding:false,_cart})
        }, 1000);
    })
}