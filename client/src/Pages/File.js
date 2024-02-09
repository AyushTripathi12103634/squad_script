import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const header = {
          "Authorization":localStorage.getItem("auth")
        }
        
        const response = await axios.get('/api/v1/file/files',{},{header:header}); 
        setFiles(response.data.files);
        console.log(response.data.files)
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    getFiles();
  }, []);

  const getFileContent = async (file) => {
    try {
      const header = {
        "Authorization":localStorage.getItem("auth")
      }

      const response = await axios.get(`/api/v1/file/files/${file.meetingid}`, {}, {header:header});
      setFileContent(file.content); // set the content of the clicked file to fileContent
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };

  return (
    <div>
      <h1>Files</h1>
      {files.map((file, index) => (
        <div key={index} onClick={() => getFileContent(file)}>
          <h2>{file.title}</h2>
          <p>Type: {file.language}</p>
        </div>
      ))}
      {fileContent && (
        <div>
          <h2>File Content:</h2>
          <p>{fileContent}</p>
        </div>
      )}
    </div>
  );
};

export default FilesPage;
