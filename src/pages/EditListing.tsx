import React, { useEffect, useRef, useState } from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { 
    getStorage, 
    ref, 
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";
import { doc, DocumentData, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4} from 'uuid';

import Button from '../components/shared/Button'
import FormInput from '../components/shared/FormInput'
import TextArea from '../components/shared/FormInput/TextArea'
import Spinner from '../components/shared/Spinner'
import { auth, db } from '../lib/firebase'
import { toast } from 'react-toastify';
import useListing from '../hooks/useListing';

type FormData = {
    type: string,
    name: string,
    bedrooms: number,
    bathrooms: number,
    parking: boolean,
    furnished: boolean,
    address?: string,
    offer: boolean,
    regularPrice: number,
    discountedPrice?: number,
    images?: Array<Text>,
    latitude: number,
    longitude: number,
    userRef?: string
}

const formDataDefault = {
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: [],
    latitude: 0,
    longitude: 0
}

const EditListing = () => {
    const navigate = useNavigate();
    const { listingId } = useParams();
    const { loading, listing } = useListing({listingId});

    const [geoLocEnabled, setGeoLocEnabled] = useState<boolean>(true);
    const [formData, setFormData] = useState<DocumentData>({});
    const [formIsLoading, setFormIsLoading] = useState(false);

    const isMounted = useRef(true);

    const onSubmit = async (e: React.FormEvent) => {
        console.log(formData)
        e.preventDefault();

        setFormIsLoading(true);

        if (formData.discountedPrice! >= formData.regularPrice) {
            setFormIsLoading(false);
            toast.error('Discounted price needs to be less than regular price');
            return;
        }


        if (formData.images!.length > 6) {
            setFormIsLoading(false);
            toast.error('Max 6 images');
            return;
        }

        // Store images in firebase
        const storeImage = async (image:any) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const fileName = `${auth.currentUser?.uid}-${image.name}-${uuidv4()}`;
                
                const storageRef = ref(storage, 'images/' + fileName);

                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on('state_changed', 
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {
                        reject(error)
                    }, 
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                resolve(downloadURL);
                                console.log('File available at', downloadURL);
                        });
                    }
                    );

            })
        }

        const imgUrls = await Promise.all(
            [...formData.images!].map((image) => storeImage(image))
        ).catch(() => {
            setFormIsLoading(false);
            toast.error('Images not uploaded');
            return;
        })

        const formDataCopy = { 
            ...formData,
            imgUrls,
            timestamp: serverTimestamp()
        };

        // delete formDataCopy.images;
        // location && (formDataCopy.location = location);

        // !formDataCopy.offer && delete formDataCopy.discountedPrice

        const docRef = doc(db, 'listings', listingId!);
        await updateDoc(docRef, formDataCopy);

        setFormIsLoading(false);

        toast.success('Listing saved');
        navigate(`/category/${formData.type}/${docRef.id}`);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | any) => {
        e.persist()
        let boolean: null | boolean = null;

        if(e.target.value === "true") {
            boolean = true;
        } 
        if (e.target.value === "false") {
            boolean = false;
        }

        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState, images: e.target.files
              }))
        }

        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState, [e.target.id]: boolean ?? e.target.value
              }))
        }
        return;
    }

    useEffect(() => {
      if(isMounted) {
        onAuthStateChanged(auth, (user) => {
            if(user) {
              if (listing && listing.userRef !== auth.currentUser?.uid) {
                console.log(listing.userRef, auth.currentUser?.uid)
                toast.error('You can not edit this listing');
                return navigate('/')
              }                
              setFormData({ ...listing, userRef: user.uid})
            } else {
                navigate('/sign-in');
            }
        });
      }
    
      return () => {
        isMounted.current = false;
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])



    if(formIsLoading) {
        return <div className='center-element'>
                <Spinner />
            </div>
    }
  return (
    <div className='profile'>
        <header>
            <p className="page-header">
                Edit Listing
            </p>
        </header>

        <main>
            <form onSubmit={onSubmit}>
                <label htmlFor="" className="form-label"> Sell / Rent </label>
                <div className="form-buttons">
                    <Button
                        className={formData.type === "sale" ? "form-button-active" : "form-button"}
                        id={"type"}
                        value={'sale'}
                        onClick={onChange}
                        >
                        Sell
                    </Button>

                    <Button
                        className={formData.type === "rent" ? "form-button-active" : "form-button"}
                        id={"type"}
                        value={'rent'}
                        onClick={onChange}
                        >
                        Rent
                    </Button>
                </div>

                <FormInput
                    type='text' 
                    name='name'
                    id="name"
                    label='Name'
                    className='form-input-name'
                    placeholder='Name'
                    maxLength={32}
                    minLength={10}
                    value={formData.name}
                    onChange={onChange}
                />

                {/* BEDROOM AND BATHROOMS */}
                <div className="flex">
                    <FormInput
                        label='Bathrooms'
                        type='number' 
                        id="bathrooms"
                        name='bathrooms'
                        className='form-input-small'
                        noDefaultClasses={true}
                        min={'1'}
                        max={'50'}
                        value={formData.bathrooms}
                        onChange={onChange}
                    />

                    <FormInput
                        label='Bedrooms'
                        type='number' 
                        id="bedrooms"
                        name='bedrooms'
                        className='form-input-small'
                        noDefaultClasses={true}
                        min={'1'}
                        max={'50'}
                        value={formData.bedrooms}
                        onChange={onChange}
                    />
                </div>
                
                <label htmlFor="" className="form-label"> Parking </label>
                <div className='form-buttons'>
                    <Button
                        className={formData.parking ? "form-button-active" : "form-button"}
                        id={"parking"}
                        name={"parking"}
                        value={"true"}
                        onClick={onChange}
                        >
                        Yes
                    </Button>

                    <Button
                        className={!formData.parking ? "form-button-active" : "form-button"}
                        id={"parking"}
                        name={"parking"}
                        value={"false"}
                        onClick={onChange}
                        >
                        No
                    </Button>
                </div>

                <label htmlFor="" className="form-label"> Furnished </label>
                <div className='form-buttons'>
                    <Button
                        className={formData.furnished ? "form-button-active" : "form-button"}
                        id={"furnished"}
                        name={"furnished"}
                        value={"true"}
                        onClick={onChange}
                        >
                        Yes
                    </Button>

                    <Button
                        className={!formData.furnished ? "form-button-active" : "form-button"}
                        id={"furnished"}
                        name={"furnished"}
                        value={"false"}
                        onClick={onChange}
                        >
                        No
                    </Button>
                </div>

                <TextArea
                    label='Address'
                    id='address'
                    className='form-input-address'
                    noDefaultClasses={true}
                    value={formData.address!}
                    onChange={onChange}
                />

                {
                    !geoLocEnabled && (
                        <div className="form-lat-lng flex">
                            <FormInput
                                label='Latitude'
                                type='number' 
                                id="latitude"
                                name='latitude'
                                className='form-input-small'
                                noDefaultClasses={true}
                                value={formData.latitude}
                                onChange={onChange}
                                required={true}
                            />

                            <FormInput
                                label='Longitude'
                                type='number' 
                                id="longitude"
                                name='longitude'
                                className='form-input-small'
                                noDefaultClasses={true}
                                value={formData.longitude}
                                onChange={onChange}
                                required={true}
                            />
                        </div>
                    )}

                <label htmlFor="" className="form-label"> Offer </label>
                <div className="form-buttons">
                    <Button
                        className={formData.offer ? "form-button-active" : "form-button"}
                        id={'offer'}
                        value={'true'}
                        onClick={onChange}
                        >
                        Yes
                    </Button>

                    <Button
                        className={!formData.offer ? "form-button-active" : "form-button"}
                        id={'offer'}
                        value={'false'}
                        onClick={onChange}
                        >
                        No
                    </Button>
                </div>
                
                <div className="form-price-div">
                    <FormInput
                        label="Regular Price"
                        type='number' 
                        id="regularPrice"
                        name='regularPrice'
                        className='form-input-small'
                        noDefaultClasses={true}
                        min={'50'}
                        max={'75000000'}
                        value={formData.regularPrice}
                        onChange={onChange}
                        required={true}
                    />
                    {formData.type === "rent" && (
                        <p className="form-price-text">
                            $ /Month
                        </p>
                    )}
                </div>
                
                {
                    formData.offer && (
                        <FormInput
                            label='Discounted Price'
                            type='number' 
                            id="discountedPrice"
                            name='discountedPrice'
                            className='form-input-small'
                            noDefaultClasses={true}
                            min={'50'}
                            max={'75000000'}
                            value={formData.discountedPrice}
                            onChange={onChange}
                            required={true}
                        />
                    )
                }

                <FormInput
                    label='Images (max 6)'
                    type='file' 
                    id="images"
                    name='images'
                    className='form-input-file'
                    noDefaultClasses={true}
                    max={'6'}
                    onChange={onChange}
                    multiple={true}
                    required={true}
                />

                <Button type={'submit'} className='btn btn-primary m-2'>
                    Save Listing
                </Button>

            </form>
        </main>
    </div>
  )
}

export default EditListing;
