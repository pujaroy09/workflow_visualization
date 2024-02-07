<template>
    <div class="navbar" v-if="$route.path !== '/home'">
        <div class="navbar-menu">
            <ul>
            <li><a @click="$router.go(-1)">Back</a></li>
            <li><a @click="$router.push('home')">Home</a></li>
            </ul>
        </div>
    </div>
<router-view></router-view>
</template>
<style>
    .navbar {
        align-items: center;
        display: flex;
        flex-basis: 100%;
        height: 5rem;
        padding: 0 1rem;
    }
    .navbar .navbar-menu {
        display: flex;
        position: static;
        background: none;
        padding: 0px;
        overflow: visible;
    }
    .navbar .navbar-menu ul {
        list-style: none;
        display: flex;
        padding-left: 0;
    }
    .navbar .navbar-menu ul li a {
        color: #fbc16c;
        text-decoration: none;
        padding: 0 1rem;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
    }
</style>