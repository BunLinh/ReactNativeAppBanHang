import saveToken from '../api/saveToken';


const refreshToken = ( token )=>{
    fetch("http://192.168.1.9/app/refresh_token.php",
    {
        method : "POST",
        headers : {
                'Content-Type': 'application/json',
                Accept: 'application/json'
        }, 
        body : JSON.stringify({ token}),
    })
    .then(res => res.text())
    .then(token => saveToken(token));
    
);
}
export default refreshToken;