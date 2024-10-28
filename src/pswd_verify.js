const bcrypt = require('bcrypt');

const pass = "mellow";
const encrypted = "$2b$10$V/xgglC6pdSOHZvm45C4v.ejSIpwhk4kHwIIxwTUK09hF7a3BH2DG";

async function encrypt(){
    if (await bcrypt.compare(pass, encrypted)){
        console.log('yep');
        
    }else{
        console.log('nooo');
        
    }
}
encrypt()