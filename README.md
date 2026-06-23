# FIS-Client — 피트니스스타 채용 플랫폼

[ FIS | Client ] 피트니스스타(FITNESSSTAR) 브랜드 및 채용 소개 플랫폼.
채용 랜딩 + 공고/지원, 관리자(공고·지원자 관리)까지 갖춘 **Next.js 풀스택** 앱입니다.

## 주요 기능
- **채용 랜딩**: 브랜드 소개, 직군 안내, 스크롤 애니메이션
- **공고**: 목록(직군/고용형태/경력 필터) → 상세(지도 포함) → 지원 폼
- **지원 접수**: 파일 업로드(이력서/포트폴리오) + DB 저장
- **관리자**(`/admin`, 구글 로그인): 공고 CRUD, 지원자 목록/상세·합불 처리·서류 다운로드
- **문의**: 카카오톡 채널 연결(또는 이메일)

## 기술 스택
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Prisma 6 + PostgreSQL
- Auth.js(next-auth v5) — 구글 OAuth + 이메일 허용목록
- 배포: Docker / docker compose (홈서버)

## 로컬 개발
```bash
# 1) 의존성
npm install

# 2) 로컬 PostgreSQL (docker, 호스트 포트 5433)
docker run -d --name fis-postgres \
  -e POSTGRES_USER=fis -e POSTGRES_PASSWORD=fis -e POSTGRES_DB=fis \
  -p 5433:5432 postgres:16

# 3) 환경변수: .env.example 복사 후 값 채우기
cp .env.example .env

# 4) DB 마이그레이션 + (선택) 시드
npx prisma migrate dev
npx prisma db seed

# 5) 개발 서버
npm run dev   # http://localhost:3000
```

### 환경변수 (`.env`)
| 변수 | 설명 |
|---|---|
| `DATABASE_URL` | PostgreSQL 연결 문자열 |
| `UPLOAD_DIR` | 지원서 첨부파일 저장 경로 |
| `AUTH_SECRET` | Auth.js 시크릿 (`openssl rand -base64 32`) |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | 구글 OAuth 클라이언트 |
| `ADMIN_EMAILS` | 관리자 허용 구글 이메일(쉼표) |

> 관리자 로그인은 구글 OAuth 설정이 필요합니다. 콘솔에서 리디렉션 URI에 `http://localhost:3000/api/auth/callback/google` 추가.

## 콘텐츠 관리
- 랜딩 문구/이미지: `src/data/site.ts`
- 채용 공고: **관리자 화면(`/admin`)에서 등록** (DB 저장). 초기 샘플은 `src/data/openings.ts` → `prisma db seed`
- 인물 사진: `public/images/private/` (git 제외, 로컬/서버 볼륨에만 보관)

## 구조
```
src/
├── app/                 # 페이지 + API 라우트(/api/applications, /api/auth)
│   ├── admin/           # 관리자(공고/지원자) — 인증 보호
│   └── openings/[id]/   # 공고 상세 / 지원
├── components/          # sections, ui, admin, layout
├── data/                # site.ts(콘텐츠), openings.ts(시드)
└── lib/                 # prisma, openings, applications, auth
prisma/                  # schema + migrations + seed
```

## 배포
홈서버 docker compose 배포는 [DEPLOY.md](DEPLOY.md) 참고.

## 스크립트
| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 |
| `npx prisma studio` | DB GUI |
