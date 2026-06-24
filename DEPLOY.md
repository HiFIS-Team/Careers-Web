# 배포 (홈서버 / docker compose)

프론트(Next) + API + PostgreSQL을 docker compose로 함께 띄웁니다.
nginx가 앞단에서 앱(`127.0.0.1:3000`)으로 프록시한다고 가정합니다. (DB는 외부 비노출)

## 1. 서버에 `.env` 작성 (compose와 같은 폴더)
```env
# DB (분리 변수 → compose가 DATABASE_URL 조립)
FIS_DB_USER=fis
FIS_DB_PASSWORD=강한_비밀번호
FIS_DB_NAME=fis_db

# Auth.js (관리자 구글 로그인)
AUTH_SECRET=openssl_rand_base64_32로_생성한값
AUTH_GOOGLE_ID=구글_클라이언트_ID
AUTH_GOOGLE_SECRET=구글_시크릿
ADMIN_EMAILS=admin1@gmail.com,admin2@gmail.com
AUTH_URL=https://fitnessstar.co.kr
```

## 2. 실행
```bash
docker compose up -d --build
```
- 컨테이너 시작 시 `prisma migrate deploy`가 자동 실행되어 테이블 생성/갱신됩니다.

## 3. (선택) 초기 공고 시드 — 최초 1회만
```bash
docker compose exec app npx prisma db seed
```
> 재시작 때마다 돌리지 마세요(샘플 데이터로 덮어씀). 보통 관리자 화면에서 직접 공고를 올립니다.

## 4. 인물 사진 (깃 제외분)
`public/images/private/`는 git에 없으므로 서버 볼륨(`fis_private_images`)에 직접 넣습니다.
```bash
docker compose cp public/images/private/mission.jpg app:/app/public/images/private/
# 또는 docker cp <컨테이너>:/app/public/images/private 경로로 복사
```

## 5. 구글 OAuth 리디렉션 URI 추가
Google Cloud Console → 사용자 인증 정보 → 해당 클라이언트 →
`https://fitnessstar.co.kr/api/auth/callback/google` 추가.

## 데이터/파일 영속
- DB: `fis_db_data` 볼륨, 업로드: `fis_uploads` 볼륨, 인물사진: `fis_private_images` 볼륨
- 컨테이너 재시작/재배포해도 유지됩니다.

## nginx (참고)
- 공개 도메인 → `127.0.0.1:3000` 프록시
- `X-Forwarded-Host`, `X-Forwarded-Proto` 전달 (Auth.js가 콜백 URL 판단에 사용, `AUTH_TRUST_HOST=true` 설정됨)
