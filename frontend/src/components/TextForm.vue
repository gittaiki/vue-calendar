<template>
  <!-- v-bindを使用して変数の値(value)を渡す -->
  <v-textarea
    filled
    rounded
    auto-grow
    :value="value"
    @input="$emit('input', $event)"
    placeholder="詳細"
    rows="4">
  </v-textarea>
</template>

<script>
export default {
  name: 'TimeForm',
  // 親コンポーネントから子コンポーネントに値を受け取る
  props: ['value'],

}
</script>
