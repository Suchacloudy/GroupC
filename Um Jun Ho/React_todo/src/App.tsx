import localforage from 'localforage';
// React에서 useState훅 가져오기
import { useState, useEffect } from 'react';

import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

import { isTodos } from './lib/isTodos';

import { QR } from './QR'
import { ToolBar } from './ToolBar';
import { SideBar } from './SideBar';
import { TodoItem } from './TodoItem';
import { FormDialog } from './FormDialog';
import { AlertDialog } from './AlertDialog';
import { ActionButton } from './ActionButton';
import { listItemSecondaryActionClasses } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    }
  }
});

export const App=(): JSX.Element => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const [qrOpen, setQrOpen] = useState(false);
  const [alertOpen , setAlertOpen ] = useState (false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);


  const onToggleQR = () => setQrOpen(!qrOpen);
  const onToggleAlert = () => setAlertOpen(!alertOpen);
  const onToggleDrawer = () => setDrawerOpen(!drawerOpen);

  const onToggleDialog = () => {
    setDialogOpen(!dialogOpen);
    // 입력양식에 입력 지움
    setText('');
  }

  const handleOnChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) { 
      setDialogOpen(false);
      return;}

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos([newTodo, ...todos]);
    // 입력양식에 대한 입력 지움
    setText('');
    // FormDialog 구성요소 닫기
    setDialogOpen(false);
  };

  const handleOnEdit = (id: number, value: string) => {
    
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });
    
    setTodos(newTodos);
  };

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
  
  const handleOnSort = (filter: Filter) => {
    setFilter(filter);
  }
  
  useEffect(() => {
    localforage
      .getItem('todo-20211207')
      .then((values) => isTodos(values) && setTodos(values))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localforage
      .setItem('todo-20211207', todos)
      .catch((err) => console.error(err));
  }, [todos]);



  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{body: { margin: 0 , padding: 0 }}}/>
      <ToolBar filter={filter} onToggleDrawer={onToggleDrawer} />
      <SideBar 
        drawerOpen={drawerOpen}
        onSort={handleOnSort}
        onToggleDrawer={onToggleDrawer}
        onToggleQR={onToggleQR}
      />
      <QR open={qrOpen} onClose={onToggleQR} />
      <FormDialog 
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        onToggleDialog={onToggleDialog}
      />
      <AlertDialog
        alertOpen={alertOpen}
        onEmpty={handleOnEmpty}
        onToggleAlert={onToggleAlert}
      />
      <TodoItem
        todos={todos}
        filter={filter}
        onEdit={handleOnEdit}
        onCheck={handleOnCheck}
        onRemove={handleOnRemove}
      />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={onToggleAlert}
        onToggleDialog={onToggleDialog}
      />
    </ThemeProvider>

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
