## 1. File Upload Inputs
Use the HTML <input type="file" /> element in React
Allows users to select one or multiple files
```jsx
function FileUpload() {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return <input type="file" onChange={handleFileChange} />;
}
```
Tips:
multiple attribute → select multiple files
accept attribute → restrict file types

```<input type="file" multiple accept="image/*" onChange={handleFileChange} />;```

## 2️. Drag and Drop (React Dropzone)
Lets users drag files directly into a drop area
Popular library: React Dropzone


```jsx
import { useDropzone } from 'react-dropzone';

function MyDropzone() {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => console.log(acceptedFiles)
  });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px' }}>
      <input {...getInputProps()} />
      <p>Drag & drop some files here, or click to select files</p>
    </div>
  );
}
```

## 3️. Previewing Images

Show image previews before uploading
Use URL.createObjectURL() to generate temporary preview URLs

```jsx
import React from 'react';
function ImagePreview() {
  const [preview, setPreview] = React.useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: '200px' }} />}
    </div>
  );
}
```

## 4️. File Validation

Validate type, size, or other constraints before uploading
```jsx
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file.type.startsWith('image/')) {
    alert('Only images allowed!');
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    alert('File size should be less than 2MB');
    return;
  }
  // proceed with upload or preview
};
```

## 5️.Video & Audio Playback

Use HTML <video> and <audio> elements
React-friendly, supports controls and autoplay
```jsx
import React from 'react';
function MediaPlayer() {
  return (
    <div>
      <video width="400" controls>
        <source src="/sample-video.mp4" type="video/mp4" />
        Your browser does not support video.
      </video>

      <audio controls>
        <source src="/sample-audio.mp3" type="audio/mpeg" />
        Your browser does not support audio.
      </audio>
    </div>
  );
}
```

Tips:
- Combine with file input to allow user-selected media playback
- For large videos, consider lazy loading or streaming
Best Practices
- Limit file types & sizes → reduce server load
- Preview files before uploading → better UX
- Use drag-and-drop → modern and convenient interface
- Optimize videos/images → smaller file size for faster load
- Handle errors gracefully → invalid file type, upload failure