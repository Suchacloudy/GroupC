var li1 = React.createElement('li', { key : 1 }, 'Hermosa Beach')
var li2 = React.createElement('li', { key : 2 }, 'Santa Monica')
var li3 = React.createElement('li', { key : 3 }, 'Long Beach')
var ul = React.createElement('ul', null, [li1, li2, li3])

ReactDOM.render(ul, document.getElementById('root'))