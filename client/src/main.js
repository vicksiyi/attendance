// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import http from 'axios';
import store from './store/index';
import router from './router'

Vue.config.productionTip = false
import {
  Button, Form, FormItem, Row, Col, Input,
  Container, Header, Footer, Main, Table,
  TableColumn, Tag, Pagination, Drawer, Card,
  Upload, DatePicker, TimePicker, Loading,
  Message
} from 'element-ui';
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Col)
Vue.use(Drawer)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Input)
Vue.use(Loading.directive);

Vue.prototype.$http = http;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
