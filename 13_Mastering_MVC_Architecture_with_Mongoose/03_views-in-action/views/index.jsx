import React from 'react'
import Layout from './Layout'

export default function ({ todos }) {
  return (
    <Layout title='Todo App'>
      <main className='container'>
        <h1>📝 Todo App</h1>
        <p>Stay organized and get things done.</p>

        <form action='/todos' method='POST'>
          <input
            type='text'
            name='title'
            placeholder='What needs to be done?'
            required
          />
          <button>Add Todo</button>
        </form>

        <ul>
          {todos.reverse().map(({ title, completed, _id }) => (
            <li key={_id.toString()}>
              <input
                type='checkbox'
                className='complete'
                data-id={_id.toString()}
                defaultChecked={completed}
              />

              <input
                id={`title-${_id}`}
                className='todo-title'
                defaultValue={title}
                disabled
                style={{
                  textDecoration: completed ? 'line-through' : 'none',
                  color: completed ? '#9ca3af' : '#111827'
                }}
              />

              <div className='actions'>
                <button className='edit' data-id={_id.toString()}>
                  Edit
                </button>

                <button className='delete' data-id={_id.toString()}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  )
}
