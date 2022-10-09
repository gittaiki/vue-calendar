<template>
  <div>
    <h1>Calendar</h1>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{ event.name }}
      </li>
    </ul>
    <button type="submit" @click="fetchEvents()">fetchEvents</button>
    <CalendarDetails />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CalendarDetails from './CalendarDetails.vue';

export default {
  name: 'Calendar',
  // importしたCalendarDetailsをHTMLで描画するために必要
  components: {
    CalendarDetails,
  },
  // ステートの値が変わると発火
  computed: {
    // getterrsのevents関数を動作させる
    ...mapGetters('events', ['events']),
  },
  methods: {
    // actionsのfetchEvents関数を動作させる
    ...mapActions('events', ['fetchEvents'])
  },
};
</script>
