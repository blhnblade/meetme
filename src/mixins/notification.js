export default{
    data(){
        return {
            notification: false,
            notificationIsActive: false,
            notificationTimeout: null,
        }
    },
    methods: {
        notificationShow(){
            if(!this.notificationIsActive){
                this.notificationIsActive = true;
                this.notification = true;
                this.notificationTimeout = setTimeout(()=>{
                    this.notification = false
                    this.notificationIsActive = false
                }, 3000)
            }
        }
    },
    beforeUnmount(){
        if(this.notificationTimeout){
            window.clearInterval(this.notificationTimeout)
        }
    }
}