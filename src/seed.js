import { collection, addDoc } from 'firebase/firestore';

/* eslint-disable */
// NOTE: replace 'CN92FDRoPpgq0fbMiv6Fjashjl82' with your Firebase auth user id (can be taken from Firebase)
export default async function seedDatabase(firebase) {
  const users = [
    {
      userId: 'CN92FDRoPpgq0fbMiv6Fjashjl82',
      username: 'mark',
      fullName: 'Mark Dodson',
      emailAddress: 'marky.dodson@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now(),
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['CN92FDRoPpgq0fbMiv6Fjashjl82'],
      dateCreated: Date.now(),
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['CN92FDRoPpgq0fbMiv6Fjashjl82'],
      dateCreated: Date.now(),
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['CN92FDRoPpgq0fbMiv6Fjashjl82'],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  try {

    for (let k = 0; k < users.length; k++) {
     let docRef = await addDoc(collection(firebase, 'users'), users[k]);
     console.log('user added with id:', docRef.id);
    }

    // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    let docRef = await addDoc(collection(firebase, 'photos'), 
      {
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!',
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?',
          },
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now(),
      });

     console.log('photo added with id:', docRef.id);

  }


  } catch (e) {
    console.error(e);
  }

  
}
