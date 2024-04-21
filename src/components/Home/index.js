import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion';
import Cookies from 'js-cookie';
import { IoFilterSharp } from "react-icons/io5";
import { RiArrowDropDownLine,RiArrowDropUpLine } from "react-icons/ri";
// import {jwtDecode} from 'jwt-decode';
import './index.css';
import Navbar from '../Navbar';

const AnimationData=[
    {
        "url": "https://images.unsplash.com/photo-1628494391268-c9935bc384d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxfHxhbmltYXRpb25zfGVufDB8fHx8MTcxMzM1NjkyNXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "person using macbook pro on table",
        "likes": 56,
        "creatorId": "NIyn1GSjemA",
        "creatorName": "sharathsinstastories",
        "creatorImage": "https://images.unsplash.com/profile-1606979626394-6ea6c6b674fcimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1611643378160-39d6dd915b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwyfHxhbmltYXRpb25zfGVufDB8fHx8MTcxMzM1NjkyNXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "man in green shirt and black pants holding black and white stick figurine",
        "likes": 67,
        "creatorId": "cR7FGKJRjLE",
        "creatorName": "puszkins",
        "creatorImage": "https://images.unsplash.com/profile-1611126312800-b89dfc7f41c1image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwzfHxhbmltYXRpb25zfGVufDB8fHx8MTcxMzM1NjkyNXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "blue red and green letters illustration",
        "likes": 1357,
        "creatorId": "ufbJE3E02Es",
        "creatorName": "alexbemore",
        "creatorImage": "https://images.unsplash.com/profile-1608242799455-e292cb89c77cimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1622737133809-d95047b9e673?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw0fHxhbmltYXRpb25zfGVufDB8fHx8MTcxMzM1NjkyNXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "brown cardboard box with yellow light",
        "likes": 2541,
        "creatorId": "gUo5bn5pBlY",
        "creatorName": "sebastiansvenson",
        "creatorImage": "https://images.unsplash.com/profile-1692089380761-4a7afea73267image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1535551951406-a19828b0a76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw1fHxhbmltYXRpb25zfGVufDB8fHx8MTcxMzM1NjkyNXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "Hello World text",
        "likes": 538,
        "creatorId": "W5iEwO5jElY",
        "creatorName": "kobuagency",
        "creatorImage": "https://images.unsplash.com/profile-1582208362589-47b9ac136b3aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1597089542047-b9873d82d8ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw2fHxhbmltYXRpb25zfGVufDB8fHx8MTcxMzM1NjkyNXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "white robot on green grass field during daytime",
        "likes": 194,
        "creatorId": "uVZXrUZJxZ4",
        "creatorName": "tomma5588",
        "creatorImage": "https://images.unsplash.com/profile-1533379644962-44fb4b0c062f?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1599056377758-4808a7e70337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw3fHxhbmltYXRpb25zfGVufDB8fHx8MTcxMzM1NjkyNXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "black and silver camera on brown wooden table",
        "likes": 33,
        "creatorId": "pxqnvB_V_G8",
        "creatorName": "davidsonluna",
        "creatorImage": "https://images.unsplash.com/profile-1518887748790-a95acc4e8a12?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1579833981331-676fa2bae313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw4fHxhbmltYXRpb25zfGVufDB8fHx8MTcxMzM1NjkyNXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "blue and yellow star illustration",
        "likes": 83,
        "creatorId": "R2qFunrfk1k",
        "creatorName": "phoebezzf",
        "creatorImage": "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1439436556258-1f7fab1bfd4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw5fHxhbmltYXRpb25zfGVufDB8fHx8MTcxMzM1NjkyNXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "close-up photo of brown rabbit",
        "likes": 353,
        "creatorId": "cSVO0qOfmJo",
        "creatorName": "eiskonen",
        "creatorImage": "https://images.unsplash.com/profile-1444328646696-aa5813aa7cc2?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxMHx8YW5pbWF0aW9uc3xlbnwwfHx8fDE3MTMzNTY5MjV8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "green and blue ball illustration",
        "likes": 364,
        "creatorId": "ufbJE3E02Es",
        "creatorName": "alexbemore",
        "creatorImage": "https://images.unsplash.com/profile-1608242799455-e292cb89c77cimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    }
]

const BrandingData=[
    {
        "url": "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGxvZ28lMjBkZXNpZ25zJTIwbmFtZXN8ZW58MHx8fHwxNzEzMzU3NjAxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "a lamb logo on a black background",
        "likes": 156,
        "creatorId": "N6MWxHSP_f0",
        "creatorName": "c3k",
        "creatorImage": "https://images.unsplash.com/profile-1615851218495-e4c5460e3334image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1493612276216-ee3925520721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwyfHxicmFuZGluZyUyMGxvZ28lMjBkZXNpZ25zJTIwbmFtZXN8ZW58MHx8fHwxNzEzMzU3NjAxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "person holding light bulb",
        "likes": 8926,
        "creatorId": "wdrZcuVyaXg",
        "creatorName": "jdiegoph",
        "creatorImage": "https://images.unsplash.com/profile-1553882437332-2aaadee4ff49?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1532617754634-819393ff5106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwzfHxicmFuZGluZyUyMGxvZ28lMjBkZXNpZ25zJTIwbmFtZXN8ZW58MHx8fHwxNzEzMzU3NjAxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "Kaleidico glass signage",
        "likes": 17,
        "creatorId": "HJEd76cyPs8",
        "creatorName": "kaleidico",
        "creatorImage": "https://images.unsplash.com/profile-1548969723426-72241042b8b7?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1661956601031-4cf09efadfce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw0fHxicmFuZGluZyUyMGxvZ28lMjBkZXNpZ25zJTIwbmFtZXN8ZW58MHx8fHwxNzEzMzU3NjAxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "a man holding a tablet",
        "likes": 252,
        "creatorId": "D-bxv1Imc-o",
        "creatorName": "mailchimp",
        "creatorImage": "https://images.unsplash.com/profile-1609545740442-928866556c38image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw1fHxicmFuZGluZyUyMGxvZ28lMjBkZXNpZ25zJTIwbmFtZXN8ZW58MHx8fHwxNzEzMzU3NjAxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "a person sitting at a desk with a laptop and a coffee cup",
        "likes": 592,
        "creatorId": "D-bxv1Imc-o",
        "creatorName": "mailchimp",
        "creatorImage": "https://images.unsplash.com/profile-1609545740442-928866556c38image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1615915468538-0fbd857888ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw2fHxicmFuZGluZyUyMGxvZ28lMjBkZXNpZ25zJTIwbmFtZXN8ZW58MHx8fHwxNzEzMzU3NjAxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "a cannabis shop sign hanging from the side of a building",
        "likes": 70,
        "creatorId": "8k-gjJX1q_k",
        "creatorName": "barczakshoots",
        "creatorImage": "https://images.unsplash.com/profile-1615915728377-6c9806323e07image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw3fHxicmFuZGluZyUyMGxvZ28lMjBkZXNpZ25zJTIwbmFtZXN8ZW58MHx8fHwxNzEzMzU3NjAxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "orange and white love me neon light signage",
        "likes": 28,
        "creatorId": "Uneml_yNJZE",
        "creatorName": "reganography",
        "creatorImage": "https://images.unsplash.com/profile-fb-1525756603-79e579036b2d.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1496200186974-4293800e2c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw4fHxicmFuZGluZyUyMGxvZ28lMjBkZXNpZ25zJTIwbmFtZXN8ZW58MHx8fHwxNzEzMzU3NjAxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "# slack text",
        "likes": 160,
        "creatorId": "hnq0aaqF_Qo",
        "creatorName": "scottwebb",
        "creatorImage": "https://images.unsplash.com/profile-1598557047185-d94f7fc56f69image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw5fHxicmFuZGluZyUyMGxvZ28lMjBkZXNpZ25zJTIwbmFtZXN8ZW58MHx8fHwxNzEzMzU3NjAxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "flat lay photo",
        "likes": 697,
        "creatorId": "lRs6-krNfgw",
        "creatorName": "patrikmichalicka",
        "creatorImage": "https://images.unsplash.com/profile-fb-1529442820-45a2a91299ad.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1584441405886-bc91be61e56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxMHx8YnJhbmRpbmclMjBsb2dvJTIwZGVzaWducyUyMG5hbWVzfGVufDB8fHx8MTcxMzM1NzYwMXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "black and white happy birthday balloon",
        "likes": 258,
        "creatorId": "1N9PATtjtGQ",
        "creatorName": "britishlibrary",
        "creatorImage": "https://images.unsplash.com/profile-1572640920869-196eeafbb721image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    }
]

const IllustrationData=[
    {
        "url": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxfHxhcnQtYW5kLWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU3ODYxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "assorted-color paintbrushes",
        "likes": 5907,
        "creatorId": "hQpTMHMQV68",
        "creatorName": "rhondak",
        "creatorImage": "https://images.unsplash.com/profile-1623102053386-c956ee5f0f0aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwyfHxhcnQtYW5kLWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU3ODYxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "red blue and white flowers",
        "likes": 4943,
        "creatorId": "HJLaGezPDdo",
        "creatorName": "europeana",
        "creatorImage": "https://images.unsplash.com/profile-1574363570516-50a9209e8f08image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwzfHxhcnQtYW5kLWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU3ODYxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "multicolored abstract painting",
        "likes": 4930,
        "creatorId": "GIJEd9NgHNY",
        "creatorName": "geordannatheartist",
        "creatorImage": "https://images.unsplash.com/profile-1685715406704-312a68a2cc99?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw0fHxhcnQtYW5kLWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU3ODYxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "green and white floral textile",
        "likes": 3275,
        "creatorId": "zwwKjXfTEcA",
        "creatorName": "birminghammuseumstrust",
        "creatorImage": "https://images.unsplash.com/profile-1576498098345-dce27953537aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw1fHxhcnQtYW5kLWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU3ODYxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "a painting of a castle on a hill",
        "likes": 1606,
        "creatorId": "zwwKjXfTEcA",
        "creatorName": "birminghammuseumstrust",
        "creatorImage": "https://images.unsplash.com/profile-1576498098345-dce27953537aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw2fHxhcnQtYW5kLWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU3ODYxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "a painting on the ceiling of a building",
        "likes": 7397,
        "creatorId": "PK7Nk3GeupY",
        "creatorName": "adrigeo_",
        "creatorImage": "https://images.unsplash.com/profile-1570755980011-96ec14c10fffimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1471666875520-c75081f42081?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw3fHxhcnQtYW5kLWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU3ODYxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "paint brushes next to drawing book and water color palette",
        "likes": 3575,
        "creatorId": "K2uX1KiwsKQ",
        "creatorName": "tim_arterbury",
        "creatorImage": "https://images.unsplash.com/profile-1470975630133-30e33e3fedf3?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1577084381380-3b9ea4153664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw4fHxhcnQtYW5kLWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU3ODYxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "blue and white floral logo",
        "likes": 2046,
        "creatorId": "zwwKjXfTEcA",
        "creatorName": "birminghammuseumstrust",
        "creatorImage": "https://images.unsplash.com/profile-1576498098345-dce27953537aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw5fHxhcnQtYW5kLWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU3ODYxfDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "assorted-color paint brush on brown wooden table top",
        "likes": 2244,
        "creatorId": "xIcscwdt46c",
        "creatorName": "kharaoke",
        "creatorImage": "https://images.unsplash.com/profile-1459903122255-5e443b89b38d?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1577084381314-cae9920e6871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxMHx8YXJ0LWFuZC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1Nzg2MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "a drawing of a piece of cake with flowers on it",
        "likes": 1564,
        "creatorId": "zwwKjXfTEcA",
        "creatorName": "birminghammuseumstrust",
        "creatorImage": "https://images.unsplash.com/profile-1576498098345-dce27953537aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    }
]

const TypographyData=[
    {
        "url": "https://images.unsplash.com/photo-1448471393961-ad67a6405eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxfHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "black and gray plastic blocks",
        "likes": 258,
        "creatorId": "ZbAEdl9dx6k",
        "creatorName": "florianklauer",
        "creatorImage": "https://images.unsplash.com/profile-1448471536947-303061bc0e54?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1484335629320-0e089b87a106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwyfHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "macro photography of blue wooden door painted with number 6",
        "likes": 441,
        "creatorId": "Sr9QprEgsbc",
        "creatorName": "clemono",
        "creatorImage": "https://images.unsplash.com/profile-1537740391424-86188f82f007?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1461958508236-9a742665a0d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwzfHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "closeup photo of cutout decors",
        "likes": 1268,
        "creatorId": "SYccbNfj6-w",
        "creatorName": "raphaelphotoch",
        "creatorImage": "https://images.unsplash.com/profile-1483894790128-4b5b0d07236c?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw0fHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "This Must Be The Place signage",
        "likes": 4731,
        "creatorId": "PvjW2sBV594",
        "creatorName": "timmossholder",
        "creatorImage": "https://images.unsplash.com/profile-1705480099173-b6e90435c526image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1491234323906-4f056ca415bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw1fHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "gray metal framed chalkboard with whatever it takes written",
        "likes": 6589,
        "creatorId": "-myGpytHnPo",
        "creatorName": "jontyson",
        "creatorImage": "https://images.unsplash.com/profile-1712919223705-bafd87efe2bfimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1618034456746-00ad97028038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw2fHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "blue and white round ornament",
        "likes": 9,
        "creatorId": "6x37mEoIkYw",
        "creatorName": "jannerboy62",
        "creatorImage": "https://images.unsplash.com/profile-1656733325746-40f80857c806image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw3fHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "black flat screen tv turned on at the living room",
        "likes": 1584,
        "creatorId": "7oNH-N2mE_M",
        "creatorName": "etiennegirardet",
        "creatorImage": "https://images.unsplash.com/profile-1504311659707-484f28847c27?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1619634792581-93c8a4534998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw4fHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "white and black wooden signage on body of water during daytime",
        "likes": 44,
        "creatorId": "6x37mEoIkYw",
        "creatorName": "jannerboy62",
        "creatorImage": "https://images.unsplash.com/profile-1656733325746-40f80857c806image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1618411539103-ee6ba6007b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw5fHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "i am a little man i am a good man and a woman",
        "likes": 14,
        "creatorId": "nrldCMqj30A",
        "creatorName": "gabiontheroad",
        "creatorImage": "https://images.unsplash.com/profile-1670310485140-fc56576078cbimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1618255342875-a1d288c04939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxMHx8dHlwb2dyYXBoeS1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODQyOXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "red and gold happy birthday signage",
        "likes": 62,
        "creatorId": "6x37mEoIkYw",
        "creatorName": "jannerboy62",
        "creatorImage": "https://images.unsplash.com/profile-1656733325746-40f80857c806image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    }
]

const PrintData=[
    {
        "url": "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxfHxwcmludC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODY1MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "teal wooden drawer dresser",
        "likes": 4734,
        "creatorId": "lLzcYdz2TEg",
        "creatorName": "alexagorn",
        "creatorImage": "https://images.unsplash.com/profile-fb-1495121457-d80afaf705a7.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1611532736419-bfe35e04dd78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwyfHxwcmludC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODY1MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "text blocks spelling the word learn",
        "likes": 62,
        "creatorId": "GxXYxeDbaas",
        "creatorName": "kellysikkema",
        "creatorImage": "https://images.unsplash.com/profile-1710172851038-921ff4b2bcbeimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1534986622832-777a66b043bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwzfHxwcmludC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODY1MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "a living room with a couch and a picture on the wall",
        "likes": 1363,
        "creatorId": "-ne6m-L6lDs",
        "creatorName": "karishea",
        "creatorImage": "https://images.unsplash.com/profile-1627059319433-22adf6be56b5image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw0fHxwcmludC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODY1MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "printing machine",
        "likes": 963,
        "creatorId": "Wj0YRdrSehM",
        "creatorName": "bank_phrom",
        "creatorImage": "https://images.unsplash.com/profile-1499202388430-8f761f755f76?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1509805225007-73e8ba4b5be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw1fHxwcmludC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODY1MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "white chair beside five paintings",
        "likes": 1140,
        "creatorId": "zq-UW5M0mpI",
        "creatorName": "christopher__burns",
        "creatorImage": "https://images.unsplash.com/profile-1523277534788-b3a17d62775e?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw2fHxwcmludC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODY1MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "assorted-color framed paintings on the wall",
        "likes": 2497,
        "creatorId": "QY84MIt4iKE",
        "creatorName": "jonnysplsh",
        "creatorImage": "https://images.unsplash.com/profile-1601902656032-762ff8d706e7image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1525498128493-380d1990a112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw3fHxwcmludC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODY1MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "green leaves",
        "likes": 17557,
        "creatorId": "Ib8exzXFC2Y",
        "creatorName": "chrisleeiam",
        "creatorImage": "https://images.unsplash.com/profile-1444150880999-8042a8ce0979?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1509744645300-a2098b11871a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw4fHxwcmludC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODY1MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "painting of pink flower on dresser near white vase",
        "likes": 2126,
        "creatorId": "koTTAQe668E",
        "creatorName": "stephanieharvey",
        "creatorImage": "https://images.unsplash.com/profile-1663037940820-36269e75fa00image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1514454923228-7ef54f9251c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw5fHxwcmludC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODY1MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "green linear leafed plant on white pot",
        "likes": 1570,
        "creatorId": "lLzcYdz2TEg",
        "creatorName": "alexagorn",
        "creatorImage": "https://images.unsplash.com/profile-fb-1495121457-d80afaf705a7.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1529590059894-9c3305df5d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxMHx8cHJpbnQtZGVzaWduc3xlbnwwfHx8fDE3MTMzNTg2NTF8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "view of person with bird on her hand photo",
        "likes": 458,
        "creatorId": "IFcEhJqem0Q",
        "creatorName": "anniespratt",
        "creatorImage": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    }
]

const MobileData=[
    {
        "url": "https://images.unsplash.com/photo-1486081505710-1b891dea8ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxfHxtb2JpbGUtYXBwbGljYXRpb24tZGVzaWduc3xlbnwwfHx8fDE3MTMzNjIzMTh8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "gray ship beside building",
        "likes": 38,
        "creatorId": "49PVO1nOhPc",
        "creatorName": "jpvalery",
        "creatorImage": "https://images.unsplash.com/profile-1521501216054-8c8b75da021f?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1599950755346-a3e58f84ca63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwyfHxtb2JpbGUtYXBwbGljYXRpb24tZGVzaWduc3xlbnwwfHx8fDE3MTMzNjIzMTh8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "person holding black android smartphone",
        "likes": 192,
        "creatorId": "vISVsyltI4M",
        "creatorName": "priscilladupreez",
        "creatorImage": "https://images.unsplash.com/profile-1695698417767-2297bb54fc4dimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwzfHxtb2JpbGUtYXBwbGljYXRpb24tZGVzaWduc3xlbnwwfHx8fDE3MTMzNjIzMTh8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "space gray iPhone X",
        "likes": 657,
        "creatorId": "VDVKfuyN1aI",
        "creatorName": "williamtm",
        "creatorImage": "https://images.unsplash.com/profile-1668446377447-36ff5caedf7eimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1529653762956-b0a27278529c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw0fHxtb2JpbGUtYXBwbGljYXRpb24tZGVzaWduc3xlbnwwfHx8fDE3MTMzNjIzMTh8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "person holding space gray iPhone X",
        "likes": 675,
        "creatorId": "9pAHwQJkQ9Q",
        "creatorName": "coinviewapp",
        "creatorImage": "https://images.unsplash.com/profile-1529653628760-4fc494a1436f?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw1fHxtb2JpbGUtYXBwbGljYXRpb24tZGVzaWduc3xlbnwwfHx8fDE3MTMzNjIzMTh8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "woman holding silver iPhone 6",
        "likes": 3659,
        "creatorId": "Q6GA18GG4HA",
        "creatorName": "firmbee",
        "creatorImage": "https://images.unsplash.com/profile-1616496992027-0e65a3b7b63aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1534161197248-bae0085acec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw2fHxtb2JpbGUtYXBwbGljYXRpb24tZGVzaWduc3xlbnwwfHx8fDE3MTMzNjIzMTh8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "person taking photo of man and woman",
        "likes": 26,
        "creatorId": "JyTmnKbzaLc",
        "creatorName": "nicobhlr",
        "creatorImage": "https://images.unsplash.com/profile-1564155075743-300f6f485c59?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw3fHxtb2JpbGUtYXBwbGljYXRpb24tZGVzaWduc3xlbnwwfHx8fDE3MTMzNjIzMTh8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "a person holding a cell phone in their hand",
        "likes": 356,
        "creatorId": "nMbxgsn-BaA",
        "creatorName": "georgiadelotz",
        "creatorImage": "https://images.unsplash.com/profile-1660732571524-c01887ddf015image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1470434767159-ac7bf1b43351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw4fHxtb2JpbGUtYXBwbGljYXRpb24tZGVzaWduc3xlbnwwfHx8fDE3MTMzNjIzMTh8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "man sitting while using phone",
        "likes": 1626,
        "creatorId": "IPUZbdlTRoI",
        "creatorName": "dcanies",
        "creatorImage": "https://images.unsplash.com/profile-fb-1467734067-92da0c5e7b64.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw5fHxtb2JpbGUtYXBwbGljYXRpb24tZGVzaWduc3xlbnwwfHx8fDE3MTMzNjIzMTh8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "woman holding iPhone during daytime",
        "likes": 1301,
        "creatorId": "C5QhTyOxvlI",
        "creatorName": "plhnk",
        "creatorImage": "https://images.unsplash.com/profile-1519788404644-09d4330dc309?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1533022139390-e31c488d69e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxMHx8bW9iaWxlLWFwcGxpY2F0aW9uLWRlc2lnbnN8ZW58MHx8fHwxNzEzMzYyMzE4fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "person holding space gray iPhone X",
        "likes": 356,
        "creatorId": "cQS0QlOWLc8",
        "creatorName": "mr_fresh",
        "creatorImage": "https://images.unsplash.com/profile-fb-1532344087-4ce6075a654a.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    }
]

const DiscoverData=[
    {
        "url": "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw0fHxwcmludC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODY1MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "printing machine",
        "likes": 963,
        "creatorId": "Wj0YRdrSehM",
        "creatorName": "bank_phrom",
        "creatorImage": "https://images.unsplash.com/profile-1499202388430-8f761f755f76?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1509805225007-73e8ba4b5be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw1fHxwcmludC1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODY1MXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "white chair beside five paintings",
        "likes": 1140,
        "creatorId": "zq-UW5M0mpI",
        "creatorName": "christopher__burns",
        "creatorImage": "https://images.unsplash.com/profile-1523277534788-b3a17d62775e?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },{
        "url": "https://images.unsplash.com/photo-1529590059894-9c3305df5d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxMHx8cHJpbnQtZGVzaWduc3xlbnwwfHx8fDE3MTMzNTg2NTF8MA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "view of person with bird on her hand photo",
        "likes": 458,
        "creatorId": "IFcEhJqem0Q",
        "creatorName": "anniespratt",
        "creatorImage": "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },{
        "url": "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw3fHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "black flat screen tv turned on at the living room",
        "likes": 1584,
        "creatorId": "7oNH-N2mE_M",
        "creatorName": "etiennegirardet",
        "creatorImage": "https://images.unsplash.com/profile-1504311659707-484f28847c27?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1619634792581-93c8a4534998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw4fHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "white and black wooden signage on body of water during daytime",
        "likes": 44,
        "creatorId": "6x37mEoIkYw",
        "creatorName": "jannerboy62",
        "creatorImage": "https://images.unsplash.com/profile-1656733325746-40f80857c806image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1618411539103-ee6ba6007b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHw5fHx0eXBvZ3JhcGh5LWRlc2lnbnN8ZW58MHx8fHwxNzEzMzU4NDI5fDA&ixlib=rb-4.0.3&q=80&w=400",
        "description": "i am a little man i am a good man and a woman",
        "likes": 14,
        "creatorId": "nrldCMqj30A",
        "creatorName": "gabiontheroad",
        "creatorImage": "https://images.unsplash.com/profile-1670310485140-fc56576078cbimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    },
    {
        "url": "https://images.unsplash.com/photo-1618255342875-a1d288c04939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODkyODV8MHwxfHNlYXJjaHwxMHx8dHlwb2dyYXBoeS1kZXNpZ25zfGVufDB8fHx8MTcxMzM1ODQyOXww&ixlib=rb-4.0.3&q=80&w=400",
        "description": "red and gold happy birthday signage",
        "likes": 62,
        "creatorId": "6x37mEoIkYw",
        "creatorName": "jannerboy62",
        "creatorImage": "https://images.unsplash.com/profile-1656733325746-40f80857c806image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32"
    }
];


const queries=['branding-logo-designs-names','art-and-designs','print-designs','typography-designs','mobile-designs-data'];

const Home=()=>{
    const navigate=useNavigate();
    // const [fetchedData,setFetchedData]=useState([]);
    const [userQuery,setUserQuery]=useState('');
    console.log(queries);
    const [showDrop,setShowDrop]=useState(true);

    const [activeMenuItem, setActiveMenuItem] = useState('Discover');
    const menuItems = [
        'Discover',
        'Animation',
        'Branding',
        'Illustration',
        'Mobile',
        'Print',
        'Product Design',
        'Typography',
        'Web Design',
      ];
    const datas=[DiscoverData,AnimationData,BrandingData,IllustrationData,MobileData,PrintData,BrandingData,TypographyData,BrandingData];
    const [showData,setShowData]=useState(datas[0]);

    const fetchImages=()=>{
        console.log("Fetching images...");
        console.log(userQuery);
        setUserQuery('');
    }

    // const fetchImages=async()=>{
     
    //     const clients_id="MoMBkj4oXIL2za6kWwh4U3hT2RR_hNXfue0WO4qLjwY";
    //     if(userQuery){
    //         const results= await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=11&query=${userQuery}&client_id=${clients_id}`);
    //         const data=await results.json();
    //         setFetchedData(data.results);
            
    //         console.log(results);
    //         console.log(data);
    //         if (data.errors) {
    //             console.error("Error fetching images:", data.errors);
    //           } else {
    //             let imageUrls = data.results.map((image) => image.urls.regular); // Extract image URLs
    //             console.log("Image URLs:", imageUrls); // Now you have the image URLs
    //             setUserQuery('');
    //           }
    //     }
    // }

    useEffect(()=>{
        const checkUser=()=>{
            try{            
            const token=Cookies.get('jwt_token');
            if (token === undefined) {
                navigate("/signup");
                return null;
              }
            }
            catch(e){
                navigate("/signup");
            }
        }
        checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleMenu=(menuItem,index)=>{
        setActiveMenuItem(menuItem)
        setShowData(datas[index])
    }

    return(
        <>
        <Navbar/>
        <div className=''>
            <div className='home-menubar'>
                <span onClick={()=>{setShowDrop(s=>!s)}}>Popular {showDrop ?<RiArrowDropDownLine className='drop' />:<RiArrowDropUpLine className='drop' />}</span>
                <ul className=''>
                    {menuItems.map((menuItem,index) =>(
                    <li
                    key={index}
                    className={activeMenuItem===menuItem?'active':''}
                    onClick={()=>{handleMenu(menuItem,index)}}
                    >
                        {menuItem}
                    </li>
                    ))}
                </ul>
                <span><IoFilterSharp /> Filters</span>
            </div>
            <div className='imageContainer'>
            {
                showData.length > 0 && showData.map((doc,index)=>(
                    <motion.span key={index} className='eachImage'
                    
                    initial={{opacity:0}}
                    animate={{opacity:1,transition:{delay:index/2}}}>
                        <img src={doc.url} alt={doc.description} className='unsplashImage' loading="lazy" />
                        <span className='imageText'>{doc.description}</span>
                    </motion.span>
                )) 
            }
            </div>
            <button className='more-btn' onClick={()=>{fetchImages()}}>More</button>
        </div>
        </>
    )
}

export default Home;