<template>
  <div>
    <h1 class="text-h1">Calendar</h1>
    <v-list>
      <v-list-item v-for="event in events" :key="event.id">
        {{ event.name }}
      </v-list-item>
    </v-list>
    <v-btn type="submit" @click="fetchEvents()">fetchEvents</v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Calendar',
  // ステートの値が変わると発火
  computed: {
    // getterrsのevents関数を動作させる
    ...mapGetters('events', ['events']),
  },
  methods: {
    // actionsのfetchEvents関数を動作させる
    ...mapActions('events', ['fetchEvents']),
  },
};
</script>
