
// initial state
const state = {
    products:[
        {
            id: 1,
            name: "Chelsea Shoes",
            price: 200,
            shortdesc: "Best Drip in the Market",
            url: "../assets/images/chelsea-shoes.png"
          },
          {
            id: 2,
            name: "Kimono",
            price: 50,
            shortdesc: "Classy, Stylish, Dope",
            url: "../assets/images/kimono.png"
          },
          {
            id: 3,
            name: "Watch",
            price: 2500,
            shortdesc: "Elegance built in",
            url: "../assets/images/rolex.png"
          },
          {
            id: 4,
            name: "Wallet",
            price: 80,
            shortdesc: "Sleek, Trendy, Clean",
            url: "../assets/images/wallet.png"
          },
          {
            id: 5,
            name: "Lady Handbags",
            price: 230,
            shortdesc: "Fabulous, Exotic, Classy",
            url: "../assets/images/handbag.png"
          },
          {
            id: 6,
            name: "Casual Shirts",
            price: 30,
            shortdesc: "Neat, Sleek, Smart",
            url: "../assets/images/shirt.png"
          }
    ],
    cart:[]
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
    addCartItem(state,item){
        item.quantity = 1;
        state.cart.push(item);
    },
    updateCartItem(state,updateCartItem){
        state.cart = state.cart.map((cartItem)=>{
            if(cartItem.id == updateCartItem.id) {
                return updateCartItem
            }

            return cartItem
        })
    },
    removeCartItem(state,item){
        state.cart = state.cart.filter((cartItem)=>{
            return cartItem.id != item.id
        })
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}