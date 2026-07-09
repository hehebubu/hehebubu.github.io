#!/bin/zsh
# 블로그 글을 GitHub에 올려서 배포하는 스크립트
# 사용법:  ./배포.sh          (기본 메시지로 배포)
#         ./배포.sh "새 글: 제목"  (메시지 지정해서 배포)

cd "$(dirname "$0")" || exit 1

if [[ -z $(git status --porcelain content/) ]]; then
  echo "변경된 글이 없어요. content 폴더에 글을 쓰거나 수정한 뒤 다시 실행하세요."
  exit 0
fi

msg="${1:-글 업데이트 ($(date '+%Y-%m-%d %H:%M'))}"

git add content/
git commit -m "$msg"
git push

echo ""
echo "✅ 업로드 완료! 1~2분 뒤 https://hehebubu.github.io 에 반영됩니다."
echo "   배포 진행 상황: https://github.com/hehebubu/hehebubu.github.io/actions"
