<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center" color="grey lighten-3">
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

    <!-- ①fetchEventsメソッドを呼び出し、イベントデータを全て取得 -->
    <!-- ②:eventsは開始時刻と終了時刻の配列が入る -->
    <!-- ③予定ある日付をクリックすると、showEventメソッドを呼び出す -->
    <!-- ref属性はイベントハンドラーからアクセス可能にする -->
    <v-sheet height="94vh" class="d-flex">
      <v-sheet width="200px">
        <CalendarList />
      </v-sheet>
      <v-sheet class="flex">
        <v-calendar
          ref="calendar"
          v-model="value"
          :events="events"
          @change="fetchEvents"
          locale="ja-jp"
          :day-format="timestamp => new Date(timestamp.date).getDate()"
          :month-format="timestamp => new Date(timestamp.date).getMonth() + 1 + ' /'"
          @click:event="showEvent"
          @click:day="initEvent"
          @click:date="showDayEvents"
          @click:more="showDayEvents"
        ></v-calendar>
      </v-sheet>
    </v-sheet>

    <v-dialog :value="event !== null" @click:outside="closeDialog" width="600">
      <!-- 予定をクリックするとEventDetailDialogコンポーネントを呼び出す -->
      <EventDetailDialog v-if="event !== null && !isEditMode" />
      <EventFormDialog v-if="event !== null && isEditMode" />

    </v-dialog>

    <v-dialog :value="clickedDate !== null" @click:outside="closeDialog" width="600">
      <DayEventList />
    </v-dialog>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { mapGetters, mapActions } from 'vuex';
import EventDetailDialog from '../events/EventDetailDialog';
import EventFormDialog from '../events/EventFormDialog';
import DayEventList from '../events/DayEventList';
import CalendarList from '../calendars/CalendarList';
import { getDefaultStartAndEnd } from '../../functions/datetime';

export default {
  name: 'Calendar',
  components: {
    EventDetailDialog,
    EventFormDialog,
    CalendarList,
    DayEventList,
  },
  data: () => ({
    // new Date()は現在日時を取得
    value: format(new Date(), 'yyyy/MM/dd'),
  }),
  // カレンダーの月が変わると発火
  computed: {
    // getterrsのevents関数を呼び出して使用できるようにしている
    ...mapGetters('events', ['events', 'event', 'isEditMode', 'clickedDate']),
    title() {
      return format(new Date(this.value), 'yyyy年 M月');
    },
  },
  methods: {
    // actionsのfetchEvents関数を呼び出して使用できるようにしている
    ...mapActions('events', ['fetchEvents', 'setEvent', 'setEditMode', 'setClickedDate']),
    setToday() {
      this.value = format(new Date(), 'yyyy/MM/dd')
    },
    showEvent({ nativeEvent, event }) {
      this.setEvent(event);
      // イベントの伝播を抑制
      nativeEvent.stopPropagation();
    },
    closeDialog() {
      this.setEvent(null);
      this.setEditMode(false);
      this.setClickedDate(null);
    },
    initEvent({ date }) {
      if (this.clickedDate !== null) {
        return;
      }
      // 2021-10-07を2021/10/07に変換
      date = date.replace(/-/g, '/');

      const [start, end] = getDefaultStartAndEnd(date);
      this.setEvent({ name: '', start, end, timed: true });
      this.setEditMode(true);
    },
    showDayEvents({ date }) {
      date = date.replace(/-/g, '/');
      this.setClickedDate(date);
    },
  },
};
</script>
