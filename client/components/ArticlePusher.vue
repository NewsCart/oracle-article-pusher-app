<template lang="html">
  <div>
      <div class="headline">
          <h2>PROMETHEUS</h2>
      </div>
<!--  ||| FORM START ||| -->
      <div class="form-wrapper">
        <form class="article-input-form">
          <section>
            <!-- <label for="title">Title</label> -->
            <input class="input-box" placeholder="Title" type="text" v-model="title" v-validate="'required'" name="title" id="title" required spellcheck="true">
            <span class="input-error" v-if="errors.has('title')">{{errors.first('title')}}</span>
          </section>

          <section>
            <!-- <label for="author">Author</label> -->
            <input class="input-box" placeholder="Author" type="text" v-model="author" v-validate="'required'" name="author" id="author" required spellcheck="true">
            <span class="input-error" v-if="errors.has('author')">{{errors.first('author')}}</span>
          </section>

          <section>
            <!-- <label for="source">Source</label> -->
            <input class="input-box" placeholder="Source" type="text" v-model="source" v-validate="'required'" name="source" id="source" required spellcheck="true">
            <span class="input-error" v-if="errors.has('source')">{{errors.first('source')}}</span>
          </section>

          <section>
            <!-- <label for="url">Article URL</label> -->
            <input class="input-box" placeholder="Article URL" type="text" v-model="url" v-validate="'required|url'" name="url" id="url" required>
            <span class="input-error" v-if="errors.has('url')">{{errors.first('url')}}</span>
          </section>

          <section>
            <!-- <label for="image">Image URL</label> -->
            <input class="input-box" placeholder="Image URL" type="text" v-model="imageLink" v-validate="'required|url'" name="image" id="image">
            <span class="input-error" v-if="errors.has('image')">{{errors.first('image')}}</span>
          </section>

          <section>
            <!-- <label for="description">Description</label> -->
            <textarea class="input-box" placeholder="Description" name="description" v-model="description" v-validate="'required'" id="description">
            </textarea>
            <span class="input-error" v-if="errors.has('description')">{{errors.first('description')}}</span>
            <!-- <p class="chars-left">{{charsLeft}} characters left</p> -->
          </section>

          <section>
            <!-- <label for="topic">Topic:</label> -->
            <div class="select-launcher" @click="toggleSelect('topic')">
              <h4 class="select-title" v-if="this.topic.length == 0">Topic</h4>
              <h4 class="select-title" v-else-if="this.topic.length ==1">Topic: {{this.topic[0]}}</h4>
              <h4 class="select-title" v-else-if="this.topic.length ==2">Topic: {{this.topic[0]}}, {{this.topic[1]}}</h4>
              <h4 class="select-title" v-else style="font-size:smaller;">Topic: {{this.topic[0]}}, {{this.topic[1]}}, {{this.topic[2].substr(0,3)}}...</h4>
              <div class="arrow-down"></div>
            </div>
            <div class="multiselect-box" :hidden="topicToggle" v-model="topic" multiple>
              <input type="checkbox" class=" multiselect-box-option hidden" id="artificial-intelligence" v-model="topic" value="Artificial Intelligence">
              <label class='multiselect-box-option' for="artificial-intelligence">Artificial Intelligence</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="brands" v-model="topic" value="Brands">
              <label class='multiselect-box-option' for="brands">Brands</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="consumer-tech" v-model="topic" value="Consumer Tech">
              <label class='multiselect-box-option' for="consumer-tech">Consumer Tech</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="digital-advertising" v-model="topic" value="Digital Advertising">
              <label class='multiselect-box-option' for="digital-advertising">Digital Advertising</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="e-commerce" v-model="topic" value="E-Commerce">
              <label class='multiselect-box-option' for="e-commerce">E-Commerce</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="mobile" v-model="topic" value="Mobile">
              <label class='multiselect-box-option' for="mobile">Mobile</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="native-advertising" v-model="topic" value="Native Advertising">
              <label class='multiselect-box-option' for="native-advertising">Native Advertising</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="ott" v-model="topic" value="OTT">
              <label class='multiselect-box-option' for="ott">OTT</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="podcasting" v-model="topic" value="Podcasting">
              <label class='multiselect-box-option' for="podcasting">Podcasting</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="programmatic-advertising" v-model="topic" value="Programmatic Advertising">
              <label class='multiselect-box-option' for="programmatic-advertising">Programmatic Advertising</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="publishers" v-model="topic" value="Publishers">
              <label class='multiselect-box-option' for="publishers">Publishers</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="social-impact" v-model="topic" value="Social Impact">
              <label class='multiselect-box-option' for="social-impact">Social Impact</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="social-media" v-model="topic" value="Social Media">
              <label class='multiselect-box-option' for="social-media">Social Media</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="streaming-music" v-model="topic" value="Streaming Music">
              <label class='multiselect-box-option' for="streaming-music">Streaming Music</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="travel" v-model="topic" value="Travel">
              <label class='multiselect-box-option' for="travel">Travel</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="travel-insurance" v-model="topic" value="Travel Insurance">
              <label class='multiselect-box-option' for="travel-insurance">Travel Insurance</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="tv" v-model="topic" value="TV">
              <label class='multiselect-box-option' for="tv">TV</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="tv-advertising" v-model="topic" value="TV Advertising">
              <label class='multiselect-box-option' for="tv-advertising">TV Advertising</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="video" v-model="topic" value="Video">
              <label class='multiselect-box-option' for="video">Video</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="virtual-reality" v-model="topic" value="Virtual Reality">
              <label class='multiselect-box-option' for="virtual-reality">Virtual Reality</label>
            </div>
            <p :hidden="isTopicSelected" class="topic-prompt">Please select related topic(s)</p>
          </section>
          <section class="user-select">
            <!-- <label for="company">Company:</label> -->
            <div class="select-launcher" @click="toggleSelect('company')">
              <h4 class="select-title" v-if="this.company.length==0">Company</h4>
              <h4 class="select-title user-list" v-for="company in company">{{ company }}</h4>
              <div class="arrow-down"></div>
            </div>
            <div :hidden="companyToggle" class="multiselect-box" id="company">
              <input type="checkbox" class=" multiselect-box-option hidden" id="nbc" v-model="company" value="NBC">
              <label class='multiselect-box-option' for="nbc">NBC</label>
              <input type="checkbox" class=" multiselect-box-option hidden" id="time-inc" v-model="company" value="Time Inc">
              <label class='multiselect-box-option' for="time-inc">Time Inc</label>
            </div>

            <p :hidden="isCompanySelected" class="topic-prompt">Please assign company</p>
          </section>
          <section class="checkbox-wrapper">
            <input class="checkbox" type="checkbox" id="checkbox" v-model="recommended" style="display: inline-block;">
            <label class="recommended" for="checkbox">Recommended</label>
          </section>
          <button id="submit-article" class="submit-btn" :disabled="!isFormFilled" @click="addArticle">Submit</button>
        </form>
      </div>
<!-- ||| FORM END ||| -->
<!-- ||| PREVIEW START ||| -->
      <div class="preview-wrapper">
        <div class="preview">
      		<h2>PREVIEW</h2>
            <div class="nc-article-card" :style="{'background-image': 'url(' + imageLink + ')' }">
              <img v-if="recommended" class="recommended-flag" src="../../static/imgs/newscart-icon-stroke-white.png" alt="nc-recommended">
               <div class="nc-article-card__gradient">
                 <div class="nc-article-card__content">
                  <div class="nc-article-card__details">
                    <h3 class="preview-title">{{ titlePush }}</h3>
                    <p class="preview-source">{{ sourcePush }}</p>
                    <p class='previw-source'>{{ date }}</p>
                  </div>
                </div>
               </div>
             </div>
      		</div>
      		<div class="preview-content">
            <!-- <p class="preview-author">{{ authorPush }}</p> -->
      			<!-- <p><a :href="url" class="preview-link" target="_blank">{{ url }}</a></p> -->
            <div class="preview-topic-wrapper">
              <h3 class="preview-header">Description:</h3>
              <p style="font-weight: 300;">{{ description }}</p>
            </div>
            <div class="preview-topic-wrapper">
              <h3 class="preview-header">Topics:</h3>
              <p class="preview-topic-chip" v-for="topic in topic" >{{ topic }}</p>
              </div>
            </div>
            <!-- <p>{{ company }}</p> -->
      		</div>
        </div>
  	  </div>
    </div>
    <!-- ||| PREVIEW END ||| -->
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
        topicToggle: true,
        companyToggle: true,
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
        company: [],
        recommended: false
      }
    },
    methods: {
      removeTopic(topic, id){
        let index = this.topic.indexOf(topic);
        this.topic.splice(index, 1);
        document.getElementById(id).checked=false;
      },
      toggleSelect(select){
        if(select == "topic"){
          if(this.topicToggle == true){
            this.topicToggle = false;
          }else{
            this.topicToggle = true
          }
        }else{
          if(this.companyToggle == true){
            this.companyToggle = false;
          }else{
            this.companyToggle = true;
          }

        }
      },
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
            objectID: this.objectID,
            recommended: this.recommended
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
              objectID: this.objectID,
              recommended: this.recommended
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
        this.recommended = false;
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
