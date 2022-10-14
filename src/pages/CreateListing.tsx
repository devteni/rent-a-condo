import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/shared/Button'
import FormInput from '../components/shared/FormInput'
import TextArea from '../components/shared/FormInput/TextArea'
import Spinner from '../components/shared/Spinner'
import { auth } from '../lib/firebase'

type FormData = {
    type: string,
    name: string,
    bedrooms: number,
    bathrooms: number,
    parking: boolean,
    furnished: boolean,
    address: string,
    offer: boolean,
    regularPrice: number,
    discountedPrice: number,
    images: Object,
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
    images: {},
    latitude: 0,
    longitude: 0
}

const CreateListing = () => {
    const [geoLocEnabled, setGeoLocEnabled] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>(formDataDefault);

    const navigate = useNavigate();
    const isMounted = useRef(true);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)

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
            console.log(e.target.id, e.target.value)
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
                setFormData({ ...formData, userRef: user.uid})
            } else {
                navigate('/sign-in');
            }
        })
      }
    
      return () => {
        isMounted.current = false;
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    if(loading) {
        return <div className='center-element'>
                <Spinner />
            </div>
    }

  return (
    <div className='profile'>
        <header>
            <p className="page-header">
                Create a Listing
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
                    value={formData.address}
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

                <Button type={'submit'} className='btn primary-btn m-2'>
                    Create Listing
                </Button>

            </form>
        </main>
    </div>
  )
}

export default CreateListing;
