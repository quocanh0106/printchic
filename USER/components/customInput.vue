<template>
    <div class="custom-input">
        <v-text-field
        label="Main input"
        :rules="rules"
        class='custom-text-field'
        hide-details="auto"
    >
    <template v-slot:append>
      <v-icon color="green">
        mdi-search
      </v-icon>
    </template>
    </v-text-field>
    </div>
</template>

<script>

export default {
 components: {
  },
  data() {
    return {
    };
  },
}
</script>

<style lang="scss" scoped>
    .custom-text-field{
        width:328px;
        max-width:328px;
    }
</style>