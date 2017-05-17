<template lang="html">
  <div>
      <div class="form-wrapper">
        <h2>NewsCart Article Pusher</h2>
        <form class="article-input-form">
          <section>
            <label for="title">Title</label>
            <input type="text" v-model="title" v-validate="'required'" name="title" id="title" required spellcheck="true">
            <span class="input-error" v-if="errors.has('title')">{{errors.first('title')}}</span>
          </section>

          <section>
            <label for="author">Author</label>
            <input type="text" v-model="author" v-validate="'required'" name="author" id="author" required spellcheck="true">
            <span class="input-error" v-if="errors.has('author')">{{errors.first('author')}}</span>
          </section>

          <section>
            <label for="source">Source</label>
            <input type="text" v-model="source" v-validate="'required'" name="source" id="source" required spellcheck="true">
            <span class="input-error" v-if="errors.has('source')">{{errors.first('source')}}</span>
          </section>

          <section>
            <label for="url">Article URL</label>
            <input type="text" v-model="url" v-validate="'required|url'" name="url" id="url" required>
            <span class="input-error" v-if="errors.has('url')">{{errors.first('url')}}</span>
          </section>

          <section>
            <label for="image">Image URL</label>
            <input type="text" v-model="imageLink" v-validate="'required|url'" name="image" id="image">
            <span class="input-error" v-if="errors.has('image')">{{errors.first('image')}}</span>
          </section>

          <section>
            <label for="description">Description</label>
            <textarea name="description" v-model="description" v-validate="'required'" id="description" maxlength="70">
            </textarea>
            <span class="input-error" v-if="errors.has('description')">{{errors.first('description')}}</span>
            <p class="chars-left">{{charsLeft}} characters left</p>
          </section>

          <section>
            <label for="topic">Topic:</label>
            <p class="select-info">Hold down Command(mac)/Ctrl (windows) to select/deselect multiple items</p>
            <select class="multiselect-box" v-model="topic" multiple>
              <option>Artificial Intelligence</option>
              <option>AR/VR</option>
              <option>Big Data</option>
              <option>Bots</option>
              <option>Brands</option>
              <option>Commerce</option>
              <option>Consumer Tech</option>
              <option>Digital Advertising</option>
              <option>Internet of Things</option>
              <option>Mergers and Acquisitions</option>
              <option>Mobile</option>
              <option>Music</option>
              <option>Native Advertising</option>
              <option>OTT</option>
              <option>Programmatic Advertising</option>
              <option>Publishers</option>
              <option>Regulation</option>
              <option>Social Media</option>
              <option>Streaming Music</option>
              <option>TV Advertising</option>
              <option>TV/Film</option>
              <option>Video</option>
            </select>
            <p :hidden="isTopicSelected" class="topic-prompt">Please select related topic(s)</p>
          </section>
          <section class="user-select">
            <label for="company">Company:</label>
            <select class="multiselect-box" v-model="company" id="company" multiple>
              <option>NBC</option>
              <option>Time Inc</option>
              <!--<option>World Nomads</option>
              <option>Because Of Them We Can</option>
              <option>Turner Center</option> -->
            </select>
            <p :hidden="isCompanySelected" class="topic-prompt">Please assign company</p>
          </section>
          <button id="submit-article" class="submit-btn" :disabled="!isFormFilled" @click="addArticle">Submit</button>
        </form>
      </div>

      <div class="preview-wrapper">
        <div class="preview">
      		<h2>Preview</h2>
      		<div>
      		 <img id="preview-img" :src="imageLink" alt="" class="preview-img">
      		</div>
      		<div class="preview-content">
      			<h3 class="preview-title">{{titlePush}}</h3>
            <p class="preview-author">{{ authorPush }}</p>
            <p class="preview-source">{{ sourcePush }}</p>
      			<p class="preview-description">{{description}}</p>
      			<p><a :href="url" class="preview-link" target="_blank">{{url}}</a></p>
            <p>Topics: {{topic}}</p>
            <p>{{company}}</p>
      		</div>
        </div>
  	  </div>
    </div>
</template>
<script type="text/javascript">
  import moment from 'moment'
  import fb from '../firebase'
  export default {
    computed: {
      date: function () {
        return moment().format('MMMM DD YYYY h:mm A');
      },
      charsLeft(state) {
        return 70 - state.description.length;
      },
      objectID: function(){
        return encodeURIComponent(this.title.split(' ').join('').toLowerCase());
      },
      isFormFilled: function () {
        return (
          this.objectID.length >= 1 &&
          this.author.length >= 1 &&
          this.source.length >= 1 &&
          this.url.length >= 1 &&
          this.description.length >= 1 &&
          this.topic.length > 0 &&
          this.company.length > 0
        )
      },
      isTopicSelected: function(){
        return (this.topic.length>0)
      },
      isCompanySelected: function(){
        return (this.company.length>0)
      },
      sourcePush: function() {
        return encodeURIComponent(this.source.toLowerCase().split(' ').filter( x => x !== "").join('-'));
      },
      titlePush: function() {
        return this.title.trim();
      },
      authorPush: function() {
        return this.author.trim();
      }

    },
    data(){
      return {
        email: '',
        password: '',
        articlesRef: fb.database().ref('articles'),
        title: '',
        author: '',
        source: '',
        url: '',
        imageLink: '',
        description: '',
        topic: [],
        company: []

      }
    },
    methods: {
      addArticle(e) {
        e.preventDefault();
        let objectIDHolder = this.objectID;
        let companyHolder = this.company;
        if(this.company.length == 1){
          fb.database().ref(companyHolder[0]).child(objectIDHolder).set({
            publishedAt: this.date,
            author: this.authorPush,
            source: this.sourcePush,
            title: this.titlePush,
            url: this.url,
            urlToImage: this.imageLink,
            description: this.description,
            topic: this.topic,
            objectID: this.objectID
          }).then(() => {
            this.$swal({
              title: 'Success!',
              text: 'Your article was submitted',
              type: 'success'
            })
          })
          .catch(err => {
            console.log('Error', err);
          })
        }else{
          for(let i = 0; i <= this.company.length; i++){
            fb.database().ref(companyHolder[i]).child(objectIDHolder).set({
              publishedAt: this.date,
              author: this.authorPush,
              source: this.sourcePush,
              title: this.titlePush,
              url: this.url,
              urlToImage: this.imageLink,
              description: this.description,
              topic: this.topic,
              objectID: this.objectID
          }).then(() => {
            this.$swal({
              title: 'Success!',
              text: 'Your article was submitted',
              type: 'success'
            })
          })
          .catch(err => {
            console.log('Error', err);
          })
        }
      }
        this.clearInputFields();
      },
      clearInputFields() {
        this.date = '';
        this.author = '';
        this.source = '';
        this.title = '';
        this.url = '';
        this.imageLink = '';
        this.description = '';
        this.topic = [];
        this.company = [];
      },
      signIn() {
        var email = this.email;
        var password = this.password;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
      }
    }
  }
</script>
