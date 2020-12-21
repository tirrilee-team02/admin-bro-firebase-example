import { RichText } from '@admin-bro/design-system'
// import {Storage} from '../FirebaseConfig';

export default function TextEditor(props) {
  const { property, record, onChange } = props
  const value = record.params[property.name]

  const QuillToolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],

    [{ align: ['', 'right', 'center'] }],
    ['link', 'image', 'video'],

    ['clean'], // remove formatting button
  ]

  return (
    <RichText
      quill={{
        theme: 'snow',
        modules: {
          toolbar: QuillToolbarOptions,
        }
      }}
      value={value}
      onChange={(text) => {
        onChange({
          ...record,
          params: {
            ...record.params,
            [property.name]: text,
          }
        })
      }}
    />
  )
}
