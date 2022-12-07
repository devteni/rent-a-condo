import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'react-toastify';


const Contact = () => {
    const [message, setMessage] = useState('');
    const [landlord, setLandlord] = useState<DocumentData>({});
    const [searchParams, setSearchParams] = useSearchParams();

    const { landlordId } = useParams();

    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value);
    }

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(db, 'users', landlordId!);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                setLandlord(docSnap.data());
            } else {
                toast.error('Could not load landlord data');
            }
        };

        getLandlord();

    }, [landlordId])

  return (
    <div className="page-container">
        <header>
            <p className='page-header'> Contact Landlord</p>
        </header>

        { landlord !== null && (
            <main>
                <div className='contact-landlord'>
                    <p className='landlord-name'>Contact {landlord?.name}</p>
                </div>

                <form className='message-form'>
                    <div className="message-div">
                        <label 
                            htmlFor="message"
                            className='message-label'>
                            Message
                        </label>
                        <textarea 
                            name='message' id='message'
                            className='textarea' 
                            value={message}
                            onChange={onChange}
                            >

                        </textarea>
                    </div>

                    <a href={`mailto:${landlord?.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                        <button type='button' className="btn btn-primary">
                            Send message
                        </button>
                    </a>
                </form>
            </main>
        )}
    </div>
  )
}

export default Contact