import { db } from './firebase';
import { collection, addDoc, getDocs, getDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'blogs';

// Create a new blog post
export const createPost = async (postData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...postData,
            createdAt: serverTimestamp(),
            published: true
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating post: ", error);
        throw error;
    }
};

// Get all blog posts
export const getPosts = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                // Handle different timestamp formats or missing dates
                date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }) : 'Just now'
            };
        });
    } catch (error) {
        console.error("Error fetching posts: ", error);
        return []; // Return empty array on error to prevent crash
    }
};

// Get a single post by ID
export const getPostById = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
                date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) : 'Just now'
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching post: ", error);
        throw error;
    }
};
