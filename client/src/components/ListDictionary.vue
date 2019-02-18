<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :search="search"
    :items="listUserDictionary"
    :custom-filter="filter"
    item-key="id"
    select-all
    expand
  >
    <template slot="headers" slot-scope="props">
      {{disableDeleteAndToggleAll(props.all === 0 ? true : false)}}
      <tr>
        <th class="header-width-1">
          <v-checkbox
            :input-value="props.all"
            :indeterminate="props.indeterminate"
            primary
            :disabled="disabledDeleteAndToogleAll"
            hide-details
            @click.stop="toggleAll"
          ></v-checkbox>
        </th>
        <th>
          <v-layout row justify-center>
            <v-flex sm3>
              <v-text-field
                v-model="search"
                label="Search"
                append-icon="search"
              ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex sm4>
              <v-select
                v-model="filters.langsText"
                :items="languages"
                item-text="name"
                item-value="abbr"
                persistent-hint
                chips
                label="LanguageText"
                placeholder="All languages"
                return-object
                multiple
              >
                <template slot="selection" slot-scope="{ item, index }">
                  <v-chip v-if="index < 3">
                    <span>{{ item.name }}</span>
                  </v-chip>
                  <span
                    v-if="index === 3"
                    class="grey--text caption"
                  >(+{{ filters.langsText.length - 3 }} others)</span>
                </template>
              </v-select>
            </v-flex>
            <v-flex sm4>
              <v-select
                v-model="filters.langsTranslate"
                :items="languages"
                item-text="name"
                item-value="abbr"
                persistent-hint
                chips
                label="LanguageTranslate"
                placeholder="All languages"
                return-object
                multiple
              >
                <template slot="selection" slot-scope="{ item, index }">
                  <v-chip v-if="index < 3">
                    <span>{{ item.name }}</span>
                  </v-chip>
                  <span
                    v-if="index === 3"
                    class="grey--text caption"
                  >(+{{ filters.langsTranslate.length - 3 }} others)</span>
                </template>
              </v-select>
            </v-flex>
          </v-layout>
        </th>
        <th class="header-width-1">
          <v-btn
            :disabled="disabledDeleteAndToogleAll || selected.length === 0"
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
          class="text-xs-center"
        >{{ props.item.text }} — {{ props.item.translate }}</td>
        <td class="justify-center">
          <v-btn icon @click="removeFromUserDictionary([props.item.id])">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from 'vuex';
import { LANGUAGES } from '../constants';

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
    headers: [{}, {}],
    search: '',
    languages: LANGUAGES,
    filters: {
      langsText: [],
      langsTranslate: [],
    },
    disabledDeleteAndToogleAll: false,
  }),
  methods: {
    ...mapActions('userDictionaryModule', ['removeFromUserDictionary']),
    toggleAll() {
      if (this.selected.length) {
        this.selected = [];
      } else {
        this.selected = this.filter(this.listUserDictionary, this.search);
      }
    },
    disableDeleteAndToggleAll(flag) {
      this.disabledDeleteAndToogleAll = flag;
    },
    filter(items, search) {
      const { langsText, langsTranslate } = this.filters;
      return items.filter(item => (langsText.length > 0
        ? langsText.some(lang => lang.abbr === item.textLang) : item)
      && (langsTranslate.length > 0
        ? langsTranslate.some(lang => lang.abbr === item.translateLang) : item)
      && (item.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
      || item.translate.toLowerCase().indexOf(search.toLowerCase()) !== -1));
    },
  },
};

</script>

<style lang="sass">
  .header-width-1
    width: 1%
</style>
