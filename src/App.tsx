/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(todos => {
      setAllTodos(todos);
      setLoading(false);
      setVisibleTodos(todos);
    });
  }, []);

  useEffect(() => {
    let newTodos = [...allTodos];

    if (filter) {
      newTodos = newTodos.filter(todo => {
        if (filter === 'completed') {
          return todo.completed;
        }

        if (filter === 'active') {
          return !todo.completed;
        }

        return true;
      });
    }

    if (query) {
      newTodos = newTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setVisibleTodos(newTodos);
  }, [filter, query, allTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalVisible && (
        <TodoModal
          selectedTodo={selectedTodo}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
};
