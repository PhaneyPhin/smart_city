/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


const actions = {

  // ////////////////////////////////////////////
  // SIDEBAR & UI UX
  // ////////////////////////////////////////////

  updateSidebarWidth({ commit }, width) {
    commit('UPDATE_SIDEBAR_WIDTH', width);
  },
  updateI18nLocale({ commit }, locale) {
    commit('UPDATE_I18N_LOCALE', locale);
  },
  toggleContentOverlay({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY');
  },
  updateTheme({ commit }, val) {
    commit('UPDATE_THEME', val);
  },
  updateUserRole({ commit }, val) {
    commit('UPDATE_USER_ROLE', val);
  },
  updateWindowWidth({ commit }, width) {
    commit('UPDATE_WINDOW_WIDTH', width);
  },
  push_list_charts({ commit }, val) {
    commit('PUSH_LIST_CHART', val);
  },
  remove_list_charts({ commit }, index) {
    commit('REMOVE_LIST_CHART', index);
  },
  update_list_chart({commit}, val){
    commit('UPDATE_LIST_CHART',val);
  },
  remove_list_event({commit},val){
    commit('REMOVE_LIST_EVENT',val);
  },
  push_list_event({commit},val){
    commit('PUSH_LIST_EVENT',val);
  },

  // ////////////////////////////////////////////
  // COMPONENT
  // ////////////////////////////////////////////

  // VxAutoSuggest
  updateStarredPage({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },
  update_reduce({commit},payload){
    commit('UPDATE_REDUCE', payload);
  },
  //  The Navbar
  arrangeStarredPagesLimited({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },
}

export default actions
