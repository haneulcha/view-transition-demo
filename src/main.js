import './style.css'
import './styles/view-transitions.css'
import { Router } from './router.js'
import { ListPage } from './pages/list.js'
import { DetailPage } from './pages/detail.js'

const router = new Router()

router.addRoute('/', ListPage)
router.addRoute('/detail/:id', DetailPage)

router.init()