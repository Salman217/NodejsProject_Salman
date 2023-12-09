const express = require('express');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

var URL = 'mongodb://localhost:27017/Mydb';

const app =  express();

dotenv.config({
    path : "./.env  "
})

Mongoose.connect(URL);

const UserSchema = Mongoose.Schema({
    name:String,
    Age : Number
})

const UserModel = Mongoose.model("users",UserSchema);

const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");


app.get("/", (req,res) => {
    res.render("index")
    // UserModel.find({name:"salman"}).then(function(users){
    //     res.json(users)
    // })

})


// Mid Level

function fibonacci(n, data = {}) {
    if (n <= 1) {
        return n;
    }

    if (data[n]) {
        return data[n];
    }

    data[n] = fibonacci(n - 1, data) + fibonacci(n - 2, data);
    return data[n];
}

const position = 10;
const resultMid = fibonacci(position);
console.log(`Fibonacci value at position ${position}: ${resultMid}`);

//Senior/Mid Level -
// 1) 
function getBalancedSubstrings(S) {
    function findLongestBalancedSubstring(s) {
        if (!s || s.length < 2) {
            return '';
        }

        const charCount = new Map();
        let firstChar = s[0];
        let secondChar = s[1];
        let firstCharCount = 0;
        let secondCharCount = 0;
        let maxLen = 0;
        let startIndex = 0;

        for (const c of s) {
            if (c === firstChar || c === secondChar) {
                charCount.set(c, (charCount.get(c) || 0) + 1);
            } else {
                charCount.clear();
                firstChar = c;
                secondChar = 0;
                firstCharCount = 0;
                secondCharCount = 0;
                startIndex = 0;
            }

            if (c === firstChar) {
                firstCharCount++;
            } else if (c === secondChar) {
                secondCharCount++;
            }

            if (charCount.size === 2 && firstCharCount === secondCharCount) {
                const currentLen = charCount.get(firstChar) + charCount.get(secondChar);
                if (currentLen > maxLen) {
                    maxLen = currentLen;
                    startIndex = startIndex;
                }
            }
        }

        return s.substring(startIndex, startIndex + maxLen);
    }

    const result = [];

    for (const s of S) {
        const balancedSubstring = findLongestBalancedSubstring(s);
        if (balancedSubstring.length > 0) {
            result.push(balancedSubstring);
        }
    }

    return result;
}
const S = ["cabbacc"];
const result = getBalancedSubstrings(S);

// 2) 

function getBalancedSubstrings(S) {
    function isBalancedSubstring(substring) {
        const charCount = new Map();

        for (const char of substring) {
            charCount.set(char, (charCount.get(char) || 0) + 1);
        }

        return charCount.size === 2 && [...charCount.values()].every(count => count % 2 === 0);
    }

    const result2 = [];
    const n = BS.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j <= n; j++) {
            const substring = BS.slice(i, j);
            if (isBalancedSubstring(substring)) {
                result2.push(substring);
            }
        }
    }

    const maxLength = result2.reduce((max, str) => Math.max(max, str.length), 0);
    return result2.filter(str => str.length === maxLength);
}

// Example usage
const BS = ["abababa"];
const result2 = getBalancedSubstrings(S);
console.log(result2); 

// 3) 

function getBalancedSubstrings(Sh) {
    function isBalancedSubstring(charCount) {
        const values = Array.from(charCount.values());
        return values.length === 2 && values[0] === values[1];
    }

    const n = Sh.length;
    const charCount = new Map();
    let result3 = [];

    for (let left = 0, right = 0; right < n; right++) {
        const char = Sh[right];
        charCount.set(char, (charCount.get(char) || 0) + 1);

        while (charCount.size > 2) {
            const leftChar = Sh[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }
            left++;
        }

        if (isBalancedSubstring(charCount)) {
            const substring = Sh.slice(left, right + 1);
            if (result3.length === 0 || substring.length > result3[0].length) {
                result3 = [substring];
            } else if (substring.length === result3[0].length) {
                result3.push(substring);
            }
        }
    }

    return result3;
}

// Example usage
const Sh = "aaaaaaa";
const result3 = getBalancedSubstrings(S);
console.log(result3); // Output: []







app.listen(3000, () => {
    console.log('Server is Connected')
})



