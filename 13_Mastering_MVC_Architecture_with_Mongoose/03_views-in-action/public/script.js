// Delete
document.querySelectorAll('.delete').forEach(button => {
  button.addEventListener('click', async () => {
    const id = button.dataset.id

    await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'DELETE'
    })

    window.location.reload()
  })
})

// Edit
document.querySelectorAll('.edit').forEach(button => {
  button.addEventListener('click', async () => {
    const id = button.dataset.id
    const input = document.querySelector(`#title-${id}`)

    // First click: enable editing
    if (button.textContent === 'Edit') {
      input.disabled = false
      input.focus()

      // Move cursor to the end
      const length = input.value.length
      input.setSelectionRange(length, length)

      button.textContent = 'Save'
      return
    }

    // Second click: save changes
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: input.value
      })
    })

    input.disabled = true
    window.location.reload()
  })
})

document.querySelectorAll('.complete').forEach(button => {
  button.addEventListener('click', async () => {
    const id = button.dataset.id

       // Get the current todo
    const response = await fetch(`http://localhost:4000/todos/${id}`)
    const todo = await response.json()
  

    // Toggle the completed status
    const updateResponse = await fetch(`http://localhost:4000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: !todo.completed
      })
    })

    await updateResponse.json()

    window.location.reload()
  })
})
