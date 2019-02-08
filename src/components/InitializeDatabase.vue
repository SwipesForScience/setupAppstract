<template>
  <div>
    <div class="text-left ml-3 pl-3">
        <b-alert show>
          Thanks for your keys!
          Follow the steps on the video above, and then click the "initalize" button
        </b-alert>
        <video class="video" src="https://s3.amazonaws.com/hotdognothotdog/setupAuthAndDatabase.webm" controls>
        </video>
        <b-row>
          <b-col class="text-center">
            <b-button @click="initAll" size="lg" variant="primary">
              Initialize Your Database
            </b-button>
          </b-col>
        </b-row>
      <p>Admin: {{admin}} <span v-if="admin">✅</span></p>
      <p>sampleCounts: {{sampleCounts}} <span v-if="sampleCounts">✅</span> </p>
      <p>sampleSummary: {{sampleSummary}} <span v-if="sampleSummary">✅</span> </p>
      <p>chats: {{chats}} <span v-if="chats">✅</span> </p>
      <p>user seen samples: {{userSeenSamples}} <span v-if="userSeenSamples">✅</span> </p>
      <p>votes: {{votes}} <span v-if="votes">✅</span> </p>
    </div>

    <div v-if="ready">Great! Please click the "next" button </div>
  </div>
</template>

<style>
  .video {
      max-width: -webkit-fill-available;
  }
</style>


<script>
import _ from 'lodash';
/**
* An interface that initializes an empty firebase realtime database
* with a default schema, assuming that the firebase rules are in test mode
* e.g (`{".read": true, ".write": true}`)
*/
export default {
  name: 'Initializer',
  props: {
    /**
     * The config object that is loaded from src/config.js.
     * It defines how the app is configured, including
     * any content that needs to be displayed (app title, images, etc)
     * and also the type of widget and where to update pointers to data
     */
    // config: {
    //   type: Object,
    //   required: true,
    // },
    /**
     * the intialized firebase database
     */
    db: {
      type: Object,
      required: true,
    },
    /**
     * the authenticated user object from firebase
     */
    userInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      /**
      * whether or not the /settings/admins/<username> is initialized on firebase
      */
      admin: false,
      /**
      * whether or not the /sampleCounts is initialized on firebase
      */
      sampleCounts: false,
      /**
      * whether or not the /sampleSummary is initialized on firebase
      */
      sampleSummary: false,
      /**
      * whether or not the /chats is initialized on firebase
      */
      chats: false,
      /**
      * whether or not the /userSeenSamples is initialized on firebase
      */
      userSeenSamples: false,
      /**
      * whether or not the /userSettings is initialized on firebase
      */
      userSettings: false,
      /**
      * whether or not the /votes is initialized on firebase
      */
      votes: false,
    };
  },
  computed: {
    /**
    * the logged in user's UID
    */
    uid() {
      return this.userInfo.uid;
    },
    /**
    * returns whether or not everything is inialized correctly.
    */
    ready() {
      return this.admin && this.sampleCounts &&
      this.sampleSummary && this.chats &&
      this.userSeenSamples && this.votes && this.userSettings;
    },
  },
  watch: {
    /**
    * once its ready, go to the next step in configuration.
    */
    ready() {
      if (this.ready) {
        console.log('ready to go');
        this.$emit('ready');
      }
    },
  },
  /**
  * initialize all documents
  */
  mounted() {
    if (_.isEmpty(this.db)) {
      console.log('initing');
      // this.initAll();
    }
  },
  methods: {
    /**
     * initialize the admin schema
     */
    initAdmin() {
      const displayName = this.userInfo.displayName;
      this.db.ref('settings')
        .child('admins')
        .child(displayName)
        .set(1);
      this.db.ref('users')
        .child(displayName)
        .child('admin')
        .set(true)
        .then(() => {
          this.admin = true;
        });
    },
    /**
     * initialize /sampleCounts
     */
    initSampleCounts() {
      this.db.ref('sampleCounts').once('value').then((snap) => {
        const val = snap.val();
        if (val === null) {
          this.db.ref('sampleCounts').set(0);
        }
      })
        .then(() => {
          this.sampleCounts = true;
        });
    },
    /**
     * initialize /sampleSummary
     */
    initSampleSummary() {
      this.db.ref('sampleSummary').once('value').then((snap) => {
        const val = snap.val();
        if (val === null) {
          this.db.ref('sampleSummary').set(0);
        }
      })
        .then(() => {
          this.sampleSummary = true;
        });
    },
    /**
     * initialize /chats
     */
    initChats() {
      this.db.ref('chats').once('value').then((snap) => {
        const val = snap.val();
        if (val === null) {
          this.db.ref('chats').set(0);
        }
      })
        .then(() => {
          this.chats = true;
        });
    },
    /**
     * initialize /userSeenSamples
     */
    initUserSeenSamples() {
      const displayName = this.userInfo.displayName;
      this.db.ref('userSeenSamples')
        .child(displayName)
        .once('value')
        .then((snap) => {
          const val = snap.val();
          if (val === null) {
            this.db.ref('userSeenSamples')
              .child(displayName)
              .set(0);
          }
        })
        .then(() => {
          this.userSeenSamples = true;
        });
    },
    /**
     * initialize /votes
     */
    initVotes() {
      this.db.ref('votes').once('value').then((snap) => {
        const val = snap.val();
        if (val === null) {
          this.db.ref('votes').set(0);
        }
      })
        .then(() => {
          this.votes = true;
        });
    },
    /**
    * initialize userSettings
    */
    initUserSettings() {
      this.db.ref('userSettings').once('value').then((snap) => {
        const val = snap.val();
        if (val === null) {
          this.db.ref('userSettings').set(0);
        }
      }).then(() => {
        this.userSettings = true;
      });
    },
    /**
     * initialize all
     */
    initAll() {
      this.initAdmin();
      this.initSampleCounts();
      this.initSampleSummary();
      this.initChats();
      this.initUserSeenSamples();
      this.initUserSettings();
      this.initVotes();
      this.$emit('initialized');
    },
  },
};
</script>
<style></style>
