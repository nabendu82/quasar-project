<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input v-model="newTweetContent" class="new-tweet" placeholder="What's happening?" maxlength="280"
            bottom-slots counter autogrow>
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://en.gravatar.com/userimage/116058381/7905699e9ec1a7369b368d266e27498b.jpeg">
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn @click="addNewTweet" :disable="!newTweetContent" class="q-mb-lg" color="primary" label="Tweet" rounded
            unelevated no-caps />
        </div>
      </div>
      <q-separator color="grey-2" />
      <q-list separator>
        <q-item v-for="tweet in tweets" :key="tweet.id" class="q-py-md">
          <q-item-section avatar top>
            <q-avatar size="xl">
              <img src="https://en.gravatar.com/userimage/116058381/7905699e9ec1a7369b368d266e27498b.jpeg">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1">
              <strong>Nabendu Biswas</strong>
              <span class="text-grey-7">
                @nabendu82
              </span>
            </q-item-label>
            <q-item-label class="text-body1">{{ tweet.content }}</q-item-label>
            <div class="row justify-between q-mt-sm">
              <q-btn color="grey" icon="far fa-comment" size="sm" flat round />
              <q-btn color="grey" icon="fas fa-retweet" size="sm" flat round />
              <q-btn color="grey" icon="fas fa-heart" size="sm" flat round />
              <q-btn @click="deleteTweet(tweet)" color="grey" icon="fas fa-trash" size="sm" flat round />
            </div>
          </q-item-section>
          <q-item-section side top>{{ tweet.date }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue'
import db from 'src/boot/firebase'
export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      newTweetContent: '',
      tweets: []
    }
  },
  methods: {
    addNewTweet() {
      let dt = new Date();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let newTweet = {
        content: this.newTweetContent,
        date: monthNames[dt.getMonth()] + " " + dt.getDate()  + " " + dt.getFullYear()
      }
      // this.tweets.unshift(newTweet)
      db.collection('tweets').add(newTweet).then(docRef => {
        console.log('Document written with ID: ', docRef.id)
      }).catch(error => {
        console.error('Error adding document: ', error)
      })
      this.newTweetContent = ''
    },
    deleteTweet(tweet){
      db.collection('tweets').doc(tweet.id).delete().then(() => {
        console.log('Document successfully deleted!');
      }).catch(error => {
        console.error('Error removing document: ', error);
      })
    }
  },
  mounted() {
    db.collection('tweets').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log('Inside db firebase')
        let tweetChange = change.doc.data()
        tweetChange.id = change.doc.id
        if (change.type === 'added') {
          this.tweets.unshift(tweetChange)
        }
        if (change.type === 'modified') {
          console.log('Modified qweet: ', tweetChange)
        }
        if (change.type === 'removed') {
          console.log('Removed qweet: ', tweetChange)
          let index = this.tweets.findIndex(tweet => tweet.id === tweetChange.id)
          this.tweets.splice(index, 1)
        }
      })
    })
  }
})
</script>

<style lang="sass">
.new-tweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
</style>
