function setEdit(edit) {
	const editorContainer = document.getElementById('editor-container')
	if(edit === "edit") {
		editorContainer.classList.remove("hidden")
	} else if (edit === "preview") { 
		editorContainer.classList.add("hidden")
	}
}

exports.setEdit = setEdit
