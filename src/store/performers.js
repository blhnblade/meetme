import firebase from 'firebase/compat/app'

export default {
    actions: {
        async fetchPerformers({ dispatch }){
            try{
                const uid = await dispatch('getUID');
                let response = (await firebase.database().ref(`/users/${uid}/performers`).once('value')).val() || [];
                
                console.log(response)
                
                let generalObjectPeformers = {};
                // console.log(Object.keys(response).length)
                for(let i = 0; i < Object.keys(response).length; i++){
                    console.log(response[Object.keys(response)[i]])
                    for(let j = 0; j < Object.keys(response[Object.keys(response)[i]]).length; j++){
                        generalObjectPeformers[Object.keys(response[Object.keys(response)[i]])[j]] = response[Object.keys(response)[i]][Object.keys(response[Object.keys(response)[i]])[j]]
                    }
                    // for(let j = 0; j < Object.keys(response[Object.keys(response)[i]]).length; j++){
                        // console.log(Object.keys(response[i])[j])
                        // generalObjectPeformers[Object.keys(response[i])[j]] = response[i][Object.keys(response[i])[j]]
                    // }
                }
                console.log(generalObjectPeformers)
                // for(let i = 0; i < response.length; i++){
                //     for(let j = 0; j < Object.keys(response[i]).length; j++){
                //         generalArrayPeformers.push(response[i][j])
                //     }
                // }
                

                return Object.keys(generalObjectPeformers).map(async (performerListId)=>{
                    return {
                        number: generalObjectPeformers[performerListId].number,
                        email: generalObjectPeformers[performerListId].email,
                        job_id: generalObjectPeformers[performerListId].job_id,
                        job_name: generalObjectPeformers[performerListId].job_name,
                        name: generalObjectPeformers[performerListId].name,
                        performer_id: generalObjectPeformers[performerListId].performer_id,
                        performerListId,
                        performer_avatar: await dispatch('getAvatarWithId', generalObjectPeformers[performerListId].performer_id),
                    }
                })
            } catch(e){
                console.log('какая-то ошибка в fetchPerformers')
            }
        },
        async sendNumber({dispatch, getters}, {performer_id, job_name, job_id, ...payload}){
            try{
                const uid = await dispatch('getUID')
                const userData = getters.info
                const sendData = {
                    name: userData.name,
                    email: userData.email,
                    number: userData.number,
                    сustomer_id: uid,
                    job_name,
                    job_id,
                }
                return await firebase.database().ref(`/users/${performer_id}/approval/${job_id}`).set(sendData);
            } catch (e){
                console.log(e)
                return e
            }
        },
        async fetchApproval({ dispatch }){
            try{
                const uid = await dispatch('getUID')
                const response = (await firebase.database().ref(`/users/${uid}/approval`).once('value')).val() || []
                console.log(response, 'resp')
                return Object.keys(response).map(async (approvalId)=>{
                    return {
                        approvalId,
                        hui: response[approvalId],
                        name: response[approvalId].name,
                        email: response[approvalId].email,
                        number: response[approvalId].number,
                        job_name: response[approvalId].job_name,
                        сustomer_id: response[approvalId].сustomer_id,
                        customer_avatar: await dispatch('getAvatarWithId', response[approvalId].сustomer_id)
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    }
}