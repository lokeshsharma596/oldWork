import { Editor } from '@tinymce/tinymce-react';
import React from "react"
import {useSelector,useDispatch} from "react-redux"
import {setTypeOfTask,setComment} from "./actions"

const TinyMce = (props) => {

  const dispatch=useDispatch()
  const articleData = useSelector(state => state.articleReducer)

    return (
        <Editor
         initialValue={articleData.comment}
         
         init={{
           height: 150,
           menubar: false,
           branding: false,
           plugins: [
             'lists'
           ],
           toolbar:
             'undo redo | bold | \
             bullist numlist'
         }}
         onEditorChange={(content, editor) => {
           dispatch(setTypeOfTask(""))
           dispatch(setComment(content))
                    // props.dispatch({ type: 'COMMENT', payload: content})
                    // props.dispatch({ type: 'TYPE', payload: ""})
                            
                }} 
       />

    )
}

export default TinyMce;