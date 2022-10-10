import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const state = {
  events: [],
};

// computedのmapGettersから呼び出される
const getters = {
  events: (state) => state.events,
};

const mutations = {
  // eventsステートの値をRails APIのレスポンスデータで上書き(更新)する
  setEvents: (state, events) => (state.events = events),
};

// methodsのmapActionsから呼び出される
const actions = {
  // asyncは非同期関数を定義する関数宣言のこと
  async fetchEvents({ commit }) {
    // 関数の前にawaitを指定すると、その関数の結果が返されるまで待機
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data); // mutationを呼び出す
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
