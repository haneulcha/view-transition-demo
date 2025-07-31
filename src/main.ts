import './style.css'
import './styles/view-transitions.css'
import { Router } from './router'
import { ListPage } from './pages/list'
import { DetailPage } from './pages/detail'

const router = new Router()

router.addRoute('/', ListPage)
router.addRoute('/detail/:id', DetailPage)

router.init() 