<template>
  <div class="index-component">
    <div class="authentication-status" v-if="$auth.isAuthenticated()">
      You are successfully authenticated
      <div class="authentication-status__token">{{$auth.getToken()}}</div>
    </div>
    <button @click="authLogin()">Login</button>
    <button @click="authRegister()">Register</button>
    <button @click="authLogout()">Logout</button>
    <pre class="response" v-if="response !== null">{{JSON.stringify(response, null, 2)}}</pre>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      access_token: null,
      response: null
    }
  },
  methods: {
    authLogin: function () {
      var this_ = this;
      let user = {
        email: 'john.doe@domain.com',
        password: 'pass123456'
      };

      if (this.$auth.isAuthenticated()) {
        this.$auth.logout();
      }

      this.$auth.login(user).then(function (response) {
        this_.response = response
      })
    },

    authRegister: function () {
      var this_ = this;
      let user = {
        name: 'John Doe',
        email: 'john.doe@domain.com',
        password: 'pass123456'
      };

      if (this.$auth.isAuthenticated()) {
        this.$auth.logout();
      }

      this.$auth.register(user).then(function (response) {
        this_.response = response
      })
    },

    authLogout: function() {
      this.$auth.logout().then(() => {
        if (!this.$auth.isAuthenticated()) {
          this.response = null
        }
      })
    },

    auth: function(provider) {
      if (this.$auth.isAuthenticated()) {
        this.$auth.logout()
      }

      this.response = null

      var this_ = this;
      this.$auth.authenticate(provider).then(function (authResponse) {
        if (provider === 'github') {
          this_.$http.get('https://api.github.com/user').then(function (response) {
            this_.response = response
          })
        } else if (provider === 'facebook') {
          this_.$http.get('https://graph.facebook.com/v2.5/me', {
            params: { access_token: this_.$auth.getToken() }
          }).then(function (response) {
            this_.response = response
          })
        } else if (provider === 'google') {
          this_.$http.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect').then(function (response) {
            this_.response = response
          })
        } else if (provider === 'twitter') {
          this_.response = authResponse.body.profile
        } else if (provider === 'instagram') {
          this_.response = authResponse
        } else if (provider === 'bitbucket') {
          this_.$http.get('https://api.bitbucket.org/2.0/user').then(function (response) {
            this_.response = response
          })
        } else if (provider === 'linkedin') {
          this_.response = authResponse
        } else if (provider === 'live') {
          this_.response = authResponse
        }
      }).catch(function (err) {
        this_.response = err
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
