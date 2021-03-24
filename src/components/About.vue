<template>
  <div></div>
  <!--  <v-container fluid>-->
  <!--    <v-layout row wrap>-->
  <!--      <Heading :title="$t('meeting.TITLE')" />-->
  <!--      <Description :description="$t('meeting.end')" />-->
  <!--    </v-layout>-->
  <!--  </v-container>-->
</template>

<script>
// import Heading from './common/Heading'
// import Description from './common/Description'

export default {
  components: {},
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('about.TITLE')} - %s`
    }
  }
}
</script>
<style scoped>
.meeting-end {
  max-width: 30rem;
  padding: 1rem;
  margin: 1rem auto;
  border: 2px solid red;
  min-width: 100px !important;
}
.meeting-end__title {
  text-align: center;
}
</style>
