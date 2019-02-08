<template>
  <div class="wizard">
    <form-wizard @on-complete="onComplete" title="Setup Swipes for Science"
     subtitle="Pubmed meta analysis setup">

      <!-- Input firebase keys -->
      <tab-content title="Database Setup"
                    icon="ti-server"
      >
        <firebase-keys ref="firebasekeys"
         v-on:newFirebaseKeys="setNewFirebaseKeys"
         :firebaseIsReady="firebaseIsReady"
         :projectname="projectname"
         />
      </tab-content>

      <tab-content title="Sign In"
                    icon="ti-user">

        <sign-in v-if="firebaseIsReady" :user="user" />
        <div v-else>Please go back and enter your firebase keys to continue!</div>

      </tab-content>

      <!-- Initialize the database -->
      <tab-content title="Initialize database"
                    icon="ti-wand">

        <initialize-database :db="db"
         :userInfo="user" v-if="isReadyToInitialize"
         v-on:ready="initialized()"/>
        <div v-else>Please go back and enter your firebase keys and sign in to continue!</div>
      </tab-content>


      <!-- Initialize the database -->
      <tab-content title="Meta-analysis"
                    icon="ti-user">

        <!-- <meta-analysis v-if="initializedDb"/> -->
        <!-- <div v-else>Please complete ALL previous steps to continue!</div> -->
        <meta-analysis :firebaseKeys='firebaseKeys' :db="db" :config="config" />

      </tab-content>

      <!-- Initialize the database -->
      <tab-content title="Customize"
                    icon="ti-home">

        <!-- <meta-analysis v-if="initializedDb"/> -->
        <!-- <div v-else>Please complete ALL previous steps to continue!</div> -->
        <home :config="config" />

      </tab-content>

      <tab-content title="Last step"
                    icon="ti-check">
        <final-step :config="config" />
      </tab-content>
  </form-wizard>
  </div>
</template>

<script>
import firebase from 'firebase';
import _ from 'lodash';
import FirebaseKeys from './FirebaseKeys';
import InitializeDatabase from './InitializeDatabase';
import SignIn from './SignIn';
import MetaAnalysis from './MetaAnalysis';
import FinalStep from './FinalStep';
import Home from './Home';
import config from '../config';

window.firebase = firebase;

export default {
  name: 'Wizard',
  components: {
    FirebaseKeys,
    InitializeDatabase,
    SignIn,
    MetaAnalysis,
    FinalStep,
    Home,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      firebaseKeys: {},
      user: {},
      db: {},
      firebaseIsReady: false,
      projectName: '',
      initializedDb: false,
      config,
    };
  },
  computed: {
    isReadyToInitialize() {
      return this.firebaseIsReady && !_.isEmpty(this.user);
    },
  },
  methods: {
    initialized() {
      this.initializedDb = true;
    },
    onComplete() {
      this.msg = 'Yay. Done!';
    },
    validateAsync() {
      return this.setNewFirebaseKeys();
    },
    setNewFirebaseKeys(fkeys) {
      this.firebaseKeys = fkeys;
      try {
        firebase.initializeApp(this.firebaseKeys);
        this.db = firebase.database();
      } catch (error) {
        firebase.app().delete().then(() => {
          firebase.initializeApp(this.firebaseKeys);
          this.db = firebase.database();
        });
      }
      console.log('hi there', firebase.app());
      this.projectname = firebase.app().options.projectId;
      this.firebaseIsReady = true;
      config.firebaseKeys = this.firebaseKeys;
      // firebase.initializeApp(this.firebaseKeys);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in and currentUser will no longer return null.
          this.user = user;
        } else {
          // No user is signed in.
          this.user = {};
        }
      });
      return Promise.resolve(1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
