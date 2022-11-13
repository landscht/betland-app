<template>
  <div>
    <h1>Callback</h1>
    <p>code: {{getCodeParam}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {RequestAccessToken} from "@/_models/_requests/RequestAccessToken";
import {AuthorizationService} from "@/_services/authorization.service";
import {Authorization} from "@/_models/Authorization";
import {UserService} from "@/_services/user.service";

@Component
export default class Callback extends Vue {

  public requestAccessToken: RequestAccessToken = new RequestAccessToken();

  mounted(): void {
    if (!this.getCodeParam) {
      this.$router.push('/');
    } else {
      this.initRequestAccessToken();
      this.getAccessToken();
    }
  }

  get getCodeParam(): string {
    return this.$route.query.code as string;
  }

  async waitForSpotifyWebPlaybackSDKToLoad(): Promise<any> {
    return new Promise(resolve => {
      if ((window as any).Spotify) {
        resolve((window as any).Spotify)
      } else {
        (window as any).onSpotifyWebPlaybackSDKReady = () => {
          resolve((window as any).Spotify)
        }
      }
    })
  }

  async initiatePlayer() {
    console.log('init player')
    const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad()
    const sdk = new Player({
      name: 'SpotifHue',
      volume: 1.0,
      getOAuthToken: (callback: (arg0: string) => void) => { callback(AuthorizationService.currentAuthorization.access_token) }
    })
    // Error handling
    sdk.addListener('initialization_error',  (message: string)  => { console.log('Initialization_error: ',message) })
    sdk.addListener('authentication_error', (message: string)  => { console.log('Authentication_error: ' + message) })
    sdk.addListener('account_error', (message: string) => { console.log('Account_error: ' + message) })
    sdk.addListener('playback_error', (message: string) => { console.log('Playback_error: ' + message) })
    // Playback status updates
    sdk.addListener('player_state_changed', (position: any, duration: any, track_window: any) => {
      console.log('Currently Playing', track_window);
      console.log('Position in Song', position);
      console.log('Duration of Song', duration);
    });
    sdk.addListener('player_state_changed', (state: any) => { console.log(state) });
    // Ready
    sdk.addListener('ready', (device_id: any) => {
      console.log('Ready with Device Id: ', device_id)
    })
    // Not Ready
    sdk.addListener('not_ready', (device_id: any) => {
      console.log('Not ready with device Id: ', device_id)
    })
    sdk.connect()
  }

  getAccessToken(): void {
    AuthorizationService.getToken(this.requestAccessToken)
        .finally(() => {
          UserService.getCurrentUserProfile()
          .finally(() => {
            this.initiatePlayer().finally(() => this.$router.push('home'))
          })
        })
        .catch((error) => console.log(error));
  }

  initRequestAccessToken(): void {
    this.requestAccessToken.grant_type = 'authorization_code';
    this.requestAccessToken.code = this.getCodeParam;
    this.requestAccessToken.redirect_uri = 'http://localhost:8080/callback'
  }

}
</script>
