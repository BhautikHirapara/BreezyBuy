
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>{
    const response =  fetch('http://localhost:8080')
    const data = response.json()
    resolve({data})
  }
  );
}
