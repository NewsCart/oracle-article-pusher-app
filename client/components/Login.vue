<template lang="html">
  <div class="login-wrapper">
    <h1 class="login-header">PROMETHEUS | Newscart</h1>
    <form>
      <section class="login-input">
        <!-- <label for="email">Email</label> -->
        <input class="input-box-login" type="text" name="email" placeholder="Email" id="email" v-model="email">
      </section>
      <section class="login-input">
        <!-- <label for="password">Password:</label> -->
        <input class="input-box-login" type="password" id="password" placeholder="Password" v-model="password">
      </section>
      <button id="log-in" class="submit-btn" @click="handleLogin">Log In</button>
    </form>
  </div>
</template>
<script type="text/javascript">
    import fb from '../firebase'
    export default {
      data() {
        return {
          email: '',
          password: ''
        }
      },
      methods: {
        handleLogin(event) {
          event.preventDefault();
          fb.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            if(user !== null) {
              this.$store.dispatch('receiveUser', user)
              .then(() => {
                this.$router.push({path: '/article-pusher'})
              })
            }
          })
          .catch(err => {
            alert(JSON.stringify(err))
          })
        }
      }
    }
</script>
