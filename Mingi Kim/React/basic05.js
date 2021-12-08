// 데이터
const title = 'Beach Cities'
const cities = ['Hermosa Beach', 'Santa Monica', 'Long Beach']

// 코드
var h1 = React.createElement('h1', { key: 100 }, title)
var li = cities.map((city, i) => React.createElement('li', { key: i }, city))
var ul = React.createElement('ul', { key: 101 }, li)

ReactDOM.render([h1, ul], document.getElementById('root'))