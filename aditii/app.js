class Store {
    constructor() {

        this.itemsInCart = {
            itemCount: 0,
            subtotal: 0
        }

        this.catalog = {
            item1: {
                id: 1,
                prod: 'branded shoe',
                img: 'media/shoes2.webp',
                alt: 'branded shoe',
                desc: 'stock shoe',
                price: 50.99,
                qty: 0
    
            },

            item2: {
                id: 2,
                prod: 'branded tee',
                img: 'media/edgyshirt.png',
                alt: 'edgy shirt',
                desc: 'stock shirt',
                price: 24.99,
                qty: 0
            },

            item3: {
                id: 3,
                prod: 'branded shoe',
                img: 'media/shoes3.png',
                alt: 'branded shoe',
                desc: 'stock shoe',
                price: 70.99,
                qty: 0
            },

            item4: {
                id: 4,
                prod: 'branded shoe',
                img: 'media/shoes4.webp',
                alt: 'branded shoe',
                desc: 'stock shoe',
                price: 39.99,
                qty: 0
            },

            item5: {
                id: 5, 
                prod: 'women bag',
                img: 'media/womensbag.webp',
                alt: 'women bag',
                desc: 'stock bag',
                price: 399.99,
                qty: 0
            },

            item6: {
                id: 6,
                prod: 'branded cargos',
                img: 'media/cargos2.png',
                alt: 'cargos',
                desc: 'stock shorts',
                price: 24.99,
                qty: 0
            }
        }
    }

    init() {
        this.loadItems();
        this.addToCart();
        this.checkout();
        this.homeSwitch();
        this.confirmOrder();
    }

    loadItems() {
        let itemDiv = document.getElementById('itemDiv');

        for (const key in this.catalog) {
            const item = this.catalog[key];
            const product = document.createElement('div');
            product.className = 'col-md-3';
            product.innerHTML = `
                <figure class="item-figure">
                    <img src="${item.img}" alt="${item.alt}" class="img-fluid item-img" />
                    <figcaption class="item-caption" id="itemCaption">${item.prod} <span class="item-price" id="itemPrice">${item.price}</span></figcaption>
                    <p class="item-desc" id="itemDesc">${item.desc}</p>
                    <button class="btn add-to-cart-btn" id="addToCartBtn" data-id="${item.id}">add to cart</button>
                </figure>`;
            // console.log(product)
            itemDiv.append(product);
        }
    }

    addToCart() {
        // variable & access html nodes
        let buttons = document.querySelectorAll('.add-to-cart-btn');
        let cartItems = document.getElementById('cartItems');
        let cartSubtotal = document.getElementById('cartSubtotal');
        let itemCount = 0;
        let price = 0;

        // checkout variables
        // let table = document.getElementById('tbody');
        // let checkout = document.getElementById('checkout')
        let subTimesQty = 0;
        let subtotalValue = document.getElementById('subtotalValue');
        let taxValue = document.getElementById('taxValue');
        let tax = 0;
        let deliveryValue = document.getElementById('deliveryValue');
        let checkoutItemCount = document.getElementById('checkoutItemCount');
        let deliveryFee = 4.99; 
        let total = 0;
        let totalValue = document.getElementById('totalValue');

        // loop through this.menu 
        for (const key in this.catalog) {
            const item = this.catalog[key];
            buttons.forEach(button => {
                button.addEventListener('click', ()=> {
                    if (button.dataset['id'] == item.id) {
                        // console.log(item.id);
                        itemCount++;
                        price+= item.price;
                        this.itemsInCart.itemCount = itemCount;
                        this.itemsInCart.subtotal = price;

                        item.qty++;
                        // console.log(item);
                        // console.log(this.itemsInCart);

                        subTimesQty = (item.price * item.qty).toFixed(2);
                        // console.log(subTimesQty);
                        tax = this.itemsInCart.subtotal * .07;

                        total = (this.itemsInCart.subtotal + tax + deliveryFee).toFixed(2);

                    }
                    
                    // send back to DOM
                    cartItems.innerText = itemCount;
                    cartSubtotal.innerText = price.toFixed(2);
                    subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2);
                    deliveryValue.innerText = deliveryFee.toFixed(2);
                    
                    taxValue.innerText = tax.toFixed(2)

                    totalValue.innerText = total;
                    
                    if (this.itemsInCart.itemCount == 1) {
                        checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`
                    } else {
                        checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`
                    }
                })
            })            
        }

    }

    checkout() {
        const cartBtn = document.getElementById('cartBtn');
        const checkoutPage = document.getElementById('checkoutPage');
        const catalogSection = document.getElementById('catalogSection');
        const table = document.getElementById('tbody');

        let subTimesQty = 0;

        cartBtn.addEventListener('click', ()=> {
            // console.log('clicked')

            if (catalogSection.classList.contains('d-none')) return 
            checkoutPage.classList.remove('d-none'); 
            catalogSection.classList.add('d-none')        

            for (const key in this.catalog) {
                const item = this.catalog[key];

                if(item.qty > 0) {
                    subTimesQty = (item.qty * item.price).toFixed(2);
                    const tableRow = document.createElement('tr');
                    tableRow.className = 'item-checkout';

                    tableRow.innerHTML += `
                        <td id="itemImg">
                            <img src="${item.img}" alt="${item.alt}" class="img-fluid item-img">
                        </td>
                        <td class="unit-price">${item.price.toFixed(2)}</td>
                        <td class="item-quantity">${item.qty}</td>
                        <td class="item-subtotal">${subTimesQty}</td>
                    `;

                    table.append(tableRow);
                }
            }
        })


    }

    homeSwitch() {
        const homeSwitch = document.querySelector('.home-switch');
        const checkoutPage = document.getElementById('checkoutPage');
        const catalogSection = document.getElementById('catalogSection');

        homeSwitch.addEventListener('click', ()=> {
            // console.log('clicked');

            catalogSection.classList.remove('d-none');
            checkoutPage.classList.add('d-none');
        })

    }

    confirmOrder() {
        const confirmBtn = document.getElementById('confirmButton');
        const table = document.getElementById('tbody');
        const cartItems = document.getElementById('cartItems');
        const cartSubtotal = document.getElementById('cartSubtotal');

        confirmButton.addEventListener('click', ()=> {
            // console.log('clicked');
            this.itemsInCart.itemCount = 0;
            this.itemsInCart.subtotal = 0;

            table.innerHTML = `<h1>Your order has been confirmed. Thanks for Shopping with Aditii!</h1>`

            cartItems.innerText = this.itemsInCart.itemCount;
            cartSubtotal.innerText = this.itemsInCart.subtotal.toFixed(2);

            for (const key in this.catalog) {
                const item = this.catalog[key];

                item.qty = 0;
            }

        })  
    }


}

let aditii = new Store();

aditii.init();