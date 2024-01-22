import firebase from 'firebase/compat/app'

export default{
    actions: {
        async register({commit, dispatch}, data){

            await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            let uid = await dispatch('getUID');
            await firebase.database().ref(`/users/${uid}`).set(data)
            await firebase.database().ref(`/`)
            
        },

        async login({dispatch, commit}, {email, password}){
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
                // console.log(res)
                // return res

            } catch(e){
                throw e
            }
        },

        async getUID(){
            let user = await firebase.auth().currentUser
            return user ? user.uid : null
        },

        async logout({ commit }){
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
    
}