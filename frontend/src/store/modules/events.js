import axios from 'axios';
import { serializeEvent } from '../../functions/serializers';

const apiUrl = 'http://localhost:3000';

const state = {
  events: [],
  event: null,
  isEditMode: false,
};

// computedのmapGettersから呼び出される
const getters = {
  // functions/serializers.jsのserializeEventメソッドを実行
  events: state => state.events.map(event => serializeEvent(event)),
  event: state => serializeEvent(state.event),

  isEditMode: state => state.isEditMode,
};

const mutations = {
  // eventsステートの値をRails APIのレスポンスデータで上書き(更新)する
  setEvents: (state, events) => (state.events = events),
  appendEvent: (state, event) => (state.events = [...state.events, event]),
  setEvent: (state, event) => (state.event = event),
  setEditMode: (state, bool) => (state.isEditMode = bool),
  // stateのeventsから削除したeventのみ削除
  removeEvent: (state, event) => (state.events = state.events.filter(e => e.id !== event.id)),

  resetEvent: state => (state.event = null),
  updateEvent: (state, event) => (state.events = state.events.map(e => (e.id === event.id ? event : e))),
};

// methodsのmapActionsから呼び出される
const actions = {
  // asyncは非同期関数を定義する関数宣言のこと
  async fetchEvents({ commit }) {
    // 関数の前にawaitを指定すると、その関数の結果が返されるまで待機
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data); // mutationを呼び出す
  },
  async createEvent({ commit }, event) {
    const response = await axios.post(`${apiUrl}/events`, event);
    commit('appendEvent', response.data);
  },
  async deleteEvent({ commit }, id) {
    const response = await axios.delete(`${apiUrl}/events/${id}`);
    commit('removeEvent', response.data);
    commit('resetEvent');
  },
  async updateEvent({ commit }, event) {
    const response = await axios.put(`${apiUrl}/events/${event.id}`, event);
    commit('updateEvent', response.data);
  },
  setEvent({ commit }, event) {
    commit('setEvent', event);
  },
  setEditMode({ commit }, bool) {
    commit('setEditMode', bool)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
