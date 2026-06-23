# Next.js 풀스택(앱 + API) + Prisma 실행 이미지
FROM node:22-bookworm-slim

WORKDIR /app

# Prisma 엔진에 필요한 openssl
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

# 의존성 설치 (postinstall=prisma generate 위해 schema 먼저 복사)
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# 소스 복사 후 빌드 (페이지는 force-dynamic이라 빌드 시 DB 불필요)
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# 컨테이너 시작 시 마이그레이션 적용 후 서버 실행
CMD ["sh", "-c", "npx prisma migrate deploy && node_modules/.bin/next start -H 0.0.0.0 -p 3000"]
