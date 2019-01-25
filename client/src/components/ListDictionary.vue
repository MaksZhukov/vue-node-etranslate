<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="listUserDictionary"
    item-key="id"
    select-all
  >
    <template slot="headers" slot-scope="props">
      <tr>
        <th class="header-width-1">
          <v-checkbox
            :input-value="props.all"
            :indeterminate="props.indeterminate"
            primary
            hide-details
            @click.stop="toggleAll"
          ></v-checkbox>
        </th>
        <th></th>
        <th class="header-width-1">
          <v-btn
            :disabled="selected.length === 0"
            icon
            @click="removeFromUserDictionary(selected.map(item=>item.id))"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <tr>
        <td>
          <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
        </td>
        <td
          @click="props.expanded = !props.expanded"
          class="text-xs-center"
        >{{ props.item.text }} — {{ props.item.translate }}</td>
        <td class="justify-center">
          <v-btn icon @click="removeFromUserDictionary([props.item.id])">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>Peek-a-boo!</v-card-text>
      </v-card>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'dictionary',
  props: {
    listUserDictionary: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    selected: [],
    headers: [],
  }),
  methods: {
    ...mapActions('userDictionaryModule', ['removeFromUserDictionary']),
    toggleAll() {
      if (this.selected.length) {
        this.selected = [];
      } else {
        this.selected = this.listUserDictionary;
      }
    },
  },
};

</script>

<style lang="sass">
  .header-width-1
    width: 1%
</style>
