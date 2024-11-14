import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useEffect } from "react";
import { QRCodeCanvas} from 'qrcode.react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import phone from "../assets/phone.png"
import addressImg from "../assets/adress.png"
import whatsapp from "../assets/whatsapp.png"
import insta from "../assets/insta.png"
import { useNavigate} from "react-router-dom";
import snap from "../assets/snap.png"
import yt from "../assets/yt.png"
import tiktok from "../assets/tiktok.png"
import threads from "../assets/threads.png"
import fb from "../assets/fb.png"
import greview from "../assets/greview.png"
import websiteImg from "../assets/web.png"
import emailImg from "../assets/gmail.png"
import ytshorts from "../assets/yt-shorts.png"
import locations from "../assets/location.png"
import eye from "../assets/eye.jpg"
import { IoIosAddCircle } from "react-icons/io";
// import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import "./user.css"
import { Helmet } from 'react-helmet';
import { IoQrCodeSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import vCard from "vcards-js"
import {FacebookShareButton, TelegramShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton} from 'react-share'
import { ImCross } from "react-icons/im";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const User = () => {

  const [show, setShow] = useState(false);
  const [show02, setShow02] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose02 = () => setShow02(false);
  const handleShow02 = () => setShow02(true);
  const navigate = useNavigate();
  const params = useParams();
  // console.log(params)

  const { details } = useAuth();
  // console.log(details)


const toDataURL = async (url) => {

  const response = await axios.get(url, { responseType: "blob" });
  const imageDataUrl = URL.createObjectURL(response.data);

  return imageDataUrl;
};

var _id, companyName,
name,
description,
phone01,
phone02,
address,
clientName,
designation,
whatsapp01,
whatsapp02,
instagramLink,
snapchatLink,
youtubeLink,
tiktokLink,
twitterLink,
facebookLink,
googleReviewLink,
website,
email,
qr,
youtubeShortsLink,
googleMapLink,
menuLink,
images,
logo,
location,
romanName,
password,
img01,
img02,
img03,
img04,
img05,
img06,
img07,
img08,
img09,
img10,
flag;


  for(let i=0; i < details.length; i++)
  {
    if(details[i]._id == params.id)
      {
        companyName = details[i].companyName;
        name = details[i].name;
        description = details[i].description;
        phone01 = details[i].phone01;
        phone02 = details[i].phone02;
        address = details[i].address;
        clientName = details[i].clientName;
        designation = details[i].designation;
        whatsapp01 = details[i].whatsapp01;
        whatsapp02 = details[i].whatsapp02;
        instagramLink = details[i].instagramLink;
        snapchatLink = details[i].snapchatLink;
        youtubeLink = details[i].youtubeLink;
        tiktokLink = details[i].tiktokLink;
        twitterLink = details[i].twitterLink;
        facebookLink = details[i].facebookLink;
        googleReviewLink = details[i].googleReviewLink;
        website = details[i].website;
        email = details[i].email;
        qr = details[i].qr;
        youtubeShortsLink = details[i].youtubeShortsLink;
        googleMapLink = details[i].googleMapLink;
        menuLink = details[i].menuLink;
        images = details[i].images;
        logo = details[i].logo;
        location = details[i].location;
        romanName = details[i].romanName;
        password = details[i].password;
        flag = details[i].flag;
        img01 = details[i].img01;
        img02 = details[i].img02;
        img03 = details[i].img03;
        img04 = details[i].img04;
        img05 = details[i].img05;
        img06 = details[i].img06;
        img07 = details[i].img07;
        img08 = details[i].img08;
        img09 = details[i].img09;
        img10 = details[i].img10;
        _id = details[i]._id;
    }
  }

  // console.log(companyName)
  // console.log(name)


var [visitCount, setVisitCount] = useState(0);
var clientId = _id; 

// Used it for a Client make it dynamic by fetching the current client id

  useEffect(() => {
    const fetchAndIncrementVisitCount = async () => {
      try {
        // console.log("Fetching visit count...");
        const incrementResponse = await axios.post(`${apiUrl}/api/visit/${clientId}`);
        // console.log("Current visit count fetched.");
        setVisitCount(incrementResponse.data.count);
        // console.log(`Visit count for client ${clientId} incremented. New count:`, incrementResponse.data.count);
      } catch (error) {
        console.error("Error fetching or incrementing visit count:", error);
      }
    };

    fetchAndIncrementVisitCount();
  }, [clientId]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const downloadContactCard = async () => {
   
    // Create a vCard file
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:${name};;;;
FN:${companyName}
TEL;CELL:${phone01}
TEL;CELL:${phone02}
EMAIL;HOME:${email}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

  
        const newLink = document.createElement('a');
        newLink.download = `${companyName}.vcf`;
        newLink.href = url;
        newLink.click();
    }

    const downloadQr = (rootEle) => {
      const input = document.getElementById(rootEle);
      html2canvas(input)
          .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF();
              pdf.addImage(imgData, 'JPEG', 0, 0);
              pdf.save(`QR.pdf`);
          })
  }

  const toDataURL02 = async (url) => {

  const response = await axios.get(url, { responseType: "blob" });
  const imageDataUrl = URL.createObjectURL(response.data);
    
  return imageDataUrl;
};
const downloadImg = async(link) => {
    // text content
    const a = document.createElement("a");
    a.href = await toDataURL02(link);
    a.download = "QR.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}




const currentPageUrl = window.location.href;
const [editName, setEditName ]= useState(false)
const [editRomanName, setEditRomanName ]= useState(false)
const [editClientName, setEditClientName ]= useState(false)
const [editPhone01, setEditPhone01]= useState(false)
const [editPhone02, setEditPhone02]= useState(false)
const [editDesignation, setEditDesignation]= useState(false)
const [editEmail, setEditEmail]= useState(false)
const [editEmail02, setEditEmail02]= useState(false)
const [editDescription, setEditDescription]= useState(false)
const [editGMap, setEditGMap]= useState(false)
const [editWhatsapp01, setEditWhatsapp01 ]= useState(false)
const [editWhatsapp02, setEditWhatsapp02 ]= useState(false)
const [editInstagram, setEditInstagram ]= useState(false)
const [editSnapchat, setEditSnapchat]= useState(false)
const [editYoutube, setEditYoutube]= useState(false)
const [editYoutubeShorts, setEditYoutubeShorts]= useState(false)
const [editTiktok, setEditTiktok]= useState(false)
const [editTwitter, setEditTwitter]= useState(false)
const [editFacebook, setEditFacebook]= useState(false)
const [editGReview, setEditGReview]= useState(false)
const [editWebsite, setEditWebsite]= useState(false)
const [editAddress, setEditAddress]= useState(false)
const [successful, setSuccessful] = useState(false)

const [modal, setModal] = useState(false);
const [modal01, setModal01] = useState(false);
const [modal02, setModal02] = useState(false);
const [modal03, setModal03] = useState(false);
const [modal04, setModal04] = useState(false);
const [modal05, setModal05] = useState(false);
const [modal06, setModal06] = useState(false);
const [modal07, setModal07] = useState(false);
const [modal08, setModal08] = useState(false);
const [modal09, setModal09] = useState(false);
const [modal10, setModal10] = useState(false);
const [modal11, setModal11] = useState(false);
const [modal12, setModal12] = useState(false);
const [modal13, setModal13] = useState(false);
const [modal14, setModal14] = useState(false);
const [modal15, setModal15] = useState(false);
const [modal16, setModal16] = useState(false);
const [modal17, setModal17] = useState(false);
const [modal18, setModal18] = useState(false);
const [modal19, setModal19] = useState(false);
const [modal20, setModal20] = useState(false);
const [modal21, setModal21] = useState(false);
const [selected, setSelected] = useState("");

const handleEditName = async (id) => {
  var newName = document.getElementById('name').value;
  console.log(newName)
  if(newName == "")
    {
      newName = name;
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      name: newName
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddName = async (id) => {
  var addName = document.getElementById('add-link').value;
  console.log(addName) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      name: addName
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteName = async (id) => {
   // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      name: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleEditRomanName = async (id) => {
  var newNameRoman = document.getElementById('roman-name').value;
  console.log(newNameRoman)
  if(newNameRoman == "")
    {
      newNameRoman = romanName;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      romanName: newNameRoman
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddRomanName = async (id) => {
  var addRomanName = document.getElementById('add-link').value;
  console.log(addRomanName) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      romanName: addRomanName
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteRomanName = async (id) => {
   // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      romanName: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleEditClientName = async (id) => {
  var newClientName = document.getElementById('client-name').value;
  console.log(newClientName )
  if(newClientName  == "")
    {
      newClientName  = clientName;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      clientName: newClientName 
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddClientName = async (id) => {
  var addClientName = document.getElementById('add-link').value;
  console.log(addClientName) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      clientName: addClientName
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteClientName = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     clientName: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditDesignation = async (id) => {
  var newDesignation = document.getElementById('designation').value;
  console.log(newDesignation )
  if(newDesignation  == "")
    {
      newDesignation  = designation;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      designation: newDesignation 
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteDesignation = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     designation: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditEmail = async (id) => {
  var newEmail = document.getElementById('email').value;
  console.log(newEmail )
  if(newEmail  == "")
    {
      newEmail  = email;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      email: newEmail
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddEmail = async (id) => {
  var addEmail = document.getElementById('add-link').value;
  console.log(addEmail) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      email: addEmail
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteEmail = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     email: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditEmail02 = async (id) => {
  var newEmail02 = document.getElementById('email02').value;
  console.log(newEmail02 )
  if(newEmail02  == "")
    {
      newEmail02  = email;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      email: newEmail02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteEmail02 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     email: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditDescription = async (id) => {
  var newDescription = document.getElementById('email').value;
  console.log(newDescription )
  if(newDescription  == "")
    {
      newDescription = description;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      description:newDescription
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteDescription = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     description: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditPhone01 = async (id) => {
  var newPhone01 = document.getElementById('phone01').value;
  console.log(newPhone01)
  if(newPhone01 == "")
    {
      newPhone01 = phone01;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      phone01: newPhone01
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddPhone01 = async (id) => {
  var addPhone01= document.getElementById('add-link').value;
  console.log(addPhone01) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      phone01: addPhone01
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeletePhone01 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     phone01: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditPhone02 = async (id) => {
  var newPhone02 = document.getElementById('phone02').value;
  console.log(newPhone02)
  if(newPhone02 == "")
    {
      newPhone02 = phone02;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      phone02: newPhone02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddPhone02 = async (id) => {
  var addPhone02= document.getElementById('add-link').value;
  console.log(addPhone02) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      phone02: addPhone02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeletePhone02 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     phone02: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditGMap = async (id) => {
  var newGMap = document.getElementById('g-map').value;
  console.log(newGMap)
  if(newGMap == "")
    {
      newGMap = googleMapLink;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      googleMapLink: newGMap
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddGMap = async (id) => {
  var addGMap= document.getElementById('add-link').value;
  console.log(addGMap) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      googleMapLink: addGMap
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteGMap = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     googleMapLink: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditWhatsapp01 = async (id) => {
  var newWhatsapp01 = document.getElementById('whatsapp01').value;
  console.log(newWhatsapp01)
  if(newWhatsapp01 == "")
    {
      newWhatsapp01 = whatsapp01;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      whatsapp01: newWhatsapp01
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteWhatsapp01 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     whatsapp01: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditWhatsapp02 = async (id) => {
  var newWhatsapp02 = document.getElementById('whatsapp02').value;
  console.log(newWhatsapp02)
  if(newWhatsapp02 == "")
    {
      newWhatsapp02 = whatsapp02;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      whatsapp02: newWhatsapp02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddWhatsapp02 = async (id) => {
  var addWhatsapp02= document.getElementById('add-link').value;
  console.log(addWhatsapp02) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      whatsapp02: addWhatsapp02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteWhatsapp02 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     whatsapp02: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditInstagram = async (id) => {
  var newInstagram = document.getElementById('instagram').value;
  console.log(newInstagram)
  if(newInstagram == "")
    {
      newInstagram = instagramLink;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      instagramLink: newInstagram
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddInstagram = async (id) => {
  var addInstagram= document.getElementById('add-link').value;
  console.log(addInstagram) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      instagramLink: addInstagram
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteInstagram = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     instagramLink: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditSnapchat = async (id) => {
  var newSnapchat = document.getElementById('snapchat').value;
  console.log(newSnapchat)
  if(newSnapchat == "")
    {
      newSnapchat = snapchatLink;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      snapchatLink: newSnapchat
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddSnapchat = async (id) => {
  var addSnapchat= document.getElementById('add-link').value;
  console.log(addSnapchat) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      snapchatLink: addSnapchat
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteSnapchat = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     snapchatLink: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditYoutube = async (id) => {
  var newYoutube = document.getElementById('youtube').value;
  console.log(newYoutube)
  if(newYoutube == "")
    {
      newYoutube = youtubeLink;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      youtubeLink: newYoutube
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddYoutube = async (id) => {
  var addYoutube= document.getElementById('add-link').value;
  console.log(addYoutube) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      youtubeLink: addYoutube
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteYoutube = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     youtubeLink: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditYoutubeShorts = async (id) => {
  var newYoutubeShorts = document.getElementById('youtube-shorts').value;
  console.log(newYoutubeShorts)
  if(newYoutubeShorts == "")
    {
      newYoutubeShorts = youtubeShortsLink;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      youtubeShortsLink: newYoutubeShorts
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddYoutubeShorts = async (id) => {
  var addYoutubeShorts= document.getElementById('add-link').value;
  console.log(addYoutubeShorts) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      youtubeShortsLink: addYoutubeShorts
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteYoutubeShorts = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     youtubeShortsLink: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditTiktok = async (id) => {
  var newTiktok = document.getElementById('tiktok').value;
  console.log(newTiktok)
  if(newTiktok == "")
    {
      newTiktok = tiktokLink;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      tiktokLink: newTiktok
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddTiktok = async (id) => {
  var addTiktok = document.getElementById('add-link').value;
  console.log(addTiktok) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      tiktokLink: addTiktok
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteTiktok = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     tiktokLink: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditTwitter = async (id) => {
  var newTwitter  = document.getElementById('twitter').value;
  console.log(newTwitter)
  if(newTwitter == "")
    {
      newTwitter = twitterLink;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      twitterLink: newTwitter
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddTwitter = async (id) => {
  var addTwitter = document.getElementById('add-link').value;
  console.log(addTwitter) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      twitterLink: addTwitter
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteTwitter = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     twitterLink: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditFacebook = async (id) => {
  var newFacebook  = document.getElementById('facebook').value;
  console.log(newFacebook )
  if(newFacebook  == "")
    {
      newFacebook  = facebookLink;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      facebookLink: newFacebook 
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddFacebook = async (id) => {
  var addFacebook = document.getElementById('add-link').value;
  console.log(addFacebook) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      facebookLink: addFacebook
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteFacebook = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     facebookLink: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditGReview = async (id) => {
  var newGReview  = document.getElementById('g-review').value;
  console.log(newGReview )
  if(newGReview  == "")
    {
      newGReview  = googleReviewLink;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      googleReviewLink: newGReview 
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddGReview = async (id) => {
  var addGReview = document.getElementById('add-link').value;
  console.log(addGReview) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      googleReviewLink: addGReview
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteGReview = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     googleReviewLink: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditWebsite = async (id) => {
  var newWebsite  = document.getElementById('website').value;
  console.log(newWebsite)
  if(newWebsite  == "")
    {
      newWebsite  = website;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      website: newWebsite 
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddWebsite = async (id) => {
  var addWebsite = document.getElementById('add-link').value;
  console.log(addWebsite) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      website: addWebsite
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteWebsite = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     website: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditAddress = async (id) => {
  var newAddress  = document.getElementById('address').value;
  console.log(newAddress)
  if(newAddress  == "")
    {
      newAddress  = address;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
      address: newAddress 
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddAddress = async (id) => {
  var addAddress = document.getElementById('add-link').value;
  console.log(addAddress) // Get the new name from the input
  try {
    const response = await axios.put(`${apiUrl}/api/data/add/${id}`, {
      address: addAddress
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteAddress = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`${apiUrl}/api/data/update/${id}`, {
     address: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};

const inputField = document.getElementById('add-link');
console.log(inputField)

  if(_id == params.id)
  {      return(
  
  <div>
  { show && <div className="qr-modal"
        style={{ display: 'block', position: 'initial' }}
      >
        
        
          <ImCross className="close" onClick={handleClose} />
         
            <div className="qr-div">
          <QRCodeCanvas id="qr" className="qr"  value={window.location.href} />
          </div>
          <div className="qr2-div">
          <div className="qr-btn2" onClick={()=>{
                    downloadQr("qr")
                    handleClose()
        }} >
              <FaDownload size={30} color="white" />
          </div>
     </div>
  </div>}

  { !show && !show02 &&
    <section className="main">
   <div style={{display:"flex", alignItems:"center", justifyContent:"center", paddingBlock:"10px", gap:"10px"}}>
          <button style={{color:"white", fontSize:"17px", paddingBlock:"8px", paddingInline:"30px", backgroundColor:"rgb(22, 33, 92)", border:"1px solid white", borderRadius:"5px"}} onClick={
            ()=>{
              navigate(`/signin`)
            }
          }>Logout</button>
        </div>
    <Helmet>
    <title>{name}</title>
    </Helmet>

    <img src={images} className="bg-img" alt=""></img>
    <div className="logo-div">
    <img src={logo} className="logo22" alt=""></img>
    </div>

    <div>
          { (name!= "") && <div>{!editName && <div className="eng-heading">
                  <span>{name}</span> 
                  <FaEdit style={{marginInlineStart:"15px",marginInlineEnd:"8px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditName(true)}}/>
                  <span>
                 <MdDelete color={"rgb(22,33,92)"}
                    size={22} onClick={()=>{
                    setModal(true)
                    
                  }}/></span>
                  </div>}
                      {editName && <div className="eng-heading">
                      <input id="name"
                      placeholder="" style={{ paddingBlock:"8px"}} /> 
                      <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditName(_id) 
                        window.location.reload()
                        setEditName(false)}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditName(false)}}>&#x2716;</span>
                      
                      </div>} 
                      {
                        modal && <div className="">
                           <div style={{textAlign:"center", fontSize:"15px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", alignItems:"center", "justifyContent":"center"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteName(_id)
                                  window.location.reload()
                                  setModal(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>
                      }
                      
                      </div>}
              
          { (romanName!= "") && <div>{!editRomanName && <div className="roman-heading">
                  <span>{romanName}</span> 
                  <FaEdit style={{marginInlineStart:"15px",marginInlineEnd:"8px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditRomanName(true)}}/>
                  <span>
                  <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal01(true)
                    
                  }}/></span>
                  </div>}
                      {editRomanName && <div className="roman-heading">
                      <input id="roman-name"
                      placeholder="" style={{ paddingBlock:"8px"}} /> 
                      <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditRomanName(_id) 
                        window.location.reload()
                        setEditRomanName(false)}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditRomanName(false)}}>&#x2716;</span>
                      
                      </div>} 
                      {
                        modal01 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", alignItems:"center", "justifyContent":"center"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal01(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteRomanName(_id)
                                  window.location.reload()
                                  setModal01(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>
                      }
                      
                      </div>}
  
                      <div className="eye">
                  <img src={eye} height={25}></img>
                  <span style={{display:"flex",alignItems:"center",justifyContent:"center",
                  }}>&nbsp;{visitCount} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <div style={{backgroundColor:"rgb(22, 33, 92)", display:"flex",alignItems:"center",justifyContent:"center", border:"1px solid white", borderRadius:"5px", paddingBlock:"10px",paddingInline:"20px" }}>
                  <FaDownload size={20} onClick={downloadContactCard} color="white" />
                  <span style={{display:"flex",alignItems:"center",color:"white",justifyContent:"center"
                  }} onClick={downloadContactCard} >&nbsp;&nbsp;Save Info</span>
                </div>
                </div>

        <div className="info">
          { (clientName!= "") && <div>{!editClientName && <div className="detail02">
                  <span>{clientName}</span> 
                  <FaEdit size={20} color={"rgb(22, 33, 92)"} onClick={()=>{setEditClientName(true)}} style={{marginInlineStart:"15px",marginInlineEnd:"8px"}}/>
                  <span>
                   <MdDelete color={"rgb(22, 33, 92)"}
                    size={20} onClick={()=>{
                 
                    setModal02(true)
                    
                  }}/></span>
                  </div>}
                      {editClientName && <div className="detail02">
                      <input id="client-name"
                      placeholder="" style={{ paddingBlock:"8px"}} /> 
                       <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditClientName(_id) 
                        window.location.reload()
                        setEditClientName(false)}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditClientName(false)}}>&#x2716;</span>
                      
                      </div>} 
                      {
                        modal02 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", alignItems:"center", "justifyContent":"center"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal02(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteClientName(_id)
                                  window.location.reload()
                                  setModal02(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>
                      }
                      
          </div>}
                

          { (designation!= "") && <div>{!editDesignation && <div className="detail">
                  <span>{designation}</span> 
                  <FaEdit size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditDesignation(true)}} style={{marginInlineStart:"15px",marginInlineEnd:"8px"}} />
                  <span>
                   <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal03(true)
                    
                  }}/> </span>
                  </div>}
                      {editDesignation && <div className="detail">
                      <input id="designation"
                      placeholder="" style={{ paddingBlock:"8px"}} /> 
                      <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditDesignation(_id) 
                        window.location.reload()
                        setEditDesignation(false)}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditDesignation(false)}}>&#x2716;</span>
                      
                      </div>} 
                      {
                        modal03 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", alignItems:"center", "justifyContent":"center"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal03(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteDesignation(_id)
                                  window.location.reload()
                                  setModal03(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>
                      }
                      
          </div>}
                     

          <div className="detail">
                   <a href={`tel:${phone01}`} className="link">{phone01}</a> 
                   
                   { (phone02!= "") && <a href={`tel:${phone02}`} className="link"> / {phone02}</a>}
                   
                   
          </div>

          { (email!= "") && <div>{!editEmail && <div className="detail">
                  <span>{email}</span> 
                  <FaEdit style={{marginInlineStart:"15px",marginInlineEnd:"8px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditEmail(true)}}/>
                  <span>
                   {/* <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal04(true)
                    
                  }}/> */}
                  </span>
                  </div>}
                      {editEmail && <div className="detail">
                      <input id="email"
                      placeholder="" style={{ paddingBlock:"8px"}} /> 
                     <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditEmail(_id) 
                        window.location.reload()
                        setEditRomanName(false)}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditEmail(false)}}>&#x2716;</span>
                      
                      </div>} 
                      {
                        modal04 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", alignItems:"center", "justifyContent":"center"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal04(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteEmail(_id)
                                  window.location.reload()
                                  setModal04(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>
                      }
                      
          </div>}   
        </div>

        <div className="description">{ (description!= "") && <div>{!editDescription && <div className="description">
                  <span>{description}</span> 
                  <br /><br />
                  <FaEdit style={{marginInlineStart:"15px",marginInlineEnd:"8px"}} size={23} color={"rgb(22,33,92)"} onClick={()=>{setEditDescription(true)}}/>
                  <span>
                  <MdDelete color={"rgb(22,33,92)"}
                    size={23} onClick={()=>{
                 
                    setModal05(true)
                    
                  }}/></span>
                  </div>}
                      {editDescription && <div className="detail">
                      <input id="description"
                      placeholder="" style={{ paddingBlock:"8px"}} /> 
                      <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditDescription(_id) 
                        window.location.reload()
                        setEditDescription(false)}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditDescription(false)}}>&#x2716;</span>
                      
                      </div>} 
                      {
                        modal05 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", alignItems:"center", "justifyContent":"center"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal05(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteDescription(_id)
                                  window.location.reload()
                                  setModal05(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>
                      }
                      
                      </div>} 
        </div>
  
    </div>


          <hr />
          <div className="social-segment">
          { (phone01 != "") && <a className="link"><div className="socials">
              <img src={phone} height={50} width={50}></img>
            {!modal06 && <div>
             {!editPhone01 && <div >
                <p className="tag-heading">Phone { (flag!= true) &&<span> / الهاتف&nbsp; &nbsp;</span>}
                
               <FaEdit size={20} color={"rgb(22,33,92)"} style={{marginInlineStart:"0",marginInlineEnd:"5px"}} onClick={()=>{setEditPhone01(true)}}/>
               <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal06(true)
                    
                  }}/>
                </p>
                <p className="details">{phone01}</p>
              </div>}</div>}
            {modal06 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal06(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeletePhone01(_id)
                                  window.location.reload()
                                  setModal06(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editPhone01 && <div>
                <p className="tag-heading">Phone { (flag!= true) &&<span> / الهاتف</span>}</p>
                <div><input id="phone01" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"15px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditPhone01(_id) 
                        setEditPhone01(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditPhone01(false)}}>&#x2716;</span>
              </div>
              </div>}
            </div></a>}
          { (phone02 != "") && <a className="link"><div className="socials">
              <img src={phone} height={50} width={50}></img>
            {!modal07 && <div>
             {!editPhone02 && <div >
                <p className="tag-heading">Phone { (flag!= true) &&<span> / الهاتف&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditPhone02(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal07(true)
                    
                  }}/>
                </p>
                <p className="details">{phone02}</p>
              </div>}</div>}
            {modal07 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal07(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeletePhone02(_id)
                                  window.location.reload()
                                  setModal07(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editPhone02 && <div>
                <p className="tag-heading">Phone { (flag!= true) &&<span> / الهاتف</span>}</p>
                <div><input id="phone01" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditPhone02(_id) 
                        setEditPhone02(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditPhone02(false)}}>&#x2716;</span>
              </div>
              </div>}

            </div></a>}
          { (address != "") && <a className="link"><div className="socials">
              <img src={addressImg} height={50} width={50}></img>
            {!modal08 && <div>
             {!editAddress && <div >
                <p className="tag-heading">Address { (flag!= true) &&<span>  / العنوان&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditAddress(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal08(true)
                    
                  }}/>
                </p>
                <p className="details">{address}</p>
              </div>}</div>}
            {modal08 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal08(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteAddress(_id)
                                  window.location.reload()
                                  setModal08(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editAddress && <div>
                <p className="tag-heading">Address { (flag!= true) &&<span>  / العنوان&nbsp; &nbsp;</span>}</p>
                <div><input id="address" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditAddress(_id) 
                        setEditAddress(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditAddress(false)}}>&#x2716;</span>
              </div>
              </div>}

            </div></a>}
          { (whatsapp01 != "") && <a className="link"><div className="socials">
              <img src={whatsapp} height={50} width={50}></img>
            {!modal09 && <div>
             {!editWhatsapp01 && <div >
                <p className="tag-heading">Whatsapp { (flag!= true) &&<span>  / واتساب&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditWhatsapp01(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal09(true)
                    
                  }}/>
                </p>
                <p className="details">{whatsapp01}</p>
              </div>}</div>}
            {modal09 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal09(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteWhatsapp01(_id)
                                  window.location.reload()
                                  setModal09(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editWhatsapp01 && <div>
                <p className="tag-heading">Whatsapp { (flag!= true) &&<span>  / واتساب&nbsp; &nbsp;</span>}</p>
                <div><input id="whatsapp01" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditWhatsapp01(_id) 
                        setEditWhatsapp01(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditWhatsapp01(false)}}>&#x2716;</span>
              </div>
              </div>}

            </div></a>}
          { (whatsapp02 != "") && <a className="link"><div className="socials">
              <img src={whatsapp} height={50} width={50}></img>
            {!modal10 && <div>
             {!editWhatsapp02 && <div >
                <p className="tag-heading">Whatsapp { (flag!= true) &&<span>  / واتساب&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditWhatsapp02(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal10(true)
                    
                  }}/>
                </p>
                <p className="details">{whatsapp02}</p>
              </div>}</div>}
            {modal10 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal10(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteWhatsapp02(_id)
                                  window.location.reload()
                                  setModal10(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editWhatsapp02 && <div>
                <p className="tag-heading">Whatsapp { (flag!= true) &&<span>  / واتساب&nbsp; &nbsp;</span>}</p>
                <div><input id="whatsapp02" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditWhatsapp02(_id) 
                        setEditWhatsapp02(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditWhatsapp02(false)}}>&#x2716;</span>
              </div>
              </div>}

            </div></a>}
          { (instagramLink != "") && <a className="link"><div className="socials">
              <img src={insta} height={50} width={50}></img>
            {!modal11 && <div>
             {!editInstagram && <div >
                <p className="tag-heading">Instagram { (flag!= true) &&<span>  / انستغرام&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditInstagram(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal11(true)
                    
                  }}/>
                </p>
                <p className="details">{instagramLink}</p>
              </div>}</div>}
            {modal11 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal11(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteInstagram(_id)
                                  window.location.reload()
                                  setModal11(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editInstagram && <div>
                <p className="tag-heading">Instagram { (flag!= true) &&<span>  / انستغرام&nbsp; &nbsp;</span>}</p>
                <div><input id="instagram" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditInstagram(_id) 
                        setEditInstagram(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditInstagram(false)}}>&#x2716;</span>
              </div>
              </div>}
            </div></a>}
          { (snapchatLink != "") && <a className="link"><div className="socials">
              <img src={snap} height={50} width={50}></img>
            {!modal12 && <div>
             {!editSnapchat && <div >
                <p className="tag-heading">Snapchat { (flag!= true) &&<span>   / سناب شات &nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditSnapchat(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal12(true)
                    
                  }}/>
                </p>
                <p className="details">{snapchatLink}</p>
              </div>}</div>}
            {modal12 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal12(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteSnapchat(_id)
                                  window.location.reload()
                                  setModal12(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editSnapchat && <div>
                <p className="tag-heading">Snapchat { (flag!= true) &&<span>  / سناب شات&nbsp; &nbsp;</span>}</p>
                <div><input id="snapchat" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditSnapchat(_id) 
                        setEditSnapchat(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditSnapchat(false)}}>&#x2716;</span>
              </div>
              </div>}
            </div></a>}
          { (youtubeLink != "") && <a className="link"><div className="socials">
              <img src={yt} height={50} width={50}></img>
            {!modal13 && <div>
             {!editYoutube && <div >
                <p className="tag-heading">Youtube { (flag!= true) &&<span> / موقع يوتيوب&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditYoutube(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal13(true)
                    
                  }}/> 
                </p>
                <p className="details">{youtubeLink}</p>
              </div>}</div>}
            {modal13 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal13(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteYoutube(_id)
                                  window.location.reload()
                                  setModal13(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editYoutube && <div>
                <p className="tag-heading">Youtube { (flag!= true) &&<span> / موقع يوتيوب&nbsp; &nbsp;</span>}</p>
                <div><input id="youtube" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditYoutube(_id) 
                        setEditYoutube(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditYoutube(false)}}>&#x2716;</span>
              </div>
              </div>}
            </div></a>}
          { (tiktokLink != "") && <a className="link"><div className="socials">
              <img src={tiktok} height={50} width={50}></img>
            {!modal14 && <div>
             {!editTiktok && <div >
                <p className="tag-heading">Tiktok { (flag!= true) &&<span> / تيك توك&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditTiktok(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal14(true)
                    
                  }}/>
                </p>
                <p className="details">{tiktokLink}</p>
              </div>}</div>}
            {modal14 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal14(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteTiktok(_id)
                                  window.location.reload()
                                  setModal14(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editTiktok && <div>
                <p className="tag-heading">Tiktok { (flag!= true) &&<span> / تيك توك&nbsp; &nbsp;</span>}</p>
                <div><input id="tiktok" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditTiktok(_id) 
                        setEditTiktok(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditTiktok(false)}}>&#x2716;</span>
              </div>
              </div>}
            </div></a>}
          { (twitterLink != "") && <a className="link"><div className="socials">
              <img src={threads} height={50} width={50}></img>
            {!modal15 && <div>
             {!editTwitter && <div >
                <p className="tag-heading">Twitter { (flag!= true) &&<span> / تويتر&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditTwitter(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal15(true)
                    
                  }}/>
                </p>
                <p className="details">{twitterLink}</p>
              </div>}</div>}
            {modal15 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal15(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteTwitter(_id)
                                  window.location.reload()
                                  setModal15(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editTiktok && <div>
                <p className="tag-heading">Twitter { (flag!= true) &&<span> / تويتر&nbsp; &nbsp;</span>}</p>
                <div><input id="twitter" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditTwitter(_id) 
                        setEditTwitter(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditTwitter(false)}}>&#x2716;</span>
              </div>
              </div>}
            </div></a>}
          { (facebookLink != "") && <a className="link"><div className="socials">
              <img src={fb} height={50} width={50}></img>
            {!modal16 && <div>
             {!editFacebook && <div >
                <p className="tag-heading">Facebook { (flag!= true) &&<span> / فيسبوك&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditFacebook(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal16(true)
                    
                  }}/>
                </p>
                <p className="details">{facebookLink}</p>
              </div>}</div>}
            {modal16 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal16(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteFacebook(_id)
                                  window.location.reload()
                                  setModal16(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editFacebook && <div>
                <p className="tag-heading">Facebook { (flag!= true) &&<span> / فيسبوك&nbsp; &nbsp;</span>}</p>
                <div><input id="facebook" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditFacebook(_id) 
                        setEditFacebook(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditFacebook(false)}}>&#x2716;</span>
              </div>
              </div>}
            </div></a>}
          { (googleReviewLink != "") && <a className="link"><div className="socials">
              <img src={greview} height={50} width={50}></img>
            {!modal17 && <div>
             {!editGReview && <div >
                <p className="tag-heading">Google Review { (flag!= true) &&<span> / تقييمات جوجل&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditGReview(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal17(true)
                    
                  }}/>
                </p>
                <p className="details">{googleReviewLink}</p>
              </div>}</div>}
            {modal17 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal17(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteGReview(_id)
                                  window.location.reload()
                                  setModal17(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editGReview && <div>
                <p className="tag-heading">Google Review{ (flag!= true) &&<span> / تقييمات جوجل&nbsp; &nbsp;</span>}</p>
                <div><input id="g-review" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditGReview(_id) 
                        setEditGReview(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditGReview(false)}}>&#x2716;</span>
              </div>
              </div>}
            </div></a>}
          { (website != "") && <a className="link"><div className="socials">
              <img src={websiteImg} height={50} width={50}></img>
            {!modal18 && <div>
             {!editWebsite && <div >
                <p className="tag-heading">Website { (flag!= true) &&<span> / رابط الموقع&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditWebsite(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal18(true)
                    
                  }}/>
                </p>
                <p className="details">{website}</p>
              </div>}</div>}
            {modal18 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal18(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteWebsite(_id)
                                  window.location.reload()
                                  setModal18(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editWebsite && <div>
                <p className="tag-heading">Website{ (flag!= true) &&<span> / رابط الموقع&nbsp; &nbsp;</span>}</p>
                <div><input id="website" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditWebsite(_id) 
                        setEditWebsite(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditWebsite(false)}}>&#x2716;</span>
              </div>
              </div>}
            </div></a>}
          { (email != "") && <a className="link"><div className="socials">
              <img src={emailImg} height={50} width={50}></img>
            {!modal19 && <div>
             {!editEmail02 && <div >
                <p className="tag-heading">Email { (flag!= true) &&<span> / جي ميل&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditEmail02(true)}}/>
                {/* <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal19(true)
                    
                  }}/> */}
                </p>
                <p className="details">{email}</p>
              </div>}</div>}
            {modal19 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal19(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteEmail02(_id)
                                  window.location.reload()
                                  setModal19(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editEmail02 && <div>
                <p className="tag-heading">Email{ (flag!= true) &&<span> / جي ميل&nbsp; &nbsp;</span>}</p>
                <div><input id="email02" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditEmail02(_id) 
                        setEditEmail02(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditEmail02(false)}}>&#x2716;</span>
              </div>
              </div>}
            </div></a>}
          { (youtubeShortsLink != "") && <a className="link"><div className="socials">
              <img src={ytshorts} height={50} width={50}></img>
            {!modal20 && <div>
             {!editYoutubeShorts && <div >
                <p className="tag-heading">Youtube Shorts { (flag!= true) &&<span> / شورت يوتيوب&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditYoutubeShorts(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal20(true)
                    
                  }}/>
                </p>
                <p className="details">{youtubeShortsLink}</p>
              </div>}</div>}
            {modal20 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal20(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteYoutubeShorts(_id)
                                  window.location.reload()
                                  setModal20(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editYoutubeShorts && <div>
                <p className="tag-heading">Youtube Shorts{ (flag!= true) &&<span> / شورت يوتيوب&nbsp; &nbsp;</span>}</p>
                <div><input id="youtube-shorts" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditYoutubeShorts(_id) 
                        setEditYoutubeShorts(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditYoutubeShorts(false)}}>&#x2716;</span>
              </div>
              </div>}
            </div></a>}
          { (googleMapLink != "") && <a className="link"><div className="socials">
              <img src={locations} height={50} width={50}></img>
            {!modal21 && <div>
             {!editGMap && <div >
                <p className="tag-heading">Location { (flag!= true) &&<span>  / خرائط جوجل&nbsp; &nbsp;</span>}
                
                <FaEdit style={{marginInlineStart:"0",marginInlineEnd:"5px"}} size={20} color={"rgb(22,33,92)"} onClick={()=>{setEditGMap(true)}}/>
                <MdDelete color={"rgb(22,33,92)"}
                    size={20} onClick={()=>{
                 
                    setModal21(true)
                    
                  }}/>
                </p>
                <p className="details">{googleMapLink}</p>
              </div>}</div>}
            {modal21 && <div className="">
                           <div style={{textAlign:"center", fontSize:"20px", marginInlineStart:"20px"}}>Are your sure you want to delete?</div>
                              <div style={{display:"flex", marginInlineStart:"20px", alignItems:"center", "justifyContent":"start"}}>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  setModal21(false)
                                }}>CANCEL</button>
                                <button style={{marginInline:"3px", marginBlock:"10px", backgroundColor:"rgb(22, 33, 92)", color:"white", paddingInline:"15px", paddingBlock:"8px", border:"1px solid white", borderRadius:"5px"}} onClick={()=>{
                                  handleDeleteGMap(_id)
                                  window.location.reload()
                                  setModal21(false)
                                }}>CONFIRM</button>
                              </div>
                          </div>}


              {editGMap && <div>
                <p className="tag-heading">Location { (flag!= true) &&<span>   / خرائط جوجل&nbsp; &nbsp;</span>}</p>
                <div><input id="g-map" placeholder="" style={{ paddingBlock:"8px", marginInlineStart:"20px", marginBlockStart:"5px"}} /> 
                <span style={{fontSize:"12px", border:"1px solid white", backgroundColor:"green",borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"8px", color:"white"}} onClick={()=>{ 
                        handleEditGMap(_id) 
                        setEditGMap(false)
                        window.location.reload()}}>&#x2714;</span>
                      <span style={{fontSize:"12px", border:"1px solid white",backgroundColor:"red", borderRadius:"5px", paddingInline:"10px", paddingBlock:"5px", marginInlineStart:"5px",color:"white"}} onClick={()=>{ 
                        setEditGMap(false)}}>&#x2716;</span>
              </div>
              </div>}

            </div></a>}
          { !show02 && <div style={{display:"flex", alignItems:"center"}} onClick={()=>{
            handleShow02()
          }}>
            <IoIosAddCircle color={"rgb(22, 33, 92)"} size={50}/>
            <span style={{fontSize:"18px", marginInlineStart:"15px", fontWeight:"bold", fontFamily:"Arial, Helvetica, sans-serif"}}>Add More Details</span>
            </div>}

          </div>
          <hr />
          <p className="image-gallery-heading">Image Gallery</p>
          <hr />
          <div className="image-gallery">
          { (img01 != "") && <a href={img01}><img src={img01} className="image"></img></a>}
          { (img02 != "") &&  <a href={img02}><img src={img02} className="image"></img></a>}
          { (img03 != "") && <a href={img03}><img src={img03} className="image"></img></a>}
          { (img04 != "") && <a href={img04}><img src={img04} className="image"></img></a>}
          { (img05 != "") &&  <a href={img05}><img src={img05} className="image"></img></a>}
          { (img06 != "") && <a href={img06}><img src={img06} className="image"></img></a>}
          { (img07 != "") && <a href={img07}><img src={img07} className="image"></img></a>}
          { (img08 != "") &&  <a href={img08}><img src={img08} className="image"></img></a>}
          { (img09 != "") &&  <a href={img09}><img src={img09} className="image"></img></a>}
          { (img10 != "") &&  <a href={img10}><img src={img10} className="image"></img></a>}
          </div>
         
          <hr />
          { (location!= "") &&
          <div>
          <p className="image-gallery-heading">Location</p>
          <hr />
          <div className="location">
          <iframe src={location} width="100%" height="300" allowfullscreen="" loading="lazy"></iframe> 
          </div></div>}
          <div className="qr-section">
              <div className="qr-btn" onClick={handleShow} >
              <IoQrCodeSharp size={35} color="white" />
              </div>
       
              <div className="qr-btn" onClick={downloadContactCard} value="download">
              <FaDownload size={30} color="white" />
              </div>
          </div>
  
         <hr />
          <p className="image-gallery-heading">Share On</p>
          <hr />
          {/* <ShareSocial url="localhost.com" socialTypes={["facebook"]} /> */}
          <div className="social-section">
              <div className="social-btn" >
              <FacebookShareButton url={currentPageUrl} quote="please share this" hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}>
              <TiSocialFacebook size={30} color="white" />
              </FacebookShareButton>
              
              </div>
              <div className="social-btn" >
              <TwitterShareButton url={currentPageUrl} quote="please share this" hashtag={`Welcom to ${companyName}. Get to know us at ${currentPageUrl}`}>
              <TiSocialTwitter size={30} color="white" /></TwitterShareButton>
              </div>
              <div className="social-btn" >
              <LinkedinShareButton url={currentPageUrl} quote="please share this" hashtag={`Welcom to ${companyName}. Get to know us at ${currentPageUrl}`}>
              <TiSocialLinkedin size={30} color="white" /></LinkedinShareButton>
              </div>
              <div className="social-btn" >
              <TelegramShareButton url={currentPageUrl} quote="please share this" hashtag={`Welcom to ${companyName}. Get to know us at ${currentPageUrl}`}>
              <FaTelegramPlane size={30} color="white" /></TelegramShareButton>
              </div>
              <div className="social-btn" >
              <WhatsappShareButton url={currentPageUrl} quote="please share this" hashtag={`Welcom to ${companyName}. Get to know us at ${currentPageUrl}`}>
              <IoLogoWhatsapp size={30} color="white" /></WhatsappShareButton>
              </div>
          </div>
          <p className="label">Copyright © <span className="company">{companyName}</span>. All Rights Reserved.</p>
       
    
    {/* <iframe src={details[i].location} width="600" height="450" allowfullscreen="" loading="lazy"></iframe> */}
          </section>
          }

{ show02 && <div><div className="qr-modal"
         style={{
          position: 'initial',
         
        }}
      >
        
          <ImCross className="close" onClick={()=>{
            handleClose02()
            setSelected("")}} />
         <div style={{
          position: 'initial',
          display: 'flex',
          flexDirection: 'column', // Makes the content flow vertically
          alignItems: 'center',
        }}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <div style={{fontSize:"20px", color:"rgb(22, 33, 92)", fontFamily:"sans-serif", fontWeight:"bold", marginBlock:"10px"}}>Select One of them</div>
            </div>
            <div style={{
      display: 'flex',
      flexWrap: 'wrap', // Allows icons to wrap
      justifyContent: 'center',
      maxWidth: '650px', // Set a max width for the icon container
      gapInline: '5px', // Adds space between icons
      paddingBlock: '5px',
    }}
>
              {(phone02 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Phone Number")
              }} src={phone} height={50} width={50}></img>}
              {(email == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Email")
              }} src={emailImg} height={50} width={50}></img>}
              {(whatsapp02 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Whatsapp Number")
              }} src={whatsapp} height={50} width={50}></img>}
              {(tiktokLink == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Tiktok Link")
              }} src={tiktok} height={50} width={50}></img>}
              {(twitterLink == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Twitter Link")
              }} src={threads} height={50} width={50}></img>}
              {(instagramLink == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Instagram Link")
              }} src={insta} height={50} width={50}></img>}
               {(googleMapLink == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Google Map Link")
              }} src={locations} height={50} width={50}></img>}
               {(googleReviewLink == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Google Review Link")
              }} src={greview} height={50} width={50}></img>}
               {(snapchatLink == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Snapchat Link")
              }} src={snap} height={50} width={50}></img>}
               {(youtubeLink == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Youtube Link")
              }} src={yt} height={50} width={50}></img>}
               {(youtubeShortsLink == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Youtube Shorts Link")
              }} src={ytshorts} height={50} width={50}></img>}
               {(facebookLink == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Facebook Link")
              }} src={fb} height={50} width={50}></img>}
               {(website == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Website Link")
              }} src={websiteImg} height={50} width={50}></img>}
               {(address == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Address")
              }} src={addressImg} height={50} width={50}></img>}
              </div>

             {(selected !="") && <div>
               <span style={{display:"flex", alignItems:"center", justifyContent:"center",fontSize:"20px", color:"rgb(22, 33, 92)", fontFamily:"sans-serif", fontWeight:"bold", marginBlock:"10px"}}> Enter {selected}: </span>
               <span style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <input id="add-link" style={{paddingBlock:"5px", width:"200px", paddingInline:"10px"}} type="text" />
                <button onClick={()=>{
                  if(selected == "Phone Number")
                    {
                      handleAddPhone02(_id)
                      toast("Phone Number Added Successfully!")
                      inputField.value = ""

                    }
                  else if(selected == "Tiktok Link")
                  {
                    handleAddTiktok(_id)
                    toast("Tiktok Link Added Successfully!")
                    inputField.value = ""
                    
                  }
                  else if(selected == "Whatsapp Number")
                    {
                      handleAddWhatsapp02(_id)
                      toast("Whatsapp Number Added Successfully!")
                      inputField.value = ""
                    }
                  else if(selected == "Email")
                      {
                        handleAddEmail(_id)
                         toast("Email Added Successfully!")
                      inputField.value = ""
                      }
                  else if(selected == "Instagram Link")
                      {
                        handleAddInstagram(_id)
                         toast("Instagram Link Added Successfully!")
                      inputField.value = ""
                      }
                 else if(selected == "Snapchat Link")
                      {
                        handleAddSnapchat(_id)
                        toast("Snapchat Link Added Successfully!")
                      inputField.value = ""
                      }
                      else if(selected == "Youtube Link")
                      {
                        handleAddYoutube(_id)
                         toast("Youtube Link Added Successfully!")
                      inputField.value = ""
                      }
                      else if(selected == "Youtube Shorts Link")
                        {
                          handleAddYoutubeShorts(_id)
                            toast("Youtube Shorts Link Added Successfully!")
                      inputField.value = ""
                        }
                        else if(selected == "Twitter Link")
                          {
                            handleAddTwitter(_id)
                              toast("Twitter Link Added Successfully!")
                      inputField.value = ""
                          }
                        else if(selected == "Facebook Link")
                      {
                        handleAddFacebook(_id)
                          toast("Facebook Link Added Successfully!")
                      inputField.value = ""
                      }
                      else if(selected == "Google Map Link")
                        {
                          handleAddGMap(_id)
                            toast("Google Map Link Added Successfully!")
                      inputField.value = ""
                        }
                        else if(selected == "Google Review Link")
                          {
                            handleAddGReview(_id)
                              toast("Google Review Link Added Successfully!")
                      inputField.value = ""
                          }
                          else if(selected == "Website Link")
                            {
                              handleAddWebsite(_id)
                                toast("Website Link Added Successfully!")
                      inputField.value = ""
                            }
                            else if(selected == "Address")
                              {
                                handleAddAddress(_id)
                                toast("Address Added Successfully!")
                      inputField.value = ""
                              }
                }} style={{fontSize:"15px", backgroundColor:"rgb(22, 33, 92)", 
                color:"white",fontFamily:"sans-serif", fontWeight:"bold", marginInline:"10px", paddingInline:"20px", paddingBlock:"5px", borderRadius:"5px"}}>ADD</button>
                <ToastContainer />
               </span>
              </div>}

              </div>
          </div></div>
          }
  

          </div>
        );
      }
      else{
        return(
        <div className="spin">
            <ScaleLoader
            color={"white"}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          </div>);
      }
      }

