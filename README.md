# Smart News Digest

아래 PRD에 따른 투자자를 위한 맞춤형 경제뉴스 요약 및 피드백 서비스 앱을 만들어줘.

[PRD] 투자자 맞춤형 경제뉴스 요약 & AI 피드백 서비스 (가칭: FinFeed AI)

1. 프로젝트 개요 (Overview)

서비스명: FinFeed AI (가칭)

목적: 투자자가 수많은 경제 뉴스 속에서 자신의 관심/보유 종목 관련 뉴스를 일일이 탐색하는 번거로움을 해소하고, 큐레이션·요약·개인화된 투자 영향도 피드백까지 한눈에 제공하여 빠른 의사결정을 돕는다.

핵심 가치:

정보 가치: 관심/보유 종목 관련 뉴스만 정밀 큐레이션 및 3줄 요약 제공

편의 가치: 뉴스가 보유 종목/포트폴리오에 미치는 영향(호재/악재 및 전략)에 대한 AI 피드백 제공

2. 타깃 고객 및 문제 정의 (Target Audience & Problem)

타깃 고객:

주식/자산 투자를 하고 있으나, 일일이 뉴스를 찾아볼 시간이 부족한 직장인 및 개인 투자자

뉴스를 읽어도 해당 소식이 내 보유 종목에 호재인지 악재인지 판단하기 어려운 초보 투자자

핵심 문제 (Pain Points):

정보 과부하 & 탐색 피로: 내 종목과 관련 없는 뉴스까지 노출되어 탐색 시간이 오래 걸림

요약의 한계: 단순 뉴스 요약만으로는 "그래서 내 종목을 사야 해, 말아야 해?"에 대한 직관적 이해가 어려움

3. 핵심 기능 명세 (Key Features)

3.1. 사용자 관심/보유 종목 설정 (User Profile & Portfolio)

관심 종목 등록: 국내/해외 주식 검색 및 관심 종목/보유 종목 리스트 구성

투자 성향/포트폴리오 설정: 가치투자/단기매매 등 투자 성향 및 비중 등록 (AI 피드백 커스텀용)

3.2. 맞춤형 뉴스 큐레이션 및 AI 요약 (Curated News & AI Summary)

관심 종목 뉴스 피드: 등록한 종목과 직접 연관된 뉴스만 실시간/주기적 수집 및 노출

3줄 핵심 요약: 생성 AI를 활용하여 긴 기사를 핵심 포인트 3줄로 간결하게 정리

키워드 & 감성 태깅: 뉴스별 핵심 키워드 및 호재/악재/중립 태그 자동 부여

3.3. 개인화된 AI 투자 피드백 (Personalized AI Investment Feedback)

종목 영향도 분석: 해당 뉴스가 해당 종목에 미칠 긍정적/부정적 영향 분석 (예: "매출 증대 기대", "원자재 가격 상승 부담")

개인화 맞춤 제언: 사용자 포트폴리오 비중에 맞춘 AI 조언 제공 (예: "보유 비중이 높은 종목이므로 단기 변동성에 유의하세요")

3.4. 알림 서비스 (Smart Notification)

주요 뉴스 푸시 알림: 관심 종목에 큰 영향을 미칠만한 주요 뉴스 발생 시 즉시 알림 제공

일간/주간 브리핑: 매일 장 전/후 또는 주말에 관심 종목 관련 뉴스 요약 리포트 제공

4. 필요 기술 스택 및 데이터 흐름 (Technical Architecture)

구분필요 기술 및 요소역할 및 설명데이터베이스 (DB)PostgreSQL / Supabase, Redis

- 사용자 프로필, 관심 종목, 포트폴리오 정보 저장




- 수집된 뉴스 데이터, 요약본, AI 피드백 결과 캐싱 및 저장

뉴스 수집 및 크롤링Python (Scrapy, BeautifulSoup), News API

- 주요 언론사 및 금융 뉴스 API 연동 및 웹 크롤링




- 종목 코드/종목명 기반 뉴스 필터링 및 데이터 파이프라인 구축

추천 & 큐레이션 알고리즘임베딩 모델 (Vector Search), TF-IDF, Cosine Similarity

- 뉴스 제목/본문과 사용자 관심 종목 간의 연관도 스코어링




- 중복/유사 뉴스 제거 및 맞춤형 랭킹 피드 생성

생성 AI (LLM)OpenAI GPT-4o, Claude 3.5 Sonnet 등

- 긴 뉴스 기사의 핵심 3줄 요약 생성




- 뉴스의 호재/악재 판단 및 개인화된 투자 피드백 메시지 생성

프론트엔드/백엔드React / Next.js / Flutter, Node.js / FastAPI- 웹/앱 사용자 인터페이스 구현 및 AI 백엔드 파이프라인 연동

5. 단계별 개발 로드맵 (MVP ~ 확산)

Phase 1: MVP (최소 기능 제품) 개발

관심 종목 등록 기능 구현

특정 종목 관련 뉴스 크롤링 및 백엔드 저장

LLM 연동을 통한 뉴스 3줄 요약 및 호재/악재 분류

기본 웹/앱 피드 화면 제공

Phase 2: 기능 고도화 & 개인화 강화

뉴스 크롤링 범위 확대 (해외 뉴스 번역 및 요약 포함)

개인 포트폴리오(매수가, 비중) 입력 기반 맞춤 피드백 구현

중요 뉴스 즉시 푸시 알림 기능 추가

Phase 3: 추천 알고리즘 및 커뮤니티/비즈니스 모델 도입

연관 종목/산업군 뉴스 추천 알고리즘 적용

요약 뉴스 공유 기능 및 프리미엄 구독 모델(BM) 검토

6. 성공 지표 (Key Performance Indicators)

DAU / MAU: 일간/월간 활성 사용자 수

사용자 체류 시간: 피드 및 뉴스 상세 화면 체류 시간

뉴스 소비량: 사용자 1인당 일평균 읽은 뉴스/요약 개수

알림 클릭률 (CTR): 뉴스 알림 대비 앱 진입 비율

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1389564f-0737-498d-b0a5-fc59d50ef106).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
