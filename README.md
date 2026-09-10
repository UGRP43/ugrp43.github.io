# UGRP 43 — Shape-Erasing VLA

DGIST UGRP 2026 Group 43 프로젝트 페이지.
포스터 옆 QR로 접속하는 공개 페이지입니다.

**https://moooooooooook.github.io/ugrp43/**

## 영상 추가하는 법

`demo.mp4` 파일을 이 폴더에 넣고 push하면 "시연 영상" 자리에 자동으로 들어갑니다.
파일이 없으면 "영상 준비 중" 자리표시자가 그대로 보입니다.

```bash
cp <영상파일> demo.mp4
git add demo.mp4 && git commit -m "시연 영상 추가" && git push
```

권장: H.264 mp4 · 720p 이하 · 30초 내외 · 20MB 이하
(GitHub 파일당 100MB 제한, 모바일 데이터로 열리는 페이지라 작을수록 좋습니다)
