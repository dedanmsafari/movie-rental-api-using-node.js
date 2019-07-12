const bcrypt = require('bcrypt');
async function run() {
    const salt = await bcrypt.genSalt(5);
    hashed = await bcrypt.hash('msafari1998', salt);
    console.log(salt);
    console.log(hashed);
}
run();