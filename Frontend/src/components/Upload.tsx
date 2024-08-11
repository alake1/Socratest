import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import React, { useState } from "react";
import {
    getDatabase,
    ref as DBref,
    onValue,
    update,
    push,
    Database,
} from 'firebase/database';

import {
    ref as StorageRef,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
    listAll,
} from 'firebase/storage';
import { Box, Typography } from "@mui/material";
interface UFile {
    url: string;
    createdAt: number;
    key: string;
}

const Uploader: React.FC = () => {

    const [file, setFile] = useState<File | null>(null);
    //const [percent, setPercent] = useState<number>(0);
    const [files, setFiles] = useState<ExtFile[]>([]);
    const [ufiles, setUFiles] = useState<UFile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const db: Database = getDatabase();
    const storage = getStorage();

    // Handles input change event and updates state
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        } else {
            setFile(null); // Set to null if no file is selected
        }
    }


    function handleUpload(files: ExtFile[]) {
        setFiles(files);
        console.log(files);
        for (let ffile of files) {
            let file = ffile.file;
            console.log(file);
            if (!file) {
                alert('Please choose a file first!');
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = (event) => {

                    // Create a reference to the storage path
                    const storageRef = StorageRef(storage, `/${file?.name}`);

                    // Upload the resized image
                    const uploadTask = uploadBytesResumable(storageRef, (file as Blob));

                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            /*console.log(snapshot);
                            const percent = Math.round(
                              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            );
                    
                            // Update progress
                            setPercent(percent);
                            */
                        },
                        (err) => console.log(err),
                        () => {
                            // Get the download URL
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((url) => {
                                    // Save the download URL to the database
                                    /*const newRef = push(DBref(db, 'uploads/files'), {
                                        url: url,
                                        createdAt: Date.now(),
                                    });*/
                                    console.log(url);
                                    fetch("http://localhost:8000/upload-questions?url=" + url);


                                    // Clear the file input and reset percent
                                    //setFile(null);
                                    //setPercent(0);
                                })
                                .catch((error) =>
                                    console.error('Error getting download URL:', error)
                                );
                        }
                    );


                };
            };
        }
        //let file = files[0].file;

    }
    return <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: 20,
            marginTop: 5,
            marginBottom: 5
        }}
    ><Box sx={{ width: '100%' }}>

            <Typography variant="h4" gutterBottom sx={{ margin: 5 }}>
                Upload
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ margin: 5 }}>
                Upload a pdf file and generate questions on the content instantly.
            </Typography>
            <div>
                <Dropzone onChange={handleUpload} value={files} style={{ width: 300, marginTop: 30, marginLeft: '40%' }} accept='application/pdf'></Dropzone>
            </div>
        </Box>
    </Box>
}

export default Uploader;