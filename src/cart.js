let cart = JSON.parse(localStorage.getItem("data")) || []
const label = document.getElementById("label")
const shoppingCart = document.getElementById("shopping-cart")

const calculate = () => {
    const cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = cart.map(
        (item) => item.qty).reduce(
            (prevVal, currVal) => prevVal + currVal, 0)
}

calculate()

const generateCartItems = () => {
    if (cart.length) {
        return (shoppingCart.innerHTML = cart.map(item => {
            const {id, qty} = item
            const {img, name, price} = shopItemsData.find(product => {
                return product.id === id
            }) || []
            return `
                <div class="cart-item">
                    <img width="100" src=${img} alt="" />
                    <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$${price}</p>
                        </h4>
                        <i class="bi bi-x-lg" onclick="removeItem(${id})"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${qty}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>$${qty * price}</h3>
                    </div>
                </div>
            `
        }).join(""))
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="home-btn">Back to home</button>
            </a>
        `
    }
}

generateCartItems()

const increment = (id) => {

    const selectedItem = id
    const search = cart.find(item => item.id === selectedItem.id)

    if (search === undefined) {
        cart.push({
            id: selectedItem.id,
            qty: 1
        })
    } else {
        search.qty++
    }

    update(selectedItem.id)
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(cart))
}

const decrement = (id) => {
    const selectedItem = id
    const search = cart.find(item => item.id === selectedItem.id)

    if (search === undefined) {
        return
    } else if (search.qty === 0) {
        return
    } else {
        search.qty--
    }

    update(selectedItem.id)
    cart = cart.filter(item => item.qty !== 0)
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(cart))
}

const update = (id) => {
    const search = cart.find(item => item.id === id)
    document.getElementById(id).innerHTML = search.qty
    calculate()
    totalAmount()
}

const removeItem = (id) => {
    const selectedId = id
    cart = cart.filter(item => item.id !== selectedId.id)
    generateCartItems()
    totalAmount()
    calculate()
    localStorage.setItem("data", JSON.stringify(cart))
}

const clearCart = () => {
    cart = []
    generateCartItems()
    calculate()
    localStorage.setItem("data", JSON.stringify(cart))
}

const totalAmount = () => {
    if (cart.length) {
        let amount = cart.map(item => {
            const {qty, id} = item
            const {price} = shopItemsData.find(product => {
                return product.id === id
            }) || []
            return qty * price
        }).reduce((prevVal, currVal) => prevVal + currVal, 0)
        label.innerHTML = `
            <h2>Total Bill: $${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="remove-all">Clear all</button>
        `
    }   return
}

totalAmount()