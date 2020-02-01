<template>
    <div class="sidebar">
        <router-link to="/">Sharings</router-link>
        <router-link to="/wallets">Wallets</router-link>
        <router-link to="/people">People</router-link>

        <a class="powered-by-minter" href="https://www.minter.network"><span>powered by</span><img src="../assets/minter_logo_grey.svg"></a>
    </div>
</template>

<style>
    .powered-by-minter span {
        position: absolute;
        display: block;
        top: -10px;
        left: 0px;
        font-size: 19px;
    }
</style>
