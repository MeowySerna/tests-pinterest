const VALID_PASSWORD = 'password123';
const VALID_EMAIL = ''; // тут нужно обязательно заполнить
const BIRTHDATE_VALUE = "01-01-2000"

const INVALID_EMAILS = [       
    'username@domain,com ',         
    'username@domain,.com ',        
    '',            
];

const INVALID_PASSWORDS = [
    '123',                                          
    'p@ssw',                     
    '',                             
];


const INVALID_BIRTHDATES = [                
    '31-02-2000',                   
    '2000-13-01',                                     
    '',                             
];

module.exports = {
    VALID_PASSWORD,
    VALID_EMAIL,
    BIRTHDATE_VALUE,
    INVALID_EMAILS,
    INVALID_PASSWORDS,
    INVALID_BIRTHDATES,
};