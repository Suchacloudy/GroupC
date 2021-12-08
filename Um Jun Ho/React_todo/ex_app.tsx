// React에서 useState훅 가져오기
import { useState } from 'react';
import { FormDialog } from './FormDialog'

type Todo ={
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};
// todo라는 타입을 선언함. 값은 string!
//하나의 인터페이스와 비슷한 것이라고 보면 됨! 

type Filter ='all'|'checked'|'unchecked'|'removed';

export const App=() => {
  /*
  * text = 상태값
  * setText = 상태값을 업데이트하는 메소드
  * useState 인수 '=' 상태 초기값 (= 빈문자열)
  */
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // todos 상태 업데이트하는 함수
  const handleOnSubmit = () => {
    // 아무것도 입력하지 않으면 리턴
    if (!text) return;

    // 새 Todo 만들기
    const newTodo: Todo = {
      value: text,
      /**
       * Todo형 객체의 형정의가 업데이트 되었으므로 따라 변화
       */
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };


    /**
      * 전개구문(스프레드 구문)을 사용하여 todos상태 복사본에 newTodo추가
      *
      * const oldTodos = todos.slice();
      * oldTodos.unshift(newTodo);
      * setTodos(oldTodos);
      *
      **/
    setTodos([newTodo, ...todos]);
    // 입력양식에 대한 입력 지움
    setText('');
  };

      //todo 변화 감지 배열
  /**
  * 인수로 전달된 todo의 id가 일치합니다.
  * todos 상태(복사본)의 todo
  * value 속성을 인수 value (= e.target.value) 로 다시 작성함
  */
  const handleOnEdit = (id: number, value: string) => {
    
    //깊은 복사: 일단 json으로 변환 후 복원
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });
    
    // todos 상태가 다시 작성되지 않았는지 확인
      console.log('=== Original todos ===');
      todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));
    //todos 상태 업데이트
    setTodos(newTodos);
  };

  //check 변화 감지
  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };
  
  //삭제 감지 콜백
  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy : Todo [] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) =>  {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });
  

  return (
    <div>
      <select
        defaultValue="all"
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
        <option value="all">모든 할일</option>
        <option value="checked">완료된 할일</option>
        <option value="uncheked">현재 할일</option>
        <option value="removed">휴지통</option>
      </select>
      {filter === 'removed' ? (
        <button
          onClick={handleOnEmpty}
          disabled={todos.filter((todo) => todo.removed).length ===0} 
        >
          휴지통비우기
        </button>
        
      ) : (
        /* 콜백으로 () => handleOnSubmit()전달 */
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
          }}
        >
                  {/* 
        입력중 텍스트 값을 text 상태가 가지고 있기 때문에 value로 표시

        onChange 이벤트 (=입력 텍스트 변경) text상태 반영
        */}
          <input
            type="text"
            value={text}
            disabled={filter === 'checked'}
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="submit"
            value="추가"
            disabled={filter === 'checked'}
            onSubmit={handleOnSubmit}
          />
        </form>
      )}
      
        <ul>
        {filteredTodos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  disabled={todo.removed}
                  checked={todo.checked}
                  onChange={() => handleOnCheck(todo.id, todo.checked)}
                />
                <input
                  type="text"
                  disabled={todo.checked || todo.removed}
                  value={todo.value}
                  onChange={(e) => handleOnEdit(todo.id, e.target.value)}
                />
                <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                  {todo.removed ? '복원' : '삭제'}
                </button>
              </li>
              );
          })}
        </ul>
    </div>
  );
};
/*

import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>Hello World!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App*/
