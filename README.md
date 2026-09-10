# UGRP 43 — Shape-Erasing VLA

DGIST UGRP 2026 Group 43 프로젝트 페이지. 포스터 옆 QR로 접속합니다.

**https://ugrp43.github.io**

## 나중에 채울 자리

파일을 넣고 push하면 페이지에 자동으로 나타납니다. 없으면 자리표시자가 그대로 보입니다.

| 파일 | 들어갈 곳 | 권장 |
|---|---|---|
| `demo.mp4` | 시연 영상 | H.264 · 720p 이하 · 30초 내외 · 20MB 이하 |
| `img/collect-1.jpg` | 데이터셋 — 수집 환경 | 가로 1200px 내외 |
| `img/collect-2.jpg` | 데이터셋 — 카메라 구성 | 가로 1200px 내외 |

```bash
cp <파일> demo.mp4
git add -A && git commit -m "시연 영상 추가" && git push
```

## 이미 들어있는 것

- `img/zones-*.jpg` — K-means 구역 경계 (원 / 사각형 / 삼각형)
