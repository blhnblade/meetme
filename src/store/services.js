import firebase from 'firebase/compat/app'
import defaultAvatar from '@/assets/img/default-avatar.png'
export default{
    state: {
        requests: null,
    },
    getters: {
        requests(state){
            return state.requests
        }
    },
    mutations: {
        setRequests(state, requests){
            state.requests = requests;
        },
        addRequest(state, job_id){
            state.requests.push(job_id)
        }
    },
    actions:{
        async fetchServices({dispatch, commit}, city){
            let uid = await dispatch('getUID');
            // firebase.database().ref(`/cities/${city}/all`).push({name: 'service2', uid})
            console.log(city)
            return (await firebase.database().ref(`/cities/${city}/all`).once('value')).val() || []
        },

        async fetchLimitServices({ dispatch }, city){
            const uid = await dispatch('getUID')
            const lengthServices = await firebase.database().ref(`/cities/${city}/all`).once('value')
        },

        async createJob({dispatch, getters}, data){
            const uid = await dispatch('getUID');
            data['creator_id'] = uid;
            let city = getters.info.city;
            data['creator_name'] = getters.info.name
            let jobKey =  firebase.database().ref(`/users/${uid}/existingjobs`).push().key

            const updates = {};
            updates[`/users/${uid}/existingjobs/${jobKey}`] = data;
            updates[`/cities/${city}/all/${jobKey}`] = data;

            await firebase.database().ref().update(updates);
        },

        async fetchMyExistingJobs({dispatch}){
            try {
                const uid = await dispatch('getUID');
                return (await (firebase.database().ref(`/users/${uid}/existingjobs`).once('value'))).val()
            } catch (e) {
                console.log('fetchMyExistingJobs', e)
            }
        },

        async deleteJob({dispatch, getters}, jobId){
            console.log(jobId)
            try {
                const uid = await dispatch('getUID');
                await firebase.database().ref(`/users/${uid}/existingjobs/${jobId}`).remove();
                const city = getters.info.city;
                await firebase.database().ref(`/cities/${city}/all/${jobId}`).remove();

                let perfomers = (await firebase.database().ref(`/users/${uid}/performers/${jobId}`).once('value')).val();
               
                if(!perfomers) return
                Object.keys(perfomers).map(async (perfomersId) => {
                    const userId = perfomers[perfomersId].performer_id
                    await firebase.database().ref(`/users/${userId}/requests/${jobId}`).remove()
                    return await firebase.database().ref(`/users/${userId}/approval/${jobId}`).remove()
                })
                await firebase.database().ref(`/users/${uid}/performers/${jobId}`).remove();
            } catch (e) {
                console.log('deleteJob', e)
            }
        },

        async sendRequest({dispatch, getters}, { job_id, creator_id, job_name }){
            const uid = await dispatch('getUID');
            const data = getters.info;
            const sendData = {
                performer_id: uid,
                name: data.name,
                email: data.email,
                number: data.number,
                job_name,
                job_id,
            }
            await firebase.database().ref(`/users/${creator_id}/performers/${job_id}`).push(sendData);
        },
        async saveRequest({dispatch}, {job_id, creator_id}){
            try{
                const uid = await dispatch('getUID')
                await firebase.database().ref(`/users/${uid}/requests/${job_id}`).set(true)
            } catch (e) {

            }
        },
        async fetchRequests({dispatch, commit}){
            const uid = await dispatch('getUID')
            let requests = (await firebase.database().ref(`/users/${uid}/requests`).once('value')).val() || []
            commit('setRequests', Object.keys(requests))
        },
        async fetchCityRequests({dispatch, getters}){
            let city = getters.info?.city
            if(!city){
                const uid = await dispatch('getUID')
                city = (await firebase.database().ref(`/users/${uid}/city`).once('value')).val()
            }
            
            const uid = await dispatch('getUID')
            const requests = Object.keys((await firebase.database().ref(`/users/${uid}/requests`).once('value')).val() || [])

            const finalRequests = [];
            for(let i = 0; i < requests.length; i++){
                const jobInfo = (await firebase.database().ref(`/cities/${city}/all/${requests[i]}`).once('value')).val()
                jobInfo['id'] = requests[i]
                jobInfo['creator_avatar'] = (await firebase.firestore().collection('avatars').doc(jobInfo.creator_id).get()).data()?.url || defaultAvatar
                finalRequests.push(jobInfo)
            }
            return finalRequests
            
            
        }
    }
}