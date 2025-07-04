🚫 전체화면을 기준으로 제작 되었습니다. 중간에 화면을 축소 하지 말아주세요! 🚫  
⚠️ 게임 후반 이미지는 제작이 덜 된 상태입니다.⚠️  
## 📜 프로젝트 소개
사방에서 몰려오는 적들로부터 살아남고, 목표를 완수해 최종 스테이지에 도달하세요!
## 🚀 기술 스택
HTML, CSS, JavaScript
## ❔ 주요 기능 및 플레이 방법
**WASD** 키를 이용하여 **이동**할 수 있고, **Space Q E R**을 눌러서 **스킬**을 시전할 수 있습니다.(E스킬은 3레벨, R스킬은 5레벨에 해금됩니다.)  
왼쪽 아래에는 **체력**, **마나**가 표기 되어있습니다.  
**체력**이 모두 소진되면, **게임이 종료**됩니다.  
스킬을 시전할 때마다 **마나**가 소진되며, 마나가 **부족하면 스킬을 사용할 수 없습니다.**(시간이 지남에 따라 자동으로 충전)  
오른쪽 아래에는 각 **스킬에 대한 키**, **쿨타임 정보**가 표시되어 있습니다.  
위쪽 중앙에는 현재 **스테이지**가 표시되며, 총 **15스테이지**로 구성되어 있습니다.  
각 스테이지에 대한 **목표**는 오른쪽 위에 표시되어 있으며, **조건 달성 시 다음 스테이지**로 넘어갑니다.  
스테이지에 따라 등장 하는 몬스터의 종류가 다르고, 점점 강해집니다. 또한 10스테이지와 15스테이지에는 **강력한 몬스터**가 존재합니다.  
몬스터를 처치할 때마다 **경험치**를 획득하며, 일정량의 경험치 획득 시 **레벨**이 오릅니다.  
1레벨이 오를 때마다 **스텟포인트**를, 2레벨이 오를 때마다 **스킬포인트**를 얻습니다.  
**T키**를 통해 **스텟포인트**는 **최대 체력** 또는 **마나**를 늘릴 수 있으며, **스킬포인트**는 스킬을 **강화**할 수 있습니다.  
스킬을 **3번 강화**할 때마다 **새로운 능력**이 개방되어 더욱 강해집니다!  
**ESC키**를 통해 일시정지 및 시작메뉴로 돌아가기가 가능합니다.
## ▶️ 데모 링크
https://mf03ij348h32.netlify.app/
## 📝 배운점
이미지 깜빡임 현상을 제거하기 위한 preload  
이미지 y축 기준으로 뒤집는 방법  
Solid 원칙  
클래스 설계와 파일 분리 중요성 
## 😵 문제 해결과정
|문제|원인|해결과정|
|----|----|--------|
|키보드를 꾹 눌렀을 때, 이동이 매끄럽게 이루어지지 않음|이벤트 리스너에서 이동을 처리하는 방식|누른 키의 상태를 true, flase로 저장하고, AnimationFrame에서 이동 처리|
|대각선 이동 시 이동 속도가 더 빠름|두 개의 키를 눌렀을 때도 동일한 x,y 증감 방식|대각선으로 이동하는 두 개의 키를 누른 경우 약간 느리게 이동 시키기|
|특정 경우 충돌 감지를 못함|고려하지 못한 충돌 조건|오브젝트의 4개의 꼭짓점 중 다른 오브젝트 안에 포함 되어 있는 점이 있는가? 라는 조건에 ➕모양으로 겹칠 경우에 대한 예외처리를 추가(오브젝트a의 두 x좌표가 b의 두 x좌표 사이에 있고, b의 y좌표가 a의 y좌표 사이에 있는가?)|
|일정 시간 후 발생하는 이벤트 도중 일시 정지를 눌러도 시간이 지나면 이벤트가 발생|setTimeout의 특징으로 생긴 문제|게임시간을 기반으로 일정시간 후 함수를 메서드하는 함수 구현<br> 1. requestAnimationFrame에 따라 game_timer가 1씩 증가<br>2. 일시 정지 시 game_timer도 중지<br>3. execute_time_out 함수가 호출 되면, 현재 시간을 저장 및 game_timer > 저장된 시간+일정시간 일때 인자로 전달 받은 함수 호출하고 종료|
|window 크기에 따라 강화 화면에서 텍스트가 넘치는 현상|font-size가 정적인 값|강화 화면 창 크기와 window 크기에 맞춰 가변적으로 처리|
