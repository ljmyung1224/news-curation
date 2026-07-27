export type Sentiment = "positive" | "negative" | "neutral";

export interface Stock {
  ticker: string;
  name: string;
  market: "KR" | "US";
  sector: string;
  price: number;
  changePct: number;
}

export interface Holding {
  ticker: string;
  weight: number; // 포트폴리오 비중 %
}

export interface NewsItem {
  id: string;
  ticker: string;
  source: string;
  publishedAt: string;
  title: string;
  summary: [string, string, string];
  keywords: string[];
  sentiment: Sentiment;
  impactScore: number; // 0-100
  impact: string;
  advice: { value: string; trader: string };
  scenario: { value: string; trader: string };
}

export const STOCK_UNIVERSE: Stock[] = [
  { ticker: "005930", name: "삼성전자", market: "KR", sector: "반도체", price: 72000, changePct: 1.8 },
  { ticker: "000660", name: "SK하이닉스", market: "KR", sector: "반도체", price: 183500, changePct: -0.7 },
  { ticker: "373220", name: "LG에너지솔루션", market: "KR", sector: "2차전지", price: 341000, changePct: -2.4 },
  { ticker: "005380", name: "현대차", market: "KR", sector: "자동차", price: 248500, changePct: 2.1 },
  { ticker: "035420", name: "NAVER", market: "KR", sector: "인터넷", price: 196400, changePct: 1.2 },
  { ticker: "207940", name: "삼성바이오로직스", market: "KR", sector: "바이오", price: 812000, changePct: 0.4 },
  { ticker: "NVDA", name: "NVIDIA", market: "US", sector: "반도체", price: 121.34, changePct: -1.6 },
  { ticker: "AAPL", name: "Apple", market: "US", sector: "IT 하드웨어", price: 227.18, changePct: 0.9 },
  { ticker: "TSLA", name: "Tesla", market: "US", sector: "전기차", price: 244.72, changePct: -0.3 },
  { ticker: "MSFT", name: "Microsoft", market: "US", sector: "소프트웨어", price: 418.55, changePct: 0.6 },
];

export function formatQuote(stock: Stock): string {
  return stock.market === "KR"
    ? `${stock.price.toLocaleString("ko-KR")}원`
    : `$${stock.price.toFixed(2)}`;
}

export const DEFAULT_HOLDINGS: Holding[] = [
  { ticker: "005930", weight: 38 },
  { ticker: "NVDA", weight: 27 },
  { ticker: "373220", weight: 20 },
  { ticker: "035420", weight: 15 },
];

export const NEWS: NewsItem[] = [
  {
    id: "n1",
    ticker: "005930",
    source: "한국경제",
    publishedAt: "08:12",
    title: "삼성전자, HBM4 초도 물량 글로벌 GPU 업체 퀄 테스트 통과",
    summary: [
      "삼성전자의 차세대 고대역폭 메모리 HBM4가 주요 GPU 고객사 품질 검증을 통과했다.",
      "이르면 3분기부터 양산 공급이 시작돼 메모리 부문 믹스 개선이 예상된다.",
      "증권가는 내년 영업이익 추정치를 평균 8% 상향 조정했다.",
    ],
    keywords: ["HBM4", "퀄 테스트", "실적 상향"],
    sentiment: "positive",
    impactScore: 86,
    impact: "고부가 메모리 비중 확대에 따른 매출·마진 동반 개선 기대. 단기 수급도 우호적.",
    advice: {
      value: "구조적 실적 개선 초입 구간으로 판단됩니다. 비중이 높은 핵심 종목인 만큼 추가 매수보다 보유 유지가 무난합니다.",
      trader: "발표 직후 갭 상승 가능성이 큽니다. 시초가 추격보다 눌림목 분할 대응이 유리합니다.",
    },
    scenario: {
      value: "오늘은 매매 없이 보유 유지, 3분기 HBM 공급 계약 공시만 체크하세요.",
      trader: "시초가 급등 시 관망 → 장중 -1.5% 눌림목에서 30% 분할 매수, 손절 -3%.",
    },
  },
  {
    id: "n2",
    ticker: "NVDA",
    source: "Reuters",
    publishedAt: "07:40",
    title: "미 상무부, 고성능 AI 칩 수출 규제 추가 검토 착수",
    summary: [
      "미국 정부가 특정 지역향 AI 가속기 수출 기준을 다시 강화하는 방안을 논의 중이다.",
      "해당 지역 매출 비중은 전체의 두 자릿수 초반으로 추정된다.",
      "회사 측은 대체 제품 라인업으로 영향을 최소화하겠다고 밝혔다.",
    ],
    keywords: ["수출 규제", "AI 가속기", "매출 비중"],
    sentiment: "negative",
    impactScore: 72,
    impact: "일부 지역 매출 공백 우려로 밸류에이션 할인 요인. 다만 전사 수요 초과 상태는 유지.",
    advice: {
      value: "장기 AI 수요 훼손 이슈는 아니므로 급락 시 분할 매수 관점이 유효합니다.",
      trader: "규제 헤드라인은 변동성이 큽니다. 보유 비중 27%로 높아 일부 차익 실현 후 재진입을 검토하세요.",
    },
    scenario: {
      value: "급락 시 보유 비중 30%까지 분할 매수, 오늘은 1차 매수만 집행하세요.",
      trader: "장 초반 반등 시 보유분 1/3 차익 실현 후 규제 세부안 발표까지 현금 대기.",
    },
  },
  {
    id: "n3",
    ticker: "373220",
    source: "매일경제",
    publishedAt: "09:05",
    title: "북미 완성차 합작 3공장 가동 일정 6개월 연기",
    summary: [
      "합작 파트너의 전기차 판매 부진으로 3공장 가동 시점이 내년 하반기로 밀렸다.",
      "연간 캐파 목표는 유지하되 투자 집행 속도를 조절한다는 방침이다.",
      "다만 AMPC 세액공제 인식 시점도 함께 지연될 전망이다.",
    ],
    keywords: ["가동 연기", "AMPC", "캐파"],
    sentiment: "negative",
    impactScore: 64,
    impact: "단기 출하량·세액공제 인식 지연으로 실적 추정치 하향 압력.",
    advice: {
      value: "전기차 수요 회복 확인 전까지는 비중 확대를 유보하는 편이 좋습니다.",
      trader: "수급 이탈 구간입니다. 손절 라인을 명확히 두고 대응하세요.",
    },
    scenario: {
      value: "추가 매수 보류, 4분기 AMPC 인식 가이던스 확인 후 재평가하세요.",
      trader: "전일 저가 이탈 시 전량 손절, 반등해도 5일선 회복 전까지 재진입 금지.",
    },
  },
  {
    id: "n4",
    ticker: "035420",
    source: "전자신문",
    publishedAt: "10:20",
    title: "커머스 광고 단가 반등…3분기 영업이익 컨센서스 상회 전망",
    summary: [
      "검색·디스플레이 광고 단가가 두 분기 만에 반등한 것으로 파악됐다.",
      "커머스 거래액도 전년 대비 두 자릿수 성장을 이어가고 있다.",
      "증권가는 3분기 영업이익이 시장 기대치를 소폭 상회할 것으로 봤다.",
    ],
    keywords: ["광고 단가", "커머스", "컨센서스"],
    sentiment: "positive",
    impactScore: 58,
    impact: "본업 회복 신호로 밸류에이션 정상화 기대. 이익 레버리지 구간 진입.",
    advice: {
      value: "저평가 국면에서의 실적 턴어라운드 신호로, 비중 확대를 고려할 만합니다.",
      trader: "실적 발표 전까지 기대감 랠리가 나올 수 있습니다. 이벤트 전 청산 전략을 권합니다.",
    },
    scenario: {
      value: "비중 15% → 20%까지 오늘 종가 부근에서 절반 분할 매수하세요.",
      trader: "장중 강세 지속 시 보유, 실적 발표 전일 종가에 전량 청산 계획을 세우세요.",
    },
  },
  {
    id: "n5",
    ticker: "000660",
    source: "Bloomberg",
    publishedAt: "06:55",
    title: "D램 고정거래가격 3개월 연속 상승, 상승폭은 둔화",
    summary: [
      "10월 D램 고정거래가격이 전월 대비 상승하며 3개월 연속 오름세를 이어갔다.",
      "다만 상승폭은 직전월 대비 절반 수준으로 둔화됐다.",
      "업계는 4분기 계절적 재고 조정 가능성을 언급했다.",
    ],
    keywords: ["D램 가격", "재고 조정", "사이클"],
    sentiment: "neutral",
    impactScore: 41,
    impact: "가격 상승 추세는 유효하나 모멘텀 둔화로 방향성은 중립.",
    advice: {
      value: "사이클 중후반 신호를 점검할 시점입니다. 신규 진입은 서두르지 마세요.",
      trader: "박스권 대응이 적절합니다. 이벤트 드리븐 매매로 접근하세요.",
    },
    scenario: {
      value: "신규 진입 보류, 11월 고정가 발표까지 관망하세요.",
      trader: "박스 하단 근처 단기 매수 · 상단 도달 시 즉시 청산, 목표 수익 3%.",
    },
  },
  {
    id: "n6",
    ticker: "005380",
    source: "연합뉴스",
    publishedAt: "11:02",
    title: "하이브리드 라인업 판매 호조…북미 점유율 사상 최고",
    summary: [
      "하이브리드 모델 수요 급증으로 북미 시장 점유율이 사상 최고치를 기록했다.",
      "믹스 개선으로 대당 판매 단가도 상승했다.",
      "환율 효과까지 더해져 분기 실적 개선이 예상된다.",
    ],
    keywords: ["하이브리드", "북미 점유율", "환율"],
    sentiment: "positive",
    impactScore: 61,
    impact: "판매 믹스·환율 동시 개선으로 수익성 상향 요인.",
    advice: {
      value: "배당 매력과 실적이 함께 개선되는 구간으로 장기 보유에 적합합니다.",
      trader: "관심종목이지만 미보유 상태입니다. 돌파 확인 후 진입을 고려하세요.",
    },
    scenario: {
      value: "배당 기준일 전 소량 신규 편입(5%)을 검토하세요.",
      trader: "직전 고점 돌파·거래량 동반 확인 시에만 진입, 미돌파면 오늘은 패스.",
    },
  },
  {
    id: "n7",
    ticker: "TSLA",
    source: "CNBC",
    publishedAt: "05:30",
    title: "차세대 저가 모델 생산 일정 공개…시장 기대치 부합",
    summary: [
      "저가형 신모델의 파일럿 생산이 예정대로 진행 중이라고 밝혔다.",
      "가격대는 기존 주력 모델 대비 20% 낮게 책정될 전망이다.",
      "마진 희석 우려와 물량 확대 기대가 엇갈리고 있다.",
    ],
    keywords: ["신모델", "가격 인하", "마진"],
    sentiment: "neutral",
    impactScore: 47,
    impact: "물량 성장과 마진 희석이 상쇄되어 단기 방향성은 제한적.",
    advice: {
      value: "마진 지표 확인 전까지 관망이 합리적입니다.",
      trader: "이벤트 소멸 후 변동성 축소 가능성. 단기 트레이딩 매력은 낮습니다.",
    },
    scenario: {
      value: "관망 유지, 다음 분기 마진 지표 발표까지 액션 없음.",
      trader: "오늘은 진입하지 말고 변동성 확대 신호(거래량 급증) 나올 때만 대응하세요.",
    },
  },
  {
    id: "n8",
    ticker: "AAPL",
    source: "WSJ",
    publishedAt: "04:15",
    title: "서비스 매출 사상 최대…하드웨어 부진 상쇄",
    summary: [
      "앱스토어·구독 서비스 매출이 분기 사상 최대치를 기록했다.",
      "반면 스마트폰 출하량은 전년 대비 소폭 감소했다.",
      "고마진 서비스 비중 확대로 전사 마진은 개선됐다.",
    ],
    keywords: ["서비스 매출", "구독", "마진 개선"],
    sentiment: "positive",
    impactScore: 55,
    impact: "이익 구조의 질적 개선. 하드웨어 사이클 의존도 완화.",
    advice: {
      value: "안정적 현금흐름 기반 코어 자산으로 유지 전략이 적합합니다.",
      trader: "변동성이 낮아 단기 트레이딩 대상으로는 매력이 크지 않습니다.",
    },
    scenario: {
      value: "코어 자산으로 보유 유지, 조정 시 분할 매수 대기 주문만 걸어두세요.",
      trader: "단기 모멘텀 부재로 오늘은 매매 대상에서 제외하세요.",
    },
  },
];

export const SENTIMENT_LABEL: Record<Sentiment, string> = {
  positive: "호재",
  negative: "악재",
  neutral: "중립",
};