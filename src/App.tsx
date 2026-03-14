import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/store';
import { todosSlice } from './features/todos';

export const App = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);

  dispatch(todosSlice.actions.setTodos(allTodos));

  useEffect(() => {
    getTodos()
      .then(setAllTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todos={allTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo !== null && <TodoModal todo={currentTodo} />}
    </>
  );
};
