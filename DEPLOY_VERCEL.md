# Vercel 배포 방법

1. 이 폴더(`C:\Users\wocjf\Desktop\eats-my-life`)를 GitHub 저장소에 push 합니다.
2. [https://vercel.com](https://vercel.com) 로그인 후 `Add New Project`를 선택합니다.
3. 방금 push한 저장소를 Import 합니다.
4. Framework Preset은 `Other`(정적 사이트)로 둡니다.
5. Root Directory는 저장소 루트(`/`)로 설정합니다.
6. `Deploy`를 누르면 배포가 완료되고 공개 URL이 생성됩니다.

## 배포 후

- 기본 주소: `https://프로젝트명.vercel.app`
- 홈페이지 파일: `index.html`
- 기간별 PDF 내보내기: 우측 패널의 `기간별 PDF 내보내기`에서 시작일/종료일 선택 후 `PDF 저장`

## CLI 배포(선택)

```powershell
cd C:\Users\wocjf\Desktop\eats-my-life
npm i -g vercel
vercel
vercel --prod
```

## 참고

- 데이터는 각 사용자 브라우저의 `localStorage`에 저장됩니다.
- 즉, 사용자가 다르면 기록 데이터는 서로 공유되지 않습니다.
