<template>
  <div>
    <div>
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-6045255995207137"
           data-ad-slot="6954451890"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
    <div style=" text-align: center; margin-top: 100px">
      <img width="200" src="@/assets/logo.png" />
    </div>
    <div class="container-login">
      <vs-alert relief closable color="#7d33ff" gradient v-if="false" v-model="alertActive">
        <template #title>
          Important
        </template>
        <div style="display: flex; justify-content: center">
          <vs-button dark blank href="https://cloud-549580996.onetsolutions.network">Faire confiance à Betland</vs-button>
        </div>
        <span style="font-size: 13px">
          Étant donné que Betland est gratuit et fut développé dans le cadre d'un projet personnel, celui ci utilise un certificat SSL non vérifié par un organisme car cela est payant. 🐀
        Il se peut donc que lors de la première utilisation, votre navigateur ne fasse pas confiance à l'application 😢 Vous recevrez alors une erreur de la part de l'API qui est utilisée. Pour être sûr, veuillez cliquer sur le lien ci-dessus et autoriser le navigateur à faire confiance à Betland
        </span>
      </vs-alert>
      <p class="mb-3">Bienvenue sur BetLand! Venez parier sur la Coupe Du Monde 2022 entre amis !</p>
      <vs-input
          v-if="signupMode"
          class="mb-3"
          label-placeholder="Email"
          v-model="email"
      />
      <vs-input
          class="mb-3"
          label-placeholder="Nom d'utilisateur"
          v-model="username"
      />
      <vs-input
          class="mb-3"
          type="password"
          v-model="password"
          label-placeholder="Mot de passe"
          :visiblePassword="hasVisiblePassword"
          icon-after
          @click-icon="hasVisiblePassword = !hasVisiblePassword">
        <template #icon>
          <i v-if="!hasVisiblePassword" class='bx bx-show-alt'></i>
          <i v-else class='bx bx-hide'></i>
        </template>
      </vs-input>
      <vs-input
          v-if="signupMode"
          class="mb-3"
          :visiblePassword="hasVisiblePassword"
          label-placeholder="Confirmation mot de passe"
          type="password"
          v-model="confirmPassword"
      />
      <vs-button class="mt-3" :active-disabled="disabled" @click="signupMode ? signup() : callSignin()">{{ signupMode ? `S'inscrire` : 'Se connecter' }}</vs-button>
      <vs-button class="mt-3" transparent @click="signupMode = !signupMode">{{ signupMode ? `J'ai déja un compte` : 'Se créer un compte' }}</vs-button>
    </div>
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SigninRequest from "@/_models/_requests/SigninRequest";
import {SignupRequest} from "@/_models/_requests/SignupRequest";
import {AuthService} from "@/_services/auth.service";
import {namespace} from "vuex-class";

const authModule = namespace('AuthModule');

@Component
export default class Login extends Vue {
  username = '';
  password = '';
  email = '';
  confirmPassword = '';
  alertActive = true;
  signupMode = false;
  hasVisiblePassword = false;

  @authModule.Action
  public signin!: (signinRequest: SigninRequest) => boolean;

  mounted(): void {
    this.adsenseAddLoad();
  }

  async signup(): Promise<void> {
    const request: SignupRequest = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: []
    };
    const response = await AuthService.signup(request);
    if (!response) {
      this.$vs.notification({
        color: 'danger',
        position: 'top-right',
        title: 'Inscription impossible 😬',
        text: `L'adresse mail ou le nom d'utilisateur est déjà utilisé`
      });
    } else {
      this.signupMode = false;
    }
    this.email = '';
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }

  get disabled(): boolean {
    return (this.signupMode && (this.password !== this.confirmPassword || this.email.length < 3)) || this.password.length < 6 || this.username.length < 3;
  }

  async callSignin(): Promise<void> {
    const signinRequest: SigninRequest = {
      username: this.username,
      password: this.password
    };
    const response = await this.signin(signinRequest);
    if (response) {
      this.$router.push('/home/' );
    } else {
      this.$vs.notification({
        color: 'danger',
        position: 'top-right',
        title: 'Connexion impossible 😬',
        text: `Les identifiants sont incorrects`
      });
    }
  }

  adsenseAddLoad(){
    let inlineScript   = document.createElement("script");
    inlineScript.type  = "text/javascript";
    inlineScript.text  = '(adsbygoogle = window.adsbygoogle || []).push({});'
    document.getElementsByTagName('body')[0].appendChild(inlineScript);
  }

}
</script>

<style scoped>
@import "~@/assets/general.scss";

.container-login {
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background: #1c1c1c;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  height: 60%;
  position: absolute;
  bottom: 0;
  margin-left: auto;
  z-index: 99;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

.context {
  z-index: -1;
}

.circles{
  position: absolute;
  top: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  left: 0;
  overflow: hidden;
}

.circles li{
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;

}

.circles li:nth-child(1){
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}


.circles li:nth-child(2){
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3){
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4){
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5){
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6){
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7){
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8){
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9){
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10){
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}



@keyframes animate {

  0%{
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100%{
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }

}
</style>