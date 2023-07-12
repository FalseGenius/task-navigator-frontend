import home_comp from './components/home.vue'
import signup_comp from './components/signup.vue'
import login_comp from './components/login.vue'
import navbar_comp from './components/navbar.vue'
import NavbarComp_l from './components/navbar_l.vue'
import sidebar_comp from './components/sidebar.vue'

import {createRouter,createWebHistory} from 'vue-router'

const routes=[
    {
        name:'Home',
        component: home_comp,
        path: '/'

    },
    {
        name:'Signup',
        component: signup_comp,
        path: '/signup'

    },
    {
        name:'Login',
        component: login_comp,
        path: '/login'

    },
    {
        name:'navbar',
        component: navbar_comp,
        path: '/'

    },
    {
        name:'navbar_l',
        component: NavbarComp_l,
        path: '/'

    },

    {
        name:'sidebar',
        component: sidebar_comp,
        path: '/sidebar'

    },

 
]
const router=createRouter({
    history: createWebHistory(), 
    routes
})
export default router;