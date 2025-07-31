type RouteParams = Record<string, string>
type RouteComponent = (params: RouteParams) => string
type RouteMatch = { route: string; params: RouteParams } | null

declare global {
  interface Window {
    navigateTo: (path: string) => void;
  }
}

export class Router {
  private routes: Map<string, RouteComponent>
  private currentRoute: string | null

  constructor() {
    this.routes = new Map()
    this.currentRoute = null
    
    window.addEventListener('popstate', () => {
      this.handleRoute()
    })
    
    // 전역 함수로 navigateTo 등록
    window.navigateTo = (path: string) => {
      this.navigateTo(path)
    }
  }
  
  addRoute(path: string, component: RouteComponent): void {
    this.routes.set(path, component)
  }
  
  navigateTo(path: string): void {
    if (this.currentRoute === path) return
    
    console.log('🚀 Navigating from', this.currentRoute, 'to', path)
    
    // View Transition API 지원 확인
    if (document.startViewTransition) {
      console.log('✅ View Transition API supported')
      
      // 현재 페이지의 view-transition-name 요소들 확인
      this.debugCurrentViewTransitionElements()
      
      const transition = document.startViewTransition(() => {
        console.log('🎬 View transition started')
        this.updateRoute(path)
        
        // 새 페이지의 view-transition-name 요소들 확인
        setTimeout(() => this.debugCurrentViewTransitionElements(), 50)
      })
      
      transition.ready.then(() => {
        console.log('🎯 View transition ready')
      })
      
      transition.finished.then(() => {
        console.log('✅ View transition finished')
      }).catch(err => {
        console.error('❌ View transition failed:', err)
      })
      
    } else {
      console.log('❌ View Transition API not supported')
      this.updateRoute(path)
    }
  }

  private debugCurrentViewTransitionElements(): void {
    const elements = document.querySelectorAll('[class*="card-"], [class*="image-"], [class*="title-"]')
    console.log('🔍 Elements with view-transition-name:', elements.length)
    
    elements.forEach(el => {
      const computedStyle = getComputedStyle(el)
      const viewTransitionName = computedStyle.viewTransitionName
      if (viewTransitionName && viewTransitionName !== 'none') {
        console.log(`  📌 ${el.tagName}.${el.className} -> view-transition-name: ${viewTransitionName}`)
      } else {
        console.log(`  ⚠️  ${el.tagName}.${el.className} -> no view-transition-name set`)
      }
    })
  }
  
  private updateRoute(path: string): void {
    history.pushState(null, '', path)
    this.currentRoute = path
    this.render()
  }
  
  private handleRoute(): void {
    const path = window.location.pathname
    this.currentRoute = path
    this.render()
  }
  
  private matchRoute(path: string): RouteMatch {
    // 정확한 매치 먼저 확인
    if (this.routes.has(path)) {
      return { route: path, params: {} }
    }
    
    // 파라미터가 있는 라우트 매치
    for (const [route] of this.routes) {
      const routeParts = route.split('/')
      const pathParts = path.split('/')
      
      if (routeParts.length !== pathParts.length) continue
      
      const params: RouteParams = {}
      let isMatch = true
      
      for (let i = 0; i < routeParts.length; i++) {
        const routePart = routeParts[i]
        const pathPart = pathParts[i]
        
        if (routePart.startsWith(':')) {
          // 파라미터 추출
          const paramName = routePart.slice(1)
          params[paramName] = pathPart
        } else if (routePart !== pathPart) {
          isMatch = false
          break
        }
      }
      
      if (isMatch) {
        return { route, params }
      }
    }
    
    return null
  }
  
  private render(): void {
    const contentElement = document.getElementById('content')
    const loadingElement = document.getElementById('loading')
    
    if (!contentElement || !loadingElement) {
      console.error('Required DOM elements not found')
      return
    }

    // View Transition 중에는 로딩 표시하지 않음
    const isViewTransition = document.documentElement.style.viewTransitionName !== undefined
    if (!isViewTransition) {
      loadingElement.style.display = 'block'
    }
    
    const match = this.matchRoute(this.currentRoute ?? '/')
    
    if (match) {
      const component = this.routes.get(match.route)
      if (component) {
        const html = component(match.params)
        
        // View Transition을 위해 즉시 DOM 업데이트
        contentElement.innerHTML = html
        loadingElement.style.display = 'none'
      }
    } else {
      contentElement.innerHTML = `
        <div class="container">
          <h1>404 - 페이지를 찾을 수 없습니다</h1>
          <button onclick="navigateTo('/')">홈으로 돌아가기</button>
        </div>
      `
      loadingElement.style.display = 'none'
    }
  }
  
  init(): void {
    this.handleRoute()
  }
} 