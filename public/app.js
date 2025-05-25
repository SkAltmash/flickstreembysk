// Firebase App (core)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

// Firebase Auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  where,
  orderBy,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";



let username = null;



const firebaseConfig = {
    apiKey: "AIzaSyDTQ1a32pJVHsjkGulIhngAoWFiZttHq9g",
    authDomain: "flickstreembysk.firebaseapp.com",
    projectId: "flickstreembysk",
    storageBucket: "flickstreembysk.firebasestorage.app",
    messagingSenderId: "1054233900493",
    appId: "1:1054233900493:web:14f9fb89cedc9a694f4084",
    measurementId: "G-DSKRQDFNR3"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db };

// DOM Elements
const emailSingUp = document.getElementById("emailSingUp");
const passwordSingUp = document.getElementById("passwordSingUp");
const emailSingIn = document.getElementById("emailSingIn");
const passwordSingIn = document.getElementById("passwordSingIn");
const message = document.getElementById("message");

window.signUp = function () {
  message.textContent = "Working please wait...";
  const passkey = document.querySelector("#passkey");
  if(passkey.value==='7714'){
  createUserWithEmailAndPassword(auth, emailSingUp.value, passwordSingUp.value)
    .then(userCredential => {
      message.textContent = "✅ Sign-up successful!";
      hideSlideBar();
      document.querySelector(".FirebaseContainer").style.display = "none";
      document.querySelector(".main-container").style.display="block";

    })
    .catch(error => {
      message.textContent = `❌ ${error.message}`;
    });
  }
  else
    message.textContent = `Wrong pass key `;
};

window.logIn = function () {
  message.textContent = "Working please wait...";
   signInWithEmailAndPassword(auth, emailSingIn.value, passwordSingIn.value)
    .then(userCredential => {
      message.textContent = "✅ Logged in!";
      hideSlideBar();
      document.querySelector(".FirebaseContainer").style.display = "none";
      document.querySelector(".main-container").style.display="block";

    })
    .catch(error => {
      message.textContent = `❌ ${error.message}`;
    });
};

window.logOut = function () {
  signOut(auth).then(() => {
    message.textContent = "👋 Logged out";
    location.reload()
  });
};

// Monitor auth state
onAuthStateChanged(auth, (user) => {
    const emailSingUp = document.getElementById("emailSingUp");
    const passwordSingUp = document.getElementById("passwordSingUp");
    const emailSingIn = document.getElementById("emailSingIn");
    const passwordSingIn = document.getElementById("passwordSingIn");
    
  
    if (user) {
      message.textContent = `✅ Welcome, ${user.email}`;
      username = user.email;
      emailSingUp.style.display = "none";
      passwordSingUp.style.display = "none";
      emailSingIn.style.display = "none";
      passwordSingIn.style.display = "none";
      document.getElementById("userName").textContent = `User: ${user.email.split('@')[0]}`;
      const firstlater = user.email.charAt(0).toUpperCase();
      document.querySelector(".firstlater").innerHTML=firstlater;
      document.getElementById("signUpBtn").style.display = "none";
      document.querySelector(".FirebaseContainer").style.display = "none";
      document.querySelector("#logoutBtn").style.display = "block";
    } else {
      message.textContent = "🔒 Please log in";
      emailSingUp.style.display = "block";
      passwordSingUp.style.display = "block";
      emailSingIn.style.display = "block";
      passwordSingIn.style.display = "block";
    }
  });
 
  
  window.hideLoginUI = function () {
    document.querySelector(".container").style.display = "none";
  };
  document.getElementById('signUpBtn').addEventListener('click', function () {
    const FirebaseContainer = document.querySelector(".FirebaseContainer");
    FirebaseContainer.style.display = "block";
    document.querySelector(".main-container").style.display="none";
    hideSlideBar();
  }); 
  
  
  
  export async function addFavorite(movie) {
    const user = auth.currentUser;
    if (!user) return;
  
    const movieRef = doc(db, "users", user.uid, "favorites", movie.id.toString());
    await setDoc(movieRef, movie); // store full movie object
  }
  
  export async function removeFavorite(movieId) {
    const user = auth.currentUser;
    if (!user) return;
  
    const movieRef = doc(db, "users", user.uid, "favorites", movieId.toString());
    await deleteDoc(movieRef);
  }
  
  export async function checkIfFavorited(movieId) {
    try {
      const user = auth.currentUser;
      if (!user) return false;
  
      const movieRef = doc(db, "users", user.uid, "favorites", movieId.toString());
      const docSnap = await getDoc(movieRef);
      return docSnap.exists();
    } catch (err) {
      console.error("Failed to fetch favorite status:", err.message);
      return false;
    }
  }
  

  
  async function getFavorites() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");
  
      const favsCollection = collection(db, "users", user.uid, "favorites");
      const favsSnapshot = await getDocs(favsCollection);
  
      const favorites = favsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Favorites:", favorites);
      return favorites;
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
      return [];
    }
  }
  
  
  export async function addWatchList(movie) {
    const user = auth.currentUser;
    if (!user) return;
  
    const movieRef = doc(db, "users", user.uid, "WatchList", movie.id.toString());
    await setDoc(movieRef, movie); // store full movie object
  }
  
  export async function removeWatchList(movieId) {
    const user = auth.currentUser;
    if (!user) return;
  
    const movieRef = doc(db, "users", user.uid, "WatchList", movieId.toString());
    await deleteDoc(movieRef);
  }
  
  export async function checkIfWatchList(movieId) {
    try {
      const user = auth.currentUser;
      if (!user) return false;
  
      const movieRef = doc(db, "users", user.uid, "WatchList", movieId.toString());
      const docSnap = await getDoc(movieRef);
      return docSnap.exists();
    } catch (err) {
      console.error("Failed to fetch WatchList status:", err.message);
      return false;
    }
  }
  

  
  async function getWatchList() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");
  
      const WatchListCollection = collection(db, "users", user.uid, "WatchList");
      const WatchListSnapshot = await getDocs(WatchListCollection);
  
      const WatchList = WatchListSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("WatchList:", WatchList);
      return WatchList;
    } catch (error) {
      console.error("Error fetching WatchList:", error.message);
      return [];
    }
  }

  
  
  async function loadComments(movieId, container) {
    container.innerHTML = ""; // clear previous comments
  
    const q = query(collection(db, "comments"), where("movieId", "==", movieId));
    const querySnapshot = await getDocs(q);
    if(querySnapshot==null || querySnapshot.empty){
      const noComments = document.createElement("div");
      noComments.textContent = "No comments yet. Be the first to comment!";
      container.appendChild(noComments);
      return;
    }      
      
    querySnapshot.forEach(docSnap => {
      const comment = docSnap.data();
      const commentId = docSnap.id;
  
      const commentDiv = document.createElement("div");
      commentDiv.style.marginBottom = "10px";
      commentDiv.innerHTML = `
    <strong>${comment.username.split('@')[0]}</strong> <small>${new Date(comment.timestamp?.toDate?.() || Date.now()).toLocaleString()}</small>
        <p>${comment.text}</p>
      `;
  
      // Check if current user is owner
      const user = auth.currentUser;
      if (user && user.uid === comment.uid) {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.addEventListener("click", async () => {
          await deleteComment(commentId, comment.uid);
          loadComments(movieId, container); // Refresh comment list
        });
        commentDiv.appendChild(deleteBtn);
      }
  
      container.appendChild(commentDiv);
    });
  }
  
  async function postComment(movieId, text, container, button, textarea) {
    const user = auth.currentUser;
    if (!user || !text.trim()) return;
  
  
    try {
      const commentsRef = collection(db, "comments");
      await addDoc(commentsRef, {
        movieId,
        text: text.trim(),
        timestamp: serverTimestamp(),
        username: user.displayName || user.email,
        uid: user.uid,
      });
  
      loadComments(movieId, container); // Refresh comments
  
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }
  
  

  
  async function deleteComment(commentId, commentOwnerUid) {
    const user = auth.currentUser;
    if (!user) return;
  
    
  
    try {
      const commentRef = doc(db, "comments", commentId);
      await deleteDoc(commentRef);
      console.log("Comment deleted.");
      // Optionally update UI here
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }
  

  const container = document.getElementById("FirebaseContainer");
  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");
  
  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });
  
  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });
 const  signInFrom=document.querySelector(".signInFrom");
  signInFrom. addEventListener("submit", async (e) => {
    e.preventDefault();
    
  });
  const signUpFrom=document.querySelector(".signUpFrom");
  signUpFrom. addEventListener("submit", async (e) => {
    e.preventDefault();
  });
  document.querySelector(".closeFirebaseContainer").addEventListener("click", () => {
    document.querySelector(".FirebaseContainer").style.display = "none";
    document.querySelector(".main-container").style.display="block";

  })
  const mainContainer = document.querySelector(".main-container");
  const btnforSearch = document.querySelector(".btn-for-search");
  const moreDetailsContaner = document.querySelector(".more-details");
  const searchInput = document.querySelector(".searchInput");
  const suggestionsBox = document.getElementById("suggestions");
  const searchForm = document.getElementById("searchForm");
  const searchIcon = document.getElementById("searchIcon");
  const sidebar =document.querySelector(".sidebar");
  
  
  const API_KEY = 'd1becbefc947f6d6af137051548adf7f';
  const BASE_URL = 'https://api.themoviedb.org/3';
  let pageNumber = 1;
  let searchTime =1
  
  const themeToggleButton = document.getElementById('theme-toggle');
  
  const body = document.body;
 
  
  
  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggleButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  } else {
    themeToggleButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }
  
  themeToggleButton.addEventListener('click', () => {
    body.classList.add('theme-fade');
   
  
    setTimeout(() => {
      const isLight = body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
  
      themeToggleButton.innerHTML = isLight
        ? `<i class="fa-solid fa-moon"></i>`
        : `<i class="fa-solid fa-sun"></i>`;
    }, 150);
  
    setTimeout(() => {
      body.classList.remove('theme-fade');
    }, 300);
  });
  
  document.getElementById('sidebarTriggerOpen').addEventListener('click', function () {
    openslidebar();
  });
  document.getElementById('sidebarTriggerClose').addEventListener('click', function () {
    hideSlideBar();
  });

  function openslidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.transform="translateX(0)";
  }
  function hideSlideBar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.transform="translateX(-100%)"
  }

 
  window.addEventListener('scroll', () => {
    hideSlideBar();
  });
  let currentType;
  let page =1;
  function loadCategory(type, page) {
    let url = "";
    let mediaType = "";
    const labl = document.querySelector(".labl")
   
    document.querySelector(".label")
    currentType = type;
  
    if (type === "latest") {
      url = `/.netlify/functions/tmdb?path=movie/now_playing&query=language=en-US&page=${page}`;
      mediaType = "movie";
      labl.innerText=`Latest Movies`;
      } else if (type === "hollywood") {
        url = `/.netlify/functions/tmdb?path=discover/movie&query=with_original_language=en&sort_by=release_date.asc&page=${page}`;
        mediaType = "movie";  
      labl.innerText=`Latest Hollywood`;
      } else if (type === "bollywood") {
        url = `/.netlify/functions/tmdb?path=discover/movie&query=with_original_language=hi&sort_by=release_date.asc&page=${page}`;
      mediaType = "movie";
      labl.innerText=`Latest Bollywood`;
      } else if (type === "series") {
        url = `/.netlify/functions/tmdb?path=discover/tv&query=with_original_language=hi&sort_by=release_date.asc&page=${page}`;
      mediaType = "tv";
      labl.innerText=`Latest Web Series hindi`;
      }else if(type==="NetflixMovies"){
       url = `/.netlify/functions/tmdb?path=discover/tv&query=language=en-US&sort_by=popularity.desc&page=${page}`;
        mediaType = "movie";
      labl.innerText=`Movies Trending on Netflix`;
      }
      else if(type==="Netflixseries"){
       url = `/.netlify/functions/tmdb?path=discover/tv&query=sort_by=popularity.desc&page=${page}&with_networks=213`;
        mediaType = "tv";
        labl.innerText=`Series Trending on Netflix `;
      }
  
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || [];
        const movieList = document.getElementById("movieList");
  
        if (page === 1) movieList.innerHTML = ""; // Clear only on first load
        results.forEach(item => {
          const imgcart = document.createElement('div');
          imgcart.classList.add("imgcart");
  
          const posterUrl = item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : 'images/logo.png';
  
          imgcart.innerHTML = `<img src="${posterUrl}">`;
  
          let ratingClass = '';
          let ratingText = '';
          if (!item.vote_average || item.vote_average === 0) {
            ratingClass = 'rating-no';
            ratingText = 'N/A';
          } else if (item.vote_average >= 7) {
            ratingClass = 'rating-high';
            ratingText = item.vote_average.toFixed(1);
          } else if (item.vote_average >= 5) {
            ratingClass = 'rating-mid';
            ratingText = item.vote_average.toFixed(1);
          } else {
            ratingClass = 'rating-low';
            ratingText = item.vote_average.toFixed(1);
          }
  
          const cartInfo = document.createElement('div');
          cartInfo.classList.add("cartInfo");
          cartInfo.innerHTML = `
            <h4 class="${ratingClass}"><i class="fa-solid fa-star"></i> ${ratingText}</h4>
            <h4>${item.title || item.name}</h4>
          `;
     
          
          imgcart.appendChild(cartInfo);
          movieList.appendChild(imgcart);
  
          imgcart.addEventListener("click", () => {
            moreDetails(mediaType, item.id);
            document.querySelector("#Slidebar-content").style.transform = "scale(0)";
          });
        });
  
        document.getElementById("loadMoreBtnforSlidebar").style.display = "block"; // Show load more button
  
        const SlidebarContent = document.querySelector("#Slidebar-content");
        if (SlidebarContent) SlidebarContent.style.transform = "scale(1)";
        
        hideSlideBar();
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        document.getElementById("movieList").innerText = "Failed to load content.";
      });
  }
  document.querySelectorAll('li[data-category]').forEach((item) => {
    item.addEventListener('click', () => {
      const category = item.getAttribute('data-category');
      loadCategory(category);
      document.querySelector(".FirebaseContainer").style.display = "none";
    });
  });
  document.getElementById("loadMoreBtnforSlidebar").addEventListener("click", () => {

    loadCategory(currentType,++page);
    console.log(page);
  });
  
  
  searchInput.addEventListener('submit',(e)=>{
      e.preventDefault();
      query=form.querySelector('input').value;
      searchTime=1;
      pageNumber=1;
      suggestionsBox.classList.remove("Active");
   searchonTmdb(query,pageNumber);
  
  })
  lodeHomePage();
  function lodeHomePage(){
     getLatestMovies();
     getLatestShow();
     getLatestShowNetflix();
     getLatestShowAmazon();
     getLatestShowHotstar();
  }
  function createSection(titleText, containerClass) {
    const sectionWrapper = document.createElement("section");
    sectionWrapper.classList.add("movie-section");
  
    const title = document.createElement("h2");
    title.className = "section-title";
    title.textContent = titleText;
  
    const contentDiv = document.createElement("div");
    contentDiv.classList.add(containerClass);
  
    sectionWrapper.appendChild(title);
    sectionWrapper.appendChild(contentDiv);
    mainContainer.appendChild(sectionWrapper);
  
    return contentDiv;
  }
  
  function createMovieCard(item, type) {
    const imgcart = document.createElement('div');
    imgcart.classList.add("imgcart");
  
    const posterUrl = item.poster_path
      ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
      : 'images/logo.png';
  
   imgcart.innerHTML = ` <img src="${posterUrl}"> `;
    const cartInfo = document.createElement('div');
    cartInfo.classList.add("cartInfo");
  
    let ratingClass = '';
    let ratingText = '';
  
    if (!item.vote_average || item.vote_average === 0) {
      ratingClass = 'rating-no';
      ratingText = 'N/A';
    } else if (item.vote_average >= 7) {
      ratingClass = 'rating-high';
      ratingText = item.vote_average.toFixed(1);
    } else if (item.vote_average >= 5) {
      ratingClass = 'rating-mid';
      ratingText = item.vote_average.toFixed(1);
    } else {
      ratingClass = 'rating-low';
      ratingText = item.vote_average.toFixed(1);
    }
  
    cartInfo.innerHTML = `
      <h4 class="${ratingClass}">
        <i class="fa-solid fa-star"></i> ${ratingText}
      </h4>
      <h4>${type === 'movie' ? item.title : item.name}</h4>
    `;
  
    imgcart.appendChild(cartInfo);
      imgcart.addEventListener("click", () => {
      moreDetails(type, item.id);
    });
  
    return imgcart;
  }
  
  async function getLatestMovies() {
    try {
      const response = await fetch(`/.netlify/functions/tmdb?path=discover/movie&query=sort_by=popularity.desc`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
      const contentDiv = createSection("Latest Movies", "latestMovies");
  
      data.results.forEach(item => {
        const card = createMovieCard(item, 'movie');
        contentDiv.appendChild(card);
      });
  
      btnforSearch.style.display = "none";
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  }
  
  async function getLatestShow() {
    try {
      const response = await fetch(`/.netlify/functions/tmdb?path=discover/tv&query=sort_by=popularity.desc`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
      const contentDiv = createSection("Latest Shows", "latestShow");
  
      data.results.forEach(item => {
        const card = createMovieCard(item, 'tv');
        contentDiv.appendChild(card);
      });
  
      btnforSearch.style.display = "none";
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    }
  }
  
  async function getLatestShowNetflix() {
    try {
      const response = await fetch(`/.netlify/functions/tmdb?path=discover/tv&query=with_networks=213&sort_by=popularity.desc`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
      const contentDiv = createSection("Trending on Netflix", "TrendingOnNetflix");
  
      data.results.forEach(item => {
        const card = createMovieCard(item, 'tv');
        contentDiv.appendChild(card);
      });
  
      btnforSearch.style.display = "none";
    } catch (error) {
      console.error("Failed to fetch Netflix shows:", error);
    }
  }
  
  async function getLatestShowAmazon() {
    try {
      const response = await fetch(`/.netlify/functions/tmdb?path=discover/tv&query=with_networks=1024&sort_by=popularity.desc`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
      const contentDiv = createSection("Trending on Amazon Prime", "TrendingOnAmazon");
  
      data.results.forEach(item => {
        const card = createMovieCard(item, 'tv');
        contentDiv.appendChild(card);
      });
  
      btnforSearch.style.display = "none";
    } catch (error) {
      console.error("Failed to fetch Amazon shows:", error);
    }
  }
  
  async function getLatestShowHotstar() {
    try {
      const response = await fetch(`/.netlify/functions/tmdb?path=discover/tv&query=with_networks=3919&sort_by=popularity.desc`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
      const contentDiv = createSection("Trending on Jio Hotstar", "TrendingOnHotstar");
  
      data.results.forEach(item => {
        const card = createMovieCard(item, 'tv');
        contentDiv.appendChild(card);
      });
  
      btnforSearch.style.display = "none";
    } catch (error) {
      console.error("Failed to fetch Hotstar shows:", error);
    }
  }
  
  
  const SearchResult = document.createElement('div');
  SearchResult.classList.add("SearchResult");
  
  pageNumber=1;
  async function searchonTmdb(query, pageNumber) {
    const selectedType = document.getElementById("searchType").value;
  
    suggestionsBox.classList.remove("Active");
    searchIcon.classList.replace("fa-magnifying-glass", "fa-xmark");
  
    let endpoint = selectedType;
   
  
    const url = `/.netlify/functions/tmdb?path=search/${endpoint}&query=query=${encodeURIComponent(query)}&language=en-US&page=${pageNumber}&include_adult=false`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
  
      if (searchTime == 1) {
        mainContainer.innerHTML = "";
        SearchResult.innerHTML = "";
      }
      searchTime++;
  
      const data = await response.json();
      let results = data.results;
      if(data.total_results === 0) {
        const noResults = document.createElement('div');
        noResults.classList.add("no-results");
        noResults.innerHTML = `<h3>No results found for "${query}"</h3>`;
        noResults.style.textAlign = "center";
        noResults.style.marginTop = "20px";
        noResults.style.color = "#888";
        noResults.style.fontSize = "1.2em";
        noResults.style.fontWeight = "bold";
        noResults.style.padding = "20px";

        mainContainer.appendChild(noResults);
        return;
      }
    
      results.forEach(item => {
        const mediaType = item.media_type || selectedType;
        if (mediaType !== "movie" && mediaType !== "tv" && mediaType !== "person") return;
       
        const imgcart = document.createElement('div');
        imgcart.classList.add("imgcart");
  
        const imageUrl =
          mediaType === "person"
            ? (item.profile_path ? `https://image.tmdb.org/t/p/w500/${item.profile_path}` : 'images/castplaceholder.png')
            : (item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : 'images/castplaceholder.png');
  
            imgcart.innerHTML = ` <img src="${imageUrl}"> `;

        mainContainer.appendChild(SearchResult);
        SearchResult.appendChild(imgcart);
  
        const cartInfo = document.createElement('div');
        cartInfo.classList.add("cartInfo");
       
        const title = mediaType === "person" ? item.name : (item.title || item.name);
        const vote = mediaType === "person" ? null : item.vote_average;
  
        let ratingClass = '';
        let ratingText = '';
  
        if (vote === null || vote === 0 || mediaType === "person") {
          ratingClass = 'rating-no';
          ratingText = 'N/A';
        } else if (vote >= 7) {
          ratingClass = 'rating-high';
          ratingText = vote.toFixed(1);
        } else if (vote >= 5) {
          ratingClass = 'rating-mid';
          ratingText = vote.toFixed(1);
        } else {
          ratingClass = 'rating-low';
          ratingText = vote.toFixed(1);
        }
  
        cartInfo.innerHTML = `
          <h4 class="${ratingClass}">
            <i class="fa-solid fa-star"></i> ${ratingText}
          </h4>
          <h4>${title}</h4>
        `;
        imgcart.append(cartInfo);
        if(mediaType != "person"){
        imgcart.addEventListener("click", () => {
          moreDetails(mediaType, item.id);
        });
        }
        else
        imgcart.addEventListener("click", () => {
          fetchPersonDetails(item.id,item);
              });
    });
  
      if (data.page < data.total_pages) {
        btnforSearch.style.display = "flex";
      } else {
        btnforSearch.style.display = "none";
      }
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  document.getElementById("searchType").addEventListener("change", () => {
    const query = searchInput.value.trim();
    if (query) {
      searchTime = 1;
      searchonTmdb(query, 1);
    }
  });
  
   function loadMoreREsultSearch() {
      searchonTmdb(query,++pageNumber)
   }
  
  
    
   // lodeMore 
   const loadMoreBtn = document.getElementById('loadMoreBtn');
   const btnText = loadMoreBtn.querySelector('.btn-text');
   const spinner = loadMoreBtn.querySelector('.spinner');
   
   loadMoreBtn.addEventListener('click', async () => {
     btnText.textContent = "Loading...";
     spinner.classList.remove('hidden');
     // Simulate async content loading
   
     btnText.textContent = "Load More";
     spinner.classList.add('hidden');
   }); 
  
   async function moreDetails(category, id) {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      searchInput.value = "";
    suggestionsBox.innerHTML = "";
    searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
    suggestionsBox.classList.remove("Active");
      moreDetailsContaner.innerHTML = '';
      mainContainer.style.display = "none";
    
      await new Promise(res => setTimeout(res, 50));
    
  
      const detailRes = await fetch(`/.netlify/functions/tmdb?path=${category}/${id}`);
      const data = await detailRes.json();
  
  
      const posterSize = window.innerWidth <= 580 ? 'w300' : 'w780';
      const posterPath = data.poster_path
        ? `https://image.tmdb.org/t/p/${posterSize}${data.poster_path}`
        : 'images/logo.png';
  
     
      
          moreDetailsContaner.innerHTML = '';
      document.querySelector(".personDetails").style.transform = "scale(0)";
  
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.className = 'close-btn';
      closeBtn.addEventListener('click', () => {
        mainContainer.style.display = "block";
        moreDetailsContaner.style.transform = "scale(0)";
        moreDetailsContaner.innerHTML = '';
      });
      moreDetailsContaner.appendChild(closeBtn);
  
      // Fetch trailer
      const videoRes = await fetch(`/.netlify/functions/tmdb?path=${category}/${id}/videos`);
      const videoData = await videoRes.json();
      const youtubeTrailer = videoData.results.find(vid => vid.site === 'YouTube' && vid.type === 'Trailer');
  
      const wrapper = document.createElement('div');
      wrapper.className = 'details-wrapper';
  
      // Trailer section
      const trailerWrapper = document.createElement('div');
      trailerWrapper.className = 'video-wrapper';
      if (youtubeTrailer) {
        trailerWrapper.innerHTML = `
          <iframe 
            src="https://www.youtube.com/embed/${youtubeTrailer.key}?autoplay=0&mute=0&rel=0" 
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>`;
      } else {
        trailerWrapper.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w780/${data.backdrop_path || data.poster_path}" alt="Trailer not available" class="fallback-image">
          <p class="trailer-notice">Trailer not available.</p>`;
      }
  
      wrapper.appendChild(trailerWrapper);
  
      // Details content
      const content = document.createElement('div');
      content.className = 'details-content';
      content.innerHTML = `
      <h2 class="movie-title">${data.name || data.title}</h2>
      <div class="favorite-button-container" style="margin: 10px 0;">
        <button id="favoriteBtn" class="favorite-btn">
          <i class="fa-regular fa-heart"></i> Add to Favorites
        </button>
        <button id="WatchlistBtn" class="watchlist-btn">
          <i class="fa-regular fa-bookmark"></i> Add to Watchlist
        </button>
      </div>
      <p class="movie-release">Release: ${data.release_date || data.first_air_date || 'N/A'}</p>
      <p class="movie-overview">${data.overview || 'No overview available.'}</p>
    `;
    wrapper.appendChild(content);
    moreDetailsContaner.appendChild(wrapper);
    
    // Favorite Button Logic
    const favoriteBtn = document.getElementById("favoriteBtn");
    const isFav = await checkIfFavorited(data.id);
    if (isFav) {
      favoriteBtn.innerHTML = '<i class="fa-solid fa-heart"></i> Remove from Favorites';
    }
    favoriteBtn.addEventListener("click", async () => {
      favoriteBtn.innerHTML = '<i class="fa-solid fa-heart"></i> Loading...';
      const currentlyFav = await checkIfFavorited(data.id);
      if (currentlyFav) {
        await removeFavorite(data.id);
        favoriteBtn.innerHTML = '<i class="fa-regular fa-heart"></i> Add to Favorites';
      } else {
        await addFavorite(data);
        favoriteBtn.innerHTML = '<i class="fa-solid fa-heart"></i> Remove from Favorites ';
      }
    });
    
    // Watchlist Button Logic
    const WatchlistBtn = document.getElementById("WatchlistBtn");
    const isWatchlist = await checkIfWatchList(data.id);
    if (isWatchlist) {
      WatchlistBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Remove from Watchlist';
    }
    WatchlistBtn.addEventListener("click", async () => {
      WatchlistBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Loading...';
      const currentlyInWatchlist = await checkIfWatchList(data.id);
      if (currentlyInWatchlist) {
        await removeWatchList(data.id);
        WatchlistBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i> Add to Watchlist';
      } else {
        await addWatchList(data);
        WatchlistBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i>Remove from Watchlist ';
      }
    });
    

      moreDetailsContaner.style.transform = "scale(1)";
      mainContainer.style.display = "none";
  
      // Fetch cast
      const castRes = await fetch(`/.netlify/functions/tmdb?path=${category}/${id}/credits`);
      const castData = await castRes.json();
  
      const castSection = document.createElement('div');
      castSection.className = 'cast-section';
      castSection.innerHTML = `<h3>Cast</h3>`;
  
      const castGrid = document.createElement('div');
      castGrid.className = 'cast-grid';
  
      if (castData.cast?.length > 0) {
        castData.cast.slice(0, 12).forEach(actor => {
          const actorCard = document.createElement('div');
          actorCard.className = 'actor-card';
  
          actorCard.innerHTML = `
            <img src="${actor.profile_path ? 'https://image.tmdb.org/t/p/w185' + actor.profile_path : 'images/castplaceholder.png'}" alt="${actor.name}">
            <p><i>${actor.name}</i></p>
            <p>${actor.character}</p>`;
     
          actorCard.addEventListener("click", () => {
            fetchPersonDetails(actor.id, actor);
          });
  
          castGrid.appendChild(actorCard);
        });
      } else {
        castGrid.innerHTML = `<p class="no-cast">No cast information available.</p>`;
      }
  
      castSection.appendChild(castGrid);
      moreDetailsContaner.appendChild(castSection);
  
      // Handle TV seasons
      if (data.seasons !== undefined) {
        const seasons = data.seasons.filter(s => s.season_number !== 0);
        const seasonTabs = document.createElement('div');
        seasonTabs.className = 'season-tabs';
  
        const episodeContainer = document.createElement('div');
        episodeContainer.className = 'episodes-container';
  
        seasons.forEach(season => {
          const btn = document.createElement('button');
          btn.textContent = `S${season.season_number.toString().padStart(2, '0')}`;
          btn.className = 'season-btn';
  
          btn.addEventListener('click', () => {
            document.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadSeason(season.season_number);
          });
  
          seasonTabs.appendChild(btn);
        });
  
        moreDetailsContaner.appendChild(seasonTabs);
        moreDetailsContaner.appendChild(episodeContainer);

        const latestSeason = seasons[seasons.length - 1];
        await loadSeason(latestSeason.season_number);
  
        async function loadSeason(seasonNumber) {
          const seasonRes = await fetch(`/.netlify/functions/tmdb?path=tv/${id}/season/${seasonNumber}`);
          const seasonData = await seasonRes.json();
  
          episodeContainer.innerHTML = `
            <h3 class="season-header">Season ${seasonNumber} Overview</h3>
            <p>${seasonData.overview || 'No season overview available.'}</p>`;
  
          const episodes = seasonData.episodes;
          const limitedEpisodes = episodes.slice(0, 3);
          const remainingEpisodes = episodes.slice(3);
  
          const episodeList = document.createElement('div');
          episodeList.className = 'episode-list';
  
          limitedEpisodes.forEach(ep => {
            const epCard = createEpisodeCard(ep);
            episodeList.appendChild(epCard);
          });
  
          const moreList = document.createElement('div');
          moreList.className = 'more-episodes';
          moreList.style.display = 'none';
  
          remainingEpisodes.forEach(ep => {
            const epCard = createEpisodeCard(ep);
            moreList.appendChild(epCard);
          });
  
          episodeContainer.appendChild(episodeList);
          episodeContainer.appendChild(moreList);
  
          if (remainingEpisodes.length > 0) {
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Show All Episodes';
            toggleBtn.className = 'show-more-btn';
  
            let isExpanded = false;
  
            toggleBtn.addEventListener('click', () => {
              isExpanded = !isExpanded;
              moreList.style.display = isExpanded ? 'block' : 'none';
              toggleBtn.textContent = isExpanded ? 'Show Less Episodes' : 'Show All Episodes';
            });
  
            episodeContainer.appendChild(toggleBtn);
          }
        }
      }
      renderCommentSection(moreDetailsContaner, data.id); // Use TMDB movie/TV show ID
 
      // Fetch related movies/shows
      if (data.seasons !== undefined) {
        fetchRelatedMovies(data.id, "tv");
      } else {
        fetchRelatedMovies(data.id, "movie");
      }
  
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  }
  
  
  
  function createEpisodeCard(ep) {
    const epCard = document.createElement('div');
    epCard.className = 'episode-card';
    epCard.innerHTML = `
      <strong>S${ep.season_number.toString().padStart(2, '0')}E${ep.episode_number.toString().padStart(2, '0')} - ${ep.name}</strong>
      <p><em>${new Date(ep.air_date).toLocaleDateString()}</em></p>
      <div class="episode-inner">
        ${ep.still_path ? `<img src="https://image.tmdb.org/t/p/w300${ep.still_path}" alt="Episode still" class="episode-still">` : ''}
        <div class="episode-text">
          <p>${ep.overview || 'No episode overview.'}</p>
        </div>
      </div>
    `;
    return epCard;
  }
  function fetchPersonDetails(personId,actor) {
    moreDetailsContaner.style.transform = "scale(0)";
  
    // First: Fetch biography
    fetch(`/.netlify/functions/tmdb?path=person/${personId}`)
    .then(res => res.json())
      .then(actorDetails => {
        const bio = shortenBio(actorDetails.biography);
        // Second: Fetch recent credits
        fetch(`/.netlify/functions/tmdb?path=person/${personId}/combined_credits`)
        .then(res => res.json())
          .then(data => {
  
            const personDetails = document.querySelector(".personDetails");
            personDetails.innerHTML = ""; // Clear previous data
            personDetails.style.transform = "scale(1)";
  
            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.classList.add("close-btn");
            closeBtn.addEventListener('click', () => {
              moreDetailsContaner.style.transform = "scale(1)";
              personDetails.innerHTML = "";
              personDetails.style.transform = "scale(0)";
            });
            personDetails.appendChild(closeBtn);
  
            // Profile Section with Bio
            const ActorProfilePictor = document.createElement('div');
            ActorProfilePictor.classList.add("ActorProfilePictor");
            ActorProfilePictor.innerHTML = `
              <img src="${actor.profile_path ? 'https://image.tmdb.org/t/p/w185' + actor.profile_path : 'images/castplaceholder.png'}" alt="${actor.name}">
              <h2>${actor.name}</h2>
              <p style="max-width: 500px; margin: auto;">${bio}</p>
            `;
            personDetails.appendChild(ActorProfilePictor);
            const lable = document.createElement("h3");
            lable.innerText="Known For";
            personDetails.appendChild(lable);
            // Recent Works Grid
    
            const actorInfoContainer = document.createElement('div');
            actorInfoContainer.classList.add("actorInfoContainer");
            
             
            const sortedWorks = data.cast
              .sort((a, b) => new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date))
              .slice(0, ); // Recent 6 works
  
            sortedWorks.forEach(movie => {
              const card = document.createElement('div');
              card.classList.add("movieCard");
              card.innerHTML = `
                <img src="${movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'images/logo.png'}" alt="${movie.title || movie.name}">
                <p><strong>${movie.title || movie.name}</strong></p>
                <p style="font-size: 0.9em; color: gray;">as ${movie.character || 'N/A'}</p>
              `;
              actorInfoContainer.appendChild(card);
              card.addEventListener("click", () => {
                moreDetails(movie.media_type,movie.id);
              });
            });
  
            personDetails.appendChild(actorInfoContainer);
          });
      });
  }
  
  // Helper: Trim bio to 2–3 sentences
  function shortenBio(bio, sentenceCount = 2) {
    if (!bio) return "Biography not available.";
    const sentences = bio.split('.').filter(Boolean);
    return sentences.slice(0, sentenceCount).join('. ') + (sentences.length > sentenceCount ? '...' : '.');
  }
  
  
  function fetchRelatedMovies(movieId, type) {
  
    const endpoint = type === "movie"
      ? `movie/${movieId}/similar`
      : `tv/${movieId}/similar`;
  
      fetch(`/.netlify/functions/tmdb?path=${endpoint}`)
      .then(res => res.json())
      .then(data => {
        const relatedContainer = document.createElement('div');
        relatedContainer.classList.add("relatedMovies");
  
        const label = document.createElement("h3");
        label.innerText = "You May Also Like";
        moreDetailsContaner.appendChild(label);
  
        if (data.results.length === 0) {
          relatedContainer.innerHTML = `<p class="no-cast">Not available.</p>`;
          moreDetailsContaner.appendChild(relatedContainer);
          return;
        }
  
        data.results.forEach(movie => {
          const movieCard = document.createElement("div");
          movieCard.classList.add("movieCard");
  
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : 'images/logo.png';
  
          movieCard.innerHTML = `<img  src="${posterUrl}">`;
  
          const cartInfo = document.createElement('div');
          cartInfo.classList.add("cartInfo");
  
          let ratingClass = '';
          let ratingText = '';
  
          if (!movie.vote_average || movie.vote_average === 0) {
            ratingClass = 'rating-no';
            ratingText = 'N/A';
          } else if (movie.vote_average >= 7) {
            ratingClass = 'rating-high';
            ratingText = movie.vote_average.toFixed(1);
          } else if (movie.vote_average >= 5) {
            ratingClass = 'rating-mid';
            ratingText = movie.vote_average.toFixed(1);
          } else {
            ratingClass = 'rating-low';
            ratingText = movie.vote_average.toFixed(1);
          }
  
          cartInfo.innerHTML = `
            <h4 class="${ratingClass}">
              <i class="fa-solid fa-star"></i> ${ratingText}
            </h4>
            <h4>${type === 'movie' ? movie.title : movie.name}</h4>
          `;
  
          movieCard.appendChild(cartInfo);
          relatedContainer.appendChild(movieCard);
  
          movieCard.addEventListener("click", () => {
            moreDetailsContaner.style.transform = "scale(0)";
            moreDetailsContaner.innerHTML = "";
            mainContainer.style.display = "block";
            moreDetails(type, movie.id);
          });
        });
  
        moreDetailsContaner.appendChild(relatedContainer);
      });
  }
  

  
  // Handle Enter key: hide suggestions
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      suggestionsBox.innerHTML = "";
      suggestionsBox.classList.remove("Active");
    }
  });
  
  searchIcon.addEventListener("click", () => {
    if (searchIcon.classList.contains("fa-xmark")) {
      searchInput.value = "";
      suggestionsBox.innerHTML = "";
      searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
       location.reload()
      searchInput.focus();
    }
  });
  let debounceTimeout;
  const searchTypeSelect = document.getElementById("searchType");
  // Handle input for suggestions and icon toggle
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimeout);
    const query = searchInput.value.trim();
    const selectedType = searchTypeSelect.value;
  
    if (query) {
      searchIcon.classList.replace("fa-magnifying-glass", "fa-xmark");
    } else {
      searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
      suggestionsBox.innerHTML = "";
      suggestionsBox.classList.remove("Active");
      return;
    }
    debounceTimeout = setTimeout(async () => {
      let endpoint = selectedType;
  
    
  
      try {
        const response = await fetch(`/.netlify/functions/tmdb?path=search/${endpoint}&query=query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`);

        const data = await response.json();
  
        let results = data.results || [];
  
  
        if (results.length === 0) {
          suggestionsBox.innerHTML = "<div class='no-results'>No results found</div>";
          suggestionsBox.classList.add("Active");
          return;
        }
  
        suggestionsBox.innerHTML = results
        .slice(0, 6)
        .map(item => {
          const mediaType = item.media_type || selectedType;
      
          let title, image;
          if (mediaType === "person") {
            title = item.name;
            image = item.profile_path
              ? `https://image.tmdb.org/t/p/w92${item.profile_path}`
              : "images/castplaceholder.png";
          } else {
            title = item.title || item.name || "Untitled";
            image = item.poster_path
              ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
              : "images/castplaceholder.png";
  
          }
      
          return `
            <div class="suggestion-item" data-id="${item.id}" data-type="${mediaType}">
              <img src="${image}" alt="${title}">
              <span>${title}</span>
            </div>
          `;
        }).join("");
      
  
        suggestionsBox.classList.add("Active");
  
      } catch (err) {
        console.error("Suggestion fetch error:", err);
      }
    }, 300);
  });
  
  // Handle clicking a suggestion
  suggestionsBox.addEventListener("click", (event) => {
    const item = event.target.closest(".suggestion-item");
    if (item) {
      const movieId = item.dataset.id;
      const mediaType = item.dataset.type;
      suggestionsBox.innerHTML = "";
      searchInput.value = "";
      suggestionsBox.classList.remove("Active");
      selectMovie(movieId, mediaType,item);
    }
  });
  
  // Handle form submit (search button or Enter)
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    const selectedType = searchTypeSelect.value;
  
    if (searchIcon.classList.contains("fa-xmark") && !query) {
      searchInput.value = "";
      suggestionsBox.innerHTML = "";
      searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
      return;
    }
  
    if (query) {
      searchTime = 1;
      await searchonTmdb(query, 1);  // use updated function
    }
  });
  
  // Handle selection of a suggestion
  function selectMovie(id, mediaType,data) {
   
    if(mediaType != "person"){
      moreDetails(mediaType, id);
    }
      else
     fetchPersonDetails(id,data);
      
  }
  
  async function showFavorites() {
  const favoriteDiv = document.querySelector(".favoriteDiv");
  const favList = document.getElementById("favorite-list");
  favoriteDiv.style.display="block";

  favList.innerHTML = "Loading...";
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.className = 'close-btn-favorites';
  closeBtn.addEventListener('click', () => {  
    mainContainer.style.display = "block";
    favList.innerHTML = '';
    favoriteDiv.style.display = "none";
  });
  favoriteDiv.appendChild(closeBtn);

  const favorites = await getFavorites();
  if (favorites.length === 0) {
    favList.innerHTML = "No favorites yet. please log in and add some.";
    return;
  }

  favList.innerHTML = "";
 

  
  favorites.forEach(fav => {
    const imgcart = document.createElement("div");
    imgcart.classList.add("imgcart");

    const posterUrl = fav.poster_path
    ? `https://image.tmdb.org/t/p/w500${fav.poster_path}`
    : 'images/logo.png';
    
    imgcart.innerHTML = `<img src="${posterUrl}">`;
    
     let ratingClass = '';
     let ratingText = '';
    if (!fav.vote_average || fav.vote_average === 0) {
      ratingClass = 'rating-no';
      ratingText = 'N/A';
    } else if (fav.vote_average >= 7) {
       ratingClass = 'rating-high';
      ratingText = fav.vote_average.toFixed(1);
    } else if (fav.vote_average >= 5) {
     ratingClass = 'rating-mid';
     ratingText = fav.vote_average.toFixed(1);
    } else {
     ratingClass = 'rating-low';
     ratingText = fav.vote_average.toFixed(1);
    }
    const cartInfo = document.createElement('div');
    cartInfo.classList.add("cartInfo");
    cartInfo.innerHTML = `
      <h4 class="${ratingClass}"><i class="fa-solid fa-star"></i> ${ratingText}</h4>
      <h4>${fav.title || fav.name}</h4>
    `;
     imgcart.appendChild(cartInfo);
    favList.appendChild(imgcart);
    imgcart.addEventListener("click", () => {
      if (fav.seasons !== undefined) {
        moreDetails("tv", fav.id);
      } else {
        moreDetails("movie", fav.id);
      }
    });
  });



}
document.getElementById("getFavorite").addEventListener("click", () => {
  showFavorites();
  hideSlideBar();
  mainContainer.style.display = "none";
  document.querySelector(".favoriteDiv").style.display="block";
  const watchlistDiv = document.querySelector(".watchlistDiv");
  watchlistDiv.style.display="none";
  moreDetailsContaner.style.transform = "scale(0)";

});
async function showWatchlist() {
  const watchlistDiv = document.querySelector(".watchlistDiv");
  const watchlistList = document.getElementById("watchlist-list");
  watchlistDiv.style.display="block";

  watchlistList.innerHTML = "Loading...";
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.className = 'close-btn-favorites';
  closeBtn.addEventListener('click', () => {  
    mainContainer.style.display = "block";
    watchlistList.innerHTML = '';
    watchlistDiv.style.display = "none";
  });
  watchlistDiv.appendChild(closeBtn);

  const WatchList = await getWatchList();
  if (WatchList.length === 0) {
    watchlistList.innerHTML = "No Watchlist yet. please log in and add some.";
    return;
  }

  watchlistList.innerHTML = ""; 
  WatchList .forEach(wat => {
    const imgcart = document.createElement("div");
    imgcart.classList.add("imgcart");

    const posterUrl = wat.poster_path
    ? `https://image.tmdb.org/t/p/w500${wat.poster_path}`
    : 'images/logo.png';
    
    imgcart.innerHTML = `<img src="${posterUrl}">`;
    
     let ratingClass = '';
     let ratingText = '';
    if (!wat.vote_average || wat.vote_average === 0) {
      ratingClass = 'rating-no';
      ratingText = 'N/A';
    } else if (wat.vote_average >= 7) {
       ratingClass = 'rating-high';
      ratingText = wat.vote_average.toFixed(1);
    } else if (wat.vote_average >= 5) {
     ratingClass = 'rating-mid';
     ratingText = wat.vote_average.toFixed(1);
    } else {
     ratingClass = 'rating-low';
     ratingText = wat.vote_average.toFixed(1);
    }
    const cartInfo = document.createElement('div');
    cartInfo.classList.add("cartInfo");
    cartInfo.innerHTML = `
      <h4 class="${ratingClass}"><i class="fa-solid fa-star"></i> ${ratingText}</h4>
      <h4>${wat.title || wat.name}</h4>
      
    `;
     imgcart.appendChild(cartInfo);
    watchlistList.appendChild(imgcart);
    imgcart.addEventListener("click", () => {
      if (wat.seasons !== undefined) {
        moreDetails("tv", wat.id);
      } else {
        moreDetails("movie", wat.id);
      }
    });
  });



}
document.getElementById("getWatchlist").addEventListener("click", () => {
  showWatchlist();
  hideSlideBar();
  mainContainer.style.display = "none";
  document.querySelector(".watchlistDiv").style.display="block";
  const favoriteDiv = document.querySelector(".favoriteDiv");
  favoriteDiv.style.display="none";
  moreDetailsContaner.style.transform = "scale(0)";

});
function renderCommentSection(main, movieId) {
  const commentWrapper = document.createElement("div");
  commentWrapper.className = "comment-section";
  commentWrapper.style.margin = "20px 0";
  commentWrapper.innerHTML = `
    <h3>Comments</h3>
    <textarea class="comment-box" placeholder="Write a comment..." style="width:100%;height:80px;"></textarea>
    <button class="post-comment">Post</button>
    <div class="comments-list" style="margin-top:10px;"></div>
  `;

  main.appendChild(commentWrapper);

  const textarea = commentWrapper.querySelector(".comment-box");
  const postBtn = commentWrapper.querySelector(".post-comment");
  const commentsList = commentWrapper.querySelector(".comments-list");

  // Load and display comments
  loadComments(movieId, commentsList);

  // Handle posting comment
  postBtn.addEventListener("click", () => {
    postComment(movieId, textarea.value, commentsList);
    textarea.value = "";
  });
}
