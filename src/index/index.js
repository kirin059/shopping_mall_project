"use strict";

// Fetch the items from the JSON file
function loadItems() {
    return fetch("data/data.json")
        .then((response) => response.json()) // 성공이면 json으로 변환하고
        .then((json) => json.items); // json안의 items를 리턴한다
}

// JSON파일을 불러오는데 시간이 걸리기 때문에 promise로 불러온다(비동기)
// promise 사용해주기 (성공할땐 .then  /  실패할땐 .catch)
loadItems()
    .then((items) => {
        // 성공이면, 아래 두 함수를 실행한다
        displayItems(items);  // item 를 보여주는 함수
        setEventListener(items); // filtering 해주는 함수
    })
    // 실패하면, console.log로 출력되도록 한다
    .catch(console.log);

// (1) items(ul) 안에 list들을 넣어주기 위해, 받아온 데이터를 mapping하여 각 li태그로 변환하여 넣어준다
function displayItems(items) {
    const container = document.querySelector(".items");
    container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// li태그를 문자열로 변환하는 함수
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail" />
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// (2) 각 버튼들을 클릭하면 eventListener가 작동하도록 하는 함수
function setEventListener(items) {
    const logo = document.querySelector(".logo");
    const btns = document.querySelector("nav");

    // logo 버튼을 클릭하면 모든 리스트가 보이도록
    logo.addEventListener("click", () => displayItems(items));
    // nav 버튼 6개들이 클릭되면 onButtonClick함수가 실행되도록
    btns.addEventListener("click", (e) => onButtonClick(e, items));
}

// nav 버튼 6개들에 대한 filering 해주기
// html에 "data-" 를 지정해준다   >>   data-key, data-value
function onButtonClick(e, items) {
    //console.log(e.target.dataset.key);
    //console.log(e.target.dataset.value);
    const dataset = e.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    // 필터링 할 정보가 들어있지 않으면 그냥 return하기
    if (key == null || value == null) {
        return;
    }

    // 각 item들에 filter를 적용한다. dataset에 의해 key와 value가 같을 경우만 filter하기
    const filtered = items.filter((item) => item[key] === value);
    // console.log(filtered);

    // 필터링 할 정보가 들어있지 않는 경우를 제외하면(=필터링 할 정보가 들어있으면) displayItems함수를 실행한다
    displayItems(filtered);
}