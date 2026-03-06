window.APP_CONFIG = {
  // Supabase 프로젝트 URL (예: https://xxxx.supabase.co)
  supabaseUrl: "https://iathpintizevgmckngzy.supabase.co",
  // Supabase anon public key
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhdGhwaW50aXpldmdtY2tuZ3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NDYwNzMsImV4cCI6MjA4MjQyMjA3M30.8z7nQEtypIKNchL3UzcIMy8AZZoCjUZKGeLzZOV2zT0",
  // 같은 siteId를 쓰는 사용자끼리 데이터가 공유됩니다.
  siteId: "default-farm",
  // 시설 맞춤 옵션 (필요 시 값 수정)
  facilityOptions: {
    sites: ["G-Cube V4-2", "G-Cube V4-1", "G-Cube V3", "중산재배기"],
    cropTypes: ["시금치", "상추류", "마이크로그린", "기타"],
    stages: ["준비", "파종", "발아/암발아", "육묘", "정식", "재배", "수확", "세척/소독", "점검/보수"],
  },
};
