# Galaxy Shop (gushop)

삼성 갤럭시 제품 중 대학생에게 필요한 제품만을 모아 구성한 쇼핑몰 웹 애플리케이션입니다.  
정렬, 필터링, RESTful API 연동 등 쇼핑몰 구현에 필수적인 기능을 직접 설계하고 적용했습니다.

<br/>

## 프로젝트 개요

- 프로젝트명: Galaxy University Shop (gu-shop)
- 개발 기간: 2024.10 ~ 2025.01
- 프로젝트 유형: 개인 프로젝트 (백엔드 개발자와 협업, 프론트엔드 전담)
- 기획 의도: 쇼핑몰에서 자주 사용되는 기능을 직접 구현하고, 
  백엔드와 RESTful API를 연동하여 협업 기반의 개발 역량을 기르기 위함

<br/>

## 기술 스택

- 프론트엔드: React, JavaScript, TypeScript
- 스타일링: Tailwind CSS
- 폼 관리: React Hook Form
- 라이브러리: Swiper, React Lazy Load Image Component

<br/>

## 주요 기능

- 삼성 제품 중 대학생을 타깃으로 한 제품만 진열
- 사용자 권한 구분 (관리자는 상품 등록/수정/삭제 가능)
- RESTful API 연동으로 로그인, 회원가입, 프로필 관리, 상품 검색 기능 구현
- 필터링, 정렬, 페이지네이션 기능 포함
- 이메일 인증 기반 비밀번호 찾기 기능 포함

<br/>

## 추후 추가 예정

- [ ] 관리자 페이지 UI 개선  
- [ ] 장바구니 및 결제 기능  
- [ ] 상품 세부 정보 고도화  

<br/>

## 실행 방법

```bash
git clone https://github.com/Regulus55/gu-shop.git

cd gu-shop

npm install

npm start
