<template>
  <div class="home container">
    <div class="row">
      <div class="col-md-9 pt-5">

       <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
          <Product v-for="product in products" :product="product" :key="product.id" />
       </div>
        
      </div>
      <div class="col-md-3 pt-5">
        <!-- <SideNav /> -->
        <Cart />
      </div>
      
    </div>
  </div>
</template>

<script>

import Product from "../../components/Product.vue";
import Cart from "../../components/Cart.vue";

import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: 'ShoopingHome',
  components: {
    Product,
    Cart
  },
  setup(){

    const store = useStore();

    let products = computed(()=>{
      return store.state.shopping.products
    })

    let cart = computed(()=>{
      return store.state.shopping.cart
    })

    return {
      products,
      cart
    }
  },
  
}
</script>
