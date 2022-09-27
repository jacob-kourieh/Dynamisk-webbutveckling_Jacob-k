const express = require("express");
const nedb = require("nedb-promise");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");


app.use(cors({
    origin: "*"
}));
app.use(express.json());

const bcryptFunctions = require("./bcrypt");
const {
    res
} = require("express");


app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


const accountsDB = new nedb({
    filename: "accounts.db",
    autoload: true
});
const photoAlbumDB = new nedb({
    filename: "photoAlbum.db",
    autoload: true,
});



//login
app.post("/api/login", async (request, response) => {
    const credentials = request.body;
    const resObj = {
        success: false,
        user: "",
        token: "",
        role: false,

    };
    const account = await accountsDB.find({
        username: credentials.username,
    });


    if (account.length > 0) {
        const role = account[0].role;

        if (role === credentials.role) {
            const passwordMatch = await bcryptFunctions.comparePassword(
                credentials.password,
                account[0].password
            );
            if (passwordMatch) {
                resObj.user = account[0].username;
                resObj.role = true;
                resObj.success = true;

                const token = jwt.sign(
                    {
                        username: account[0].username,
                    },
                    'a1b1c1',
                    {
                        expiresIn: 600,
                    }
                );
                resObj.token = token;
            }
        }
    }
    response.json(resObj);
});



//Loggedin
app.get("/api/loggedin", async (request, response) => {
    const resObj = {
        loggedIn: false,
        errorMessage: "",
    };

    const token = request.headers.authorization.replace("Bearer ", "");

    try {
        const data = jwt.verify(token, 'a1b1c1');

        if (data) {
            resObj.loggedIn = true;
        }
    } catch {
        resObj.errorMessage = "Token expired";
    }
    response.json(resObj);
});



//sign up
app.post("/api/signup", async (request, response) => {
    const credentials = request.body;

    const resObj = {
        success: true,
        userNameExist: false,
        emailExists: false,
    };

    const findUser = await accountsDB.find({
        username: credentials.username,
    });
    const findEmail = await accountsDB.find({
        email: credentials.email,
    });

    if (findUser.length > 0) {
        resObj.emailExists = true;
    }

    if (findEmail.length > 0) {
        resObj.emailExists = true;
    }
    if (resObj.emailExists || resObj.userNameExist) {
        resObj.success = false;
    } else {
        resObj.success = true;
        const hashPass = await bcryptFunctions.hashPassword(credentials.password);
        credentials.password = hashPass;
        accountsDB.insert(credentials);
    }
    response.json(resObj);
});



//take photo
app.post("/api/takefoto", async (request, response) => {
    const credentials = request.body;
    console.log(credentials);
    const userObj = {
        username: credentials.username,
        img: [credentials.img],
    };

    const userFound = await photoAlbumDB.find({
        username: credentials.username,
    });
    console.log(userFound);

    if (userFound.length > 0) {
        const user = userFound[0]._id;

        photoAlbumDB.update(
            {
                _id: user,
            },
            {
                $push: {
                    img: credentials.img,
                },
            }
        );
    } else {
        photoAlbumDB.insert(userObj);
    }
    response.json(userObj);
});


//The Album Page
app.post("/api/album", async (request, response) => {
    const credentials = request.body;

    const userObj = {
        success: false,
        allImages: [],
    };

    const findRole = await accountsDB.find({ username: credentials.username });
    console.log(findRole);
    let getAllImages = [];

    // ADMIN
    if (findRole[0].role === "admin") {
        const allUsers = await photoAlbumDB.find({});
        allUsers.forEach((user) => {
            const imgs = user.img;
            imgs.forEach((img) => {
                getAllImages.push(img);
            });
        });
        userObj.success = true;
        userObj.allImages = getAllImages;
    }

    // GUST
    if (findRole[0].role === "guest") {
        const findUser = await photoAlbumDB.find({
            username: credentials.username,
        });
        if (findUser.length > 0) {
            const userImages = findUser[0].img;
            userObj.allImages = userImages;
            userObj.success = true;
        }
    }
    response.json(userObj);
});

//Delete photos
app.delete("/api/deletephoto", async (request, response) => {
    const credentials = request.body;

    resObj = {
        success: false
    };

    const findRole = await accountsDB.find({
        username: credentials.user,
    });
    if (findRole.length > 0) {
        if (findRole[0].role === "admin") {
            const user = await photoAlbumDB.find({
                img: credentials.img,
            });
            if (user.length > 0) {
                const userID = user[0]._id;
                photoAlbumDB.update(
                    {
                        _id: userID,
                    },
                    {
                        $pull: {
                            img: credentials.img,
                        },
                    }
                );
                resObj.success = true;
            }
        } else {
            const findUser = await photoAlbumDB.find({
                username: credentials.user,
            });

            if (findUser.length > 0) {
                const userID = findUser[0]._id;
                photoAlbumDB.update(
                    {
                        _id: userID,
                    },
                    {
                        $pull: {
                            img: credentials.img,
                        },
                    }
                );

                resObj.success = true;
            } else {
                resObj.success = false;
            }
        }
    }
    response.json(resObj);
});


//logout
app.get("/api/logout", async (request, response) => {
    const resObj = {
        success: true,
    };
    response.json(resObj);
});


const port = 5565;
app.listen(port, () => {
    console.log(`App listen to ${port}`);
});