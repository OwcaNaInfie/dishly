// import React, { useState, useEffect } from 'react';
// import { useAppDispatch } from '../../store';
// import { User, UserGender } from '../../models/User';
// import { auth } from '../../firebaseConfig'
// import { updateUser } from '../../features/auth/authSlice';
// import Button from '../Button/Button';

// const EditUserProfile: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const user = auth.currentUser;

//   const [name, setName] = useState(user?.name || '');
//   const [surname, setSurname] = useState(user?.surname || '');
//   const [gender, setGender] = useState<UserGender>(user?.gender || UserGender.MALE);
//   const [bio, setBio] = useState(user?.bio || '');
//   const [email, setEmail] = useState(user?.email || '');
//   const [telephone, setTelephone] = useState(user?.telephone || '');

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setSurname(user.surname);
//       setGender(user.gender);
//       setBio(user.bio);
//       setEmail(user.email);
//       setTelephone(user.telephone);
//     }
//   }, [user]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!user) return;

//     const updatedUser: User = {
//       ...user,
//       name,
//       surname,
//       gender,
//       bio,
//       email,
//       telephone,
//       displayName: `${name} ${surname}`,
//     };

//     dispatch(updateUser(updatedUser));
//   };

//   return (
//     <form onSubmit={handleSubmit} className='card-body flex flex-col justify-between gap-y-6 border border-neutral'>
//       <div className="relative w-96 mx-auto">
//         <input
//           type="text"
//           className="input input-floating input-lg peer"
//           placeholder="Imię"
//           id='name'
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <label
//           className="input-floating-label"
//           htmlFor="name">
//             Imię
//         </label>
//       </div>
//       <div className="relative w-96 mx-auto">
//         <input
//           type="text"
//           className="input input-floating input-lg peer"
//           placeholder="Nazwisko"
//           id='surname'
//           value={surname}
//           onChange={(e) => setSurname(e.target.value)}
//         />
//         <label
//           className="input-floating-label"
//           htmlFor="surname">
//             Nazwisko
//         </label>
//       </div>
//       <div className="dropdown relative inline-flex rtl:[--placement:bottom-end]">
//         <button id="dropdown-default btn btn-outline" type="button" className="dropdown-toggle btn btn-primary" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
//           {gender}
//           <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
//         </button>
//         <ul className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-default">
//           {Object.values(UserGender).map((genderOption) => (
//             <li key={genderOption}>
//               <a
//                 className="dropdown-item"
//                 href="#"
//                 onClick={() => setGender(genderOption)}
//               >
//                 {genderOption}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="relative w-96 mx-auto">
//         <textarea
//           placeholder="Bio"
//           id='bio'
//           className="textarea textarea-floating peer"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//         ></textarea>
//         <label
//           className="textarea-floating-label"
//           htmlFor="bio">
//             Bio
//         </label>
//       </div>
//       <div className="relative w-96 mx-auto">
//         <input
//           type="email"
//           className="input input-floating input-lg peer"
//           placeholder="Email"
//           id='email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label
//           className="input-floating-label"
//           htmlFor="email">
//             Email
//         </label>
//       </div>
//       <div className="relative w-96 mx-auto">
//         <input
//           type="tel"
//           className="input input-floating input-lg peer"
//           placeholder="Numer telefonu"
//           id='telephone'
//           value={telephone}
//           onChange={(e) => setTelephone(e.target.value)}
//         />
//         <label
//           className="input-floating-label"
//           htmlFor="telephone">
//             Numer telefonu
//         </label>
//       </div>
//       <Button type="submit">Zapisz zmiany</Button>
//     </form>
//   );
// };

// export default EditUserProfile;