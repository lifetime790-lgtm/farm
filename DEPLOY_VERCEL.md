# Vercel + Supabase 배포 방법

## 1) Supabase 준비 (공유 저장)

1. [https://supabase.com](https://supabase.com)에서 새 프로젝트를 생성합니다.
2. Supabase 프로젝트의 `SQL Editor`에서 아래 파일 내용을 실행합니다.
   - `migrations/20260304_create_farm_journal_entries.sql`
   - `migrations/20260304_add_facility_meta_to_farm_journal_entries.sql`
3. `Project Settings > API`에서 아래 2개 값을 복사합니다.
   - `Project URL`
   - `anon public key`
4. 루트의 `app-config.js`를 열어서 값을 입력합니다.

```js
window.APP_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_ANON_PUBLIC_KEY",
  siteId: "default-farm",
  facilityOptions: {
    sites: ["G-Cube V4-2", "G-Cube V4-1"],
    zones: ["A", "B"],
    levels: ["1F", "2F", "3F", "4F"],
    cropTypes: ["시금치", "상추류", "마이크로그린", "기타"],
    stages: ["준비", "파종", "발아/암발아", "육묘", "정식", "재배", "수확", "세척/소독", "점검/보수"]
  }
};
```

- `siteId`가 같은 사용자끼리 데이터가 공유됩니다.
- 예: `siteId: "farm-team-a"`

## 2) GitHub 업로드

```powershell
cd C:\Users\wocjf\Desktop\eats-my-life
git init
git add .
git commit -m "Initial deploy with shared storage"
git branch -M main
git remote add origin https://github.com/<아이디>/<저장소>.git
git push -u origin main
```

## 3) Vercel 배포

1. [https://vercel.com](https://vercel.com) 로그인
2. `Add New Project`
3. GitHub 저장소 Import
4. Framework Preset: `Other`
5. Root Directory: `/`
6. Build/Output/Install Command: 비워둠
7. `Deploy`

## 4) 배포 후 확인

- 기본 주소: `https://프로젝트명.vercel.app`
- PC A에서 기록 저장
- PC B에서 같은 주소 접속 후 새로고침 -> 동일 기록 보이면 공유 설정 완료
- 기간별 PDF 내보내기: 우측 패널 `기간별 PDF 내보내기`

## CLI 배포(선택)

```powershell
cd C:\Users\wocjf\Desktop\eats-my-life
npm i -g vercel
vercel
vercel --prod
```

## 참고

- `app-config.js`의 Supabase 값이 비어 있으면 자동으로 로컬 모드(localStorage)로 동작합니다.
- 공유 모드에서는 모든 사용자가 같은 DB를 보므로, 운영 시 인증/권한 분리는 별도 추가가 필요합니다.
