import firebase from 'firebase/compat/app'

export default{
    state:{
        info: null,
    },
    getters:{
        info(state){
            return state.info
        }
    },
    mutations:{
        setInfo(state, userInfo){
            state.info = userInfo;
        },
        clearInfo(state){
            state.info = null;
        }
    },
    actions:{
        async fetchInfo({dispatch, commit}){
            try{
                let uid = await dispatch('getUID');
                let userInfo = (await firebase.database().ref(`/users/${uid}`).once('value')).val()            
                commit('setInfo', userInfo);

                return userInfo
                
            } catch(e){
                throw e
            }
        },
        async getNameWithId({dispatch, commit}, id){
            try{
                return (await firebase.database().ref(`/users/${id}/name`).once('value')).val() || 'Unknown'
            } catch(e){
                console.log(e)

            }
        }
    }
}