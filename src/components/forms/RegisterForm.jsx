// import { Form, Input, InputNumber, Radio } from 'antd'
// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom'
// import TextArea from 'antd/es/input/TextArea';

// export default function Signup({ baseUrl }) {
//   let navigate = useNavigate()
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false)
//   const [toggle, setToggle] = useState(1);
  
//   useEffect(() => {
//     localStorage.removeItem('adminToken');
//   }, [])

//   const validateEmail = (rule, value) => {
//     if (value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
//       return Promise.reject('Please enter a valid email address');
//     } else {
//       return Promise.resolve();
//     }
//   };

//   const validatephone = (rule, value) => {
//     if (value === '' || value?.length === 0 || value === null) {
//       return Promise.reject('Please enter your phone');
//     }
//     if (!value.match('^01[0-2,5]{1}[0-9]{8}$')) {
//       return Promise.reject('Please enter a valid phone number');
//     } else {
//       return Promise.resolve();
//     }
//   };

//   const validateage = (rule, value) => {
//     if (value === '' || value?.length === 0 || value === null) {
//       return Promise.reject('Please enter your age');
//     }
//     if (value < 17) {
//       return Promise.reject('Sorry you must be 17yo at least to use our app');
//     } else {
//       return Promise.resolve();
//     }
//   };

//   const onFinishUser = (values) => {
//     sendUserData(values);
//   };
  
//   const onFinishCompany = (values) => {
//     sendCompanyData(values);
//   };

//   async function sendUserData(values) {
//     setIsLoading(true)
//     await axios.post(`http://localhost:8000/api/auth/register/user`, values)
//       .then((response) => {
//         console.log('login', response.data);
//         if (response.data.data.role === "admin" && response.data.data.active) {
//           localStorage.setItem('adminToken', response.data.token)
//           navigate('/home')
//         } else {
//           setError("Sorry you don't have access to this website");
//           setIsLoading(false)
//         }
//         setIsLoading(false)
//       }).catch((error) => {
//         console.log(error)
//         if (error?.response?.status === 403)
//           setError("Invalid email or password");
//         setIsLoading(false)
//       })
//   }

//   async function sendCompanyData(values) {
//     setIsLoading(true)
//     await axios.post(`http://localhost:8000/api/auth/register/company`, values)
//       .then((response) => {
//         console.log('login', response.data);
//         if (response.data.data.role === "admin" && response.data.data.active) {
//           localStorage.setItem('adminToken', response.data.token)
//           navigate('/home')
//         } else {
//           setError("Sorry you don't have access to this website");
//           setIsLoading(false)
//         }
//         setIsLoading(false)
//       }).catch((error) => {
//         console.log(error)
//         if (error?.response?.status === 403)
//           setError("Invalid email or password");
//         setIsLoading(false)
//       })
//   }

//   return (
//     <>
//       {/* Desktop version */}
//       <div className="w-full hidden md:block">
//         <div className="flex flex-row">
//           {/* The content half */}
//           <div className="w-1/6 md:w-1/2 lg:w-5/12 xl:w-1/3 flex flex-col justify-center items-center py-5">
//             <div className="w-full">
//               <div className="px-4 mx-auto">
//                 <div className="mx-auto">
//                   <div className="text-center text-2xl font-bold tracking-wide text-gray-900">
//                     Welcome to <span className="text-blue-600">ProfyBal</span>
//                   </div>
//                   <p className="text-gray-500 text-center">Create new account</p>
                  
//                   {/* Custom toggle buttons with animated indicator */}
//                   <div className="flex justify-center my-3 relative">
//                     <div className="flex bg-gray-100 p-1 rounded-lg relative">
//                       {/* Yellow moving indicator */}
//                       <div 
//                         className={`absolute top-1 bottom-1 w-1/2 bg-yellow-400 rounded-md transition-all duration-300 ease-in-out ${
//                           toggle === 1 ? 'left-1' : 'left-1/2'
//                         }`}
//                       ></div>
                      
//                       {/* Toggle buttons */}
//                       <button 
//                         onClick={() => setToggle(1)} 
//                         className={`z-10 py-2 px-4 rounded-md transition-colors duration-300 ${
//                           toggle === 1 ? 'text-gray-800 font-medium' : 'text-gray-600'
//                         } flex items-center justify-center relative`}
//                       >
//                         <i className="fa-regular fa-user mr-2"></i>User
//                       </button>
//                       <button 
//                         onClick={() => setToggle(2)} 
//                         className={`z-10 py-2 px-4 rounded-md transition-colors duration-300 ${
//                           toggle === 2 ? 'text-gray-800 font-medium' : 'text-gray-600'
//                         } flex items-center justify-center relative`}
//                       >
//                         <i className="fa-regular fa-building mr-2"></i>Company
//                       </button>
//                     </div>
//                   </div>

//                   {toggle === 1 ? (
//                     <Form onFinish={onFinishUser} initialValues={{ remember: false }}>
//                       <div>
//                         {error && (
//                           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center text-sm mb-4">
//                             {error}
//                           </div>
//                         )}
//                       </div>

//                       <Form.Item
//                         name="username"
//                         className="mb-4"
//                         rules={[
//                           {
//                             required: true,
//                             message: 'Please enter your account User name!',
//                           },
//                         ]}
//                       >
//                         <Input
//                           size="large"
//                           className="py-2"
//                           placeholder="User name" 
//                           prefix={<i className="fa-regular fa-user text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                       </Form.Item>

//                       <Form.Item
//                         name="Fname"
//                         className="mb-4"
//                         rules={[
//                           {
//                             required: true,
//                             message: 'Please enter your First name!',
//                           },
//                         ]}
//                       >
//                         <Input
//                           size="large"
//                           className="py-2"
//                           placeholder="First name" 
//                           prefix={<i className="fa-regular fa-user text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                       </Form.Item>

//                       <Form.Item
//                         name="Lname"
//                         className="mb-4"
//                         rules={[
//                           {
//                             required: true,
//                             message: 'Please enter your Last name!',
//                           },
//                         ]}
//                       >
//                         <Input
//                           size="large"
//                           className="py-2"
//                           placeholder="Last name" 
//                           prefix={<i className="fa-regular fa-user text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                       </Form.Item>

//                       <Form.Item
//                         name="phone"
//                         className="mb-4"
//                         rules={[
//                           { validator: validatephone },
//                         ]}
//                       >
//                         <Input 
//                           size="large" 
//                           className="w-full" 
//                           placeholder="Phone number" 
//                           prefix={<i className="fa fa-phone text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                       </Form.Item>

//                       <Form.Item
//                         name="age"
//                         className="mb-4"
//                         rules={[
//                           { validator: validateage },
//                         ]}
//                       >
//                         <InputNumber 
//                           min={1} 
//                           max={99} 
//                           size="large" 
//                           className="w-full" 
//                           placeholder="Age" 
//                           prefix={<i className="fa-regular fa-calendar text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                       </Form.Item>

//                       <Form.Item
//                         name="email"
//                         className="mb-4"
//                         rules={[
//                           {
//                             required: true,
//                             message: 'Please enter your email!',
//                           },
//                           { validator: validateEmail },
//                         ]}
//                       >
//                         <Input
//                           size="large"
//                           className="py-2"
//                           placeholder="Email" 
//                           prefix={<i className="fa-regular fa-envelope text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                       </Form.Item>

//                       <Form.Item
//                         name="password"
//                         className="mb-4"
//                         rules={[{ required: true, message: 'Please enter your password' }]}
//                       >
//                         <Input.Password 
//                           size="large" 
//                           className="py-2" 
//                           placeholder="Password" 
//                           prefix={<i className="fa-solid fa-lock text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                         <p className="text-gray-500 text-sm">Your password must have at least 8 characters</p>
//                       </Form.Item>

//                       <Form.Item>
//                         <button 
//                           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
//                           type="submit"
//                         >
//                           {isLoading ? "Loading..." : "Sign In"}
//                         </button>
//                       </Form.Item>

//                       <div className="text-center mt-4">
//                         <p className="font-bold">
//                           Already have an account?
//                           <Link className="text-blue-600 hover:text-blue-800 ml-1" to="/sign-up">
//                             Sign up
//                           </Link>
//                         </p>
//                       </div>
//                     </Form>
//                   ) : (
//                     <Form onFinish={onFinishCompany} initialValues={{ remember: false }}>
//                       <div>
//                         {error && (
//                           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center text-sm mb-4">
//                             {error}
//                           </div>
//                         )}
//                       </div>

//                       <Form.Item
//                         name="username"
//                         className="mb-4"
//                         rules={[
//                           {
//                             required: true,
//                             message: 'Please enter your account User name!',
//                           },
//                         ]}
//                       >
//                         <Input
//                           size="large"
//                           className="py-2"
//                           placeholder="User name" 
//                           prefix={<i className="fa-regular fa-user text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                       </Form.Item>

//                       <Form.Item
//                         name="address"
//                         className="mb-4"
//                         rules={[
//                           {
//                             required: true,
//                             message: 'Please enter your Company address',
//                           },
//                         ]}
//                       >
//                         <Input
//                           size="large"
//                           className="py-2"
//                           placeholder="Address" 
//                           prefix={<i className="fa-regular fa-building text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                       </Form.Item>

//                       <Form.Item
//                         name="info"
//                         className="mb-4"
//                         rules={[
//                           {
//                             required: true,
//                             message: 'Please enter your Company info',
//                           },
//                         ]}
//                       >
//                         <Input
//                           size="large"
//                           className="py-2"
//                           placeholder="Company info" 
//                           prefix={<i className="fa fa-info-circle text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                       </Form.Item>

//                       <Form.Item
//                         name="email"
//                         className="mb-4"
//                         rules={[
//                           {
//                             required: true,
//                             message: 'Please enter your email!',
//                           },
//                           { validator: validateEmail },
//                         ]}
//                       >
//                         <Input
//                           size="large"
//                           className="py-2"
//                           placeholder="Email" 
//                           prefix={<i className="fa-regular fa-envelope text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                       </Form.Item>

//                       <Form.Item
//                         name="password"
//                         className="mb-4"
//                         rules={[{ required: true, message: 'Please enter your password' }]}
//                       >
//                         <Input.Password 
//                           size="large" 
//                           className="py-2" 
//                           placeholder="Password" 
//                           prefix={<i className="fa-solid fa-lock text-lg mr-2"></i>} 
//                           onChange={() => setError('')} 
//                         />
//                         <p className="text-gray-500 text-sm mb-0">Your password must have at least 8 characters</p>
//                       </Form.Item>

//                       <Form.Item>
//                         <button 
//                           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
//                           type="submit"
//                         >
//                           {isLoading ? "Loading..." : "Sign In"}
//                         </button>
//                       </Form.Item>

//                       <div className="text-center mt-4">
//                         <p className="font-bold">
//                           Already have an account?
//                           <Link className="text-blue-600 hover:text-blue-800 ml-1" to="/sign-up">
//                             Sign up
//                           </Link>
//                         </p>
//                       </div>
//                     </Form>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* The image half */}
//           <div className="w-5/6 md:w-1/2 lg:w-7/12 xl:w-2/3 p-0 hidden md:flex bg-cover bg-center shadow-md bg-image-login">
//             <div className="w-full h-full bg-black bg-opacity-10"></div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile version */}
//       <div className="w-full md:hidden block">
//         <div className="flex flex-col">
//           {/* The image half */}
//           <div className="bg-cover bg-center bg-image-login">
//             <div className="bg-black bg-opacity-25 min-h-screen w-full flex justify-center items-center">
//               <div className="flex items-center bg-white p-5 rounded-lg shadow-sm">
//                 <div className="w-full">
//                   <div className="mx-auto">
//                     <div className="text-2xl font-bold tracking-wide text-gray-900">
//                       Welcome to <span className="text-blue-600">ProfyBal</span>
//                     </div>
//                     <p className="text-gray-500">Create new account</p>
                    
//                     {/* Custom toggle buttons with animated indicator for mobile */}
//                     <div className="flex justify-center my-3 relative">
//                       <div className="flex bg-gray-100 p-1 rounded-lg relative w-full">
//                         {/* Yellow moving indicator */}
//                         <div 
//                           className={`absolute top-1 bottom-1 w-1/2 bg-yellow-400 rounded-md transition-all duration-300 ease-in-out ${
//                             toggle === 1 ? 'left-1' : 'left-1/2'
//                           }`}
//                         ></div>
                        
//                         {/* Toggle buttons */}
//                         <button 
//                           onClick={() => setToggle(1)} 
//                           className={`z-10 py-2 px-4 rounded-md transition-colors duration-300 flex-1 ${
//                             toggle === 1 ? 'text-gray-800 font-medium' : 'text-gray-600'
//                           } flex items-center justify-center relative`}
//                         >
//                           <i className="fa-regular fa-user mr-2"></i>User
//                         </button>
//                         <button 
//                           onClick={() => setToggle(2)} 
//                           className={`z-10 py-2 px-4 rounded-md transition-colors duration-300 flex-1 ${
//                             toggle === 2 ? 'text-gray-800 font-medium' : 'text-gray-600'
//                           } flex items-center justify-center relative`}
//                         >
//                           <i className="fa-regular fa-building mr-2"></i>Company
//                         </button>
//                       </div>
//                     </div>
                    
//                     {toggle === 1 ? (
//                       <Form onFinish={onFinishUser} initialValues={{ remember: false }}>
//                         <div>
//                           {error && (
//                             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center text-sm mb-4">
//                               {error}
//                             </div>
//                           )}
//                         </div>

//                         <Form.Item
//                           name="username"
//                           className="mb-4"
//                           rules={[
//                             {
//                               required: true,
//                               message: 'Please enter your account User name!',
//                             },
//                           ]}
//                         >
//                           <Input
//                             size="large"
//                             className="py-2"
//                             placeholder="User name" 
//                             prefix={<i className="fa-regular fa-user text-lg mr-2"></i>} 
//                             onChange={() => setError('')} 
//                           />
//                         </Form.Item>

//                         <Form.Item
//                           name="Fname"
//                           className="mb-4"
//                           rules={[
//                             {
//                               required: true,
//                               message: 'Please enter your First name!',
//                             },
//                           ]}
//                         >
//                           <Input
//                             size="large"
//                             className="py-2"
//                             placeholder="First name" 
//                             prefix={<i className="fa-regular fa-user text-lg mr-2"></i>} 
//                             onChange={() => setError('')} 
//                           />
//                         </Form.Item>

//                         <Form.Item
//                           name="Lname"
//                           className="mb-4"
//                           rules={[
//                             {
//                               required: true,
//                               message: 'Please enter your Last name!',
//                             },
//                           ]}
//                         >
//                           <Input
//                             size="large"
//                             className="py-2"
//                             placeholder="Last name" 
//                             prefix={<i className="fa-regular fa-user text-lg mr-2"></i>} 
//                             onChange={() => setError('')} 
//                           />
//                         </Form.Item>

//                         <Form.Item
//                           name="email"
//                           className="mb-4"
//                           rules={[
//                             {
//                               required: true,
//                               message: 'Please enter your email!',
//                             },
//                             { validator: validateEmail },
//                           ]}
//                         >
//                           <Input
//                             size="large"
//                             className="py-2"
//                             placeholder="Email" 
//                             prefix={<i className="fa-regular fa-envelope text-lg mr-2"></i>} 
//                             onChange={() => setError('')} 
//                           />
//                         </Form.Item>

//                         <Form.Item
//                           name="password"
//                           className="mb-4"
//                           rules={[{ required: true, message: 'Please enter your password' }]}
//                         >
//                           <Input.Password 
//                             size="large" 
//                             className="py-2" 
//                             placeholder="Password" 
//                             prefix={<i className="fa-solid fa-lock text-lg mr-2"></i>} 
//                             onChange={() => setError('')} 
//                           />
//                           <p className="text-gray-500 text-sm">Your password must have at least 8 characters</p>
//                         </Form.Item>

//                         <Form.Item>
//                           <button 
//                             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
//                             type="submit"
//                           >
//                             {isLoading ? "Loading..." : "Sign In"}
//                           </button>
//                         </Form.Item>

//                         <div className="text-center mt-4">
//                           <p className="font-bold">
//                             Already have an account?
//                             <Link className="text-blue-600 hover:text-blue-800 ml-1" to="/sign-up">
//                               Sign up
//                             </Link>
//                           </p>
//                         </div>
//                       </Form>
//                     ) : (
//                       <Form onFinish={onFinishCompany} initialValues={{ remember: false }}>
//                         <div>
//                           {error && (
//                             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center text-sm mb-4">
//                               {error}
//                             </div>
//                           )}
//                         </div>

//                         <Form.Item
//                           name="username"
//                           className="mb-4"
//                           rules={[
//                             {
//                               required: true,
//                               message: 'Please enter your account User name!',
//                             },
//                           ]}
//                         >
//                           <Input
//                             size="large"
//                             className="py-2"
//                             placeholder="User name" 
//                             prefix={<i className="fa-regular fa-user text-lg mr-2"></i>} 
//                             onChange={() => setError('')} 
//                           />
//                         </Form.Item>

//                         <Form.Item
//                           name="address"
//                           className="mb-4"
//                           rules={[
//                             {
//                               required: true,
//                               message: 'Please enter your Company address',
//                             },
//                           ]}
//                         >
//                           <Input
//                             size="large"
//                             className="py-2"
//                             placeholder="Address" 
//                             prefix={<i className="fa-regular fa-building text-lg mr-2"></i>} 
//                             onChange={() => setError('')} 
//                           />
//                         </Form.Item>

//                         <Form.Item
//                           name="info"
//                           className="mb-4"
//                           rules={[
//                             {
//                               required: true,
//                               message: 'Please enter your Company info',
//                             },
//                           ]}
//                         >
//                           <Input
//                             size="large"
//                             className="py-2"
//                             placeholder="Company info" 
//                             prefix={<i className="fa fa-info-circle text-lg mr-2"></i>} 
//                             onChange={() => setError('')} 
//                           />
//                         </Form.Item>

//                         <Form.Item
//                           name="email"
//                           className="mb-4"
//                           rules={[
//                             {
//                               required: true,
//                               message: 'Please enter your email!',
//                             },
//                             { validator: validateEmail },
//                           ]}
//                         >
//                           <Input
//                             size="large"
//                             className="py-2"
//                             placeholder="Email" 
//                             prefix={<i className="fa-regular fa-envelope text-lg mr-2"></i>} 
//                             onChange={() => setError('')} 
//                           />
//                         </Form.Item>

//                         <Form.Item
//                           name="password"
//                           className="mb-4"
//                           rules={[{ required: true, message: 'Please enter your password' }]}
//                         >
//                           <Input.Password 
//                             size="large" 
//                             className="py-2" 
//                             placeholder="Password" 
//                             prefix={<i className="fa-solid fa-lock text-lg mr-2"></i>} 
//                             onChange={() => setError('')} 
//                           />
//                           <p className="text-gray-500 text-sm mb-0">Your password must have at least 8 characters</p>
//                         </Form.Item>

//                         <Form.Item>
//                           <button 
//                             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
//                             type="submit"
//                           >
//                             {isLoading ? "Loading..." : "Sign In"}
//                           </button>
//                         </Form.Item>

//                         <div className="text-center mt-4">
//                           <p className="font-bold">
//                             Already have an account?
//                             <Link className="text-blue-600 hover:text-blue-800 ml-1" to="/sign-up">
//                               Sign up
//                             </Link>
//                           </p>
//                         </div>
//                       </Form>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }