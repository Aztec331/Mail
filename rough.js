function delayFunction(message, callback) {
    // Simulate a delay (replace with asynchronous operation in real use)
    setTimeout(() => {
      console.log(message);
      callback(); // Call the provided callback function after the delay
    }, 2000);
  }
  
  function sayHi() {
    console.log("Hi from the callback function!");
  }


  let talk = "this is text before callback function aztec"
  
  delayFunction(talk, sayHi);
  