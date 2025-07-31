import { PhotoDetail, RouteParams } from '../types'

const mockData: PhotoDetail[] = [
  { id: 1, title: '아름다운 석양', description: '산 너머로 지는 석양의 모습', image: 'https://picsum.photos/300/200?random=1', longDescription: '이 사진은 한적한 시골 마을에서 촬영된 것으로, 하루의 마지막을 알리는 따뜻한 석양이 산등성이 너머로 사라져가는 순간을 담았습니다. 황금빛과 주황빛이 하늘을 물들이며 자연의 경이로운 아름다움을 선사합니다.' },
  { id: 2, title: '도시의 밤', description: '화려한 네온사인으로 가득한 도시', image: 'https://picsum.photos/300/200?random=2', longDescription: '현대 도시의 화려함을 보여주는 야경 사진입니다. 수많은 네온사인과 건물의 불빛들이 도시의 활기찬 에너지를 표현하며, 밤이 되어도 잠들지 않는 도시의 모습을 생생하게 담아냈습니다.' },
  { id: 3, title: '바다와 파도', description: '끝없이 펼쳐진 푸른 바다', image: 'https://picsum.photos/300/200?random=3', longDescription: '광활한 바다의 웅장함과 끊임없이 밀려오는 파도의 역동적인 움직임을 포착한 작품입니다. 푸른 바다의 깊이감과 하얀 포말의 대비가 자연의 힘찬 생명력을 느끼게 해줍니다.' },
  { id: 4, title: '숲속 산책', description: '신선한 공기가 가득한 숲길', image: 'https://picsum.photos/300/200?random=4', longDescription: '울창한 숲 속의 오솔길을 따라 걸으며 만날 수 있는 평화로운 풍경입니다. 나무들 사이로 스며드는 햇살과 이끼 낀 바위들이 자연의 고요함과 신비로움을 전해줍니다.' },
  { id: 5, title: '별이 빛나는 밤', description: '수많은 별들이 반짝이는 밤하늘', image: 'https://picsum.photos/300/200?random=5', longDescription: '도시의 불빛이 닿지 않는 곳에서 바라본 밤하늘의 장관입니다. 은하수와 수많은 별들이 만들어내는 우주의 신비로움이 인간의 작은 존재를 되돌아보게 만드는 감동적인 순간입니다.' },
  { id: 6, title: '꽃밭의 봄', description: '화사한 꽃들이 만발한 정원', image: 'https://picsum.photos/300/200?random=6', longDescription: '봄의 전령인 다양한 꽃들이 한데 어우러진 아름다운 정원의 모습입니다. 색색의 꽃들이 만들어내는 화려한 팔레트와 생명력 넘치는 자연의 활기가 보는 이의 마음을 설레게 합니다.' }
]

export function DetailPage(params: RouteParams): string {
  const id = parseInt(params.id)
  const item = mockData.find(data => data.id === id)
  
  if (!item) {
    return `
      <div class="detail-container">
        <div class="detail-header">
          <button class="back-button" onclick="navigateTo('/')">← 목록으로</button>
        </div>
        <div class="detail-content">
          <div class="detail-info">
            <h2>항목을 찾을 수 없습니다</h2>
          </div>
        </div>
      </div>
    `
  }
  
  return `
    <div class="detail-container">
      <div class="detail-header">
        <button class="back-button" onclick="navigateTo('/')">← 목록으로</button>
        <h1>상세 정보</h1>
      </div>
      
      <div class="detail-content card-${item.id}">
        <div class="detail-image">
          <img src="${item.image}" alt="${item.title}" class="image-${item.id}">
        </div>
        <div class="detail-info">
          <h2 class="detail-title title-${item.id}">${item.title}</h2>
          <p class="detail-description">${item.longDescription}</p>
          <div class="detail-meta">
            <p>촬영 장소: 알 수 없음</p>
            <p>촬영 일시: 2024년</p>
          </div>
        </div>
      </div>
    </div>
  `
} 