<template>
  <v-row>
    <v-col cols="2" class="d-flex justify-center align-center">
      <v-icon size="20px" :color="color">{{ icon }}</v-icon>
    </v-col>
    <v-col class="d-flex align-center">
      <!-- <DialogSection><p>hoge</p></DialogSection>と書くと、slotの部分が<p>hoge</p>に置きかわる -->
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DialogSection',
  props: ['icon', 'color'],
};
</script>
