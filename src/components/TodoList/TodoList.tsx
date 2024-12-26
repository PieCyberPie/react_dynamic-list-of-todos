import React from 'react';
import { Todo } from '../../types/Todo';
interface Props {
  todos: Todo[];
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const TodoList: React.FC<Props> = ({
  todos,
  modalVisible,
  setModalVisible,
  selectedTodo,
  setSelectedTodo,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          {todo.completed ? (
            <>
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
              <td className="is-vcentered is-expanded">
                <p className="has-text-success">{todo.title}</p>
              </td>
            </>
          ) : (
            <>
              <td className="is-vcentered"></td>
              <td className="is-vcentered is-expanded">
                <p className="has-text-danger">{todo.title}</p>
              </td>
            </>
          )}

          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => {
                setModalVisible(true);
                setSelectedTodo(todo);
              }}
            >
              {modalVisible && selectedTodo?.id === todo.id ? (
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              ) : (
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              )}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// <td className="is-vcentered">
//   <span className="icon" data-cy="iconCompleted">
//     <i className="fas fa-check" />
//   </span>
// </td>
// <td className="is-vcentered is-expanded">
//   {todo.completed ? (
//     <p className="has-text-success">{todo.title}</p>
//   ) : (
//     <p className="has-text-danger">{todo.title}</p>
//   )}
// </td>
