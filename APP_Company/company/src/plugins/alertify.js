import Vue from "vue";
import VueAlertify from "vue-alertify"
Vue.use(VueAlertify, {
    notifier: {
        // auto-dismiss wait time (in seconds)
        delay: 5,
        // default position
        position: 'top-right',
        // adds a close button to notifier messages
        closeButton: false,
    },
});
 