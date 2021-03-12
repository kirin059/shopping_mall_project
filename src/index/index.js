"use strict";

let slideIndex = 1;      // 현재 이미지는 1이다


function plusSlides(n) {        // n은 -1 || 1 을 대입하는 자리
    showSlides(slideIndex += n);  // -1을 넣으면 0이된다(1 += -1 = 0), slideIndex = 0 / showSlides(slideIndex=0)이면 plusSlides라는 뜻
}                               // 1을 넣으면 slideIndex는 2가 된다     0(pre) 1(현재) 2(next)

function currentSlide(n) {      // showSlides함수를 실행해서 slideIndex값을 음수가 안나오게 조절(->n이 사진 갯수인 3보다 크게되면 slideIndex를 1로 만들어주고, 0보다 작게되면 slideIndex를 사진 갯수인 3으로 만들어준다)
    showSlides(slideIndex = n);   // showSlides함수는 n값이 1보다 작을땐 3, 3보다 클땐 1이 나오기 때문에, currentSlide는 slideIndex값인 1로 생각하면 된다    
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    let prev = document.getElementsByClassName('prev');
    let next = document.getElementsByClassName('next');

    if (n > slides.length) {      // 전체 갯수(3개)보다 크면 4부터, 4번째는 없으니깐 4번째는 첫번째사진이 되게 (n값(=slideIndex, 첫번째페이지, 현재값)이 전체 길이(3)보다 커지면 현재슬라이드 나오게)
        slideIndex = 1              // 첫번째사진(4번째는 첫번째 사진으로 반복되게 123 123 123), slideIndex=1이니깐, 위 함수에서 slideIndex=n이라고 했으니깐, n=slideIndex다. slideIndex가 3페이지보다 커지면 첫번째 슬라이드 나오게
    }
    if (n < 1) {                  // 이전페이지 누른다는 뜻  (1=3이다) 첫번째에서 이전 페이지 누르면 3번째 사진이 나온다 (n값(slideIndex)이 1(slideIndex인 1)보다 작으면, 현재슬라이드는 3번째 슬라이드가 나오게)
        slideIndex = slides.length  //slideIndex(1)가 3번째 슬라이드(= 전체 길이)와 같다
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  // 아예 모든 슬라이드가 안보이게 해놓는다
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");  // replace()함수는 문자열을 바꿀때 사용  .replace("찾을 문자열". "바꿀문자열")
    }                                                                  // 모든 액티브를 없애기("")
    slides[slideIndex - 1].style.display = "block";      // 현재 사진만 보이게(for문으로 이미지가 전체 안보이게 이미 설정했으니) , 0(pre) 1(현재) 2(next) 라서 현재슬라이드(1)를 넣으면 0,1,2가 된다
    dots[slideIndex - 1].className += " active";         // 현재 눌렀을때 보라색이 active되게(for문으로 버튼이 전체 active되지 않게 이미 설정했으니)


}
setTimeout(showSlides, 2000);
showSlides(slideIndex);