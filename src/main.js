const shop = document.getElementById("shop")
let cart = JSON.parse(localStorage.getItem("data")) || []

const generateShop = () => {
    return (shop.innerHTML = shopItemsData.map(item => {
        let {id, name, price, desc, img} = item
        const search = cart.find(item => item.id === id) || []
        return `
            <div id="product-id-${id}" class="item">
                <img src=${img} alt="" width="220">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">
                            ${search.qty === undefined ? 0 : search.qty}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join(""))
}

generateShop()

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
    localStorage.setItem("data", JSON.stringify(cart))
}

const update = (id) => {
    const search = cart.find(item => item.id === id)
    document.getElementById(id).innerHTML = search.qty
    calculate()
}

const calculate = () => {
    const cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = cart.map(
        (item) => item.qty).reduce(
            (prevVal, currVal) => prevVal + currVal, 0)
}

calculate()