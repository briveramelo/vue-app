import {createRouter, createWebHistory } from 'vue-router'
import Body from './../components/BodyC.vue'
// import Login from './../components/LoginC.vue'
import LoginComposition from './../components/LoginComposition.vue'
// import Books from "@/components/BooksC.vue";
import BooksComposition from "@/components/BooksComposition.vue";
// import Book from "@/components/BookC.vue";
import BookComposition from "@/components/BookComposition.vue";
import BooksAdmin from "@/components/BooksAdmin.vue";
import BookEdit from "@/components/BookEdit.vue";
import Users from "@/components/UsersC.vue";
import UserEdit from "@/components/UserEdit.vue";
import Security from "../components/security.js";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Body
    },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: Login
    // },
    {
        path: '/login',
        name: 'Login',
        component: LoginComposition
    },
    // {
    //     path: '/books',
    //     name: 'Books',
    //     component: Books
    // },
    {
        path: '/books',
        name: 'BooksComposition',
        component: BooksComposition
    },
    // {
    //     path: '/books/:bookName',
    //     name: 'Book',
    //     component: Book
    // },
    {
        path: '/books/:bookName',
        name: 'Book',
        component: BookComposition
    },
    {
        path: '/admin/books',
        name: 'BooksAdmin',
        component: BooksAdmin
    },
    {
        path: '/admin/books/:bookId',
        name: 'BookEdit',
        component: BookEdit
    },
    {
        path: '/admin/users',
        name: 'Users',
        component: Users
    },
    {
        path: '/admin/users/:userId',
        name: 'UserEdit',
        component: UserEdit
    },
]

const router = createRouter({history: createWebHistory(), routes})
router.beforeEach(() => {
    Security.checkToken()
})
export default router