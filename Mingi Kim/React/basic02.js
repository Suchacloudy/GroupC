var li1 = React.createElement('li', null, 'Hermosa Beach')
var li2 = React.createElement('li', null, 'Santa Monica')
var li3 = React.createElement('li', null, 'Long Beach')
var ul = React.createElement('ul', null, li1, li2, li3)

ReactDOM.render(ul, document.getElementById('root'))