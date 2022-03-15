import { createStore } from 'vuex'
import { getAuth, signOut } from 'firebase/auth'
import app from '../firebase'

const auth = getAuth(app)
//VueX store
const store = createStore({
    state() {
        return {
            count: 10,
            isLoggedIn: false,
            user: ''
        }
    },
    getters: {
        double: (state) => state.count * 2
    },
    mutations: {

    },
    actions: {
        login({ state, commit }, payload) {
            console.log(' User Login', payload);
            state.isLoggedIn = true
            state.user = payload.user

        },
        logout({ state }) {
            console.log('Logout ', state)

            state.isLoggedIn = false
            state.user = ''
            signOut(auth)
                .then((user) => {
                    console.log(" logout", user);
                })
                .catch((err) => {
                    console.log("err ", err);
                });
        }
    }
})

export default store