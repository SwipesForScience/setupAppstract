<template>
  <div>
    <b-form>
      <b-form-group id="exampleInputGroup1"
                    label="Pubmed Query:"
                    label-for="exampleInput1"
                    description="Your pubmed query">
        <b-form-input id="exampleInput1"
                      v-model="manifestQuery"
                      required
                      placeholder="Enter your pubmed search">
        </b-form-input>
      </b-form-group>
    </b-form>

    <b-row class="mt-3">
      <b-col>
        <b-button @click="getPubmedQueryFull">Search</b-button>
      </b-col>
    </b-row>

    <b-row class="mt-3 text-center" v-if="manifestEntries.length">
      <b-col class="text-center">
      This search has {{manifestEntries.length}} hits.
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col class="text-center">
      You have {{sampleCounts.length}} entries in your database currently.
      </b-col>
    </b-row>

    <b-row class="mt-3" v-if="manifestEntries.length">
      <b-col>
        <b-button @click="syncEntries" variant="primary" size="lg">Upload</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>

</style>

<script>
import axios from 'axios';
import _ from 'lodash';
// eslint-disable-next-line
import LoadManifestWorker from 'worker-loader!../workers/LoadManifestWorker';


export default {
  name: 'metaAnalysis',
  props: {
    firebaseKeys: {
      type: Object,
    },
    db: {
      type: Object,
    },
    config: {
      type: Object,
    },
  },
  data() {
    return {
      manifestQuery: null,
      sampleCounts: [],
      status: null,
      progress: 0,
      manifestEntries: [],
      pubmedQueryStore: {
      },
    };
  },
  watch: {
    manifestQuery() {
      this.config.manifestQuery = this.manifestQuery;
    },
    db() {
      if (!_.isEmpty(this.db)) {
        this.addFirebaseListener();
      }
    },
  },
  methods: {
    /**
    * XML parser for pubmed query returns.
    */
    xmlParser(input) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, 'text/xml');
      return xmlDoc;
    },
    /**
    * if the manifest type is pubmed, then we need to query pubmed's API
    * to store our search on the server, and preview the first 100 pmids.
    */
    getPubmedQueryPreview() {
      const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
      const url = `${baseUrl}?db=pubmed&term=${encodeURI(this.manifestQuery)}&usehistory=y&retmax=100`;
      return axios.get(url).then((resp) => {
        const xml = this.xmlParser(resp.data);
        const webEnv = xml.getElementsByTagName('WebEnv')[0];
        const count = xml.getElementsByTagName('Count')[0];
        const ids = xml.getElementsByTagName('IdList')[0].children;
        this.pubmedQueryStore.webEnv = webEnv.innerHTML;
        this.pubmedQueryStore.count = count.innerHTML;
        this.manifestEntries = _.map(ids, i => i.innerHTML);
      });
    },
    /**
    * after the pubmed query preview, we need to get the full list of IDs
    * and save them to the database.
    */
    getPubmedQueryFull() {
      const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
      if (!this.pubmedQueryStore.webEnv) {
        this.getPubmedQueryPreview().then(() => {
          this.getPubmedQueryFull();
        });
      } else {
        const url = `${baseUrl}?db=pubmed&term=${encodeURI(this.manifestQuery)}&usehistory=y&retmax=${this.pubmedQueryStore.count}&WebEnv=${this.pubmedQueryStore.webEnv}`;
        axios.get(url).then((resp) => {
          const xml = this.xmlParser(resp.data);
          const ids = xml.getElementsByTagName('IdList')[0].children;
          this.manifestEntries = _.map(ids, i => i.innerHTML);
          // console.log(this.manifestEntries);
          // this.syncEntries();
        });
      }
    },
    /**
     * This method keeps track of sampleCounts, but only loads it once.
     */
    addFirebaseListener() {
      this.db.ref('sampleCounts').once('value', (snap) => {
        /* eslint-disable */
        this.sampleCounts = _.map(snap.val(), (val, key) => {
          return { '.key': key, '.value': val };
        });
        /* eslint-enable */
        this.status = 'complete';
      });
    },
    /**
    * sync manifest entries and firebase entries
    */
    syncEntries() {
      const firebaseEntries = _.map(this.sampleCounts, v => v['.key']);

      // first, for anything in manifest entries that isn't in firebase db
      // add them.
      const element = this;
      const worker = new LoadManifestWorker();

      // eslint-disable-next-line
      worker.postMessage([this.manifestEntries, firebaseEntries, element.firebaseKeys]);
      worker.onmessage = function onmessage(e) {
        element.status = 'complete';
        if (e.data === 'done') {
          element.addFirebaseListener();
        } else {
          element.progress += 1;
        }
      };

      // next check all of the items in firebase db
      // and remove any that aren't in manifestEntries
      _.map(firebaseEntries, (key) => {
        // check to see if the key is in the manifest.
        if (this.manifestEntries.indexOf(key) < 0) {
          // since the key isn't there, remove it from firebase.
          this.db.ref('sampleCounts').child(key).remove();
        }
      });
    },
  },
};
</script>

