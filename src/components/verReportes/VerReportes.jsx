import React, { useEffect, useState } from 'react';
import {ref, listAll, getDownloadURL, getMetadata, list } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import CircularProgress from '@mui/material/CircularProgress';
import { storage, db } from '../../firebase'
import './VerReportes.css';
import Card from '../Card/Card'
import { Box } from '@mui/system';

const VerReportes = (props) => {
    const {token} = props;
    const [listFiles, setListFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const queryData = async () => {
        const images = [];
        const docs = [];
        const q = query(collection(db, "reports"), where("email", "==", token.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docs.push(doc.data());
        });

        for await (const doc of docs) {
            const url = await getDownloadURL(ref(storage, doc.url));
            const image = {urlParsed: url, ...doc}
            images.push(image);
            // getDownloadURL(ref(storage, doc.data().url))
            //     .then((url) => {
            //         const image = {urlParsed: url, ...doc.data()}
            //         images.push(image);
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });
          }
        setListFiles(images);
        // console.log(newList);
        console.log(images);
        console.log(listFiles);
    }

    useEffect(() => {
        queryData();
    }, [loading]);

    return (
        <div className="container-cards">
            <Box>
                {listFiles.map((file) => <Card className="card" image={file}/>)} 
           </Box>
        </div>
    )
}

export default VerReportes

// import React, { useEffect, useState } from 'react';
// import {ref, listAll, getDownloadURL, getMetadata, list } from "firebase/storage";
// import CircularProgress from '@mui/material/CircularProgress';
// import {storage} from '../../firebase'
// import './VerReportes.css';
// import Card from '../Card/Card'
// import { FieldPath } from '@firebase/firestore';

// const VerReportes = (props) => {
//     const { token } = props;
//     const [listFiles, setListFiles] = useState([])
//     const [loading, setLoading] = useState(false)
    
//     const queryData = async () => {
//         const listRef = ref(storage, `${token.email}/`);
//         setLoading(true);
//         const elements = [];
//         const firstPage = await list(listRef, { maxResults: 100 });
//         firstPage.items.forEach( async (itemRef) => {
//             const url = await getDownloadURL(itemRef);
//             const metadata = await getMetadata(itemRef);
//             const element = {src: url, description: metadata.customMetadata.imageDescription};
//             setListFiles([element, ...listFiles]);
//             console.log(listFiles);
//         });
//         setLoading(false);
//     }

//     useEffect(() => {
//         queryData();
//     }, [])

//     useEffect(() => {
//         console.log(listFiles);
//     }, [listFiles])

//     return (
//         <div className="container-cards">
//             <h3>Reportes</h3>
//             {/* { loading && <CircularProgress /> } 
//             <Card description='Hola señora buenas tardes' image='https://i.pinimg.com/originals/94/9f/95/949f954ec44c56068d7ad61cbe5cdcd2.jpg'/> */}
//             {listFiles && listFiles.map((file) => <p>{file.description}</p>)}
//         </div>
//     )
// }

// export default VerReportes
