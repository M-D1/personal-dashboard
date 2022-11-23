//here if the time is 17 or greater then its night else its day 
const time = new Date()
let nightOrday;

const hour = time.getHours()

if(hour >= 17){
 nightOrday = 'night'
}else{
 nightOrday = 'day'
}


//getting the current time and displayed on the web page

 function gettingTime(){
  const date = new Date()
  document.querySelector('.time').textContent = date.toLocaleTimeString('en-arab',{timeStyle:"short"});
 }
 
 setInterval(gettingTime,1000);

//getting image from the unsplash api and about the author of the image.
fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${nightOrday}
`)
 .then(res => res.json())
 .then(photo => {
    // gettun the img url and displaying it to the page 
   const url = photo.urls.regular;
   document.body.style.backgroundImage = `url(${url})`;
 })
 .catch(err =>{
  nightOrday = 'day'
 });

 //getting city name[region]

  const city = document.querySelector('.city')
  
 navigator.geolocation.getCurrentPosition(pos =>{
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    fetch(`https://api.api-ninjas.com/v1/reversegeocoding?lat=${latitude}&lon=${longitude}`,{
       headers:{
        "X-Api-Key": `7hUkz1ZK3WCoif86iH6fzA==jsJAuxuffKN0i8Ap`
  }
    })
    .then(res => {
      if(!res.ok){
        throw Error('Something went wrong')
      }
      return res.json()
    })
    .then(date => {
      const region = date[0].state
     city.textContent = region
    })
    .catch(err =>  {
      city.textContent = err
      setTimeout(()=>{
         city.style.display = 'none'
      },3000)
     
    });
 })

 //here using an api that return a list of synonyms and antonyms of a given word[thesaurus]

  const input = document.querySelector('.input');
  const form = document.querySelector('.form');
  const result = document.querySelector('.result');

 form.addEventListener('submit',function(e){
  e.preventDefault()
   fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${input.value}`,{
  headers:{
     "X-Api-Key": `7hUkz1ZK3WCoif86iH6fzA==jsJAuxuffKN0i8Ap`
  }
 })
  .then(res => {
    if(!res.ok){
      throw Error('Something went Wrong');
    }
    return res.json()
  })
  .then(data => {
    
  const radioBtns = document.querySelectorAll('input[type=radio]');
 
  let results = []

  // selecting all the radion btn and checking if one of them is checked or not 
  radioBtns.forEach(btn =>{
    if(btn.checked === true){
      // here pushing the synonyms or antonyms to an array and displaying it  on the page 
      results.push(data[btn.value])
    
      for(const rs of results[0]){
         result.innerHTML+=`<p class="p-result">${rs}</p>` 
      } 
      //if there is no antonyms or synonyms to a word this message will apper and disappear  after 15 seconds
      if(data[btn.value] === []){
        result.textContent = `Sorry there is no ${btn.value} to ${input.value}`
      } 
      setTimeout(()=> {
        result.style.display = 'none'
      },15000)

    }
  })
    input.value= ''
  })
  .catch(err => {
    result.textContent = err
    setTimeout(()=>{
      result.style.display ='none'
    },2000)
  })
 })


 // getting random  quotes
const quotes = document.querySelector('.quotes');
 
fetch(`https://api.api-ninjas.com/v1/quotes?category=forgiveness`,{
  headers:{
    "X-Api-Key": `7hUkz1ZK3WCoif86iH6fzA==jsJAuxuffKN0i8Ap`, 
   
  }
})
 .then(res => {
  if(!res.ok){
    throw Error('Sorry something went wrong');
  }
  return res.json()
 })
 .then(data => {
  quotes.textContent = data[0].quote
 })
 .catch(err => {
 
  quotes.textContent = err
  setTimeout(()=>{
    quotes.style.display ='none'
  },2000)
});

// getting random facts
const facts = document.querySelector('.facts');
fetch('https://api.api-ninjas.com/v1/facts?limit=1',{
  headers:{
    "X-Api-Key": `7hUkz1ZK3WCoif86iH6fzA==jsJAuxuffKN0i8Ap`
  }
})
  .then(res => {
    if(!res.ok){
      throw Error('Something went wrong')

    }
    return res.json()
  })
  .then(data => {
    // looping over data array to gets the fact
    data.forEach(el => {
      facts.innerHTML = `<p> Fact: ${el.fact}</p>`
    })
    
  })
  .catch(err => facts.textContent = err)


 


