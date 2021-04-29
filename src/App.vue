<template>
  <router-view />
</template>

<script>
import meetingsApi from './services/api/meetings'

export default {
  name: 'App',
  metaInfo() {
    return {
      title: this.appTitle,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { name: 'msapplication-TileColor', content: '#ffc40d' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'apple-mobile-web-app-title',
          content: this.appTitle
        },
        { name: 'application-name', content: this.appTitle }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
        { rel: 'favicon', href: '/favicon.ico' }
      ]
    }
  },
  components: {},
  created() {
    this.ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av')
    this.ZoomMtg.preLoadWasm()
    this.ZoomMtg.prepareJssdk()

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const hostId = urlParams.get('hostId') || ''
    const meetingId = urlParams.get('meetingId') || ''
    this.sendMessage(
      JSON.stringify({
        type: 'HIDE_CALL',
        data: {
          hostId,
          meetingId
        }
      })
    )
  },
  mounted() {
    this.ZoomMtg.inMeetingServiceListener('onUserLeave', (data) => {
      console.error('inMeetingServiceListener onUserLeave', data)
    })

    const bindEvent = (element, eventName, eventHandler) => {
      if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false)
      } else if (element.attachEvent) {
        element.attachEvent(`on${eventName}`, eventHandler)
      }
    }
    // Listen to messages from parent window
    bindEvent(window, 'message', (e) => {
      if (e.data) {
        const response = JSON.parse(e.data)
        console.log('Data from Parent: ', response)
        switch (response.type) {
          case 'START_MEETING': {
            this.prepareDataAndStartMeeting(response.data)
            break
          }
        }
      }
    })
  },
  data() {
    return {
      leaveUrl: 'http://localhost:9090',
      role: 0,
      userEmail: 'majo@majo.com',
      userName: 'Majo'
    }
  },
  computed: {
    appTitle() {
      return this.$store.getters.appTitle
    }
  },
  methods: {
    // Send a message to the parent
    sendMessage(msg) {
      // Make sure you are sending a string, and to stringify JSON
      window.parent.postMessage(msg, '*')
    },
    async prepareDataAndStartMeeting(payload) {
      const {
        data: { signature, apiKey }
      } = await meetingsApi.getSignature(payload.meetingNumber, payload.role)
      this.startMeeting(signature, apiKey, payload)
    },
    startMeeting(signature, apiKey, meetingData) {
      document.getElementById('zmmtg-root').style.display = 'block'

      this.ZoomMtg.init({
        leaveUrl: `${this.leaveUrl}?hostId=${meetingData.hostId}&meetingId=${meetingData.meetingNumber}`,
        isSupportAV: true,
        meetingInfo: ['topic', 'host'],
        success: (success) => {
          console.log(success)
          this.ZoomMtg.join({
            meetingNumber: meetingData.meetingNumber,
            userName: meetingData.userName,
            signature,
            apiKey,
            userEmail: meetingData.userEmail,
            passWord: meetingData.passWord,
            success: (ok) => {
              console.log(ok)
              this.ZoomMtg.getCurrentUser({
                success(res) {
                  console.log('success getCurrentUser', res.result.currentUser)
                }
              })
            },
            error: (error) => {
              console.log(error)
            }
          })
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
}
</script>

<style>
/*#zmmtg-root {*/
/*  display: none;*/
/*}*/
body {
  background-color: black;
}
</style>
