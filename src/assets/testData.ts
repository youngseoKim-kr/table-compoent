const tasks = [
  {
    id: 1,
    title: '리액트 과제',
    content: '리액트의 기본 개념을 학습하고 과제를 완료합니다.',
    date: '2021-10-01',
    completed: false,
  },
  {
    id: 2,
    title: 'Vue.js 과제',
    content: 'Vue.js의 핵심 개념을 학습합니다.',
    date: '2021-10-02',
    completed: false,
  },
  {
    id: 3,
    title: '자바스크립트 리팩토링',
    content: '기존 자바스크립트 코드를 리팩토링하여 성능을 개선합니다.',
    date: '2021-10-03',
    completed: false,
  },
  {
    id: 4,
    title: 'CSS 레이아웃',
    content: 'Flexbox와 Grid를 사용해 다양한 레이아웃을 구현합니다.',
    date: '2021-10-04',
    completed: false,
  },
]

export const setLocalStorage = () => {
  localStorage.setItem('todoData', JSON.stringify(tasks))
}
