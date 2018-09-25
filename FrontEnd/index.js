document.addEventListener('DOMContentLoaded', () => {
const notes_container = document.getElementById("notes-container")
const full_notes_container = document.getElementById('note-detail-container')
const create_note_form = document.getElementById("create-note-form")
create_note_form.addEventListener("submit", create_note)


fetch(`http://localhost:3000/api/v1/notes`)
  .then(response => (response.json()))
  .then(notesData => {
    const all_notes = notesData.map((note_obj)=>{
      let new_note = new Note(note_obj)
      return new_note.render_title()
    })
    notes_container.innerHTML = all_notes.join("")
  })

  fetch(`http://localhost:3000/api/v1/users`)
    .then(response => (response.json()))
    .then(notesData => {
      const all_users = notesData.map((note_obj)=>{
        let new_user = new User(note_obj)

        // return new_note.render_title()
      })
      // console.log(user_store);
      // notes_container.innerHTML = all_notes.join("")
    })

document.addEventListener("click", (e)=>(display_note(e)))

function display_note(e){
  if (e.target.className === "note-title"){
    let note_id = parseInt(e.target.id)
    console.log(note_id)
    let note_obj = note_store.find((note)=>{
      return note.id === note_id
    })
    full_notes_container.innerHTML = note_obj.render_full_note()
    const delete_button = document.getElementById("delete-note")
    const edit_button = document.getElementById("edit-note")
    delete_button.addEventListener("click", ()=>{
      let note_id = parseInt(event.target.name)

      fetch(`http://localhost:3000/api/v1/notes/${note_id}`,
        {method: "DELETE"
      }).then(response => response.json())
      .then(note_obj => {
        console.log(note_obj)
        let deleted_note_id = note_obj.noteId
        document.getElementById(`${deleted_note_id}`).remove()
        document.getElementById('note-detail-container').innerHTML = ""
      })









    })//end delete event

    edit_button.addEventListener("click",()=>{
      let note_id = parseInt(event.target.name)
      let edit_div = document.getElementById('edit-form')
      edit_div.innerHTML = render_edit_form()

      let edit_form = document.getElementById("edit-note-form")
      edit_form.addEventListener("submit", ()=>{
        event.preventDefault()
        let user_title = event.target.querySelector("#edit-title").value
        let user_body = event.target.querySelector("#edit-body").value


        fetch(`http://localhost:3000/api/v1/notes/${note_id}`,
            {method: "PATCH",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: user_title,
              body: user_body
            })

      }).then(response => response.json())
        .then(edited_note => {
          let edited_note_id = edited_note.id
          let edited_note_page = document.getElementById(`${edited_note_id}`)

          edited_note_obj = note_store.find((note)=>{
            return edited_note.id === note.id
          })
          edited_note_obj.title = edited_note.title
          edited_note_obj.body = edited_note.body
          edited_note_page.innerText = edited_note.title
          document.getElementById('note-detail-container').innerHTML = ""
        })

        event.target.reset()
    })
  })
}
}

function create_note(event){
  event.preventDefault()
  let user_title = event.target.querySelector("#title").value
  let user_body = event.target.querySelector("#body").value

  fetch("http://localhost:3000/api/v1/notes",
  {method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: user_title,
    body: user_body,
    user_id: user_store[0].id
  })

}).then(response => response.json())
  .then(new_note_obj =>{
    let new_note = new Note(new_note_obj)
    notes_container.innerHTML += new_note.render_title()
  })
  event.target.reset()
}


function edit_note(event){
  debugger

}
function delete_note(event){
  console.log("hi delete")

}

function render_edit_form(){
  return (`
    <form id= "edit-note-form" class="" action="index.html" method="post">
    <br>
    <h2>Edit Note</h2>
    <h3>Title</h3>
    <input type="text" name="title" id = "edit-title" value="">
    <br>
    <h3>Des</h3>
    <input type="text" name="body" id = "edit-body" value="">
    <br>
    <input type="submit" value="Submit" id = "form-submit">
  </form>

    `)

}

})
