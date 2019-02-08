<template>
  <div>
    <b-button @click="uploadConfigFile" v-if="!finalUrl">Upload</b-button>

    <div v-else>
      <p>Copy paste these rules to your Firebase storage "rules" tab</p>
      <img class="w-75 mb-3" src="@/assets/whereToSetStorageRules.png" />
      <b-textarea :value="rules"></b-textarea>
      <p class="mt-3 lead">You can click on this link to play your game!</p>
      <p>
        <a :href="s4surl">{{s4surl}}</a>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Final',
  props: {
    config: {
      type: Object,
    },
  },
  computed: {
    s4surl() {
      return `https://dev.swipesforscience.org/#/?config=https://cors-anywhere.herokuapp.com/${this.finalUrl}`;
    },
  },
  data() {
    return {
      finalUrl: null,
      rules: `service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read
      allow write: if request.auth != null;
    }
  }
}`,
    };
  },
  methods: {
    uploadConfigFile() {
      // Create a root reference
      const storageRef = firebase.storage().ref();

      // Create a reference to 'mountains.jpg'
      const configRef = storageRef.child('config.json');

      const message = JSON.stringify(this.config);

      configRef.putString(message).then(() => {
        configRef.getDownloadURL().then((url) => {
          this.finalUrl = url;
        });
      });
    },
  },
};
</script>

