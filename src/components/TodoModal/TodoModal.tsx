import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  selectedTodo: Todo | null;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setModalVisible,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(selectedUser => {
        setUser(selectedUser);
        setLoading(false);
      });
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModalVisible(false)}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>
            {selectedTodo?.completed ? (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-success">Done</strong>
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            ) : (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-danger">Planned</strong>
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// <div className="modal is-active" data-cy="modal">
//   <div className="modal-background" />
//
//   {true ? (
//     <Loader />
//   ) : (
//     <div className="modal-card">
//       <header className="modal-card-head">
//         <div
//           className="modal-card-title has-text-weight-medium"
//           data-cy="modal-header"
//         >
//           Todo #2
//         </div>
//
//         {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
//         <button type="button" className="delete" data-cy="modal-close" />
//       </header>
//
//       <div className="modal-card-body">
//         <p className="block" data-cy="modal-title">
//           quis ut nam facilis et officia qui
//         </p>
//
//         <p className="block" data-cy="modal-user">
//           {/* <strong className="has-text-success">Done</strong> */}
//           <strong className="has-text-danger">Planned</strong>
//
//           {' by '}
//
//           <a href="mailto:Sincere@april.biz">Leanne Graham</a>
//         </p>
//       </div>
//     </div>
//   )}
// </div>;
