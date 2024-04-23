function toggleMenu(){
    console.log("asf");
    let search = document.getElementById("searchContainer");
    
    if(search.classList[0] === "hideForm"){
        search.classList.remove('hideForm');
    } else {
        search.classList.add("hideForm");
    }
}