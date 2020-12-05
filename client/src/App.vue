<template>
    <v-app v-if="isLoad">
        <v-toolbar color="teal darken-4" dark>
            <v-toolbar-title>
                <v-icon class="red--text">translate</v-icon>
                <router-link to="/" exact class="red--text"
                    >Etranslate</router-link
                >
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn v-if="!user" to="/sign-in" exact flat class="red--text"
                    >Авторизация</v-btn
                >
                <v-btn v-if="!user" to="/sign-up" exact flat class="red--text"
                    >Регистрация</v-btn
                >
                <profile-bar v-if="user" :email="user.email"></profile-bar>
            </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-md>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-container>
        <v-snackbar v-model="snackBar.visible" top :color="snackBar.color">
            <span class="black--text">{{ snackBar.message }}</span>
            <v-btn color="black" flat dark @click="hideSnackBar">Закрыть</v-btn>
        </v-snackbar>
    </v-app>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import ProfileBar from './components/ProfileBar.vue';

export default {
    name: 'App',
    computed: {
        ...mapState(['snackBar', 'isLoad']),
        ...mapState('userModule', [
            'user',
            'checkTokenResponse',
            'updateTokensResponse',
        ]),
    },
    methods: {
        ...mapMutations(['hideSnackBar']),
    },
    components: { ProfileBar },
};
</script>

<style lang="sass">
a
    text-decoration: none
.fade-enter-active, .fade-leave-active
    transition: all .2s
.fade-enter, .fade-leave-to
    opacity: 0
.material-icons
    font-family: 'Material Icons'
    font-weight: normal
    font-style: normal
    font-size: 24px
    display: inline-block
    line-height: 1
    text-transform: none
    letter-spacing: normal
    word-wrap: normal
    white-space: nowrap
    direction: ltr
    -webkit-font-smoothing: antialiased
    text-rendering: optimizeLegibility
    -moz-osx-font-smoothing: grayscale
    font-feature-settings: "kern", "liga", "clig", "calt"
</style>
