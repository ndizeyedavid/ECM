const bcrypt = require('bcrypt');

const pass = "Essa@2025";

async function encrypt(){
    console.log(await bcrypt.hash(pass, 10));
}
encrypt()