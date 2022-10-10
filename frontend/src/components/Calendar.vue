<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday">今日</v-btn>
      <!-- prev()とnext()はカレンダーコンポーネントで定義されているメソッド -->
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>

    <v-sheet height="94vh">
      <v-calendar
       ref="calendar"
       v-model="value"
       :events="events"
       @change="fetchEvents"
       locale="ja-jp"
       :day-format="(timestamp) => new Date(timestamp.date).getDate()"
       :month-format="(timestamp) => (new Date(timestamp.date).getMonth() + 1) + ' /'">
      </v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Calendar',
  data: () => ({
    // new Date()は現在日時を取得
    value: format(new Date(), 'yyyy/MM/dd'),
  }),
  // ステートの値が変わると発火
  computed: {
    // getterrsのevents関数を動作させる
    ...mapGetters('events', ['events']),
    title() {
      return format(new Date(this.value), 'yyyy年 M月');
    },
  },
  methods: {
    // actionsのfetchEvents関数を動作させる
    ...mapActions('events', ['fetchEvents']),
    setToday() {
      this.value = format(new Date(), 'yyyy/MM/dd')
    },
  },
};
</script>
