import { PhotoItem } from '../types'

const mockData: PhotoItem[] = [
  { id: 1, title: '아름다운 석양', description: '산 너머로 지는 석양의 모습', image: 'https://picsum.photos/300/200?random=1' },
  { id: 2, title: '도시의 밤', description: '화려한 네온사인으로 가득한 도시', image: 'https://picsum.photos/300/200?random=2' },
  { id: 3, title: '바다와 파도', description: '끝없이 펼쳐진 푸른 바다', image: 'https://picsum.photos/300/200?random=3' },
  { id: 4, title: '숲속 산책', description: '신선한 공기가 가득한 숲길', image: 'https://picsum.photos/300/200?random=4' },
  { id: 5, title: '별이 빛나는 밤', description: '수많은 별들이 반짝이는 밤하늘', image: 'https://picsum.photos/300/200?random=5' },
  { id: 6, title: '꽃밭의 봄', description: '화사한 꽃들이 만발한 정원', image: 'https://picsum.photos/300/200?random=6' }
]

export function ListPage(): string {
  return `
    <div class="container">
      <header class="header">
        <h1>사진 갤러리</h1>
        <p>아름다운 순간들을 담은 사진들</p>
      </header>
      
      <div class="card-grid">
        ${mockData.map(item => `
          <div class="card card-${item.id}" data-id="${item.id}">
            <div class="card-image">
              <img src="${item.image}" alt="${item.title}" class="image-${item.id}">
            </div>
            <div class="card-content">
              <h3 class="card-title title-${item.id}">${item.title}</h3>
              <p class="card-description">${item.description}</p>
              <button class="card-button" onclick="navigateTo('/detail/${item.id}')">자세히 보기</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
} 