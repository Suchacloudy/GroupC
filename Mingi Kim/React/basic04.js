var h1= React.createElement('h1', { key : 100 }, 'Beach Cities')
var li1 = React.createElement('li', null, 'Hermosa Beach')
var li2 = React.createElement('li', null, 'Santa Monica')
var li3 = React.createElement('li', null, 'Long Beach')
var ul = React.createElement('ul', { key : 101 }, li1, li2, li3)

ReactDOM.render([h1, ul], document.getElementById('root'))