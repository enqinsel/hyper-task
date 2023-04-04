import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path : "/",
        name : "One",
        component : () => import("./pages/One.vue")
    },
    {
        path : "/two",
        name : "Two",
        component : () => import("./pages/Two.vue")
    }
] 

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router