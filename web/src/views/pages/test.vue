<template>
    <div>
        Product
        <ul>
            <li v-for="(item,index) in products" :key="index">{{item.product_name}} - {{item.price}} <button @click="add(item)">add</button></li>
        </ul>
        Product products_discoun

        <ul>
            <li v-for="(item,index) in products_discount" :key="'a'+index">{{item.product_name}} - {{item.price}}</li>
        </ul>
        <button @click="username='abcd'">change user</button>
    </div>
</template>

<script>
export default {
    data(){
        return {

            username:"tester",
            products:[
                {
                    product_id:1,
                    product_name:"Test",
                    price:1111
                },
                 {
                    product_id:1,
                    product_name:"Test",
                    price:3
                },
                 {
                    product_id:1,
                    product_name:"Test",
                    price:5
                }
            ]
        }
    },
    computed:{
        products_discount(){
            return this.products.map((item)=>{
                var returnValue={...item};
                returnValue.price=item.price*0.9;
                return returnValue;
            })
        }

    },
    created(){
        console.log('component created')
    },
    mounted(){

    },
    methods:{
        add(item){
            item.price++;
        }
    },
    watch:{
        username(val){
            console.log(val);
        },
        "products[0].price"(val){

        }
    }

}
</script>

<style>

</style>