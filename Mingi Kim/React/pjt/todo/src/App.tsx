import localforage from 'localforage';
import { useState, useEffect } from 'react';

import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { indigo, pink } from '@mui/material/colors';

import { isTodos } from './lib/isTodos';

import { QR } from './QR';
import { ToolBar } from './ToolBar';
import { SideBar } from './SideBar';
import { TodoItem } from './TodoItem';
import { FormDialog } from './FormDialog';
import { AlertDialog } from './AlertDialog';
import { ActionButton } from './ActionButton';

const theme = createTheme({ 
  palette: {
    primary: {
      main: indigo[500], light: '#757de8',
      dark: '#002984', 
    },
    secondary: { main: pink[500], 
      light: '#ff6090', 
      dark: '#b0003a',
    }, 
  },
});

export const App = (): JSX.Element => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]); 
  const [filter, setFilter] = useState<Filter>('all');

  const [qrOpen, setQrOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const onToggleQR = () => setQrOpen(!qrOpen);
  const onToggleAlert = () => setAlertOpen(!alertOpen);  
  const onToggleDrawer = () => setDrawerOpen(!drawerOpen);

  const onToggleDialog = () => {
    setDialogOpen(!dialogOpen);
    setText('');
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => { 
    setText(e.target.value);
  };

  const handleOnSubmit = () => { 
    if (!text) {
      setDialogOpen(false);
      return;
    }

    const newTodo: Todo = { 
      value: text,
      id: new Date().getTime(), 
      checked: false,
      removed: false, 
    };
    setTodos([newTodo, ...todos]);
    setText(''); 
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
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));
    const newTodos = deepCopy.map((todo) => { 
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
  }; 

  useEffect(() => {
    localforage
      .getItem('todo-20210101')
      .then((values) => isTodos(values) && setTodos(values))
      .catch((err) => console.error(err));
  }, []);
  
  useEffect(() => {
    localforage
      .setItem('todo-20210101', todos)
      .catch((err) => console.error(err));
  }, [todos]);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} /> 
      <ToolBar filter={filter} onToggleDrawer={onToggleDrawer} /> 
      <SideBar
        drawerOpen={drawerOpen}
        onSort={handleOnSort} 
        onToggleQR={onToggleQR}
        onToggleDrawer={onToggleDrawer} 
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