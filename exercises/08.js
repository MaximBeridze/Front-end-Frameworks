// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 8 — async/await
// Run this file in the browser console or with Node 18+.

const BASE_URL = "https://jsonplaceholder.typicode.com";

// 1. Write an async function fetchPosts() that:
//    - fetches BASE_URL + "/posts"
//    - parses the JSON res
//    - returns the first 5 items
//    - logs each item's title

async function fetchPosts(){
    try {
        let url = BASE_URL + "/posts"
        const res = await fetch(url)
        const posts = await res.json()
        const firstFive = posts.slice(0,5)
        firstFive.forEach(post => {
            console.log(posts.title)
        });
        return firstFive
    } catch (error) {
        console.log("Failed to load posts")
    }

}
// 2. Add try/catch to fetchPosts().
//    If the fetch fails, log "Failed to load posts".

// 3. Write an async function getPostById(id) that:
//    - fetches BASE_URL + "/posts/" + id
//    - throws an Error if res.ok is false
//    - returns the parsed JSON object
async function getPostById(id) {
    const res = await fetch(`${BASE_URL}/posts/${id}`)
    if (!res.ok) throw new Error("You stupid")
    
    return await res.json()
}

// Call getPostById(1) and log the result.
// Call getPostById(99999) — what happens? Handle it.
(async()=>{
    try {
    const first = await getPostById(1);
    console.log(first)
    }   catch(error){
        console.log(`Error first ${error.message}`)
    }
    try {
        const second = await getPostById(99999);
        console.log(second)
    } catch (error) {
        console.log(`Error second ${error.messsage}`)
    }
})();
