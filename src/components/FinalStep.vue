<template>
  <div>
    <div v-if="!finalUrl">
      <!-- <p>
        <b-alert show>
          Go to the "storage" tab in your <strong>firebase console</strong> and enable storage.
        </b-alert>
      </p>
      <b-row>
        <b-col>
          <img class="w-100" src="@/assets/setupStorage01.png" />
        </b-col>
        <b-col>
          <img class="w-100" src="@/assets/setupStorage02.png" />
        </b-col>
      </b-row>
      <p class="mt-3">
        After you've done that, click "upload":
      </p>
      <b-button @click="uploadConfigFile" >
        Upload
      </b-button> -->
        <p> 1. Download your config file. </p>
        <b-button class="mb-3" variant="primary" @click="downloadConfig">Download</b-button>
        <p> 2. Upload your config file to the web (e.g S3, GitHub, Gist, etc) </p>
        <p> 3. Copy/paste the public URL to your config here: </p>
        <b-input v-model="finalUrl"></b-input>
    </div>

    <div v-else>
      <p>Copy paste these rules to your Firebase database "rules" tab</p>
      <!-- <img class="w-75 mb-3" src="@/assets/whereToSetStorageRules.png" /> -->
      <b-textarea :value="rules" max-rows="10"></b-textarea>
      <p class="mt-3 lead">Then, click on this link to play your game!</p>
      <p>
        <a :href="s4surl">{{s4surl}}</a>
      </p>
      <b-button @click="finalUrl = null">Reset URL</b-button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

function download(filename, text) {
  /*
   Function to download a text file from
   https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
  */
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default {
  name: 'Final',
  props: {
    config: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  computed: {
    s4surl() {
      return `https://dev.swipesforscience.org/#/?config=${this.finalUrl}`;
    },
    /**
    * firebase database rules.
    */
    rules() {
      return `
      {
        "rules": {
          ".read": "auth.uid === '${this.user.uid}'", // replace w/ your UID
          ".write": "auth.uid === '${this.user.uid}'",// replace w/ your UID
          "users": {
            ".read": true,
            ".write": "auth !== null && data.exists()",
            "$displayName": {
              ".read": true,
              ".write": "$displayName === auth.token.name",
              "admin": {
                ".write": "auth.uid === '${this.user.uid}'", // replace w/ your UID
              }
            }
          },
          "userSettings": {
            ".read": false,
            ".write": "auth !== null && data.exists()",
            "$displayName": {
              ".read": "$displayName === auth.token.name",
              ".write": "$displayName === auth.token.name",
            },
          },
          "chats": {
            ".read": true,
            ".write": "auth !== null && data.exists()",
          },
          "sampleCounts": {
            ".read": true,
            ".write": "auth !== null && data.exists()",
          },
          "sampleSummary": {
            ".read": true,
            ".write": "auth !== null && data.exists()",
          },
          "settings": {
            ".read": true,
            ".write": "auth.uid === '${this.user.uid}'" // replace w/ your UID
          },
          "userSeenSamples": {
            ".read": true,
            "$displayName": {
              ".write": true, // "$displayName === auth.token.name"
            },
          },
          "votes": {
            ".write": "data.exists()",
            ".read": "auth !== null",
          }
        }
      }
      `;
    },
  },
  data() {
    return {
      finalUrl: null,
    };
  },
  methods: {
    /**
     * Download the completed config file.
     */
    downloadConfig() {
      download('config.json', JSON.stringify(this.config, null, 2));
    },
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

