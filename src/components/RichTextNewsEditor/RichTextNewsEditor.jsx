import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Editor } from '@tinymce/tinymce-react';

// Для работы требуется: npm install @tinymce/tinymce-react

const RichTextNewsEditor = forwardRef(({ value, onChange, height = 880 }, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getContent: () => (editorRef.current ? editorRef.current.getContent() : ''),
    setContent: (html) => editorRef.current && editorRef.current.setContent(html),
  }));

  return (
    <div style={{ margin: '24px 0' }}>
      <Editor
        apiKey="10j4qy6mbls7m3avyis2buq06te1r1emwreenunbvtghmqwv"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        init={{
          height,
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
            'emoticons',
          ],
          toolbar:
            'undo redo | blocks | bold italic underline strikethrough forecolor backcolor | ' +
            'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
            'link image media table | emoticons charmap | removeformat | code fullscreen preview',
          content_style:
            'body { font-family:Roboto,Arial,sans-serif; font-size:16px; background:#fff; color:#222; }',
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'image',
          file_picker_callback: function (cb, value, meta) {
            if (meta.filetype === 'image') {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.onchange = function () {
                const file = this.files[0];
                const reader = new FileReader();
                reader.onload = function () {
                  cb(reader.result, { title: file.name });
                };
                reader.readAsDataURL(file);
              };
              input.click();
            }
          },
          media_live_embeds: true,
          // Исправленный media_url_resolver для YouTube и безопасная обработка ошибок
          media_url_resolver: function (data, resolve/*, reject*/) {
            try {
              // Поддержка ссылок вида https://www.youtube.com/watch?v=2l-dv_z4KUc и https://youtu.be/2l-dv_z4KUc
              const ytMatch = data.url.match(
                /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]{11})/
              );
              if (ytMatch) {
                resolve({
                  html: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${ytMatch[1]}" frameborder="0" allowfullscreen></iframe>`,
                });
              } else {
                // TinyMCE сам обработает другие ссылки (например, Vimeo)
                resolve({ html: '' });
              }
            } catch (e) {
              // Безопасно обработать любые ошибки, чтобы не было "Media embed handler threw unknown error"
              resolve({ html: '' });
            }
          },
          language: 'ru',
        }}
        onEditorChange={onChange}
      />
    </div>
  );
});

// Для получения HTML из редактора
export function getEditorHtml(editorRef) {
  if (editorRef && editorRef.current && typeof editorRef.current.getContent === 'function') {
    return editorRef.current.getContent();
  }
  return '';
}

export default RichTextNewsEditor;
