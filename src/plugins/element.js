import Vue from 'vue'
import { Button, TableColumn, Input, Drawer, Form, FormItem, MessageBox, Card, Message, Backtop, Header, Icon, Loading, Table, Popover, Row, Col, Dialog, Pagination, Switch } from 'element-ui'

Vue.use(Dialog)
Vue.use(Drawer)
Vue.use(Button)
Vue.use(Backtop)
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
//弹框组件挂载到vue原型对象上
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm