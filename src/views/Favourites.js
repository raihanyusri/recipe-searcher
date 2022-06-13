import React from 'react';
import { Header } from '../components/Navbar';
import { useState } from 'react';
import { db, useAuth } from '../firebase';
import { doc, getDoc, onSnapshot, collection } from '@firebase/firestore';
import { useEffect } from 'react';

export default function Favourites() {
    const [favourites, setFavourites] = useState([]);
    const [loader, setLoader] = useState([]);
    const currentUser = useAuth();

    console.log(currentUser.email)

    // useEffect(() => {
    //     onSnapshot(collection(db, "users", currentUser.email, "likes"), (snapshot) => {
    //         console.log(snapshot.docs.map(doc => doc.data()));
    //     })
    // })

    return (
        <div>
            <Header>
                CookWhat?
            </Header>
        </div>
    )
}
