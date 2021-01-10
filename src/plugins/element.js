import Vue from 'vue'
import { Button, Avatar, Select, TableColumn, Input, Drawer, Form, FormItem, MessageBox, Card, Message, Header, Icon, Loading, Table, Popover, Row, Col, Dialog, Pagination, Switch, Main, Backtop } from 'element-ui'

Vue.use(Dialog)
Vue.use(Backtop)
Vue.use(Drawer)
Vue.use(Button)
Vue.use(Loading)
Vue.use(Header)
Vue.use(Icon)
Vue.use(Popover)
Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(Loading)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Avatar)
Vue.use(Select)
Vue.use(Main)
//弹框组件挂载到vue原型对象上
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm