import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage'; // Amended: Added ref
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0); 
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileError, setImageFileError] = useState(null);
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
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytes(storageRef, imageFile);

    uploadTask.then(
      "state_changed", 
      (snapshot) => { 
      console.log("Upload completed successfully")
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageFileUploadProgress(progress.toFixed(0));
      
    },
    (error) => {
      setImageFileError("Could not upload image: File must be less than 2MB")
      setImageFileUploadProgress(null)
      setImageFile(null)
      setImageFileUrl(null)
    },
    () => {
    
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
        setImageFileUrl(downloadURL);
      });
    }
  );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-8 border-[#b4acac65]' onClick={()=> filePickerRef.current.click()}></img>
        
        {imageFileUploadProgress && (
          <CircularProgressbar 
          value={imageFileUploadProgress || 0} 
          text={`${imageFileUploadProgress}%`} strokeWidth={5} 
          style={{
            root:{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left:0,
            }, path:{
              stroke: `rgba(62, 152, 199 ${imageFileUploadProgress / 100})`,
            },
          }}
          />
        ) 
        }

        
        {imageFileError && 
          <Alert color='failure'>
            {imageFileError}
          </Alert>
        }
        </div>
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
