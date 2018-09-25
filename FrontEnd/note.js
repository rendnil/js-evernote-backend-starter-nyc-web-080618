note_store = [ ]

class Note {

  constructor(note_obj){
    this.id = note_obj.id
    this.title = note_obj.title
    this.body = note_obj.body
    note_store.push(this)
  }

  render_title(){
    return(`
      <p class = "note-title" id = ${this.id}>${this.title}<p>
      `)
  }

  render_full_note(){
    return(`
      <h1>${this.title}</h1>
      <textarea>${this.body}</textarea>
      <h4>${this.id}</h4>
      <button name = ${this.id} id="edit-note">Edit</button>
      <button name = ${this.id} id="delete-note">Delete</button>
      <div id="edit-form"></div>
      `)

  }




}
