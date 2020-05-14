/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/


/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

const cards = document.querySelector('.cards');

axios.get('https://api.github.com/users/ryan4242') //api call
.then(response => {                                //async response 
  cards.appendChild(cardMaker(response.data));     //append card
})
  

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

axios.get(`https://api.github.com/users/tetondan`) //I have no followers so I used a user from the given list
.then(response => {
  cards.append(cardMaker(response.data)); //added 'parent' users card
  axios.get(response.data.followers_url) //axios.get promise to get parents followers array
  .then(bigObj => {
    bigObj.data.forEach(user => { //array for followers was in another data property then I iterated over the array
      axios.get(`https://api.github.com/users/${user.login}`) //user objects contain only a few properties so I called an axios.get with each user.login to get a complete user object
      .then(response => {
        cards.after(cardMaker(response.data)); //appended each users card with complete info
      });
    });
  });
});


/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

const cardMaker = obj => {
  const card = document.createElement('div');
  const image = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const link = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');

  image.src = obj.avatar_url;
  name.innerHTML = obj.name;
  userName.innerHTML = obj.login;
  location.innerHTML = `Location: ${obj.location}`;
  link.href = obj.html_url;
  link.textContent = obj.html_url;
  profile.textContent = `Profile: `;
  followers.innerHTML = `Followers: ${obj.followers}`;
  following.innerHTML = `Following: ${obj.following}`;
  bio.innerHTML = `Bio: ${obj.bio}`;

  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(link);       //must be appended after profile html is added as to not overwrite html
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  return card;
}
