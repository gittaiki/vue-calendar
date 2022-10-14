<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">{{ value || '日付を選択' }}</v-btn>
    </template>
    <!-- :valueにpropsから受け取る値を保持する変数、@inputにその変数の値が更新された時に呼び出す処理を指定 -->
    <v-date-picker
      :value="value.replace(/\//g, '-')"
      @input="$emit('input', $event.replace(/-/g, '/'))"
      no-title
      locale="ja-ja"
      :day-format="value => new Date(value).getDate()"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DateForm',
  props: ['value'],
}
</script>
