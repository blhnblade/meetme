import firebase from 'firebase/compat/app'
import defaultAvatar from '@/assets/img/default-avatar.png'

export default{
    actions: {
        async saveChanges ({ dispatch, commit, getters }, { avatar, name, city}){
            try{
                const uid = await dispatch('getUID');
                const info = getters.info;
                if(avatar){
                    await firebase.storage().ref(`avatars/${uid}`).put(avatar);
                    let path = await firebase.storage().ref(`avatars/${uid}`).getDownloadURL();
                    await firebase.firestore().collection('avatars').doc(uid).set({url: path});
                }
                if(name){
                    commit('setInfo', {...info, name})
                    await firebase.database().ref(`/users/${uid}/name`).set(name)
                }
                if(city){
                    commit('setInfo', {...info, city})
                    await firebase.database.ref(`/users/city/${uid}/city`).set(city)
                }
            } catch (e){
                console.log(e)
            }
        },

        async getAvatar({ dispatch, commit }){
            try{
                const uid = await dispatch('getUID');
                return (await firebase.firestore().collection(`avatars`).doc(`${uid}`).get()).data()?.url || defaultAvatar;
            }   catch (e){
                console.log(e)
                return defaultAvatar;
            }
        },
        async getAvatarWithId({dispatch, commit}, id){
            try{
                return (await firebase.firestore().collection('avatars').doc(id).get()).data()?.url || defaultAvatar;
            }  catch(e){
                console.log('avatars');
                return defaultAvatar;
            }
        }
    }
}