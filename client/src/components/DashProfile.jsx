import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage'; 
import { app } from '../firebase';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0); 
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false); // New state variable

  const filePickerRef = useRef();
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile){
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    if (!imageFile) return;
  
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
  
    try {
      const snapshot = await uploadBytes(storageRef, imageFile);
  
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImageFileUrl(downloadURL);
  
      // Reset progress and clear error if successful
      setImageFileUploadProgress(0);
      setImageFileUploadError(null);
      setImageFile(null)
      setUploadSuccess(true);
  
      console.log("Upload completed successfully");
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setImageFileUploadError("Image upload failure: The file is larger than 2MB! Re-upload the image again!")
      console.log("imageFileUploadError after timeout:", imageFileUploadError) 
      setImageFile(null);
  
      // Handle specific error conditions
      if (error.code === 'storage/canceled') {
        console.log('User canceled the upload');
      } else if (error.code === 'storage/unknown') {
        console.log('Unknown error occurred, inspect error.serverResponse');
      } else {
        setImageFileUploadError("File upload failed: The file is larger than 2MB!");
      }
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md  rounded-full">
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-8 border-[#b4acac65]' onClick={()=> filePickerRef.current.click()}></img>
        </div> 
        {imageFileUploadError && !uploadSuccess ?(   
        <Alert color='failure'>{imageFileUploadError}</Alert>) : (
          uploadSuccess && <Alert color='success'>Upload successful!</Alert>
        )
        }   
        
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username}/>
        <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email}/>
        <TextInput type="password" id="password" placeholder="password"/>
        <Button type='submit' gradientDuoTone="purpleToBlue" outline>Submit</Button>

      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
